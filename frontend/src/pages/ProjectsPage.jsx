import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronRight, BarChart3, TrendingUp, Shield, PieChart, Sparkles } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import loginPageImg from '../assets/loginpage.jpg'
import backgroundImage from '../assets/2650401.jpg'
import designImage from '../assets/26760925_2112.i301.031.S.m004.c13.UI_and_UX_designers_concepts_isometric_composition-removebg-preview.png'
import caldimLogo from '../assets/caldim-logo.png'


const ProjectsPage = () => {
    const location = useLocation()

    const projects = [
        {
            id: 1,
            title: 'Employee Timesheet',
            tagline: 'Workforce Monitoring & Transparency',
            // description: 'Centralized digital platform for streamlined time tracking and operational control.',
            fullDescription: 'The Employee Timesheet system is a comprehensive software solution designed to streamline time tracking and workforce monitoring through a centralized digital platform. It brings intelligent automation to organizational workflows.',
            features: [
                { title: 'Transparency', desc: 'Complete visibility into hours worked, projects assigned, and productivity metrics' },
                { title: 'Traceability', desc: 'Full audit trail of time entries, approvals, and modifications for compliance' },
                { title: 'Faster Settlement', desc: 'Automated payroll processing with reduced cycle times and error elimination' },
                { title: 'Productivity', desc: 'Data-driven insights to optimize workforce allocation and performance' }
            ],
            tech: ['React', 'Node.js', 'SQL', 'Automation'],
            gradient: 'from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff]',
            images: [loginPageImg, backgroundImage, designImage, loginPageImg, backgroundImage],
            icon: BarChart3,
            year: '2024',
            client: 'Enterprise Systems',
            theme: 'blue'
        },
        {
            id: 2,
            title: 'Project Management',
            tagline: 'Planning, Execution & Monitoring',
            // description: 'Isometric glass layers and flowing data lines.',
            fullDescription: 'The Project Management system is a comprehensive software solution designed to streamline planning, execution, and monitoring of organizational projects through a centralized digital platform. It enables efficient task management and intelligent resource utilization.',
            features: [
                { title: 'Task Management', desc: 'Create, assign, and track tasks for structured project execution.' },
                { title: 'Resource Allocation', desc: 'Assign and manage resources efficiently across projects.' },
                { title: 'Timeline Tracking', desc: 'Track milestones, progress, and project deadlines in real time.' },
                { title: 'Document Management', desc: 'Securely organize and control access to project documents.' },
                { title: 'Collaboration', desc: 'Facilitate effective communication and teamwork across teams.' }
            ],
            tech: ['React', 'PostgreSQL', 'Socket.io', 'Framer Motion'],
            gradient: 'from-[#6366f1] via-[#a855f7] to-[#d946ef]',
            images: [designImage, loginPageImg, backgroundImage, designImage, loginPageImg],
            icon: TrendingUp,
            year: '2023',
            client: 'AlphaCore Systems',
            theme: 'purple'
        },
        {
            id: 3,
            title: 'Inventory Management',
            tagline: 'Stock Optimization & ERP Integration',
            // description: 'Minimalist geometric logo animation and snappy easing.',
            fullDescription: 'A robust Inventory Management System designed to provide real-time control over stock levels, streamline replenishment workflows, and ensure seamless synchronization across organizational warehouses and ERP platforms.',
            features: [
                { title: 'Stock Monitoring', desc: 'Real-time tracking of inventory levels across multiple locations.' },
                { title: 'Automated Replenishment', desc: 'Intelligent alerts and triggers for stock reordering to prevent stockouts.' },
                { title: 'Stock Transfers', desc: 'Simplified management of movement between warehouses or departments.' },
                { title: 'ERP Integration', desc: 'Seamless data exchange with enterprise planning systems for unified operations.' },
                { title: 'Warehouse Management', desc: 'Optimize storage and organization for faster picking and shipping.' }
            ],
            tech: ['React', 'Python', 'PostgreSQL', 'SAP Integration'],
            gradient: 'from-[#22c55e] via-[#10b981] to-[#3b82f6]',
            images: [backgroundImage, designImage, loginPageImg, backgroundImage, designImage],
            icon: Shield,
            year: '2023',
            client: 'Logistics Pro',
            theme: 'green'
        },
        {
            id: 4,
            title: 'AI Powered Recruitment System',
            tagline: 'Intelligent Talent Acquisition',
            // description: 'Approachable design for complex financial forecasting.',
            fullDescription: 'The AI-Powered Recruitment System is an intelligent talent acquisition platform designed to streamline hiring through automation, advanced analytics, and data-driven decision-making. It enhances recruitment efficiency by leveraging AI to screen and prioritize high-potential applicants.',
            features: [
                { title: 'Automated Candidate Screening', desc: 'Automatically filters and ranks applicants based on job requirements and qualifications.' },
                { title: 'AI Driven Skill Assessment', desc: 'Evaluates candidate competencies using intelligent, data-based analysis.' },
                { title: 'Natural Language Evaluation', desc: 'Analyzes resumes and responses using advanced language understanding.' },
                { title: 'Bias Free Short Listing', desc: 'Ensures fair candidate selection through objective, AI-based evaluation.' }
            ],
            tech: ['Python', 'TensorFlow', 'NLP', 'React'],
            gradient: 'from-[#f59e0b] via-[#ef4444] to-[#ec4899]',
            images: [caldimLogo, backgroundImage, designImage, caldimLogo, backgroundImage],
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
            gradient: 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]',
            images: [backgroundImage, loginPageImg, designImage, backgroundImage, caldimLogo],
            icon: Sparkles,
            year: '2024',
            client: 'CALBUY Platform',
            theme: 'blue'
        }
    ]

    const [activeIndex, setActiveIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [internalImgIndex, setInternalImgIndex] = useState(0)

    // Sync with navigation state (from Header dropdown)
    useEffect(() => {
        if (location.state?.projectIndex !== undefined) {
            const index = location.state.projectIndex
            // Only update if it's different to prevent redundant renders
            if (index !== activeIndex) {
                setActiveIndex(index)
                setInternalImgIndex(0)
            }
        }
    }, [location.state, activeIndex])

    // Auto-cycle internal images every 4 seconds for the active project
    useEffect(() => {
        const interval = setInterval(() => {
            setInternalImgIndex((prev) => (prev + 1) % 5)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    // Mouse Parallax for the entire stack
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springX = useSpring(mouseX, { stiffness: 100, damping: 20 })
    const springY = useSpring(mouseY, { stiffness: 100, damping: 20 })

    const rotateX = useTransform(springY, [-300, 300], [10, -10])
    const rotateY = useTransform(springX, [-300, 300], [-10, 10])

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
    }

    const handleNext = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setActiveIndex((prev) => (prev + 1) % projects.length)
        setInternalImgIndex(0) // Reset internal image when project changes
        setTimeout(() => setIsAnimating(false), 800)
    }

    const handleInternalNext = (e) => {
        e.stopPropagation()
        setInternalImgIndex((prev) => (prev + 1) % 5)
    }

    const getProjectData = (index) => projects[(index + projects.length) % projects.length]

    const currentProject = projects[activeIndex]

    return (
        <div
            className="pt-32 min-h-screen bg-white text-black overflow-hidden relative cursor-default"
            onMouseMove={handleMouseMove}
        >
            {/* Background Data Stream Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-[1px] bg-gradient-to-r from-transparent via-blue-600 to-transparent"
                        initial={{
                            width: Math.random() * 300 + 100,
                            x: -500,
                            y: Math.random() * 100 + "%"
                        }}
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{
                            duration: Math.random() * 5 + 7,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 10
                        }}
                    />
                ))}
            </div>

            <section className="max-w-[1700px] mx-auto px-6 lg:px-12 py-8 relative z-10">
                {/* Breadcrumbs / Context Header */}
                {/* <div className="flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                    <span className="hover:text-blue-600 cursor-pointer transition-colors">Digital Archive</span>
                    <ChevronRight size={10} />
                    <span className="hover:text-blue-600 cursor-pointer transition-colors">Systems & Infra</span>
                    <ChevronRight size={10} />
                    <span className="text-blue-600">{currentProject.title}</span>
                </div> */}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN: Gallery & Project Navbar */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* PROJECT NAVBAR (Above Image) */}
                        {/* <div className="p-2 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
                            <div className="flex items-center gap-1 px-4 border-r border-white/10 mr-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 whitespace-nowrap">Archives</span>
                            </div>
                            <div className="flex items-center gap-2 flex-1">
                                {projects.map((project, idx) => (
                                    <button
                                        key={project.id}
                                        onClick={() => {
                                            if (!isAnimating && activeIndex !== idx) {
                                                setIsAnimating(true)
                                                setActiveIndex(idx)
                                                setInternalImgIndex(0)
                                                setTimeout(() => setIsAnimating(false), 500)
                                            }
                                        }}
                                        className={`px-6 py-3 rounded-xl border transition-all duration-300 flex items-center gap-3 relative flex-shrink-0 ${activeIndex === idx ? 'bg-blue-600/10 border-blue-600/30' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                                    >
                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${activeIndex === idx ? 'bg-blue-600 border-blue-600 font-bold' : 'bg-white/5 border-white/10 group-hover:border-white/20'}`}>
                                            <project.icon size={12} className={activeIndex === idx ? 'text-black' : 'text-blue-600'} />
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${activeIndex === idx ? 'text-blue-600' : 'text-white/40 group-hover:text-white'}`}>
                                            {project.title}
                                        </span>

                                        {activeIndex === idx && (
                                            <motion.div
                                                layoutId="activeTabGlow"
                                                className="absolute inset-0 rounded-xl border border-blue-600/50 pointer-events-none"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Image Gallery (Main View) */}
                        <div className="aspect-video relative rounded-[2.5rem] bg-gray-50 border border-blue-600/10 overflow-hidden shadow-2xl group flex items-center justify-center p-8">
                            {/* Ambient Glow behind image */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${currentProject.gradient} opacity-5 blur-3xl`} />

                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={`${currentProject.id}-${internalImgIndex}`}
                                    src={currentProject.images[internalImgIndex]}
                                    alt={currentProject.title}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full object-contain relative z-10"
                                />
                            </AnimatePresence>

                            {/* Zoom/Expand Icon Overlay */}
                            {/* <div className="absolute top-6 right-6 p-4 rounded-full bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white/10 z-20">
                                <Sparkles size={24} className="text-blue-600" />
                            </div> */}
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                            {currentProject.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setInternalImgIndex(idx)}
                                    className={`relative flex-shrink-0 w-28 aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${internalImgIndex === idx ? 'border-blue-600 scale-105 shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'border-gray-200 opacity-50 hover:opacity-100'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover" alt="view" />
                                </button>
                            ))}
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-3">
                                Technology Matrix <div className="h-[1px] flex-1 bg-blue-600/10" />
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {currentProject.tech.map((tech) => (
                                    <span key={tech} className="px-5 py-2 rounded-xl bg-gray-50 border border-blue-600/10 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:border-blue-600/40 transition-colors">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Project Information */}
                    <div className="lg:col-span-5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentProject.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-8"
                            >
                                <div>
                                    {/* <div className="flex items-center gap-3 mb-4">
                                        <span className="text-blue-600 font-black text-sm tracking-widest uppercase">{currentProject.client}</span>
                                        <div className="h-4 w-[1px] bg-gray-200" />
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <div key={star} className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                                            ))}
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase">(212 Technical Audits)</span>
                                    </div> */}

                                    <h1 className="text-5xl font-black tracking-tighter uppercase leading-none mb-4 text-black">
                                        {currentProject.title}
                                    </h1>
                                    <p className="text-blue-600 text-lg font-black tracking-widest uppercase mb-6">{currentProject.tagline}</p>

                                    <div className="h-[1px] w-full bg-blue-600/10 mb-8" />

                                    {/* <div className="space-y-6">
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">System Status</span>
                                            <span className="text-2xl font-black text-black">OPERATIONAL</span>
                                            <span className="px-2 py-0.5 rounded bg-blue-600/10 border border-blue-600/20 text-[9px] font-black text-blue-600 uppercase tracking-tighter">Verified</span>
                                        </div>

                                        <p className="text-blue-100/60 leading-relaxed text-base italic">
                                            "{currentProject.description}"
                                        </p>
                                    </div> */}
                                </div>
                                <div className="p-8 rounded-[2rem] bg-gray-50 border border-blue-600/10 space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600">Technical Narrative</h3>
                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-600 leading-relaxed font-light">
                                            {currentProject.fullDescription}
                                        </p>
                                        {currentProject.features && (
                                            <div className="pt-4 grid grid-cols-1 gap-4">
                                                {currentProject.features.map((feature, idx) => (
                                                    <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl bg-white border border-blue-600/5 hover:border-blue-600/20 transition-all">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                                                        <div>
                                                            <div className="text-[10px] font-black uppercase text-blue-600 mb-1">{feature.title}</div>
                                                            <div className="text-xs text-gray-500 leading-relaxed">{feature.desc}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT COLUMN: Project Selection & Action Panel */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-32 space-y-6">
                            {/* Primary Action Panel */}


                            {/* PROJECT SELECTOR LIST */}
                            {/* <div className="p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-6 px-2">Project Archive</h3>
                                <div className="space-y-2">
                                    {projects.map((project, idx) => (
                                        <motion.button
                                            key={project.id}
                                            onClick={() => {
                                                if (!isAnimating && activeIndex !== idx) {
                                                    setIsAnimating(true)
                                                    setActiveIndex(idx)
                                                    setInternalImgIndex(0)
                                                    setTimeout(() => setIsAnimating(false), 500)
                                                }
                                            }}
                                            whileHover={{ x: 5 }}
                                            className={`w-full group relative p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${activeIndex === idx ? 'bg-blue-600/10 border-blue-600/30' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${activeIndex === idx ? 'bg-blue-600 border-blue-600' : 'bg-white/5 border-white/10 group-hover:border-white/20'}`}>
                                                <project.icon size={18} className={activeIndex === idx ? 'text-black' : 'text-blue-600'} />
                                            </div>
                                            <div className="text-left">
                                                <div className={`text-[11px] font-black uppercase leading-tight ${activeIndex === idx ? 'text-blue-600' : 'text-white/60 group-hover:text-white'}`}>
                                                    {project.title}
                                                </div>
                                                <div className="text-[8px] font-bold uppercase tracking-widest text-white/20 mt-1">{project.year}</div>
                                            </div>

                                            {activeIndex === idx && (
                                                <motion.div
                                                    layoutId="activeGlow"
                                                    className="absolute inset-0 rounded-2xl border border-blue-600/50 pointer-events-none"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Rim Glow */}
            <div className="fixed inset-0 pointer-events-none border-[1px] border-blue-600/5 rounded-[3rem] m-4" />
        </div>
    )
}

export default ProjectsPage
