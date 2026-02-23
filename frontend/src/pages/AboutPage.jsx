import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Users, Code, Globe, Shield, Cpu, Layers, Eye, Rocket,
    CheckCircle2, Target, Zap, BarChart2, RefreshCw, Clock,
    MessageSquare, Headphones, TrendingUp, Layout, Server, GitBranch, Telescope
} from 'lucide-react'

/* ─── Reusable fade-in wrapper ───────────────────────────────────────── */
const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
    const variants = {
        up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
        left: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
        right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
        none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    }
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            variants={variants[direction]}
        >
            {children}
        </motion.div>
    )
}

/* ─── Section header ─────────────────────────────────────────────────── */
const SectionHeader = ({ icon, title, subtitle, iconStyle = {} }) => (
    <FadeIn className="mb-14">
        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#2563EB,#1D4ED8)', boxShadow: '0 0 24px rgba(37,99,235,0.4)', ...iconStyle }}>
                {icon}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight">{title}</h2>
        </div>
        {subtitle && <p className="text-gray-500 text-lg pl-16">{subtitle}</p>}
        <div className="pl-16 mt-5">
            <div className="h-[3px] w-20 bg-gradient-to-r from-blue-600 to-blue-300 rounded-full" />
        </div>
    </FadeIn>
)

/* ─── SVG Illustrations ──────────────────────────────────────────────── */
const HeroSVG = () => (
    <svg viewBox="0 0 520 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="60" y="60" width="400" height="280" rx="24" fill="#EFF6FF" />
        <rect x="100" y="100" width="320" height="200" rx="14" fill="#DBEAFE" />
        {/* Screen */}
        <rect x="120" y="118" width="280" height="160" rx="8" fill="white" stroke="#BFDBFE" strokeWidth="1.5" />
        {/* Code lines */}
        {[0, 1, 2, 3, 4, 5].map(i => (
            <rect key={i} x="140" y={138 + i * 22} width={[100, 140, 80, 120, 60, 110][i]} height="8" rx="4" fill={i % 2 === 0 ? '#BFDBFE' : '#93C5FD'} opacity="0.7" />
        ))}
        {/* Sidebar */}
        <rect x="310" y="118" width="90" height="160" rx="0" fill="#EFF6FF" />
        {[0, 1, 2, 3].map(i => (
            <rect key={i} x="320" y={135 + i * 32} width="60" height="18" rx="5" fill={i === 0 ? '#2563EB' : '#BFDBFE'} />
        ))}
        {/* Floating nodes */}
        <circle cx="80" cy="90" r="18" fill="#2563EB" opacity="0.15" />
        <circle cx="80" cy="90" r="10" fill="#2563EB" opacity="0.4" />
        <circle cx="450" cy="340" r="22" fill="#2563EB" opacity="0.12" />
        <circle cx="450" cy="340" r="12" fill="#2563EB" opacity="0.35" />
        <circle cx="460" cy="80" r="14" fill="#60A5FA" opacity="0.25" />
        {/* Connecting lines */}
        <line x1="80" y1="90" x2="120" y2="130" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="460" y1="80" x2="400" y2="118" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* Bottom bar */}
        <rect x="140" y="340" width="240" height="12" rx="6" fill="#DBEAFE" />
        <rect x="140" y="340" width="160" height="12" rx="6" fill="#2563EB" opacity="0.7" />
        {/* Gear */}
        <circle cx="430" cy="200" r="28" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
        <circle cx="430" cy="200" r="14" fill="#DBEAFE" />
        <circle cx="430" cy="200" r="6" fill="#2563EB" opacity="0.5" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <rect key={i} x="426" y="167" width="8" height="14" rx="3" fill="#93C5FD"
                transform={`rotate(${deg} 430 200)`} />
        ))}
    </svg>
)

