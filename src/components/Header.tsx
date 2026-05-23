import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  activeTab: 'search' | 'compare' | 'predict';
  onTabChange: (tab: 'search' | 'compare' | 'predict') => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">College Finder</h1>
              <p className="text-xs text-gray-600">Discover Your Perfect College</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onTabChange('search')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'search'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Search Colleges
            </button>
            <button
              onClick={() => onTabChange('compare')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'compare'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Compare
            </button>
            <button
              onClick={() => onTabChange('predict')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'predict'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Predictor
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-2">
            <button
              onClick={() => {
                onTabChange('search');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-2 rounded-lg font-medium text-left transition-colors ${
                activeTab === 'search'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Search Colleges
            </button>
            <button
              onClick={() => {
                onTabChange('compare');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-2 rounded-lg font-medium text-left transition-colors ${
                activeTab === 'compare'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Compare
            </button>
            <button
              onClick={() => {
                onTabChange('predict');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-2 rounded-lg font-medium text-left transition-colors ${
                activeTab === 'predict'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Predictor
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
