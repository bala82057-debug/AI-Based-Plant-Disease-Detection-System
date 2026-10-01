import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, AlertCircle, Check } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedBlobUrl, setCapturedBlobUrl] = useState<string | null>(null);
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
      setCapturedBlobUrl(null);
      setTempFile(null);
      setCameraError(null);
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    stopCamera();
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser environment.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      setCameraError(err.message || 'Unable to access camera. Please allow camera permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `leaf_photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
          setTempFile(file);
          setCapturedBlobUrl(URL.createObjectURL(blob));
        }
      },
      'image/jpeg',
      0.92
    );
  };

  const handleConfirm = () => {
    if (tempFile) {
      onCapture(tempFile);
      onClose();
    }
  };

  const handleRetake = () => {
    setCapturedBlobUrl(null);
    setTempFile(null);
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-900">Capture Leaf Photo</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {cameraError ? (
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
              <h4 className="font-semibold text-amber-900">Camera Unavailable</h4>
              <p className="text-sm text-amber-800">{cameraError}</p>
              <p className="text-xs text-amber-600">
                You can still upload an image from your device storage using the drag-and-drop file picker.
              </p>
              <button
                onClick={startCamera}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retry Camera
              </button>
            </div>
          ) : (
            <div className="relative aspect-4/3 bg-slate-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
              {!capturedBlobUrl ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* Targeting frame overlay */}
                  <div className="absolute inset-8 border-2 border-dashed border-white/50 rounded-2xl pointer-events-none flex items-center justify-center">
                    <p className="text-xs text-white/70 bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs">
                      Align leaf within frame
                    </p>
                  </div>
                </>
              ) : (
                <img
                  src={capturedBlobUrl}
                  alt="Captured leaf preview"
                  className="w-full h-full object-contain bg-slate-900"
                />
              )}
            </div>
          )}

          {/* Hidden Canvas */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Controls */}
          {!cameraError && (
            <div className="flex items-center justify-between mt-6">
              {!capturedBlobUrl ? (
                <>
                  <button
                    onClick={toggleFacingMode}
                    type="button"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Flip Camera
                  </button>
                  <button
                    onClick={handleCapturePhoto}
                    type="button"
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 transition-all transform active:scale-95 cursor-pointer"
                  >
                    <Camera className="w-5 h-5" /> Take Photo
                  </button>
                  <div className="w-20" />
                </>
              ) : (
                <div className="flex items-center justify-end gap-3 w-full">
                  <button
                    onClick={handleRetake}
                    type="button"
                    className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Retake
                  </button>
                  <button
                    onClick={handleConfirm}
                    type="button"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    <Check className="w-4 h-4" /> Use Photo
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
