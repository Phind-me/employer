import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Building2, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active = false, onClick }) => {
  return (
    <li 
      className={`group px-3 py-2 rounded-md cursor-pointer ${active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className={`mr-3 ${active ? 'text-indigo-600' : 'text-gray-500 group-hover:text-indigo-500'}`}>
          {icon}
        </div>
        <span className="font-medium">{text}</span>
      </div>
    </li>
  );
};

interface SidebarProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onPageChange, currentPage }) => {
  return (
    <aside className="bg-white border-r border-gray-200 w-64 h-screen flex-shrink-0 hidden md:block">
      <div className="h-full flex flex-col">
        <div className="overflow-y-auto py-5 px-3 flex-grow">
          <nav className="mt-5">
            <ul className="space-y-2">
              <SidebarItem 
                icon={<LayoutDashboard size={20} />} 
                text="Dashboard" 
                active={currentPage === 'dashboard'}
                onClick={() => onPageChange('dashboard')}
              />
              <SidebarItem 
                icon={<Briefcase size={20} />} 
                text="Jobs" 
                active={currentPage === 'jobs'}
                onClick={() => onPageChange('jobs')}
              />
              <SidebarItem 
                icon={<Users size={20} />} 
                text="Candidates" 
                active={currentPage === 'candidates'}
                onClick={() => onPageChange('candidates')}
              />
              <SidebarItem 
                icon={<Building2 size={20} />} 
                text="Recruiters" 
                active={currentPage === 'recruiters'}
                onClick={() => onPageChange('recruiters')}
              />
              <SidebarItem 
                icon={<Settings size={20} />} 
                text="Settings" 
                active={currentPage === 'settings'}
                onClick={() => onPageChange('settings')}
              />
              <SidebarItem 
                icon={<HelpCircle size={20} />} 
                text="Help" 
                active={currentPage === 'help'}
                onClick={() => onPageChange('help')}
              />
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="bg-indigo-50 rounded-lg p-3">
            <p className="text-sm text-indigo-700 font-medium">Pro Plan</p>
            <p className="text-xs text-indigo-600 mt-1">Valid until Apr 2026</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;