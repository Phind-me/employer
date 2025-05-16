import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMessages } from '../../contexts/MessageContext';
import { Search, Archive, Trash2, Star, Clock, Mail, CheckCircle2, AlertCircle, BellRing } from 'lucide-react';

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { messages, markAsRead, deleteMessage } = useMessages();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = messages.filter(message =>
    message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMessage = messages.find(m => m.id === id);

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <BellRing className="h-5 w-5 text-red-500" />;
      default:
        return <Mail className="h-5 w-5 text-blue-500" />;
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
    <div className="h-full flex">
      {/* Messages List */}
      <div className="w-1/3 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-10rem)]">
          {filteredMessages.map(message => (
            <div
              key={message.id}
              onClick={() => {
                navigate(`/messages/${message.id}`);
                if (!message.read) markAsRead(message.id);
              }}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                !message.read ? 'bg-indigo-50' : ''
              } ${message.id === id ? 'bg-indigo-100' : ''}`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {getMessageIcon(message.type)}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${!message.read ? 'text-gray-900' : 'text-gray-600'}`}>
                      {message.title}
                    </p>
                    <p className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 bg-white">
        {selectedMessage ? (
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">{selectedMessage.title}</h1>
                  <p className="mt-1 text-sm text-gray-500">{formatTimestamp(selectedMessage.timestamp)}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Star className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Archive className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => {
                      deleteMessage(selectedMessage.id);
                      navigate('/messages');
                    }}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="prose max-w-none">
                <p className="text-gray-800">{selectedMessage.content}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Mail className="h-12 w-12 mx-auto mb-4" />
              <p>Select a message to read</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;