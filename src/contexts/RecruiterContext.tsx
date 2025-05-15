import React, { createContext, useContext, useEffect, useState } from 'react';
import { Recruiter } from '../types';
import { recruiters as mockRecruiters } from '../data/mockData';

interface RecruiterContextType {
  recruiters: Recruiter[];
  activeRecruiterId: string | null;
  activeRecruiter: Recruiter | null;
  setActiveRecruiterId: (id: string | null) => void;
  createRecruiter: (recruiter: Omit<Recruiter, 'id'>) => void;
  updateRecruiter: (id: string, recruiter: Partial<Recruiter>) => void;
  deleteRecruiter: (id: string) => void;
}

const RecruiterContext = createContext<RecruiterContextType | undefined>(undefined);

export const RecruiterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [activeRecruiterId, setActiveRecruiterId] = useState<string | null>(null);
  const [activeRecruiter, setActiveRecruiter] = useState<Recruiter | null>(null);

  const fetchRecruiters = async () => {
    // In a real app, this would be an API call
    setRecruiters(mockRecruiters);
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  useEffect(() => {
    if (activeRecruiterId && recruiters.length > 0) {
      const active = recruiters.find(recruiter => recruiter.id === activeRecruiterId) || null;
      setActiveRecruiter(active);
    } else {
      setActiveRecruiter(null);
    }
  }, [activeRecruiterId, recruiters]);

  const createRecruiter = (newRecruiter: Omit<Recruiter, 'id'>) => {
    const recruiter = {
      ...newRecruiter,
      id: Math.random().toString(36).substr(2, 9),
    };
    setRecruiters(prev => [...prev, recruiter]);
  };

  const updateRecruiter = (id: string, updatedRecruiter: Partial<Recruiter>) => {
    setRecruiters(prev =>
      prev.map(recruiter =>
        recruiter.id === id ? { ...recruiter, ...updatedRecruiter } : recruiter
      )
    );
  };

  const deleteRecruiter = (id: string) => {
    setRecruiters(prev => prev.filter(recruiter => recruiter.id !== id));
    if (activeRecruiterId === id) {
      setActiveRecruiterId(null);
    }
  };

  return (
    <RecruiterContext.Provider
      value={{
        recruiters,
        activeRecruiterId,
        activeRecruiter,
        setActiveRecruiterId,
        createRecruiter,
        updateRecruiter,
        deleteRecruiter,
      }}
    >
      {children}
    </RecruiterContext.Provider>
  );
};

export const useRecruiters = () => {
  const context = useContext(RecruiterContext);
  if (context === undefined) {
    throw new Error('useRecruiters must be used within a RecruiterProvider');
  }
  return context;
};