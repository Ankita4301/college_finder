export interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  fees: number;
  rating: number;
  placement_percentage: number;
  avg_package: number;
  cutoff_rank: number;
  seats: number;
  courses: string[];
  campus_size: number;
  year_established: number;
  type: 'government' | 'private';
  specialization: string[];
  entrance_exam: string[];
}

export interface FilterOptions {
  minFees?: number;
  maxFees?: number;
  minRating?: number;
  states?: string[];
  collegeType?: 'government' | 'private' | 'all';
  minCutoff?: number;
  maxCutoff?: number;
  entranceExams?: string[];
}

export interface PredictorInput {
  exam: 'JEE_MAIN' | 'JEE_ADVANCED' | 'NEET' | 'BOARD';
  rank: number;
}

export interface ComparisonCollege {
  college: College;
  selected: boolean;
}
