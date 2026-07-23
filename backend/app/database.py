import os
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client, Client
from fastapi import status, HTTPException

env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path)


def get_supabase():
    url: str = os.getenv("LOCAL_SUPABASE_URL")
    key: str = os.getenv("LOCAL_SUPABASE_PUBKEY")
    supabase: Client = create_client(url, key)
    return supabase

def verify_user_jwt(db: Client, token: str):
    try:
        claims = db.auth.get_claims(token)
    except:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = f"Invalid User JWT")
    else:
        db.postgrest.auth(token)  
        return db, claims 
