import React from 'react';
import { useApp } from '../context/AppContext';
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
  CheckCircle, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Eye, 
  ChevronRight,
  Target,
  FileText
} from 'lucide-react';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useApp();

  if (user?.role === 'admin') {
    return (
      <div style={{ padding: '32px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>
          Admin Dashboard
        </h1>
        <p style={{ color: '#64748b' }}>Welcome to the admin view.</p>
      </div>
    );
  }

  const radarData = {
    labels: [
      'Data Management', 
      'Statistical Analysis', 
      'Policy Analysis', 
      'Digital Governance', 
      'Communication', 
      'Leadership'
    ],
    datasets: [
      {
        label: 'Current',
        data: [70, 60, 55, 75, 85, 65],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 1)',
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
      },
      {
        label: 'Target',
        data: [85, 80, 80, 90, 90, 85],
        backgroundColor: 'transparent',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderDash: [5, 5],
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      }
    ]
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div style={{ 
      padding: '32px', 
      fontFamily: 'sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      {/* HEADER SECTION */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#0f172a',
          margin: '0 0 8px 0'
        }}>
          Welcome back, {user?.name || 'Rajesh Kumar'}
        </h1>
        <p style={{ 
          fontSize: '14px', 
          color: '#64748b',
          margin: '0 0 16px 0'
        }}>
          Continue your learning journey towards a data-driven governance
        </p>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            backgroundColor: '#dcfce7',
            color: '#166534',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            <CheckCircle size={14} />
            <span>FRAC Competencies iGOT achieved</span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            border: '1px solid #bfdbfe',
            color: '#1e40af',
            backgroundColor: '#eff6ff',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            <span>iGOT Courses: 8 in progress</span>
          </div>
        </div>
      </div>

      {/* KPI ROW */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* KPI 1 */}
        <div style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#eff6ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: '#3b82f6'
          }}>
            <Target size={20} />
          </div>
          <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>
            Overall Competency Score
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>68</span>
            <span style={{ fontSize: '16px', color: '#94a3b8' }}>/100</span>
          </div>
          <div style={{ color: '#16a34a', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} />
            +12% from last assessment
          </div>
        </div>

        {/* KPI 2 */}
        <div style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#fef3c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: '#d97706'
          }}>
            <BookOpen size={20} />
          </div>
          <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>
            Active Learning Path
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>3</span>
          </div>
          <div style={{ color: '#64748b', fontSize: '12px' }}>
            In progress
          </div>
        </div>

        {/* KPI 3 */}
        <div style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#dcfce7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: '#16a34a'
          }}>
            <Award size={20} />
          </div>
          <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>
            Completed Trainings
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>8</span>
          </div>
          <div style={{ color: '#64748b', fontSize: '12px' }}>
            This year
          </div>
        </div>

        {/* KPI 4 */}
        <div style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#f3e8ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: '#9333ea'
          }}>
            <FileText size={20} />
          </div>
          <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>
            Assessments Taken
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>6</span>
          </div>
          <div style={{ color: '#64748b', fontSize: '12px' }}>
            Average 68%
          </div>
        </div>
      </div>

      {/* MAIN 2-COLUMN GRID */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '60% 1fr', 
        gap: '24px'
      }}>
        
        {/* LEFT COLUMN: Competency Radar */}
        <div style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px'
          }}>
            <div style={{ color: '#3b82f6' }}>
              <Eye size={24} />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
              Your Competency Radar
            </h2>
          </div>
          
          <div style={{ flex: 1, minHeight: '350px', position: 'relative' }}>
            <Radar data={radarData} options={radarOptions} />
          </div>

          <div style={{ marginTop: '16px', textAlign: 'right' }}>
            <a href="#" style={{ 
              color: '#3b82f6', 
              fontSize: '14px', 
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              View All
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Recommended for You */}
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ChevronRight size={20} color="#3b82f6" />
              Recommended for You
            </h2>
            <a href="#" style={{ 
              color: '#3b82f6', 
              fontSize: '14px', 
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              View All
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Card 1 */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '16px',
              borderLeft: '3px solid #3b82f6',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: '#f1f5f9', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b'
                }}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <div style={{ color: '#0f172a', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
                    Advanced Data Analytics for Policy Making
                  </div>
                  <div style={{ color: '#64748b', fontSize: '12px' }}>
                    iGOT · 12 hours
                  </div>
                </div>
              </div>
              <ChevronRight size={20} color="#cbd5e1" />
            </div>

            {/* Card 2 */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '16px',
              borderLeft: '3px solid #3b82f6',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: '#f1f5f9', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b'
                }}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <div style={{ color: '#0f172a', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
                    Evidence Based Decision Making
                  </div>
                  <div style={{ color: '#64748b', fontSize: '12px' }}>
                    iGOT · 8 hours
                  </div>
                </div>
              </div>
              <ChevronRight size={20} color="#cbd5e1" />
            </div>

            {/* Card 3 */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '16px',
              borderLeft: '3px solid #3b82f6',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: '#f1f5f9', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b'
                }}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <div style={{ color: '#0f172a', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
                    Statistical Methods for Governance
                  </div>
                  <div style={{ color: '#64748b', fontSize: '12px' }}>
                    iGOT · 10 hours
                  </div>
                </div>
              </div>
              <ChevronRight size={20} color="#cbd5e1" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
