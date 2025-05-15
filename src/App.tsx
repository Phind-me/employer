import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import JobsPage from './components/pages/JobsPage';
import JobDetailsPage from './components/pages/JobDetailsPage';
import SubmissionsPage from './components/pages/SubmissionsPage';
import CandidateDetailsPage from './components/pages/CandidateDetailsPage';
import RecruitersPage from './components/pages/RecruitersPage';
import RecruiterDetailsPage from './components/pages/RecruiterDetailsPage';
import SettingsPage from './components/pages/SettingsPage';
import HelpPage from './components/pages/HelpPage';
import { EmployerProvider } from './contexts/EmployerContext';
import { JobProvider } from './contexts/JobContext';
import { SubmissionProvider } from './contexts/SubmissionContext';
import { RecruiterProvider } from './contexts/RecruiterContext';
import { DashboardProvider } from './contexts/DashboardContext';
import { TeamProvider } from './contexts/TeamContext';
import { MessageProvider } from './contexts/MessageContext';

function App() {
  return (
    <Router>
      <EmployerProvider>
        <TeamProvider>
          <JobProvider>
            <SubmissionProvider>
              <RecruiterProvider>
                <DashboardProvider>
                  <MessageProvider>
                    <DashboardLayout>
                      <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/jobs" element={<JobsPage />} />
                        <Route path="/jobs/:id" element={<JobDetailsPage />} />
                        <Route path="/submissions" element={<SubmissionsPage />} />
                        <Route path="/submissions/:id" element={<CandidateDetailsPage />} />
                        <Route path="/recruiters" element={<RecruitersPage />} />
                        <Route path="/recruiters/:id" element={<RecruiterDetailsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/help" element={<HelpPage />} />
                      </Routes>
                    </DashboardLayout>
                  </MessageProvider>
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