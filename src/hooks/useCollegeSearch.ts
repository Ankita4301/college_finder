import { useState, useMemo, useCallback } from 'react';
import { FilterOptions } from '../types';
import { MOCK_COLLEGES } from '../data/colleges';

export function useCollegeSearch(initialFilters: FilterOptions = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Filter and search logic
  const filteredColleges = useMemo(() => {
    let results = MOCK_COLLEGES;

    // Search by name, location, state
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        college =>
          college.name.toLowerCase().includes(term) ||
          college.location.toLowerCase().includes(term) ||
          college.state.toLowerCase().includes(term) ||
          college.specialization.some(spec => spec.toLowerCase().includes(term))
      );
    }

    // Apply filters
    if (filters.minFees !== undefined) {
      results = results.filter(c => c.fees >= filters.minFees!);
    }
    if (filters.maxFees !== undefined) {
      results = results.filter(c => c.fees <= filters.maxFees!);
    }
    if (filters.minRating !== undefined) {
      results = results.filter(c => c.rating >= filters.minRating!);
    }
    if (filters.states && filters.states.length > 0) {
      results = results.filter(c => filters.states!.includes(c.state));
    }
    if (filters.collegeType && filters.collegeType !== 'all') {
      results = results.filter(c => c.type === filters.collegeType);
    }
    if (filters.entranceExams && filters.entranceExams.length > 0) {
      results = results.filter(c =>
        c.entrance_exam.some(exam => filters.entranceExams!.includes(exam))
      );
    }
    if (filters.minCutoff !== undefined) {
      results = results.filter(c => c.cutoff_rank >= filters.minCutoff!);
    }
    if (filters.maxCutoff !== undefined) {
      results = results.filter(c => c.cutoff_rank <= filters.maxCutoff!);
    }

    return results;
  }, [searchTerm, filters]);

  // Pagination logic
  const paginatedColleges = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredColleges.slice(startIndex, startIndex + pageSize);
  }, [filteredColleges, currentPage]);

  const totalPages = Math.ceil(filteredColleges.length / pageSize);

  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setFilters({});
    setCurrentPage(1);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilters,
    resetFilters,
    colleges: paginatedColleges,
    filteredCount: filteredColleges.length,
    currentPage,
    setCurrentPage,
    totalPages,
    pageSize,
  };
}
