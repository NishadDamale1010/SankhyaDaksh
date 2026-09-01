import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Shield, BookOpen, User, BarChart2, CheckCircle2 } from 'lucide-react';

export default function Auth() {
  const [selectedRole, setSelectedRole] = useState('officer');
  const { setCurrentRole } = useApp();
  const navigate = useNavigate();

  const handleLogin = () => {
    setCurrentRole(selectedRole);
    navigate('/dashboard');
  };

  const roles = [
    {
      id: 'officer',
      title: 'MoSPI Officer',
      desc: 'Access your personalized learning roadmap and competency dashboard.',
      icon: User,
      color: 'blue'
    },
    {
      id: 'trainer',
      title: 'NSSTA Trainer',
      desc: 'Generate assessments, review performance, and manage courses.',
      icon: BookOpen,
      color: 'green'
    },
    {
      id: 'admin',
      title: 'Administrator',
      desc: 'View workforce analytics and manage platform architecture.',
      icon: Shield,
      color: 'indigo'
    }
  ];

  return (
    <div className="auth-page-container">
      <div className="auth-left-pane">
        <div className="auth-branding">
          <div className="logo-icon-badge" style={{ display: 'inline-block', marginBottom: '24px' }}>
            <BarChart2 size={32} color="#ffffff" />
          </div>
          <h1 className="auth-hero-title">SANKHYA-DAKSH</h1>
          <p className="auth-hero-subtitle">
            The intelligent competency operating system powering India's statistical workforce.
          </p>
          
          <div className="auth-features mt-6">
            <div className="auth-feature-item">
              <CheckCircle2 size={18} className="text-success" />
              <span>Deep-IRT personalized learning</span>
            </div>
            <div className="auth-feature-item">
              <CheckCircle2 size={18} className="text-success" />
              <span>iGOT Karmayogi integration</span>
            </div>
            <div className="auth-feature-item">
              <CheckCircle2 size={18} className="text-success" />
              <span>Verifiable digital credentials</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right-pane">
        <div className="auth-form-container">
          <h2 className="auth-form-title">Welcome to the Demo</h2>
          <p className="auth-form-subtitle">Please select your persona to continue.</p>

          <div className="role-selector-grid">
            {roles.map((role) => {
              const Icon = role.icon;
              const isActive = selectedRole === role.id;
              return (
                <div 
                  key={role.id}
                  className={`role-card ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className={`role-icon-wrapper ${role.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="role-card-content">
                    <h3 className="role-card-title">{role.title}</h3>
                    <p className="role-card-desc">{role.desc}</p>
                  </div>
                  <div className="role-radio">
                    <div className={`radio-inner ${isActive ? 'active' : ''}`}></div>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="btn-massive btn-primary-glow mt-6 w-full" onClick={handleLogin}>
            Sign In to Dashboard
          </button>
        </div>
      </div>

      <style jsx="true">{`
        .auth-page-container {
          display: flex;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
        }
        .auth-left-pane {
          flex: 1;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
          color: white;
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .auth-left-pane::before {
          content: '';
          position: absolute;
          top: -20%; left: -10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(0,0,0,0) 70%);
          border-radius: 50%;
        }
        .auth-branding {
          position: relative;
          z-index: 10;
          max-width: 480px;
        }
        .auth-hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: 48px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 16px;
        }
        .auth-hero-subtitle {
          font-size: 18px;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 32px;
        }
        .auth-feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 15px;
          font-weight: 500;
          color: #e2e8f0;
        }
        
        .auth-right-pane {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .auth-form-container {
          width: 100%;
          max-width: 480px;
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
          border: 1px solid #e2e8f0;
        }
        .auth-form-title {
          font-family: 'Outfit', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .auth-form-subtitle {
          font-size: 15px;
          color: #64748b;
          margin-bottom: 32px;
        }
        
        .role-selector-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .role-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          border: 2px solid #f1f5f9;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .role-card:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
        }
        .role-card.active {
          border-color: #3b82f6;
          background: #eff6ff;
        }
        .role-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }
        .role-icon-wrapper.blue { background: linear-gradient(135deg, #3b82f6, #2563eb); }
        .role-icon-wrapper.green { background: linear-gradient(135deg, #10b981, #059669); }
        .role-icon-wrapper.indigo { background: linear-gradient(135deg, #6366f1, #4f46e5); }
        
        .role-card-content { flex: 1; }
        .role-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .role-card-desc {
          font-size: 13px;
          color: #64748b;
          line-height: 1.5;
        }
        .role-radio {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
        }
        .role-card.active .role-radio {
          border-color: #3b82f6;
        }
        .radio-inner {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: transparent;
          transition: background 0.2s;
        }
        .radio-inner.active {
          background: #3b82f6;
        }
        
        .btn-massive {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px 24px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }
        .btn-primary-glow {
          background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
          color: white;
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
        }
        .btn-primary-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px -5px rgba(59, 130, 246, 0.5);
        }
        
        @media (max-width: 900px) {
          .auth-page-container { flex-direction: column; }
          .auth-left-pane { padding: 40px 20px; flex: none; }
          .auth-right-pane { padding: 20px; }
        }
      `}</style>
    </div>
  );
}
