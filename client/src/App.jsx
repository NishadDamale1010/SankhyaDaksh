import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import AIQuizGenerator from './pages/AIQuizGenerator';
import MissionSimulator from './pages/MissionSimulator';
import ResourcesLibrary from './pages/ResourcesLibrary';
import AIAssistantPage from './pages/AIAssistantPage';
import CoursePlayer from './pages/CoursePlayer';
import CourseContent from './pages/CourseContent';
import LearningPath from './pages/LearningPath';
import AssessmentPage from './pages/AssessmentPage';
import CompetencyAnalysis from './pages/CompetencyAnalysis';
import ProgressAnalytics from './pages/ProgressAnalytics';
import MyProfile from './pages/MyProfile';
import { Gaps, Recommendations, Mapping, AdminAnalytics, DataSources, Knowledge } from './pages/IntelligencePages';

function Guard({ children }) {
  const { currentRole } = useApp();
  return currentRole ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />

      <Route element={<Guard><Layout /></Guard>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/competencies" element={<CompetencyAnalysis />} />
        <Route path="/competency-analysis" element={<CompetencyAnalysis />} />
        <Route path="/learning" element={<LearningPath />} />
        <Route path="/learning-path" element={<LearningPath />} />
        <Route path="/assessments" element={<AssessmentPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/mission-simulator" element={<MissionSimulator />} />
        <Route path="/resources" element={<ResourcesLibrary />} />
        <Route path="/progress" element={<ProgressAnalytics />} />
        <Route path="/progress-analytics" element={<ProgressAnalytics />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="/course-content" element={<CourseContent />} />
        <Route path="/course-player" element={<CoursePlayer />} />
        <Route path="/gaps" element={<Gaps />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/mapping" element={<Mapping />} />
        <Route path="/analytics" element={<AdminAnalytics />} />
        <Route path="/data-sources" element={<DataSources />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/quiz-generator" element={<AIQuizGenerator />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
