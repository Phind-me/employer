import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import JobsPage from './components/pages/JobsPage';
import SubmissionsPage from './components/pages/SubmissionsPage';
import RecruitersPage from './components/pages/RecruitersPage';
import SettingsPage from './components/pages/SettingsPage';
import HelpPage from './components/pages/HelpPage';
import { EmployerProvider } from './contexts/EmployerContext';
import { JobProvider } from './contexts/JobContext';
import { SubmissionProvider } from './contexts/SubmissionContext';
import { RecruiterProvider } from './contexts/RecruiterContext';
import { DashboardProvider } from './contexts/DashboardContext';
import { TeamProvider } from './contexts/TeamContext';

function App() {
  return (
    <Router>
      <EmployerProvider>
        <TeamProvider>
          <JobProvider>
            <SubmissionProvider>
              <RecruiterProvider>
                <DashboardProvider>
                  <DashboardLayout>
                    <Routes>
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/jobs" element={<JobsPage />} />
                      <Route path="/submissions" element={<SubmissionsPage />} />
                      <Route path="/recruiters" element={<RecruitersPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/help" element={<HelpPage />} />
                    </Routes>
                  </DashboardLayout>
                </DashboardProvider>
              </RecruiterProvider>
            </SubmissionProvider>
          </JobProvider>
        </TeamProvider>
      </EmployerProvider>
    </Router>
  );
}

export default App;