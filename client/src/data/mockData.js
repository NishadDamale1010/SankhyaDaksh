// ============================================================
// SANKHYA-DAKSH — Mock Data (Single Source of Truth)
// All demo data is centralized here for consistency.
// These are DEMO VALUES for hackathon prototype purposes.
// ============================================================

export const officerProfile = {
  name: 'Ananya Verma',
  designation: 'Statistical Officer',
  department: 'Ministry of Statistics & Programme Implementation (MoSPI)',
  division: 'Periodic Labour Force Survey (PLFS) Division',
  serviceYears: 6,
  cadre: 'Indian Statistical Service (ISS)',
  employeeId: 'ISS-2020-08912',
  avatarInitials: 'AV',
  overallCompetency: 68,
  skillsMastered: 24,
  totalSkills: 45,
  learningHours: 48.5,
  assessmentsCompleted: 7,
  certificatesEarned: 3,
  activeLearning: 3,
  assessmentsDue: 2,
};

export const trainerProfile = {
  name: 'Dr. Meera Iyer',
  designation: 'Faculty, Statistical Methods',
  department: 'NSSTA, MoSPI',
  division: 'National Statistical Systems Training Academy',
  avatarInitials: 'MI',
  materialsUploaded: 12,
  questionsGenerated: 148,
  pendingReviews: 7,
  activeLearners: 45,
};

export const adminProfile = {
  name: 'Anil Verma',
  designation: 'Director, DIID',
  department: 'MoSPI',
  division: 'Data Informatics & Innovation Division',
  avatarInitials: 'AV',
};

// Competency data — CONSISTENT across all screens
export const competencies = [
  {
    id: 'stat-analysis',
    name: 'Statistical Analysis & Survey Design',
    shortName: 'Statistical Analysis',
    current: 72,
    target: 90,
    gap: 18,
    status: 'moderate',
    lastAssessed: '2026-08-15',
    retentionConfidence: 'high',
    description: 'Sampling techniques, survey methodology, estimation procedures, and statistical inference for official surveys.',
  },
  {
    id: 'ai-analytics',
    name: 'AI & Data Analytics',
    shortName: 'AI & Data Analytics',
    current: 58,
    target: 85,
    gap: 27,
    status: 'critical',
    lastAssessed: '2026-07-20',
    retentionConfidence: 'low',
    description: 'Machine learning fundamentals, Big Data analytics, Python for data science, and AI applications in official statistics.',
  },
  {
    id: 'gis-geospatial',
    name: 'GIS / Geospatial Analysis',
    shortName: 'GIS / Geospatial',
    current: 68,
    target: 80,
    gap: 12,
    status: 'low',
    lastAssessed: '2026-08-01',
    retentionConfidence: 'medium',
    description: 'Geographic Information Systems, spatial data analysis, census mapping, and geospatial visualization.',
  },
  {
    id: 'data-quality',
    name: 'Data Quality & Governance',
    shortName: 'Data Quality',
    current: 61,
    target: 88,
    gap: 27,
    status: 'critical',
    lastAssessed: '2026-06-10',
    retentionConfidence: 'low',
    description: 'SQAF compliance, data dissemination standards, NMDS 2.0, metadata management, and quality assurance.',
  },
  {
    id: 'national-accounts',
    name: 'National Accounts & Macro Statistics',
    shortName: 'National Accounts',
    current: 78,
    target: 85,
    gap: 7,
    status: 'low',
    lastAssessed: '2026-08-20',
    retentionConfidence: 'high',
    description: 'National income accounting, GDP compilation, SNA framework, and macroeconomic indicator construction.',
  },
  {
    id: 'data-privacy',
    name: 'Data Privacy & DPDP Compliance',
    shortName: 'Data Privacy',
    current: 55,
    target: 82,
    gap: 27,
    status: 'critical',
    lastAssessed: '2026-05-15',
    retentionConfidence: 'low',
    description: 'DPDP Act 2023 compliance, data protection principles, anonymization techniques, and privacy-by-design.',
  },
];

