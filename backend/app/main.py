import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import (
    APP_TITLE,
    APP_SUBTITLE,
    APP_VERSION,
    UPLOAD_DIR,
    STATIC_SAMPLES_DIR
)
from app.database.session import init_db, SessionLocal
from app.database.seed_data import seed_database
from app.routes import predict, diseases, history, statistics
from app.ml.classifier import classifier

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize DB and seed disease catalog
    print("[PlantCare AI] Initializing database...")
    init_db()
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    
    # Ensure static directories exist
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    STATIC_SAMPLES_DIR.mkdir(parents=True, exist_ok=True)
    print("[PlantCare AI] Ready to serve requests!")
    yield
    print("[PlantCare AI] Shutting down...")

app = FastAPI(
    title=APP_TITLE,
    description=APP_SUBTITLE,
    version=APP_VERSION,
    lifespan=lifespan
)

# Enable CORS for frontend web application
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static file directories for uploads and demo sample images
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")
app.mount("/static_samples", StaticFiles(directory=str(STATIC_SAMPLES_DIR)), name="static_samples")

# Register API Routers
app.include_router(predict.router)
app.include_router(diseases.router)
app.include_router(history.router)
app.include_router(statistics.router)

@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "online",
        "app": APP_TITLE,
        "subtitle": APP_SUBTITLE,
        "version": APP_VERSION,
        "model_type": classifier.model_type,
        "model_loaded": classifier.model_loaded
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
