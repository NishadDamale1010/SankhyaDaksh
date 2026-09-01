import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, BookOpen, ExternalLink } from 'lucide-react';

export default function IGotKarmayogi() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Recommended');
  const [enrolledMap, setEnrolledMap] = useState({});

  const handleEnroll = (courseId) => {
    setEnrolledMap((prev) => ({ ...prev, [courseId]: true }));
  };

  const courses = [
    {
      id: 'igot-1',
      title: 'Official Statistics Fundamentals',
      provider: 'Ministry of Statistics & Programme Implementation',
      rating: '4.8',
      reviews: '342',
      duration: '8 Hours',
      level: 'Beginner',
      imageBg: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
      icon: '📊',
    },
    {
      id: 'igot-2',
      title: 'Data Analysis using R',
      provider: 'iGOT Karmayogi',
      rating: '4.7',
      reviews: '256',
      duration: '15 Hours',
      level: 'Intermediate',
      imageBg: 'linear-gradient(135deg, #065f46, #10b981)',
      icon: '📈',
    },
    {
      id: 'igot-3',
      title: 'National Statistical System',
      provider: 'NSSTA',
      rating: '4.6',
      reviews: '189',
      duration: '6 Hours',
      level: 'Beginner',
      imageBg: 'linear-gradient(135deg, #4c1d95, #8b5cf6)',
      icon: '🏛️',
    },
  ];

  return (
    <div className="page-wrapper">
      {/* Title */}
      <div>
        <h1 className="page-title">iGOT Karmayogi</h1>
        <p className="page-subtitle">Discover personalized learning opportunities</p>
      </div>

      {/* iGOT Hero Banner */}
      <div className="igot-hero-banner mt-4">
        <div className="igot-banner-content">
          <div className="igot-logo-badge">iGOT Karmayogi</div>
          <h2 className="banner-title mt-2">Access 1000+ government courses curated for your growth</h2>
          <button className="btn btn-primary mt-4" onClick={() => navigate('/my-learning')}>
            Explore Now
          </button>
        </div>
        <div className="igot-banner-illustration">
          💻 👩‍💻
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-nav-row mt-6">
        {['Recommended', 'Enrolled', 'Completed', 'All Courses'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Course List: Recommended for You */}
      <div className="mt-6">
        <h3 className="section-title mb-4">Recommended for You</h3>

        <div className="flex-col gap-4">
          {courses.map((c) => (
            <div key={c.id} className="card course-horizontal-card flex-between">
              <div className="flex-align-gap">
                <div
                  className="course-horizontal-thumb"
                  style={{ background: c.imageBg }}
                >
                  <span className="thumb-icon">{c.icon}</span>
                </div>
                <div>
                  <h4 className="course-title">{c.title}</h4>
                  <p className="course-provider text-xs text-muted">{c.provider}</p>
                  <div className="course-meta-row text-xs mt-2 flex-align-gap">
                    <span className="flex-align-gap"><Star size={12} fill="#f59e0b" color="#f59e0b" /> {c.rating} ({c.reviews})</span>
                    <span>• <Clock size={12} className="inline-icon" /> {c.duration}</span>
                    <span>• {c.level}</span>
                  </div>
                </div>
              </div>

              <div>
                {enrolledMap[c.id] ? (
                  <button className="btn btn-success" onClick={() => navigate('/course-player')}>
                    Resume Course
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleEnroll(c.id)}>
                    Enroll
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button className="btn btn-secondary">View All Courses</button>
        </div>
      </div>
    </div>
  );
}
