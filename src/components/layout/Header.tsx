import React, { useState } from 'react';
import { Briefcase, BellRing, User, X, Check } from 'lucide-react';
import { useMessages } from '../../contexts/MessageContext';

const Header: React.FC = () => {
  const [showMessages, setShowMessages] = useState(false);
  const { messages, unreadCount, markAsRead, markAllAsRead, deleteMessage } = useMessages();

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <BellRing className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <BellRing className="h-5 w-5 text-blue-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">PhindMe</span>
          </div>
          
          <div className="flex items-center">
            <div className="relative">
              <button 
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
                onClick={() => setShowMessages(!showMessages)}
              >
                <BellRing className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showMessages && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-indigo-600 hover:text-indigo-500"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {messages.length === 0 ? (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No notifications
                      </div>
                    ) : (
                      messages.map(message => (
                        <div
                          key={message.id}
                          className={`p-4 border-b border-gray-100 last:border-0 ${
                            !message.read ? 'bg-indigo-50' : ''
                          }`}
                          onClick={() => markAsRead(message.id)}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              {getMessageIcon(message.type)}
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-gray-900">{message.title}</p>
                              <p className="mt-1 text-sm text-gray-500">{message.content}</p>
                              <p className="mt-1 text-xs text-gray-400">{formatTimestamp(message.timestamp)}</p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteMessage(message.id);
                              }}
                              className="ml-2 text-gray-400 hover:text-gray-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="ml-4 flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">Admin User</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;