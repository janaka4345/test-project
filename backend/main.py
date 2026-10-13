import os
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, Response, status

APP_ENV = os.getenv("APP_ENV", "development")
load_dotenv(Path(__file__).parent / f".env.{APP_ENV}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.ready = True
    yield
    app.state.ready = False


app = FastAPI(lifespan=lifespan)
app.state.ready = False


@app.get("/healthz")
def healthz():
    return {"status": "ok"}


@app.get("/readyz")
def readyz(response: Response):
    if not app.state.ready:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        return {"status": "starting"}
    return {"status": "ready"}


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
