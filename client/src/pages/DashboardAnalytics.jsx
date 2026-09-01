import React from 'react';
import { 
  Users, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Filter
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardAnalytics() {
  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'This Month',
        data: [25, 45, 60, 85],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Last Month',
        data: [15, 30, 40, 55],
        borderColor: '#94a3b8',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  };

  const skillsInDemand = [
    { name: 'Data Analysis', pct: 78 },
    { name: 'Statistical Methods', pct: 65 },
    { name: 'Data Visualization', pct: 62 },
    { name: 'Machine Learning', pct: 45 },
    { name: 'Survey Methods', pct: 40 },
  ];

  return (
    <div className="page-wrapper">
      {/* Header + Dropdown Filters */}
      <div className="flex-between">
        <div>
          <h1 className="page-title">Dashboard & Analytics</h1>
          <p className="page-subtitle">Insights and analytics for data-driven decisions</p>
        </div>

        <div className="flex-align-gap">
          <div className="form-group mb-0">
            <select className="form-select text-xs">
              <option>This Month</option>
              <option>Last Quarter</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="form-group mb-0">
            <select className="form-select text-xs">
              <option>All Departments</option>
              <option>National Accounts Division</option>
              <option>PLFS Division</option>
              <option>DIID Division</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="kpi-grid-4 mt-6">
        <div className="kpi-card-v2">
          <div className="kpi-icon-circle green">
            <Users size={20} />
          </div>
          <div className="kpi-data flex-col">
            <span className="kpi-sub-title">Total Learners</span>
            <div className="kpi-value-row">
              <span className="kpi-huge-val">2,243</span>
            </div>
            <span className="kpi-trend positive">↑ 15%</span>
          </div>
        </div>

        <div className="kpi-card-v2">
          <div className="kpi-icon-circle blue">
            <BookOpen size={20} />
          </div>
          <div className="kpi-data flex-col">
            <span className="kpi-sub-title">Courses Completed</span>
            <div className="kpi-value-row">
              <span className="kpi-huge-val">1,245</span>
            </div>
            <span className="kpi-trend positive">↑ 10%</span>
          </div>
        </div>

        <div className="kpi-card-v2">
          <div className="kpi-icon-circle indigo">
            <Clock size={20} />
          </div>
          <div className="kpi-data flex-col">
            <span className="kpi-sub-title">Avg. Learning Hours</span>
            <div className="kpi-value-row">
              <span className="kpi-huge-val">14.6</span>
            </div>
            <span className="kpi-trend positive">↑ 12%</span>
          </div>
        </div>

        <div className="kpi-card-v2">
          <div className="kpi-icon-circle gold">
            <CheckCircle size={20} />
          </div>
          <div className="kpi-data flex-col">
            <span className="kpi-sub-title">Assessments Passed</span>
            <div className="kpi-value-row">
              <span className="kpi-huge-val">85%</span>
            </div>
            <span className="kpi-trend positive">↑ 5%</span>
          </div>
        </div>
      </div>

      {/* 2 Charts Grid: Progress Over Time vs Top Skills in Demand */}
      <div className="grid-2 gap-6 mt-6">
        {/* Left Chart: Learning Progress Over Time */}
        <div className="card">
          <h3 className="section-title">Learning Progress Over Time</h3>
          <div className="chart-wrapper mt-4" style={{ height: '240px' }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Right Chart: Top Skills in Demand */}
        <div className="card">
          <h3 className="section-title">Top Skills in Demand</h3>
          <div className="skills-demand-list mt-4 flex-col gap-4">
            {skillsInDemand.map((sk, idx) => (
              <div key={idx} className="skill-demand-item">
                <div className="flex-between text-xs mb-1">
                  <span>{idx + 1}. {sk.name}</span>
                  <span className="font-bold">{sk.pct}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill blue" style={{ width: `${sk.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
