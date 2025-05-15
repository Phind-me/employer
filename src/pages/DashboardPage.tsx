import React from 'react';
import SummaryMetrics from '../components/dashboard/SummaryMetrics';
import JobsOverview from '../components/dashboard/JobsOverview';
import CandidatesStatus from '../components/dashboard/CandidatesStatus';
import RecruiterPerformance from '../components/dashboard/RecruiterPerformance';
import { useJobs } from '../contexts/JobContext';
import { useSubmissions } from '../contexts/SubmissionContext';
import { useRecruiters } from '../contexts/RecruiterContext';
import { useDashboard } from '../contexts/DashboardContext';

const DashboardPage: React.FC = () => {
  const { jobs } = useJobs();
  const { submissions } = useSubmissions();
  const { recruiters } = useRecruiters();
  const { metrics } = useDashboard();
  
  if (!metrics) {
    return <div>Loading...</div>;
  }

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
        <CandidatesStatus candidates={submissions} />
        <RecruiterPerformance recruiters={recruiters} />
      </div>
      
      <JobsOverview jobs={jobs} />
    </div>
  );
};

export default DashboardPage;