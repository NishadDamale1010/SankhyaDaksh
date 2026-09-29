import React, { useState } from 'react';
import { Send } from 'lucide-react';

const AIAssistantPage = () => {
  const [inputText, setInputText] = useState('');

  return (
    <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>Sankhya AI Assistant</h1>
          <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '14px' }}>Your personalized learning and governance advisor</p>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* User Message */}
          <div style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
            <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '16px', borderRadius: '16px 16px 0 16px', fontSize: '15px', lineHeight: '1.5' }}>
              What are my competency gaps?
            </div>
          </div>

          {/* AI Message */}
          <div style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
            <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', color: '#334155', padding: '20px', borderRadius: '16px 16px 16px 0', fontSize: '15px', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 16px 0' }}>Based on your recent assessment and FRAC framework, your key competency gaps are:</p>
              <ol style={{ margin: '0 0 20px 0', paddingLeft: '24px' }}>
                <li style={{ marginBottom: '8px' }}>Statistical Analysis (30 points)</li>
                <li style={{ marginBottom: '8px' }}>Policy Analysis (28 points)</li>
                <li style={{ marginBottom: '8px' }}>Leadership (25 points)</li>
              </ol>
              
              <p style={{ margin: '0 0 16px 0' }}>I recommend focusing on these courses:</p>
              <ol style={{ margin: 0, paddingLeft: '24px' }}>
                <li style={{ marginBottom: '8px' }}>Advanced Statistical Methods (11 hours)</li>
                <li style={{ marginBottom: '8px' }}>Evidence Based Decision Making (8 hours)</li>
                <li style={{ marginBottom: '0' }}>Leadership in Data Governance (10 hours)</li>
              </ol>
            </div>
          </div>

        </div>

        {/* Input Area */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid #e2e8f0', backgroundColor: 'white' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your question here..." 
              style={{ 
                flex: 1, padding: '14px 16px', 
                border: '1px solid #cbd5e1', borderRadius: '8px', 
                fontSize: '15px', outline: 'none',
                backgroundColor: '#f8fafc'
              }} 
            />
            <button style={{ 
              backgroundColor: '#2563eb', color: 'white', 
              border: 'none', borderRadius: '8px', 
              padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer' 
            }}>
              <Send size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIAssistantPage;
