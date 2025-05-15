import React, { createContext, useContext, useEffect, useState } from 'react';
import { Employer } from '../types';

interface EmployerContextType {
  employer: Employer | null;
  activeEmployerId: string | null;
  setActiveEmployerId: (id: string | null) => void;
  createEmployer: (employer: Omit<Employer, 'id'>) => void;
  updateEmployer: (id: string, employer: Partial<Employer>) => void;
  deleteEmployer: (id: string) => void;
}

const EmployerContext = createContext<EmployerContextType | undefined>(undefined);

export const EmployerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [activeEmployerId, setActiveEmployerId] = useState<string | null>(null);
  const [employer, setEmployer] = useState<Employer | null>(null);

  const fetchEmployers = async () => {
    // In a real app, this would be an API call
    const mockEmployer: Employer = {
      id: '1',
      name: 'Tech Corp Inc.',
      industry: 'Technology',
      size: '1000-5000',
      location: 'New York, NY',
      website: 'https://techcorp.example.com',
    };
    setEmployers([mockEmployer]);
    setActiveEmployerId('1');
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  useEffect(() => {
    if (activeEmployerId && employers.length > 0) {
      const active = employers.find(e => e.id === activeEmployerId) || null;
      setEmployer(active);
    } else {
      setEmployer(null);
    }
  }, [activeEmployerId, employers]);

  const createEmployer = (newEmployer: Omit<Employer, 'id'>) => {
    const employer = {
      ...newEmployer,
      id: Math.random().toString(36).substr(2, 9),
    };
    setEmployers(prev => [...prev, employer]);
  };

  const updateEmployer = (id: string, updatedEmployer: Partial<Employer>) => {
    setEmployers(prev =>
      prev.map(employer =>
        employer.id === id ? { ...employer, ...updatedEmployer } : employer
      )
    );
  };

  const deleteEmployer = (id: string) => {
    setEmployers(prev => prev.filter(employer => employer.id !== id));
    if (activeEmployerId === id) {
      setActiveEmployerId(null);
    }
  };

  return (
    <EmployerContext.Provider
      value={{
        employer,
        activeEmployerId,
        setActiveEmployerId,
        createEmployer,
        updateEmployer,
        deleteEmployer,
      }}
    >
      {children}
    </EmployerContext.Provider>
  );
};

export const useEmployer = () => {
  const context = useContext(EmployerContext);
  if (context === undefined) {
    throw new Error('useEmployer must be used within an EmployerProvider');
  }
  return context;
};