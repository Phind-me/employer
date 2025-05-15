import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../../contexts/JobContext';
import { useSubmissions } from '../../contexts/SubmissionContext';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  XCircle,
  Briefcase,
  Globe2,
  Award
} from 'lucide-react';

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { jobs } = useJobs();
  const { submissions } = useSubmissions();
  
  const job = jobs.find(j => j.id === id);
  const jobCandidates = submissions.filter(s => s.jobId === id);

  if (!job) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">Job not found</div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: job.salary?.currency || 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Jobs
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{job.title}</h1>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-500">
                  <Building2 className="h-5 w-5 mr-2" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Posted {formatDate(job.postedDate)}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Closing {formatDate(job.closingDate)}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                job.status === 'open' ? 'bg-green-100 text-green-800' :
                job.status === 'filled' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
              <span className="text-sm text-gray-500">{job.candidateCount} candidates</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 p-6">
          {/* Left Column - Main Job Details */}
          <div className="col-span-2 space-y-6">
            {/* Description */}
            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600">{job.description}</p>
            </section>

            {/* Responsibilities */}
            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {job.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Required Skills</h2>
              <div className="grid grid-cols-2 gap-4">
                {job.skills.map(skill => (
                  <div 
                    key={skill.id} 
                    className={`p-4 rounded-lg border ${skill.isRequired ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{skill.name}</h3>
                        <p className="text-sm text-gray-500">{skill.yearsRequired}+ years required</p>
                      </div>
                      {skill.isRequired && (
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Job Details Card */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Salary Range</h3>
                <p className="mt-1 flex items-center text-gray-900">
                  <DollarSign className="h-5 w-5 mr-1 text-gray-400" />
                  {job.salary ? `${formatCurrency(job.salary.min)} - ${formatCurrency(job.salary.max)}` : 'Not specified'}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Employment Type</h3>
                <p className="mt-1 flex items-center text-gray-900">
                  <Briefcase className="h-5 w-5 mr-1 text-gray-400" />
                  {job.employmentType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Workplace Type</h3>
                <p className="mt-1 flex items-center text-gray-900">
                  <Globe2 className="h-5 w-5 mr-1 text-gray-400" />
                  {job.workplaceType.charAt(0).toUpperCase() + job.workplaceType.slice(1)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Hiring Manager</h3>
                <p className="mt-1 flex items-center text-gray-900">
                  <Users className="h-5 w-5 mr-1 text-gray-400" />
                  {job.hiringManager}
                </p>
              </div>
            </div>

            {/* Candidates Overview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Candidates Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Total Candidates</span>
                  <span className="font-medium">{jobCandidates.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">In Progress</span>
                  <span className="font-medium">{jobCandidates.filter(c => c.status === 'in-progress').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Hired</span>
                  <span className="font-medium text-green-600">{jobCandidates.filter(c => c.status === 'hired').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Rejected</span>
                  <span className="font-medium text-red-600">{jobCandidates.filter(c => c.status === 'rejected').length}</span>
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
                Edit Job Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;