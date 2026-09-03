import {Routes,Route,Navigate} from 'react-router-dom'
import {useApp} from './context/AppContext'
import Layout from './components/layout/Layout'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import AIQuizGenerator from './pages/AIQuizGenerator'
import {Competencies,Gaps,Recommendations,Learning,Assessment,Progress,Mapping,AdminAnalytics,DataSources,Knowledge,Profile} from './pages/IntelligencePages'
function Guard({children}){const {currentRole}=useApp();return currentRole?children:<Navigate to="/auth" replace/>}
export default function App(){return <Routes><Route path="/" element={<Landing/>}/><Route path="/landing" element={<Landing/>}/><Route path="/auth" element={<Auth/>}/><Route element={<Guard><Layout/></Guard>}><Route path="/dashboard" element={<Dashboard/>}/><Route path="/quiz-generator" element={<AIQuizGenerator/>}/><Route path="/competencies" element={<Competencies/>}/><Route path="/gaps" element={<Gaps/>}/><Route path="/recommendations" element={<Recommendations/>}/><Route path="/learning" element={<Learning/>}/><Route path="/assessments" element={<Assessment/>}/><Route path="/progress" element={<Progress/>}/><Route path="/mapping" element={<Mapping/>}/><Route path="/analytics" element={<AdminAnalytics/>}/><Route path="/data-sources" element={<DataSources/>}/><Route path="/knowledge" element={<Knowledge/>}/><Route path="/profile" element={<Profile/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>}
