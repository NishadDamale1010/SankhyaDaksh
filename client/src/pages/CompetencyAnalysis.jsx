import React, { useState } from 'react';
import { Download } from 'lucide-react';

const CompetencyAnalysis = () => {
  const [activeTab, setActiveTab] = useState('Gap Analysis');

  const tabs = ['Overview', 'Gap Analysis', 'FRAC Mapping', 'Assessment History'];

  const gapsData = [
    { domain: 'Data Management', current: 70, target: 85, gap: -15 },
    { domain: 'Statistical Analysis', current: 60, target: 80, gap: -20 },
    { domain: 'Policy Analysis', current: 60, target: 80, gap: -20 },
    { domain: 'Digital Governance', current: 88, target: 98, gap: -10 },
    { domain: 'Communication', current: 88, target: 95, gap: -25 }, // Requested exact gap value
    { domain: 'Leadership', current: 75, target: 100, gap: -25 },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>Competency Analysis</h1>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            backgroundColor: '#2563eb', color: 'white', 
            border: 'none', borderRadius: '6px', 
            padding: '8px 16px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' 
          }}>
            <Download size={16} />
            Download Report
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '32px' }}>
          {tabs.map((tab) => (
            <div 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 24px',
                cursor: 'pointer',
                color: activeTab === tab ? '#2563eb' : '#64748b',
                fontWeight: activeTab === tab ? '600' : '400',
                borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
                marginBottom: '-1px'
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Section Content */}
        {activeTab === 'Gap Analysis' && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '24px' }}>Competency Gaps</h2>
            
            {/* Legend */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', fontSize: '14px', color: '#475569' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                <span>Current Level</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1' }}></div>
                <span>Target Level</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                <span>Gap</span>
              </div>
            </div>

            {/* Bars */}
            <div>
              {gapsData.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                  <div style={{ width: '180px', fontSize: '14px', color: '#334155', fontWeight: '500' }}>
                    {item.domain}
                  </div>
                  
                  <div style={{ flex: 1, position: 'relative', height: '10px', backgroundColor: '#f1f5f9', borderRadius: '5px', margin: '0 24px' }}>
                    {/* Target Bar Background */}
                    <div style={{ 
                      position: 'absolute', 
                      left: 0, 
                      top: 0, 
                      height: '100%', 
                      width: `${item.target}%`, 
                      backgroundColor: '#e2e8f0', 
                      borderRadius: '5px' 
                    }}></div>
                    
                    {/* Current Bar Foreground */}
                    <div style={{ 
                      position: 'absolute', 
                      left: 0, 
                      top: 0, 
                      height: '100%', 
                      width: `${item.current}%`, 
                      backgroundColor: '#3b82f6', 
                      borderRadius: '5px' 
                    }}></div>
                  </div>

                  <div style={{ width: '150px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#475569' }}>{item.current}</span>
                    <span style={{ color: '#475569' }}>{item.target}</span>
                    <span style={{ color: '#ef4444', fontWeight: '600' }}>{item.gap}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CompetencyAnalysis;
