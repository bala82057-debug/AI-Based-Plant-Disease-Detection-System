from PIL import Image
import numpy as np

def analyze_leaf_severity(pil_img: Image.Image):
    """
    Analyzes leaf surface to estimate disease severity by segmenting
    leaf pixels and measuring necrotic (brown/black) or chlorotic (yellow) lesions.
    Returns:
      diseased_area_pct: float (0.0 to 100.0)
      severity_label: "None" | "Mild" | "Moderate" | "Severe"
      is_leaf_detected: bool
    """
    # Resize for fast, robust color analysis
    img = pil_img.resize((150, 150))
    rgb = np.array(img, dtype=np.float32)

    r = rgb[:, :, 0]
    g = rgb[:, :, 1]
    b = rgb[:, :, 2]

    # Brightness and chroma
    intensity = (r + g + b) / 3.0

    # Plant leaf segmentation:
    # Leaves typically have higher green relative to blue, or significant yellow/brown foliage tone
    # Exclude near-white backgrounds (> 240) and deep pitch-black borders (< 15)
    non_background = (intensity > 20) & (intensity < 240)

    # Green vegetation index: 2*G - R - B
    exg = 2.0 * g - r - b
    
    # Yellow/brown tissue (chlorosis / necrosis)
    # Chlorosis has high red & green, low blue: (r > 80) & (g > 80) & (b < 100) & (abs(r - g) < 50)
    chlorosis = (r > 70) & (g > 70) & (b < 80) & (r + g > 160)
    
    # Necrosis / lesions (dark brown / black spots on leaf)
    # Lower intensity than surrounding healthy leaf, r > b, g < 110
    necrosis = (r > b) & (r > 35) & (r < 120) & (g < 110) & (intensity < 100)

    leaf_mask = non_background & ((exg > 0) | chlorosis | necrosis)
    total_leaf_pixels = np.sum(leaf_mask)

    if total_leaf_pixels < 250:
        # Very little plant material detected in the frame
        return 0.0, "None", False

    # Diseased pixels are chlorotic or necrotic spots within the leaf mask
    diseased_mask = leaf_mask & (chlorosis | necrosis | (exg < -15))
    diseased_pixels = np.sum(diseased_mask)

    diseased_area_pct = float((diseased_pixels / total_leaf_pixels) * 100.0)
    diseased_area_pct = min(100.0, max(0.0, diseased_area_pct))

    # Determine severity rating
    if diseased_area_pct < 2.0:
        severity_label = "None"
    elif diseased_area_pct < 15.0:
        severity_label = "Mild"
    elif diseased_area_pct < 40.0:
        severity_label = "Moderate"
    else:
        severity_label = "Severe"

    return round(diseased_area_pct, 1), severity_label, True
