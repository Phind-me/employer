import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJobs } from '../../contexts/JobContext';
import { Job, JobSkill } from '../../types';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

const JobFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { jobs, createJob, updateJob } = useJobs();
  const isEditing = Boolean(id);

  const emptyJob: Omit<Job, 'id'> = {
    title: '',
    department: '',
    location: '',
    closingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    status: 'open',
    candidateCount: 0,
    description: '',
    responsibilities: [''],
    requirements: [''],
    skills: [],
    employmentType: 'full-time',
    workplaceType: 'remote',
    postedDate: new Date().toISOString().split('T')[0],
    hiringManager: '',
    salary: {
      min: 0,
      max: 0,
      currency: 'USD'
    }
  };

  const [formData, setFormData] = useState<Omit<Job, 'id'>>(emptyJob);

  useEffect(() => {
    if (isEditing) {
      const job = jobs.find(j => j.id === id);
      if (job) {
        setFormData(job);
      }
    }
  }, [id, jobs, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && id) {
      updateJob(id, formData);
    } else {
      createJob(formData);
    }
    navigate('/jobs');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      salary: {
        ...prev.salary!,
        [name]: name === 'currency' ? value : parseInt(value, 10)
      }
    }));
  };

  const handleArrayChange = (index: number, value: string, field: 'responsibilities' | 'requirements') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'responsibilities' | 'requirements') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index: number, field: 'responsibilities' | 'requirements') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSkillChange = (index: number, field: keyof JobSkill, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const addSkill = () => {
    const newSkill: JobSkill = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      yearsRequired: 0,
      isRequired: true
    };
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
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

      <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow-sm rounded-lg p-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEditing ? 'Edit Job' : 'Create New Job'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {isEditing ? 'Update the job details below' : 'Fill in the job details below'}
          </p>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="hiringManager" className="block text-sm font-medium text-gray-700">Hiring Manager</label>
            <input
              type="text"
              id="hiringManager"
              name="hiringManager"
              value={formData.hiringManager}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">Employment Type</label>
            <select
              id="employmentType"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div>
            <label htmlFor="workplaceType" className="block text-sm font-medium text-gray-700">Workplace Type</label>
            <select
              id="workplaceType"
              name="workplaceType"
              value={formData.workplaceType}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On Site</option>
            </select>
          </div>

          <div>
            <label htmlFor="closingDate" className="block text-sm font-medium text-gray-700">Closing Date</label>
            <input
              type="date"
              id="closingDate"
              name="closingDate"
              value={formData.closingDate.split('T')[0]}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        {/* Salary Information */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Salary Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label htmlFor="min" className="block text-sm font-medium text-gray-700">Minimum Salary</label>
              <input
                type="number"
                id="min"
                name="min"
                value={formData.salary?.min}
                onChange={handleSalaryChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="max" className="block text-sm font-medium text-gray-700">Maximum Salary</label>
              <input
                type="number"
                id="max"
                name="max"
                value={formData.salary?.max}
                onChange={handleSalaryChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
              <select
                id="currency"
                name="currency"
                value={formData.salary?.currency}
                onChange={handleSalaryChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border-t border-gray-200 pt-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Responsibilities */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Responsibilities</h2>
            <button
              type="button"
              onClick={() => addArrayItem('responsibilities')}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Responsibility
            </button>
          </div>
          <div className="space-y-3">
            {formData.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={responsibility}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'responsibilities')}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter responsibility"
                  required
                />
                {formData.responsibilities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'responsibilities')}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Requirements</h2>
            <button
              type="button"
              onClick={() => addArrayItem('requirements')}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Requirement
            </button>
          </div>
          <div className="space-y-3">
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'requirements')}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter requirement"
                  required
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'requirements')}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Required Skills</h2>
            <button
              type="button"
              onClick={addSkill}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Skill
            </button>
          </div>
          <div className="space-y-3">
            {formData.skills.map((skill, index) => (
              <div key={skill.id} className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Skill name"
                    required
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    value={skill.yearsRequired}
                    onChange={(e) => handleSkillChange(index, 'yearsRequired', parseInt(e.target.value, 10))}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Years"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={skill.isRequired}
                    onChange={(e) => handleSkillChange(index, 'isRequired', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Required</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/jobs')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {isEditing ? 'Update Job' : 'Create Job'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobFormPage;