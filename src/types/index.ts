export interface Employer {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  website: string;
}

export interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'member';
  status: 'active' | 'pending' | 'inactive';
  joinedAt: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  closingDate: string;
  status: 'open' | 'closed' | 'filled';
  candidateCount: number;
}

export interface Submission {
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