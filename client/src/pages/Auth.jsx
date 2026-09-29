import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Target, Award, BookOpen, Mail, HelpCircle } from 'lucide-react';

export default function Auth() {
  const [identifier, setIdentifier] = useState('rajesh.kumar@gov.in');
  const navigate = useNavigate();
  const { login } = useApp();

  const handleLogin = (e) => {
    e.preventDefault();
    login('officer');
    navigate('/dashboard');
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      width: '100vw',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: '#f1f5f9',
      backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '1100px',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.15)',
        border: '1px solid #e2e8f0'
      }}>
        {/* LEFT PANEL - GOVERNMENT BRANDING */}
        <div style={{
          width: '52%',
          background: 'linear-gradient(145deg, #091528 0%, #0f2444 100%)',
          padding: '48px 44px',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle architectural dome glow in background */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '260px',
            height: '260px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          {/* Top Branding Cards */}
          <div>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '36px' }}>
              {/* Emblem Box */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '6px 12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ fontSize: '18px' }}>🏛️</div>
                <div style={{ color: '#0f172a', fontSize: '10px', lineHeight: '1.2', fontWeight: '700' }}>
                  Government of India<br />
                  <span style={{ fontWeight: '500', color: '#475569' }}>Ministry of Statistics & PI</span>
                </div>
              </div>

              {/* NSSTA Box */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '6px 14px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ fontSize: '16px' }}>🇮🇳</div>
                <div style={{ color: '#1e3a8a', fontSize: '12px', fontWeight: '800', letterSpacing: '0.5px' }}>
                  NSSTA
                </div>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h1 style={{
              fontSize: '34px',
              fontWeight: '800',
              margin: '0 0 8px 0',
              color: '#ffffff',
              letterSpacing: '-0.5px'
            }}>
              Sankhya-Daksh
            </h1>
            <p style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#60a5fa',
              margin: '0 0 12px 0'
            }}>
              AI Enabled Competency Intelligence Platform
            </p>
            <p style={{
              fontSize: '13px',
              color: '#94a3b8',
              margin: '0 0 36px 0',
              lineHeight: '1.5'
            }}>
              Personalized learning for a data-driven, future-ready civil service
            </p>

            {/* Feature Bullets with Round Blue Icon Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {[
                { icon: ShieldCheck, text: 'Secure login with Jan-Parichay (SSO)' },
                { icon: Target, text: 'Access personalized learning paths' },
                { icon: Award, text: 'Aligned with FRAC Competency Framework' },
                { icon: BookOpen, text: 'Integrated with iGOT Karmayogi' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    border: '1px solid rgba(96, 165, 250, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#60a5fa',
                    flexShrink: 0
                  }}>
                    <item.icon size={18} />
                  </div>
                  <span style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div style={{
            marginTop: '40px',
            fontSize: '11px',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>🔒 NIC / MeitY Security Verified</span>
            <span>•</span>
            <span>SIH 2026 Production Edition</span>
          </div>
        </div>

        {/* RIGHT PANEL - JAN PARICHAY SSO CARD */}
        <div style={{
          width: '48%',
          padding: '48px 44px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '380px', margin: '0 auto', width: '100%' }}>
            
            {/* Jan-Parichay Logo Branding */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '4px'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f97316 0%, #2563eb 50%, #16a34a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  ✦
                </div>
                <div style={{
                  fontSize: '26px',
                  fontWeight: '900',
                  color: '#1e3a8a',
                  letterSpacing: '0.5px'
                }}>
                  जन-परिचय
                </div>
              </div>
              <div style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#64748b',
                letterSpacing: '2px'
              }}>
                JAN-PARICHAY
              </div>
            </div>

            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#0f172a',
              margin: '0 0 20px 0',
              textAlign: 'center'
            }}>
              Sign in to continue
            </h2>

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#475569',
                  marginBottom: '6px'
                }}>
                  Enter your registered mobile number / email
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. rajesh.kumar@gov.in or 9876543210"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    outline: 'none',
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>

              {/* Blue Continue Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '13px 0',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                  transition: 'background-color 0.2s, transform 0.1s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
              >
                Continue
              </button>
            </form>

            {/* Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '24px 0 16px 0',
              color: '#94a3b8',
              fontSize: '12px'
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
              <span style={{ padding: '0 12px' }}>Other login options</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
            </div>

            {/* NIC / Government Email Option Button */}
            <button
              type="button"
              onClick={handleLogin}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '10px 0',
                fontSize: '13px',
                fontWeight: '600',
                color: '#334155',
                cursor: 'pointer',
                marginBottom: '20px'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              <Mail size={16} color="#2563eb" />
              NIC / Government Email
            </button>

            {/* Need Help link */}
            <div style={{ textAlign: 'center' }}>
              <a
                href="#help"
                onClick={(e) => { e.preventDefault(); alert('Demo Support: Officer credentials rajesh.kumar@gov.in'); }}
                style={{
                  color: '#2563eb',
                  fontSize: '13px',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}
              >
                Need help?
              </a>
            </div>

            {/* Subtle Indian Monument Skyline silhouette */}
            <div style={{
              marginTop: '32px',
              paddingTop: '16px',
              borderTop: '1px dashed #e2e8f0',
              textAlign: 'center',
              color: '#cbd5e1',
              fontSize: '11px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>🏛️</span>
              <span>National Single Sign-On for Civil Services</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
