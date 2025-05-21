import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSubmissions } from '../../contexts/SubmissionContext';
import { useJobs } from '../../contexts/JobContext';
import { useRecruiters } from '../../contexts/RecruiterContext';
import { ArrowLeft, Mail, Phone, MapPin, Building2, GraduationCap, Briefcase, Award, FileText, Link2, Github, Linkedin } from 'lucide-react';
import StatusBar from '../shared/StatusBar';

const CandidateDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { submissions, updateSubmission } = useSubmissions();
  const { jobs } = useJobs();
  const { recruiters } = useRecruiters();

  const candidate = submissions.find(s => s.id === id);
  const job = jobs.find(j => j?.id === candidate?.jobId);
  const recruiter = recruiters.find(r => r?.id === candidate?.recruiterId);

  if (!candidate) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">Candidate not found</div>
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-indigo-100 text-indigo-800';
      case 'advanced': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageIndex = (status: string) => {
    switch (status) {
      case 'submitted': return 0;
      case 'in-progress': return Math.floor(Math.random() * 3) + 1; // Random stage between 1-3
      case 'hired': return 5; // Now points to "Accepted" stage
      case 'rejected': return Math.floor(Math.random() * 3) + 1; // Keep the stage where rejection occurred
      default: return 0;
    }
  };

  const handleStatusUpdate = (newStatus: string, reason?: string) => {
    if (!candidate) return;
    
    const update: Partial<typeof candidate> = { status: newStatus };
    if (reason) {
      update.notes = [
        ...(candidate.notes || []),
        {
          id: Math.random().toString(36).substr(2, 9),
          content: reason,
          createdAt: new Date().toISOString(),
          createdBy: 'Hiring Manager',
          type: 'feedback'
        }
      ];
    }
    
    updateSubmission(candidate.id, update);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/submissions')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Submissions
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{candidate.name}</h1>
              <p className="mt-1 text-lg text-gray-600">{job?.title}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-500">
                  <Mail className="h-5 w-5 mr-2" />
                  <a href={`mailto:${candidate.email}`} className="hover:text-indigo-600">
                    {candidate.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-500">
                  <Phone className="h-5 w-5 mr-2" />
                  <a href={`tel:${candidate.phone}`} className="hover:text-indigo-600">
                    {candidate.phone}
                  </a>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Building2 className="h-5 w-5 mr-2" />
                  <span>{recruiter?.company}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              {candidate.linkedinUrl && (
                <a
                  href={candidate.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
              {candidate.githubUrl && (
                <a
                  href={candidate.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-900"
                >
                  <Github className="h-6 w-6" />
                </a>
              )}
              {candidate.portfolioUrl && (
                <a
                  href={candidate.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-600"
                >
                  <Link2 className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-6 py-4 border-b border-gray-200">
          <StatusBar 
            currentStage={getStageIndex(candidate.status)} 
            status={candidate.status}
            showDetails={true}
            onUpdateStatus={handleStatusUpdate}
          />
        </div>

        <div className="grid grid-cols-3 gap-6 p-6">
          {/* Left Column - Education & Experience */}
          <div className="col-span-2 space-y-6">
            {/* Education Section */}
            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Education
              </h2>
              <div className="space-y-4">
                {(candidate.education || []).map(edu => (
                  <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900">{edu.school}</h3>
                    <p className="text-gray-600">{edu.degree} in {edu.field}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.description && (
                      <p className="mt-2 text-gray-600">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Experience Section */}
            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Experience
              </h2>
              <div className="space-y-4">
                {(candidate.experience || []).map(exp => (
                  <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company} • {exp.location}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </p>
                    <p className="mt-2 text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Skills & Notes */}
          <div className="space-y-6">
            {/* Skills Section */}
            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Skills
              </h2>
              <div className="space-y-2">
                {(candidate.skills || []).map(skill => (
                  <div key={skill.id} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                    <span className="text-gray-900">{skill.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{skill.yearsOfExperience}y</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getSkillLevelColor(skill.level)}`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Notes Section */}
            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Notes
              </h2>
              <div className="space-y-4">
                {(candidate.notes || []).map(note => (
                  <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        note.type === 'interview' ? 'bg-blue-100 text-blue-800' :
                        note.type === 'feedback' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {note.type}
                      </span>
                      <span className="text-sm text-gray-500">{formatDate(note.createdAt)}</span>
                    </div>
                    <p className="text-gray-600">{note.content}</p>
                    <p className="mt-2 text-sm text-gray-500">By {note.createdBy}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsPage;