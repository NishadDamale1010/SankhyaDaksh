import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, ArrowRight, Sparkles, Shield, Target } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page-v2">
      <div className="landing-hero-bg">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
      </div>

      <nav className="landing-nav">
        <div className="landing-logo">
          <div className="logo-icon-badge">
            <BarChart2 size={24} color="#ffffff" />
          </div>
          <span className="logo-text">SANKHYA-DAKSH</span>
        </div>
        <div className="landing-nav-links">
          <span>Smart India Hackathon 2026</span>
          <span className="nav-divider">•</span>
          <span>Ministry of Statistics</span>
        </div>
      </nav>

      <main className="landing-main-content">
        <div className="hero-badge">
          <Sparkles size={16} className="text-primary" />
          <span>Next-Generation Competency Operating System</span>
        </div>
        
        <h1 className="hero-title">
          From Course Completion to <br />
          <span className="text-gradient">Competency Intelligence</span>
        </h1>
        
        <p className="hero-subtitle">
          An AI-powered intelligence layer for India's Statistical Workforce. 
          Transforming static learning into dynamic, personalized capability building using Deep-IRT algorithms.
        </p>

        <div className="hero-cta-group">
          <button 
            className="btn-massive btn-primary-glow"
            onClick={() => navigate('/auth')}
          >
            Launch Platform Demo
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="hero-features-row">
          <div className="feature-pill">
            <Target size={18} className="text-success" />
            <span>FRAC Mapped</span>
          </div>
          <div className="feature-pill">
            <Shield size={18} className="text-primary" />
            <span>DPDP Act 2023 Compliant</span>
          </div>
          <div className="feature-pill">
            <BarChart2 size={18} className="text-warning" />
            <span>Deep-IRT Analytics</span>
          </div>
        </div>
      </main>

      <style jsx="true">{`
        .landing-page-v2 {
          min-height: 100vh;
          background: #0f172a;
          color: white;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .landing-hero-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 0;
          overflow: hidden;
        }
        .gradient-blob {
          position: absolute;
          filter: blur(100px);
          border-radius: 50%;
          opacity: 0.5;
          animation: float 20s infinite ease-in-out alternate;
        }
        .blob-1 {
          top: -10%; left: -10%;
          width: 600px; height: 600px;
          background: rgba(67, 56, 202, 0.4);
        }
        .blob-2 {
          bottom: -20%; right: -10%;
          width: 700px; height: 700px;
          background: rgba(16, 185, 129, 0.2);
          animation-delay: -5s;
        }
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(100px, 50px) rotate(45deg); }
        }
        .landing-nav {
          position: relative;
          z-index: 10;
          padding: 24px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .landing-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 1px;
        }
        .landing-nav-links {
          display: flex;
          gap: 16px;
          align-items: center;
          font-size: 13px;
          color: #94a3b8;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .nav-divider { color: #334155; }
        .landing-main-content {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 24px;
        }
        .hero-badge {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 16px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #e2e8f0;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
        }
        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: 64px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .text-gradient {
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 20px;
          color: #94a3b8;
          max-width: 700px;
          line-height: 1.6;
          margin-bottom: 48px;
          font-weight: 400;
        }
        .btn-massive {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 40px;
          font-size: 18px;
          font-weight: 700;
          border-radius: 30px;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Outfit', sans-serif;
        }
        .btn-primary-glow {
          background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
          color: white;
          box-shadow: 0 0 30px rgba(79, 70, 229, 0.4), inset 0 2px 4px rgba(255,255,255,0.2);
        }
        .btn-primary-glow:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 10px 40px rgba(79, 70, 229, 0.6), inset 0 2px 4px rgba(255,255,255,0.2);
        }
        .hero-features-row {
          display: flex;
          gap: 24px;
          margin-top: 64px;
        }
        .feature-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 10px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #cbd5e1;
          backdrop-filter: blur(10px);
        }
        .text-primary { color: #60a5fa; }
        .text-success { color: #34d399; }
        .text-warning { color: #fbbf24; }
      `}</style>
    </div>
  );
}
