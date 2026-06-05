from fastapi import APIRouter
from app.api.v1 import papers, generate

api_router = APIRouter()

api_router.include_router(papers.router, prefix="/papers", tags=["papers"])
api_router.include_router(generate.router, prefix="/generate", tags=["generate"])

# Phase 2 — uncomment when ready
# from app.api.v1 import auth, users, files
# api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
# api_router.include_router(users.router, prefix="/users", tags=["users"])
# api_router.include_router(files.router, prefix="/files", tags=["files"])