const WhoWeAreSVG = () => (
    <svg viewBox="0 0 520 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Central hub */}
        <circle cx="260" cy="190" r="60" fill="#2563EB" opacity="0.08" />
        <circle cx="260" cy="190" r="40" fill="#DBEAFE" />
        <circle cx="260" cy="190" r="24" fill="#2563EB" opacity="0.7" />
        {/* People icons */}
        {[
            { cx: 100, cy: 100 }, { cx: 420, cy: 100 },
            { cx: 100, cy: 280 }, { cx: 420, cy: 280 },
        ].map((pos, i) => (
            <g key={i}>
                <line x1={pos.cx} y1={pos.cy} x2="260" y2="190" stroke="#BFDBFE" strokeWidth="1.5" strokeDasharray="5 4" />
                <circle cx={pos.cx} cy={pos.cy} r="32" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
                <circle cx={pos.cx} cy={pos.cy - 10} r="10" fill="#93C5FD" />
                <path d={`M${pos.cx - 14} ${pos.cy + 20} Q${pos.cx} ${pos.cy + 8} ${pos.cx + 14} ${pos.cy + 20}`} stroke="#2563EB" strokeWidth="2" fill="none" />
            </g>
        ))}
        {/* Labels */}
        <rect x="64" y="148" width="72" height="12" rx="4" fill="#DBEAFE" />
        <rect x="384" y="148" width="72" height="12" rx="4" fill="#DBEAFE" />
        <rect x="64" y="328" width="72" height="12" rx="4" fill="#DBEAFE" />
        <rect x="384" y="328" width="72" height="12" rx="4" fill="#DBEAFE" />
        {/* AI chip in center */}
        <text x="253" y="196" fontSize="11" fontWeight="bold" fill="white" fontFamily="monospace">AI</text>
    </svg>
)

const MissionSVG = () => (
    <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Rocket */}
        <ellipse cx="240" cy="200" rx="30" ry="60" fill="#2563EB" opacity="0.85" />
        <polygon points="240,100 210,180 270,180" fill="#1D4ED8" />
        <ellipse cx="240" cy="260" rx="30" ry="12" fill="#BFDBFE" />
        {/* Flames */}
        <ellipse cx="225" cy="272" rx="10" ry="18" fill="#FCD34D" opacity="0.8" />
        <ellipse cx="240" cy="278" rx="12" ry="22" fill="#F97316" opacity="0.7" />
        <ellipse cx="255" cy="272" rx="10" ry="18" fill="#FCD34D" opacity="0.8" />
        {/* Stars */}
        {[[80, 80], [400, 60], [440, 200], [60, 260], [370, 290], [120, 180], [320, 150]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 4 : 3} fill="#2563EB" opacity={0.2 + i * 0.07} />
        ))}
        {/* Path arc */}
        <path d="M120 300 Q240 140 360 300" stroke="#BFDBFE" strokeWidth="2" strokeDasharray="6 4" fill="none" />
        {/* Target */}
        <circle cx="380" cy="100" r="32" fill="none" stroke="#DBEAFE" strokeWidth="2" />
        <circle cx="380" cy="100" r="20" fill="none" stroke="#93C5FD" strokeWidth="2" />
        <circle cx="380" cy="100" r="8" fill="#2563EB" opacity="0.6" />
    </svg>
)

const VisionSVG = () => (
    <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Eye shape */}
        <path d="M60 170 Q240 60 420 170 Q240 280 60 170Z" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
        <circle cx="240" cy="170" r="50" fill="#DBEAFE" />
        <circle cx="240" cy="170" r="30" fill="#93C5FD" />
        <circle cx="240" cy="170" r="16" fill="#2563EB" opacity="0.85" />
        <circle cx="248" cy="162" r="5" fill="white" opacity="0.7" />
        {/* Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <line key={i}
                x1={240 + Math.cos(deg * Math.PI / 180) * 60}
                y1={170 + Math.sin(deg * Math.PI / 180) * 60}
                x2={240 + Math.cos(deg * Math.PI / 180) * 80}
                y2={170 + Math.sin(deg * Math.PI / 180) * 80}
                stroke="#BFDBFE" strokeWidth="2.5" strokeLinecap="round"
            />
        ))}
        {/* Horizon */}
        <rect x="60" y="280" width="360" height="4" rx="2" fill="#DBEAFE" />
        <rect x="100" y="296" width="280" height="4" rx="2" fill="#EFF6FF" />
        {/* Stars */}
        {[[100, 60], [380, 80], [160, 40], [320, 50]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="#2563EB" opacity={0.15 + i * 0.1} />
        ))}
    </svg>
)

