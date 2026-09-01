import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlayCircle, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  MessageSquare, 
  Download,
  BookOpen
} from 'lucide-react';
import { coursePlayerDetails } from '../data/mockData';

export default function CoursePlayer() {
  const navigate = useNavigate();
  const [activeLesson, setActiveLesson] = useState('1.2');
  const [activeTab, setActiveTab] = useState('Overview');
  const [completedLessons, setCompletedLessons] = useState({ '1.1': true });

  const handleLessonSelect = (lessonId) => {
    setActiveLesson(lessonId);
  };

  const handleMarkComplete = () => {
    setCompletedLessons((prev) => ({ ...prev, [activeLesson]: true }));
  };

  return (
    <div className="course-player-wrapper">
      {/* Top Header Navigation */}
      <div className="player-topbar flex-between">
        <div className="flex-align-gap">
          <button className="icon-btn" onClick={() => navigate('/dashboard')}>
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="course-player-title">{coursePlayerDetails.title}</h2>
            <div className="player-progress-row text-xs flex-align-gap">
              <span>Overall Progress: <strong>{coursePlayerDetails.overallProgress}%</strong></span>
              <div className="progress-bar-bg inline-progress" style={{ width: '120px' }}>
                <div className="progress-bar-fill blue" style={{ width: `${coursePlayerDetails.overallProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <button className="btn btn-success btn-sm" onClick={handleMarkComplete}>
          <CheckCircle size={14} className="mr-1" /> Mark Complete
        </button>
      </div>

      {/* Main Player Grid: Sidebar Playlist vs Main Video Screen */}
      <div className="player-grid mt-4">
        {/* Left Sidebar: Curriculum Playlist */}
        <div className="curriculum-sidebar card">
          <h4 className="curriculum-title">Course Curriculum</h4>
          <div className="sections-list mt-3 flex-col gap-3">
            {coursePlayerDetails.sections.map((sec, secIdx) => (
              <div key={secIdx} className="section-group">
                <h5 className="section-header">{sec.title}</h5>
                <div className="lessons-list flex-col gap-1 mt-1">
                  {sec.lessons.map((les) => {
                    const isCompleted = completedLessons[les.id];
                    const isActive = activeLesson === les.id;
                    return (
                      <div
                        key={les.id}
                        className={`lesson-item flex-between ${isActive ? 'active' : ''}`}
                        onClick={() => handleLessonSelect(les.id)}
                      >
                        <div className="flex-align-gap text-xs">
                          {isCompleted ? (
                            <CheckCircle size={14} color="#059669" />
                          ) : isActive ? (
                            <PlayCircle size={14} color="#2563eb" />
                          ) : (
                            <span className="lesson-num">{les.id}</span>
                          )}
                          <span>{les.name}</span>
                        </div>
                        <span className="duration-text text-muted">{les.duration}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Main Screen: Video Player & Content */}
        <div className="player-main-area flex-col gap-4">
          {/* Header */}
          <div className="card player-video-card">
            <h3 className="lesson-main-title mb-3">1.2 Importance of Data Visualization?</h3>

            {/* Simulated Video Player */}
            <div className="video-player-screen">
              <div className="video-slide-content">
                <h2 className="slide-heading">Why Data Visualization Matters?</h2>
                <ul className="slide-bullets mt-4">
                  <li>Simplifies complex data</li>
                  <li>Identifies trends and patterns</li>
                  <li>Aids better decision making</li>
                  <li>Improves data communication</li>
                </ul>
              </div>

              {/* Video Overlay Controls */}
              <div className="video-controls-overlay flex-between">
                <div className="flex-align-gap">
                  <PlayCircle size={24} color="#ffffff" className="clickable" />
                  <span className="time-display">2:16 / 8:45</span>
                </div>
                <div className="progress-bar-bg video-track" style={{ flex: 1, margin: '0 16px' }}>
                  <div className="progress-bar-fill blue" style={{ width: '28%' }}></div>
                </div>
                <span className="text-xs text-white">1080p</span>
              </div>
            </div>

            {/* Video Controls & Nav */}
            <div className="video-bottom-bar flex-between mt-3">
              <button className="btn btn-secondary btn-sm">
                <ChevronLeft size={14} /> Previous
              </button>
              <button className="btn btn-primary btn-sm">
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Player Tabs: Overview | Resources | Notes | Discussion */}
          <div className="card">
            <div className="tab-nav-row">
              {['Overview', 'Resources', 'Notes', 'Discussion'].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="tab-content-area mt-4">
              {activeTab === 'Overview' && (
                <p className="text-sm text-secondary leading-relaxed">
                  Data visualization transforms raw data into meaningful insights. It helps us understand patterns, trends and outliers that may not be visible in tables. In MoSPI survey reports, effective data charts allow policymakers to draw immediate conclusions regarding socio-economic indicators.
                </p>
              )}
              {activeTab === 'Resources' && (
                <div className="flex-col gap-2 text-sm">
                  <div className="flex-between p-2 rounded bg-light">
                    <span>📄 Lesson Slides PDF (2.4 MB)</span>
                    <button className="btn-link"><Download size={14} /> Download</button>
                  </div>
                  <div className="flex-between p-2 rounded bg-light">
                    <span>📊 Sample Python Notebook (.ipynb)</span>
                    <button className="btn-link"><Download size={14} /> Download</button>
                  </div>
                </div>
              )}
              {activeTab === 'Notes' && (
                <textarea
                  className="form-input text-sm"
                  rows={4}
                  placeholder="Take personal notes for this lesson..."
                ></textarea>
              )}
              {activeTab === 'Discussion' && (
                <div className="text-sm text-muted">
                  No questions asked yet for this lesson. Be the first to start a discussion!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
