import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI

APP_ENV = os.getenv("APP_ENV", "development")
load_dotenv(Path(__file__).parent / f".env.{APP_ENV}")

app = FastAPI()

ITEMS = [
    {"id": 1, "name": "Apple", "price": 1.2},
    {"id": 2, "name": "Banana", "price": 0.5},
    {"id": 3, "name": "Cherry", "price": 3.0},
]


@app.get("/api/items")
def get_items():
    return {
        "env": APP_ENV,
        "message": os.getenv("APP_MESSAGE", ""),
        "items": ITEMS,
    }
