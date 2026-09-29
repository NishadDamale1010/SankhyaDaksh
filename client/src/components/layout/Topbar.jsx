import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Topbar() {
  const { user } = useApp();

  const topbarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '68px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '0 32px',
    boxSizing: 'border-box',
    width: '100%',
    fontFamily: "'Inter', sans-serif"
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
    width: '460px'
  };

  const searchInputStyle = {
    width: '100%',
    height: '40px',
    padding: '0 16px 0 42px',
    borderRadius: '10px',
    border: '1.5px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '13px',
    outline: 'none',
    color: '#0f172a',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s'
  };

  const searchIconStyle = {
    position: 'absolute',
    left: '14px',
    color: '#3b82f6'
  };

  const rightStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  };

  const notificationStyle = {
    position: 'relative',
    cursor: 'pointer',
    color: '#334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px'
  };

  const profileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '8px'
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '14px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  };

  const userInfoStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const userNameStyle = {
    fontSize: '14px',
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: '1.2'
  };

  const userRoleStyle = {
    fontSize: '11px',
    color: '#64748b',
    marginTop: '2px',
    lineHeight: '1.2'
  };

  const displayUser = {
    name: user?.name || 'Amit Sharma',
    role: user?.designation || 'Deputy Collector',
    cadre: user?.cadre || 'Maharashtra Cadre'
  };

  return (
    <div style={topbarStyle}>
      <div style={leftStyle}>
        <div style={searchContainerStyle}>
          <Search size={18} style={searchIconStyle} />
          <input 
            type="text" 
            placeholder="Search for competencies, courses, policies, or topics..." 
            style={searchInputStyle}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
          />
        </div>
      </div>

      <div style={rightStyle}>
        {/* Notification with Badge 3 */}
        <div style={notificationStyle}>
          <Bell size={22} color="#334155" />
          <div style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            width: '16px',
            height: '16px',
            backgroundColor: '#ef4444',
            borderRadius: '50%',
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #ffffff'
          }}>
            3
          </div>
        </div>

        {/* User Profile */}
        <div style={profileStyle}>
          <div style={avatarStyle}>
            AS
          </div>
          <div style={userInfoStyle}>
            <span style={userNameStyle}>{displayUser.name}</span>
            <span style={userRoleStyle}>{displayUser.role}</span>
            <span style={userRoleStyle}>{displayUser.cadre}</span>
          </div>
          <ChevronDown size={16} color="#64748b" style={{ marginLeft: '4px' }} />
        </div>
      </div>
    </div>
  );
}
