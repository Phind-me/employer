import React, { createContext, useContext, useEffect, useState } from 'react';
import { DashboardMetrics } from '../types';
import { calculateDashboardMetrics } from '../data/mockData';

interface DashboardContextType {
  metrics: DashboardMetrics | null;
  refreshMetrics: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  const fetchMetrics = async () => {
    // In a real app, this would be an API call
    const dashboardMetrics = calculateDashboardMetrics();
    setMetrics(dashboardMetrics);
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const refreshMetrics = () => {
    fetchMetrics();
  };

  return (
    <DashboardContext.Provider
      value={{
        metrics,
        refreshMetrics,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};