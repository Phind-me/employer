import React from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
}

export default App;