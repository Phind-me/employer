import React from 'react';
import { Candidate } from '../../types';

interface CandidatesStatusProps {
  candidates: Candidate[];
}

const CandidatesStatus: React.FC<CandidatesStatusProps> = ({ candidates }) => {
  const submittedCount = candidates.filter(c => c.status === 'submitted').length;
  const inProgressCount = candidates.filter(c => c.status === 'in-progress').length;
  const hiredCount = candidates.filter(c => c.status === 'hired').length;
  const rejectedCount = candidates.filter(c => c.status === 'rejected').length;
  const totalCount = candidates.length;

  const getPercentage = (count: number) => {
    return Math.round((count / totalCount) * 100);
  };

  const statuses = [
    { 
      name: 'Submitted', 
      count: submittedCount, 
      percentage: getPercentage(submittedCount),
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50'
    },
    { 
      name: 'In Progress', 
      count: inProgressCount, 
      percentage: getPercentage(inProgressCount),
      color: 'bg-amber-500',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50'
    },
    { 
      name: 'Hired', 
      count: hiredCount, 
      percentage: getPercentage(hiredCount),
      color: 'bg-teal-500',
      textColor: 'text-teal-700',
      bgColor: 'bg-teal-50'
    },
    { 
      name: 'Rejected', 
      count: rejectedCount, 
      percentage: getPercentage(rejectedCount),
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Candidate Pipeline</h2>
        <p className="mt-1 text-sm text-gray-500">
          Current status of {totalCount} candidates
        </p>
      </div>
      <div className="p-6">
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
          {statuses.map((status, index) => (
            <div 
              key={index}
              className={`${status.color}`}
              style={{ width: `${status.percentage}%` }}
            />
          ))}
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {statuses.map((status, index) => (
            <div key={index} className={`p-3 rounded-lg ${status.bgColor}`}>
              <div className="text-sm font-medium">{status.name}</div>
              <div className="mt-1 flex justify-between items-end">
                <div className={`text-xl font-semibold ${status.textColor}`}>{status.count}</div>
                <div className={`text-xs ${status.textColor}`}>{status.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidatesStatus;