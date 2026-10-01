import React, { useState, useEffect } from 'react';
import { History, Trash2, Search, RefreshCw, Calendar, Sparkles } from 'lucide-react';
import type { HistoryItem } from '../types';
import { getHistory, deleteHistory } from '../services/api';

interface HistoryPageProps {
  onShowToast: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void;
  onNavigate: (tab: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onShowToast, onNavigate }) => {
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedRecord, setSelectedRecord] = useState<HistoryItem | null>(null);

  useEffect(() => {
    fetchHistoryList();
  }, []);

  const fetchHistoryList = async () => {
    try {
      setLoading(true);
      const data = await getHistory(100);
      setHistoryList(data);
    } catch (err: any) {
      onShowToast('error', 'Failed to load detection history.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete history record #${id}?`)) {
      return;
    }
    try {
      await deleteHistory(id);
      setHistoryList((prev) => prev.filter((r) => r.id !== id));
      if (selectedRecord?.id === id) setSelectedRecord(null);
      onShowToast('success', `History record #${id} removed successfully.`);
    } catch (err: any) {
      onShowToast('error', 'Failed to delete record.');
    }
  };

  const filteredHistory = historyList.filter((item) => {
    const matchesStatus =
      filterStatus === 'All' ? true : item.status === filterStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.plant_name.toLowerCase().includes(q) ||
      item.disease_name.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <History className="w-3.5 h-3.5" />
            <span>Foliar Audit Log</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1">
            Plant Detection History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Complete archive of historical plant leaf diagnoses, timestamps, and confidence scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchHistoryList}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => onNavigate('detect')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scan New Leaf</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search history by plant or disease name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50/50 focus:outline-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-700 focus:outline-emerald-500 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Healthy">Healthy</option>
            <option value="Diseased">Diseased</option>
            <option value="Uncertain">Uncertain</option>
          </select>
        </div>
      </div>

      {/* History Grid / List */}
      {loading ? (
        <div className="p-16 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600">Loading detection records...</p>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <History className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-800">No detection records found</h3>
          <p className="text-xs text-slate-500">Perform your first leaf diagnosis to see history logs here.</p>
          <button
            onClick={() => onNavigate('detect')}
            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold cursor-pointer"
          >
            <span>Scan A Leaf</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedRecord(item)}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all p-5 flex flex-col justify-between space-y-4 cursor-pointer group"
            >
              <div className="space-y-3">
                {/* Specimen image thumbnail */}
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={item.image_path}
                    alt={item.disease_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] shadow-xs ${
                        item.status === 'Healthy'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-rose-500 text-white'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/60 backdrop-blur-xs text-white">
                    {item.confidence}% Conf.
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                    {item.plant_name}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                    {item.disease_name}
                  </h3>
                </div>

                {item.symptoms && (
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.symptoms}
                  </p>
                )}
              </div>

              {/* Footer info & delete button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {item.created_at}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleDelete(item.id, e)}
                    title="Delete record"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Record Inspection Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-xl w-full border border-slate-200 space-y-4 p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-emerald-600 tracking-wider">
                  {selectedRecord.plant_name}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedRecord.disease_name}
                </h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedRecord.status === 'Healthy'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {selectedRecord.status}
              </span>
            </div>

            <div className="aspect-16/10 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={selectedRecord.image_path}
                alt={selectedRecord.disease_name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl">
              <div>
                <span className="text-slate-400 font-medium">Confidence:</span>
                <p className="font-bold text-slate-800 text-sm">{selectedRecord.confidence}%</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Severity:</span>
                <p className="font-bold text-slate-800 text-sm">{selectedRecord.severity}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Scanned Date:</span>
                <p className="text-slate-700">{selectedRecord.created_at}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Record ID:</span>
                <p className="text-slate-700">#{selectedRecord.id}</p>
              </div>
            </div>

            {selectedRecord.prevention && (
              <div className="text-xs text-slate-600 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                <strong className="text-emerald-900">Prevention:</strong> {selectedRecord.prevention}
              </div>
            )}

            {selectedRecord.treatment && (
              <div className="text-xs text-slate-600 bg-sky-50/60 p-3 rounded-xl border border-sky-100">
                <strong className="text-sky-900">Treatment:</strong> {selectedRecord.treatment}
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
