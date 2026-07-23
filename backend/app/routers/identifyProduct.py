import logging
import os
import requests
from typing import Optional
from pathlib import Path
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from google import genai
from google.genai import types

env_path = Path(__file__).resolve().parent.parent.parent / '.env'
load_dotenv(dotenv_path=env_path, override=True)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("identify_product")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("identify_product")

router = APIRouter(
    prefix="/food",
    tags=["Identify Product"]
)


def search_open_food_facts(barcode: str):
    url = f"https://world.openfoodfacts.org/api/v2/product/{barcode}.json"

    headers = {
        "User-Agent": "SpoilerAlert/1.0 (student project)"
    }

    try:
        response = requests.get(url, headers=headers, timeout=15)
    except requests.RequestException as e:
        logger.warning("Open Food Facts request failed for barcode %s: %s", barcode, e)
        return None

    if response.status_code != 200:
        logger.warning(
            "Open Food Facts returned status %s for barcode %s: %s",
            response.status_code, barcode, response.text[:200]
        )
        return None

    data = response.json()

    if data.get("status") != 1:
        logger.info("Open Food Facts has no product for barcode %s", barcode)
        return None

    product = data.get("product", {})

    product_name = (
        product.get("product_name")
        or product.get("product_name_en")
        or product.get("generic_name")
        or "Unknown product"
    )

    return {
        "barcode": barcode,
        "product_name": product_name,
        "brands": product.get("brands", ""),
        "categories": product.get("categories", ""),
        "image_url": product.get("image_url", ""),
        "source": "open_food_facts"
    }


def identify_with_gemini(image_bytes: bytes, mime_type: str):
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY is missing from backend .env"
        )

    client = genai.Client(api_key=api_key)

    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=[
            types.Part.from_bytes(
                data=image_bytes,
                mime_type=mime_type,
            ),
            """
            Identify the food or grocery product in this image.

            Return only a short product name.
            Do not explain.
            If unable to identify, return "Unknown product".
            """
        ],
    )

    return response.text.strip() if response.text else "Unknown product"


@router.post("/identify")
async def identify_product(
    barcode: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    logger.info("Received identify request: barcode=%r, file=%r", barcode, file.filename if file else None)

    # 1. Try Open Food Facts first
    if barcode:
        off_result = search_open_food_facts(barcode)

        if off_result:
            return off_result

    # 2. If Open Food Facts fails, try Gemini with image
    if file:
        image_bytes = await file.read()

        if not image_bytes:
            raise HTTPException(status_code=400, detail="Uploaded image is empty")

        product_name = identify_with_gemini(
            image_bytes=image_bytes,
            mime_type=file.content_type or "image/jpeg"
        )

        return {
            "barcode": barcode,
            "product_name": product_name,
            "brands": "",
            "categories": "",
            "image_url": "",
            "source": "gemini"
        }

    # 3. If no barcode match and no image
    if barcode:
        raise HTTPException(
            status_code=404,
            detail="Product not found in Open Food Facts and no image was provided for Gemini fallback"
        )

    raise HTTPException(
        status_code=400,
        detail="Please provide a barcode or an image"
    )