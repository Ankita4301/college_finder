import { useState } from 'react';
import {
  Header,
  CollegeListingView,
  ComparisonView,
  PredictorView,
} from './components';
import { useCollegeSearch, useComparison } from './hooks';
import { MOCK_COLLEGES } from './data/colleges';

type ActiveTab = 'search' | 'compare' | 'predict';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('search');

  // Search & Filter state
  const search = useCollegeSearch();

  // Comparison state
  const comparison = useComparison();

  // Comparison tab search (independent from main search)
  const comparisonSearch = useCollegeSearch();

  // Handle compare from search tab
  const handleCompareFromSearch = (collegeId: string) => {
    const college = MOCK_COLLEGES.find(c => c.id === collegeId);
    if (college) {
      comparison.addCollege(college);
      setActiveTab('compare');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Search & Listing Tab */}
        {activeTab === 'search' && (
          <CollegeListingView
            searchTerm={search.searchTerm}
            onSearchChange={search.setSearchTerm}
            filters={search.filters}
            onFiltersChange={search.updateFilters}
            onResetFilters={search.resetFilters}
            colleges={search.colleges}
            filteredCount={search.filteredCount}
            currentPage={search.currentPage}
            onPageChange={search.setCurrentPage}
            totalPages={search.totalPages}
            onCompareClick={(college) => handleCompareFromSearch(college.id)}
          />
        )}

        {/* Comparison Tab */}
        {activeTab === 'compare' && (
          <ComparisonView
            selectedColleges={comparison.selectedColleges}
            allColleges={comparisonSearch.colleges}
            searchTerm={comparisonSearch.searchTerm}
            onSearchChange={comparisonSearch.setSearchTerm}
            filters={comparisonSearch.filters}
            onFiltersChange={comparisonSearch.updateFilters}
            onResetFilters={comparisonSearch.resetFilters}
            filteredCount={comparisonSearch.filteredCount}
            onToggleCollege={comparison.toggleCollege}
            onRemoveCollege={comparison.removeCollege}
          />
        )}

        {/* Predictor Tab */}
        {activeTab === 'predict' && (
          <PredictorView
            onCompareClick={(collegeId) => handleCompareFromSearch(collegeId)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="container-custom text-center text-sm">
          <p>&copy; 2024 College Finder. Built for better college decisions.</p>
          <p className="mt-2">
            Made with React, TypeScript, and Tailwind CSS for production-grade performance.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
