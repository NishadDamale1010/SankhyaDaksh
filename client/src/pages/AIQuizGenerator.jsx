import React, { useState } from 'react';
import { 
  Upload, 
  Settings, 
  Sparkles, 
  FileCheck, 
  Download, 
  RotateCcw, 
  CheckCircle,
  BookOpen,
  ArrowRight,
  Loader,
  AlertCircle,
  FileText,
  Zap
} from 'lucide-react';

export default function AIQuizGenerator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanations, setShowExplanations] = useState({});

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const generateQuiz = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setCurrentStep(3);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('numQuestions', numQuestions.toString());
    
    try {
      const response = await fetch('http://localhost:5000/api/ai/upload-pdf-quiz', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate quiz');
      }

      setQuestions(data.data.questions);
      setSelectedAnswers({});
      setShowExplanations({});
      setCurrentStep(4);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setCurrentStep(2);
    } finally {
      setLoading(false);
    }
  };

  const toggleAnswer = (qIdx) => {
    setShowExplanations(prev => ({...prev, [qIdx]: !prev[qIdx]}));
  };

  const selectOption = (qIdx, opt) => {
    setSelectedAnswers(prev => ({...prev, [qIdx]: opt}));
    // Auto-show explanation when correct answer selected
    if (questions[qIdx] && opt === questions[qIdx].answer) {
      setShowExplanations(prev => ({...prev, [qIdx]: true}));
    }
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) correct++;
    });
    return correct;
  };

  const steps = [
    { step: 1, label: 'Upload', icon: Upload },
    { step: 2, label: 'Configure', icon: Settings },
    { step: 3, label: 'Generate', icon: Sparkles },
    { step: 4, label: 'Review', icon: FileCheck },
  ];

  return (
    <div className="sd-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">AI-POWERED ASSESSMENT</div>
          <h1>Quiz Generator</h1>
          <p>Upload learning material and generate intelligent MCQ assessments</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="stepper-nav-row">
        {steps.map((st) => {
          const Icon = st.icon;
          const isActive = currentStep === st.step;
          const isDone = currentStep > st.step;
          return (
            <div key={st.step} className={`stepper-pill ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}>
              <div className="step-num">
                {isDone ? <CheckCircle size={16}/> : st.step}
              </div>
              <span className="step-text">{st.label}</span>
            </div>
          );
        })}
      </div>

      {/* Error Display */}
      {error && (
        <div className="quiz-error-banner">
          <AlertCircle size={18}/>
          <div>
            <b>Generation Failed</b>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Step 1: Upload */}
      {currentStep === 1 && (
        <div className="panel quiz-upload-panel">
          <div 
            className="quiz-dropzone"
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
          >
            <div className="dropzone-icon">
              <Upload size={32}/>
            </div>
            <h2>Upload your PDF</h2>
            <p>Drag & drop your learning material or click to browse</p>
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange} 
              className="quiz-file-input"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="primary quiz-browse-btn">
              <FileText size={16}/> Browse Files
            </label>
          </div>

          {file && (
            <div className="quiz-file-info">
              <div className="quiz-file-details">
                <FileText size={20}/>
                <div>
                  <b>{file.name}</b>
                  <span>{(file.size/1024/1024).toFixed(2)} MB</span>
                </div>
              </div>
              <CheckCircle size={20} className="quiz-file-check"/>
            </div>
          )}

          <button 
            className="primary quiz-next-btn"
            disabled={!file}
            onClick={handleNext}
          >
            Next: Configure <ArrowRight size={16}/>
          </button>
        </div>
      )}

      {/* Step 2: Configure */}
      {currentStep === 2 && (
        <div className="panel quiz-config-panel">
          <div className="quiz-config-header">
            <Zap size={24}/>
            <div>
              <h2>Configuration</h2>
              <p>Customize your quiz parameters</p>
            </div>
          </div>

          <div className="quiz-config-body">
            <div className="quiz-config-field">
              <label>Number of Questions</label>
              <div className="quiz-number-selector">
                {[3, 5, 10, 15, 20].map(n => (
                  <button 
                    key={n}
                    className={`quiz-num-btn ${Number(numQuestions) === n ? 'active' : ''}`}
                    onClick={() => setNumQuestions(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <small>Or enter a custom number:</small>
              <input 
                type="number" 
                min="1" max="20"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                className="quiz-custom-input"
              />
            </div>

            <div className="quiz-source-info">
              <FileText size={16}/>
              <span>Source: <b>{file?.name}</b></span>
            </div>
          </div>

          <div className="quiz-config-actions">
            <button className="outline" onClick={() => setCurrentStep(1)}>
              Back
            </button>
            <button className="primary" onClick={generateQuiz}>
              <Sparkles size={16}/> Generate Quiz
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Loading */}
      {currentStep === 3 && (
        <div className="panel quiz-loading-panel">
          <div className="quiz-loading-spinner">
            <Loader size={48}/>
          </div>
          <h2>Analyzing Document...</h2>
          <p>The AI is reading your PDF and crafting high-quality MCQs.</p>
          <div className="quiz-loading-steps">
            <div className="quiz-loading-step active">
              <CheckCircle size={14}/> Extracting text from PDF
            </div>
            <div className="quiz-loading-step active">
              <Loader size={14}/> Building RAG prompt
            </div>
            <div className="quiz-loading-step">
              <span className="quiz-step-dot"></span> Generating questions via AI
            </div>
            <div className="quiz-loading-step">
              <span className="quiz-step-dot"></span> Formatting response
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {currentStep === 4 && (
        <div className="quiz-review-layout">
          <div className="quiz-questions-list">
            <div className="quiz-results-header">
              <h2><BookOpen size={20}/> Generated Questions ({questions.length})</h2>
              {Object.keys(selectedAnswers).length === questions.length && (
                <div className="quiz-score-badge">
                  Score: {getScore()}/{questions.length}
                </div>
              )}
            </div>

            {questions.map((q, idx) => {
              const userAnswer = selectedAnswers[idx];
              const showExp = showExplanations[idx];
              return (
                <article key={idx} className="panel quiz-question-card">
                  <div className="quiz-q-header">
                    <span className="quiz-q-number">{idx + 1}</span>
                    <h3>{q.question}</h3>
                  </div>

                  <div className="quiz-options">
                    {q.options.map((opt, oIdx) => {
                      const letter = String.fromCharCode(65 + oIdx);
                      const isCorrect = opt === q.answer;
                      const isSelected = userAnswer === opt;
                      let optClass = 'quiz-option';
                      if (isSelected && isCorrect) optClass += ' correct';
                      else if (isSelected && !isCorrect) optClass += ' incorrect';
                      else if (userAnswer && isCorrect) optClass += ' reveal-correct';
                      
                      return (
                        <div 
                          key={oIdx} 
                          className={optClass}
                          onClick={() => !userAnswer && selectOption(idx, opt)}
                        >
                          <span className="quiz-option-letter">{letter}</span>
                          <span className="quiz-option-text">{opt}</span>
                          {isSelected && isCorrect && <CheckCircle size={18}/>}
                          {isSelected && !isCorrect && <AlertCircle size={18}/>}
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div className="quiz-explanation-wrapper">
                      <button className="quiz-explain-toggle" onClick={() => toggleAnswer(idx)}>
                        {showExp ? 'Hide' : 'Show'} Explanation
                      </button>
                      {showExp && (
                        <div className="quiz-explanation">
                          <Sparkles size={14}/>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="quiz-sidebar-summary">
            <div className="panel quiz-summary-card">
              <h3>Quiz Summary</h3>

              <div className="quiz-summary-stats">
                <div className="quiz-stat-row">
                  <span>Total Questions</span>
                  <b>{questions.length}</b>
                </div>
                <div className="quiz-stat-row">
                  <span>Question Type</span>
                  <b>MCQ</b>
                </div>
                <div className="quiz-stat-row">
                  <span>Source</span>
                  <b className="quiz-filename" title={file?.name}>{file?.name}</b>
                </div>
                {Object.keys(selectedAnswers).length > 0 && (
                  <div className="quiz-stat-row">
                    <span>Attempted</span>
                    <b>{Object.keys(selectedAnswers).length}/{questions.length}</b>
                  </div>
                )}
              </div>

              <div className="quiz-summary-actions">
                <button className="outline" onClick={() => {
                  setCurrentStep(1);
                  setFile(null);
                  setQuestions([]);
                  setSelectedAnswers({});
                  setShowExplanations({});
                  setError(null);
                }}>
                  <RotateCcw size={16}/> Start Over
                </button>
                <button className="primary" onClick={() => {
                  const blob = new Blob([JSON.stringify(questions, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'generated-quiz.json';
                  a.click();
                }}>
                  <Download size={16}/> Export JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
