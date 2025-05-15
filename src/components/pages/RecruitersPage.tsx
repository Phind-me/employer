import React from 'react';
import { Search, Filter, Building2 } from 'lucide-react';

const RecruitersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Recruiters</h1>
          <p className="mt-1 text-sm text-gray-500">Manage recruiting partners</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          <Building2 className="h-4 w-4 mr-2" />
          Add Agency
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search recruiters..."
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
            {[1, 2, 3].map((recruiter) => (
              <div key={recruiter} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 cursor-pointer transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">TalentScout Inc.</h3>
                    <p className="mt-1 text-sm text-gray-500">Premier Recruiting Partner</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Submissions</p>
                    <p className="mt-1 font-medium text-gray-900">24</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Hires</p>
                    <p className="mt-1 font-medium text-gray-900">8</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Success Rate</p>
                    <p className="mt-1 font-medium text-gray-900">33%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitersPage;