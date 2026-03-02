import loginPageImg from '../assets/Timesheet.png'
import backgroundImage from '../assets/2650401.jpg'
import designImage from '../assets/26760925_2112.i301.031.S.m004.c13.UI_and_UX_designers_concepts_isometric_composition-removebg-preview.png'
import projectMgmtImg from '../assets/Project management.png'
import recruitmentImg from '../assets/AI Powered Recruitment System.png'
import procurementImg from '../assets/AI Procurement Workflow.png'
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
        images: [projectMgmtImg, loginPageImg, backgroundImage, designImage, loginPageImg],
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
        fullDescription: 'An intelligent talent acquisition platform designed to streamline hiring through automation, advanced analytics, and data-driven evaluation. The system centralizes recruitment activities into a unified digital environment, enabling organizations to identitfy, assess, and select candidates effectively while maintaining consistency, transparency, and control.',
        features: [
            { title: 'Hiring Efficiency', desc: 'Automates repetitive tasks and accelerates recruitment cycles for faster onboarding.' },
            { title: 'Candidate Matching', desc: 'AI-driven evaluation enhances role alignment and selection accuracy through data.' },
            { title: 'Transparency', desc: 'Standardized processes ensure structured and accountable hiring decisions across departments.' },
            { title: 'Time-to-Hire', desc: 'Streamlined workflows enable faster candidate identification and onboarding readiness.' }
        ],
        tech: ['Python', 'TensorFlow', 'NLP', 'React'],
        advancedFeatures: [
            {
                title: 'Intelligent Core Capabilities',
                desc: 'Advanced evaluation models designed for precise candidate matching and screening.',
                subItems: [
                    { label: 'Automated Candidate Screening', content: 'Automatically analyzes applications against job requirements, filtering and ranking candidates based on relevance.' },
                    { label: 'AI-Driven Skill Assessment', content: 'Models assess candidate competencies and experience alignment using structured data analysis.' },
                    { label: 'Natural Language Evaluation', content: 'Processes resumes and candidate responses to identify relevant skills and contextual fit.' }
                ],
                image: recruitmentImg
            },
            {
                title: 'Structured Workflow & Automation',
                desc: 'Streamlining recruitment stages through configurable digital processes.',
                subItems: [
                    { label: 'Configurable Workflows', content: 'Manage application review, evaluation, and shortlisting through controlled, multi-stage approval processes.' },
                    { label: 'Automated Resume Parsing', content: 'High-speed extraction of text and metadata from resumes to standardize candidate profiles.' },
                    { label: 'Centralized Tracking', content: 'A unified database for all candidate information, historical applications, and communication logs.' }
                ],
                image: backgroundImage
            },
            {
                title: 'Recruitment Analytics & Strategy',
                desc: 'Data-driven insights to optimize workforce acquisition and performance monitoring.',
                subItems: [
                    { label: 'Performance Dashboards', content: 'Real-time visibility into hiring pipelines, candidate status, and recruitment cycle performance metrics.' },
                    { label: 'Objective Evaluation', content: 'Standardized scoring and assessment rules ensure consistency and fairness in selection decisions.' },
                    { label: 'Scalable Architecture', content: 'Designed to adapt to organizational policies and integrate with enterprise HR and onboarding systems.' }
                ],
                image: designImage
            }
        ],
        securityFramework: {
            title: 'Security & Governance',
            desc: 'Ensuring secure handling of candidate data through role-based access and traceable workflows.',
            items: [
                { label: 'Role-Based Access Control', content: 'Granular permissions ensure that only authorized HR and management personnel can access sensitive data.' },
                { label: 'Traceable Audit Logs', content: 'All recruitment actions, modifications, and approvals are recorded for full governance and compliance.' },
                { label: 'Data Sovereignty', content: 'Built-in safeguards for secure record management and confidentiality of candidate information.' }
            ]
        },
        gradient: 'from-[#f59e0b] via-[#ef4444] to-[#ec4899]',
        images: [recruitmentImg, backgroundImage, designImage, caldimLogo, backgroundImage],
        demoVideo: demoVid,
        icon: PieChart,
        year: '2024',
        client: 'TalentTech AI',
        theme: 'orange'
    },
    {
        id: 5,
        title: 'AI-Powered Procurement System',
        tagline: 'End-to-End Procurement Automation',
        fullDescription: 'The AI-Powered Procurement System is an intelligent digital platform designed to streamline and optimize the end-to-end procurement lifecycle through automation, analytics, and data-driven decision-making. The system centralizes purchasing activities, vendor management, and approval workflows into a unified environment that enhances operational transparency, cost control, and compliance.\n\nBy leveraging AI-driven insights and structured process management, the platform enables organizations to make informed purchasing decisions, reduce manual effort, and improve procurement efficiency across departments.',
        isPremiumLayout: true,
        hero: {
            title: 'AI-Powered Procurement System',
            subtitle: 'Transforming fragmented manual procurement into a unified, intelligent ecosystem.',
            description: 'Our AI-driven environment streamlines complex global operations while maximizing cost efficiency and vendor compliance.'
        },
        projectScope: {
            title: 'Project Scope & Objectives',
            card1: {
                title: 'Fragmented Chaos',
                content: 'Legacy procurement suffered from manual data entry, siloed multi-regional approvals, and zero visibility into regional spend tracks.',
                items: ['Manual PO Processing', 'Invisible Spend Categories', 'Paper-based compliance']
            },
            card2: {
                title: 'AI-Driven Future',
                content: 'Our solution establishes an automated workflow with predictive insights and 100% centralized data.',
                items: ['Automated Intelligent Workflows', 'Predictive Spend Forecasting', 'Centralized Vendor Intelligence']
            }
        },
        businessChallenges: {
            title: 'Business Challenges',
            desc: 'Organizations often encounter challenges in procurement practices due to manual processes and siloed data. We address these by:',
            items: [
                'Automating requisition, approval, and purchase workflows',
                'Providing real-time visibility into procurement activities and spending',
                'Standardizing vendor selection and evaluation processes',
                'Reducing processing errors and cycle times',
                'Supporting compliance and audit readiness'
            ]
        },
        features: [
            { title: 'Transparency', desc: 'Complete visibility into procurement activities and spending.' },
            { title: 'Cost Optimization', desc: 'Data-driven insights support smarter purchasing.' },
            { title: 'Faster Processing', desc: 'Automated workflows reduce cycle times.' },
            { title: 'Compliance', desc: 'Standardized processes ensure accountability.' }
        ],
        coreCapabilities: [
            { title: 'Intelligent Requisition', content: 'Users create, submit, and track purchase requests through structured workflows ensuring policy compliance.', icon: 'Sparkles' },
            { title: 'Vendor Insights', content: 'Analyzes supplier performance, pricing trends, and procurement patterns to support informed selection.', icon: 'BarChart3' },
            { title: 'Automated Approval', content: 'Configurable multi-level approval processes streamline authorization and reduce delays.', icon: 'Shield' },
            { title: 'Real-Time Visibility', content: 'Centralized dashboards provide insight into request status, purchasing trends, and vendor metrics.', icon: 'PieChart' },
            { title: 'Reporting & Analytics', content: 'Comprehensive tools generate insights to support budgeting, forecasting, and strategic planning.', icon: 'TrendingUp' }
        ],
        keyFeaturesDetail: {
            title: 'Key Features Detail',
            subtitle: 'A closer look at the advanced technical modules powering the transformation.',
            items: [
                { title: 'Centralized Data Management', content: 'Single source of truth for all procurement data across departments and regions.', icon: 'Shield' },
                { title: 'AI-Assisted Evaluation', content: 'Intelligent scoring for vendor evaluation based on performance and risk factors.', icon: 'Sparkles' },
                { title: 'Secure Access Control', content: 'Role-based permissions and secure data handling for industrial confidentiality.', icon: 'Shield' },
                { title: 'Integration Readiness', content: 'Ready to integrate with existing ERP and finance systems for unified data flow.', icon: 'TrendingUp' }
            ]
        },
        businessValueStats: [
            { value: '70%', label: 'FASTER PROCESSING', desc: 'Reduction in procurement cycle times' },
            { value: '22%', label: 'COST OPTIMIZATION', desc: 'Average reduction in operational spend' },
            { value: '100%', label: 'COMPLIANCE', desc: 'Automated audit trails and governance' },
            { value: '95%', label: 'ACCURACY', desc: 'In spend forecasting and planning' },
            { value: '0.5s', label: 'VISIBILITY', desc: 'Real-time data retrieval and reporting' }
        ],
        securityGovernance: {
            title: 'Security & Governance',
            desc: 'The system enforces structured control through role-based permissions, secure data handling, and comprehensive activity tracking.',
            items: [
                { title: 'Role-Based Permissions', content: 'Granular control over who can view and approve sensitive procurement data.', icon: 'Shield' },
                { title: 'Secure Data Handling', content: 'Advanced encryption and secure protocols for all transaction records.', icon: 'Shield' },
                { title: 'Traceable Actions', content: 'Every procurement action is recorded, ensuring full auditability and integrity.', icon: 'Shield' },
                { title: 'Compliance Monitoring', content: 'Automated checks against organizational and regulatory policies.', icon: 'Shield' }
            ]
        },
        tech: ['AI/ML', 'Cloud Infrastructure', 'React', 'Node.js'],
        gradient: 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]',
        images: [procurementImg, loginPageImg, designImage, backgroundImage, caldimLogo],
        demoVideo: demoVid,
        icon: Sparkles,
        year: '2024',
        client: 'Strategic Procurement',
        theme: 'blue'
    },
]
