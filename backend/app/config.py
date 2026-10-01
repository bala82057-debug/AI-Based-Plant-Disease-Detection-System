import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Database
DATABASE_URL = f"sqlite:///{BASE_DIR}/plantcare.db"

# Storage
UPLOAD_DIR = BASE_DIR / "uploads"
STATIC_SAMPLES_DIR = BASE_DIR / "static_samples"
MODEL_DIR = BASE_DIR / "model"

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
STATIC_SAMPLES_DIR.mkdir(parents=True, exist_ok=True)
MODEL_DIR.mkdir(parents=True, exist_ok=True)

# File Upload Security Restrictions
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB

# AI Model Settings
MODEL_WEIGHTS_FILE = MODEL_DIR / "plant_disease_model.pth"
ONNX_MODEL_FILE = MODEL_DIR / "plant_disease_model.onnx"
INPUT_IMAGE_SIZE = (224, 224)
LOW_CONFIDENCE_THRESHOLD = 60.0  # Percentage below which prediction is marked uncertain

# App Metadata
APP_TITLE = "PlantCare AI"
APP_SUBTITLE = "AI-Powered Plant Disease Detection"
APP_VERSION = "2.0.0"
