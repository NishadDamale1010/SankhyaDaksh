import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Radar,
  BookOpen,
  ClipboardCheck,
  Target,
  FolderOpen,
  TrendingUp,
  BrainCircuit,
  Database,
  Search,
  LogOut,
  Hexagon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar() {
  const { currentRole, logout } = useApp();
  const role = currentRole || 'officer';

  const officerLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'Competency Analysis', path: '/competencies', icon: Radar },
    { name: 'Learning Path', path: '/learning', icon: BookOpen },
    { name: 'Assessments', path: '/assessments', icon: ClipboardCheck },
    { name: 'Mission Simulator', path: '/mission-simulator', icon: Target },
    { name: 'Resources', path: '/resources', icon: FolderOpen },
    { name: 'Progress', path: '/progress', icon: TrendingUp },
    { name: 'AI Assistant', path: '/ai-assistant', icon: BrainCircuit },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Competency Analysis', path: '/competencies', icon: Radar },
    { name: 'Learning Resources', path: '/learning', icon: BookOpen },
    { name: 'Data Sources', path: '/data-sources', icon: Database },
    { name: 'Knowledge Base', path: '/knowledge-base', icon: Search },
    { name: 'System Intelligence', path: '/system-intelligence', icon: BrainCircuit },
  ];

  const links = role.toUpperCase() === 'ADMIN' ? adminLinks : officerLinks;

  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '240px',
    height: '100vh',
    backgroundColor: '#0a1628',
    color: '#94a3b8',
    boxSizing: 'border-box'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '60px',
    padding: '0 16px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: '600',
    gap: '12px'
  };

  const navContainerStyle = {
    flex: 1,
    padding: '16px 0',
    overflowY: 'auto'
  };

  const linkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    height: '42px',
    padding: '0 16px',
    textDecoration: 'none',
    fontSize: '14px',
    color: isActive ? '#ffffff' : '#94a3b8',
    backgroundColor: isActive ? 'rgba(59,130,246,0.15)' : 'transparent',
    borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
    gap: '12px',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  });

  const bottomStyle = {
    padding: '16px',
    borderTop: '1px solid rgba(255,255,255,0.05)'
  };

  const logoutButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '42px',
    padding: '0 16px',
    width: '100%',
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    fontSize: '14px',
    cursor: 'pointer',
    gap: '12px',
    textAlign: 'left',
    transition: 'color 0.2s ease'
  };

  return (
    <div style={sidebarStyle}>
      <div style={headerStyle}>
        <Hexagon size={24} color="#3b82f6" fill="#3b82f6" />
        Sankhya-Daksh
      </div>
      
      <div style={navContainerStyle}>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            style={({ isActive }) => linkStyle(isActive)}
          >
            <link.icon size={18} />
            {link.name}
          </NavLink>
        ))}
      </div>

      <div style={bottomStyle}>
        <button 
          style={logoutButtonStyle}
          onMouseOver={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)' }}
          onMouseOut={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.backgroundColor = 'transparent' }}
          onClick={logout}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
