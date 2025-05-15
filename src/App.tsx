import React from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './components/dashboard/Dashboard';
import JobsPage from './components/pages/JobsPage';
import CandidatesPage from './components/pages/CandidatesPage';
import RecruitersPage from './components/pages/RecruitersPage';
import SettingsPage from './components/pages/SettingsPage';
import HelpPage from './components/pages/HelpPage';

function App() {
  const [currentPage, setCurrentPage] = React.useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'jobs':
        return <JobsPage />;
      case 'candidates':
        return <CandidatesPage />;
      case 'recruiters':
        return <RecruitersPage />;
      case 'settings':
        return <SettingsPage />;
      case 'help':
        return <HelpPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <DashboardLayout onPageChange={setCurrentPage} currentPage={currentPage}>
      {renderPage()}
    </DashboardLayout>
  );
}

export default App;