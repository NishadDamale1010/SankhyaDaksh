import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { useApp } from '../context/AppContext';
import {
  Target,
  TrendingUp,
  BookOpen,
  ClipboardCheck,
  ArrowRight,
  Sparkles,
  FileText,
  MessageSquare,
  Zap,
  BarChart3,
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  BrainCircuit,
  Search,
  Activity
} from 'lucide-react';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
);

const domainCalculations = (items) => 
  ['Statistical', 'Technical', 'Digital Governance', 'Behavioural / Managerial'].map(d => {
    const matched = items.filter(x => x.domain === d);
    if (matched.length === 0) return { d, current: 3.0, required: 4.0 };
    const curAvg = matched.reduce((a, x) => a + x.current, 0) / matched.length;
    const reqAvg = matched.reduce((a, x) => a + x.required, 0) / matched.length;
    return {
      d,
      current: +curAvg.toFixed(1),
      required: +reqAvg.toFixed(1)
    };
  });

export default function Dashboard() {
  const { competencies, progress, currentRole } = useApp();
  const nav = useNavigate();
  const [quickQuestion, setQuickQuestion] = useState('');
  const [viewMode, setViewMode] = useState('radar'); // 'radar' or 'bar'

  if (currentRole === 'admin') {
    return <AdminLanding nav={nav} competencies={competencies} progress={progress} />;
  }

  const domains = domainCalculations(competencies);
  const avgCurrent = (competencies.reduce((a, x) => a + x.current, 0) / competencies.length).toFixed(1);
  const totalStrong = competencies.filter(x => x.current >= x.required - 0.3).length;
  const priorityGaps = competencies.filter(x => (x.required - x.current) > 0.4).length;
  const completedModules = Object.values(progress).filter(x => x === 100).length;

  const topGap = [...competencies].sort((a, b) => (b.required - b.current) - (a.required - a.current))[0] || {
    name: 'Data Interpretation',
    required: 4.0,
    current: 2.8,
    evidence: 'Demonstrates basic statistical tabular understanding but requires advanced inferential analytics capability.'
  };

  // Chart Configs
  const radarChartData = {
    labels: domains.map(x => x.d === 'Behavioural / Managerial' ? 'Behavioural' : x.d),
    datasets: [
      {
        label: 'Required Level',
        data: domains.map(x => x.required),
        backgroundColor: 'rgba(67, 56, 202, 0.12)',
        borderColor: '#4338ca',
        pointBackgroundColor: '#4338ca',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4338ca',
        borderWidth: 2.5,
      },
      {
        label: 'Current Capability',
        data: domains.map(x => x.current),
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: '#10b981',
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#10b981',
        borderWidth: 2.5,
      }
    ]
  };

  const barChartData = {
    labels: domains.map(x => x.d === 'Behavioural / Managerial' ? 'Behavioural' : x.d),
    datasets: [
      {
        label: 'Current',
        data: domains.map(x => x.current),
        backgroundColor: 'rgba(59, 130, 246, 0.85)',
        borderRadius: 8,
      },
      {
        label: 'Required',
        data: domains.map(x => x.required),
        backgroundColor: 'rgba(226, 232, 240, 0.85)',
        borderRadius: 8,
      }
    ]
  };

  const handleQuickQuestionSubmit = (e) => {
    e.preventDefault();
    if (!quickQuestion.trim()) return;
    nav('/knowledge', { state: { initialQuery: quickQuestion } });
  };

  return (
    <div className="sd-page">
      {/* Header Greeting Banner */}
      <div className="dashboard-header-banner">
        <div>
          <div className="eyebrow">OFFICER INTELLIGENCE DASHBOARD</div>
          <h1 className="header-greeting">Good morning, Ananya Sharma 👋</h1>
          <p className="header-subtext">
            Statistical Officer · Ministry of Statistics & Programme Implementation
          </p>
        </div>

        <div className="flex-align-gap" style={{ gap: '12px' }}>
          <button className="btn btn-primary" onClick={() => nav('/quiz-generator')}>
            <Sparkles size={16} className="mr-2" /> Generate Quiz from PDF
          </button>
          <button className="btn btn-secondary" onClick={() => nav('/recommendations')}>
            Next Best Action <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>

      {/* AI Quick Power Launcher Bar */}
      <div className="card mb-6" style={{ background: 'linear-gradient(135deg, rgba(67,56,202,0.06), rgba(59,130,246,0.04))', border: '1px solid rgba(67,56,202,0.15)' }}>
        <div className="flex-between mb-3">
          <div className="flex-align-gap">
            <BrainCircuit size={20} style={{ color: '#4338ca' }} />
            <h3 className="section-title" style={{ margin: 0, fontSize: '16px' }}>AI Power Hub & Quick Actions</h3>
          </div>
          <span className="badge badge-success">Local RAG Engine Active</span>
        </div>

        <div className="grid-4 gap-4 mb-4">
          <div 
            className="learning-subcard clickable" 
            style={{ borderLeft: '4px solid #4338ca', cursor: 'pointer' }}
            onClick={() => nav('/quiz-generator')}
          >
            <div className="flex-align-gap mb-2">
              <FileText size={18} style={{ color: '#4338ca' }} />
              <span className="subcard-title" style={{ fontSize: '14px' }}>PDF Quiz Engine</span>
            </div>
            <p className="text-xs text-muted">Upload any PDF to auto-generate MCQ practice sets with AI explanations.</p>
          </div>

          <div 
            className="learning-subcard clickable" 
            style={{ borderLeft: '4px solid #10b981', cursor: 'pointer' }}
            onClick={() => nav('/recommendations')}
          >
            <div className="flex-align-gap mb-2">
              <Zap size={18} style={{ color: '#10b981' }} />
              <span className="subcard-title" style={{ fontSize: '14px' }}>AI Pathways</span>
            </div>
            <p className="text-xs text-muted">Personalized skill recommendation based on competency gap delta.</p>
          </div>

          <div 
            className="learning-subcard clickable" 
            style={{ borderLeft: '4px solid #f59e0b', cursor: 'pointer' }}
            onClick={() => nav('/gaps')}
          >
            <div className="flex-align-gap mb-2">
              <BarChart3 size={18} style={{ color: '#f59e0b' }} />
              <span className="subcard-title" style={{ fontSize: '14px' }}>Gap Analytics</span>
            </div>
            <p className="text-xs text-muted">In-depth FRAC framework gap calculations with evidence history.</p>
          </div>

          <div 
            className="learning-subcard clickable" 
            style={{ borderLeft: '4px solid #8b5cf6', cursor: 'pointer' }}
            onClick={() => nav('/assessments')}
          >
            <div className="flex-align-gap mb-2">
              <Award size={18} style={{ color: '#8b5cf6' }} />
              <span className="subcard-title" style={{ fontSize: '14px' }}>Adaptive Quiz</span>
            </div>
            <p className="text-xs text-muted">Submit assessment checkpoints to boost competency ratings.</p>
          </div>
        </div>

        {/* Quick Search / Assistant Bar */}
        <form onSubmit={handleQuickQuestionSubmit} className="flex-align-gap">
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input 
              type="text"
              placeholder="Ask AI anything or search statistical competency repository (e.g. Sampling techniques, MoSPI data quality)..."
              value={quickQuestion}
              onChange={(e) => setQuickQuestion(e.target.value)}
              className="chat-input"
              style={{ paddingLeft: '46px', width: '100%', borderRadius: '12px' }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ borderRadius: '12px', padding: '12px 24px' }}>
            Ask AI <ArrowRight size={16} className="ml-1" />
          </button>
        </form>
      </div>

      {/* KPI 5 Cards Bar */}
      <div className="kpi-grid-5">
        <div className="kpi-card-v2">
          <div className="kpi-icon-circle blue">
            <Target size={22} />
          </div>
          <div className="kpi-data">
            <span className="kpi-sub-title">Overall Competency</span>
            <div className="kpi-value-row">
              <span className="kpi-huge-val">{avgCurrent}</span>
              <span className="kpi-denom">/ 4.0</span>
            </div>
            <span className="kpi-trend positive">+0.3 Bayesian Est.</span>
          </div>
        </div>

        <div className="kpi-card-v2">
          <div className="kpi-icon-circle green">
            <TrendingUp size={22} />
          </div>
          <div className="kpi-data">
            <span className="kpi-sub-title">Strong Skills</span>
            <div className="kpi-value-row">
              <span className="kpi-huge-val">{totalStrong}</span>
              <span className="kpi-denom">of 6</span>
            </div>
            <span className="text-xs text-muted">At or near target</span>
          </div>
        </div>

        <div className="kpi-card-v2">
          <div className="kpi-icon-circle amber">
            <AlertTriangle size={22} />
          </div>
          <div className="kpi-data">
            <span className="kpi-sub-title">Priority Gaps</span>
            <div className="kpi-value-row">
              <span className="kpi-huge-val" style={{ color: '#ef4444' }}>{priorityGaps}</span>
              <span className="kpi-denom">Needs Action</span>
            </div>
            <span className="text-xs text-muted">Delta &gt; 0.4</span>
          </div>
        </div>

        <div className="kpi-card-v2">
          <div className="kpi-icon-circle indigo">
            <BookOpen size={22} />
          </div>
          <div className="kpi-data">
            <span className="kpi-sub-title">Learning Modules</span>
            <div className="kpi-value-row">
              <span className="kpi-huge-val">{completedModules}</span>
              <span className="kpi-denom">/ 5 Done</span>
            </div>
            <span className="text-xs text-muted">Evidence recorded</span>
          </div>
        </div>

        <div className="kpi-card-v2">
          <div className="kpi-icon-circle gold">
            <ClipboardCheck size={22} />
          </div>
          <div className="kpi-data">
            <span className="kpi-sub-title">Assessment</span>
            <div className="kpi-value-row">
              <span className="kpi-huge-val" style={{ color: '#10b981' }}>Ready</span>
            </div>
            <span className="text-xs text-muted">3 Checkpoints open</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Highest Role Gap Action */}
      <div className="dash-grid mb-6">
        {/* Left: Competency Radar / Bar Visualization */}
        <section className="panel radar-panel">
          <div className="panel-title mb-4">
            <div>
              <span className="eyebrow">FRAC COMPETENCY DOMAINS</span>
              <h2>Competency Intelligence Profile</h2>
            </div>
            <div className="flex-align-gap">
              <div className="tab-nav-row" style={{ margin: 0, border: 'none', gap: '8px' }}>
                <button 
                  className={`tab-btn ${viewMode === 'radar' ? 'active' : ''}`}
                  style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '8px' }}
                  onClick={() => setViewMode('radar')}
                >
                  Radar
                </button>
                <button 
                  className={`tab-btn ${viewMode === 'bar' ? 'active' : ''}`}
                  style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '8px' }}
                  onClick={() => setViewMode('bar')}
                >
                  Bar
                </button>
              </div>
              <span className="status">Live Local AI Data</span>
            </div>
          </div>

          {viewMode === 'radar' ? (
            <Radar
              data={radarChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  r: {
                    min: 0,
                    max: 4,
                    ticks: { stepSize: 1, display: false },
                    grid: { color: 'rgba(226, 232, 240, 0.8)' },
                    angleLines: { color: 'rgba(226, 232, 240, 0.8)' },
                    pointLabels: {
                      color: '#1e293b',
                      font: { size: 13, weight: '700', family: 'Outfit' }
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { usePointStyle: true, padding: 20, font: { family: 'Inter', weight: '600' } }
                  }
                }
              }}
              style={{ maxHeight: '340px' }}
            />
          ) : (
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: { min: 0, max: 4, ticks: { stepSize: 1 } }
                },
                plugins: {
                  legend: { position: 'bottom' }
                }
              }}
              style={{ maxHeight: '340px' }}
            />
          )}

          {/* Domain Mini Breakdown List */}
          <div className="grid-2 gap-4 mt-6 pt-4" style={{ borderTop: '1px solid #f1f5f9' }}>
            {domains.map((dom, i) => (
              <div key={i} className="flex-col gap-1">
                <div className="flex-between text-xs font-semibold">
                  <span className="text-secondary">{dom.d}</span>
                  <span className="text-muted">{dom.current} / {dom.required}</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill blue"
                    style={{ width: `${(dom.current / dom.required) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right: Highest Role-Relevant Gap Panel */}
        <section className="panel action-panel flex-col flex-between">
          <div>
            <div className="flex-between mb-2">
              <span className="eyebrow">HIGHEST ROLE-RELEVANT GAP</span>
              <span className="badge badge-warning">Priority Action</span>
            </div>

            <h2 style={{ fontSize: '24px', color: '#0f172a', marginBottom: '16px' }}>{topGap.name}</h2>

            <div className="gap-numbers mb-4">
              <div>
                <small>REQUIRED</small>
                <b>{topGap.required}</b>
              </div>
              <div>
                <small>CURRENT</small>
                <b>{topGap.current}</b>
              </div>
              <div className="danger">
                <small>GAP DELTA</small>
                <b>{(topGap.required - topGap.current).toFixed(1)}</b>
              </div>
            </div>

            <div className="evidence mb-4">
              <b>Recorded Evidence & Intelligence:</b>
              <p style={{ margin: 0 }}>{topGap.evidence}</p>
            </div>

            <div className="action-callout mb-4">
              <Sparkles size={20} style={{ color: '#d97706', flexShrink: 0 }} />
              <div>
                <b style={{ color: '#92400e' }}>Recommended Action Plan</b>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#78350f' }}>
                  Complete "Statistical Data Interpretation" module and attempt PDF quiz to bridge gap by +0.35 points.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="btn btn-primary w-full" onClick={() => nav('/quiz-generator')}>
              <Sparkles size={16} className="mr-2" /> Practice PDF Quiz Now
            </button>
            <div className="grid-2 gap-3">
              <button className="btn btn-secondary" onClick={() => nav('/gaps')}>
                Gap Logic <ArrowRight size={14} className="ml-1" />
              </button>
              <button className="btn btn-secondary" onClick={() => nav('/recommendations')}>
                Learning <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Continuous Capability Intelligence Loop */}
      <section className="panel pathway">
        <div className="mb-4">
          <div className="eyebrow">FRAC CONTINUOUS CAPABILITY ENGINE</div>
          <h2>Your Live Intelligence Feedback Loop</h2>
          <p className="text-sm text-muted">Capabilities update dynamically as assessment and learning evidence is recorded.</p>
        </div>

        <div className="flex-between" style={{ overflowX: 'auto', gap: '16px', paddingBottom: '8px' }}>
          {[
            { title: 'Role Requirement', desc: 'MoSPI FRAC Benchmark' },
            { title: 'Current Capability', desc: 'Weighted Baseline' },
            { title: 'Competency Gap', desc: 'Delta Analysis' },
            { title: 'Personalized Learning', desc: 'iGOT / AI Courses' },
            { title: 'Assessment Evidence', desc: 'PDF MCQs & Tests' },
            { title: 'Updated Capability', desc: 'Bayesian Boost' }
          ].map((x, i) => (
            <React.Fragment key={i}>
              <div className="flow flex-col flex-align-gap" style={{ minWidth: '130px', textAlign: 'center' }}>
                <span className="rank">{i + 1}</span>
                <b style={{ fontSize: '13px', color: '#0f172a' }}>{x.title}</b>
                <small style={{ fontSize: '11px', color: '#64748b' }}>{x.desc}</small>
              </div>
              {i < 5 && <i style={{ color: '#cbd5e1', fontSize: '20px', fontStyle: 'normal' }}>→</i>}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}

function AdminLanding({ nav, competencies, progress }) {
  return (
    <div className="sd-page">
      <div className="dashboard-header-banner">
        <div>
          <div className="eyebrow">DEPARTMENTAL OVERVIEW · MOSPI ORGANISATION</div>
          <h1 className="header-greeting">Workforce Competency Intelligence</h1>
          <p className="header-subtext">Local prototype dataset · 24 officers across four departments</p>
        </div>
        <button className="btn btn-primary" onClick={() => nav('/analytics')}>
          Open Competency Analytics <ArrowRight size={16} className="ml-2" />
        </button>
      </div>

      <div className="kpi-grid-5">
        <div className="kpi-card-v2">
          <div className="kpi-icon-circle blue"><Target size={22} /></div>
          <div className="kpi-data">
            <span className="kpi-sub-title">Total Officers</span>
            <div className="kpi-value-row"><span className="kpi-huge-val">24</span></div>
            <span className="text-xs text-muted">4 Departments</span>
          </div>
        </div>

        <div className="kpi-card-v2">
          <div className="kpi-icon-circle green"><TrendingUp size={22} /></div>
          <div className="kpi-data">
            <span className="kpi-sub-title">Avg Competency</span>
            <div className="kpi-value-row"><span className="kpi-huge-val">3.1</span><span className="kpi-denom">/ 4.0</span></div>
            <span className="text-xs text-muted">Across FRAC domains</span>
          </div>
        </div>

        <div className="kpi-card-v2">
          <div className="kpi-icon-circle amber"><AlertTriangle size={22} /></div>
          <div className="kpi-data">
            <span className="kpi-sub-title">Critical Gaps</span>
            <div className="kpi-value-row"><span className="kpi-huge-val" style={{ color: '#ef4444' }}>18</span></div>
            <span className="text-xs text-muted">Delta &gt; 0.8</span>
          </div>
        </div>

        <div className="kpi-card-v2">
          <div className="kpi-icon-circle indigo"><BookOpen size={22} /></div>
          <div className="kpi-data">
            <span className="kpi-sub-title">Learning Rate</span>
            <div className="kpi-value-row"><span className="kpi-huge-val">72%</span></div>
            <span className="text-xs text-muted">Evidence linked</span>
          </div>
        </div>

        <div className="kpi-card-v2">
          <div className="kpi-icon-circle gold"><ClipboardCheck size={22} /></div>
          <div className="kpi-data">
            <span className="kpi-sub-title">Pass Rate</span>
            <div className="kpi-value-row"><span className="kpi-huge-val" style={{ color: '#10b981' }}>76%</span></div>
            <span className="text-xs text-muted">Last 90 days</span>
          </div>
        </div>
      </div>

      <section className="panel admin-insight">
        <div className="flex-between mb-2">
          <span className="eyebrow">AUTOMATED CRITICAL GAP DETECTION</span>
          <span className="badge badge-danger">High Priority</span>
        </div>
        <h2 style={{ fontSize: '20px', color: '#0f172a', marginBottom: '12px' }}>
          Data Interpretation is the largest competency gap among Statistical Officers.
        </h2>
        <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.6 }}>
          Average current capability is 2.7 against a 4.0 role requirement across 12 statistical officers. Recommended departmental intervention: "Statistical Data Interpretation".
        </p>
      </section>
    </div>
  );
}
