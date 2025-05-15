import React from 'react';
import { Recruiter } from '../../types';

interface RecruiterPerformanceProps {
  recruiters: Recruiter[];
}

const RecruiterPerformance: React.FC<RecruiterPerformanceProps> = ({ recruiters }) => {
  // Sort recruiters by hire rate (descending)
  const sortedRecruiters = [...recruiters].sort((a, b) => {
    const aRate = a.submissionCount > 0 ? (a.hireCount / a.submissionCount) : 0;
    const bRate = b.submissionCount > 0 ? (b.hireCount / b.submissionCount) : 0;
    return bRate - aRate;
  });

  const calculateHireRate = (hireCount: number, submissionCount: number) => {
    if (submissionCount === 0) return 0;
    return Math.round((hireCount / submissionCount) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Recruiter Performance</h2>
        <p className="mt-1 text-sm text-gray-500">
          Comparing submissions to successful hires
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {sortedRecruiters.map(recruiter => {
            const hireRate = calculateHireRate(recruiter.hireCount, recruiter.submissionCount);
            const barWidth = `${hireRate}%`;
            
            let performanceColor = 'text-red-600';
            if (hireRate >= 40) performanceColor = 'text-teal-600';
            else if (hireRate >= 20) performanceColor = 'text-amber-600';
            
            return (
              <div key={recruiter.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{recruiter.name}</h3>
                    <p className="text-xs text-gray-500">
                      {recruiter.hireCount} hires from {recruiter.submissionCount} submissions
                    </p>
                  </div>
                  <span className={`text-sm font-medium ${performanceColor}`}>
                    {hireRate}% hire rate
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${hireRate >= 40 ? 'bg-teal-500' : hireRate >= 20 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: barWidth }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecruiterPerformance;