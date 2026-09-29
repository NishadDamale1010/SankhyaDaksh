import React, { useState } from 'react';
import { Search, Book, Database, FileText, BarChart, Download } from 'lucide-react';

export default function ResourcesLibrary() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Syllabuses', 'Case Studies', 'Research', 'Videos'];

  const resources = [
    {
      id: 1,
      title: 'FRAC Competency Framework',
      description: 'Official competency framework by NSSTA',
      icon: <Book size={24} color="#3b82f6" />,
      iconBg: '#eff6ff',
      info: 'PDF · 2.4 MB'
    },
    {
      id: 2,
      title: 'Government Data Standards',
      description: 'Data management best practices and standards guidelines',
      icon: <Database size={24} color="#10b981" />,
      iconBg: '#ecfdf5',
      info: 'PDF · 1.8 MB'
    },
    {
      id: 3,
      title: 'Sample Datasets',
      description: 'Practice dataset for analysis',
      icon: <FileText size={24} color="#8b5cf6" />,
      iconBg: '#f5f3ff',
      info: 'XLSX · 5.2 MB'
    },
    {
      id: 4,
      title: 'Policy Analysis Case Study',
      description: 'Policy analysis series',
      icon: <BarChart size={24} color="#f97316" />,
      iconBg: '#fff7ed',
      info: 'PDF · 3.1 MB'
    }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1f2937' }}>
        Resources
      </h1>

      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <Search size={20} color="#9ca3af" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          type="text" 
          placeholder="Search resources..." 
          style={{ 
            width: '100%', 
            padding: '12px 16px 12px 48px', 
            borderRadius: '8px', 
            border: '1px solid #e5e7eb',
            fontSize: '16px',
            outline: 'none',
            boxSizing: 'border-box'
          }} 
        />
      </div>

      <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #e5e7eb', marginBottom: '24px', overflowX: 'auto' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 0',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid #3b82f6' : '2px solid transparent',
              color: activeTab === tab ? '#3b82f6' : '#6b7280',
              fontWeight: activeTab === tab ? '600' : '400',
              fontSize: '16px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {resources.map(resource => (
          <div 
            key={resource.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ 
                backgroundColor: resource.iconBg, 
                padding: '12px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: '16px'
              }}>
                {resource.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px', marginTop: '0' }}>
                  {resource.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
                  {resource.description}
                </p>
              </div>
            </div>
            
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>
                {resource.info}
              </span>
              <button 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  backgroundColor: '#eff6ff', 
                  color: '#3b82f6', 
                  border: 'none', 
                  padding: '8px 16px', 
                  borderRadius: '6px', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
