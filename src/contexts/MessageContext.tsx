import React, { createContext, useContext, useEffect, useState } from 'react';
import { Message } from '../types';

interface MessageContextType {
  messages: Message[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp' | 'read'>) => void;
  deleteMessage: (id: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const mockMessages: Message[] = [
      {
        id: '1',
        title: 'New Candidate Application',
        content: 'Sarah Johnson has applied for Senior Software Engineer position',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        read: false,
        type: 'info'
      },
      {
        id: '2',
        title: 'Interview Scheduled',
        content: 'Technical interview scheduled with Michael Brown',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        read: false,
        type: 'success'
      },
      {
        id: '3',
        title: 'Urgent: Position Closing Soon',
        content: 'UX Designer position closes in 24 hours with no candidates',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 24 hours ago
        read: false,
        type: 'warning'
      }
    ];
    setMessages(mockMessages);
  }, []);

  const unreadCount = messages.filter(m => !m.read).length;

  const markAsRead = (id: string) => {
    setMessages(prev =>
      prev.map(message =>
        message.id === id ? { ...message, read: true } : message
      )
    );
  };

  const markAllAsRead = () => {
    setMessages(prev =>
      prev.map(message => ({ ...message, read: true }))
    );
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp' | 'read'>) => {
    const newMessage: Message = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(message => message.id !== id));
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addMessage,
        deleteMessage
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};