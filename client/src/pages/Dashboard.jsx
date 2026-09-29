import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import {
  TrendingUp,
  AlertTriangle,
  Flame,
  BarChart2,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  PlayCircle,
  FileText,
  ClipboardList,
  MessageSquare,
  Send,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function Dashboard() {
  const { user } = useApp();
  const navigate = useNavigate();
  const [aiQuestion, setAiQuestion] = useState('');

  const radarData = {
    labels: [
      'Policy & Governance',
      'Data & Digital Literacy',
      'Program Management',
      'Public Communication',
      'Ethics & Integrity',
      'Citizen Centricity'
    ],
    datasets: [
      {
        label: 'Your Score',
        data: [78, 80, 68, 82, 85, 72],
        backgroundColor: 'rgba(59, 130, 246, 0.25)',
        borderColor: '#2563eb',
        borderWidth: 2,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#2563eb',
        pointRadius: 4,
      },
      {
        label: 'Target (FRAC)',
        data: [85, 88, 82, 85, 90, 85],
        backgroundColor: 'transparent',
        borderColor: '#cbd5e1',
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointBackgroundColor: '#94a3b8',
        pointBorderColor: '#ffffff',
        pointRadius: 3,
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: '#e2e8f0',
          lineWidth: 1
        },
        grid: {
          color: '#e2e8f0',
          circular: false
        },
        ticks: {
          display: false,
          stepSize: 20
        },
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          font: {
            family: "'Inter', sans-serif",
            size: 11,
            weight: '600'
          },
          color: '#334155'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 10,
        cornerRadius: 8
      }
    }
  };

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    navigate('/ai-assistant', { state: { query: aiQuestion } });
  };

  return (
    <div style={{
      padding: '24px 32px 48px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      boxSizing: 'border-box'
    }}>
      {/* 1. HERO BANNER */}
      <div style={{
        background: 'linear-gradient(100deg, #dbeafe 0%, #e0f2fe 45%, #fef3c7 100%)',
        borderRadius: '18px',
        padding: '28px 36px',
        marginBottom: '24px',
        border: '1px solid #bfdbfe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(59, 130, 246, 0.08)'
      }}>
        {/* Left Welcome Copy */}
        <div style={{ zIndex: 2, maxWidth: '60%' }}>
          <div style={{
            fontSize: '12px',
            fontWeight: '800',
            letterSpacing: '1.5px',
            color: '#1d4ed8',
            marginBottom: '6px',
            textTransform: 'uppercase'
          }}>
            Sankhya Daksh
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '900',
            color: '#0f172a',
            margin: '0 0 6px 0',
            letterSpacing: '-0.5px'
          }}>
            Welcome back, {user?.name?.split(' ')[0] || 'Amit'}!
          </h1>
          <p style={{
            fontSize: '15px',
            color: '#334155',
            margin: 0,
            fontWeight: '500'
          }}>
            Every competency you build strengthens a better India.
          </p>
        </div>

        {/* Right Dome Artwork & Quote Overlay */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          zIndex: 2
        }}>
          {/* Subtle monument silhouette SVG */}
          <div style={{
            width: '160px',
            height: '100px',
            opacity: 0.85,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg viewBox="0 0 200 120" width="160" height="96" fill="none">
              <path d="M100 15 C85 30 75 55 75 95 L125 95 C125 55 115 30 100 15 Z" fill="#b45309" opacity="0.6"/>
              <path d="M97 5 L103 5 L103 15 L97 15 Z" fill="#92400e"/>
              <circle cx="100" cy="5" r="3" fill="#d97706"/>
              <rect x="60" y="80" width="80" height="25" rx="3" fill="#d97706" opacity="0.7"/>
              <rect x="40" y="95" width="120" height="15" rx="2" fill="#b45309" opacity="0.8"/>
              <circle cx="100" cy="50" r="10" fill="#fef3c7" opacity="0.8"/>
              <rect x="70" y="85" width="6" height="15" fill="#fef3c7"/>
              <rect x="85" y="85" width="6" height="15" fill="#fef3c7"/>
              <rect x="109" y="85" width="6" height="15" fill="#fef3c7"/>
              <rect x="124" y="85" width="6" height="15" fill="#fef3c7"/>
            </svg>
          </div>

          {/* Quote Block */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            padding: '12px 18px',
            borderRadius: '12px',
            textAlign: 'right',
            maxWidth: '220px'
          }}>
            <div style={{
              fontSize: '13px',
              fontStyle: 'italic',
              fontWeight: '700',
              color: '#0f172a',
              lineHeight: '1.4'
            }}>
              "Empowered officers build a stronger India."
            </div>
            <div style={{
              fontSize: '11px',
              color: '#475569',
              marginTop: '4px',
              fontWeight: '600'
            }}>
              — Karmayogi Bharat
            </div>
          </div>
        </div>
      </div>

      {/* 2. KPI 4 CARDS ROW */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {/* KPI 1: Overall Competency Score */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#475569',
            marginBottom: '14px'
          }}>
            Overall Competency Score
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Donut Score Ring */}
            <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0 }}>
              <svg width="64" height="64" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3.5"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#0d9488"
                  strokeWidth="3.8"
                  strokeDasharray="72, 100"
                  strokeLinecap="round"
                />
              </svg>
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px',
                fontWeight: '800',
                color: '#0f172a'
              }}>
                72%
              </div>
            </div>

            {/* Score Meta */}
            <div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#2563eb', lineHeight: 1.2 }}>
                Proficient
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#16a34a', marginTop: '3px' }}>
                ↑ 8%
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                vs last assessment
              </div>
            </div>
          </div>

          {/* Top Right Mini Icon Badge */}
          <div style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: '#ccfbf1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0d9488'
          }}>
            <BarChart2 size={16} />
          </div>
        </div>

        {/* KPI 2: Strength Areas */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#475569',
            marginBottom: '10px'
          }}>
            Strength Areas
          </div>
          <div style={{
            fontSize: '36px',
            fontWeight: '900',
            color: '#0f172a',
            lineHeight: 1
          }}>
            5
          </div>
          <div style={{
            fontSize: '12px',
            color: '#64748b',
            marginTop: '8px',
            fontWeight: '500'
          }}>
            Keep it up!
          </div>

          <div style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#dcfce7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#16a34a'
          }}>
            <TrendingUp size={16} />
          </div>
        </div>

        {/* KPI 3: Priority Gaps */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#475569',
            marginBottom: '10px'
          }}>
            Priority Gaps
          </div>
          <div style={{
            fontSize: '36px',
            fontWeight: '900',
            color: '#0f172a',
            lineHeight: 1
          }}>
            3
          </div>
          <div style={{
            fontSize: '12px',
            color: '#64748b',
            marginTop: '8px',
            fontWeight: '500'
          }}>
            Needs attention
          </div>

          <div style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ef4444'
          }}>
            <AlertTriangle size={16} />
          </div>
        </div>

        {/* KPI 4: Learning Streak */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#475569',
            marginBottom: '10px'
          }}>
            Learning Streak
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: '900',
            color: '#0f172a',
            lineHeight: 1
          }}>
            12 days
          </div>
          <div style={{
            fontSize: '12px',
            color: '#64748b',
            marginTop: '8px',
            fontWeight: '500'
          }}>
            Consistent learner!
          </div>

          <div style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#ffedd5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f97316'
          }}>
            <Flame size={18} />
          </div>
        </div>
      </div>

      {/* 3. MIDDLE ROW (3 COLUMNS) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.05fr 1fr',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {/* COL 1: Competency Radar */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '22px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              Your Competency Radar
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: '#64748b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb' }} />
                <span>Your Score</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
                <span>Target (FRAC)</span>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: '270px', position: 'relative' }}>
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>

        {/* COL 2: Top Recommendations for You */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '22px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              Top Recommendations for You
            </h2>
            <button
              onClick={() => navigate('/learning')}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                padding: 0
              }}
            >
              View All →
            </button>
          </div>

          {/* 3 Course Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {/* Card 1 */}
            <div
              onClick={() => navigate('/course-content')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #f1f5f9',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: '#fef3c7',
                border: '1px solid #fde68a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0
              }}>
                ⚖️
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Evidence-Based Policy Making
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#2563eb', backgroundColor: '#eff6ff', padding: '1px 6px', borderRadius: '4px' }}>Course</span>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#6366f1', backgroundColor: '#e0e7ff', padding: '1px 6px', borderRadius: '4px' }}>iGOT</span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>2.5 hours • Beginner</span>
                </div>
              </div>
              <ChevronRight size={16} color="#94a3b8" />
            </div>

            {/* Card 2 */}
            <div
              onClick={() => navigate('/course-content')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #f1f5f9',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: '#e0f2fe',
                border: '1px solid #bae6fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0
              }}>
                📊
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Using Official Statistics for Decision Making
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '1px 6px', borderRadius: '4px' }}>Module</span>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#3730a3', backgroundColor: '#e0e7ff', padding: '1px 6px', borderRadius: '4px' }}>MoSPI</span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>3 hours • Intermediate</span>
                </div>
              </div>
              <ChevronRight size={16} color="#94a3b8" />
            </div>

            {/* Card 3 */}
            <div
              onClick={() => navigate('/course-content')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #f1f5f9',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: '#fae8ff',
                border: '1px solid #f5d0fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0
              }}>
                👥
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Stakeholder Management in Public Programs
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#2563eb', backgroundColor: '#eff6ff', padding: '1px 6px', borderRadius: '4px' }}>Course</span>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#6366f1', backgroundColor: '#e0e7ff', padding: '1px 6px', borderRadius: '4px' }}>iGOT</span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>2 hours • Beginner</span>
                </div>
              </div>
              <ChevronRight size={16} color="#94a3b8" />
            </div>
          </div>
        </div>

        {/* COL 3: Mission Simulator */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '22px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}>
            <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              Mission Simulator
            </h2>
            <button
              onClick={() => navigate('/mission-simulator')}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                padding: 0
              }}
            >
              Try Now →
            </button>
          </div>

          {/* Scenario Graphic Card */}
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#0f172a',
            position: 'relative',
            marginBottom: '16px'
          }}>
            {/* Visual simulation image backdrop */}
            <div style={{
              height: '110px',
              background: 'linear-gradient(180deg, rgba(30,58,138,0.7) 0%, rgba(15,23,42,0.95) 100%), radial-gradient(circle at 80% 20%, #f97316 0%, transparent 40%)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: '12px 14px',
              color: 'white'
            }}>
              <span style={{ fontSize: '26px' }}>🚁 🚤</span>
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                backgroundColor: 'rgba(239, 68, 68, 0.85)',
                color: '#ffffff',
                padding: '2px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                NDRF Active
              </span>
            </div>

            {/* Overlaid title & desc */}
            <div style={{
              padding: '10px 14px',
              backgroundColor: '#0f172a',
              color: 'white'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>
                Disaster Response Planning
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.4' }}>
                Real-world scenario based on past district data. Make decisions, see the impact, and learn.
              </div>
            </div>
          </div>

          {/* Last Simulation Result */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
              Last Simulation Result
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '3px solid #16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '800',
                  color: '#16a34a'
                }}>
                  78%
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                  Good decision-making!
                </span>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: '6px' }}>
              <button
                onClick={() => navigate('/mission-simulator')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563eb',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                View Detailed Feedback →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM ROW (3 COLUMNS) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '20px'
      }}>
        {/* COL 1: Recent Learning Activity */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '22px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              Recent Learning Activity
            </h2>
            <button
              onClick={() => navigate('/progress')}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                padding: 0
              }}
            >
              View All →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Act 1 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#16a34a" />
                <span style={{ color: '#0f172a', fontWeight: '500' }}>Completed: Introduction to Data Governance</span>
              </div>
              <span style={{ color: '#94a3b8', fontSize: '11px', whiteSpace: 'nowrap' }}>2 days ago</span>
            </div>

            {/* Act 2 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <PlayCircle size={16} color="#2563eb" />
                <span style={{ color: '#0f172a', fontWeight: '500' }}>Attempted quiz: Public Procurement Rules</span>
              </div>
              <span style={{ color: '#94a3b8', fontSize: '11px', whiteSpace: 'nowrap' }}>3 days ago</span>
            </div>

            {/* Act 3 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={16} color="#8b5cf6" />
                <span style={{ color: '#0f172a', fontWeight: '500' }}>Read: FRAC Competency Framework Guide</span>
              </div>
              <span style={{ color: '#94a3b8', fontSize: '11px', whiteSpace: 'nowrap' }}>4 days ago</span>
            </div>

            {/* Act 4 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#16a34a" />
                <span style={{ color: '#0f172a', fontWeight: '500' }}>Completed: Citizen Engagement Strategies</span>
              </div>
              <span style={{ color: '#94a3b8', fontSize: '11px', whiteSpace: 'nowrap' }}>6 days ago</span>
            </div>
          </div>
        </div>

        {/* COL 2: Upcoming Quizzes */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '22px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              Upcoming Quizzes
            </h2>
            <button
              onClick={() => navigate('/assessments')}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                padding: 0
              }}
            >
              View All →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Quiz 1 */}
            <div
              onClick={() => navigate('/assessments')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ClipboardList size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                    Data Interpretation & Analysis
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    20 questions • 30 mins
                  </div>
                </div>
              </div>
              <ChevronRight size={16} color="#94a3b8" />
            </div>

            {/* Quiz 2 */}
            <div
              onClick={() => navigate('/assessments')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: '#f3e8ff',
                  color: '#9333ea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ClipboardList size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                    Scheme Implementation Guidelines
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    15 questions • 20 mins
                  </div>
                </div>
              </div>
              <ChevronRight size={16} color="#94a3b8" />
            </div>
          </div>
        </div>

        {/* COL 3: Ask Sankhya (AI Assistant) */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '22px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageSquare size={16} />
              </div>
              <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                Ask Sankhya (AI Assistant)
              </h2>
            </div>

            <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
              How can I help you today?
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4', marginBottom: '14px' }}>
              Ask me about courses, competencies, policies, or get a summary of any document.
            </div>

            {/* Input with Send Button */}
            <form onSubmit={handleAiSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Type your question..."
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px',
                  outline: 'none',
                  backgroundColor: '#ffffff'
                }}
              />
              <button
                type="submit"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#0f172a',
                  color: 'white',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Send size={15} />
              </button>
            </form>
          </div>

          {/* Quick Suggestion Pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['Summarize a document', 'Suggest learning path', 'Explain a policy'].map((pill, pIdx) => (
              <button
                key={pIdx}
                onClick={() => navigate('/ai-assistant', { state: { query: pill } })}
                style={{
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '10px',
                  fontWeight: '600',
                  color: '#475569',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
