import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Topbar() {
  const { user, currentRole } = useApp();
  const location = useLocation();

  // Simple title mapping based on route path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('competencies')) return 'My Competencies';
    if (path.includes('assessment')) return 'Assessment';
    if (path.includes('roadmap')) return 'Learning Roadmap';
    if (path.includes('progress')) return 'Progress';
    if (path.includes('generate')) return 'Generate Assessment';
    if (path.includes('review')) return 'Question Review';
    if (path.includes('workforce')) return 'Workforce Competency';
    if (path.includes('architecture')) return 'Architecture';
    if (path.includes('security')) return 'Security';
    return 'Dashboard';
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="page-title">{getPageTitle()}</h1>
      </div>
      
      <div className="topbar-right">
        <div className="badge badge-demo">Demo Mode</div>
        
        <button className="icon-btn" aria-label="Search">
          <Search size={20} />
        </button>
        
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        
        {user && (
          <div className="user-profile">
            <div className="avatar">
              {user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role-text">{currentRole}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
