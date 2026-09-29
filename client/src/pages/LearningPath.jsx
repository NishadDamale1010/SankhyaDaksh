import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Clock, Award, ChevronDown, ChevronRight, Lock, BookOpen } from 'lucide-react';

export default function LearningPath() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '28px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>My Learning Path</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Personalized training recommendations based on your competency gaps</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginRight: '8px' }}>Data Group A</span>
          <ChevronDown size={16} color="#64748b" />
        </div>
      </div>

      {/* Phase 1: Foundation (Current) */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb' }} />
            <h2 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>
              Phase 1: Foundation (Current)
            </h2>
          </div>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>0/3 completed</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { id: 1, title: 'Introduction to Official Statistics', provider: 'iGOT', duration: '6 hours', icon: BookOpen },
            { id: 2, title: 'Data Quality and Management', provider: 'iGOT', duration: '8 hours', icon: Award },
            { id: 3, title: 'Statistical Software Tools', provider: 'iGOT', duration: '10 hours', icon: PlayCircle }
          ].map((course) => (
            <div 
              key={course.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '12px', 
                padding: '18px 20px', 
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div style={{ 
                width: '46px', 
                height: '46px', 
                backgroundColor: '#eff6ff', 
                borderRadius: '10px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                marginRight: '16px', 
                color: '#2563eb',
                flexShrink: 0 
              }}>
                <course.icon size={22} />
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                  {course.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#2563eb', fontWeight: '600' }}>{course.provider}</span>
                  </span>
                  <span style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {course.duration}
                  </span>
                </div>
              </div>

              <div>
                <button 
                  onClick={() => navigate('/course-content')}
                  style={{ 
                    backgroundColor: '#2563eb', 
                    color: '#ffffff', 
                    border: 'none', 
                    borderRadius: '8px', 
                    padding: '9px 22px', 
                    fontSize: '13px', 
                    fontWeight: '600', 
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase 2: Intermediate */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#94a3b8' }} />
            <h2 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: '#64748b' }}>
              Phase 2: Intermediate
            </h2>
          </div>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>0/3 completed</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', opacity: 0.8 }}>
          {[
            { id: 4, title: 'Advanced Statistical Methods', provider: 'iGOT', duration: '12 hours' },
            { id: 5, title: 'Data Visualization for Policy', provider: 'iGOT', duration: '8 hours' },
            { id: 6, title: 'Evidence Based Decision Making', provider: 'iGOT', duration: '10 hours' }
          ].map((course) => (
            <div 
              key={course.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: '#f8fafc', 
                border: '1px solid #e2e8f0', 
                borderRadius: '12px', 
                padding: '18px 20px' 
              }}
            >
              <div style={{ 
                width: '46px', 
                height: '46px', 
                backgroundColor: '#f1f5f9', 
                borderRadius: '10px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                marginRight: '16px', 
                color: '#94a3b8',
                flexShrink: 0 
              }}>
                <Lock size={20} />
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '700', color: '#475569' }}>
                  {course.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>{course.provider}</span>
                  <span style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {course.duration}
                  </span>
                </div>
              </div>

              <div style={{ color: '#94a3b8' }}>
                <Lock size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
