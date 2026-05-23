import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CollegeCard } from './CollegeCard';
import { SearchAndFilter } from './SearchAndFilter';
import { College, FilterOptions } from '../types';

interface CollegeListingViewProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: FilterOptions;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
  colleges: College[];
  filteredCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  onCompareClick: (college: College) => void;
}

export function CollegeListingView({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  onResetFilters,
  colleges,
  filteredCount,
  currentPage,
  onPageChange,
  totalPages,
  onCompareClick,
}: CollegeListingViewProps) {
  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        filters={filters}
        onFiltersChange={onFiltersChange}
        onReset={onResetFilters}
        resultsCount={filteredCount}
      />

      {/* Colleges Grid */}
      {colleges.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map(college => (
              <CollegeCard
                key={college.id}
                college={college}
                onCompare={onCompareClick}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      page === currentPage
                        ? 'bg-primary-600 text-white'
                        : 'border border-gray-300 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg font-semibold">No colleges found</p>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
}
