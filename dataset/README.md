# PlantVillage Dataset Information

This application uses the classification taxonomy of the standard **PlantVillage Dataset**, which contains over 54,306 images of healthy and diseased crop leaves across 38 distinct classes.

## Major Crops Covered:
- **Tomato** (9 conditions + Healthy)
- **Potato** (Early Blight, Late Blight, Healthy)
- **Pepper (Bell)** (Bacterial Spot, Healthy)
- **Apple** (Scab, Black Rot, Cedar Apple Rust, Healthy)
- **Corn (Maize)** (Common Rust, Northern Leaf Blight, Gray Leaf Spot, Healthy)
- **Grape** (Black Rot, Esca / Black Measles, Leaf Blight, Healthy)
- **Strawberry** (Leaf Scorch, Healthy)
- **Cherry, Peach, Orange, Blueberry, Squash, Soybean, Raspberry**

## Downloading the Dataset:
1. From Kaggle:
   `kaggle datasets download -d emmarex/plantdisease`
   or
   `kaggle datasets download -d vipoooool/new-plant-diseases-dataset`
2. Extract into `dataset/plantvillage/` with `train/` and `val/` subdirectories.
3. Run training:
   ```bash
   python backend/train_model.py --data_dir dataset/plantvillage --epochs 15
   ```
