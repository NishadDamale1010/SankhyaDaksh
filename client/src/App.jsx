import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext'
import Layout from './components/layout/Layout'
import Landing from './pages/Landing'
import Auth from './pages/Auth'

// Mockup Match Pages
import Dashboard from './pages/Dashboard'
import SkillGapAnalysis from './pages/SkillGapAnalysis'
import IGotKarmayogi from './pages/IGotKarmayogi'
import CoursePlayer from './pages/CoursePlayer'
import AssessmentsList from './pages/AssessmentsList'
import AIQuizGenerator from './pages/AIQuizGenerator'
import AIAssistantPage from './pages/AIAssistantPage'
import DashboardAnalytics from './pages/DashboardAnalytics'
import Certificates from './pages/Certificates'
import MyLearning from './pages/MyLearning'
import MyProfile from './pages/MyProfile'
import HelpSupport from './pages/HelpSupport'

function App() {
  const { currentRole } = useApp()

  return (
    <Routes>
      {/* Landing page — no sidebar/topbar */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />

      {/* Main App Routes with Sidebar & Topbar */}
      <Route element={<Layout />}>
        {/* Core Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/skill-gap" element={<SkillGapAnalysis />} />
        <Route path="/igot-karmayogi" element={<IGotKarmayogi />} />
        <Route path="/course-player" element={<CoursePlayer />} />
        <Route path="/assessments" element={<AssessmentsList />} />
        <Route path="/ai-quiz-generator" element={<AIQuizGenerator />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="/analytics" element={<DashboardAnalytics />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/help" element={<HelpSupport />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
