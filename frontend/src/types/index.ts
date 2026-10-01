export interface TopPrediction {
  label: string;
  plant: string;
  confidence: number;
  is_healthy?: boolean;
}

export interface PredictionResult {
  success: boolean;
  history_id?: number;
  image_path: string;
  plant_name: string;
  disease_name: string;
  disease_id?: number | null;
  status: 'Healthy' | 'Diseased' | 'Uncertain';
  confidence: number;
  is_low_confidence: boolean;
  warning_message?: string | null;
  severity: 'None' | 'Mild' | 'Moderate' | 'Severe';
  diseased_area_pct: number;
  description: string;
  symptoms: string;
  causes: string;
  prevention: string;
  treatment: string;
  model_type?: string;
  inference_time_ms?: number;
  top_predictions: TopPrediction[];
}

export interface DiseaseItem {
  id: number;
  plant_name: string;
  disease_name: string;
  description: string;
  symptoms: string;
  causes: string;
  prevention: string;
  treatment: string;
  severity_level: string;
  is_healthy: boolean;
  image_example_url?: string;
}

export interface HistoryItem {
  id: number;
  image_path: string;
  plant_name: string;
  disease_name: string;
  status: 'Healthy' | 'Diseased' | 'Uncertain';
  confidence: number;
  severity: string;
  diseased_area_pct: number;
  symptoms?: string;
  prevention?: string;
  treatment?: string;
  created_at: string;
}

export interface DashboardStats {
  total_analyses: number;
  healthy_count: number;
  diseased_count: number;
  uncertain_count: number;
  average_confidence: number;
  common_diseases: Array<{
    disease_name: string;
    plant_name: string;
    count: number;
  }>;
  plant_distribution: Array<{
    plant_name: string;
    count: number;
  }>;
  recent_detections: HistoryItem[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}
