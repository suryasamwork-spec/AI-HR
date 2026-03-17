import loginPageImg from '../assets/Timesheet.png'
import backgroundImage from '../assets/2650401.jpg'
import designImage from '../assets/26760925_2112.i301.031.S.m004.c13.UI_and_UX_designers_concepts_isometric_composition-removebg-preview.png'
import projectMgmtImg from '../assets/Project management.png'
import recruitmentImg from '../assets/AI Powered Recruitment System.png'
import procurementImg from '../assets/AI Powered Recruitment System.png'
import caldimLogo from '../assets/caldim-logo.png'
import demoVid from '../assets/video/videoplayback.mp4'
import caltimsDemoVid from '../assets/video/cvideo.mp4'
import caltimsDemoVid2 from '../assets/video/cvideo 2.mp4'
import secondProductVid from '../assets/video/IMG_4634.MOV'

// CALTIMS specific images
import caltimsAdmin from '../assets/CALTIMS_images/admin.png'
import caltimsCalin from '../assets/CALTIMS_images/calin.png'
import caltimsDashboard from '../assets/CALTIMS_images/dashboard (1).png'
import caltimsLogin from '../assets/CALTIMS_images/login.png'
import caltimsTimesheet from '../assets/CALTIMS_images/timesheet.png'

// CALRIMS specific images
import calrims1 from '../assets/CALRIMS_images/IMG-20260308-WA0007.jpg.jpeg'
import calrims2 from '../assets/CALRIMS_images/IMG-20260308-WA0012.jpg.jpeg'
import calrims3 from '../assets/CALRIMS_images/IMG-20260308-WA0013.jpg.jpeg'
import calrims4 from '../assets/CALRIMS_images/Gemini_Generated_Image_6xd1pz6xd1pz6xd1.png'
import calrims5 from '../assets/CALRIMS_images/Gemini_Generated_Image_jrbqxjjrbqxjjrbq.png'

import { BarChart3, TrendingUp, Shield, PieChart, Sparkles, Code2, Cpu, Layers, Zap, Terminal } from 'lucide-react'

export const projectsData = [
    {
        id: 1,
        title: 'CALTIMS - timesheet management system',
        tagline: 'Workforce Monitoring & Transparency',
        fullDescription: 'The Employee Timesheet Management System is a centralized digital platform designed to automate time tracking, streamline approval workflows, and provide real-time visibility into workforce activity. The system replaces manual and fragmented tracking methods with a structured, secure, and scalable solution that improves operational transparency, payroll accuracy, and productivity monitoring across the organization.\n\nBy capturing work hours, project allocation, and attendance data in a unified environment, the platform enables organizations to maintain control over workforce utilization while ensuring compliance, traceability, and efficient reporting.',
        isPremiumLayout: true,
        hero: {
            title: 'CALTIMS - timesheet management system',
            subtitle: '',
            description: 'The Employee Timesheet Management System is a centralized digital platform designed to automate time tracking, streamline approval workflows, and provide real-time visibility into workforce activity. The system replaces manual and fragmented tracking methods with a structured, secure, and scalable solution that improves operational transparency, payroll accuracy, and productivity monitoring across the organization.',
            hasHeroVideo: false
        },
        projectScope: {
            title: 'From Manual <br /> to Digital',
            card1: {
                title: 'Manual Time Tracking',
                content: 'Manual and fragmented tracking methods lead to timesheet errors, delays, limited visibility, and inconsistent reporting across the organization.',
                items: ['Manual Timesheet Errors', 'Inconsistent Reporting', 'Limited Visibility']
            },
            card2: {
                title: 'Centralized Digital Platform',
                content: 'A unified environment that automates time tracking, standardizes approval workflows, and delivers payroll-ready data with full audit traceability.',
                items: ['Automated Time Entry', 'Standardized Approval Workflows', 'Payroll-Ready Data Generation']
            }
        },
        pricingPlans: {
            title: 'Flexible Plans for Every Organization',
            plans: [
                {
                    name: 'REGISTER',
                    price: '0',
                    unit: 'FREE',
                    tagline: 'TRY 14 DAYS FREE TRIAL',
                    features: [
                        { text: 'Timesheet Entry', included: true },
                        { text: 'Weekly Timesheet Submission', included: true },
                        { text: 'Project-based Time Logging', included: true },
                        { text: 'Dashboard Overview', included: true },
                        { text: 'Holiday Calendar', included: true },
                        { text: 'Timesheet History', included: true },
                        { text: 'Timesheet Reports', included: true },
                        { text: 'Employee Management', included: true },
                        { text: 'Task Categories', included: true },
                        { text: 'Timesheet Freeze Policy', included: false },
                        { text: 'Compliance Monitoring', included: false },
                        { text: 'Timesheet Lock & Compliance Settings', included: false },
                        { text: 'Advanced Reports & Analytics', included: false },
                        { text: 'Automated Report Scheduling', included: false },
                        { text: 'Report Export (PDF / Excel)', included: false },
                        { text: 'Help & Support Ticket System', included: false },
                        { text: 'Admin Override for Locked Timesheets', included: false },
                        { text: 'Incident Management', included: false },
                        { text: 'Enterprise Dashboard Insights', included: false },
                        { text: 'Custom Timesheet Policies', included: false },
                        { text: 'Notification & Reminder Automation', included: false },
                        { text: 'Compliance Tracking', included: false },
                        { text: 'Audit Logs', included: false },
                    ],
                    buttonText: 'REGISTER NOW',
                    isPopular: false,
                    theme: 'light',
                    isFreeTrial: true
                },
                {
                    name: 'BASIC',
                    price: '29',
                    unit: '/ user per month',
                    tagline: 'ESSENTIAL TIMESHEET TRACKING',
                    features: [
                        { text: 'Timesheet Entry', included: true },
                        { text: 'Weekly Timesheet Submission', included: true },
                        { text: 'Project-based Time Logging', included: true },
                        { text: 'Dashboard Overview', included: true },
                        { text: 'Holiday Calendar', included: true },
                        { text: 'Timesheet History', included: true },
                        { text: 'Timesheet Reports', included: true },
                        { text: 'Employee Management', included: true },
                        { text: 'Task Categories', included: true },
                        { text: 'Timesheet Freeze Policy', included: false },
                        { text: 'Compliance Monitoring', included: false },
                        { text: 'Timesheet Lock & Compliance Settings', included: false },
                        { text: 'Advanced Reports & Analytics', included: false },
                        { text: 'Automated Report Scheduling', included: false },
                        { text: 'Report Export (PDF / Excel)', included: false },
                        { text: 'Help & Support Ticket System', included: false },
                        { text: 'Admin Override for Locked Timesheets', included: false },
                        { text: 'Incident Management', included: false },
                        { text: 'Enterprise Dashboard Insights', included: false },
                        { text: 'Custom Timesheet Policies', included: false },
                        { text: 'Notification & Reminder Automation', included: false },
                        { text: 'Compliance Tracking', included: false },
                        { text: 'Audit Logs', included: false },
                    ],
                    buttonText: 'SELECT BASIC',
                    isPopular: false,
                    theme: 'light'
                },
                {
                    name: 'PRO',
                    price: '49',
                    unit: '/ user per month',
                    tagline: 'ADVANCED WORKFORCE & COMPLIANCE',
                    features: [
                        { text: 'Timesheet Entry', included: true },
                        { text: 'Weekly Timesheet Submission', included: true },
                        { text: 'Project-based Time Logging', included: true },
                        { text: 'Dashboard Overview', included: true },
                        { text: 'Holiday Calendar', included: true },
                        { text: 'Leave Tracking', included: true },
                        { text: 'Timesheet History', included: true },
                        { text: 'Timesheet Reports', included: true },
                        { text: 'Employee Management', included: true },
                        { text: 'Task Categories', included: true },
                        { text: 'Timesheet Freeze Policy', included: true },
                        { text: 'Compliance Monitoring', included: true },
                        { text: 'Timesheet Lock & Compliance Settings', included: true },
                        { text: 'Advanced Reports & Analytics', included: true },
                        { text: 'Automated Report Scheduling', included: true },
                        { text: 'Report Export (PDF / Excel)', included: true },
                        { text: 'Help & Support Ticket System', included: true },
                        { text: 'Admin Override for Locked Timesheets', included: true },
                        { text: 'Incident Management', included: true },
                        { text: 'Enterprise Dashboard Insights', included: true },
                        { text: 'Custom Timesheet Policies', included: true },
                        { text: 'Notification & Reminder Automation', included: true },
                        { text: 'Compliance Tracking', included: true },
                        { text: 'Audit Logs', included: true },
                    ],
                    buttonText: 'UPGRADE TO PRO',
                    isPopular: true,
                    theme: 'dark'
                }
            ]
        },
        businessChallenges: {
            title: 'Business Challenges Addressed',
            desc: 'Organizations often face operational inefficiencies due to manual time tracking, inconsistent reporting, and limited visibility into employee activity. The system addresses these challenges by:',
            items: [
                'Eliminating manual timesheet errors and delays',
                'Providing real-time insight into work hours and task allocation',
                'Standardizing approval and validation processes',
                'Supporting payroll-ready time data generation',
                'Ensuring audit-ready records for compliance and governance'
            ]
        },
        coreCapabilities: [
            {
                title: 'Time Tracking & Entry',
                content: 'Employees can log daily or weekly work hours, record task-level effort, and submit timesheets through a structured interface that ensures accuracy and consistency.',
                logo: 'react'
            },
            {
                title: 'Approval Workflow Management',
                content: 'Configurable multi-level approval workflows allow managers to review, validate, and authorize time entries with complete visibility and accountability.',
                logo: 'nodejs'
            },
            {
                title: 'Real-Time Workforce Visibility',
                content: 'Administrators gain instant insight into employee work hours, attendance trends, and project allocation through centralized dashboards.',
                logo: 'python'
            },
            {
                title: 'Audit Trail & Traceability',
                content: 'Every time entry, modification, and approval action is recorded, ensuring full traceability for compliance and operational review.',
                logo: 'javascript'
            },
            {
                title: 'Reporting & Analytics',
                content: 'The system generates structured reports including employee-wise, project-wise, and period-based summaries to support decision-making and performance monitoring.',
                logo: 'java'
            }
        ],
        keyFeaturesArchitecture: {
            title: 'Key Features',
            items: [
                { title: 'Automated Time Entry & Submission', content: 'Automated time entry and submission workflow.', icon: 'Sparkles' },
                { title: 'Role-Based Access Control', content: 'Role-based access for employees, managers, and administrators.', icon: 'Shield' },
                { title: 'Configurable Approval Rules', content: 'Configurable approval and validation rules.', icon: 'Layers' },
                { title: 'Centralized Dashboard', content: 'Centralized dashboard for operational monitoring.', icon: 'PieChart' },
                { title: 'Secure Data Management', content: 'Secure data management and audit logging.', icon: 'Database' },
                { title: 'Payroll-Ready Reporting', content: 'Payroll-ready reporting and export capability.', icon: 'BarChart3' },
                { title: 'Scalable Architecture', content: 'Scalable architecture for organizational growth.', icon: 'Gauge' },
            ]
        },
        businessValueStats: [
            { value: '100%', label: 'TRANSPARENCY', desc: 'Complete visibility into hours worked, project allocation, and workforce activity' },
            { value: '100%', label: 'TRACEABILITY', desc: 'Comprehensive audit trail supporting compliance and accountability' },
            { value: 'FAST', label: 'FASTER SETTLEMENT', desc: 'Automated processing enables quicker payroll preparation with reduced errors' },
            { value: 'DATA', label: 'PRODUCTIVITY INSIGHTS', desc: 'Data-driven analysis supports better workforce planning and performance optimization' },
        ],
        securityGovernance: {
            title: 'Security & Governance',
            desc: 'The system enforces structured governance through role-based access control, controlled data modification, and secure record management. Built-in safeguards ensure data integrity while maintaining confidentiality and operational reliability.',
            items: [
                { title: 'Role-Based Access Control', content: 'Structured governance through role-based access control ensuring only authorized personnel can view and modify records.', icon: 'Shield' },
                { title: 'Controlled Data Modification', content: 'Controlled data modification with full change history maintained for every time entry and approval action.', icon: 'Shield' },
                { title: 'Secure Record Management', content: 'Built-in safeguards ensure data integrity while maintaining confidentiality and operational reliability.', icon: 'Shield' },
                { title: 'Customization & Integration', content: 'The platform supports configurable business rules, custom reporting formats, and integration readiness with payroll, HR, or enterprise systems.', icon: 'Shield' }
            ]
        },
        outcome: "By digitizing and standardizing workforce time management, the system enhances operational control, improves reporting accuracy, and enables organizations to make informed decisions based on reliable workforce data.",
        tech: ['React', 'Tailwindcss', 'Mongodb', 'Nodejs', 'expressjs'],
        techStackDetail: [
            {
                id: 'timesheet-web',
                num: '01',
                label: 'Web Portal',
                content: {
                    "Frontend Architecture": [
                        { name: 'REACT.JS', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-04.png" alt="React" className="w-12 h-12 object-contain" /> },
                        { name: 'TAILWIND CSS', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-02.png" alt="Tailwind" className="w-12 h-12 object-contain" /> },
                        { name: 'FRAMER MOTION', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-012.png" alt="Framer" className="w-12 h-12 object-contain" /> },
                    ],
                    "Backend Engine": [
                        { name: 'NODE.JS', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-015.png" alt="Node" className="w-12 h-12 object-contain" /> },
                        { name: 'EXPRESS.JS', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-06.png" alt="Express" className="w-12 h-12 object-contain" /> },
                    ]
                }
            },
            {
                id: 'timesheet-data',
                num: '02',
                label: 'Data & Security',
                content: {
                    "Persistence Layer": [
                        { name: 'MONGODB', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-024.png" alt="MongoDB" className="w-12 h-12 object-contain" /> },
                        { name: 'JWT AUTH', icon: <Shield size={48} /> },
                    ]
                }
            }
        ],
        gradient: 'from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff]',
        images: [caltimsLogin, caltimsDashboard, caltimsTimesheet, caltimsAdmin, caltimsCalin],
        demoVideo: caltimsDemoVid2,
        icon: BarChart3,
        year: '2024',
        client: 'Enterprise Systems',
        theme: 'blue'
    },

    // {
    //     id: 2,
    //     title: 'Project Management',
    //     tagline: 'Planning, Execution & Monitoring',
    //     fullDescription: 'The Project Management system is a comprehensive software solution designed to streamline planning, execution, and monitoring of organizational projects through a centralized digital platform. It enables efficient task management and intelligent resource utilization.',
    //     features: [
    //         { title: 'Task Management', desc: 'Create, assign, and track tasks for structured project execution.' },
    //         { title: 'Resource Allocation', desc: 'Assign and manage resources efficiently across projects.' },
    //         { title: 'Timeline Tracking', desc: 'Track milestones, progress, and project deadlines in real time.' },
    //         { title: 'Document Management', desc: 'Securely organize and control access to project documents.' },
    //         { title: 'Collaboration', desc: 'Facilitate effective communication and teamwork across teams.' }
    //     ],
    //     tech: ['React', 'PostgreSQL', 'Socket.io', 'Framer Motion'],
    //     advancedFeatures: [
    //         {
    //             title: 'Advanced Planning & Strategy',
    //             desc: 'Strategic planning tools designed to align technical tasks with industrial timelines.',
    //             subItems: [
    //                 { label: 'Gantt Chart Visualization', content: 'Interactive timelines to manage task dependencies and critical project paths.' },
    //                 { label: 'Critical Path Analysis', content: 'Automatically identifies the sequence of steps that determine the project finish date.' },
    //                 { label: 'Work Breakdown Structure', content: 'Decomposes complex projects into manageable work packages and sub-tasks.' }
    //             ],
    //             image: backgroundImage
    //         },
    //         {
    //             title: 'Execution & Operational Excellence',
    //             desc: 'Essential features for maintaining high quality in complex automation workflows.',
    //             subItems: [
    //                 { label: 'Automated Workflows', content: 'Trigger actions based on status changes, like notifying QA when extraction is complete.' },
    //                 { label: 'Time Tracking', content: 'Log billable and non-billable hours directly against tasks to monitor labor costs.' },
    //                 { label: 'Kanban Boards', content: 'Visual "Drag and Drop" interfaces for agile team flow management.' }
    //             ],
    //             image: designImage
    //         },
    //         {
    //             title: 'Monitoring, Analytics & Reporting',
    //             desc: 'Data-driven oversight to mitigate risks and ensure stakeholder transparency.',
    //             subItems: [
    //                 { label: 'Real-time Dashboards', content: 'KPI tracking including "Planned vs. Actual" progress and budget burn rates.' },
    //                 { label: 'Risk Management Matrix', content: 'Identify, assess, and mitigate technical risks before they impact the timeline.' },
    //                 { label: 'Automated Status Reports', content: 'Generate weekly PDF summaries for stakeholders without manual data entry.' }
    //             ],
    //             image: loginPageImg
    //         }
    //     ],
    //     securityFramework: {
    //         title: 'Security & Document Control',
    //         desc: 'Professional-grade reliability with granular access and full auditability.',
    //         items: [
    //             { label: 'RBAC Access Control', content: 'Define granular permissions so only authorized personnel can view sensitive documents.' },
    //             { label: 'Version Control Integration', content: 'Link tasks to GitHub or private repositories to track code changes alongside milestones.' },
    //             { label: 'Audit Logs', content: 'A transparent history of every change made for full compliance and accountability.' }
    //         ]
    //     },
    //     gradient: 'from-[#6366f1] via-[#a855f7] to-[#d946ef]',
    //     images: [projectMgmtImg, loginPageImg, backgroundImage, designImage, loginPageImg],
    //     demoVideo: demoVid,
    //     icon: TrendingUp,
    //     year: '2023',
    //     client: 'AlphaCore Systems',
    //     theme: 'purple'
    // },
    // {
    //     id: 3,
    //     title: 'Inventory Management',
    //     tagline: 'Stock Optimization & ERP Integration',
    //     fullDescription: 'A robust Inventory Management System designed to provide real-time control over stock levels, streamline replenishment workflows, and ensure seamless synchronization across organizational warehouses and ERP platforms.',
    //     features: [
    //         { title: 'Stock Monitoring', desc: 'Real-time tracking of inventory levels across multiple locations.' },
    //         { title: 'Automated Replenishment', desc: 'Intelligent alerts and triggers for stock reordering to prevent stockouts.' },
    //         { title: 'Stock Transfers', desc: 'Simplified management of movement between warehouses or departments.' },
    //         { title: 'ERP Integration', desc: 'Seamless data exchange with enterprise planning systems for unified operations.' },
    //         { title: 'Warehouse Management', desc: 'Optimize storage and organization for faster picking and shipping.' }
    //     ],
    //     tech: ['React', 'Python', 'PostgreSQL', 'SAP Integration'],
    //     advancedFeatures: [
    //         {
    //             title: 'Real-Time Multi-Node Tracking',
    //             desc: 'Centralized control system for monitoring stock levels across global warehouse networks.',
    //             subItems: [
    //                 { label: 'Precision Monitoring', content: 'Real-time tracking of inventory levels across multiple locations with zero-latency synchronization.' },
    //                 { label: 'Warehouse Mapping', content: 'Digital twins of storage facilities to optimize space utilization and faster picking routes.' }
    //             ],
    //             image: backgroundImage
    //         },
    //         {
    //             title: 'Predictive Replenishment Logic',
    //             desc: 'AI-driven replenishment workflows that eliminate stockouts and minimize excess inventory.',
    //             subItems: [
    //                 { label: 'Intelligent Alerts', content: 'Automated triggers for stock reordering based on historical demand patterns and lead times.' },
    //                 { label: 'Vendor Optimization', content: 'Sync stock needs directly with suppliers to ensure a seamless replenishment cycle.' }
    //             ],
    //             image: designImage
    //         },
    //         {
    //             title: 'Dynamic Stock Distribution',
    //             desc: 'Streamlining the movement of goods between warehouses and departments with intelligent routing.',
    //             subItems: [
    //                 { label: 'Stock Transfers', content: 'Simplified management of movement between warehouses with full traceability and audit trails.' },
    //                 { label: 'Logistics Integration', content: 'Direct connection with shipping carriers to track incoming and outgoing stock movements.' }
    //             ],
    //             image: loginPageImg
    //         }
    //     ],
    //     inventoryFramework: {
    //         title: 'Supply Chain Synchronization',
    //         desc: 'Deep integration architecture that connects inventory data with enterprise-level planning.',
    //         items: [
    //             { label: 'ERP Integration', content: 'Seamless data exchange with SAP, Oracle, and Microsoft Dynamics for unified enterprise operations.' },
    //             { label: 'Inventory Audit Trails', content: 'Comprehensive historical records of every stock movement for legal and financial compliance.' },
    //             { label: 'Warehouse Analytics', content: 'High-level KPI dashboards to monitor stock turnover, aging inventory, and storage efficiency.' }
    //         ]
    //     },
    //     gradient: 'from-[#22c55e] via-[#10b981] to-[#3b82f6]',
    //     images: [backgroundImage, designImage, loginPageImg, backgroundImage, designImage],
    //     demoVideo: demoVid,
    //     icon: Shield,
    //     year: '2023',
    //     client: 'Logistics Pro',
    //     theme: 'green'
    // },
    {
        id: 4,
        title: 'CALRIMS - Recruitment Intelligent Management System',
        tagline: 'Intelligent Talent Acquisition',
        fullDescription: 'The AI-Powered Recruitment System is an intelligent talent acquisition platform designed to streamline hiring through automation, advanced analytics, and data-driven evaluation. The system centralizes recruitment activities into a unified digital environment, enabling organizations to identify, assess, and select candidates efficiently while maintaining consistency, transparency, and control throughout the hiring lifecycle. \n\nBy combining automated screening, skill analysis, and structured evaluation workflows, the platform helps organizations reduce hiring time, improve candidate quality, and enhance decision-making accuracy.',
        isPremiumLayout: true,
        hero: {
            title: 'CALRIMS - Recruitment Intelligent Management System',
            subtitle: 'Transforming manual hiring into a unified, intelligent recruitment ecosystem.',
            description: 'The AI-Powered Recruitment System is an intelligent talent acquisition platform designed to streamline hiring through automation, advanced analytics, and data-driven evaluation. The system centralizes recruitment activities into a unified digital environment, enabling organizations to identify, assess, and select candidates efficiently while maintaining consistency, transparency, and control throughout the hiring lifecycle.'
        },
        projectScope: {
            title: 'Hiring Efficiency & Matching',
            card1: {
                title: 'Traditional Recruitment',
                content: 'Manual screening and inconsistent evaluation lead to slow hiring cycles and misaligned talent acquisition.',
                items: ['Manual CV Screening', 'Subjective Assessment', 'Disconnected Workflows']
            },
            card2: {
                title: 'AI-Driven Hiring',
                content: 'Automated evaluation and structured data analysis ensure faster, more accurate, and transparent selection.',
                items: ['Automated Screening', 'Objective Evaluation', 'Unified Pipeline Tracking']
            }
        },
        businessChallenges: {
            title: 'Business Challenges Addressed',
            desc: 'Organizations often face inefficiencies and inconsistencies in recruitment processes due to manual screening, subjective evaluation, and limited visibility into candidate pipelines. The system addresses these challenges by:',
            items: [
                'Reducing manual effort in resume screening and candidate evaluation',
                'Improving accuracy in candidate-job matching',
                'Standardizing hiring workflows across departments',
                'Enhancing transparency in selection decisions',
                'Accelerating recruitment cycles while maintaining quality'
            ]
        },
        coreCapabilities: [
            {
                title: 'Automated Candidate Screening',
                content: 'The system automatically analyzes applications against job requirements, filtering and ranking candidates based on relevance and qualifications.',
                logo: 'react'
            },
            {
                title: 'AI-Driven Skill Assessment',
                content: 'Intelligent evaluation models assess candidate competencies, experience alignment, and role suitability using structured data analysis.',
                logo: 'python'
            },
            {
                title: 'Natural Language Evaluation',
                content: 'Advanced language processing analyzes resumes and candidate responses to identify relevant skills, experience, and contextual fit.',
                logo: 'javascript'
            },
            {
                title: 'Structured Hiring Workflow',
                content: 'Recruitment stages such as application review, evaluation, shortlisting, and approval are managed through configurable workflows.',
                logo: 'java'
            },
            {
                title: 'Recruitment Analytics & Insights',
                content: 'Centralized dashboards provide real-time visibility into hiring pipelines, candidate status, and recruitment performance metrics.',
                logo: 'nodejs'
            }
        ],
        businessValueStats: [
            { label: 'Improved Hiring Efficiency', desc: 'Automates repetitive tasks and accelerates recruitment cycles.' },
            { label: 'Better Candidate Matching', desc: 'AI-driven evaluation enhances role alignment and selection accuracy.' },
            { label: 'Transparency & Consistency', desc: 'Standardized processes ensure structured and accountable hiring decisions.' },
            { label: 'Reduced Time-to-Hire', desc: 'Streamlined workflows enable faster candidate identification and onboarding readiness.' },
            { label: 'Data-Driven Decision Making', desc: 'Actionable insights support strategic workforce planning.' }
        ],
        securityGovernance: {
            title: 'Security & Privacy',
            items: [
                { title: 'Data Confidentiality', content: 'Secure handling of personal candidate information with enterprise-grade encryption.' },
                { title: 'Access Control', content: 'Granular role-based permissions ensuring data is only visible to authorized personnel.' },
                { title: 'Compliance Logs', content: 'Complete traceability of every interaction and modification for regulatory compliance.' }
            ]
        },
        keyFeaturesArchitecture: {
            title: 'Key Features',
            items: [
                { title: 'Automated Resume Parsing & Ranking', content: 'Extracting key data and scoring candidates based on role requirements.', icon: 'Cpu' },
                { title: 'AI-Based Skill & Qualification Analysis', content: 'Intelligent matching of competencies to job architectures.', icon: 'Sparkles' },
                { title: 'Objective, Bias-Aware Shortlisting', content: 'Transparent evaluation models to ensure merit-based selection.', icon: 'Shield' },
                { title: 'Configurable Hiring Workflows', content: 'Custom recruitment pipelines with automated transitions and approvals.', icon: 'Layers' },
                { title: 'Centralized Candidate Database', content: 'Unified repository for all talent acquisition data and candidate history.', icon: 'Database' },
                { title: 'Real-Time Recruitment Analytics', content: 'Performance dashboards tracking time-to-fill and pipeline health.', icon: 'BarChart3' },
                { title: 'Secure Data & Access Control', content: 'Enterprise-grade security for candidate privacy and permissions.', icon: 'Shield' },
                { title: 'Scalable Growth Architecture', content: 'Flexible platform designed to handle high-volume hiring needs.', icon: 'Gauge' }
            ]
        },
        outcome: "The implementation of AI-driven evaluation transformed the recruitment lifecycle, reducing time-to-fill by 40% while significantly improving candidate-role alignment through objective, data-backed screening models.",
        tech: ['Python', 'TensorFlow', 'NLP', 'React'],
        techStackDetail: [
            {
                id: 'recruitment-ai',
                num: '01',
                label: 'AI Intelligence',
                content: {
                    "Core AI Engine": [
                        { name: 'PYTHON', icon: <Code2 size={48} /> },
                        { name: 'TENSORFLOW', icon: <Cpu size={48} /> },
                        { name: 'NLP MODELS', icon: <Layers size={48} /> },
                    ],
                    "Evaluation Logic": [
                        { name: 'SCIKIT-LEARN', icon: <Zap size={48} /> },
                        { name: 'SPACY', icon: <Terminal size={48} /> },
                    ]
                }
            },
            {
                id: 'recruitment-interface',
                num: '02',
                label: 'Interface',
                content: {
                    "Web Architecture": [
                        { name: 'REACT.JS', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-04.png" alt="React" className="w-12 h-12 object-contain" /> },
                        { name: 'TAILWIND CSS', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-02.png" alt="Tailwind" className="w-12 h-12 object-contain" /> },
                    ]
                }
            }
        ],
        images: [calrims1, calrims2, calrims3, calrims4, calrims5],
        demoVideo: secondProductVid,
        icon: PieChart,
        year: '2024',
        client: 'TalentTech AI',
        theme: 'orange'
    },
    // {
    //     id: 5,
    //     title: 'AI-Powered Procurement System',
    //     tagline: 'End-to-End Procurement Automation',
    //     fullDescription: 'The AI-Powered Procurement System is an intelligent digital platform designed to streamline and optimize the end-to-end procurement lifecycle through automation, analytics, and data-driven decision-making. The system centralizes purchasing activities, vendor management, and approval workflows into a unified environment that enhances operational transparency, cost control, and compliance.\n\nBy leveraging AI-driven insights and structured process management, the platform enables organizations to make informed purchasing decisions, reduce manual effort, and improve procurement efficiency across departments.',
    //     isPremiumLayout: true,
    //     hero: {
    //         title: 'AI-Powered Procurement System',
    //         subtitle: 'Transforming fragmented manual procurement into a unified, intelligent ecosystem.',
    //         description: 'Our AI-driven environment streamlines complex global operations while maximizing cost efficiency and vendor compliance.'
    //     },
    //     projectScope: {
    //         title: 'Project Scope & Objectives',
    //         card1: {
    //             title: 'Fragmented Chaos',
    //             content: 'Legacy procurement suffered from manual data entry, siloed multi-regional approvals, and zero visibility into regional spend tracks.',
    //             items: ['Manual PO Processing', 'Invisible Spend Categories', 'Paper-based compliance']
    //         },
    //         card2: {
    //             title: 'AI-Driven Future',
    //             content: 'Our solution establishes an automated workflow with predictive insights and 100% centralized data.',
    //             items: ['Automated Intelligent Workflows', 'Predictive Spend Forecasting', 'Centralized Vendor Intelligence']
    //         }
    //     },
    //     businessChallenges: {
    //         title: 'Business Challenges',
    //         desc: 'Organizations often encounter challenges in procurement practices due to manual processes and siloed data. We address these by:',
    //         items: [
    //             'Automating requisition, approval, and purchase workflows',
    //             'Providing real-time visibility into procurement activities and spending',
    //             'Standardizing vendor selection and evaluation processes',
    //             'Reducing processing errors and cycle times',
    //             'Supporting compliance and audit readiness'
    //         ]
    //     },
    //     features: [
    //         { title: 'Transparency', desc: 'Complete visibility into procurement activities and spending.' },
    //         { title: 'Cost Optimization', desc: 'Data-driven insights support smarter purchasing.' },
    //         { title: 'Faster Processing', desc: 'Automated workflows reduce cycle times.' },
    //         { title: 'Compliance', desc: 'Standardized processes ensure accountability.' }
    //     ],
    //     coreCapabilities: [
    //         { title: 'Intelligent Requisition', content: 'Users create, submit, and track purchase requests through structured workflows ensuring policy compliance.', icon: 'Sparkles' },
    //         { title: 'Vendor Insights', content: 'Analyzes supplier performance, pricing trends, and procurement patterns to support informed selection.', icon: 'BarChart3' },
    //         { title: 'Automated Approval', content: 'Configurable multi-level approval processes streamline authorization and reduce delays.', icon: 'Shield' },
    //         { title: 'Real-Time Visibility', content: 'Centralized dashboards provide insight into request status, purchasing trends, and vendor metrics.', icon: 'PieChart' },
    //         { title: 'Reporting & Analytics', content: 'Comprehensive tools generate insights to support budgeting, forecasting, and strategic planning.', icon: 'TrendingUp' }
    //     ],
    //     keyFeaturesArchitecture: {
    //         title: 'Key Features Architecture',
    //         items: [
    //             {
    //                 title: 'Automated Workflows',
    //                 content: 'Automated purchase request and approval workflows.',
    //                 icon: 'Sparkles'
    //             },
    //             {
    //                 title: 'Centralized Management',
    //                 content: 'Centralized vendor and procurement data management.',
    //                 icon: 'Database'
    //             },
    //             {
    //                 title: 'AI-Assisted Evaluation',
    //                 content: 'AI-assisted vendor evaluation and recommendation.',
    //                 icon: 'Cpu'
    //             },
    //             {
    //                 title: 'Real-Time Tracking',
    //                 content: 'Real-time tracking of procurement lifecycle.',
    //                 icon: 'PieChart'
    //             },
    //             {
    //                 title: 'Secure Access & Control',
    //                 content: 'Secure role-based access and process control.',
    //                 icon: 'Shield'
    //             },
    //             {
    //                 title: 'Reporting & Analysis',
    //                 content: 'Structured reporting and spend analysis.',
    //                 icon: 'BarChart3'
    //             },
    //             {
    //                 title: 'Scalable Architecture',
    //                 content: 'Scalable architecture supporting organizational growth.',
    //                 icon: 'Gauge'
    //             },
    //             {
    //                 title: 'Integration Readiness',
    //                 content: 'Integration readiness with finance and enterprise systems.',
    //                 icon: 'Network'
    //             },
    //         ]
    //     },
    //     businessValueStats: [
    //         { value: '70%', label: 'FASTER PROCESSING', desc: 'Reduction in procurement cycle times' },
    //         { value: '22%', label: 'COST OPTIMIZATION', desc: 'Average reduction in operational spend' },
    //         { value: '100%', label: 'COMPLIANCE', desc: 'Automated audit trails and governance' },
    //         { value: '95%', label: 'ACCURACY', desc: 'In spend forecasting and planning' },
    //         { value: '0.5s', label: 'VISIBILITY', desc: 'Real-time data retrieval and reporting' }
    //     ],
    //     securityGovernance: {
    //         title: 'Security & Governance',
    //         desc: 'The system enforces structured control through role-based permissions, secure data handling, and comprehensive activity tracking.',
    //         items: [
    //             { title: 'Role-Based Permissions', content: 'Granular control over who can view and approve sensitive procurement data.', icon: 'Shield' },
    //             { title: 'Secure Data Handling', content: 'Advanced encryption and secure protocols for all transaction records.', icon: 'Shield' },
    //             { title: 'Traceable Actions', content: 'Every procurement action is recorded, ensuring full auditability and integrity.', icon: 'Shield' },
    //             { title: 'Compliance Monitoring', content: 'Automated checks against organizational and regulatory policies.', icon: 'Shield' }
    //         ]
    //     },
    //     outcome: "By centralizing global procurement workflows and introducing AI-assisted vendor evaluation, the system achieved a 70% faster processing cycle and 22% overall cost optimization, establishing a new standard for operational transparency and fiscal control.",
    //     tech: ['AI/ML', 'Cloud Infrastructure', 'React', 'Node.js'],
    //     gradient: 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]',
    //     images: [procurementImg, loginPageImg, designImage, backgroundImage, caldimLogo],
    //     demoVideo: demoVid,
    //     icon: Sparkles,
    //     year: '2024',
    //     client: 'Strategic Procurement',
    //     theme: 'blue'
    // },
]
