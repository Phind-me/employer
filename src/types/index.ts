import { Message } from './message';

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

export interface JobSkill {
  id: string;
  name: string;
  yearsRequired: number;
  isRequired: boolean;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  closingDate: string;
  status: 'open' | 'closed' | 'filled';
  candidateCount: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: JobSkill[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  workplaceType: 'remote' | 'hybrid' | 'on-site';
  postedDate: string;
  hiringManager: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience: number;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
  type: 'interview' | 'general' | 'feedback';
}

export interface Submission {
  id: string;
  name: string;
  jobId: string;
  recruiterId: string;
  status: 'submitted' | 'in-progress' | 'hired' | 'rejected';
  submissionDate: string;
  email: string;
  phone: string;
  location: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  notes: Note[];
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface Recruiter {
  id: string;
  name: string;
  company: string;
  submissionCount: number;
  hireCount: number;
  email: string;
  phone: string;
  location: string;
  website: string;
  specialties: string[];
  activeJobs: number;
  avgTimeToHire: number;
  avgCandidateScore: number;
  contractStartDate: string;
  contractEndDate: string;
  fees: {
    placement: number;
    currency: string;
  };
  performanceMetrics: {
    lastThreeMonths: {
      submissions: number;
      hires: number;
      rejections: number;
    };
    lastSixMonths: {
      submissions: number;
      hires: number;
      rejections: number;
    };
    lastYear: {
      submissions: number;
      hires: number;
      rejections: number;
    };
  };
}

export interface DashboardMetrics {
  openJobsCount: number;
  jobsWithoutCandidates: number;
  candidatesSubmitted: number;
  candidatesInProgress: number;
  candidatesHired: number;
  candidatesRejected: number;
}

export interface Message {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}