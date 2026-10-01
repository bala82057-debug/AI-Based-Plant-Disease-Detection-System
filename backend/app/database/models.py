from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Text, Boolean, DateTime
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Disease(Base):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True, index=True)
    plant_name = Column(String(100), nullable=False, index=True)
    disease_name = Column(String(150), nullable=False, index=True)
    description = Column(Text, nullable=False)
    symptoms = Column(Text, nullable=False)
    causes = Column(Text, nullable=False)
    prevention = Column(Text, nullable=False)
    treatment = Column(Text, nullable=False)
    severity_level = Column(String(50), default="Medium")
    is_healthy = Column(Boolean, default=False)
    image_example_url = Column(String(255), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "plant_name": self.plant_name,
            "disease_name": self.disease_name,
            "description": self.description,
            "symptoms": self.symptoms,
            "causes": self.causes,
            "prevention": self.prevention,
            "treatment": self.treatment,
            "severity_level": self.severity_level,
            "is_healthy": self.is_healthy,
            "image_example_url": self.image_example_url
        }

class DetectionHistory(Base):
    __tablename__ = "detection_history"

    id = Column(Integer, primary_key=True, index=True)
    image_path = Column(String(255), nullable=False)
    plant_name = Column(String(100), nullable=False)
    disease_name = Column(String(150), nullable=False)
    status = Column(String(50), nullable=False)  # Healthy, Diseased, Uncertain
    confidence = Column(Float, nullable=False)
    severity = Column(String(50), default="None")  # None, Mild, Moderate, Severe
    diseased_area_pct = Column(Float, default=0.0)
    symptoms = Column(Text, nullable=True)
    prevention = Column(Text, nullable=True)
    treatment = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "image_path": self.image_path,
            "plant_name": self.plant_name,
            "disease_name": self.disease_name,
            "status": self.status,
            "confidence": round(self.confidence, 1),
            "severity": self.severity,
            "diseased_area_pct": round(self.diseased_area_pct, 1),
            "symptoms": self.symptoms,
            "prevention": self.prevention,
            "treatment": self.treatment,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S") if self.created_at else None
        }
