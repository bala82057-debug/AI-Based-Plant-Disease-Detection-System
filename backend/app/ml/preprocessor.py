import os
import uuid
from pathlib import Path
from PIL import Image
import numpy as np
from fastapi import UploadFile, HTTPException
from app.config import UPLOAD_DIR, ALLOWED_EXTENSIONS, MAX_IMAGE_SIZE_BYTES, INPUT_IMAGE_SIZE

def validate_image_file(file: UploadFile, content: bytes) -> str:
    """
    Validates uploaded file size, extension, and verifies image integrity.
    Returns the sanitized extension.
    """
    if len(content) > MAX_IMAGE_SIZE_BYTES:
        raise HTTPException(
            status_code=400,
            detail=f"File exceeds maximum allowed size of {MAX_IMAGE_SIZE_BYTES / (1024*1024):.0f}MB."
        )

    # Sanitize and extract extension
    filename = file.filename or "uploaded_image.jpg"
    ext = Path(filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file format '{ext}'. Allowed formats: {', '.join(ALLOWED_EXTENSIONS)}"
        )

    return ext

def save_and_preprocess_image(content: bytes, ext: str):
    """
    Saves image to uploads folder with unique UUID, verifies PIL readability,
    and returns (saved_rel_path, pil_img, normalized_tensor_np).
    """
    unique_filename = f"{uuid.uuid4().hex}{ext}"
    saved_path = UPLOAD_DIR / unique_filename

    # Save to disk
    with open(saved_path, "wb") as f:
        f.write(content)

    # Verify and open with Pillow
    try:
        pil_img = Image.open(saved_path)
        pil_img.verify()
        # Reopen after verify() as recommended by PIL docs
        pil_img = Image.open(saved_path).convert("RGB")
    except Exception as e:
        if saved_path.exists():
            saved_path.unlink()
        raise HTTPException(
            status_code=400,
            detail=f"Uploaded image is corrupt or unreadable: {str(e)}"
        )

    # Preprocess for neural network input (224, 224)
    resized_img = pil_img.resize(INPUT_IMAGE_SIZE, Image.Resampling.BILINEAR)
    img_array = np.array(resized_img, dtype=np.float32) / 255.0

    # ImageNet standard normalization
    mean = np.array([0.485, 0.456, 0.406], dtype=np.float32)
    std = np.array([0.229, 0.224, 0.225], dtype=np.float32)
    normalized = (img_array - mean) / std

    # Transpose to (1, 3, 224, 224) format (Batch, Channels, Height, Width)
    tensor_np = np.transpose(normalized, (2, 0, 1))
    tensor_np = np.expand_dims(tensor_np, axis=0)

    rel_url = f"/uploads/{unique_filename}"
    return rel_url, pil_img, tensor_np
