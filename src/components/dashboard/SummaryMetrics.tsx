import React from 'react';
import { Briefcase, Users, AlertTriangle, Clock } from 'lucide-react';
import MetricCard from './MetricCard';
import { DashboardMetrics } from '../../types';

interface SummaryMetricsProps {
  metrics: DashboardMetrics;
}

const SummaryMetrics: React.FC<SummaryMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Open Jobs"
        value={metrics.openJobsCount}
        icon={<Briefcase size={20} />}
        color="primary"
        trend={{ direction: 'up', value: '12% from last month' }}
      />
      <MetricCard
        title="Jobs Without Candidates"
        value={metrics.jobsWithoutCandidates}
        icon={<AlertTriangle size={20} />}
        color="warning"
      />
      <MetricCard
        title="Candidate Pipeline"
        value={metrics.candidatesSubmitted + metrics.candidatesInProgress}
        icon={<Users size={20} />}
        color="secondary"
        trend={{ direction: 'up', value: '8% from last month' }}
      />
      <MetricCard
        title="Time-to-Hire (Avg.)"
        value="24 days"
        icon={<Clock size={20} />}
        color="neutral"
        trend={{ direction: 'down', value: '3 days faster' }}
      />
    </div>
  );
};

export default SummaryMetrics;