import { useState, useCallback } from 'react';
import { College } from '../types';

export function useComparison() {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const maxCompare = 3;

  const addCollege = useCallback((college: College) => {
    setSelectedColleges(prev => {
      // Check if college already exists
      if (prev.some(c => c.id === college.id)) {
        return prev;
      }
      // Only allow up to maxCompare colleges
      if (prev.length >= maxCompare) {
        return prev;
      }
      return [...prev, college];
    });
  }, []);

  const removeCollege = useCallback((collegeId: string) => {
    setSelectedColleges(prev => prev.filter(c => c.id !== collegeId));
  }, []);

  const toggleCollege = useCallback((college: College) => {
    setSelectedColleges(prev => {
      const isSelected = prev.some(c => c.id === college.id);
      if (isSelected) {
        return prev.filter(c => c.id !== college.id);
      } else {
        if (prev.length >= maxCompare) {
          // Remove the oldest one and add the new one
          return [...prev.slice(1), college];
        }
        return [...prev, college];
      }
    });
  }, []);

  const clearComparison = useCallback(() => {
    setSelectedColleges([]);
  }, []);

  const isSelected = useCallback((collegeId: string) => {
    return selectedColleges.some(c => c.id === collegeId);
  }, [selectedColleges]);

  return {
    selectedColleges,
    addCollege,
    removeCollege,
    toggleCollege,
    clearComparison,
    isSelected,
    canAddMore: selectedColleges.length < maxCompare,
    maxCompare,
  };
}
