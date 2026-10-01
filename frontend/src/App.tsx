import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { DetectPage } from './pages/DetectPage';
import { DiseasesCatalogPage } from './pages/DiseasesCatalogPage';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import type { ToastMessage } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedSample, setSelectedSample] = useState<{ url: string; name: string } | null>(null);

  const showToast = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    const id = `${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSelectSample = (sampleUrl: string, sampleName: string) => {
    setSelectedSample({ url: sampleUrl, name: sampleName });
    setActiveTab('detect');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 selection:bg-emerald-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 pt-6 sm:pt-8">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectSample={handleSelectSample}
          />
        )}

        {activeTab === 'detect' && (
          <DetectPage
            onShowToast={showToast}
            selectedSample={selectedSample}
            onClearSample={() => setSelectedSample(null)}
          />
        )}

        {activeTab === 'diseases' && (
          <DiseasesCatalogPage
            onSelectSampleForDetection={handleSelectSample}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'history' && (
          <HistoryPage
            onShowToast={showToast}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
