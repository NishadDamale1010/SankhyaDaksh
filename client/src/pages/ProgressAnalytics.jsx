import React from 'react';
import { ChevronDown, Book, Clock, CheckCircle, Target, Award, Trophy, Star } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ProgressAnalytics() {
  const chartData = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Competency Score',
        data: [45, 55, 60, 68, 75, 82],
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: 'Target Score',
        data: [70, 70, 75, 75, 80, 85],
        borderColor: '#9ca3af',
        backgroundColor: '#9ca3af',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        }
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: {
          color: '#f3f4f6',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>My Progress</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Track your learning journey and competency development</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '6px', padding: '8px 12px', cursor: 'pointer' }}>
          <span style={{ fontSize: '14px', color: '#374151', marginRight: '8px' }}>Last 6 Months</span>
          <ChevronDown size={16} color="#6b7280" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#eff6ff', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '12px' }}>
              <Book size={20} color="#3b82f6" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#4b5563' }}>Courses Completed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>8</span>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#10b981' }}>+3 this month</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#f3e8ff', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '12px' }}>
              <Clock size={20} color="#a855f7" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#4b5563' }}>Learning Hours</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>42</span>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#10b981' }}>+12 this month</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#dcfce7', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '12px' }}>
              <CheckCircle size={20} color="#22c55e" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#4b5563' }}>Assessments Passed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>6</span>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#6b7280' }}>85% average score</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#ffedd5', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '12px' }}>
              <Target size={20} color="#f97316" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#4b5563' }}>Target Score</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>85</span>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#6b7280' }}>/100 points</span>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '32px' }}>
        <h2 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>Competency Growth</h2>
        <div style={{ height: '300px', width: '100%' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>Achievements</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '24px', backgroundColor: '#fef3c7', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '16px', flexShrink: 0 }}>
              <Award size={24} color="#d97706" />
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 'bold', color: '#111827' }}>Data Analytics Expert</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', lineHeight: '1.4' }}>Completed 5 courses in Data Analytics</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '24px', backgroundColor: '#eff6ff', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '16px', flexShrink: 0 }}>
              <Trophy size={24} color="#2563eb" />
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 'bold', color: '#111827' }}>Assessment Champion</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', lineHeight: '1.4' }}>Scored 90%+ in 3 assessments</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '24px', backgroundColor: '#dcfce7', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '16px', flexShrink: 0 }}>
              <Star size={24} color="#16a34a" />
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 'bold', color: '#111827' }}>Consistent Learner</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', lineHeight: '1.4' }}>30 learning hours this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
