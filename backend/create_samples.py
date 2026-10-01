import os
from PIL import Image, ImageDraw, ImageFilter
from app.config import STATIC_SAMPLES_DIR, UPLOAD_DIR
from app.database.session import SessionLocal, init_db
from app.database.seed_data import seed_database
from app.database.models import DetectionHistory
from datetime import datetime, timedelta

def create_sample_leaf_images():
    STATIC_SAMPLES_DIR.mkdir(parents=True, exist_ok=True)
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    samples = [
        {"name": "tomato_early_blight.jpg", "type": "early_blight", "plant": "Tomato"},
        {"name": "tomato_late_blight.jpg", "type": "late_blight", "plant": "Tomato"},
        {"name": "tomato_healthy.jpg", "type": "healthy", "plant": "Tomato"},
        {"name": "tomato_yellow_curl.jpg", "type": "yellow_curl", "plant": "Tomato"},
        {"name": "apple_scab.jpg", "type": "scab", "plant": "Apple"},
        {"name": "corn_rust.jpg", "type": "rust", "plant": "Corn"},
        {"name": "potato_early_blight.jpg", "type": "early_blight", "plant": "Potato"},
        {"name": "pepper_bacterial_spot.jpg", "type": "bacterial_spot", "plant": "Pepper"},
        {"name": "strawberry_leaf_scorch.jpg", "type": "scorch", "plant": "Strawberry"},
        {"name": "grape_black_rot.jpg", "type": "black_rot", "plant": "Grape"}
    ]

    for item in samples:
        file_path = STATIC_SAMPLES_DIR / item["name"]
        upload_copy = UPLOAD_DIR / item["name"]

        img = Image.new("RGB", (400, 400), (245, 247, 245))
        draw = ImageDraw.Draw(img)

        # Base leaf shape (oval/ellipse)
        leaf_color = (46, 125, 50) if item["type"] != "yellow_curl" else (160, 180, 40)
        draw.ellipse([70, 40, 330, 360], fill=leaf_color, outline=(30, 90, 35), width=3)

        # Draw main stem and leaf veins
        vein_color = (60, 150, 65) if item["type"] != "yellow_curl" else (190, 200, 60)
        draw.line([200, 40, 200, 360], fill=vein_color, width=4)
        for y in range(80, 340, 35):
            draw.line([200, y, 110, y - 25], fill=vein_color, width=2)
            draw.line([200, y, 290, y - 25], fill=vein_color, width=2)

        # Disease specific spots
        if item["type"] == "early_blight":
            # Concentric rings
            spots = [(140, 130), (260, 180), (160, 260), (240, 290)]
            for sx, sy in spots:
                draw.ellipse([sx-25, sy-25, sx+25, sy+25], fill=(180, 190, 60))
                draw.ellipse([sx-18, sy-18, sx+18, sy+18], fill=(90, 55, 25))
                draw.ellipse([sx-10, sy-10, sx+10, sy+10], fill=(140, 90, 40))
                draw.ellipse([sx-4, sy-4, sx+4, sy+4], fill=(45, 25, 10))

        elif item["type"] == "late_blight":
            # Dark water-soaked lesions with fuzzy edge
            draw.ellipse([110, 100, 210, 190], fill=(50, 45, 40))
            draw.ellipse([210, 190, 310, 300], fill=(65, 50, 45))
            draw.ellipse([120, 240, 190, 310], fill=(70, 55, 40))

        elif item["type"] == "rust":
            # Reddish-cinnamon powdery pustules
            for rx in range(120, 280, 22):
                for ry in range(90, 310, 26):
                    draw.ellipse([rx, ry, rx+9, ry+9], fill=(180, 75, 20))

        elif item["type"] == "scab":
            # Olive/black velvety lesions
            spots = [(150, 120), (250, 140), (180, 210), (230, 270), (140, 290)]
            for sx, sy in spots:
                draw.ellipse([sx-16, sy-14, sx+16, sy+14], fill=(40, 45, 30))
                draw.ellipse([sx-8, sy-7, sx+8, sy+7], fill=(20, 25, 15))

        elif item["type"] == "bacterial_spot":
            # Small angular brown spots with yellow halos
            for bx, by in [(130, 110), (170, 150), (240, 130), (260, 220), (150, 250), (220, 300)]:
                draw.ellipse([bx-12, by-12, bx+12, by+12], fill=(210, 200, 40))
                draw.ellipse([bx-7, by-7, bx+7, by+7], fill=(70, 40, 20))

        elif item["type"] == "scorch":
            # Reddish edge scorch
            draw.arc([75, 45, 325, 355], start=40, end=140, fill=(130, 30, 20), width=18)
            draw.arc([75, 45, 325, 355], start=220, end=320, fill=(130, 30, 20), width=16)

        # Smooth slightly
        img = img.filter(ImageFilter.SMOOTH_MORE)
        img.save(file_path, "JPEG", quality=90)
        img.save(upload_copy, "JPEG", quality=90)

    print("Sample leaf images generated successfully.")

