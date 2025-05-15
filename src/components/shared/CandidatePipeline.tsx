import React from 'react';

interface CandidatePipelineProps {
  submitted: number;
  inProgress: number;
  hired: number;
  rejected: number;
  showDetails?: boolean;
  className?: string;
}

const CandidatePipeline: React.FC<CandidatePipelineProps> = ({
  submitted,
  inProgress,
  hired,
  rejected,
  showDetails = true,
  className = ''
}) => {
  const totalCount = submitted + inProgress + hired + rejected;

  const getPercentage = (count: number) => {
    return Math.round((count / (totalCount || 1)) * 100);
  };

  const statuses = [
    { 
      name: 'Submitted', 
      count: submitted, 
      percentage: getPercentage(submitted),
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50'
    },
    { 
      name: 'In Progress', 
      count: inProgress, 
      percentage: getPercentage(inProgress),
      color: 'bg-amber-500',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50'
    },
    { 
      name: 'Hired', 
      count: hired, 
      percentage: getPercentage(hired),
      color: 'bg-teal-500',
      textColor: 'text-teal-700',
      bgColor: 'bg-teal-50'
    },
    { 
      name: 'Rejected', 
      count: rejected, 
      percentage: getPercentage(rejected),
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className={className}>
      <div className="flex items-center gap-2 text-sm mb-2">
        {statuses.map((status, index) => (
          <div key={index} className={`flex items-center ${status.textColor}`}>
            {index > 0 && <span className="mx-2 text-gray-300">•</span>}
            <span className="font-medium">{status.count}</span>
            <span className="ml-1">{status.name}</span>
          </div>
        ))}
      </div>
      
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
        {statuses.map((status, index) => (
          <div 
            key={index}
            className={`${status.color} transition-all duration-300`}
            style={{ width: `${status.percentage}%` }}
          />
        ))}
      </div>
      
      {showDetails && (
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
          {statuses.map((status, index) => (
            <div key={index} className={`p-2 rounded-lg ${status.bgColor}`}>
              <div className="text-sm font-medium">{status.name}</div>
              <div className="mt-1 flex justify-between items-end">
                <div className={`text-lg font-semibold ${status.textColor}`}>{status.count}</div>
                <div className={`text-xs ${status.textColor}`}>{status.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidatePipeline;