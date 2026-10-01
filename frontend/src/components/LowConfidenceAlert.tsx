import React from 'react';
import { AlertTriangle, HelpCircle, RefreshCw } from 'lucide-react';

interface LowConfidenceAlertProps {
  confidence: number;
  onTryAnother: () => void;
}

export const LowConfidenceAlert: React.FC<LowConfidenceAlertProps> = ({ confidence, onTryAnother }) => {
  return (
    <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/90 p-5 shadow-sm text-slate-800 space-y-3 animate-in fade-in">
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-amber-950 text-base">Low Confidence Detection ({confidence}%)</h4>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-200 text-amber-900">
              Uncertain
            </span>
          </div>
          <p className="text-sm text-amber-900 font-medium leading-relaxed">
            The AI is uncertain about this prediction. Please upload a clearer image or consult an agricultural professional.
          </p>
        </div>
      </div>

      {/* Helpful diagnosis tips */}
      <div className="pt-2 border-t border-amber-200/80 text-xs text-amber-800 space-y-1.5 pl-11">
        <p className="font-semibold flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" /> Why might this happen?
        </p>
        <ul className="list-disc pl-4 space-y-0.5 text-amber-700">
          <li>The leaf is out of focus, backlit, or has heavy reflections.</li>
          <li>Multiple overlapping leaves or background clutter (soil, hands, sky).</li>
          <li>Early symptom stage not yet clearly differentiated from nutrient stress.</li>
        </ul>
      </div>

      <div className="flex justify-end pt-1">
        <button
          onClick={onTryAnother}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Upload Another Image</span>
        </button>
      </div>
    </div>
  );
};
