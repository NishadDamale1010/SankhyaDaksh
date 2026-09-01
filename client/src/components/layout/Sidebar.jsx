import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  ClipboardCheck, 
  Target, 
  Award, 
  Bot, 
  User, 
  HelpCircle,
  PieChart,
  Sparkles,
  Shield,
  Layers,
  BarChart2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar() {
  const { currentRole } = useApp();

  const getLinks = () => {
    // Standard menu matching the mockup screenshot
    return [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/my-learning', icon: BookOpen, label: 'My Learning' },
      { to: '/igot-karmayogi', icon: GraduationCap, label: 'iGOT Karmayogi' },
      { to: '/assessments', icon: ClipboardCheck, label: 'Assessments' },
      { to: '/skill-gap', icon: Target, label: 'Skill Gap Analysis' },
      { to: '/certificates', icon: Award, label: 'Certificates' },
      { to: '/ai-assistant', icon: Bot, label: 'AI Assistant' },
      { section: 'Intelligence & Tools' },
      { to: '/ai-quiz-generator', icon: Sparkles, label: 'AI Quiz Generator' },
      { to: '/analytics', icon: PieChart, label: 'Dashboard & Analytics' },
      { to: '/architecture', icon: Layers, label: 'Architecture & Security' },
      { section: 'User' },
      { to: '/profile', icon: User, label: 'My Profile' },
      { to: '/help', icon: HelpCircle, label: 'Help & Support' },
    ];
  };

  const links = getLinks();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon-badge">
          <BarChart2 size={22} color="#ffffff" />
        </div>
        <div className="logo-text-group">
          <span className="logo-title">SANKHYA-DAKSH</span>
          <span className="logo-tagline">Smart Learning, Stronger Stats.</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {links.map((link, index) => {
          if (link.section) {
            return (
              <div key={`section-${index}`} className="sidebar-section-title">
                {link.section}
              </div>
            );
          }
          
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/" className="sidebar-link landing-back-link">
          <span>← Back to Hackathon Hero</span>
        </NavLink>
        <div className="badge badge-demo" style={{ width: '100%', textAlign: 'center', justifyContent: 'center', marginTop: '6px' }}>
          Demo Mode ({currentRole ? currentRole.toUpperCase() : 'OFFICER'})
        </div>
      </div>
    </aside>
  );
}
