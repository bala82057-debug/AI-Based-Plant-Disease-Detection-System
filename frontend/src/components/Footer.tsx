import React from 'react';
import { Leaf, ShieldCheck, Cpu, Database, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                PlantCare<span className="text-emerald-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering farmers, agronomists, and home gardeners with instant AI-driven crop pathology diagnosis,
              actionable prevention strategies, and integrated pest management recommendations.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <Cpu className="w-4 h-4 text-emerald-400" /> MobileNetV2 CNN Architecture
              </span>
              <span className="flex items-center gap-1">
                <Database className="w-4 h-4 text-emerald-400" /> PlantVillage 38 Classes
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition-colors">
                  Home Landing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('detect')} className="hover:text-emerald-400 transition-colors">
                  Leaf Disease Detector
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('diseases')} className="hover:text-emerald-400 transition-colors">
                  Disease Encyclopedia
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-emerald-400 transition-colors">
                  Analytics Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('history')} className="hover:text-emerald-400 transition-colors">
                  Detection History
                </button>
              </li>
            </ul>
          </div>

          {/* Technical Info & Notice */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">Disclaimer & Guidelines</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              PlantCare AI is an assistive diagnostic tool. In case of commercial crop losses, always verify with
              certified university agricultural extension agents before spraying restricted chemicals.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-300 text-xs border border-emerald-800/60">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Full-Stack AI Project</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} PlantCare AI. Built for Smart Agricultural Health.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Farmers & AgriTech Researchers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
