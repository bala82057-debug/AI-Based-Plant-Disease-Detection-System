import React from 'react';
import { X, ShieldCheck, Bug, ThermometerSnowflake, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import type { DiseaseItem } from '../types';

interface DiseaseDetailModalProps {
  disease: DiseaseItem | null;
  onClose: () => void;
  onSelectForDetection?: (sampleUrl: string, sampleName: string) => void;
}

export const DiseaseDetailModal: React.FC<DiseaseDetailModalProps> = ({
  disease,
  onClose,
  onSelectForDetection,
}) => {
  if (!disease) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                {disease.plant_name}
              </span>
              <h3 className="text-lg font-bold text-slate-900">{disease.disease_name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Status Badge & Severity */}
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                disease.is_healthy
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {disease.is_healthy ? 'Healthy Condition' : 'Pathogen Disease'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              Severity: {disease.severity_level}
            </span>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Overview</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{disease.description}</p>
          </div>

          {/* Symptoms */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <ThermometerSnowflake className="w-4 h-4 text-amber-600" /> Symptoms & Indicators
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">{disease.symptoms}</p>
          </div>

          {/* Causes */}
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
              <Bug className="w-4 h-4 text-rose-600" /> Etiology & Environmental Causes
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">{disease.causes}</p>
          </div>

          {/* Prevention */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Preventative Cultural Practices
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">{disease.prevention}</p>
          </div>

          {/* Treatment */}
          <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-sky-600" /> Treatment & Chemical / Organic Control
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">{disease.treatment}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>
          {disease.image_example_url && onSelectForDetection && (
            <button
              onClick={() => {
                onSelectForDetection(disease.image_example_url!, `${disease.disease_name}.jpg`);
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Test This Specimen in AI</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
