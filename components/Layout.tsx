import React from 'react';
import { BookOpen, Menu } from 'lucide-react';
import { ViewState } from '../types';
import { SCHOOL_NAME } from '../constants';
import SchoolLogo from './SchoolLogo';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const NavItem = ({ view, label, icon: Icon }: { view: ViewState; label: string; icon: any }) => (
    <button
      onClick={() => {
        onChangeView(view);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all w-full md:w-auto ${
        currentView === view
          ? 'bg-slate-800 text-white shadow-md'
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer group" onClick={() => onChangeView('HOME')}>
              <div className="mr-3 transform group-hover:scale-105 transition-transform duration-300">
                <SchoolLogo className="w-10 h-10 text-slate-900" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight tracking-tight serif">{SCHOOL_NAME}</h1>
                <p className="text-xs text-slate-500 font-medium tracking-wider">교목: 소나무 · 교화: 목련</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-2">
              <NavItem view="HOME" label="학교 소개" icon={BookOpen} />
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-md"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-2 shadow-lg">
            <nav className="flex flex-col space-y-1">
              <NavItem view="HOME" label="학교 소개" icon={BookOpen} />
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <div className="flex justify-center mb-4">
             <SchoolLogo className="w-12 h-12 text-slate-700 opacity-50" />
          </div>
          <p className="serif tracking-widest uppercase mb-2 text-slate-500">Truth · Radiance · Harmony</p>
          <p>&copy; 2055 {SCHOOL_NAME}. All rights reserved.</p>
          <p className="mt-2 text-xs text-slate-600">관계자 외 열람 금지. 학생 개인정보 보호.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;