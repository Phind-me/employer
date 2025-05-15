import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecruiters } from '../../contexts/RecruiterContext';
import { useSubmissions } from '../../contexts/SubmissionContext';
import { useJobs } from '../../contexts/JobContext';
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';

const RecruiterDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recruiters } = useRecruiters();
  const { submissions } = useSubmissions();
  const { jobs } = useJobs();

  const recruiter = recruiters.find(r => r.id === id);
  const recruiterSubmissions = submissions.filter(s => s.recruiterId === id);
  const activeJobsList = jobs.filter(job => 
    recruiterSubmissions.some(s => s.jobId === job.id && s.status === 'in-progress')
  );

  if (!recruiter) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">Recruiter not found</div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: recruiter.fees?.currency || 'USD',
      maximumFractionDigits: 0
    }).format(recruiter.fees ? amount : 0);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateSuccessRate = (hires: number, submissions: number) => {
    return submissions > 0 ? Math.round((hires / submissions) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/recruiters')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Recruiters
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{recruiter.name}</h1>
              <p className="text-lg text-gray-600">{recruiter.company}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-500">
                  <Mail className="h-5 w-5 mr-2" />
                  <a href={`mailto:${recruiter.email}`} className="hover:text-indigo-600">
                    {recruiter.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-500">
                  <Phone className="h-5 w-5 mr-2" />
                  <a href={`tel:${recruiter.phone}`} className="hover:text-indigo-600">
                    {recruiter.phone}
                  </a>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{recruiter.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Globe className="h-5 w-5 mr-2" />
                  <a href={recruiter.website} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                    {recruiter.website}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                calculateSuccessRate(recruiter.hireCount, recruiter.submissionCount) >= 40
                  ? 'bg-green-100 text-green-800'
                  : calculateSuccessRate(recruiter.hireCount, recruiter.submissionCount) >= 20
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {calculateSuccessRate(recruiter.hireCount, recruiter.submissionCount)}% Success Rate
              </span>
              <span className="text-sm text-gray-500">{recruiter.activeJobs} active jobs</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 p-6">
          {/* Left Column - Performance Metrics */}
          <div className="col-span-2 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-indigo-900">Time to Hire</h3>
                  <Clock className="h-5 w-5 text-indigo-500" />
                </div>
                <p className="mt-2 text-2xl font-semibold text-indigo-900">{recruiter.avgTimeToHire} days</p>
                <p className="mt-1 text-sm text-indigo-700">Average time to fill a position</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-green-900">Candidate Quality</h3>
                  <Users className="h-5 w-5 text-green-500" />
                </div>
                <p className="mt-2 text-2xl font-semibold text-green-900">{recruiter.avgCandidateScore}%</p>
                <p className="mt-1 text-sm text-green-700">Average candidate score</p>
              </div>

              <div className="bg-amber-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-amber-900">Placement Fee</h3>
                  <DollarSign className="h-5 w-5 text-amber-500" />
                </div>
                <p className="mt-2 text-2xl font-semibold text-amber-900">{formatCurrency(recruiter.fees?.placement || 0)}</p>
                <p className="mt-1 text-sm text-amber-700">Per successful hire</p>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Performance Trends</h2>
                <div className="flex space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Hires
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Submissions
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Rejections
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Last 3 Months</span>
                    <span>{calculateSuccessRate(
                      recruiter.performanceMetrics?.lastThreeMonths?.hires || 0,
                      recruiter.performanceMetrics?.lastThreeMonths?.submissions || 0
                    )}% success rate</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-green-100 rounded p-2 text-center">
                      <span className="text-sm text-green-800">{recruiter.performanceMetrics?.lastThreeMonths?.hires || 0} hires</span>
                    </div>
                    <div className="bg-blue-100 rounded p-2 text-center">
                      <span className="text-sm text-blue-800">{recruiter.performanceMetrics?.lastThreeMonths?.submissions || 0} submissions</span>
                    </div>
                    <div className="bg-red-100 rounded p-2 text-center">
                      <span className="text-sm text-red-800">{recruiter.performanceMetrics?.lastThreeMonths?.rejections || 0} rejections</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Last 6 Months</span>
                    <span>{calculateSuccessRate(
                      recruiter.performanceMetrics?.lastSixMonths?.hires || 0,
                      recruiter.performanceMetrics?.lastSixMonths?.submissions || 0
                    )}% success rate</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-green-100 rounded p-2 text-center">
                      <span className="text-sm text-green-800">{recruiter.performanceMetrics?.lastSixMonths?.hires || 0} hires</span>
                    </div>
                    <div className="bg-blue-100 rounded p-2 text-center">
                      <span className="text-sm text-blue-800">{recruiter.performanceMetrics?.lastSixMonths?.submissions || 0} submissions</span>
                    </div>
                    <div className="bg-red-100 rounded p-2 text-center">
                      <span className="text-sm text-red-800">{recruiter.performanceMetrics?.lastSixMonths?.rejections || 0} rejections</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Last Year</span>
                    <span>{calculateSuccessRate(
                      recruiter.performanceMetrics?.lastYear?.hires || 0,
                      recruiter.performanceMetrics?.lastYear?.submissions || 0
                    )}% success rate</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-green-100 rounded p-2 text-center">
                      <span className="text-sm text-green-800">{recruiter.performanceMetrics?.lastYear?.hires || 0} hires</span>
                    </div>
                    <div className="bg-blue-100 rounded p-2 text-center">
                      <span className="text-sm text-blue-800">{recruiter.performanceMetrics?.lastYear?.submissions || 0} submissions</span>
                    </div>
                    <div className="bg-red-100 rounded p-2 text-center">
                      <span className="text-sm text-red-800">{recruiter.performanceMetrics?.lastYear?.rejections || 0} rejections</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Jobs */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Active Jobs</h2>
              <div className="space-y-4">
                {activeJobsList.map(job => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.department} • {job.location}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{
                          recruiterSubmissions.filter(s => s.jobId === job.id).length
                        } candidates</span>
                        <button 
                          onClick={() => navigate(`/jobs/${job.id}`)}
                          className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Contract Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Contract Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contract Period</h3>
                  <div className="mt-1 flex items-center text-gray-900">
                    <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                    <span>{formatDate(recruiter.contractStartDate)} - {formatDate(recruiter.contractEndDate)}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Specialties</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {recruiter.specialties?.map((specialty, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {specialty}
                      </span>
                    )) || <span className="text-gray-500">No specialties listed</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Total Submissions</span>
                  <span className="font-medium">{recruiter.submissionCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Total Hires</span>
                  <span className="font-medium text-green-600">{recruiter.hireCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Active Jobs</span>
                  <span className="font-medium">{recruiter.activeJobs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Avg Time to Hire</span>
                  <span className="font-medium">{recruiter.avgTimeToHire} days</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                <Users className="h-4 w-4 mr-2" />
                View All Candidates
              </button>
              <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Award className="h-4 w-4 mr-2" />
                Edit Recruiter Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDetailsPage;