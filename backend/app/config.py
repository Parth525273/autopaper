from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # App
    APP_NAME: str = "AutoPaper"
    APP_VERSION: str = "0.1.0"
    ENVIRONMENT: str = "development"

    # Security
    SECRET_KEY: str = "dev_secret_key_change_in_production"

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    # File paths
    UPLOAD_DIR: str = "uploads"
    GENERATED_DIR: str = "generated"

    # Phase 2
    # DATABASE_URL: str = ""
    # REDIS_URL: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
