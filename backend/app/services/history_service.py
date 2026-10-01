from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from app.database.models import DetectionHistory

def get_history_records(db: Session, limit: int = 50, offset: int = 0) -> List[DetectionHistory]:
    return (
        db.query(DetectionHistory)
        .order_by(desc(DetectionHistory.created_at))
        .offset(offset)
        .limit(limit)
        .all()
    )

def add_history_record(
    db: Session,
    image_path: str,
    plant_name: str,
    disease_name: str,
    status: str,
    confidence: float,
    severity: str = "None",
    diseased_area_pct: float = 0.0,
    symptoms: Optional[str] = None,
    prevention: Optional[str] = None,
    treatment: Optional[str] = None
) -> DetectionHistory:
    record = DetectionHistory(
        image_path=image_path,
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
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

def delete_history_record(db: Session, record_id: int) -> bool:
    record = db.query(DetectionHistory).filter(DetectionHistory.id == record_id).first()
    if record:
        db.delete(record)
        db.commit()
        return True
    return False

def get_dashboard_statistics(db: Session) -> Dict[str, Any]:
    total_analyses = db.query(DetectionHistory).count()
    healthy_count = db.query(DetectionHistory).filter(DetectionHistory.status == "Healthy").count()
    diseased_count = db.query(DetectionHistory).filter(DetectionHistory.status == "Diseased").count()
    uncertain_count = db.query(DetectionHistory).filter(DetectionHistory.status == "Uncertain").count()

    # Most commonly detected diseases (excluding Healthy and Uncertain)
    common_diseases_query = (
        db.query(
            DetectionHistory.disease_name,
            DetectionHistory.plant_name,
            func.count(DetectionHistory.id).label("count")
        )
        .filter(DetectionHistory.status == "Diseased")
        .group_by(DetectionHistory.disease_name, DetectionHistory.plant_name)
        .order_by(desc("count"))
        .limit(5)
        .all()
    )
    common_diseases = [
        {"disease_name": row[0], "plant_name": row[1], "count": row[2]}
        for row in common_diseases_query
    ]

    # Plant distribution
    plant_dist_query = (
        db.query(
            DetectionHistory.plant_name,
            func.count(DetectionHistory.id).label("count")
        )
        .group_by(DetectionHistory.plant_name)
        .order_by(desc("count"))
        .limit(6)
        .all()
    )
    plant_distribution = [
        {"plant_name": row[0], "count": row[1]}
        for row in plant_dist_query
    ]

    # Average confidence
    avg_conf = db.query(func.avg(DetectionHistory.confidence)).scalar() or 0.0

    # Recent 5 detections
    recent = (
        db.query(DetectionHistory)
        .order_by(desc(DetectionHistory.created_at))
        .limit(5)
        .all()
    )

    return {
        "total_analyses": total_analyses,
        "healthy_count": healthy_count,
        "diseased_count": diseased_count,
        "uncertain_count": uncertain_count,
        "average_confidence": round(float(avg_conf), 1),
        "common_diseases": common_diseases,
        "plant_distribution": plant_distribution,
        "recent_detections": [r.to_dict() for r in recent]
    }
