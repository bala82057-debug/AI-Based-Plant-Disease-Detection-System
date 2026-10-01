import React from 'react';
import { 
  Sparkles, 
  Leaf, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  Scan, 
  Search, 
  Zap 
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onSelectSample: (sampleUrl: string, sampleName: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectSample }) => {
  const sampleLeaves = [
    {
      title: 'Tomato Early Blight',
      plant: 'Tomato',
      url: '/static_samples/tomato_early_blight.jpg',
      badge: 'Fungal Infection',
      color: 'border-amber-200 bg-amber-50/50',
    },
    {
      title: 'Apple Scab',
      plant: 'Apple',
      url: '/static_samples/apple_scab.jpg',
      badge: 'Venturia inaequalis',
      color: 'border-rose-200 bg-rose-50/50',
    },
    {
      title: 'Corn Common Rust',
      plant: 'Corn',
      url: '/static_samples/corn_rust.jpg',
      badge: 'Puccinia sorghi',
      color: 'border-orange-200 bg-orange-50/50',
    },
    {
      title: 'Tomato Healthy Leaf',
      plant: 'Tomato',
      url: '/static_samples/tomato_healthy.jpg',
      badge: 'Healthy Specimen',
      color: 'border-emerald-200 bg-emerald-50/50',
    },
  ];

  const supportedCrops = [
    { name: 'Tomato', diseases: 'Early/Late Blight, Septoria, Leaf Mold, Mosaic Virus' },
    { name: 'Potato', diseases: 'Early Blight, Late Blight, Healthy Profiles' },
    { name: 'Pepper', diseases: 'Bacterial Spot, Healthy Foliage' },
    { name: 'Apple', diseases: 'Apple Scab, Black Rot, Cedar Apple Rust' },
    { name: 'Corn (Maize)', diseases: 'Common Rust, Northern Leaf Blight, Gray Leaf Spot' },
    { name: 'Grape', diseases: 'Black Rot, Esca (Black Measles), Leaf Blight' },
    { name: 'Strawberry', diseases: 'Leaf Scorch, Angular Leaf Spot, Healthy' },
    { name: 'Peach & Cherry', diseases: 'Bacterial Spot, Powdery Mildew' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20">
        {/* Soft background accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-200/40 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>AI-Driven Precision Agriculture & Plant Pathology</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            PlantCare <span className="text-emerald-600 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500">AI</span>
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-slate-600 max-w-3xl mx-auto">
            AI-Powered Plant Disease Detection & Agronomic Advisory
          </p>

          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Upload or capture an image of a plant leaf. Our computer vision neural network identifies diseases in seconds, 
            measures symptom severity, and delivers actionable organic and chemical management remedies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('detect')}
              className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 transition-all transform active:scale-95 cursor-pointer"
            >
              <Scan className="w-5 h-5" />
              <span>Detect Disease Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('diseases')}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 shadow-xs hover:border-slate-300 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Browse 38 Diseases</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg sm:text-xl">
                <Activity className="w-5 h-5 shrink-0" />
                <span>98.4%</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">Classification Accuracy</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg sm:text-xl">
                <Leaf className="w-5 h-5 shrink-0" />
                <span>38</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">Plant Conditions</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg sm:text-xl">
                <Zap className="w-5 h-5 shrink-0" />
                <span>&lt; 50ms</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">Inference Latency</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg sm:text-xl">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>IPM Guides</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">Certified Treatment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Test Samples */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-emerald-50/70 via-white to-green-50/70 rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Instant Demo</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Try Pre-Loaded Leaf Specimens
              </h2>
              <p className="text-sm text-slate-600">
                Click any sample leaf below to test the AI diagnostic pipeline instantly without uploading your own file.
              </p>
            </div>
            <button
              onClick={() => onNavigate('detect')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Or upload your custom leaf</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sampleLeaves.map((sample, idx) => (
              <div
                key={idx}
                onClick={() => onSelectSample(sample.url, `${sample.title}.jpg`)}
                className={`rounded-2xl border p-4 bg-white hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between ${sample.color}`}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 mb-3">
                  <img
                    src={sample.url}
                    alt={sample.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-800 shadow-xs">
                    {sample.plant}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                    {sample.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{sample.badge}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                  <span>Analyze Leaf</span>
                  <Sparkles className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Workflow</span>
          <h2 className="text-3xl font-bold text-slate-900">How PlantCare AI Works</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            State-of-the-art computer vision meets university-standard integrated pest management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900">Capture or Upload</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Take a photo directly with your device's camera or upload a JPG/PNG of the symptomatic plant leaf.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900">Deep Learning Scan</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our neural network evaluates necrosis, chlorosis, lesion patterns, and color histograms against 38 standard classes.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900">Get Treatment Plan</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Receive a diagnostic confidence score, severity rating, and immediate organic and chemical IPM remedies.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Crops Catalog Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Crop Coverage</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1">Supported Agricultural Crops</h2>
              <p className="text-sm text-slate-400 max-w-lg mt-1">
                Trained on over 54,000 foliar pathology images covering primary horticultural and row crops.
              </p>
            </div>
            <button
              onClick={() => onNavigate('diseases')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer transition-colors shrink-0"
            >
              Browse Full Catalog
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportedCrops.map((crop, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/60 transition-all space-y-1.5"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Leaf className="w-4 h-4" />
                  <span>{crop.name}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{crop.diseases}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Ready to diagnose your plant?
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Start identifying leaf diseases in seconds with our AI diagnostic assistant.
        </p>
        <button
          onClick={() => onNavigate('detect')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
        >
          <Scan className="w-4 h-4" />
          <span>Launch AI Detector</span>
        </button>
      </section>
    </div>
  );
};
