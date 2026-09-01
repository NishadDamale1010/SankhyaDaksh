import React, { useState } from 'react';
import { 
  Upload, 
  Settings, 
  Sparkles, 
  FileCheck, 
  Download, 
  RotateCcw, 
  CheckCircle,
  BookOpen
} from 'lucide-react';
import { ragGeneratedQuestions } from '../data/mockData';

export default function AIQuizGenerator() {
  const [currentStep, setCurrentStep] = useState(4);
  const [questions, setQuestions] = useState(ragGeneratedQuestions);

  return (
    <div className="page-wrapper">
      {/* Title */}
      <div>
        <h1 className="page-title">AI Quiz Generator</h1>
        <p className="page-subtitle">Generate MCQs from your learning material</p>
      </div>

      {/* Stepper Header */}
      <div className="stepper-nav-row mt-4">
        {[
          { step: 1, label: 'Upload Material', icon: Upload },
          { step: 2, label: 'Configure', icon: Settings },
          { step: 3, label: 'Generate', icon: Sparkles },
          { step: 4, label: 'Review', icon: FileCheck },
        ].map((st) => {
          const Icon = st.icon;
          const isActive = currentStep === st.step;
          const isDone = currentStep > st.step;
          return (
            <div
              key={st.step}
              className={`stepper-pill ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
              onClick={() => setCurrentStep(st.step)}
            >
              <span className="step-num">{st.step}</span>
              <span className="step-text">{st.label}</span>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Generated Questions vs Quiz Summary */}
      <div className="grid-3-1 gap-6 mt-6">
        {/* Left Column: Generated Questions */}
        <div className="flex-col gap-4">
          <div className="flex-between">
            <h3 className="section-title">Generated Questions (20)</h3>
            <span className="badge badge-demo">Bloom's Taxonomy Aligned</span>
          </div>

          {/* Question 1 */}
          <div className="card question-card-demo">
            <div className="question-header flex-between">
              <h4 className="question-title">1. Which of the following is a primary source of official statistics?</h4>
              <span className="badge badge-success text-xs">Recall</span>
            </div>

            <div className="options-list mt-3 flex-col gap-2 text-sm">
              <div className="option-row">
                <input type="radio" name="q1" disabled />
                <span>A. News Reports</span>
              </div>
              <div className="option-row selected-correct">
                <input type="radio" name="q1" checked readOnly />
                <span className="font-semibold text-green-700">B. Administrative Records</span>
                <CheckCircle size={14} color="#059669" className="ml-2" />
              </div>
              <div className="option-row">
                <input type="radio" name="q1" disabled />
                <span>C. Research Articles</span>
              </div>
              <div className="option-row">
                <input type="radio" name="q1" disabled />
                <span>D. Social Media Posts</span>
              </div>
            </div>

            <div className="explanation-box mt-3 p-3 bg-light rounded text-xs">
              <strong>Explanation:</strong> Administrative records are official documents maintained by government agencies for administrative purposes.
            </div>
          </div>

          {/* Question 2 */}
          <div className="card question-card-demo">
            <div className="question-header flex-between">
              <h4 className="question-title">2. What is the main purpose of data quality assurance?</h4>
              <span className="badge badge-success text-xs">Understanding</span>
            </div>

            <div className="options-list mt-3 flex-col gap-2 text-sm">
              <div className="option-row">
                <input type="radio" name="q2" disabled />
                <span>A. To increase data quantity</span>
              </div>
              <div className="option-row selected-correct">
                <input type="radio" name="q2" checked readOnly />
                <span className="font-semibold text-green-700">B. To ensure accuracy and reliability of data</span>
                <CheckCircle size={14} color="#059669" className="ml-2" />
              </div>
              <div className="option-row">
                <input type="radio" name="q2" disabled />
                <span>C. To delay survey publications</span>
              </div>
              <div className="option-row">
                <input type="radio" name="q2" disabled />
                <span>D. To reduce sample sizes</span>
              </div>
            </div>

            <div className="explanation-box mt-3 p-3 bg-light rounded text-xs">
              <strong>Explanation:</strong> Data quality assurance frameworks (such as SQAF) ensure precision, accuracy, and reliability across statistical outputs.
            </div>
          </div>
        </div>

        {/* Right Column: Quiz Summary Panel */}
        <div>
          <div className="card quiz-summary-card">
            <h3 className="section-title">Quiz Summary</h3>

            <div className="summary-meta-list mt-4 flex-col gap-3 text-sm">
              <div className="flex-between pb-2 border-b">
                <span className="text-muted">Total Questions</span>
                <strong className="text-lg">20</strong>
              </div>
              <div className="flex-between pb-2 border-b">
                <span className="text-muted">Question Type</span>
                <strong>MCQ</strong>
              </div>
              <div className="flex-between pb-2 border-b">
                <span className="text-muted">Difficulty Level</span>
                <strong>Medium</strong>
              </div>
              <div className="flex-between pb-2 border-b">
                <span className="text-muted">Estimated Time</span>
                <strong>20 Minutes</strong>
              </div>
            </div>

            <div className="summary-actions mt-6 flex-col gap-2">
              <button className="btn btn-secondary w-full">
                <RotateCcw size={14} className="mr-1" /> Regenerate
              </button>
              <button className="btn btn-primary w-full">
                <Download size={14} className="mr-1" /> Download Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
