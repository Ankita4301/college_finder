import { Search, RotateCcw, Filter, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { FilterOptions } from '../types';
import { STATES, ENTRANCE_EXAMS } from '../data/colleges';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: FilterOptions;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
  onReset: () => void;
  resultsCount: number;
}

export function SearchAndFilter({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  onReset,
  resultsCount,
}: SearchAndFilterProps) {
  const [expandedFilters, setExpandedFilters] = useState(false);

  const hasActiveFilters =
    Object.values(filters).some(val =>
      Array.isArray(val) ? val.length > 0 : val !== undefined
    );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by college name, location, or specialization..."
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          className="input-field pl-10 w-full"
        />
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Found <span className="font-semibold text-gray-900">{resultsCount}</span> colleges
        </p>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Clear filters
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setExpandedFilters(!expandedFilters)}
        className="w-full flex items-center justify-between p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-semibold text-gray-900"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Advanced Filters
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-1 bg-primary-600 text-white text-xs rounded-full font-bold">
              {Object.values(filters).filter(val =>
                Array.isArray(val) ? val.length > 0 : val !== undefined
              ).length}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${expandedFilters ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expandable Filters */}
      {expandedFilters && (
        <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
          {/* Fee Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Annual Fee Range</label>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-600">Min: ₹{filters.minFees ? (filters.minFees / 100000).toFixed(1) : '0'}L</label>
                <input
                  type="range"
                  min="0"
                  max="3000000"
                  step="100000"
                  value={filters.minFees || 0}
                  onChange={e => onFiltersChange({ minFees: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Max: ₹{filters.maxFees ? (filters.maxFees / 100000).toFixed(1) : '30'}L</label>
                <input
                  type="range"
                  min="0"
                  max="3000000"
                  step="100000"
                  value={filters.maxFees || 3000000}
                  onChange={e => onFiltersChange({ maxFees: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Minimum Rating</label>
            <select
              value={filters.minRating || ''}
              onChange={e =>
                onFiltersChange({
                  minRating: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="input-field text-sm"
            >
              <option value="">All Ratings</option>
              <option value="3">3.0+</option>
              <option value="3.5">3.5+</option>
              <option value="4">4.0+</option>
              <option value="4.5">4.5+</option>
            </select>
          </div>

          {/* College Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">College Type</label>
            <select
              value={filters.collegeType || 'all'}
              onChange={e =>
                onFiltersChange({
                  collegeType: (e.target.value as any) || 'all',
                })
              }
              className="input-field text-sm"
            >
              <option value="all">All Types</option>
              <option value="government">Government</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Entrance Exam Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Entrance Exams</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {ENTRANCE_EXAMS.map(exam => (
                <label key={exam} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(filters.entranceExams || []).includes(exam)}
                    onChange={e => {
                      const newExams = e.target.checked
                        ? [...(filters.entranceExams || []), exam]
                        : (filters.entranceExams || []).filter(ex => ex !== exam);
                      onFiltersChange({ entranceExams: newExams.length > 0 ? newExams : undefined });
                    }}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">{exam}</span>
                </label>
              ))}
            </div>
          </div>

          {/* State Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">States</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {STATES.map(state => (
                <label key={state} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(filters.states || []).includes(state)}
                    onChange={e => {
                      const newStates = e.target.checked
                        ? [...(filters.states || []), state]
                        : (filters.states || []).filter(s => s !== state);
                      onFiltersChange({ states: newStates.length > 0 ? newStates : undefined });
                    }}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">{state}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cutoff Rank Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Cutoff Rank Range</label>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-600">Min: {filters.minCutoff || 0}</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={filters.minCutoff || 0}
                  onChange={e => onFiltersChange({ minCutoff: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Max: {filters.maxCutoff || 10000}</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={filters.maxCutoff || 10000}
                  onChange={e => onFiltersChange({ maxCutoff: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
