from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.disease_service import get_all_diseases, get_disease_by_id

router = APIRouter(prefix="/api/diseases", tags=["Diseases"])

@router.get("")
def list_diseases(
    plant: Optional[str] = Query(None, description="Filter by plant name (e.g. Tomato, Apple)"),
    search: Optional[str] = Query(None, description="Search term in name, symptoms, or description"),
    healthy: Optional[bool] = Query(None, description="Filter healthy profiles"),
    db: Session = Depends(get_db)
):
    """
    Returns disease entries from the structured database.
    """
    diseases = get_all_diseases(db, plant_name=plant, search=search, is_healthy=healthy)
    return {
        "success": True,
        "count": len(diseases),
        "data": [d.to_dict() for d in diseases]
    }

@router.get("/{disease_id}")
def get_disease(disease_id: int, db: Session = Depends(get_db)):
    """
    Returns single disease profile by ID.
    """
    disease = get_disease_by_id(db, disease_id)
    if not disease:
        raise HTTPException(status_code=404, detail="Disease not found.")
    return {
        "success": True,
        "data": disease.to_dict()
    }
