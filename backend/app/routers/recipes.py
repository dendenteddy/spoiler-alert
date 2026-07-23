from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Optional
from supabase import Client
from google import genai
from google.genai import types
from pathlib import Path
from dotenv import load_dotenv
import os
from ..database import get_supabase, verify_user_jwt
from fastapi.security import OAuth2PasswordBearer

router = APIRouter(prefix="/recipes", tags=["Recipes"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

env_path = Path(__file__).resolve().parent.parent.parent / '.env'
load_dotenv(dotenv_path=env_path, override=True)

# --- Pydantic Schema for Gemini Structured Output ---
class IngredientItem(BaseModel):
    name: str = Field(description="Name of the ingredient")
    amount: Optional[str] = Field(None, description="Amount/measurement, e.g., '200g', '2 tablespoons'")

class RecipeStructure(BaseModel):
    title: str = Field(description="Catchy name of the recipe")
    ingredients: List[IngredientItem] = Field(description="Ingredients needed for the recipe")
    instructions: List[str] = Field(description="Step-by-step instructions to cook the recipe")

@router.post("/generate", status_code=status.HTTP_201_CREATED)
async def generate_and_store_recipe(
    db: Client = Depends(get_supabase), 
    token: str = Depends(oauth2_scheme)
):
    db, claims = verify_user_jwt(db, token)
    user_id = claims["claims"]["sub"]

    # 1. Fetch user's pantry items sorted by item_rank (highest ranking first)
    items_response = (
        db.table("items")
        .select("item_name, expiry_date, item_rank")
        .eq("user_id", user_id)
        .order("item_rank", desc=False)
        .execute()
    )
    
    pantry_items = items_response.data
    if not pantry_items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Your fridge is empty! Add items first to generate a recipe."
        )

    # 2. Prioritize items based on ranking
    # Must-use items are the top 3 expiring items (ranks 1, 2, and 3)
    must_use = [item["item_name"] for item in pantry_items if item.get("item_rank") in [1, 2, 3]]
    other_available = [item["item_name"] for item in pantry_items if item["item_name"] not in must_use]

    # 3. Call Gemini using the Structured Output API
    api_key:str = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is missing from backend")

    try:
        client = genai.Client(api_key=api_key)
        
        prompt = f"""
        Generate a single recipe prioritizing the following expiring ingredients:
        MUST USE (soonest to expire): {', '.join(must_use)}
        
        OPTIONAL BUT AVAILABLE (other items in the fridge): {', '.join(other_available)}
        
        Feel free to add common pantry staples (like salt, oil, pepper, water) to complete the recipe, but prioritize using all of the MUST USE ingredients.
        """

        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=RecipeStructure, # Forces Gemini to return matching structure
                temperature=0.7
            )
        )
        
        # 4. Parse the structured output
        generated_recipe = response.parsed # Auto-parsed into RecipeStructure object
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, 
            detail=f"Failed to generate recipe from AI: {str(e)}"
        )

    # 5. Store the recipe in Supabase
    recipe_db_entry = {
        "user_id": user_id,
        "title": generated_recipe.title,
        "ingredients": [ing.model_dump() for ing in generated_recipe.ingredients],
        "instructions": generated_recipe.instructions,
        "image_url": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80" # Placeholder or DALL-E/Unsplash query
    }
    
    insert_response = db.table("recipes").insert(recipe_db_entry).execute()
    return insert_response.data

@router.get("/")
async def get_saved_recipes(
    db: Client = Depends(get_supabase), 
    token: str = Depends(oauth2_scheme)
):
    db, claims = verify_user_jwt(db, token)
    user_id = claims["claims"]["sub"]
    
    response = db.table("recipes").select("*").eq("user_id", user_id).execute()
    return response.data

