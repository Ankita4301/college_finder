import { X, Star, TrendingUp, Users, MapPin, Award } from 'lucide-react';
import { College } from '../types';
import { CollegeCard } from './CollegeCard';
import { SearchAndFilter } from './SearchAndFilter';
import { FilterOptions } from '../types';

interface ComparisonViewProps {
  selectedColleges: College[];
  allColleges: College[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: FilterOptions;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
  filteredCount: number;
  onToggleCollege: (college: College) => void;
  onRemoveCollege: (collegeId: string) => void;
}

export function ComparisonView({
  selectedColleges,
  allColleges,
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  onResetFilters,
  filteredCount,
  onToggleCollege,
  onRemoveCollege,
}: ComparisonViewProps) {
  const comparisonMetrics = [
    { key: 'rating', label: 'Rating', icon: Star, format: (v: number) => v.toFixed(1) },
    { key: 'placement_percentage', label: 'Placement %', icon: TrendingUp, format: (v: number) => `${v}%` },
    { key: 'avg_package', label: 'Avg Package', icon: Award, format: (v: number) => `₹${(v / 100000).toFixed(1)}L` },
    { key: 'fees', label: 'Annual Fee', icon: Users, format: (v: number) => `₹${(v / 100000).toFixed(1)}L` },
    { key: 'cutoff_rank', label: 'Cutoff Rank', icon: Award, format: (v: number) => v.toString() },
    { key: 'seats', label: 'Total Seats', icon: Users, format: (v: number) => v.toString() },
    { key: 'campus_size', label: 'Campus (acres)', icon: MapPin, format: (v: number) => v.toString() },
  ];

  return (
    <div className="space-y-6">
      {/* Selected Colleges Comparison */}
      {selectedColleges.length > 0 && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Compare Colleges ({selectedColleges.length})
            </h2>
            <p className="text-gray-600">Side-by-side comparison of your selected colleges</p>
          </div>

          {/* Horizontal Scroll Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50 sticky left-0 z-10 min-w-48">
                    Metric
                  </th>
                  {selectedColleges.map(college => (
                    <th key={college.id} className="py-3 px-4 text-left min-w-56 bg-primary-50">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-sm">{college.name}</div>
                          <div className="text-xs text-gray-600 mt-1">{college.location}</div>
                        </div>
                        <button
                          onClick={() => onRemoveCollege(college.id)}
                          className="p-1 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonMetrics.map((metric, idx) => (
                  <tr
                    key={metric.key}
                    className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 sticky left-0 z-10">
                      <div className="flex items-center gap-2">
                        <metric.icon className="w-4 h-4 text-gray-600" />
                        {metric.label}
                      </div>
                    </td>
                    {selectedColleges.map(college => {
                      const value = college[metric.key as keyof College];
                      return (
                        <td key={college.id} className="py-4 px-4 text-gray-900 font-medium">
                          {metric.format(Number(value))}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* College Type Row */}
                <tr className="border-b border-gray-200 bg-white">
                  <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 sticky left-0 z-10">
                    College Type
                  </td>
                  {selectedColleges.map(college => (
                    <td key={college.id} className="py-4 px-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                          college.type === 'government'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {college.type === 'government' ? 'Government' : 'Private'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Entrance Exams Row */}
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 sticky left-0 z-10">
                    Entrance Exams
                  </td>
                  {selectedColleges.map(college => (
                    <td key={college.id} className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {college.entrance_exam.map(exam => (
                          <span
                            key={exam}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-100 text-indigo-700"
                          >
                            {exam}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Specializations Row */}
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 sticky left-0 z-10">
                    Specializations
                  </td>
                  {selectedColleges.map(college => (
                    <td key={college.id} className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {college.specialization.map(spec => (
                          <span
                            key={spec}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* College Selection */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedColleges.length > 0 ? 'Add More Colleges to Compare' : 'Select Colleges to Compare'}
          </h2>
          <p className="text-gray-600">
            {selectedColleges.length === 0
              ? 'Select up to 3 colleges to compare them side-by-side'
              : `${3 - selectedColleges.length} more college${3 - selectedColleges.length !== 1 ? 's' : ''} can be added`}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            filters={filters}
            onFiltersChange={onFiltersChange}
            onReset={onResetFilters}
            resultsCount={filteredCount}
          />
        </div>

        {/* College Cards Grid with Selection */}
        {allColleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allColleges.map(college => (
              <CollegeCard
                key={college.id}
                college={college}
                isSelected={selectedColleges.some(c => c.id === college.id)}
                onToggleSelect={onToggleCollege}
                showSelectCheckbox={true}
                compact={selectedColleges.length > 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg font-semibold">No colleges found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
