import { Star, MapPin, TrendingUp, Users, CheckCircle2, Circle, BookOpen } from 'lucide-react';
import { College } from '../types';

interface CollegeCardProps {
  college: College;
  isSelected?: boolean;
  onToggleSelect?: (college: College) => void;
  onCompare?: (college: College) => void;
  showSelectCheckbox?: boolean;
  compact?: boolean;
}

export function CollegeCard({
  college,
  isSelected = false,
  onToggleSelect,
  onCompare,
  showSelectCheckbox = false,
  compact = false,
}: CollegeCardProps) {
  return (
    <div
      className={`card overflow-hidden transition-all ${
        isSelected ? 'ring-2 ring-primary-500 shadow-lg' : ''
      } ${compact ? 'p-4' : 'p-6'}`}
    >
      {/* Header with selection checkbox */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-bold text-gray-900 ${compact ? 'text-sm' : 'text-lg'}`}>
              {college.name}
            </h3>
            <span
              className={`badge text-xs font-semibold ${
                college.type === 'government'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-purple-100 text-purple-700'
              }`}
            >
              {college.type === 'government' ? 'Govt' : 'Private'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{college.location}, {college.state}</span>
          </div>
        </div>

        {showSelectCheckbox && onToggleSelect && (
          <button
            onClick={() => onToggleSelect(college)}
            className="ml-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={`${isSelected ? 'Deselect' : 'Select'} ${college.name}`}
          >
            {isSelected ? (
              <CheckCircle2 className="w-6 h-6 text-primary-600" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400" />
            )}
          </button>
        )}
      </div>

      {/* Key Stats */}
      <div className={`grid grid-cols-2 gap-3 mb-4 ${compact ? 'text-sm' : ''}`}>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-gray-600 text-xs font-semibold uppercase">Rating</div>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-gray-900">{college.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-gray-600 text-xs font-semibold uppercase">Placement</div>
          <div className="font-bold text-gray-900 mt-1">{college.placement_percentage}%</div>
        </div>

        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="text-gray-600 text-xs font-semibold uppercase">Avg Package</div>
          <div className="font-bold text-gray-900 mt-1">
            ₹{(college.avg_package / 100000).toFixed(1)}L
          </div>
        </div>

        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="text-gray-600 text-xs font-semibold uppercase">Cutoff Rank</div>
          <div className="font-bold text-gray-900 mt-1">{college.cutoff_rank}</div>
        </div>
      </div>

      {/* Secondary Info */}
      {!compact && (
        <>
          <div className="mb-4 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Annual Fee: ₹{(college.fees / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Total Seats: {college.seats}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Campus: {college.campus_size} acres</span>
            </div>
            <div className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-semibold text-gray-700 mb-1">Entrance Exams:</div>
                <div className="flex flex-wrap gap-1">
                  {college.entrance_exam.map(exam => (
                    <span
                      key={exam}
                      className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium"
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-600 mb-2">Top Specializations</p>
            <div className="flex flex-wrap gap-1">
              {college.specialization.slice(0, 3).map(spec => (
                <span
                  key={spec}
                  className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {onCompare && (
          <button
            onClick={() => onCompare(college)}
            className="btn-outline flex-1 text-sm"
          >
            Compare
          </button>
        )}
      </div>
    </div>
  );
}
