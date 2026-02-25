import loginPageImg from '../assets/loginpage.jpg'
import backgroundImage from '../assets/2650401.jpg'
import designImage from '../assets/26760925_2112.i301.031.S.m004.c13.UI_and_UX_designers_concepts_isometric_composition-removebg-preview.png'
import caldimLogo from '../assets/caldim-logo.png'
import demoVid from '../assets/video/videoplayback.mp4'
import { BarChart3, TrendingUp, Shield, PieChart, Sparkles } from 'lucide-react'

export const projectsData = [
    {
        id: 1,
        title: 'Employee Timesheet',
        tagline: 'Workforce Monitoring & Transparency',
        fullDescription: 'The Employee Timesheet system is a comprehensive software solution designed to streamline time tracking and workforce monitoring through a centralized digital platform. It brings intelligent automation to organizational workflows.',
        features: [
            { title: 'Transparency', desc: 'Complete visibility into hours worked, projects assigned, and productivity metrics' },
            { title: 'Traceability', desc: 'Full audit trail of time entries, approvals, and modifications for compliance' },
            { title: 'Faster Settlement', desc: 'Automated payroll processing with reduced cycle times and error elimination' },
            { title: 'Productivity', desc: 'Data-driven insights to optimize workforce allocation and performance' }
        ],
        tech: ['React', 'Node.js', 'SQL', 'Automation'],
        advancedFeatures: [
            {
                title: 'Advanced Core Functionality',
                desc: 'Engineered for field-readiness and high-security enterprise environments.',
                subItems: [
                    { label: 'Geofencing & Mobile Validation', content: 'Uses GPS geofencing to ensure employees are at designated work locations before allowing clock-ins.' },
                    { label: 'Biometric & MFA', content: 'Integration with facial recognition or fingerprint scanning to prevent "buddy punching" and secure data.' },
                    { label: 'Offline Mode', content: 'Local hour logging in remote areas with automatic synchronization once connectivity is restored.' }
                ],
                image: loginPageImg
            },
            {
                title: 'Intelligent Automation & Integration',
                desc: 'Streamlining payroll and project tracking through a unified technical architecture.',
                subItems: [
                    { label: 'Predictive Scheduling (AI)', content: 'Uses historical data to forecast staffing needs, helping managers avoid understaffing or expensive overtime.' },
                    { label: 'Unified Tech Stack (ERP/HRMS)', content: 'Seamless API integrations with Jira, Asana, and SAP to directly push billable hours and sync PTO.' }
                ],
                image: backgroundImage
            },
            {
                title: 'Employee Experience (The "Trust" Layer)',
                desc: 'Transparency is a two-way street; modern systems focus on trust rather than surveillance.',
                subItems: [
                    { label: 'Self-Service Dashboards', content: 'Employees view productivity trends, check PTO balances, and dispute missed punches directly.' },
                    { label: 'Privacy-First Monitoring', content: 'Prioritizes task completion over intrusive keystroke or webcam logging to foster a healthy culture.' }
                ],
                image: designImage
            }
        ],
        complianceFramework: {
            title: 'Compliance & Legal Safeguards',
            desc: 'Built-in logic to handle global labor laws and data sovereignty requirements.',
            items: [
                { label: 'Legal "Break Lockouts"', content: 'Physically prevents clock-ins until legally mandated rest periods have elapsed.' },
                { label: 'Data Sovereignty (SOC2/GDPR)', content: 'Built-in templates ensure data is stored according to local retention laws like the US FLSA.' },
                { label: 'Automated Overtime Logic', content: 'Calculates daily and weekly overtime based on local labor codes, eliminating payroll manual error.' }
            ]
        },
        gradient: 'from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff]',
        images: [loginPageImg, backgroundImage, designImage, loginPageImg, backgroundImage],
        demoVideo: demoVid,
        icon: BarChart3,
        year: '2024',
        client: 'Enterprise Systems',
        theme: 'blue'
    },
    {
        id: 2,
        title: 'Project Management',
        tagline: 'Planning, Execution & Monitoring',
        fullDescription: 'The Project Management system is a comprehensive software solution designed to streamline planning, execution, and monitoring of organizational projects through a centralized digital platform. It enables efficient task management and intelligent resource utilization.',
        features: [
            { title: 'Task Management', desc: 'Create, assign, and track tasks for structured project execution.' },
            { title: 'Resource Allocation', desc: 'Assign and manage resources efficiently across projects.' },
            { title: 'Timeline Tracking', desc: 'Track milestones, progress, and project deadlines in real time.' },
            { title: 'Document Management', desc: 'Securely organize and control access to project documents.' },
            { title: 'Collaboration', desc: 'Facilitate effective communication and teamwork across teams.' }
        ],
        tech: ['React', 'PostgreSQL', 'Socket.io', 'Framer Motion'],
        advancedFeatures: [
            {
                title: 'Advanced Planning & Strategy',
                desc: 'Strategic planning tools designed to align technical tasks with industrial timelines.',
                subItems: [
                    { label: 'Gantt Chart Visualization', content: 'Interactive timelines to manage task dependencies and critical project paths.' },
                    { label: 'Critical Path Analysis', content: 'Automatically identifies the sequence of steps that determine the project finish date.' },
                    { label: 'Work Breakdown Structure', content: 'Decomposes complex projects into manageable work packages and sub-tasks.' }
                ],
                image: backgroundImage
            },
            {
                title: 'Execution & Operational Excellence',
                desc: 'Essential features for maintaining high quality in complex automation workflows.',
                subItems: [
                    { label: 'Automated Workflows', content: 'Trigger actions based on status changes, like notifying QA when extraction is complete.' },
                    { label: 'Time Tracking', content: 'Log billable and non-billable hours directly against tasks to monitor labor costs.' },
                    { label: 'Kanban Boards', content: 'Visual "Drag and Drop" interfaces for agile team flow management.' }
                ],
                image: designImage
            },
            {
                title: 'Monitoring, Analytics & Reporting',
                desc: 'Data-driven oversight to mitigate risks and ensure stakeholder transparency.',
                subItems: [
                    { label: 'Real-time Dashboards', content: 'KPI tracking including "Planned vs. Actual" progress and budget burn rates.' },
                    { label: 'Risk Management Matrix', content: 'Identify, assess, and mitigate technical risks before they impact the timeline.' },
                    { label: 'Automated Status Reports', content: 'Generate weekly PDF summaries for stakeholders without manual data entry.' }
                ],
                image: loginPageImg
            }
        ],
        securityFramework: {
            title: 'Security & Document Control',
            desc: 'Professional-grade reliability with granular access and full auditability.',
            items: [
                { label: 'RBAC Access Control', content: 'Define granular permissions so only authorized personnel can view sensitive documents.' },
                { label: 'Version Control Integration', content: 'Link tasks to GitHub or private repositories to track code changes alongside milestones.' },
                { label: 'Audit Logs', content: 'A transparent history of every change made for full compliance and accountability.' }
            ]
        },
        gradient: 'from-[#6366f1] via-[#a855f7] to-[#d946ef]',
        images: [designImage, loginPageImg, backgroundImage, designImage, loginPageImg],
        demoVideo: demoVid,
        icon: TrendingUp,
        year: '2023',
        client: 'AlphaCore Systems',
        theme: 'purple'
    },
    {
        id: 3,
        title: 'Inventory Management',
        tagline: 'Stock Optimization & ERP Integration',
        fullDescription: 'A robust Inventory Management System designed to provide real-time control over stock levels, streamline replenishment workflows, and ensure seamless synchronization across organizational warehouses and ERP platforms.',
        features: [
            { title: 'Stock Monitoring', desc: 'Real-time tracking of inventory levels across multiple locations.' },
            { title: 'Automated Replenishment', desc: 'Intelligent alerts and triggers for stock reordering to prevent stockouts.' },
            { title: 'Stock Transfers', desc: 'Simplified management of movement between warehouses or departments.' },
            { title: 'ERP Integration', desc: 'Seamless data exchange with enterprise planning systems for unified operations.' },
            { title: 'Warehouse Management', desc: 'Optimize storage and organization for faster picking and shipping.' }
        ],
        tech: ['React', 'Python', 'PostgreSQL', 'SAP Integration'],
        advancedFeatures: [
            {
                title: 'Real-Time Multi-Node Tracking',
                desc: 'Centralized control system for monitoring stock levels across global warehouse networks.',
                subItems: [
                    { label: 'Precision Monitoring', content: 'Real-time tracking of inventory levels across multiple locations with zero-latency synchronization.' },
                    { label: 'Warehouse Mapping', content: 'Digital twins of storage facilities to optimize space utilization and faster picking routes.' }
                ],
                image: backgroundImage
            },
            {
                title: 'Predictive Replenishment Logic',
                desc: 'AI-driven replenishment workflows that eliminate stockouts and minimize excess inventory.',
                subItems: [
                    { label: 'Intelligent Alerts', content: 'Automated triggers for stock reordering based on historical demand patterns and lead times.' },
                    { label: 'Vendor Optimization', content: 'Sync stock needs directly with suppliers to ensure a seamless replenishment cycle.' }
                ],
                image: designImage
            },
            {
                title: 'Dynamic Stock Distribution',
                desc: 'Streamlining the movement of goods between warehouses and departments with intelligent routing.',
                subItems: [
                    { label: 'Stock Transfers', content: 'Simplified management of movement between warehouses with full traceability and audit trails.' },
                    { label: 'Logistics Integration', content: 'Direct connection with shipping carriers to track incoming and outgoing stock movements.' }
                ],
                image: loginPageImg
            }
        ],
        inventoryFramework: {
            title: 'Supply Chain Synchronization',
            desc: 'Deep integration architecture that connects inventory data with enterprise-level planning.',
            items: [
                { label: 'ERP Integration', content: 'Seamless data exchange with SAP, Oracle, and Microsoft Dynamics for unified enterprise operations.' },
                { label: 'Inventory Audit Trails', content: 'Comprehensive historical records of every stock movement for legal and financial compliance.' },
                { label: 'Warehouse Analytics', content: 'High-level KPI dashboards to monitor stock turnover, aging inventory, and storage efficiency.' }
            ]
        },
        gradient: 'from-[#22c55e] via-[#10b981] to-[#3b82f6]',
        images: [backgroundImage, designImage, loginPageImg, backgroundImage, designImage],
        demoVideo: demoVid,
        icon: Shield,
        year: '2023',
        client: 'Logistics Pro',
        theme: 'green'
    },
    {
        id: 4,
        title: 'AI Powered Recruitment System',
        tagline: 'Intelligent Talent Acquisition',
        fullDescription: 'The AI-Powered Recruitment System is an intelligent talent acquisition platform designed to streamline hiring through automation, advanced analytics, and data-driven decision-making. It enhances recruitment efficiency by leveraging AI to screen and prioritize high-potential applicants.',
        features: [
            { title: 'Automated Candidate Screening', desc: 'Automatically filters and ranks applicants based on job requirements and qualifications.' },
            { title: 'AI Driven Skill Assessment', desc: 'Evaluates candidate competencies using intelligent, data-based analysis.' },
            { title: 'Natural Language Evaluation', desc: 'Analyzes resumes and responses using advanced language understanding.' },
            { title: 'Bias Free Short Listing', desc: 'Ensures fair candidate selection through objective, AI-based evaluation.' }
        ],
        tech: ['Python', 'TensorFlow', 'NLP', 'React'],
        advancedFeatures: [
            {
                title: 'Predictive Success Modeling',
                desc: 'Beyond just matching keywords, the system uses historical data to predict which candidates are likely to stay long-term and perform well.',
                subItems: [
                    { label: 'Performance Correlation', content: 'Analyzes the traits of your current top performers to create a "success profile" for new applicants.' },
                    { label: 'Retention Scoring', content: 'Identifies patterns in career progression that suggest a higher likelihood of long-term commitment.' }
                ],
                image: backgroundImage
            },
            {
                title: 'Behavioral & Soft Skill Mapping',
                desc: 'Since technical skills are only half the battle, the AI evaluates cultural fit and "power skills."',
                subItems: [
                    { label: 'Sentiment Analysis', content: 'Scans video interview transcripts or open-ended questions to assess enthusiasm, leadership potential, and communication style.' },
                    { label: 'Gamified Assessments', content: 'Uses short, interactive logic puzzles to measure cognitive flexibility and problem-solving under pressure.' }
                ],
                image: designImage
            },
            {
                title: 'Automated Interview Orchestration',
                desc: 'Reduces the "time-to-hire" by removing the manual back-and-forth of scheduling.',
                subItems: [
                    { label: 'Smart Scheduling', content: 'Syncs with recruiters\' calendars and automatically invites top-ranked candidates to book slots.' },
                    { label: 'AI Video Interviewing', content: 'An asynchronous tool that records candidate responses to preset questions and provides a "first-pass" evaluation for recruiters to review.' }
                ],
                image: loginPageImg
            }
        ],
        biasFreeFramework: {
            title: 'The "Bias-Free" Framework (Technical Depth)',
            desc: 'To make "bias-free" claims credible, the system implements specific algorithmic guardrails:',
            items: [
                { label: 'Anonymized Pipeline', content: 'Automatically masks names, genders, ages, and photos during the initial screening phase to prevent unconscious bias.' },
                { label: 'Adverse Impact Monitoring', content: 'Real-time audits that alert HR if the AI’s ranking algorithm is disproportionately filtering out a protected demographic.' },
                { label: 'Explainable AI (XAI)', content: 'Provides a "Reasoning Score" for every candidate, showing exactly why the AI ranked them highly (e.g., "5 years of Python experience," not "went to an Ivy League school").' }
            ]
        },
        gradient: 'from-[#f59e0b] via-[#ef4444] to-[#ec4899]',
        images: [caldimLogo, backgroundImage, designImage, caldimLogo, backgroundImage],
        demoVideo: demoVid,
        icon: PieChart,
        year: '2024',
        client: 'TalentTech AI',
        theme: 'orange'
    },
    {
        id: 5,
        title: 'AI Procurement Workflow',
        tagline: 'End-to-End Procurement Automation',
        fullDescription: 'CALBUY is an AI-powered procurement automation platform designed to streamline the process from CAD drawing upload to vendor selection and RFQ evaluation. The system leverages AI to generate BOMs, assist in vendor selection, and provide intelligent scoring.',
        features: [
            { title: 'Automation', desc: 'End-to-end automation from CAD uploads to Purchase Order' },
            { title: 'Efficiency', desc: 'Reduces manual effort, cycle time, and procurement errors' },
            { title: 'Intelligence', desc: 'Combines AI intelligence with human approvals' },
            { title: 'Scalability', desc: 'Designed for growth, compliance, and full auditability' }
        ],
        tech: ['AI/ML', 'CAD Analysis', 'Cloud Infrastructure', 'React'],
        advancedFeatures: [
            {
                title: 'Automation: Pixels to Purchase Orders',
                desc: 'CALBUY bridges the gap between digital design and physical part procurement.',
                subItems: [
                    { label: 'CAD-to-BOM Extraction', content: 'AI utilizes computer vision and metadata parsing to "read" models and drawings, generating structured BOMs.' },
                    { label: 'Auto-RFQ Generation', content: 'Automatically creates quote packages with technical drawings, NDAs, and quality requirements.' },
                    { label: 'Touchless PO Issuance', content: 'Configurable "Auto-Win" criteria for recurring parts enable automatic Purchase Order issuance.' }
                ],
                image: backgroundImage
            },
            {
                title: 'Efficiency: Compressed Cycle Times',
                desc: 'Targeting friction points to eliminate data entry errors and parallelize sourcing.',
                subItems: [
                    { label: 'Parallel Sourcing', content: 'Manages simultaneous bidding, normalizing currencies and lead times into a single "apples-to-apples" view.' },
                    { label: 'Real-time Collaboration', content: 'Centralized Q&A within the platform prevents fragmented email chains and production delays.' },
                    { label: 'Scoring Engine', content: 'Intelligence that optimizes for Total Cost of Ownership (TCO) rather than just the cheapest price.' }
                ],
                image: designImage
            }
        ],
        procurementFramework: {
            title: 'Scalability & Compliance Guardrails',
            desc: 'Future-proofing procurement with full auditability and global compliance standards.',
            items: [
                { label: 'Full Auditability', content: 'Timestamped history of vendor selection, approvals, and CAD versions for ISO and AS9100 compliance.' },
                { label: 'Global Compliance', content: 'Automatic screening against restricted party lists and validation of ITAR/RoHS/REACH certifications.' },
                { label: 'ERP Symbiosis', content: 'Push clean, structured data into SAP, Oracle, or NetSuite for synchronized financial and physical records.' }
            ]
        },
        gradient: 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]',
        images: [backgroundImage, loginPageImg, designImage, backgroundImage, caldimLogo],
        demoVideo: demoVid,
        icon: Sparkles,
        year: '2024',
        client: 'CALBUY Platform',
        theme: 'blue'
    },
]
