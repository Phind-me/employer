import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, UserPlus, Clock, CheckCircle2, XCircle, Building2, Briefcase, CalendarClock, FileText } from 'lucide-react';
import { useSubmissions } from '../../contexts/SubmissionContext';
import { useJobs } from '../../contexts/JobContext';
import { useRecruiters } from '../../contexts/RecruiterContext';
import StatusBar from '../shared/StatusBar';

const SubmissionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { submissions } = useSubmissions();
  const { jobs } = useJobs();
  const { recruiters } = useRecruiters();
  const [searchTerm, setSearchTerm] = useState('');

  const getStageIndex = (status: string) => {
    switch (status) {
      case 'submitted': return 0;
      case 'in-progress': return Math.floor(Math.random() * 2) + 1; // For demo: randomly assign to screening or interview
      case 'hired': return 4;
      case 'rejected': return -1;
      default: return 0;
    }
  };

  const getJobDetails = (jobId: string) => {
    return jobs.find(job => job.id === jobId);
  };

  const getRecruiterDetails = (recruiterId: string) => {
    return recruiters.find(recruiter => recruiter.id === recruiterId);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredSubmissions = submissions.filter(submission =>
    submission.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Submissions</h1>
          <p className="mt-1 text-sm text-gray-500">Track and manage candidate submissions</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Submission
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search submissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-8">
            {filteredSubmissions.map((submission) => {
              const currentStage = getStageIndex(submission.status);
              const job = getJobDetails(submission.jobId);
              const recruiter = getRecruiterDetails(submission.recruiterId);
              
              return (
                <div key={submission.id} className="border border-gray-200 rounded-lg p-6 hover:border-indigo-500 transition-colors">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 
                          className="text-lg font-medium text-gray-900 hover:text-indigo-600 cursor-pointer"
                          onClick={() => navigate(`/submissions/${submission.id}`)}
                        >
                          {submission.name}
                        </h3>
                        <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-2" />
                            <span>{job?.title || 'Unknown Position'}</span>
                          </div>
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-2" />
                            <span>{recruiter?.company || 'Unknown Recruiter'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Submitted: {formatDate(submission.submissionDate)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarClock className="h-4 w-4 mr-2" />
                          <span>Last updated: {formatDate(new Date().toISOString())}</span>
                        </div>
                        <div className="flex items-center text-sm text-indigo-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Next: Technical Interview on {formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-4">
                      {submission.status === 'rejected' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          <XCircle className="h-4 w-4 mr-1" />
                          Rejected
                        </span>
                      ) : submission.status === 'hired' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Hired
                        </span>
                      ) : (
                        <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          Update Status
                        </button>
                      )}
                    </div>
                  </div>

                  {submission.notes && (
                    <div className="mt-4 bg-gray-50 rounded-md p-4">
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">Notes</h4>
                          <p className="mt-1 text-sm text-gray-500">{submission.notes.content}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <StatusBar 
                    currentStage={currentStage} 
                    status={submission.status} 
                    className="mt-6"
                    showDetails={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;