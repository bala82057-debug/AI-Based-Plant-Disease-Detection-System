import React from 'react';
import { 
  CheckCircle, 
  AlertOctagon, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw, 
  Printer, 
  Activity, 
  Bug, 
  ThermometerSnowflake, 
  ShieldAlert, 
  FileText 
} from 'lucide-react';
import type { PredictionResult } from '../types';
import { LowConfidenceAlert } from './LowConfidenceAlert';

interface ResultCardProps {
  result: PredictionResult;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const isHealthy = result.status === 'Healthy';
  const isUncertain = result.is_low_confidence || result.status === 'Uncertain';

  // Severity styling
  const severityColors = {
    None: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Mild: 'bg-sky-100 text-sky-800 border-sky-200',
    Moderate: 'bg-amber-100 text-amber-800 border-amber-200',
    Severe: 'bg-rose-100 text-rose-800 border-rose-200',
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-6">
      {/* Top Banner Status */}
      <div
        className={`px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b ${
          isUncertain
            ? 'bg-amber-500/10 border-amber-200'
            : isHealthy
            ? 'bg-emerald-500/10 border-emerald-200'
            : 'bg-rose-500/10 border-rose-200'
        }`}
      >
        <div className="flex items-center gap-3">
          {isUncertain ? (
            <div className="p-2 rounded-2xl bg-amber-500 text-white shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
          ) : isHealthy ? (
            <div className="p-2 rounded-2xl bg-emerald-600 text-white shadow-xs">
              <CheckCircle className="w-5 h-5" />
            </div>
          ) : (
            <div className="p-2 rounded-2xl bg-rose-600 text-white shadow-xs">
              <AlertOctagon className="w-5 h-5" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Diagnostic Status</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isUncertain
                    ? 'bg-amber-100 text-amber-800'
                    : isHealthy
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {result.status}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">
              {result.plant_name} — {result.disease_name}
            </h2>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            title="Print or Save PDF report"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Analyze Another</span>
          </button>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Low confidence handling alert if < 60% */}
        {isUncertain && (
          <LowConfidenceAlert confidence={result.confidence} onTryAnother={onReset} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Image + Visual Confidence + Metrics */}
          <div className="lg:col-span-5 space-y-6">
            {/* Plant Image Card */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 aspect-4/3 shadow-md group">
              <img
                src={result.image_path}
                alt={`${result.plant_name} ${result.disease_name}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white flex justify-between items-end">
                <div>
                  <p className="text-xs text-slate-300 font-medium">Scanned Leaf Specimen</p>
                  <p className="text-sm font-semibold">{result.plant_name}</p>
                </div>
                {result.inference_time_ms && (
                  <span className="text-[11px] bg-black/60 backdrop-blur-xs px-2 py-1 rounded-md text-emerald-300 font-mono">
                    ⚡ {result.inference_time_ms}ms
                  </span>
                )}
              </div>
            </div>

            {/* Confidence Score Bar */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-600" /> Model Confidence
                </span>
                <span
                  className={`text-lg font-black ${
                    result.confidence >= 80
                      ? 'text-emerald-600'
                      : result.confidence >= 60
                      ? 'text-amber-600'
                      : 'text-rose-600'
                  }`}
                >
                  {result.confidence}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    result.confidence >= 80
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                      : result.confidence >= 60
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                      : 'bg-gradient-to-r from-rose-400 to-rose-600'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(5, result.confidence))}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Confidence represents softmax posterior probability calibrated across 38 crop pathogen categories.
              </p>
            </div>

            {/* Severity & Affected Area Card */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Disease Severity</span>
                <div>
                  <span
                    className={`inline-block px-2.5 py-1 rounded-xl text-xs font-bold border ${
                      severityColors[result.severity] || severityColors.None
                    }`}
                  >
                    {result.severity}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Lesion Foliage Area</span>
                <p className="text-lg font-bold text-slate-800">
                  {result.diseased_area_pct}%
                </p>
              </div>
            </div>

            {/* Top Predictions Ranking */}
            {result.top_predictions && result.top_predictions.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Top Diagnostic Hypotheses
                </h4>
                <div className="space-y-2">
                  {result.top_predictions.map((pred, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 truncate max-w-[200px] font-medium">
                        {pred.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${pred.confidence}%` }}
                          />
                        </div>
                        <span className="font-semibold text-slate-600 w-10 text-right font-mono">
                          {pred.confidence}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Agronomic Details, Symptoms, Prevention, Treatment */}
          <div className="lg:col-span-7 space-y-5">
            {/* Description */}
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" /> Agronomic Overview
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">{result.description}</p>
            </div>

            {/* Symptoms */}
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
                <ThermometerSnowflake className="w-4 h-4 text-amber-600" /> Observed Symptoms
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">{result.symptoms}</p>
            </div>

            {/* Causes */}
            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-2">
                <Bug className="w-4 h-4 text-rose-600" /> Pathogen & Contributing Causes
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">{result.causes}</p>
            </div>

            {/* Prevention Recommendations */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Prevention & Cultural Management
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">{result.prevention}</p>
            </div>

            {/* Treatment / Management */}
            <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-sky-600" /> Immediate Treatment Recommendations
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">{result.treatment}</p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                AI Engine: <span className="font-semibold text-slate-600">{result.model_type || 'MobileNetV2 Vision CNN'}</span>
              </div>
              <button
                onClick={onReset}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Scan Another Plant Leaf</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
