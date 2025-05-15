export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  closingDate: string;
  status: 'open' | 'closed' | 'filled';
  candidateCount: number;
}

export interface Candidate {
  id: string;
  name: string;
  jobId: string;
  recruiterId: string;
  status: 'submitted' | 'in-progress' | 'hired' | 'rejected';
  submissionDate: string;
}

export interface Recruiter {
  id: string;
  name: string;
  company: string;
  submissionCount: number;
  hireCount: number;
}

export interface DashboardMetrics {
  openJobsCount: number;
  jobsWithoutCandidates: number;
  candidatesSubmitted: number;
  candidatesInProgress: number;
  candidatesHired: number;
  candidatesRejected: number;
}