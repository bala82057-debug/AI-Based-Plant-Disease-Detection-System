from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.history_service import (
    get_history_records,
    add_history_record,
    delete_history_record
)

router = APIRouter(prefix="/api/history", tags=["History"])

class HistoryCreateSchema(BaseModel):
    image_path: str
    plant_name: str
    disease_name: str
    status: str
    confidence: float
    severity: Optional[str] = "None"
    diseased_area_pct: Optional[float] = 0.0
    symptoms: Optional[str] = None
    prevention: Optional[str] = None
    treatment: Optional[str] = None

@router.get("")
def list_history(
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    """
    Returns recorded plant disease detection scans.
    """
    records = get_history_records(db, limit=limit, offset=offset)
    return {
        "success": True,
        "count": len(records),
        "data": [r.to_dict() for r in records]
    }

@router.post("")
def create_history_record(
    payload: HistoryCreateSchema,
    db: Session = Depends(get_db)
):
    """
    Manually save or log a detection result into history.
    """
    record = add_history_record(
        db=db,
        image_path=payload.image_path,
        plant_name=payload.plant_name,
        disease_name=payload.disease_name,
        status=payload.status,
        confidence=payload.confidence,
        severity=payload.severity or "None",
        diseased_area_pct=payload.diseased_area_pct or 0.0,
        symptoms=payload.symptoms,
        prevention=payload.prevention,
        treatment=payload.treatment
    )
    return {
        "success": True,
        "message": "History record saved successfully.",
        "data": record.to_dict()
    }

@router.delete("/{record_id}")
def remove_history_record(record_id: int, db: Session = Depends(get_db)):
    """
    Deletes an individual history entry.
    """
    deleted = delete_history_record(db, record_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="History record not found.")
    return {
        "success": True,
        "message": f"History record #{record_id} deleted successfully."
    }
