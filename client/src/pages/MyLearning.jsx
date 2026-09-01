import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, PlayCircle, Clock, CheckCircle } from 'lucide-react';

export default function MyLearning() {
  const navigate = useNavigate();

  const enrolled = [
    {
      id: 'm1',
      title: 'Data Visualization with Python',
      provider: 'iGOT Karmayogi',
      progress: 68,
      hoursRemaining: '2.5 Hours left',
      lastAccessed: '2 days ago',
    },
    {
      id: 'm2',
      title: 'Official Statistics Fundamentals',
      provider: 'MoSPI Training Division',
      progress: 42,
      hoursRemaining: '4.0 Hours left',
      lastAccessed: 'Yesterday',
    },
    {
      id: 'm3',
      title: 'Data Quality Frameworks (SQAF)',
      provider: 'NSSTA',
      progress: 15,
      hoursRemaining: '5.5 Hours left',
      lastAccessed: '3 days ago',
    },
  ];

  return (
    <div className="page-wrapper">
      <div>
        <h1 className="page-title">My Learning</h1>
        <p className="page-subtitle">Track your active courses and learning progress</p>
      </div>

      <div className="grid-3 gap-6 mt-6">
        {enrolled.map((course) => (
          <div key={course.id} className="card my-learning-card flex-col flex-between">
            <div>
              <span className="subcard-tag text-blue">{course.provider}</span>
              <h4 className="course-title mt-2">{course.title}</h4>
              <span className="text-xs text-muted block mt-1">Last accessed: {course.lastAccessed}</span>

              <div className="progress-bar-wrap mt-4">
                <div className="flex-between text-xs mb-1">
                  <span>Progress</span>
                  <strong className="text-blue">{course.progress}%</strong>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill blue" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary btn-sm mt-4 w-full"
              onClick={() => navigate('/course-player')}
            >
              <PlayCircle size={14} className="mr-1" /> Continue Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
