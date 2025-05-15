import React from 'react';
import { Book, MessageCircle, Phone, Mail } from 'lucide-react';

const HelpPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Help Center</h1>
        <p className="mt-1 text-sm text-gray-500">Get support and learn more about PhindMe</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Book className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">Documentation</h2>
              <p className="mt-1 text-sm text-gray-500">
                Browse our documentation to learn more about features and best practices
              </p>
            </div>
          </div>
          <div className="mt-4">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View Documentation →
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <MessageCircle className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">Community Forum</h2>
              <p className="mt-1 text-sm text-gray-500">
                Connect with other users and share experiences
              </p>
            </div>
          </div>
          <div className="mt-4">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Visit Forum →
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Phone className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">Contact Support</h2>
              <p className="mt-1 text-sm text-gray-500">
                Get help from our support team
              </p>
            </div>
          </div>
          <div className="mt-4">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Contact Us →
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Mail className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">Newsletter</h2>
              <p className="mt-1 text-sm text-gray-500">
                Stay updated with latest features and updates
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;