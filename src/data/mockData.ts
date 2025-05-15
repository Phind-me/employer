import { Job, Candidate, Recruiter } from '../types';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Remote',
    closingDate: '2025-04-15',
    status: 'open',
    candidateCount: 5,
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    closingDate: '2025-04-30',
    status: 'open',
    candidateCount: 3,
  },
  {
    id: '3',
    title: 'UX Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    closingDate: '2025-05-10',
    status: 'open',
    candidateCount: 0,
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Chicago, IL',
    closingDate: '2025-05-15',
    status: 'open',
    candidateCount: 0,
  },
  {
    id: '5',
    title: 'Data Analyst',
    department: 'Analytics',
    location: 'Remote',
    closingDate: '2025-04-20',
    status: 'open',
    candidateCount: 2,
  },
  {
    id: '6',
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Austin, TX',
    closingDate: '2025-06-01',
    status: 'open',
    candidateCount: 4,
  },
];

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'John Smith',
    jobId: '1',
    recruiterId: '1',
    status: 'in-progress',
    submissionDate: '2025-03-01',
  },
  {
    id: '2',
    name: 'Emily Johnson',
    jobId: '1',
    recruiterId: '2',
    status: 'submitted',
    submissionDate: '2025-03-05',
  },
  {
    id: '3',
    name: 'Michael Brown',
    jobId: '1',
    recruiterId: '1',
    status: 'hired',
    submissionDate: '2025-02-15',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    jobId: '1',
    recruiterId: '3',
    status: 'rejected',
    submissionDate: '2025-02-20',
  },
  {
    id: '5',
    name: 'David Miller',
    jobId: '1',
    recruiterId: '2',
    status: 'in-progress',
    submissionDate: '2025-03-10',
  },
  {
    id: '6',
    name: 'Jessica Davis',
    jobId: '2',
    recruiterId: '3',
    status: 'in-progress',
    submissionDate: '2025-03-02',
  },
  {
    id: '7',
    name: 'Thomas Wilson',
    jobId: '2',
    recruiterId: '1',
    status: 'submitted',
    submissionDate: '2025-03-08',
  },
  {
    id: '8',
    name: 'Jennifer Garcia',
    jobId: '2',
    recruiterId: '2',
    status: 'hired',
    submissionDate: '2025-02-25',
  },
  {
    id: '9',
    name: 'Robert Martinez',
    jobId: '5',
    recruiterId: '3',
    status: 'submitted',
    submissionDate: '2025-03-12',
  },
  {
    id: '10',
    name: 'Patricia Anderson',
    jobId: '5',
    recruiterId: '1',
    status: 'in-progress',
    submissionDate: '2025-03-06',
  },
  {
    id: '11',
    name: 'James Taylor',
    jobId: '6',
    recruiterId: '2',
    status: 'submitted',
    submissionDate: '2025-03-15',
  },
  {
    id: '12',
    name: 'Linda Thomas',
    jobId: '6',
    recruiterId: '3',
    status: 'in-progress',
    submissionDate: '2025-03-10',
  },
  {
    id: '13',
    name: 'Richard Jackson',
    jobId: '6',
    recruiterId: '1',
    status: 'hired',
    submissionDate: '2025-02-28',
  },
  {
    id: '14',
    name: 'Elizabeth White',
    jobId: '6',
    recruiterId: '2',
    status: 'rejected',
    submissionDate: '2025-03-01',
  },
];

export const recruiters: Recruiter[] = [
  {
    id: '1',
    name: 'TalentScout Inc.',
    company: 'TalentScout Inc.',
    submissionCount: 5,
    hireCount: 2,
  },
  {
    id: '2',
    name: 'Apex Recruiting',
    company: 'Apex Recruiting',
    submissionCount: 5,
    hireCount: 1,
  },
  {
    id: '3',
    name: 'HirePro Solutions',
    company: 'HirePro Solutions',
    submissionCount: 4,
    hireCount: 0,
  },
];

export const calculateDaysRemaining = (closingDate: string): number => {
  const today = new Date();
  const closing = new Date(closingDate);
  const diffTime = closing.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const calculateDashboardMetrics = (): DashboardMetrics => {
  const openJobs = jobs.filter(job => job.status === 'open');
  const jobsWithoutCandidates = openJobs.filter(job => job.candidateCount === 0);
  
  const candidatesSubmitted = candidates.filter(candidate => candidate.status === 'submitted').length;
  const candidatesInProgress = candidates.filter(candidate => candidate.status === 'in-progress').length;
  const candidatesHired = candidates.filter(candidate => candidate.status === 'hired').length;
  const candidatesRejected = candidates.filter(candidate => candidate.status === 'rejected').length;
  
  return {
    openJobsCount: openJobs.length,
    jobsWithoutCandidates: jobsWithoutCandidates.length,
    candidatesSubmitted,
    candidatesInProgress,
    candidatesHired,
    candidatesRejected,
  };
};