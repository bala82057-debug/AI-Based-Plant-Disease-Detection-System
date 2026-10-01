import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Camera, 
  Trash2, 
  Sparkles, 
  Image as ImageIcon, 
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { PredictionResult } from '../types';
import { predictImage, predictSampleImage } from '../services/api';
import { ResultCard } from '../components/ResultCard';
import { CameraModal } from '../components/CameraModal';

interface DetectPageProps {
  onShowToast: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void;
  selectedSample?: { url: string; name: string } | null;
  onClearSample?: () => void;
}

export const DetectPage: React.FC<DetectPageProps> = ({
  onShowToast,
  selectedSample,
  onClearSample,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Quick sample leaf options
  const sampleOptions = [
    { title: 'Tomato Early Blight', url: '/static_samples/tomato_early_blight.jpg', file: 'tomato_early_blight.jpg' },
    { title: 'Corn Common Rust', url: '/static_samples/corn_rust.jpg', file: 'corn_rust.jpg' },
    { title: 'Apple Scab', url: '/static_samples/apple_scab.jpg', file: 'apple_scab.jpg' },
    { title: 'Tomato Healthy', url: '/static_samples/tomato_healthy.jpg', file: 'tomato_healthy.jpg' },
    { title: 'Potato Late Blight', url: '/static_samples/potato_late_blight.jpg', file: 'potato_late_blight.jpg' },
    { title: 'Pepper Bacterial Spot', url: '/static_samples/pepper_bacterial_spot.jpg', file: 'pepper_bacterial_spot.jpg' },
  ];

  // Auto-load if navigated with sample
  React.useEffect(() => {
    if (selectedSample) {
      handleSelectSample(selectedSample.url, selectedSample.name);
      if (onClearSample) onClearSample();
    }
  }, [selectedSample]);

  const handleFileSelect = (file: File) => {
    const validExtensions = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validExtensions.includes(file.type)) {
      onShowToast('error', 'Please upload a valid JPG, PNG, or WEBP image.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      onShowToast('error', 'File size exceeds 10MB limit.');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setFileDetails({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
    });
    setPredictionResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileDetails(null);
    setPredictionResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectSample = async (url: string, name: string) => {
    try {
      setIsAnalyzing(true);
      setPredictionResult(null);
      setPreviewUrl(url);
      setFileDetails({ name: name, size: 'Sample Specimen' });

      const result = await predictSampleImage(url, name);
      setPredictionResult(result);
      if (result.status === 'Healthy') {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }
      onShowToast('success', `Analysis complete: ${result.disease_name} detected.`);
    } catch (err: any) {
      onShowToast('error', err.message || 'Failed to analyze sample.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      onShowToast('warning', 'Please upload an image first.');
      return;
    }

    try {
      setIsAnalyzing(true);
      const result = await predictImage(selectedFile);
      setPredictionResult(result);

      if (result.status === 'Healthy') {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }

      onShowToast('success', `Analysis completed with ${result.confidence}% confidence.`);
    } catch (err: any) {
      onShowToast('error', err.message || 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 pb-16">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-Time Neural Plant Diagnosis</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          AI Plant Disease Detector
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Upload a clear photograph of an affected plant leaf or capture one live using your camera.
        </p>
      </div>

      {/* Main Upload / Result Area */}
      {!predictionResult ? (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            {!previewUrl ? (
              /* Drag & Drop Zone */
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-4 ${
                  isDragging
                    ? 'border-emerald-500 bg-emerald-50/60 scale-[0.99]'
                    : 'border-slate-300 hover:border-emerald-400 bg-slate-50/50 hover:bg-emerald-50/20'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                  <Upload className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <p className="text-base sm:text-lg font-bold text-slate-800">
                    Drag and drop your plant leaf image here
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Supports JPG, JPEG, PNG, or WEBP up to 10MB
                  </p>
                </div>

                {/* Secondary Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Browse Files
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCameraOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-emerald-600" />
                    <span>Use Camera</span>
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                />
              </div>
            ) : (
              /* Image Preview Card */
              <div className="space-y-6">
                <div className="relative aspect-16/10 sm:aspect-2/1 max-h-[380px] bg-slate-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Leaf specimen preview"
                    className="w-full h-full object-contain"
                  />

                  {/* Scanning Animation while analyzing */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center z-20">
                      <div className="animate-scan" />
                      <div className="p-4 rounded-2xl bg-black/75 backdrop-blur-md text-white text-center space-y-2 border border-emerald-500/40 shadow-xl">
                        <Sparkles className="w-6 h-6 text-emerald-400 mx-auto animate-spin" />
                        <p className="text-sm font-bold tracking-wide">
                          Neural Vision Network Scanning...
                        </p>
                        <p className="text-xs text-slate-300">
                          Extracting foliar textures, lesions & chlorosis patterns
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Metadata Badge */}
                  {fileDetails && (
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-medium truncate max-w-[200px]">{fileDetails.name}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-300">{fileDetails.size}</span>
                    </div>
                  )}
                </div>

                {/* Buttons: Analyze & Remove */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={handleRemoveImage}
                    disabled={isAnalyzing}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove Image</span>
                  </button>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => setIsCameraOpen(true)}
                      disabled={isAnalyzing}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      Retake with Camera
                    </button>
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isAnalyzing ? 'Analyzing Plant...' : 'Analyze Plant'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Clickable Sample Leaf Chips */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>Don't have a leaf image handy? Click any specimen to test:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {sampleOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectSample(opt.url, opt.file)}
                  disabled={isAnalyzing}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left text-xs font-semibold text-slate-700 disabled:opacity-50 cursor-pointer shadow-2xs"
                >
                  <img
                    src={opt.url}
                    alt={opt.title}
                    className="w-8 h-8 rounded-lg object-cover shrink-0"
                  />
                  <span className="truncate">{opt.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Detection Result View */
        <ResultCard
          result={predictionResult}
          onReset={handleRemoveImage}
        />
      )}

      {/* Live Camera Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleFileSelect}
      />
    </div>
  );
};
