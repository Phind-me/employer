import React from 'react';
import SummaryMetrics from './SummaryMetrics';
import JobsOverview from './JobsOverview';
import CandidatesStatus from './CandidatesStatus';
import RecruiterPerformance from './RecruiterPerformance';
import { calculateDashboardMetrics, jobs, candidates, recruiters } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const metrics = calculateDashboardMetrics();
  
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Recruitment Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your recruitment process
        </p>
      </div>
      
      <SummaryMetrics metrics={metrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CandidatesStatus candidates={candidates} />
        <RecruiterPerformance recruiters={recruiters} />
      </div>
      
      <JobsOverview jobs={jobs} />
    </div>
  );
};

export default Dashboard;