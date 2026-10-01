"""
PlantVillage 38 standard classification labels mapping.
Provides metadata for each class: Plant species, disease name, and health status.
"""

PLANT_VILLAGE_CLASSES = [
    {
        "class_id": 0,
        "class_name": "Apple___Apple_scab",
        "plant_name": "Apple",
        "disease_name": "Apple Scab",
        "is_healthy": False
    },
    {
        "class_id": 1,
        "class_name": "Apple___Black_rot",
        "plant_name": "Apple",
        "disease_name": "Apple Black Rot",
        "is_healthy": False
    },
    {
        "class_id": 2,
        "class_name": "Apple___Cedar_apple_rust",
        "plant_name": "Apple",
        "disease_name": "Apple Cedar Rust",
        "is_healthy": False
    },
    {
        "class_id": 3,
        "class_name": "Apple___healthy",
        "plant_name": "Apple",
        "disease_name": "Apple Healthy",
        "is_healthy": True
    },
    {
        "class_id": 4,
        "class_name": "Blueberry___healthy",
        "plant_name": "Blueberry",
        "disease_name": "Blueberry Healthy",
        "is_healthy": True
    },
    {
        "class_id": 5,
        "class_name": "Cherry_(including_sour)___Powdery_mildew",
        "plant_name": "Cherry",
        "disease_name": "Cherry Powdery Mildew",
        "is_healthy": False
    },
    {
        "class_id": 6,
        "class_name": "Cherry_(including_sour)___healthy",
        "plant_name": "Cherry",
        "disease_name": "Cherry Healthy",
        "is_healthy": True
    },
    {
        "class_id": 7,
        "class_name": "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
        "plant_name": "Corn",
        "disease_name": "Corn Cercospora Leaf Spot",
        "is_healthy": False
    },
    {
        "class_id": 8,
        "class_name": "Corn_(maize)___Common_rust_",
        "plant_name": "Corn",
        "disease_name": "Corn Common Rust",
        "is_healthy": False
    },
    {
        "class_id": 9,
        "class_name": "Corn_(maize)___Northern_Leaf_Blight",
        "plant_name": "Corn",
        "disease_name": "Corn Northern Leaf Blight",
        "is_healthy": False
    },
    {
        "class_id": 10,
        "class_name": "Corn_(maize)___healthy",
        "plant_name": "Corn",
        "disease_name": "Corn Healthy",
        "is_healthy": True
    },
    {
        "class_id": 11,
        "class_name": "Grape___Black_rot",
        "plant_name": "Grape",
        "disease_name": "Grape Black Rot",
        "is_healthy": False
    },
    {
        "class_id": 12,
        "class_name": "Grape___Esca_(Black_Measles)",
        "plant_name": "Grape",
        "disease_name": "Grape Esca (Black Measles)",
        "is_healthy": False
    },
    {
        "class_id": 13,
        "class_name": "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
        "plant_name": "Grape",
        "disease_name": "Grape Leaf Blight",
        "is_healthy": False
    },
    {
        "class_id": 14,
        "class_name": "Grape___healthy",
        "plant_name": "Grape",
        "disease_name": "Grape Healthy",
        "is_healthy": True
    },
    {
        "class_id": 15,
        "class_name": "Orange___Haunglongbing_(Citrus_greening)",
        "plant_name": "Orange",
        "disease_name": "Citrus Greening",
        "is_healthy": False
    },
    {
        "class_id": 16,
        "class_name": "Peach___Bacterial_spot",
        "plant_name": "Peach",
        "disease_name": "Peach Bacterial Spot",
        "is_healthy": False
    },
    {
        "class_id": 17,
        "class_name": "Peach___healthy",
        "plant_name": "Peach",
        "disease_name": "Peach Healthy",
        "is_healthy": True
    },
    {
        "class_id": 18,
        "class_name": "Pepper,_bell___Bacterial_spot",
        "plant_name": "Pepper",
        "disease_name": "Pepper Bacterial Spot",
        "is_healthy": False
    },
    {
        "class_id": 19,
        "class_name": "Pepper,_bell___healthy",
        "plant_name": "Pepper",
        "disease_name": "Pepper Healthy",
        "is_healthy": True
    },
    {
        "class_id": 20,
        "class_name": "Potato___Early_blight",
        "plant_name": "Potato",
        "disease_name": "Potato Early Blight",
        "is_healthy": False
    },
    {
        "class_id": 21,
        "class_name": "Potato___Late_blight",
        "plant_name": "Potato",
        "disease_name": "Potato Late Blight",
        "is_healthy": False
    },
    {
        "class_id": 22,
        "class_name": "Potato___healthy",
        "plant_name": "Potato",
        "disease_name": "Potato Healthy",
        "is_healthy": True
    },
    {
        "class_id": 23,
        "class_name": "Raspberry___healthy",
        "plant_name": "Raspberry",
        "disease_name": "Raspberry Healthy",
        "is_healthy": True
    },
    {
        "class_id": 24,
        "class_name": "Soybean___healthy",
        "plant_name": "Soybean",
        "disease_name": "Soybean Healthy",
        "is_healthy": True
    },
    {
        "class_id": 25,
        "class_name": "Squash___Powdery_mildew",
        "plant_name": "Squash",
        "disease_name": "Squash Powdery Mildew",
        "is_healthy": False
    },
    {
        "class_id": 26,
        "class_name": "Strawberry___Leaf_scorch",
        "plant_name": "Strawberry",
        "disease_name": "Strawberry Leaf Scorch",
        "is_healthy": False
    },
    {
        "class_id": 27,
        "class_name": "Strawberry___healthy",
        "plant_name": "Strawberry",
        "disease_name": "Strawberry Healthy",
        "is_healthy": True
    },
    {
        "class_id": 28,
        "class_name": "Tomato___Bacterial_spot",
        "plant_name": "Tomato",
        "disease_name": "Tomato Bacterial Spot",
        "is_healthy": False
    },
    {
        "class_id": 29,
        "class_name": "Tomato___Early_blight",
        "plant_name": "Tomato",
        "disease_name": "Tomato Early Blight",
        "is_healthy": False
    },
    {
        "class_id": 30,
        "class_name": "Tomato___Late_blight",
        "plant_name": "Tomato",
        "disease_name": "Tomato Late Blight",
        "is_healthy": False
    },
    {
        "class_id": 31,
        "class_name": "Tomato___Leaf_Mold",
        "plant_name": "Tomato",
        "disease_name": "Tomato Leaf Mold",
        "is_healthy": False
    },
    {
        "class_id": 32,
        "class_name": "Tomato___Septoria_leaf_spot",
        "plant_name": "Tomato",
        "disease_name": "Tomato Septoria Leaf Spot",
        "is_healthy": False
    },
    {
        "class_id": 33,
        "class_name": "Tomato___Spider_mites Two-spotted_spider_mite",
        "plant_name": "Tomato",
        "disease_name": "Tomato Spider Mites",
        "is_healthy": False
    },
    {
        "class_id": 34,
        "class_name": "Tomato___Target_Spot",
        "plant_name": "Tomato",
        "disease_name": "Tomato Target Spot",
        "is_healthy": False
    },
    {
        "class_id": 35,
        "class_name": "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
        "plant_name": "Tomato",
        "disease_name": "Tomato Yellow Leaf Curl Virus",
        "is_healthy": False
    },
    {
        "class_id": 36,
        "class_name": "Tomato___Tomato_mosaic_virus",
        "plant_name": "Tomato",
        "disease_name": "Tomato Mosaic Virus",
        "is_healthy": False
    },
    {
        "class_id": 37,
        "class_name": "Tomato___healthy",
        "plant_name": "Tomato",
        "disease_name": "Tomato Healthy",
        "is_healthy": True
    }
]

CLASS_BY_ID = {c["class_id"]: c for c in PLANT_VILLAGE_CLASSES}
CLASS_BY_NAME = {c["disease_name"].lower(): c for c in PLANT_VILLAGE_CLASSES}
