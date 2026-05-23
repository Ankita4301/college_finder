import { useMemo } from 'react';
import { College, PredictorInput } from '../types';
import { MOCK_COLLEGES } from '../data/colleges';

export function usePredictor(input: PredictorInput | null) {
  const predictedColleges = useMemo(() => {
    if (!input) return [];

    // Prediction logic based on rank and exam type
    // This is a simplified algorithm - in production, this would be dataset-driven

    let recommendations: College[] = [];

    const { rank, exam } = input;

    // Map PredictorInput exam to entrance exam names
    const examMap: { [key: string]: string[] } = {
      'JEE_MAIN': ['JEE Main'],
      'JEE_ADVANCED': ['JEE Advanced', 'JEE Main'],
      'NEET': ['NEET'],
      'BOARD': ['Board', 'Delhi Board', 'WBJEE', 'TANCET']
    };

    const acceptedExams = examMap[exam] || [];

    // Define rank ranges for different exam types
    const cutoffMultiplier = exam === 'JEE_ADVANCED' ? 0.5 : 1;
    const adjustedRank = rank * cutoffMultiplier;

    // Filter colleges based on cutoff rank with some buffer
    const buffer = adjustedRank * 0.5; // 50% buffer range

    recommendations = MOCK_COLLEGES.filter(college => {
      // Check if college accepts the selected exam
      const acceptsExam = college.entrance_exam.some(e =>
        acceptedExams.some(accepted => e.includes(accepted) || accepted.includes(e))
      );

      if (!acceptsExam) return false;

      const lowerBound = adjustedRank - buffer;
      const upperBound = adjustedRank + buffer;
      return college.cutoff_rank >= lowerBound && college.cutoff_rank <= upperBound;
    });

    // If no colleges found with buffer, expand buffer
    if (recommendations.length === 0) {
      const expandedBuffer = adjustedRank;
      recommendations = MOCK_COLLEGES.filter(college => {
        const acceptsExam = college.entrance_exam.some(e =>
          acceptedExams.some(accepted => e.includes(accepted) || accepted.includes(e))
        );

        if (!acceptsExam) return false;

        const lowerBound = adjustedRank - expandedBuffer;
        const upperBound = adjustedRank + expandedBuffer;
        return college.cutoff_rank >= lowerBound && college.cutoff_rank <= upperBound;
      });
    }

    // Sort by rating (best colleges first)
    return recommendations.sort((a, b) => b.rating - a.rating);
  }, [input]);

  const isSafeChoice = (college: College, input: PredictorInput) => {
    const cutoffMultiplier = input.exam === 'JEE_ADVANCED' ? 0.5 : 1;
    const adjustedRank = input.rank * cutoffMultiplier;
    // Safe if cutoff is significantly lower than rank
    return college.cutoff_rank < adjustedRank * 0.7;
  };

  const isReachChoice = (college: College, input: PredictorInput) => {
    const cutoffMultiplier = input.exam === 'JEE_ADVANCED' ? 0.5 : 1;
    const adjustedRank = input.rank * cutoffMultiplier;
    // Reach if cutoff is close to or slightly higher than rank
    return college.cutoff_rank >= adjustedRank * 0.7 && college.cutoff_rank <= adjustedRank * 1.3;
  };

  const getCollegeCategory = (college: College, input: PredictorInput) => {
    if (isSafeChoice(college, input)) return 'safe';
    if (isReachChoice(college, input)) return 'moderate';
    return 'reach';
  };

  return {
    predictedColleges,
    getCollegeCategory,
    totalPredictions: predictedColleges.length,
  };
}
