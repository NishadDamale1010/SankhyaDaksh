import { createContext, useContext, useMemo, useState } from 'react'

const AppContext = createContext(null)
const initial = [
  { id:'data', name:'Data Interpretation', domain:'Statistical', required:4.0, current:2.8, confidence:74, evidence:'Diagnostic assessment · 58% on interpretation items', action:'Complete Statistical Data Interpretation' },
  { id:'reasoning', name:'Statistical Reasoning', domain:'Statistical', required:4.0, current:3.1, confidence:81, evidence:'Assessment history · 71% accuracy', action:'Practise survey inference scenarios' },
  { id:'monitoring', name:'Programme Monitoring', domain:'Technical', required:3.5, current:3.0, confidence:77, evidence:'Role portfolio · monitoring reports', action:'Review results framework module' },
  { id:'digital', name:'Digital Service Delivery', domain:'Digital Governance', required:3.5, current:2.6, confidence:69, evidence:'Learning activity · no recent evidence', action:'Start Digital Governance Foundations' },
  { id:'decision', name:'Evidence-based Decision Making', domain:'Behavioural / Managerial', required:4.0, current:3.2, confidence:80, evidence:'Scenario assessment · 68% accuracy', action:'Take decision-making simulation' },
  { id:'communication', name:'Technical Communication', domain:'Behavioural / Managerial', required:3.5, current:3.7, confidence:88, evidence:'Manager feedback · strong', action:'Maintain proficiency' },
]
const resources = [
  {id:'r1',title:'Statistical Data Interpretation',domain:'Statistical',skills:['Data Interpretation'],difficulty:'Beginner → Intermediate',duration:'3 hours',impact:.35},
  {id:'r2',title:'Survey Data Analysis',domain:'Statistical',skills:['Data Interpretation','Statistical Reasoning'],difficulty:'Intermediate',duration:'4 hours',impact:.3},
  {id:'r3',title:'Digital Governance Foundations',domain:'Digital Governance',skills:['Digital Service Delivery'],difficulty:'Beginner',duration:'2.5 hours',impact:.3},
  {id:'r4',title:'Evidence-Based Decision Making',domain:'Behavioural / Managerial',skills:['Evidence-based Decision Making'],difficulty:'Intermediate',duration:'2 hours',impact:.25},
  {id:'r5',title:'Programme Monitoring Essentials',domain:'Technical',skills:['Programme Monitoring'],difficulty:'Intermediate',duration:'3 hours',impact:.25},
]

export function AppProvider({children}) {
  const [currentRole,setCurrentRole] = useState(()=>localStorage.getItem('sankhya_role'))
  const [competencies,setCompetencies] = useState(()=>JSON.parse(localStorage.getItem('sd_competencies')||'null') || initial)
  const [progress,setProgress] = useState(()=>JSON.parse(localStorage.getItem('sd_progress')||'{}'))
  const [events,setEvents] = useState(()=>JSON.parse(localStorage.getItem('sd_events')||'null') || [{date:'02 Sep',type:'Assessment evidence',text:'Data Interpretation assessed at 2.8 / 4.0',tone:'amber'},{date:'30 Aug',type:'Learning completed',text:'Data Quality Assurance added to evidence profile',tone:'blue'}])
  const persist=(c,p,e)=>{localStorage.setItem('sd_competencies',JSON.stringify(c));localStorage.setItem('sd_progress',JSON.stringify(p));localStorage.setItem('sd_events',JSON.stringify(e))}
  const login=(role)=>{setCurrentRole(role);localStorage.setItem('sankhya_role',role)}
  const logout=()=>{setCurrentRole(null);localStorage.removeItem('sankhya_role')}
  const complete=(resource)=>{ const p={...progress,[resource.id]:100}; const e=[{date:'Today',type:'Learning completed',text:`${resource.title} completed — assessment unlocked`,tone:'blue'},...events]; setProgress(p);setEvents(e);persist(competencies,p,e) }
  const submitAssessment=(answers)=>{ const score=Math.round((answers.filter(Boolean).length/3)*100); const before=competencies.find(x=>x.id==='data').current; const boost=Math.min(.55, .12+(score/100)*.45+(progress.r1===100?.12:0)); const c=competencies.map(x=>x.id==='data'?{...x,current:+Math.min(x.required,x.current+boost).toFixed(1),confidence:Math.min(96,x.confidence+10),evidence:`Assessment evidence · ${score}% score, updated today`}:x); const e=[{date:'Today',type:'Competency re-evaluated',text:`Data Interpretation: ${before} → ${c.find(x=>x.id==='data').current} after ${score}% assessment`,tone:'green'},...events]; setCompetencies(c);setEvents(e);persist(c,progress,e);return {score,before,after:c.find(x=>x.id==='data').current} }
  const user=currentRole==='admin'?{name:'R. K. Verma'}:{name:'Ananya Sharma'}
  const value=useMemo(()=>({currentRole,user,login,logout,competencies,resources,progress,events,complete,submitAssessment}),[currentRole,competencies,progress,events])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export const useApp=()=>useContext(AppContext)
