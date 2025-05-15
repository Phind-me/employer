import React, { createContext, useContext, useEffect, useState } from 'react';
import { TeamMember } from '../types';

interface TeamContextType {
  members: TeamMember[];
  inviteMember: (email: string, role: TeamMember['role']) => void;
  updateMember: (id: string, updates: Partial<TeamMember>) => void;
  removeMember: (id: string) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const mockMembers: TeamMember[] = [
      {
        id: '1',
        email: 'john@example.com',
        name: 'John Smith',
        role: 'owner',
        status: 'active',
        joinedAt: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
        email: 'sarah@example.com',
        name: 'Sarah Johnson',
        role: 'admin',
        status: 'active',
        joinedAt: '2024-02-01T09:30:00Z',
      },
      {
        id: '3',
        email: 'mike@example.com',
        name: 'Mike Wilson',
        role: 'member',
        status: 'pending',
        joinedAt: '2024-03-10T14:20:00Z',
      },
    ];
    setMembers(mockMembers);
  }, []);

  const inviteMember = (email: string, role: TeamMember['role']) => {
    const newMember: TeamMember = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      role,
      status: 'pending',
      joinedAt: new Date().toISOString(),
    };
    setMembers(prev => [...prev, newMember]);
  };

  const updateMember = (id: string, updates: Partial<TeamMember>) => {
    setMembers(prev =>
      prev.map(member =>
        member.id === id ? { ...member, ...updates } : member
      )
    );
  };

  const removeMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  return (
    <TeamContext.Provider
      value={{
        members,
        inviteMember,
        updateMember,
        removeMember,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};