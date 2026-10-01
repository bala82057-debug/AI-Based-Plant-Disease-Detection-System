import React, { useState } from 'react';
import { Leaf, Sparkles, LayoutDashboard, History, BookOpen, Info, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Leaf },
    { id: 'detect', label: 'Detect', icon: Sparkles },
    { id: 'diseases', label: 'Diseases', icon: BookOpen },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'history', label: 'History', icon: History },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Branding */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-all">
              <Leaf className="w-6 h-6 text-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                  PlantCare<span className="text-emerald-600">AI</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="w-3 h-3 mr-0.5 inline" /> AI v2
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">AI-Powered Plant Disease Detection</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('detect')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all transform active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Detect Disease</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-emerald-100 bg-white/98 backdrop-blur-xl px-4 pt-2 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('detect')}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 text-white font-medium shadow-md shadow-emerald-600/20"
            >
              <Sparkles className="w-5 h-5" />
              <span>Detect Disease Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