def seed_demo_history():
    init_db()
    db = SessionLocal()
    seed_database(db)

    count = db.query(DetectionHistory).count()
    if count == 0:
        now = datetime.utcnow()
        demo_records = [
            DetectionHistory(
                image_path="/static_samples/tomato_early_blight.jpg",
                plant_name="Tomato",
                disease_name="Tomato Early Blight",
                status="Diseased",
                confidence=94.7,
                severity="Moderate",
                diseased_area_pct=26.4,
                symptoms="Dark brown spots with concentric target rings on lower foliage.",
                prevention="Maintain good air circulation, avoid overhead watering, mulch base.",
                treatment="Apply copper fungicide or chlorothalonil immediately; prune infected leaves.",
                created_at=now - timedelta(hours=2, minutes=15)
            ),
            DetectionHistory(
                image_path="/static_samples/apple_scab.jpg",
                plant_name="Apple",
                disease_name="Apple Scab",
                status="Diseased",
                confidence=92.3,
                severity="High",
                diseased_area_pct=34.1,
                symptoms="Olive-green to velvety brown spots on leaves; early defoliation.",
                prevention="Prune canopy for airflow, rake fallen leaves in autumn.",
                treatment="Apply captan, myclobutanil or sulfur every 7-10 days in wet conditions.",
                created_at=now - timedelta(hours=5, minutes=40)
            ),
            DetectionHistory(
                image_path="/static_samples/tomato_healthy.jpg",
                plant_name="Tomato",
                disease_name="Tomato Healthy",
                status="Healthy",
                confidence=98.1,
                severity="None",
                diseased_area_pct=0.0,
                symptoms="Deep green foliage, robust turgidity, zero lesion spots.",
                prevention="Maintain balanced irrigation and weekly scout monitoring.",
                treatment="No disease treatment required. Continue standard plant nutrition.",
                created_at=now - timedelta(days=1, hours=3)
            ),
            DetectionHistory(
                image_path="/static_samples/corn_rust.jpg",
                plant_name="Corn",
                disease_name="Corn Common Rust",
                status="Diseased",
                confidence=91.5,
                severity="Moderate",
                diseased_area_pct=21.8,
                symptoms="Cinnamon brown powdery pustules erupting across leaf surface.",
                prevention="Plant Rp-gene resistant hybrid varieties, plant early in spring.",
                treatment="Apply foliar triazole or strobilurin fungicides if symptoms appear pre-tassel.",
                created_at=now - timedelta(days=1, hours=7)
            ),
            DetectionHistory(
                image_path="/static_samples/pepper_bacterial_spot.jpg",
                plant_name="Pepper",
                disease_name="Pepper Bacterial Spot",
                status="Diseased",
                confidence=89.2,
                severity="Mild",
                diseased_area_pct=11.3,
                symptoms="Small water-soaked brownish spots with yellow halos.",
                prevention="Use certified disease-free seed, avoid working in wet foliage.",
                treatment="Spray fixed copper with mancozeb, remove heavily infected lower leaves.",
                created_at=now - timedelta(days=2, hours=4)
            )
        ]
        for rec in demo_records:
            db.add(rec)
        db.commit()
        print("Demo detection history records added.")
    db.close()

if __name__ == "__main__":
    create_sample_leaf_images()
    seed_demo_history()
