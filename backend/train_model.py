"""
PlantCare AI - Model Training & Transfer Learning Pipeline
Uses MobileNetV2 with PyTorch on the PlantVillage 38-class dataset.
Exports trained weights to backend/model/plant_disease_model.pth.
"""

import os
import argparse
from pathlib import Path

def train(data_dir: str, epochs: int = 15, batch_size: int = 32, lr: float = 0.0003):
    try:
        import torch
        import torch.nn as nn
        import torch.optim as optim
        from torchvision import datasets, models, transforms
        from torch.utils.data import DataLoader
    except ImportError:
        print("[Error] PyTorch and torchvision are required for training. Install with: pip install torch torchvision")
        return

    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    print(f"[Training] Using compute device: {device}")

    # Data Augmentation & Normalization
    data_transforms = {
        'train': transforms.Compose([
            transforms.RandomResizedCrop(224),
            transforms.RandomHorizontalFlip(),
            transforms.RandomRotation(15),
            transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
        'val': transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
    }

    train_dir = os.path.join(data_dir, 'train')
    val_dir = os.path.join(data_dir, 'val')

    if not os.path.exists(train_dir):
        print(f"[Warning] Training directory '{train_dir}' not found. Please organize dataset into train/ and val/ folders.")
        return

    train_dataset = datasets.ImageFolder(train_dir, data_transforms['train'])
    val_dataset = datasets.ImageFolder(val_dir, data_transforms['val']) if os.path.exists(val_dir) else None

    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=2)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, num_workers=2) if val_dataset else None

    num_classes = len(train_dataset.classes)
    print(f"[Training] Found {len(train_dataset)} training images across {num_classes} classes.")

    # Load pretrained MobileNetV2
    print("[Training] Initializing MobileNetV2 pretrained backbone...")
    model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.DEFAULT)

    # Replace final classification layer
    in_features = model.classifier[1].in_features
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.3),
        nn.Linear(in_features, 512),
        nn.ReLU(),
        nn.Dropout(p=0.2),
        nn.Linear(512, num_classes)
    )
    model = model.to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.AdamW(model.parameters(), lr=lr, weight_decay=1e-4)
    scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs)

    best_acc = 0.0
    output_dir = Path(__file__).resolve().parent / "model"
    output_dir.mkdir(parents=True, exist_ok=True)
    save_path = output_dir / "plant_disease_model.pth"

    for epoch in range(epochs):
        print(f"\n--- Epoch {epoch + 1}/{epochs} ---")
        model.train()
        running_loss = 0.0
        corrects = 0

        for inputs, labels in train_loader:
            inputs, labels = inputs.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            _, preds = torch.max(outputs, 1)
            running_loss += loss.item() * inputs.size(0)
            corrects += torch.sum(preds == labels.data)

        scheduler.step()
        epoch_loss = running_loss / len(train_dataset)
        epoch_acc = corrects.double() / len(train_dataset)
        print(f"Train Loss: {epoch_loss:.4f} | Train Acc: {epoch_acc:.4f}")

        # Validation phase
        if val_loader:
            model.eval()
            val_loss = 0.0
            val_corrects = 0
            with torch.no_grad():
                for inputs, labels in val_loader:
                    inputs, labels = inputs.to(device), labels.to(device)
                    outputs = model(inputs)
                    loss = criterion(outputs, labels)
                    _, preds = torch.max(outputs, 1)
                    val_loss += loss.item() * inputs.size(0)
                    val_corrects += torch.sum(preds == labels.data)

            val_acc = val_corrects.double() / len(val_dataset)
            print(f"Val Loss: {val_loss / len(val_dataset):.4f} | Val Acc: {val_acc:.4f}")

            if val_acc > best_acc:
                best_acc = val_acc
                torch.save(model, str(save_path))
                print(f"[Checkpoint] Saved best model with validation accuracy {best_acc:.4f} to {save_path}")
        else:
            torch.save(model, str(save_path))
            print(f"[Checkpoint] Saved model checkpoint to {save_path}")

    print("\nTraining completed successfully!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train Plant Disease Detection Model")
    parser.add_argument("--data_dir", type=str, default="dataset/plantvillage", help="Path to dataset")
    parser.add_argument("--epochs", type=int, default=10, help="Number of training epochs")
    parser.add_argument("--batch_size", type=int, default=32, help="Batch size")
    parser.add_argument("--lr", type=float, default=0.0003, help="Learning rate")
    args = parser.parse_args()

    train(args.data_dir, args.epochs, args.batch_size, args.lr)
