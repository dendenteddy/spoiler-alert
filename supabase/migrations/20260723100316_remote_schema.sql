create extension if not exists "pg_cron" with schema "pg_catalog";

drop extension if exists "pg_net";

drop trigger if exists "item_update_timestamp" on "public"."items";

drop trigger if exists "before_insert_username" on "public"."profiles";

alter table "public"."items" add column "item_rank" integer;

alter table "public"."items" alter column "item_status" set default 'safe'::public.item_status;

alter table "public"."items" alter column "item_status" set data type public.item_status using "item_status"::text::public.item_status;

alter table "public"."items" alter column "storage_location" set data type public.storage_loc using "storage_location"::text::public.storage_loc;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_daily_item_ranks()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  with ranked_items as (
    select 
      id,
      row_number() over (
        partition by user_id 
        order by expiry_date asc nulls last
      ) as computed_rank
    from public.items
  )
  update public.items
  set item_rank = ranked_items.computed_rank
  from ranked_items
  where public.items.id = ranked_items.id;
end;
$function$
;

CREATE TRIGGER item_update_timestamp AFTER UPDATE ON public.items FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();

CREATE TRIGGER before_insert_username BEFORE INSERT ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_random_username();

drop trigger if exists "on_auth_user_created" on "auth"."users";

drop trigger if exists "on_auth_user_updated" on "auth"."users";

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_user_changes();

CREATE TRIGGER on_auth_user_updated AFTER UPDATE ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_user_changes();


