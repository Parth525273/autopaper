from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.config import settings
from app.api.v1.router import api_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AutoPaper API — Research paper formatting engine",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── CORS — allow all origins in development ─────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# ─── Static files ─────────────────────────────────────────────
os.makedirs(settings.GENERATED_DIR, exist_ok=True)
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

app.mount(
    "/generated",
    StaticFiles(directory=settings.GENERATED_DIR),
    name="generated",
)

# ─── Routers ──────────────────────────────────────────────────
app.include_router(api_router, prefix="/api/v1")


@app.get("/health", tags=["health"])
def health_check():
    return {
        "status": "ok",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }


@app.get("/", tags=["root"])
def root():
    return {"message": f"Welcome to {settings.APP_NAME} API", "docs": "/docs"}
