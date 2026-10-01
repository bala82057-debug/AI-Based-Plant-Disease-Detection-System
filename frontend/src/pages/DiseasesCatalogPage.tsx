import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Bug, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import type { DiseaseItem } from '../types';
import { getDiseases } from '../services/api';
import { DiseaseDetailModal } from '../components/DiseaseDetailModal';

interface DiseasesCatalogPageProps {
  onSelectSampleForDetection: (url: string, name: string) => void;
  onShowToast: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void;
}

export const DiseasesCatalogPage: React.FC<DiseasesCatalogPageProps> = ({
  onSelectSampleForDetection,
  onShowToast,
}) => {
  const [diseases, setDiseases] = useState<DiseaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedHealth, setSelectedHealth] = useState<string>('All');
  const [activeModalDisease, setActiveModalDisease] = useState<DiseaseItem | null>(null);

  const cropList = ['All', 'Tomato', 'Potato', 'Pepper', 'Apple', 'Corn', 'Grape', 'Strawberry'];

  useEffect(() => {
    fetchDiseasesList();
  }, [selectedCrop, selectedHealth]);

  const fetchDiseasesList = async () => {
    try {
      setLoading(true);
      const plantParam = selectedCrop === 'All' ? undefined : selectedCrop;
      const healthyParam = selectedHealth === 'All' ? undefined : selectedHealth === 'Healthy';
      const data = await getDiseases({
        plant: plantParam,
        healthy: healthyParam,
      });
      setDiseases(data);
    } catch (err: any) {
      onShowToast('error', 'Failed to load disease catalog.');
    } finally {
      setLoading(false);
    }
  };

  const filteredDiseases = diseases.filter((d) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      d.disease_name.toLowerCase().includes(query) ||
      d.plant_name.toLowerCase().includes(query) ||
      d.symptoms.toLowerCase().includes(query) ||
      d.causes.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 pb-16">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Foliar Pathology Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Crop Disease Catalog
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Explore comprehensive diagnostic symptoms, causes, biological prevention, and chemical management strategies.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search diseases, symptoms, pathogens, or management remedies..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-emerald-500 text-sm bg-slate-50/50"
            />
          </div>

          {/* Health Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Condition:</span>
            <select
              value={selectedHealth}
              onChange={(e) => setSelectedHealth(e.target.value)}
              className="py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-700 focus:outline-emerald-500 cursor-pointer"
            >
              <option value="All">All Profiles</option>
              <option value="Diseased">Diseased Only</option>
              <option value="Healthy">Healthy Profiles</option>
            </select>
          </div>
        </div>

        {/* Crop Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs text-slate-500 font-medium shrink-0">Crops:</span>
          {cropList.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCrop === crop
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* Disease Cards Grid */}
      {loading ? (
        <div className="p-16 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600">Loading disease database...</p>
        </div>
      ) : filteredDiseases.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <Bug className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-800">No diseases found matching query</h3>
          <p className="text-xs text-slate-500">Try adjusting your search terms or crop filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all p-5 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                      {d.plant_name}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                      {d.disease_name}
                    </h3>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      d.is_healthy
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {d.is_healthy ? 'Healthy' : d.severity_level}
                  </span>
                </div>

                {/* Symptoms Preview */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {d.symptoms}
                </p>

                {/* Quick Info Tags */}
                <div className="text-[11px] text-slate-500 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="line-clamp-1">
                    <strong className="text-slate-700">Causes:</strong> {d.causes}
                  </p>
                  <p className="line-clamp-1">
                    <strong className="text-slate-700">Prevention:</strong> {d.prevention}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalDisease(d)}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {d.image_example_url && (
                  <button
                    onClick={() => onSelectSampleForDetection(d.image_example_url!, `${d.disease_name}.jpg`)}
                    className="flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>Test In AI</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Disease Detail Modal */}
      <DiseaseDetailModal
        disease={activeModalDisease}
        onClose={() => setActiveModalDisease(null)}
        onSelectForDetection={onSelectSampleForDetection}
      />
    </div>
  );
};
