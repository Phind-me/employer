import React from 'react';
import { Job } from '../../types';
import { calculateDaysRemaining } from '../../data/mockData';
import { Clock, Users, AlertCircle } from 'lucide-react';

interface JobsOverviewProps {
  jobs: Job[];
}

const JobsOverview: React.FC<JobsOverviewProps> = ({ jobs }) => {
  const getTimeRemainingClass = (daysRemaining: number) => {
    if (daysRemaining <= 7) return 'text-red-600';
    if (daysRemaining <= 14) return 'text-amber-600';
    return 'text-teal-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Jobs Overview</h2>
        <p className="mt-1 text-sm text-gray-500">
          Tracking {jobs.length} open positions
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  Time Remaining
                </span>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="flex items-center">
                  <Users size={14} className="mr-1" />
                  Candidates
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map(job => {
              const daysRemaining = calculateDaysRemaining(job.closingDate);
              const timeRemainingClass = getTimeRemainingClass(daysRemaining);
              
              return (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{job.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${timeRemainingClass}`}>
                      {daysRemaining > 0 ? `${daysRemaining} days` : 'Closing today'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.candidateCount > 0 ? (
                      <span className="text-sm text-gray-900">{job.candidateCount} candidates</span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                        <AlertCircle size={12} className="mr-1" />
                        No candidates
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsOverview;