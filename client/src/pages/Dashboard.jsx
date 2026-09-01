import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  Award, 
  Clock, 
  FileText, 
  Ribbon, 
  CheckCircle, 
  ArrowRight, 
  Star, 
  PlayCircle,
  Sparkles
} from 'lucide-react';
import { officerProfile } from '../data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      {/* Header Banner */}
      <div className="dashboard-header-banner flex-between">
        <div>
          <h1 className="header-greeting">Welcome back, Ananya! 👋</h1>
          <p className="header-subtext">Let's continue your learning journey</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/skill-gap')}>
          View My Learning Path
        </button>
      </div>

      {/* 5 KPI Stat Cards Row */}
      <div className="kpi-grid-5">
        <div className="kpi-card-v2">
          <div className="kpi-icon-circle blue">
            <Target size={20} />
          </div>
          <div className="kpi-data flex-col">
            <span className="kpi-sub-title">Overall Progress</span>
            <div className="kpi-value-row">
              <span className="kpi-huge-val">68%</span>
            </div>
            <span className="kpi-trend positive">↑ 12% this month</span>
          </div>
        </div>

        <div className="kpi-card-v2">
          <div className="kpi-icon-circle green">
            <Award size={20} />
          </div>
          <div className="kpi-data flex-col">
            <span className="kpi-sub-title">Skills Mastered</span>
            <div className="kpi-value-row">
              <span className="kpi-huge-val">24</span>
              <span className="kpi-denom">of 45 skills</span>
            </div>
          </div>
        </div>

        <div className="kpi-card-v2">
          <div className="kpi-icon-circle indigo">
            <Clock size={20} />
          </div>
          <div className="kpi-data flex-col">
            <span className="kpi-sub-title">Learning Hours</span>
            <div className="kpi-value-row">
              <span className="kpi-huge-val">48.5</span>
            </div>
            <span className="kpi-denom">Hours this month</span>
          </div>
        </div>

        <div className="kpi-card-v2">
          <div className="kpi-icon-circle amber">
            <FileText size={20} />
          </div>
          <div className="kpi-data flex-col">
            <span className="kpi-sub-title">Assessments</span>
            <div className="kpi-value-row">
              <span className="kpi-huge-val">7</span>
            </div>
            <span className="kpi-denom">Completed</span>
          </div>
        </div>

        <div className="kpi-card-v2">
          <div className="kpi-icon-circle gold">
            <Ribbon size={20} />
          </div>
          <div className="kpi-data flex-col">
            <span className="kpi-sub-title">Certificates</span>
            <div className="kpi-value-row">
              <span className="kpi-huge-val">3</span>
            </div>
            <span className="kpi-denom">Earned</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid-2-equal gap-6 mt-6">
        {/* Left Column: Your Learning Journey + Recommended */}
        <div className="flex-col gap-6">
          {/* Your Learning Journey Card */}
          <div className="card">
            <h3 className="section-title">Your Learning Journey</h3>
            
            <div className="grid-2 gap-4 mt-4">
              {/* Continue Learning */}
              <div className="learning-subcard">
                <span className="subcard-tag text-blue">Continue Learning</span>
                <h4 className="subcard-title">Data Visualization with Python</h4>
                <div className="progress-bar-wrap mt-3">
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill blue" style={{ width: '68%' }}></div>
                  </div>
                  <div className="progress-label-row mt-1">
                    <span>68% Complete</span>
                  </div>
                </div>
                <button 
                  className="btn btn-secondary btn-sm mt-3 w-full"
                  onClick={() => navigate('/course-player')}
                >
                  <PlayCircle size={14} className="mr-1" /> Resume Course
                </button>
              </div>

              {/* Next in Path */}
              <div className="learning-subcard">
                <span className="subcard-tag text-indigo">Next in Path</span>
                <h4 className="subcard-title">Official Statistics Fundamentals</h4>
                <p className="text-muted text-xs mt-1">Prerequisite for Advanced Analytics</p>
                <button 
                  className="btn btn-primary btn-sm mt-4 w-full"
                  onClick={() => navigate('/igot-karmayogi')}
                >
                  Start Now
                </button>
              </div>
            </div>
          </div>

          {/* Recommended for You Card */}
          <div className="card">
            <div className="flex-between">
              <h3 className="section-title">Recommended for You</h3>
              <button className="btn-link" onClick={() => navigate('/igot-karmayogi')}>
                View All Recommendations
              </button>
            </div>

            <div className="grid-3 gap-4 mt-4">
              {/* Course 1 */}
              <div className="course-mini-card">
                <div className="course-thumb i-got">
                  <span className="provider-badge">iGOT</span>
                  <div className="thumb-graphic stats-bg">📊</div>
                </div>
                <div className="mini-card-body">
                  <h5 className="mini-card-title">Introduction to SDG Indicators</h5>
                  <div className="mini-card-meta">
                    <span><Star size={12} fill="#f59e0b" color="#f59e0b" /> 4.6 (128)</span>
                    <span>• Beginner</span>
                    <span>• 12 Hours</span>
                  </div>
                </div>
              </div>

              {/* Course 2 */}
              <div className="course-mini-card">
                <div className="course-thumb i-got">
                  <span className="provider-badge">iGOT</span>
                  <div className="thumb-graphic data-bg">📈</div>
                </div>
                <div className="mini-card-body">
                  <h5 className="mini-card-title">Data Quality Assurance</h5>
                  <div className="mini-card-meta">
                    <span><Star size={12} fill="#f59e0b" color="#f59e0b" /> 4.7 (96)</span>
                    <span>• Intermediate</span>
                    <span>• 15 Hours</span>
                  </div>
                </div>
              </div>

              {/* Course 3 */}
              <div className="course-mini-card">
                <div className="course-thumb tpac">
                  <span className="provider-badge tpac-badge">TPAC</span>
                  <div className="thumb-graphic geo-bg">🗺️</div>
                </div>
                <div className="mini-card-body">
                  <h5 className="mini-card-title">Population & Demography</h5>
                  <div className="mini-card-meta">
                    <span><Star size={12} fill="#f59e0b" color="#f59e0b" /> 4.5 (72)</span>
                    <span>• Intermediate</span>
                    <span>• 10 Hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Achievements + Quick Actions */}
        <div className="flex-col gap-6">
          <div className="card">
            <h3 className="section-title">Recent Achievements</h3>
            
            <div className="achievements-list mt-4 flex-col gap-3">
              <div className="achievement-item flex-align-gap">
                <div className="achievement-badge-icon gold-bg">
                  <Award size={18} color="#d97706" />
                </div>
                <div>
                  <h5 className="achievement-name">Data Explorer</h5>
                  <p className="achievement-desc">Completed 5 data courses</p>
                </div>
              </div>

              <div className="achievement-item flex-align-gap">
                <div className="achievement-badge-icon blue-bg">
                  <CheckCircle size={18} color="#2563eb" />
                </div>
                <div>
                  <h5 className="achievement-name">Assessment Ace</h5>
                  <p className="achievement-desc">Scored 90%+ in assessment</p>
                </div>
              </div>

              <div className="achievement-item flex-align-gap">
                <div className="achievement-badge-icon green-bg">
                  <Clock size={18} color="#059669" />
                </div>
                <div>
                  <h5 className="achievement-name">Quick Learner</h5>
                  <p className="achievement-desc">10 hours in a week</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Copilot Suggestion Box */}
          <div className="card ai-copilot-card">
            <div className="flex-align-gap">
              <Sparkles size={20} color="#4f46e5" />
              <h3 className="section-title">AI Competency Copilot</h3>
            </div>
            <p className="text-sm mt-2 text-secondary">
              Based on your recent assessment in <strong>Data Quality</strong>, your proficiency has increased by 14%. Take the quick refresher quiz to keep your retention confidence high.
            </p>
            <div className="mt-4 flex-gap">
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/assessments')}>
                Take Refresher Quiz
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => navigate('/ai-assistant')}>
                Ask Copilot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
