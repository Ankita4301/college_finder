import { SearchIcon, AlertCircle, Zap } from 'lucide-react';
import { useState } from 'react';
import { PredictorInput } from '../types';
import { usePredictor } from '../hooks/usePredictor';
import { CollegeCard } from './CollegeCard';

interface PredictorViewProps {
  onCompareClick: (collegeId: string) => void;
}

export function PredictorView({ onCompareClick }: PredictorViewProps) {
  const [exam, setExam] = useState<'JEE_MAIN' | 'JEE_ADVANCED' | 'NEET' | 'BOARD'>('JEE_MAIN');
  const [rank, setRank] = useState<string>('');
  const [predictorInput, setPredictorInput] = useState<PredictorInput | null>(null);

  const { predictedColleges, getCollegeCategory, totalPredictions } = usePredictor(predictorInput);

  const handlePredict = () => {
    if (!rank || Number(rank) <= 0) {
      alert('Please enter a valid rank');
      return;
    }
    setPredictorInput({
      exam,
      rank: Number(rank),
    });
  };

  const getCategoryColor = (category: 'safe' | 'moderate' | 'reach') => {
    switch (category) {
      case 'safe':
        return { bg: 'bg-green-50', text: 'text-green-700', label: 'Safe Choice' };
      case 'moderate':
        return { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Moderate' };
      case 'reach':
        return { bg: 'bg-red-50', text: 'text-red-700', label: 'Reach' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Predictor Form */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">College Predictor</h2>
          <p className="text-gray-600">Enter your exam rank to get college recommendations</p>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label htmlFor="exam" className="block text-sm font-semibold text-gray-900 mb-2">
              Select Entrance Exam
            </label>
            <select
              id="exam"
              value={exam}
              onChange={e => setExam(e.target.value as any)}
              className="input-field"
            >
              <option value="JEE_MAIN">JEE Main</option>
              <option value="JEE_ADVANCED">JEE Advanced</option>
              <option value="NEET">NEET</option>
              <option value="BOARD">Board Exam</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {exam === 'JEE_ADVANCED' && 'JEE Advanced rank (lower numbers = better)'}
              {exam === 'JEE_MAIN' && 'JEE Main rank (1-300000)'}
              {exam === 'NEET' && 'NEET rank (1-1600000)'}
              {exam === 'BOARD' && 'Board exam percentage rank'}
            </p>
          </div>

          <div>
            <label htmlFor="rank" className="block text-sm font-semibold text-gray-900 mb-2">
              Your Rank
            </label>
            <input
              id="rank"
              type="number"
              min="1"
              placeholder="Enter your rank"
              value={rank}
              onChange={e => setRank(e.target.value)}
              className="input-field"
            />
          </div>

          <button
            onClick={handlePredict}
            disabled={!rank}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-5 h-5" />
            Predict Colleges
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-semibold mb-1">How the predictor works:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>We analyze your rank against college cutoffs</li>
                <li><strong>Safe:</strong> Colleges where your rank is significantly better than cutoff</li>
                <li><strong>Moderate:</strong> Colleges where your rank is close to cutoff</li>
                <li><strong>Reach:</strong> Colleges where your rank is below cutoff (ambitious choices)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction Results */}
      {predictorInput && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your Recommendations
            </h2>
            <p className="text-gray-600">
              Based on rank <span className="font-semibold">{predictorInput.rank}</span> in{' '}
              <span className="font-semibold">{predictorInput.exam.replace(/_/g, ' ')}</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Found <span className="font-semibold">{totalPredictions}</span> matching colleges
            </p>
          </div>

          {totalPredictions > 0 ? (
            <div className="space-y-6">
              {['safe', 'moderate', 'reach'].map(category => {
                const colleges = predictedColleges.filter(
                  c => getCollegeCategory(c, predictorInput) === category
                );

                if (colleges.length === 0) return null;

                const colors = getCategoryColor(category as any);

                return (
                  <div key={category}>
                    <div className={`flex items-center gap-2 mb-4 p-3 rounded-lg ${colors.bg}`}>
                      <div className={`w-3 h-3 rounded-full ${colors.text.replace('text', 'bg')}`} />
                      <span className={`font-semibold ${colors.text}`}>
                        {colors.label} ({colleges.length})
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {colleges.map(college => (
                        <div key={college.id}>
                          <CollegeCard
                            college={college}
                            onCompare={() => onCompareClick(college.id)}
                            compact={true}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-semibold">No matching colleges found</p>
              <p className="text-gray-500 mt-2">Try searching with a different rank</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
