import React, { createContext, useContext, useEffect, useState } from 'react';
import { Submission } from '../types';
import { candidates as mockSubmissions } from '../data/mockData';

interface SubmissionContextType {
  submissions: Submission[];
  activeSubmissionId: string | null;
  activeSubmission: Submission | null;
  setActiveSubmissionId: (id: string | null) => void;
  createSubmission: (submission: Omit<Submission, 'id'>) => void;
  updateSubmission: (id: string, submission: Partial<Submission>) => void;
  deleteSubmission: (id: string) => void;
}

const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined);

export const SubmissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [activeSubmissionId, setActiveSubmissionId] = useState<string | null>(null);
  const [activeSubmission, setActiveSubmission] = useState<Submission | null>(null);

  const fetchSubmissions = async () => {
    // In a real app, this would be an API call
    setSubmissions(mockSubmissions);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    if (activeSubmissionId && submissions.length > 0) {
      const active = submissions.find(submission => submission.id === activeSubmissionId) || null;
      setActiveSubmission(active);
    } else {
      setActiveSubmission(null);
    }
  }, [activeSubmissionId, submissions]);

  const createSubmission = (newSubmission: Omit<Submission, 'id'>) => {
    const submission = {
      ...newSubmission,
      id: Math.random().toString(36).substr(2, 9),
    };
    setSubmissions(prev => [...prev, submission]);
  };

  const updateSubmission = (id: string, updatedSubmission: Partial<Submission>) => {
    setSubmissions(prev =>
      prev.map(submission =>
        submission.id === id ? { ...submission, ...updatedSubmission } : submission
      )
    );
  };

  const deleteSubmission = (id: string) => {
    setSubmissions(prev => prev.filter(submission => submission.id !== id));
    if (activeSubmissionId === id) {
      setActiveSubmissionId(null);
    }
  };

  return (
    <SubmissionContext.Provider
      value={{
        submissions,
        activeSubmissionId,
        activeSubmission,
        setActiveSubmissionId,
        createSubmission,
        updateSubmission,
        deleteSubmission,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};

export const useSubmissions = () => {
  const context = useContext(SubmissionContext);
  if (context === undefined) {
    throw new Error('useSubmissions must be used within a SubmissionProvider');
  }
  return context;
};