const WhatWeDoSVG = () => (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Laptop */}
        <rect x="120" y="80" width="240" height="160" rx="10" fill="#EFF6FF" stroke="#DBEAFE" strokeWidth="2" />
        <rect x="135" y="95" width="210" height="130" rx="5" fill="white" />
        {/* Screen content */}
        <rect x="150" y="110" width="180" height="8" rx="3" fill="#BFDBFE" />
        <rect x="150" y="126" width="120" height="8" rx="3" fill="#93C5FD" />
        <rect x="150" y="142" width="160" height="8" rx="3" fill="#DBEAFE" />
        {/* Chart bars */}
        {[40, 64, 48, 72, 56, 80].map((h, i) => (
            <rect key={i} x={155 + i * 26} y={225 - h} width="18" height={h} rx="3"
                fill={i === 5 ? '#2563EB' : '#BFDBFE'} opacity={0.8 + i * 0.03} />
        ))}
        {/* Base */}
        <rect x="80" y="240" width="320" height="14" rx="7" fill="#DBEAFE" />
        {/* Floating icons */}
        <circle cx="80" cy="120" r="26" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
        <text x="72" y="126" fontSize="16" fill="#2563EB">⚙</text>
        <circle cx="410" cy="180" r="26" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
        <text x="401" y="186" fontSize="16" fill="#2563EB">🔗</text>
        <line x1="106" y1="120" x2="134" y2="130" stroke="#BFDBFE" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="384" y1="180" x2="356" y2="175" stroke="#BFDBFE" strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
)

/* ─── Miniature Icon SVGs ─── */
const StepSoftwareSVG = () => (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="34" height="26" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
        <rect x="8" y="13" width="12" height="3" rx="1.5" fill="#3B82F6" />
        <rect x="8" y="19" width="20" height="3" rx="1.5" fill="#93C5FD" />
        <rect x="8" y="25" width="16" height="3" rx="1.5" fill="#DBEAFE" />
        <circle cx="34" cy="12" r="6" fill="#7C3AED" />
        <path d="M32 12l1.5 1.5 2.5-2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const StepAISVG = () => (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="21" cy="21" r="18" fill="#FDF2F8" stroke="#EC4899" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="21" cy="21" r="7" fill="#EC4899" />
        {[0, 72, 144, 216, 288].map((deg, i) => (
            <circle key={i} cx={21 + 14 * Math.cos(deg * Math.PI / 180)} cy={21 + 14 * Math.sin(deg * Math.PI / 180)} r="3.5" fill="#F472B6" />
        ))}
        <path d="M21 14v14M14 21h14" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
)

const StepAutomationSVG = () => (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 21a11 11 0 1 1 22 0 11 11 0 0 1-22 0" stroke="#06B6D4" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="21" cy="21" r="6" fill="#0891B2" />
        <path d="M34 21l4-4m0 0l-4-4m4 4H26" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 21l-4 4m0 0l4 4m-4-4h12" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const StepPlatformSVG = () => (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="24" height="24" rx="3" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1.5" />
        <rect x="14" y="16" width="24" height="12" rx="3" fill="white" stroke="#F97316" strokeWidth="1.5" />
        <circle cx="18" cy="20" r="1.5" fill="#F59E0B" />
        <rect x="22" y="19" width="10" height="2" rx="1" fill="#FCD34D" />
        <rect x="18" y="23" width="14" height="2" rx="1" fill="#FDE68A" />
    </svg>
)

const StepSupportSVG = () => (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 4l17 8v10c0 10.5-7.3 20.3-17 23-9.7-2.7-17-12.5-17-23V12l17-8z" fill="#F0FDF4" stroke="#22C55E" strokeWidth="1.5" />
        <path d="M14 23l5 5 9-9" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="34" cy="10" r="4" fill="#3B82F6" opacity="0.8" />
    </svg>
)