// Forgetting curve / retention alerts
export const retentionAlerts = [
  {
    competency: 'AI & Data Analytics',
    lastAssessed: '6 weeks ago',
    retentionConfidence: 'Low',
    decay: 35,
    action: 'Refresher assessment recommended',
  },
  {
    competency: 'Data Quality & Governance',
    lastAssessed: '12 weeks ago',
    retentionConfidence: 'Low',
    decay: 42,
    action: 'Micro-learning module recommended',
  },
  {
    competency: 'Data Privacy & DPDP Compliance',
    lastAssessed: '15 weeks ago',
    retentionConfidence: 'Low',
    decay: 48,
    action: 'Full refresher course recommended',
  },
];

// Learning recommendations — mix of iGOT digital and NSSTA physical
export const learningRecommendations = [
  {
    id: 'lr-1',
    title: 'Introduction to AI in Governance',
    provider: 'iGOT Karmayogi',
    type: 'digital',
    duration: '8 hours',
    competency: 'AI & Data Analytics',
    gapAddress: 27,
    priority: 'high',
    reason: 'Recommended because your AI & Data Analytics competency is 27 points below the target for your current role.',
    modules: 4,
    integration: 'demo',
  },
  {
    id: 'lr-2',
    title: 'Data Quality Frameworks for Official Statistics',
    provider: 'iGOT Karmayogi',
    type: 'digital',
    duration: '6 hours',
    competency: 'Data Quality & Governance',
    gapAddress: 27,
    priority: 'high',
    reason: 'Recommended because your Data Quality & Governance competency is 27 points below the target for your current role.',
    modules: 3,
    integration: 'demo',
  },
  {
    id: 'lr-3',
    title: 'DPDP Act 2023 — Compliance for Statistical Officers',
    provider: 'iGOT Karmayogi',
    type: 'digital',
    duration: '4 hours',
    competency: 'Data Privacy & DPDP Compliance',
    gapAddress: 27,
    priority: 'high',
    reason: 'Recommended because your Data Privacy competency is 27 points below the target for your current role.',
    modules: 2,
    integration: 'demo',
  },
  {
    id: 'lr-4',
    title: 'Advanced Survey Methodology Workshop',
    provider: 'NSSTA TPAC',
    type: 'physical',
    duration: '5 days',
    competency: 'Statistical Analysis & Survey Design',
    gapAddress: 18,
    priority: 'medium',
    reason: 'Recommended because your Statistical Analysis competency has a moderate gap of 18 points. Physical training strengthens applied methodology skills.',
    location: 'NSSTA, Greater Noida',
    date: 'Oct 14-18, 2026',
    integration: 'demo',
  },
  {
    id: 'lr-5',
    title: 'Python for Official Statistics',
    provider: 'iGOT Karmayogi',
    type: 'digital',
    duration: '12 hours',
    competency: 'AI & Data Analytics',
    gapAddress: 27,
    priority: 'medium',
    reason: 'Prerequisite for advanced AI/ML courses. Builds programming foundation aligned with DIID modernization mandate.',
    modules: 6,
    integration: 'demo',
  },
  {
    id: 'lr-6',
    title: 'GIS Applications in Census Operations',
    provider: 'NSSTA TPAC',
    type: 'physical',
    duration: '3 days',
    competency: 'GIS / Geospatial Analysis',
    gapAddress: 12,
    priority: 'low',
    reason: 'Recommended to close the 12-point gap in GIS competency. Applied workshop format accelerates spatial analysis skills.',
    location: 'NSSTA, Greater Noida',
    date: 'Nov 5-7, 2026',
    integration: 'demo',
  },
];

