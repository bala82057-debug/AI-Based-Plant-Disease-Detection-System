from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.database.models import Disease
from app.ml.preprocessor import validate_image_file, save_and_preprocess_image
from app.ml.classifier import classifier
from app.services.disease_service import get_disease_by_name
from app.services.history_service import add_history_record

router = APIRouter(prefix="/api", tags=["Prediction"])

@router.post("/predict")
async def predict_plant_disease(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Accepts an uploaded image of a plant leaf, preprocesses it,
    runs the AI classification pipeline, cross-references agronomic
    disease knowledge, and stores the detection history.
    """
    try:
        content = await file.read()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read uploaded file: {str(e)}")

    if not content:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    # Validate file extension and size
    ext = validate_image_file(file, content)

    # Save to disk and preprocess
    image_rel_url, pil_img, tensor_np = save_and_preprocess_image(content, ext)

    # Run AI inference
    prediction = classifier.predict(pil_img, tensor_np)

    plant_name = prediction["plant_name"]
    disease_name = prediction["disease_name"]
    status = prediction["status"]
    confidence = prediction["confidence"]
    is_low_conf = prediction["is_low_confidence"]
    severity = prediction["severity"]
    diseased_area_pct = prediction["diseased_area_pct"]

    # Match with disease catalog database
    disease_info = get_disease_by_name(db, disease_name, plant_name)

    if disease_info:
        description = disease_info.description
        symptoms = disease_info.symptoms
        causes = disease_info.causes
        prevention = disease_info.prevention
        treatment = disease_info.treatment
        disease_id = disease_info.id
    else:
        description = f"Detected {disease_name} on {plant_name} foliage."
        symptoms = "Foliage changes observed in spectral and lesion profile."
        causes = "Pathogenic organism or biotic/abiotic stress factor."
        prevention = "Inspect crop regularly, maintain proper spacing and clean irrigation."
        treatment = "Consult a local agricultural extension specialist for confirmation."
        disease_id = None

    # Save to detection history
    history_record = add_history_record(
        db=db,
        image_path=image_rel_url,
        plant_name=plant_name,
        disease_name=disease_name,
        status=status,
        confidence=confidence,
        severity=severity,
        diseased_area_pct=diseased_area_pct,
        symptoms=symptoms,
        prevention=prevention,
        treatment=treatment
    )

    return {
        "success": True,
        "history_id": history_record.id,
        "image_path": image_rel_url,
        "plant_name": plant_name,
        "disease_name": disease_name,
        "disease_id": disease_id,
        "status": status,
        "confidence": confidence,
        "is_low_confidence": is_low_conf,
        "warning_message": prediction.get("warning_message"),
        "severity": severity,
        "diseased_area_pct": diseased_area_pct,
        "description": description,
        "symptoms": symptoms,
        "causes": causes,
        "prevention": prevention,
        "treatment": treatment,
        "model_type": prediction.get("model_type"),
        "inference_time_ms": prediction.get("inference_time_ms"),
        "top_predictions": prediction.get("top_predictions", [])
    }
