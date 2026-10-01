# PlantCare AI Model Directory

This directory stores deep learning model weights used for inference.

## Supported Model Formats

1. **PyTorch Model File:** `plant_disease_model.pth`
   - Either a full serialized `torch.nn.Module` or a state dict.
   - Input shape: `(1, 3, 224, 224)` normalized using standard ImageNet mean & std.
   - Output shape: `(1, 38)` logits corresponding to PlantVillage classes.

2. **ONNX Model File:** `plant_disease_model.onnx`
   - High performance cross-platform execution.

## Default Architecture

- **Backbone:** MobileNetV2 (Pretrained on ImageNet-1k)
- **Classifier Head:**
  - Dropout(0.3)
  - Linear(1280, 512)
  - ReLU()
  - Dropout(0.2)
  - Linear(512, 38)
- **Loss:** Categorical Cross-Entropy
- **Input Size:** 224 x 224 x 3

## Automatic Fallback & Zero-Downtime

If no `.pth` weight file is located in this directory, the system automatically initializes the **PlantCare Vision Diagnostic Pipeline** (an intelligent computer vision and leaf lesion pathology engine).

When a `.pth` model file is dropped into this folder and the backend restarts, the system detects it and switches to the PyTorch CNN inference engine automatically without requiring any frontend changes.
