import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CheckCircle, 
  AlertOctagon, 
  Activity, 
  Scan, 
  RotateCw, 
  TrendingUp, 
  Leaf, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import type { DashboardStats } from '../types';
import { getStatistics } from '../services/api';

interface DashboardPageProps {
  onNavigate: (tab: string) => void;
  onShowToast: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onShowToast }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getStatistics();
      setStats(data);
    } catch (err: any) {
      onShowToast('error', 'Failed to load dashboard statistics.');
    } finally {
      setLoading(false);
    }
  };

  const healthyPct = stats && stats.total_analyses > 0
    ? Math.round((stats.healthy_count / stats.total_analyses) * 100)
    : 0;

  const diseasedPct = stats && stats.total_analyses > 0
    ? Math.round((stats.diseased_count / stats.total_analyses) * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Telemetry & Diagnostic Analytics</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1">
            PlantCare Analytics Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time aggregate data on foliar scans, pathogen frequencies, and crop health rates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchStats}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Stats</span>
          </button>
          <button
            onClick={() => onNavigate('detect')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Scan className="w-3.5 h-3.5" />
            <span>New Scan</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Analyses */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Scans</span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <Scan className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">
              {stats?.total_analyses ?? 0}
            </span>
            <span className="text-xs text-slate-400 font-medium">diagnoses</span>
          </div>
          <p className="text-[11px] text-slate-500">Foliar leaf images processed</p>
        </div>

        {/* Healthy Plants */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Healthy Foliage</span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">
              {stats?.healthy_count ?? 0}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {healthyPct}%
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Normal chlorophyll & structure</p>
        </div>

        {/* Diseased Plants */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Diseased Foliage</span>
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
              <AlertOctagon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-600">
              {stats?.diseased_count ?? 0}
            </span>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
              {diseasedPct}%
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Requiring IPM or fungicide treatment</p>
        </div>

        {/* Average Confidence */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Avg Confidence</span>
            <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-sky-700">
              {stats?.average_confidence ?? 0}%
            </span>
            <span className="text-xs text-slate-400 font-medium">certainty</span>
          </div>
          <p className="text-[11px] text-slate-500">Model posterior calibration</p>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Commonly Detected Diseases */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Most Prevalent Plant Diseases</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">By Frequency</span>
          </div>

          {stats?.common_diseases && stats.common_diseases.length > 0 ? (
            <div className="space-y-4 pt-1">
              {stats.common_diseases.map((item, idx) => {
                const maxCount = stats.common_diseases[0].count || 1;
                const barPct = Math.round((item.count / maxCount) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-800">
                        {item.disease_name}{' '}
                        <span className="text-slate-400 font-normal">({item.plant_name})</span>
                      </span>
                      <span className="font-bold text-slate-600 font-mono">
                        {item.count} detections
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-700"
                        style={{ width: `${barPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-8 text-center">No diseased records logged yet.</p>
          )}
        </div>

        {/* Plant Species Breakdown & Crop Health Meter */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                <Leaf className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Crop Species Distribution</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">Scanned Crops</span>
          </div>

          {stats?.plant_distribution && stats.plant_distribution.length > 0 ? (
            <div className="space-y-4 pt-1">
              {stats.plant_distribution.map((item, idx) => {
                const total = stats.total_analyses || 1;
                const sharePct = Math.round((item.count / total) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-800">{item.plant_name}</span>
                      <span className="font-bold text-slate-600 font-mono">
                        {item.count} scans ({sharePct}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                        style={{ width: `${sharePct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-8 text-center">No plant scans available.</p>
          )}
        </div>
      </div>

      {/* Recent Detections Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-base">Recent Field Detections</h3>
          </div>
          <button
            onClick={() => onNavigate('history')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View Full History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {stats?.recent_detections && stats.recent_detections.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Specimen</th>
                  <th className="py-3 px-4">Crop</th>
                  <th className="py-3 px-4">Condition</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Confidence</th>
                  <th className="py-3 px-4 rounded-r-xl">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.recent_detections.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <img
                        src={row.image_path}
                        alt={row.plant_name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                      />
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{row.plant_name}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{row.disease_name}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          row.status === 'Healthy'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-700 font-mono">
                      {row.confidence}%
                    </td>
                    <td className="py-3 px-4 text-slate-400">{row.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-500 py-6 text-center">No detection records found.</p>
        )}
      </div>
    </div>
  );
};
