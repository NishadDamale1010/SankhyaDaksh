import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Topbar() {
  const { user } = useApp();

  const topbarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '0 24px',
    boxSizing: 'border-box',
    width: '100%'
  };

  const leftStyle = {
    display: 'flex',
    alignItems: 'center',
    flex: 1
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '400px'
  };

  const searchInputStyle = {
    width: '100%',
    height: '36px',
    padding: '0 16px 0 40px',
    borderRadius: '18px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: '14px',
    outline: 'none',
    color: '#0f172a'
  };

  const searchIconStyle = {
    position: 'absolute',
    left: '12px',
    color: '#94a3b8'
  };

  const rightStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  };

  const notificationStyle = {
    position: 'relative',
    cursor: 'pointer',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const profileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer'
  };

  const avatarStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '14px'
  };

  const userInfoStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const userNameStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#0f172a',
    lineHeight: '1.2'
  };

  const userRoleStyle = {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '2px'
  };

  const getInitials = (name) => {
    if (!name) return 'RK';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const displayUser = {
    name: user?.name || 'Rajesh Kumar',
    role: user?.designation || 'Joint Director'
  };

  return (
    <div style={topbarStyle}>
      <div style={leftStyle}>
        <div style={searchContainerStyle}>
          <Search size={18} style={searchIconStyle} />
          <input 
            type="text" 
            placeholder="Search courses, competencies, or ask AI..." 
            style={searchInputStyle}
          />
        </div>
      </div>

      <div style={rightStyle}>
        <div style={notificationStyle}>
          <Bell size={20} />
          <div style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '8px',
            height: '8px',
            backgroundColor: '#ef4444',
            borderRadius: '50%',
            border: '2px solid #ffffff'
          }}></div>
        </div>

        <div style={profileStyle}>
          <div style={avatarStyle}>
            {getInitials(displayUser.name)}
          </div>
          <div style={userInfoStyle}>
            <span style={userNameStyle}>{displayUser.name}</span>
            <span style={userRoleStyle}>{displayUser.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