const ApproachSVG = () => (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Agile cycle */}
        <circle cx="240" cy="160" r="110" fill="none" stroke="#EFF6FF" strokeWidth="30" />
        <circle cx="240" cy="160" r="110" fill="none" stroke="#DBEAFE" strokeWidth="2" />
        {/* Cycle segments */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
            const r = 110, cx = 240, cy = 160
            const x = cx + r * Math.cos((deg - 90) * Math.PI / 180)
            const y = cy + r * Math.sin((deg - 90) * Math.PI / 180)
            return (
                <circle key={i} cx={x} cy={y} r="18"
                    fill={i === 0 ? '#2563EB' : '#BFDBFE'}
                    stroke="white" strokeWidth="2" />
            )
        })}
        {/* Arrow arc */}
        <path d="M240 50 A110 110 0 1 1 239 50" stroke="#2563EB" strokeWidth="3"
            strokeDasharray="12 6" fill="none" strokeLinecap="round" opacity="0.3" />
        {/* Center */}
        <circle cx="240" cy="160" r="40" fill="#EFF6FF" />
        <circle cx="240" cy="160" r="26" fill="#DBEAFE" />
        <text x="228" y="166" fontSize="14" fill="#2563EB" fontWeight="bold">AGILE</text>
    </svg>
)

const CommitmentSVG = () => (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Shield */}
        <path d="M240 40 L340 80 L340 180 Q340 260 240 290 Q140 260 140 180 L140 80 Z" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
        <path d="M240 70 L320 102 L320 180 Q320 248 240 272 Q160 248 160 180 L160 102 Z" fill="#DBEAFE" />
        <path d="M240 96 L308 122 L308 178 Q308 238 240 258 Q172 238 172 178 L172 122 Z" fill="#93C5FD" opacity="0.4" />
        {/* Checkmark */}
        <path d="M206 175 L228 198 L278 150" stroke="#2563EB" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Stars around */}
        {[[100, 60], [380, 60], [80, 220], [400, 220], [240, 310]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#2563EB" opacity={0.12 + i * 0.06} />
        ))}
        {/* Rings */}
        <circle cx="240" cy="166" r="130" fill="none" stroke="#BFDBFE" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
    </svg>
)

