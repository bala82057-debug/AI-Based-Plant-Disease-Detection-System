from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.history_service import get_dashboard_statistics

router = APIRouter(prefix="/api/statistics", tags=["Statistics"])

@router.get("")
def get_statistics(db: Session = Depends(get_db)):
    """
    Returns aggregated dashboard metrics and charts data.
    """
    stats = get_dashboard_statistics(db)
    return {
        "success": True,
        "data": stats
    }
