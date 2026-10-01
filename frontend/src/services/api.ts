import type { PredictionResult, DiseaseItem, HistoryItem, DashboardStats } from '../types';

const API_BASE = '/api';

export async function predictImage(file: File): Promise<PredictionResult> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorDetail = 'Prediction request failed.';
    try {
      const errJson = await response.json();
      if (errJson.detail) errorDetail = errJson.detail;
    } catch {
      // fallback
    }
    throw new Error(errorDetail);
  }

  return response.json();
}

export async function predictSampleImage(sampleUrl: string, sampleName: string): Promise<PredictionResult> {
  const res = await fetch(sampleUrl);
  if (!res.ok) throw new Error('Failed to load sample image.');
  const blob = await res.blob();
  const file = new File([blob], sampleName, { type: 'image/jpeg' });
  return predictImage(file);
}

export async function getDiseases(params?: {
  plant?: string;
  search?: string;
  healthy?: boolean;
}): Promise<DiseaseItem[]> {
  const query = new URLSearchParams();
  if (params?.plant) query.append('plant', params.plant);
  if (params?.search) query.append('search', params.search);
  if (params?.healthy !== undefined) query.append('healthy', String(params.healthy));

  const url = `${API_BASE}/diseases?${query.toString()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch diseases.');
  const json = await response.json();
  return json.data;
}

export async function getDiseaseById(id: number): Promise<DiseaseItem> {
  const response = await fetch(`${API_BASE}/diseases/${id}`);
  if (!response.ok) throw new Error('Disease not found.');
  const json = await response.json();
  return json.data;
}

export async function getHistory(limit = 50, offset = 0): Promise<HistoryItem[]> {
  const response = await fetch(`${API_BASE}/history?limit=${limit}&offset=${offset}`);
  if (!response.ok) throw new Error('Failed to fetch detection history.');
  const json = await response.json();
  return json.data;
}

export async function deleteHistory(id: number): Promise<boolean> {
  const response = await fetch(`${API_BASE}/history/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete history record.');
  return true;
}

export async function getStatistics(): Promise<DashboardStats> {
  const response = await fetch(`${API_BASE}/statistics`);
  if (!response.ok) throw new Error('Failed to fetch statistics.');
  const json = await response.json();
  return json.data;
}

export async function getHealth(): Promise<{ status: string; model_type: string }> {
  const response = await fetch(`${API_BASE}/health`);
  if (!response.ok) throw new Error('Backend health check failed.');
  return response.json();
}