// Assessment questions — Deep-IRT demo
export const assessmentQuestions = [
  {
    id: 1,
    question: 'In stratified random sampling, what is the primary advantage of proportional allocation over equal allocation?',
    options: [
      'It reduces the total sample size required',
      'It ensures each stratum is represented proportionally to its population share, improving precision for overall estimates',
      'It eliminates the need for a sampling frame',
      'It guarantees equal precision across all strata regardless of their variance',
    ],
    correct: 1,
    difficulty: 0.65,
    bloomsLevel: 'Application',
    competency: 'Statistical Analysis & Survey Design',
    explanation: 'Proportional allocation assigns sample sizes to strata in proportion to their population sizes, which generally provides better precision for overall population estimates compared to equal allocation.',
    discriminationIndex: 0.72,
  },
  {
    id: 2,
    question: 'Which machine learning technique is most appropriate for detecting anomalies in large-scale survey response datasets?',
    options: [
      'Linear regression with ordinary least squares',
      'Isolation Forest or Autoencoder-based anomaly detection',
      'Simple moving average smoothing',
      'Chi-square test for independence',
    ],
    correct: 1,
    difficulty: 0.78,
    bloomsLevel: 'Analysis',
    competency: 'AI & Data Analytics',
    explanation: 'Isolation Forest and Autoencoder models are specifically designed for anomaly detection in high-dimensional datasets, making them suitable for identifying irregular patterns in large-scale survey responses.',
    discriminationIndex: 0.81,
  },
  {
    id: 3,
    question: 'Under the Statistical Quality Assessment Framework (SQAF), which dimension primarily evaluates the timeliness and punctuality of statistical releases?',
    options: [
      'Relevance',
      'Accuracy and Reliability',
      'Timeliness and Punctuality',
      'Coherence and Comparability',
    ],
    correct: 2,
    difficulty: 0.45,
    bloomsLevel: 'Recall',
    competency: 'Data Quality & Governance',
    explanation: 'The SQAF framework defines Timeliness and Punctuality as a distinct quality dimension that measures the speed of data availability and adherence to scheduled release dates.',
    discriminationIndex: 0.58,
  },
  {
    id: 4,
    question: 'A statistical office plans to release microdata from a household consumption survey. Under the DPDP Act 2023, which approach best ensures compliance while maintaining data utility?',
    options: [
      'Releasing the complete dataset with all identifiers intact for maximum transparency',
      'Applying k-anonymity and data perturbation techniques to prevent re-identification while preserving analytical value',
      'Withholding all data from public access indefinitely',
      'Replacing all numerical values with categorical ranges',
    ],
    correct: 1,
    difficulty: 0.82,
    bloomsLevel: 'Evaluation',
    competency: 'Data Privacy & DPDP Compliance',
    explanation: 'The DPDP Act 2023 requires data protection while enabling legitimate use. K-anonymity and perturbation techniques balance privacy protection with data utility, aligning with privacy-by-design principles.',
    discriminationIndex: 0.76,
  },
  {
    id: 5,
    question: 'In the compilation of GDP estimates using the production approach, what does Gross Value Added (GVA) represent?',
    options: [
      'Total revenue of all enterprises minus government subsidies',
      'The difference between the value of output produced and the value of intermediate consumption',
      'The sum of all wages and salaries paid in the economy',
      'Total imports minus total exports for a given period',
    ],
    correct: 1,
    difficulty: 0.55,
    bloomsLevel: 'Understanding',
    competency: 'National Accounts & Macro Statistics',
    explanation: 'GVA measures the contribution to the economy by individual producers, industries, or sectors. It is calculated as the value of output minus the value of intermediate inputs consumed in the production process.',
    discriminationIndex: 0.69,
  },
];

