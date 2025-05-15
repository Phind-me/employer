import React, { createContext, useContext, useEffect, useState } from 'react';
import { Job } from '../types';
import { jobs as mockJobs } from '../data/mockData';

interface JobContextType {
  jobs: Job[];
  activeJobId: string | null;
  activeJob: Job | null;
  setActiveJobId: (id: string | null) => void;
  createJob: (job: Omit<Job, 'id'>) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  const fetchJobs = async () => {
    // In a real app, this would be an API call
    setJobs(mockJobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (activeJobId && jobs.length > 0) {
      const active = jobs.find(job => job.id === activeJobId) || null;
      setActiveJob(active);
    } else {
      setActiveJob(null);
    }
  }, [activeJobId, jobs]);

  const createJob = (newJob: Omit<Job, 'id'>) => {
    const job = {
      ...newJob,
      id: Math.random().toString(36).substr(2, 9),
    };
    setJobs(prev => [...prev, job]);
  };

  const updateJob = (id: string, updatedJob: Partial<Job>) => {
    setJobs(prev =>
      prev.map(job => (job.id === id ? { ...job, ...updatedJob } : job))
    );
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
    if (activeJobId === id) {
      setActiveJobId(null);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        activeJobId,
        activeJob,
        setActiveJobId,
        createJob,
        updateJob,
        deleteJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};