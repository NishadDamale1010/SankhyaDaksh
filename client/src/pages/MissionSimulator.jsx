import React, { useState } from 'react';
import { BarChart3, Users, MapPin, ChevronRight, Play } from 'lucide-react';

export default function MissionSimulator() {
  const [activeTab, setActiveTab] = useState('Scenario Selection');
  const tabs = ['Scenario Selection', 'Simulation', 'Results'];

  const scenarios = [
    {
      id: 1,
      title: 'Census Data Analysis',
      desc: 'Analyze census data to identify key demographic trends and recommend policy interventions.',
      tags: ['Data Analysis', 'Policy Making'],
      badge: 'Demographics',
      bgColor: '#eff6ff',
      iconColor: '#2563eb',
      icon: Users
    },
    {
      id: 2,
      title: 'Scheme Impact Evaluation',
      desc: 'Evaluate the impact of a government scheme using statistical analysis.',
      tags: ['Impact Assessment', 'Statistical Analysis'],
      badge: 'Evaluation',
      bgColor: '#ecfdf5',
      iconColor: '#059669',
      icon: BarChart3
    },
    {
      id: 3,
      title: 'Resource Allocation',
      desc: 'Optimize resource allocation for a state based on multiple data points.',
      tags: ['Decision Making', 'Data Analysis'],
      badge: 'GIS / Allocation',
      bgColor: '#fef3c7',
      iconColor: '#d97706',
      icon: MapPin
    }
  ];

  return (
    <div style={{ padding: '28px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>
          Mission Simulator
        </h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
          Practice real-world scenarios with simulated government challenges
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '28px', gap: '32px' }}>
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 0',
              fontSize: '14px',
              fontWeight: activeTab === tab ? '700' : '500',
              color: activeTab === tab ? '#2563eb' : '#64748b',
              borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Scenario Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '960px' }}>
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          return (
            <div
              key={scenario.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
                gap: '24px'
              }}
            >
              {/* Graphic / Image thumbnail on left */}
              <div style={{
                width: '110px',
                height: '88px',
                borderRadius: '12px',
                backgroundColor: scenario.bgColor,
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                gap: '6px'
              }}>
                <Icon size={32} color={scenario.iconColor} />
                <span style={{ fontSize: '10px', fontWeight: '700', color: scenario.iconColor, textTransform: 'uppercase' }}>
                  {scenario.badge}
                </span>
              </div>

              {/* Middle details */}
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: '0 0 6px 0', fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>
                  {scenario.title}
                </h2>
                <p style={{ margin: '0 0 14px 0', fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
                  {scenario.desc}
                </p>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {scenario.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        backgroundColor: '#eff6ff',
                        color: '#2563eb',
                        border: '1px solid #dbeafe',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <div>
                <button
                  onClick={() => alert(`Starting ${scenario.title} simulation...`)}
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 24px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                >
                  Start <ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
