import React from 'react';
import { 
  Leaf, 
  Cpu, 
  Database, 
  AlertTriangle, 
  Sparkles
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12 pb-16">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <Leaf className="w-3.5 h-3.5" />
          <span>Scientific & Architectural Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          About PlantCare AI
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Learn how convolutional neural networks, transfer learning, and foliar pathology knowledge 
          combine to empower sustainable crop disease protection.
        </p>
      </div>

      {/* 1. What the System Does */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Core Mission</span>
            <h2 className="text-xl font-bold text-slate-900">What PlantCare AI Does</h2>
          </div>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          Plant diseases cause between 20% and 40% of global agricultural yield losses annually. 
          PlantCare AI provides rapid, accessible, and automated foliar diagnosis directly in the field. 
          By taking a digital photo of a plant leaf, growers and agronomists instantly receive an accurate 
          pathogen identification, an objective estimation of diseased surface area severity, and integrated 
          pest management (IPM) guidelines.
        </p>
      </section>

      {/* 2. How AI & Image Classification Works */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Machine Learning</span>
            <h2 className="text-xl font-bold text-slate-900">How Image Classification Works</h2>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Image classification transforms raw pixel arrays into high-dimensional semantic feature representations. 
          Here is how our visual inference pipeline processes every uploaded leaf:
        </p>

        {/* Pipeline Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-600">01 / Input & Normalization</span>
            <h4 className="font-bold text-slate-900 text-sm">Foliar Normalization</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Image is validated, resized to 224x224 RGB, and standardized using ImageNet mean (0.485, 0.456, 0.406) and std (0.229, 0.224, 0.225).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-600">02 / Feature Extraction</span>
            <h4 className="font-bold text-slate-900 text-sm">Deep Convolutions</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inverted residual blocks with depthwise separable convolutions extract vein edges, chlorosis margins, and concentric ring textures.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-600">03 / Severity Estimation</span>
            <h4 className="font-bold text-slate-900 text-sm">Lesion Area Analysis</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Foliar segmentation masks necrotic spots vs healthy green chlorophyll, estimating percentage leaf surface damage.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-600">04 / Calibrated Softmax</span>
            <h4 className="font-bold text-slate-900 text-sm">Confidence & Output</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Logits are passed through a Softmax activation to generate probability distributions over 38 classes with uncertainty thresholds.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Dataset & Model Architecture */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Model Provenance</span>
            <h2 className="text-xl font-bold text-slate-900">Dataset & Transfer Learning Architecture</h2>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            The model is trained on the benchmark <strong>PlantVillage Dataset</strong>, consisting of 
            54,306 laboratory and field images encompassing 14 crop species and 26 distinct fungal, bacterial, 
            viral, and mite conditions alongside healthy specimens.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
              <span className="font-bold text-emerald-900 text-sm">MobileNetV2 Backbone</span>
              <p className="text-xs text-emerald-800">
                Lightweight convolutional architecture designed for low-latency edge and mobile inference with inverted residuals and linear bottlenecks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
              <span className="font-bold text-emerald-900 text-sm">Modular Weight Hot-Swapping</span>
              <p className="text-xs text-emerald-800">
                Custom trained weights (.pth / .onnx) can be dropped into <code>backend/model/</code> at any time without requiring frontend code modifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Limitations of AI-Based Plant Disease Detection */}
      <section className="bg-amber-50/80 rounded-3xl p-6 sm:p-8 border-2 border-amber-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-800">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Responsible AI Guidelines</span>
            <h2 className="text-xl font-bold text-amber-950">Limitations of AI Plant Diagnostics</h2>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-amber-900 leading-relaxed">
          <p>
            While deep learning models achieve high accuracy on visual leaf imagery, growers must keep the following real-world limitations in mind:
          </p>

          <ul className="list-disc pl-5 space-y-1.5 text-amber-950 font-medium">
            <li>
              <strong>Look-Alike Symptoms:</strong> Abiotic stresses (such as nitrogen deficiency, potassium scorch, or drought) can mimic foliar fungal infections.
            </li>
            <li>
              <strong>Lighting & Background Variances:</strong> Extreme sunlight glare, heavy shadows, or blurry camera focus can degrade classification confidence below 60%.
            </li>
            <li>
              <strong>Root & Vascular Diseases:</strong> Soil-borne pathogens (such as Fusarium or Verticillium wilt) exhibit leaf wilting that originates in root systems rather than the leaf surface.
            </li>
            <li>
              <strong>Pesticide Safety:</strong> Never apply restricted-use chemical pesticides without first confirming symptoms with a certified local agricultural extension agent or university plant pathology laboratory.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
