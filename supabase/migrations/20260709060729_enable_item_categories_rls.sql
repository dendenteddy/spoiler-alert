-- Enable Row Level Security
alter table "public"."item_categories" enable row level security;

-- 1. Policy: Allow read access to global categories and the user's own custom categories
create policy "Allow read access to global and own categories"
on "public"."item_categories"
as permissive
for select
to authenticated
using (is_global = true or user_id = auth.uid());

-- 2. Policy: Allow users to insert their own custom categories (must not be global)
create policy "Allow insert access to own categories only"
on "public"."item_categories"
as permissive
for insert
to authenticated
with check (user_id = auth.uid() and is_global = false);

-- 3. Policy: Allow users to update/delete their own custom categories (must not be global)
create policy "Allow update and delete access to own custom categories only"
on "public"."item_categories"
as permissive
for all
to authenticated
using (user_id = auth.uid() and is_global = false)
with check (user_id = auth.uid() and is_global = false);
