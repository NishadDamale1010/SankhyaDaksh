import React from 'react';
import { Clock } from 'lucide-react';

const AssessmentPage = () => {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '24px' }}>
        
        {/* Main Content */}
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>Assessment</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '18px', fontWeight: '500' }}>
                <Clock size={20} />
                00:24:36
              </div>
              <button style={{ 
                backgroundColor: '#2563eb', color: 'white', 
                border: 'none', borderRadius: '6px', 
                padding: '8px 24px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' 
              }}>
                Submit
              </button>
            </div>
          </div>

          {/* Progress */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px', fontWeight: '500' }}>
              Assessment Progress (3/10 questions answered)
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                let bgColor = '#f1f5f9'; // gray
                let textColor = '#64748b';
                let borderColor = '#e2e8f0';

                if (num < 3) {
                  bgColor = '#22c55e'; // green completed
                  textColor = 'white';
                  borderColor = '#22c55e';
                } else if (num === 3) {
                  bgColor = '#3b82f6'; // blue current
                  textColor = 'white';
                  borderColor = '#3b82f6';
                }

                return (
                  <div key={num} style={{
                    width: '32px', height: '32px', 
                    borderRadius: '50%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: bgColor,
                    color: textColor,
                    border: `1px solid ${borderColor}`,
                    fontSize: '14px', fontWeight: '500'
                  }}>
                    {num}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Area */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#3b82f6', marginBottom: '12px' }}>
              Question 3 of 10
            </div>
            <div style={{ fontSize: '18px', color: '#1e293b', fontWeight: '500', marginBottom: '24px' }}>
              Which of the following statistical measures is most appropriate to identify outliers in a dataset?
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Option A */}
              <label style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', 
                padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', 
                cursor: 'pointer' 
              }}>
                <input type="radio" name="q3" style={{ width: '18px', height: '18px' }} />
                <span style={{ fontSize: '16px', color: '#334155' }}>A. Mean</span>
              </label>

              {/* Option B */}
              <label style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', 
                padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', 
                cursor: 'pointer' 
              }}>
                <input type="radio" name="q3" style={{ width: '18px', height: '18px' }} />
                <span style={{ fontSize: '16px', color: '#334155' }}>B. Median</span>
              </label>

              {/* Option C */}
              <label style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', 
                padding: '16px', border: '1px solid #3b82f6', backgroundColor: '#eff6ff', borderRadius: '8px', 
                cursor: 'pointer' 
              }}>
                <input type="radio" name="q3" checked readOnly style={{ width: '18px', height: '18px', accentColor: '#2563eb' }} />
                <span style={{ fontSize: '16px', color: '#1e3a8a', fontWeight: '500' }}>C. Interquartile Range (IQR)</span>
              </label>

              {/* Option D */}
              <label style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', 
                padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', 
                cursor: 'pointer' 
              }}>
                <input type="radio" name="q3" style={{ width: '18px', height: '18px' }} />
                <span style={{ fontSize: '16px', color: '#334155' }}>D. Standard Deviation</span>
              </label>
            </div>
          </div>

          {/* Footer Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
            <button style={{ 
              backgroundColor: 'white', color: '#334155', 
              border: '1px solid #cbd5e1', borderRadius: '6px', 
              padding: '10px 24px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' 
            }}>
              Previous
            </button>
            <button style={{ 
              backgroundColor: '#2563eb', color: 'white', 
              border: 'none', borderRadius: '6px', 
              padding: '10px 24px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' 
            }}>
              Next
            </button>
          </div>
        </div>

        {/* Sidebar Legend */}
        <div style={{ width: '280px', backgroundColor: 'white', borderRadius: '8px', padding: '24px', height: 'fit-content', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#1e293b' }}>Legend</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#475569' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
              <span>Current</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
              <span>Answered</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e2e8f0' }}></div>
              <span>Not Answered</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AssessmentPage;