// RAG-generated questions for trainer review
export const ragGeneratedQuestions = [
  {
    id: 'rq-1',
    question: 'According to the Statistical Quality Assessment Framework (SQAF), which of the following is NOT one of the prescribed quality dimensions for evaluating official statistics?',
    options: [
      'Relevance',
      'Accuracy and Reliability',
      'Market Competitiveness',
      'Accessibility and Clarity',
    ],
    correct: 2,
    difficulty: 'Medium',
    bloomsLevel: 'Recall',
    explanation: 'The SQAF prescribes quality dimensions including Relevance, Accuracy, Timeliness, Coherence, and Accessibility. Market Competitiveness is not a recognized statistical quality dimension.',
    sourceContext: 'Retrieved from: SQAF Guidelines, Chapter 3, Section 3.2 — "The framework identifies six core quality dimensions: Relevance, Accuracy and Reliability, Timeliness and Punctuality, Coherence and Comparability, Accessibility and Clarity, and Methodological Soundness."',
    status: 'pending',
    sourceGrounded: true,
    correctAnswerVerified: true,
    distractorsGenerated: true,
  },
  {
    id: 'rq-2',
    question: 'When implementing data dissemination protocols for the National Metadata Structure (NMDS 2.0), what is the primary purpose of standardized metadata documentation?',
    options: [
      'To increase the file size of statistical releases for security purposes',
      'To enable consistent discovery, understanding, and appropriate use of statistical data across organizations',
      'To replace the need for statistical analysis of the underlying data',
      'To restrict data access exclusively to senior government officials',
    ],
    correct: 1,
    difficulty: 'Medium',
    bloomsLevel: 'Understanding',
    explanation: 'NMDS 2.0 standardizes metadata to ensure that statistical data is discoverable, interpretable, and usable across different organizations and systems, supporting interoperability and data governance.',
    sourceContext: 'Retrieved from: NMDS 2.0 Guidelines, Section 1.4 — "Standardized metadata serves as the foundational layer enabling consistent discovery, correct interpretation, and appropriate use of statistical data products across institutional boundaries."',
    status: 'pending',
    sourceGrounded: true,
    correctAnswerVerified: true,
    distractorsGenerated: true,
  },
  {
    id: 'rq-3',
    question: 'In the context of MoSPI\'s data dissemination policy, which approach best addresses the tension between open data mandates and confidentiality requirements?',
    options: [
      'Publishing all data without any restrictions to maximize transparency',
      'Implementing a tiered access model with public-use files, licensed files, and secure research data centres',
      'Permanently archiving all sensitive datasets without public access',
      'Allowing unrestricted downloads but requiring users to delete data after 30 days',
    ],
    correct: 1,
    difficulty: 'Hard',
    bloomsLevel: 'Evaluation',
    explanation: 'A tiered access model balances openness with confidentiality by providing different levels of data access based on sensitivity and user authorization, which is consistent with international best practices.',
    sourceContext: 'Retrieved from: Data Dissemination Framework, Section 5.1 — "The recommended approach implements a three-tier access model: public-use microdata files with sufficient anonymization, licensed-access files for registered researchers, and secure on-site research data centres for highly sensitive unit-level records."',
    status: 'pending',
    sourceGrounded: true,
    correctAnswerVerified: true,
    distractorsGenerated: true,
  },
  {
    id: 'rq-4',
    question: 'What is the correct sequence of steps in the statistical data quality review process as defined by the SQAF?',
    options: [
      'Publication → Collection → Review → Archival',
      'Planning → Collection → Processing → Analysis → Dissemination → Evaluation',
      'Evaluation → Collection → Publication → Archival',
      'Collection → Publication → Processing → Review',
    ],
    correct: 1,
    difficulty: 'Medium',
    bloomsLevel: 'Application',
    explanation: 'The SQAF outlines a systematic quality review process following the statistical production lifecycle from planning through evaluation, ensuring quality controls at each stage.',
    sourceContext: 'Retrieved from: SQAF Guidelines, Chapter 2, Section 2.3 — "Quality review follows the complete statistical production lifecycle: Planning and Design, Data Collection, Processing and Editing, Analysis, Dissemination, and Post-release Evaluation."',
    status: 'pending',
    sourceGrounded: true,
    correctAnswerVerified: true,
    distractorsGenerated: true,
  },
  {
    id: 'rq-5',
    question: 'Which methodological consideration is most critical when transitioning from paper-based to electronic data collection (CAPI/CAWI) in large-scale household surveys?',
    options: [
      'Ensuring the electronic questionnaire is visually identical to the paper version',
      'Implementing real-time validation checks and skip logic to reduce data entry errors and improve response consistency',
      'Eliminating all open-ended questions to simplify digital processing',
      'Using only desktop computers to ensure data security',
    ],
    correct: 1,
    difficulty: 'Hard',
    bloomsLevel: 'Analysis',
    explanation: 'The primary advantage of electronic data collection is the ability to implement real-time validation, automated skip patterns, and consistency checks that significantly reduce errors compared to paper-based methods.',
    sourceContext: 'Retrieved from: Survey Methodology Guidelines, Section 7.2 — "Electronic data collection instruments must leverage real-time validation rules, automated routing logic, and built-in consistency checks as the primary quality improvement mechanism over paper-based administration."',
    status: 'pending',
    sourceGrounded: true,
    correctAnswerVerified: true,
    distractorsGenerated: true,
  },
];

// Admin dashboard data
export const workforceStats = {
  totalOfficers: 342,
  avgCompetencyScore: 64,
  criticalGaps: 127,
  trainingUtilization: 72,
  dgqiReadiness: 68,
  improvementRate: 12,
};

