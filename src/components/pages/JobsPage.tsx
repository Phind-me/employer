import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import { useJobs } from '../../contexts/JobContext';
import { useSubmissions } from '../../contexts/SubmissionContext';
import { calculateDaysRemaining } from '../../data/mockData';
import CandidatePipeline from '../shared/CandidatePipeline';

const JobsPage: React.FC = () => {
  const { jobs } = useJobs();
  const { submissions } = useSubmissions();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Jobs</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your open positions</p>
        </div>
        <button 
          onClick={() => navigate('/jobs/new')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
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
          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const daysRemaining = calculateDaysRemaining(job.closingDate);
              const jobSubmissions = submissions.filter(s => s.jobId === job.id);
              const submittedCount = jobSubmissions.filter(s => s.status === 'submitted').length;
              const inProgressCount = jobSubmissions.filter(s => s.status === 'in-progress').length;
              const hiredCount = jobSubmissions.filter(s => s.status === 'hired').length;
              const rejectedCount = jobSubmissions.filter(s => s.status === 'rejected').length;

              return (
                <div 
                  key={job.id} 
                  className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 cursor-pointer transition-colors"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{job.department} • {job.location}</p>
                      {job.salary && (
                        <p className="mt-1 text-sm text-gray-500">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: job.salary.currency,
                            maximumFractionDigits: 0
                          }).format(job.salary.min)} - {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: job.salary.currency,
                            maximumFractionDigits: 0
                          }).format(job.salary.max)}
                        </p>
                      )}
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.status === 'open' ? 'bg-green-100 text-green-800' :
                      job.status === 'filled' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status === 'open' ? 'Active' : job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                    <span>{job.candidateCount} candidates</span>
                    <span>•</span>
                    <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className={`${
                      daysRemaining <= 7 ? 'text-red-600' :
                      daysRemaining <= 14 ? 'text-amber-600' :
                      'text-gray-500'
                    }`}>
                      Closes in {daysRemaining} days
                    </span>
                  </div>
                  {job.candidateCount > 0 && (
                    <div className="mt-4">
                      <CandidatePipeline
                        submitted={submittedCount}
                        inProgress={inProgressCount}
                        hired={hiredCount}
                        rejected={rejectedCount}
                        showDetails={false}
                        className="mt-2"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;