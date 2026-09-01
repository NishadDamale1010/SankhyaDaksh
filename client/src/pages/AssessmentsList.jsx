import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { availableAssessments } from '../data/mockData';
import { ClipboardCheck, Clock, FileQuestion, Calendar } from 'lucide-react';

export default function AssessmentsList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Available');

  return (
    <div className="page-wrapper">
      {/* Title */}
      <div>
        <h1 className="page-title">Assessments</h1>
        <p className="page-subtitle">Evaluate your knowledge and track progress</p>
      </div>

      {/* Tabs */}
      <div className="tab-nav-row mt-4">
        {['Available', 'Attempted', 'Scheduled'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Assessment List */}
      <div className="mt-6 flex-col gap-4">
        {availableAssessments.map((ass) => (
          <div key={ass.id} className="card assessment-list-card flex-between">
            <div className="flex-align-gap">
              <div className="assessment-icon-badge">
                <ClipboardCheck size={22} color="#2563eb" />
              </div>
              <div>
                <h4 className="assessment-card-title">{ass.title}</h4>
                <div className="assessment-meta-row text-xs text-muted mt-2 flex-align-gap">
                  <span><FileQuestion size={12} className="inline-icon" /> {ass.questionsCount} Questions</span>
                  <span>• <Clock size={12} className="inline-icon" /> {ass.durationMinutes} Minutes</span>
                  <span>• <Calendar size={12} className="inline-icon" /> Due: {ass.dueDate}</span>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate('/officer/assessment')}
            >
              Start Assessment
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button className="btn btn-secondary">View All Assessments</button>
      </div>
    </div>
  );
}