export const divisions = [
  { name: 'National Accounts Division', avgScore: 71, officers: 68, criticalGaps: 18 },
  { name: 'PLFS Division', avgScore: 65, officers: 52, criticalGaps: 24 },
  { name: 'Data Informatics & Innovation (DIID)', avgScore: 58, officers: 34, criticalGaps: 28 },
  { name: 'Social Statistics Division', avgScore: 69, officers: 48, criticalGaps: 19 },
  { name: 'Administrative Statistics (ASPD)', avgScore: 62, officers: 42, criticalGaps: 22 },
  { name: 'Price Statistics Division', avgScore: 67, officers: 56, criticalGaps: 16 },
  { name: 'Industrial Statistics Division', avgScore: 63, officers: 42, criticalGaps: 20 },
];

export const topSkillGaps = [
  { skill: 'AI & Data Analytics', officersAffected: 186, avgGap: 24 },
  { skill: 'Data Privacy & DPDP Compliance', officersAffected: 164, avgGap: 22 },
  { skill: 'Data Quality & Governance', officersAffected: 152, avgGap: 20 },
  { skill: 'Cloud Computing & Infrastructure', officersAffected: 134, avgGap: 28 },
  { skill: 'GIS / Geospatial Analysis', officersAffected: 98, avgGap: 15 },
];

export const competencyTrend = [
  { month: 'Mar', score: 54 },
  { month: 'Apr', score: 56 },
  { month: 'May', score: 58 },
  { month: 'Jun', score: 60 },
  { month: 'Jul', score: 62 },
  { month: 'Aug', score: 64 },
];

export const trainingEffectiveness = [
  { program: 'AI in Governance (iGOT)', preScore: 42, postScore: 67, improvement: 25 },
  { program: 'Survey Methods Workshop (NSSTA)', preScore: 58, postScore: 76, improvement: 18 },
  { program: 'Data Quality Fundamentals (iGOT)', preScore: 51, postScore: 69, improvement: 18 },
  { program: 'DPDP Compliance (iGOT)', preScore: 38, postScore: 58, improvement: 20 },
  { program: 'Python for Statistics (iGOT)', preScore: 35, postScore: 62, improvement: 27 },
];

// Architecture data
export const architectureLayers = [
  {
    id: 'frontend',
    name: 'Frontend',
    tech: 'React / Next.js',
    description: 'Responsive, multi-lingual user interface delivering the Competency Digital Twin dashboard, assessment interfaces, and admin analytics.',
    purpose: 'Provides role-based views for Officers, Trainers, and Administrators with real-time competency visualizations.',
    input: 'User interactions, role-based routing',
    output: 'Interactive dashboards, assessment forms, learning roadmaps',
  },
  {
    id: 'backend',
    name: 'Backend & API',
    tech: 'FastAPI (Python)',
    description: 'High-performance API gateway orchestrating request routing, session management, and database interactions.',
    purpose: 'Serves as the central orchestrator connecting the frontend with AI engines, databases, and external ecosystem APIs.',
    input: 'API requests from frontend, webhook callbacks',
    output: 'JSON responses, real-time updates, session tokens',
  },
  {
    id: 'intelligence',
    name: 'Core Intelligence',
    tech: 'Deep-IRT / DKT / LTR',
    description: 'AI engine combining Deep Knowledge Tracing with Item Response Theory for explainable competency estimation, plus Learning-to-Rank for personalized recommendations.',
    purpose: 'Mathematically computes latent skill gaps, models knowledge decay via Ebbinghaus curves, and ranks learning interventions.',
    input: 'Assessment responses, interaction history, FRAC targets',
    output: 'Competency scores (θ), gap analysis, prioritized learning paths',
  },
  {
    id: 'rag',
    name: 'RAG Assessment Engine',
    tech: 'LangChain + Open-source LLMs (Llama-3)',
    description: 'Retrieval-Augmented Generation pipeline that transforms uploaded documents into Bloom\'s Taxonomy-aligned MCQs with misconception-based distractors.',
    purpose: 'Automates assessment creation while ensuring questions are strictly grounded in source material, preventing hallucination.',
    input: 'Uploaded PDFs, Bloom\'s level selection, difficulty parameters',
    output: 'MCQs with explanations, source attribution, Sunbird Knowlg schema',
  },
  {
    id: 'data',
    name: 'Data Layer',
    tech: 'PostgreSQL + pgvector',
    description: 'Relational database with vector extension for semantic search capabilities, storing officer profiles, competency data, and document embeddings.',
    purpose: 'Provides structured storage for FRAC profiles and high-speed semantic retrieval for the RAG pipeline.',
    input: 'Competency records, document chunks, embedding vectors',
    output: 'Query results, nearest-neighbor semantic matches',
  },
  {
    id: 'ecosystem',
    name: 'Government Ecosystem',
    tech: 'Sunbird / iGOT / Jan-Parichay / NSSTA',
    description: 'Integration layer connecting with India\'s national capacity-building infrastructure for authentication, course management, and credentialing.',
    purpose: 'Ensures interoperability with the national digital public goods ecosystem rather than operating as an isolated silo.',
    input: 'OAuth2 tokens, course catalog queries, credential requests',
    output: 'Authenticated sessions, course data, verifiable credentials',
    integrationNote: 'Demo Integration — Mocked via local endpoints for MVP. Production-ready REST API wrappers built.',
  },
];

