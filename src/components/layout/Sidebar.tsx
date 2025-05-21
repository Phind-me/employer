import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Building2, 
  Settings, 
  HelpCircle,
  Mail,
  X
} from 'lucide-react';
import { useMessages } from '../../contexts/MessageContext';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  badge?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, to, badge }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `group px-3 py-2 rounded-md cursor-pointer flex items-center justify-between ${
            isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
          }`
        }
      >
        <div className="flex items-center">
          <div className="mr-3">{icon}</div>
          <span className="font-medium">{text}</span>
        </div>
        {badge !== undefined && badge > 0 && (
          <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-medium">
            {badge}
          </span>
        )}
      </NavLink>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const { unreadCount } = useMessages();
  const location = useLocation();
  const isMessagesActive = location.pathname.startsWith('/messages');

  return (
    <div className="bg-white border-r border-gray-200 h-full w-64">
      <div className="h-full flex flex-col">
        <div className="overflow-y-auto py-5 px-3 flex-grow">
          <nav className="mt-5">
            <ul className="space-y-2">
              <SidebarItem 
                icon={<LayoutDashboard size={20} />} 
                text="Dashboard" 
                to="/"
              />
              <SidebarItem 
                icon={<Briefcase size={20} />} 
                text="Jobs" 
                to="/jobs"
              />
              <SidebarItem 
                icon={<Users size={20} />} 
                text="Submissions" 
                to="/submissions"
              />
              <SidebarItem 
                icon={<Building2 size={20} />} 
                text="Recruiters" 
                to="/recruiters"
              />
              <SidebarItem 
                icon={<Mail size={20} />} 
                text="Messages" 
                to="/messages"
                badge={unreadCount}
              />
              <SidebarItem 
                icon={<Settings size={20} />} 
                text="Settings" 
                to="/settings"
              />
              <SidebarItem 
                icon={<HelpCircle size={20} />} 
                text="Help" 
                to="/help"
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
    </div>
  );
};

export default Sidebar;