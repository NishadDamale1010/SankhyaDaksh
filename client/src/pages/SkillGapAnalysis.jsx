import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend as ChartLegend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { skillGapBreakdown } from '../data/mockData';
import { Target, TrendingUp, AlertCircle, ArrowUpRight } from 'lucide-react';

ChartJS.register(ArcElement, ChartTooltip, ChartLegend);

export default function SkillGapAnalysis() {
  const [activeTab, setActiveTab] = useState('Overview');

  const doughnutData = {
    labels: ['Expert', 'Proficient', 'Developing', 'Beginner'],
    datasets: [
      {
        data: [
          skillGapBreakdown.distribution.expert,
          skillGapBreakdown.distribution.proficient,
          skillGapBreakdown.distribution.developing,
          skillGapBreakdown.distribution.beginner,
        ],
        backgroundColor: ['#2563eb', '#059669', '#d97706', '#94a3b8'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const doughnutOptions = {
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="page-wrapper">
      {/* Title */}
      <div className="flex-between">
        <div>
          <h1 className="page-title">Skill Gap Analysis</h1>
          <p className="page-subtitle">AI-powered analysis of your competencies</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-nav-row mt-4">
        {['Overview', 'Competency Map', 'Detailed Report'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Grid: Overall Competency Score Donut vs Top Skill Gaps */}
      <div className="grid-2 gap-6 mt-6">
        {/* Left: Overall Competency Score Donut */}
        <div className="card">
          <h3 className="section-title">Overall Competency Score</h3>
          
          <div className="donut-chart-container mt-4">
            <div className="donut-wrapper" style={{ height: '180px', position: 'relative' }}>
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <div className="donut-center-text">
                <span className="donut-score">68%</span>
                <span className="donut-label">Proficient</span>
              </div>
            </div>

            {/* Distribution Legend */}
            <div className="grid-2 gap-2 mt-4 text-sm">
              <div className="flex-align-gap">
                <span className="dot-badge blue"></span>
                <span>Expert: <strong>20%</strong></span>
              </div>
              <div className="flex-align-gap">
                <span className="dot-badge green"></span>
                <span>Proficient: <strong>48%</strong></span>
              </div>
              <div className="flex-align-gap">
                <span className="dot-badge amber"></span>
                <span>Developing: <strong>22%</strong></span>
              </div>
              <div className="flex-align-gap">
                <span className="dot-badge gray"></span>
                <span>Beginner: <strong>10%</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Top Skill Gaps */}
        <div className="card">
          <div className="flex-between">
            <h3 className="section-title">Top Skill Gaps</h3>
            <button className="btn-link">View All Gaps</button>
          </div>

          <div className="gap-items-list mt-4 flex-col gap-4">
            {skillGapBreakdown.topGaps.map((gapItem, idx) => (
              <div key={idx} className="skill-gap-item">
                <div className="flex-between text-sm mb-1">
                  <span className="font-semibold">{gapItem.skill}</span>
                  <span className="gap-pill">Gap: <strong>{gapItem.gap}%</strong></span>
                </div>
                <div className="mini-meta-row text-xs text-muted mb-1 flex-between">
                  <span>Current: <strong>{gapItem.current}%</strong></span>
                  <span>Required: <strong>{gapItem.required}%</strong></span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill red" style={{ width: `${gapItem.gap}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Competency Areas */}
      <div className="card mt-6">
        <div className="flex-between">
          <h3 className="section-title">Competency Areas</h3>
          <button className="btn btn-secondary btn-sm">View Detailed Report</button>
        </div>

        <div className="grid-5 gap-4 mt-4">
          {skillGapBreakdown.competencyAreas.map((area, idx) => (
            <div key={idx} className="competency-area-box text-center p-4">
              <span className="competency-score-big">{area.score}%</span>
              <h5 className="competency-area-title mt-1">{area.name}</h5>
              <span className={`badge ${area.badgeClass} mt-2 inline-block`}>
                {area.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
