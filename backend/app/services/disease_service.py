from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.database.models import Disease

def get_all_diseases(
    db: Session, 
    plant_name: Optional[str] = None, 
    search: Optional[str] = None,
    is_healthy: Optional[bool] = None
) -> List[Disease]:
    query = db.query(Disease)
    if plant_name:
        query = query.filter(Disease.plant_name.ilike(f"%{plant_name}%"))
    if is_healthy is not None:
        query = query.filter(Disease.is_healthy == is_healthy)
    if search:
        search_filter = or_(
            Disease.disease_name.ilike(f"%{search}%"),
            Disease.plant_name.ilike(f"%{search}%"),
            Disease.symptoms.ilike(f"%{search}%"),
            Disease.description.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)
    return query.order_by(Disease.plant_name, Disease.disease_name).all()

def get_disease_by_id(db: Session, disease_id: int) -> Optional[Disease]:
    return db.query(Disease).filter(Disease.id == disease_id).first()

def get_disease_by_name(db: Session, disease_name: str, plant_name: Optional[str] = None) -> Optional[Disease]:
    query = db.query(Disease).filter(Disease.disease_name.ilike(f"%{disease_name}%"))
    if plant_name:
        query = query.filter(Disease.plant_name.ilike(f"%{plant_name}%"))
    return query.first()