// Security features
export const securityFeatures = [
  {
    category: 'Authentication',
    items: [
      { name: 'Jan-Parichay SSO (OAuth2/OIDC)', status: 'demo', description: 'National single sign-on integration for verified government credentials.' },
      { name: 'Multi-Factor Authentication', status: 'proposed', description: 'Provided inherently by NIC Jan-Parichay infrastructure.' },
      { name: 'Session Geofencing', status: 'proposed', description: 'Location-based session validation via NIC framework.' },
    ],
  },
  {
    category: 'Authorization',
    items: [
      { name: 'Role-Based Access Control (RBAC)', status: 'implemented', description: 'Officer, Trainer, and Administrator roles with distinct permissions and data views.' },
      { name: 'Division-Level Data Isolation', status: 'proposed', description: 'Officers access only their division\'s sensitive methodologies.' },
    ],
  },
  {
    category: 'Data Protection',
    items: [
      { name: 'AES-256 Encryption at Rest', status: 'proposed', description: 'All Competency Digital Twin profiles and assessment histories encrypted.' },
      { name: 'TLS 1.3 In-Transit Encryption', status: 'proposed', description: 'All API communications secured via modern transport layer security.' },
      { name: 'DPDP Act 2023 Compliance', status: 'proposed', description: 'Zero PII transmission to external APIs. Privacy-by-design architecture.' },
    ],
  },
  {
    category: 'AI Safety',
    items: [
      { name: 'RAG Grounding Constraints', status: 'implemented', description: 'LLM strictly constrained to generate from retrieved document chunks. No parametric memory reliance.' },
      { name: 'Prompt Injection Prevention', status: 'proposed', description: 'System prompting and semantic guardrails prevent jailbreak attempts.' },
      { name: 'Human-in-the-Loop Review', status: 'implemented', description: 'All AI-generated assessments require trainer approval before deployment.' },
    ],
  },
  {
    category: 'Data Sovereignty',
    items: [
      { name: 'Open-Source LLMs (Llama-3)', status: 'proposed', description: 'No proprietary data transmitted to commercial AI APIs.' },
      { name: 'MeitY MeghRaj GI Cloud Hosting', status: 'proposed', description: 'Deployed within government-empanelled cloud infrastructure.' },
      { name: 'Sunbird RC Verifiable Credentials', status: 'proposed', description: 'Cryptographically signed JSON-LD credentials eliminate credential fraud.' },
    ],
  },
];

// Certificates matching Screen 9 in mockup
export const certificates = [
  {
    id: 'cert-1',
    title: 'Official Statistics Fundamentals',
    issuedDate: '15 May 2024',
    issuer: 'Ministry of Statistics & Programme Implementation',
    certificateNo: 'MOSPI-2024-8841',
    credentialUrl: '#',
  },
  {
    id: 'cert-2',
    title: 'Data Visualization with Python',
    issuedDate: '10 May 2024',
    issuer: 'iGOT Karmayogi',
    certificateNo: 'IGOT-2024-9923',
    credentialUrl: '#',
  },
  {
    id: 'cert-3',
    title: 'Data Quality Assurance',
    issuedDate: '05 Apr 2024',
    issuer: 'National Statistical Systems Training Academy',
    certificateNo: 'NSSTA-2024-4412',
    credentialUrl: '#',
  },
];