/* ─── Main Component ─────────────────────────────────────────────────── */
const AboutPage = () => {
    useEffect(() => { window.scrollTo(0, 0) }, [])

    /* ── DATA ── */
    const whoWeAre = [
        { icon: <Cpu size={18} className="text-white" />, text: 'A technology-driven startup specializing in customized software and AI-powered solutions.' },
        { icon: <Layers size={18} className="text-white" />, text: 'Focused on delivering scalable, secure, and business-oriented digital platforms.' },
        { icon: <CheckCircle2 size={18} className="text-white" />, text: 'Committed to innovation, quality, and long-term client partnerships.' },
    ]

    const whatWeDo = [
        { num: '01', icon: <StepSoftwareSVG />, title: 'Custom Software Development', desc: 'Bespoke applications tailored to exact business workflows, built for performance and scale.' },
        { num: '02', icon: <StepAISVG />, title: 'AI-Powered Enterprise Solutions', desc: 'Intelligent systems that automate repetitive tasks, surface insights, and accelerate decisions.' },
        { num: '03', icon: <StepAutomationSVG />, title: 'Business Process Automation', desc: 'End-to-end automation of complex business workflows for speed and accuracy.' },
        { num: '04', icon: <StepPlatformSVG />, title: 'Web-Based Platforms', desc: 'Modern web platforms and product solutions built for scalability and user engagement.' },
    ]

    const approach = [
        { icon: <Target size={20} className="text-blue-600" />, title: 'Client-Centric Design', desc: 'Every solution is designed around your specific goals and challenges.' },
        { icon: <Shield size={20} className="text-blue-600" />, title: 'Scalable & Secure Architecture', desc: 'Enterprise-grade infrastructure that grows safely with your business.' },
        { icon: <BarChart2 size={20} className="text-blue-600" />, title: 'Data-Driven Decision Support', desc: 'Embedded analytics and insights to drive smarter business decisions.' },
        { icon: <RefreshCw size={20} className="text-blue-600" />, title: 'Continuous Improvement', desc: 'Iterative delivery with constant feedback loops and innovation.' },
        { icon: <Zap size={20} className="text-blue-600" />, title: 'Agile Methodology', desc: 'Flexible, sprint-based development ensuring fast, reliable delivery.' },
    ]

    const commitment = [
        { icon: <CheckCircle2 size={20} className="text-blue-600" />, title: 'Quality-Driven Delivery', desc: 'Rigorous QA processes embedded throughout every stage of development.' },
        { icon: <MessageSquare size={20} className="text-blue-600" />, title: 'Transparent Communication', desc: 'Regular updates, clear reporting, and open collaboration at every step.' },
        { icon: <Clock size={20} className="text-blue-600" />, title: 'Timely Project Execution', desc: 'On-time delivery with milestone tracking and proactive risk management.' },
        { icon: <Headphones size={20} className="text-blue-600" />, title: 'Reliable Technical Support', desc: 'Dedicated post-launch support ensuring smooth, uninterrupted operations.' },
        { icon: <TrendingUp size={20} className="text-blue-600" />, title: 'Long-Term Value Creation', desc: 'Solutions engineered for sustained ROI and evolving business needs.' },
    ]

    /* ── Roadmap steps ── */
    const roadmap = [
        { step: '01', phase: 'Discovery', label: 'Understand', color: 'bg-blue-700', desc: 'Deep-dive into your business goals, processes, and pain points.' },
        { step: '02', phase: 'Design', label: 'Architect', color: 'bg-blue-600', desc: 'Design scalable, secure architecture tailored to your requirements.' },
        { step: '03', phase: 'Build', label: 'Develop', color: 'bg-blue-500', desc: 'Agile sprint-based development with continuous client collaboration.' },
        { step: '04', phase: 'Test', label: 'Validate', color: 'bg-blue-400', desc: 'Comprehensive QA, security audits, and performance benchmarking.' },
        { step: '05', phase: 'Deploy', label: 'Launch', color: 'bg-blue-300', desc: 'Smooth production deployment with zero-downtime strategies.' },
        { step: '06', phase: 'Support', label: 'Evolve', color: 'bg-blue-200', desc: 'Ongoing monitoring, improvements, and feature expansions.' },
    ]

    return (
        <div className="pt-24 min-h-screen bg-white text-black overflow-x-hidden relative">
            {/* Background Aether Blobs */}
            <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] bg-indigo-400/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-[80%] -left-[5%] w-[450px] h-[450px] bg-purple-400/10 blur-[130px] rounded-full pointer-events-none" />

            {/* ══════════════════════════════════════════════════════════
                1. HERO — About Us
            ══════════════════════════════════════════════════════════ */}
            <section className="relative section-container flex flex-col lg:flex-row items-center gap-16 py-28 overflow-hidden z-10">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none" />

                <FadeIn direction="left" className="flex-1 z-10">
                    {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-sm font-semibold mb-6">
                        <Globe size={14} /> &nbsp;CALDIM Engineering
                    </div> */}
                    <h1 className="text-6xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight">About <br /><span className="text-blue-600">Us</span></h1>
                    <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                        We deliver customized software solutions that help organizations achieve greater
                        efficiency, visibility, and operational control. By combining strong engineering
                        expertise with modern technologies such as AI and automation, we transform complex
                        business processes into intelligent digital systems.
                    </p>
                    <p className="text-lg text-gray-600 max-w-xl leading-relaxed mt-4">
                        Our solutions support organizations in evolving from traditional operations to
                        scalable, future-ready environments that drive measurable business value.
                    </p>
                    <div className="flex flex-wrap gap-6 mt-10">
                        {[['10+', 'Projects Delivered'], ['100%', 'Client Focus'], ['24/7', 'Support']].map(([val, lbl]) => (
                            <div key={lbl} className="text-center">
                                <div className="text-3xl font-black text-blue-600">{val}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{lbl}</div>
                            </div>
                        ))}
                    </div>
                </FadeIn>

                <FadeIn direction="right" delay={0.2} className="flex-1 flex justify-center">
                    <div className="w-full max-w-lg aspect-square">
                        <HeroSVG />
                    </div>
                </FadeIn>
            </section>

            {/* ══════════════════════════════════════════════════════════
                2. WHO WE ARE
            ══════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-gray-50 border-y border-blue-600/10">
                <div className="section-container flex flex-col lg:flex-row-reverse items-center gap-16">
                    <FadeIn direction="right" className="flex-1 flex justify-center">
                        <div className="w-full max-w-md aspect-square">
                            <WhoWeAreSVG />
                        </div>
                    </FadeIn>
                    <div className="flex-1">
                        <SectionHeader
                            iconStyle={{ background: 'linear-gradient(135deg,#7C3AED 0%,#EC4899 55%,#F97316 100%)', boxShadow: '0 0 28px rgba(168,85,247,0.5)' }}
                            icon={<Users size={22} className="text-white" />}
                            title="Who We Are"
                            subtitle="A startup built on technology, trust, and transformation."
                        />
                        <div className="relative pl-0">
                            {/* Vertical spine */}
                            <div className="hidden md:block absolute left-6 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-blue-700 via-blue-400 to-transparent" />
                            {whoWeAre.map((item, i) => (
                                <FadeIn key={i} delay={i * 0.15} direction="left">
                                    <div className="flex items-start gap-6 mb-8 group">
                                        <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-white border-2 border-blue-600/20 rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.05)] group-hover:scale-110 group-hover:border-blue-600 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300">
                                            <div className="absolute inset-1.5 bg-blue-600 rounded-xl" />
                                            <div className="relative z-10 scale-90">{item.icon}</div>
                                        </div>
                                        <div className="flex-1 bg-white/70 backdrop-blur-sm border border-blue-600/10 rounded-2xl px-7 py-5 shadow-sm group-hover:border-blue-600/40 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                                            <p className="text-gray-700 text-base leading-relaxed font-medium">{item.text}</p>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                3. MISSION & VISION
            ══════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <FadeIn direction="left">
                        <div className="h-full rounded-[32px] overflow-hidden border border-orange-500/10 shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 flex flex-col group"
                            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,247,237,1) 100%)' }}>
                            <div className="bg-gradient-to-br from-orange-500 via-red-600 to-purple-800 p-8 flex items-center gap-5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
                                    <Target size={28} className="text-white" />
                                </div>
                                <div className="z-10">
                                    <h3 className="text-2xl font-black text-white tracking-wide uppercase">Our Mission</h3>
                                    <div className="h-1 w-12 bg-white/40 rounded-full mt-1" />
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-6 p-10 flex-1">
                                <div className="w-full lg:w-1/2 flex justify-center">
                                    <div className="w-44 h-44 drop-shadow-[0_20px_40px_rgba(249,115,22,0.2)]"><MissionSVG /></div>
                                </div>
                                <div className="flex-1 space-y-5">
                                    {[
                                        'To empower organizations through intelligent, efficient, and reliable software solutions.',
                                        'To transform complex business processes into streamlined digital experiences.',
                                    ].map((pt, i) => (
                                        <FadeIn key={i} delay={0.2 + i * 0.1} direction="right">
                                            <div className="flex items-start gap-4">
                                                <div className="mt-2.5 w-3 h-3 rounded-full bg-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.5)] flex-shrink-0" />
                                                <p className="text-gray-700 text-sm leading-relaxed font-medium">{pt}</p>
                                            </div>
                                        </FadeIn>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Vision */}
                    <FadeIn direction="right" delay={0.15}>
                        <div className="h-full rounded-[32px] overflow-hidden border border-indigo-500/10 shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col group"
                            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(238,242,255,1) 100%)' }}>
                            <div className="bg-gradient-to-br from-indigo-500 via-blue-700 to-blue-900 p-8 flex items-center gap-5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
                                    <Telescope size={28} className="text-white" />
                                </div>
                                <div className="z-10">
                                    <h3 className="text-2xl font-black text-white tracking-wide uppercase">Our Vision</h3>
                                    <div className="h-1 w-12 bg-white/40 rounded-full mt-1" />
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-6 p-10 flex-1">
                                <div className="w-full lg:w-1/2 flex justify-center">
                                    <div className="w-44 h-44 drop-shadow-[0_20px_40px_rgba(99,102,241,0.2)]"><VisionSVG /></div>
                                </div>
                                <div className="flex-1 space-y-5">
                                    {[
                                        'To be a trusted technology partner delivering impactful and future-ready solutions.',
                                        'To drive digital transformation through innovation and excellence.',
                                    ].map((pt, i) => (
                                        <FadeIn key={i} delay={0.3 + i * 0.1} direction="right">
                                            <div className="flex items-start gap-4">
                                                <div className="mt-2.5 w-3 h-3 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)] flex-shrink-0" />
                                                <p className="text-gray-700 text-sm leading-relaxed font-medium">{pt}</p>
                                            </div>
                                        </FadeIn>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                4. WHAT WE DO — Roadmap Graph
            ══════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-gray-50 border-y border-blue-600/10">
                <div className="section-container">
                    <div className="flex flex-col lg:flex-row items-center gap-16 mb-16">
                        <div className="flex-1">
                            <SectionHeader
                                iconStyle={{ background: 'linear-gradient(135deg,#06B6D4 0%,#10B981 55%,#0D9488 100%)', boxShadow: '0 0 28px rgba(6,182,212,0.5)' }}
                                icon={<Globe size={22} className="text-white" />}
                                title="What We Do"
                                subtitle="Five pillars that form the foundation of everything we build."
                            />
                        </div>
                        <FadeIn direction="right" className="flex-1 flex justify-center">
                            <div className="w-full max-w-sm aspect-video"><WhatWeDoSVG /></div>
                        </FadeIn>
                    </div>

                    {/* Horizontal graph roadmap */}
                    <div className="relative">
                        {/* Connector line */}
                        <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[3px] bg-gradient-to-r from-blue-700 via-blue-400 to-blue-200 rounded-full" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {whatWeDo.map((step, i) => (
                                <FadeIn key={i} delay={i * 0.12} direction="up">
                                    <div className="flex flex-col items-center text-center group">
                                        {/* Node */}
                                        <div className="relative mb-6">
                                            <div className="relative w-[112px] h-[112px] bg-white border border-gray-100 rounded-full flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] group-hover:shadow-[0_12px_45px_rgba(37,99,235,0.15)] group-hover:scale-105 transition-all duration-500 z-10 overflow-hidden">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <span className="text-[10px] font-black text-gray-300 group-hover:text-blue-500 transition-colors uppercase tracking-widest mb-1">{step.num}</span>
                                                <div className="transform group-hover:scale-110 transition-transform duration-500">
                                                    {step.icon}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full bg-white border border-blue-600/10 rounded-2xl p-5 group-hover:border-blue-600/30 group-hover:shadow-lg transition-all duration-300">
                                            <h3 className="text-sm font-black text-black mb-2 leading-snug uppercase tracking-tight">{step.title}</h3>
                                            <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                5. DELIVERY ROADMAP — Full-Width Timeline
            ══════════════════════════════════════════════════════════ */}
            <section className="py-28 bg-white overflow-hidden">
                <div className="section-container">
                    <FadeIn className="text-center mb-20">
                        {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-sm font-semibold mb-5">
                            <GitBranch size={14} /> Our Delivery Process
                        </div> */}
                        <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight">How We Deliver</h2>
                        <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                            A structured, transparent roadmap from initial discovery to long-term support.
                        </p>
                    </FadeIn>

                    {/* ZigZag timeline */}
                    <div className="relative">
                        {/* Zigzag spine path */}
                        <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="zigzagGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#1D4ED8" />
                                    <stop offset="50%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#DBEAFE" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M 50 0 L 42 8 L 58 25 L 42 42 L 58 58 L 42 75 L 58 92 L 50 100"
                                stroke="url(#zigzagGradient)"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeDasharray="12 12"
                                style={{ vectorEffect: 'non-scaling-stroke' }}
                            />
                        </svg>

                        {roadmap.map((item, i) => {
                            const isLeft = i % 2 === 0
                            const nodePosition = isLeft ? 'lg:left-[42%]' : 'lg:left-[58%]'

                            return (
                                <FadeIn key={i} delay={i * 0.12} direction={isLeft ? 'left' : 'right'}>
                                    <div className={`relative flex items-center mb-16 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-0 gap-8`}>

                                        {/* Card */}
                                        <div className={`w-full lg:w-[40%] ${isLeft ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'} text-left`}>
                                            <div className="bg-white border border-blue-600/10 rounded-2xl p-7 shadow-sm hover:shadow-[0_10px_40px_rgba(37,99,235,0.12)] hover:border-blue-300 transition-all duration-500 group relative overflow-hidden">
                                                <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-1 h-full bg-gradient-to-b from-blue-600 to-transparent opacity-20`} />
                                                <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'lg:justify-end' : ''}`}>
                                                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                                                    <span className="text-xs text-blue-600 font-bold uppercase tracking-widest">{item.phase}</span>
                                                </div>
                                                <h3 className="text-xl font-black text-black mb-2">{item.label}</h3>
                                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>

                                        {/* Spacer */}
                                        <div className="hidden lg:block lg:w-[15%]" />

                                        {/* Center node (now zigzagging) */}
                                        <div className={`hidden lg:flex absolute ${nodePosition} -translate-x-1/2 z-10 w-16 h-16 bg-white border-[3px] border-blue-600 rounded-full items-center justify-center shadow-[0_0_24px_rgba(37,99,235,0.2)] group-hover:scale-110 transition-transform duration-300`}>
                                            <div className="absolute inset-0 bg-blue-50 rounded-full scale-[0.85]" />
                                            <span className="relative text-blue-600 font-black text-lg">{item.step}</span>
                                        </div>

                                        {/* Spacer for opposite side */}
                                        <div className="hidden lg:block w-full lg:w-[45%]" />
                                    </div>
                                </FadeIn>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                6. OUR APPROACH
            ══════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-gray-50 border-y border-blue-600/10">
                <div className="section-container flex flex-col lg:flex-row items-center gap-16">
                    <FadeIn direction="left" className="flex-1 flex justify-center">
                        <div className="w-full max-w-sm aspect-square"><ApproachSVG /></div>
                    </FadeIn>
                    <div className="flex-1">
                        <SectionHeader
                            iconStyle={{ background: 'linear-gradient(135deg,#F59E0B 0%,#F97316 50%,#EF4444 100%)', boxShadow: '0 0 28px rgba(245,158,11,0.5)' }}
                            icon={<Target size={22} className="text-white" />}
                            title="Our Approach"
                            subtitle="How we think, work, and deliver every engagement."
                        />
                        <div className="grid grid-cols-1 gap-5">
                            {approach.map((item, i) => (
                                <FadeIn key={i} delay={i * 0.1} direction="right">
                                    <div className="flex items-start gap-5 bg-white border border-blue-600/10 rounded-2xl p-5 shadow-sm hover:border-blue-600/30 hover:shadow-md transition-all duration-300 group">
                                        <div className="w-11 h-11 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300">
                                            <div className="group-hover:[&>*]:text-white transition-colors duration-300">{item.icon}</div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-black uppercase tracking-tight mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                7. OUR COMMITMENT
            ══════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="section-container">
                    <div className="flex flex-col lg:flex-row items-start gap-16">
                        <div className="flex-1">
                            <SectionHeader
                                iconStyle={{ background: 'linear-gradient(135deg,#22C55E 0%,#14B8A6 55%,#3B82F6 100%)', boxShadow: '0 0 28px rgba(34,197,94,0.5)' }}
                                icon={<Shield size={22} className="text-white" />}
                                title="Our Commitment"
                                subtitle="The promises we keep — every project, every client, every time."
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {commitment.map((item, i) => (
                                    <FadeIn key={i} delay={i * 0.1} direction="up">
                                        <div className="bg-gray-50 border border-blue-600/10 rounded-2xl p-6 hover:border-blue-600/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                                            <div className="w-11 h-11 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                                                <div className="group-hover:[&>*]:text-white transition-colors duration-300">{item.icon}</div>
                                            </div>
                                            <h4 className="text-sm font-black text-black uppercase tracking-tight mb-2">{item.title}</h4>
                                            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                        <FadeIn direction="right" delay={0.2} className="flex-1 flex justify-center items-center">
                            <div className="w-full max-w-sm aspect-square"><CommitmentSVG /></div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                8. CTA STRIP
            ══════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
                <div className="section-container text-center">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Ready to Build Something Great?</h2>
                        <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">
                            Partner with CALDIM Engineering to transform your vision into a powerful digital reality.
                        </p>
                        <a href="/contact"
                            className="inline-block px-10 py-5 bg-white text-blue-700 font-black text-sm uppercase tracking-widest rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200">
                            Start a Conversation →
                        </a>
                    </FadeIn>
                </div>
            </section>

        </div>
    )
}

export default AboutPage
