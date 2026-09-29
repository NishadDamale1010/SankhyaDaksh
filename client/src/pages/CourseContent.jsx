import React from 'react';
import { Play, Maximize, Volume2, Settings, FileText, MessageSquare, BookOpen, CheckCircle2 } from 'lucide-react';

export default function CourseContent() {
  const modules = [
    { id: 1, title: 'Introduction', active: true },
    { id: 2, title: 'Data Collection & Cleaning', active: false },
    { id: 3, title: 'Statistical Methods', active: false },
    { id: 4, title: 'Policy Applications', active: false },
    { id: 5, title: 'Case Studies', active: false },
    { id: 6, title: 'Quiz & Assessments', active: false },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        <div>
          <h1 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>Advanced Data Analytics for Policy Making</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#6b7280' }}>
            <span>iGOT</span>
            <span>•</span>
            <span>12 hours</span>
            <span>•</span>
            <span>Self-paced</span>
          </div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
          <CheckCircle2 size={16} />
          Mark as Complete
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: '250px', backgroundColor: '#fff', borderRight: '1px solid #e5e7eb', overflowY: 'auto' }}>
          <div style={{ padding: '16px', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Course Modules
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {modules.map(mod => (
              <div key={mod.id} style={{ 
                padding: '16px', 
                borderBottom: '1px solid #f3f4f6', 
                backgroundColor: mod.active ? '#eff6ff' : 'transparent',
                borderLeft: mod.active ? '4px solid #3b82f6' : '4px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <div style={{ 
                  width: '24px', height: '24px', 
                  borderRadius: '12px', 
                  backgroundColor: mod.active ? '#3b82f6' : '#e5e7eb', 
                  color: mod.active ? '#fff' : '#6b7280',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  fontSize: '12px', fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {mod.id}
                </div>
                <div style={{ color: mod.active ? '#1d4ed8' : '#374151', fontSize: '14px', fontWeight: mod.active ? '600' : '400', lineHeight: '1.4' }}>
                  Module {mod.id}: {mod.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', backgroundColor: '#f9fafb' }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
            Module 1: Introduction to Data Analytics in Governance
          </h2>
          
          <div style={{ 
            width: '100%', 
            aspectRatio: '16/9', 
            backgroundColor: '#1f2937', 
            borderRadius: '8px', 
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))' }}></div>
              <h3 style={{ position: 'relative', color: '#fff', fontSize: '32px', fontWeight: 'bold', textAlign: 'center', zIndex: 10, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                Data Analytics for Better Governance
              </h3>
            </div>
            
            <div style={{ height: '48px', backgroundColor: 'rgba(17, 24, 39, 0.9)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '16px' }}>
              <Play size={20} color="#fff" style={{ cursor: 'pointer' }} />
              <span style={{ color: '#fff', fontSize: '13px', fontFamily: 'monospace' }}>0:00 / 13:54</span>
              
              <div style={{ flex: 1, height: '4px', backgroundColor: '#4b5563', borderRadius: '2px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '0%', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
                <div style={{ position: 'absolute', left: '0%', top: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '50%' }}></div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Settings size={18} color="#fff" style={{ cursor: 'pointer' }} />
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>1x</span>
                <Volume2 size={18} color="#fff" style={{ cursor: 'pointer' }} />
                <Maximize size={18} color="#fff" style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '24px' }}>
            {['Overview', 'Resources', 'Discussion', 'Notes'].map((tab, idx) => (
              <div key={idx} style={{ 
                padding: '12px 24px', 
                fontSize: '15px', 
                fontWeight: '500', 
                color: idx === 0 ? '#2563eb' : '#6b7280',
                borderBottom: idx === 0 ? '2px solid #2563eb' : '2px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {idx === 0 && <BookOpen size={16} />}
                {idx === 1 && <FileText size={16} />}
                {idx === 2 && <MessageSquare size={16} />}
                {idx === 3 && <FileText size={16} />}
                {tab}
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>About this module</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#4b5563', lineHeight: '1.6' }}>
              Welcome to the introductory module on Data Analytics in Governance. In this section, we will explore the foundational concepts of leveraging data to drive policy decisions and improve public services. You will learn how modern statistical tools and big data methodologies are transforming the way government functions operate globally.
            </p>
            <p style={{ margin: 0, fontSize: '15px', color: '#4b5563', lineHeight: '1.6' }}>
              By the end of this module, you will understand the life cycle of data in government projects, from collection and processing to visualization and policy implementation. We'll also cover key challenges such as data privacy, ethical considerations, and ensuring data quality across various departments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