// Available Assessments matching Screen 5 in mockup
export const availableAssessments = [
  {
    id: 'ass-1',
    title: 'Official Statistics Fundamentals Quiz',
    questionsCount: 20,
    durationMinutes: 30,
    dueDate: '25 May 2024',
    status: 'available',
    competency: 'Statistical Analysis & Survey Design',
  },
  {
    id: 'ass-2',
    title: 'Data Quality Assessment',
    questionsCount: 15,
    durationMinutes: 25,
    dueDate: '28 May 2024',
    status: 'available',
    competency: 'Data Quality & Governance',
  },
  {
    id: 'ass-3',
    title: 'Statistical Methods Quiz',
    questionsCount: 25,
    durationMinutes: 35,
    dueDate: '02 Jun 2024',
    status: 'available',
    competency: 'Statistical Analysis & Survey Design',
  },
  {
    id: 'ass-4',
    title: 'Data Visualization Quiz',
    questionsCount: 20,
    durationMinutes: 30,
    dueDate: '05 Jun 2024',
    status: 'available',
    competency: 'AI & Data Analytics',
  },
];

// Skill Gap details matching Screen 2 in mockup
export const skillGapBreakdown = {
  overallScore: 68,
  distribution: {
    expert: 20,
    proficient: 48,
    developing: 22,
    beginner: 10,
  },
  topGaps: [
    { skill: 'Advanced Statistics', current: 40, required: 80, gap: 40 },
    { skill: 'Machine Learning', current: 30, required: 78, gap: 48 },
    { skill: 'Data Visualization', current: 60, required: 85, gap: 25 },
  ],
  competencyAreas: [
    { name: 'Data Collection', score: 75, status: 'Proficient', badgeClass: 'badge-success' },
    { name: 'Data Management', score: 70, status: 'Proficient', badgeClass: 'badge-success' },
    { name: 'Statistical Analysis', score: 65, status: 'Developing', badgeClass: 'badge-warning' },
    { name: 'Data Visualization', score: 60, status: 'Developing', badgeClass: 'badge-warning' },
    { name: 'Communication', score: 80, status: 'Proficient', badgeClass: 'badge-success' },
  ],
};

// Course curriculum data matching Screen 4 (Course Player)
export const coursePlayerDetails = {
  id: 'course-data-viz',
  title: 'Data Visualization with Python',
  overallProgress: 68,
  currentModule: '1.2 Importance of Data Visualization?',
  videoDuration: '8:45',
  videoCurrentTime: '2:16',
  sections: [
    {
      title: '1. Introduction',
      lessons: [
        { id: '1.1', name: 'Course Overview', duration: '4:20', completed: true },
        { id: '1.2', name: 'Importance of Data Viz', duration: '8:45', active: true, completed: false },
        { id: '1.3', name: 'Tools & Libraries', duration: '6:15', completed: false },
      ],
    },
    {
      title: '2. Basic Visualizations',
      lessons: [
        { id: '2.1', name: 'Line Charts', duration: '10:10', completed: false },
        { id: '2.2', name: 'Bar Charts', duration: '9:30', completed: false },
        { id: '2.3', name: 'Pie Charts', duration: '7:45', completed: false },
      ],
    },
    {
      title: '3. Advanced Visualizations',
      lessons: [
        { id: '3.1', name: 'Scatter Plots', duration: '12:00', completed: false },
        { id: '3.2', name: 'Heatmaps', duration: '11:15', completed: false },
        { id: '3.3', name: 'Box Plots', duration: '9:50', completed: false },
      ],
    },
    {
      title: '4. Real World Projects',
      lessons: [
        { id: '4.1', name: 'Project 1: PLFS Survey Dashboard', duration: '25:00', completed: false },
        { id: '4.2', name: 'Project 2: CPI Price Trends Viz', duration: '30:00', completed: false },
      ],
    },
  ],
};

