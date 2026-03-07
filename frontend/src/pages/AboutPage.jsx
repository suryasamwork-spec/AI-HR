import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
    Users, Code, Globe, Shield, Cpu, Layers, Eye, Rocket,
    CheckCircle2, Target, Zap, BarChart2, RefreshCw, Clock,
    MessageSquare, Headphones, TrendingUp, Layout, Server, GitBranch, Telescope, Heart
} from 'lucide-react'
import caldimLogo from '../assets/caldim-logo.png'
import heroImage from '../assets/Gemini_Generated_Image_8kimm38kimm38kim-Photoroom.png'

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
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight">{title}</h2>
        </div>
        {subtitle && <p className="text-gray-500 text-lg leading-relaxed">{subtitle}</p>}
        {/* <div className="mt-5">
            <div className="h-[3px] w-20 bg-gradient-to-r from-blue-600 to-blue-300 rounded-full" />
        </div> */}
    </FadeIn>
)

/* ─── SVG Illustrations ──────────────────────────────────────────────── */
const HeroSVG = () => (
    <img
        src={heroImage}
        alt="Hero Illustration"
        className="w-full h-auto object-contain"
    />
)

const CircularWhoWeAre = () => {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Logo stays very slow and subtle: scroll-linked
    const logoRotation = useTransform(scrollYProgress, [0, 1], [-20, 20])

    const nodes = [
        { label: 'CULTURE', icon: StepSupportSVG, angle: 90 },
        { label: 'STRATEGY', icon: StepSoftwareSVG, angle: 30 },
        { label: 'UX DESIGN', icon: StepAutomationSVG, angle: 330 },
        { label: 'BRANDING', icon: StepPlatformSVG, angle: 270 },
        { label: 'DELIVERY', icon: StepSupportSVG, angle: 210 },
        { label: 'UI DESIGN', icon: StepPlatformSVG, angle: 150 },
    ]

    const radius = 180

    return (
        <div ref={containerRef} className="relative w-full max-w-[500px] aspect-square flex items-center justify-center translate-y-4">
            {/* Dotted Orbit Line: Continuous Rotation */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[360px] h-[360px] border-2 border-dashed border-gray-200 rounded-full"
            />

            {/* Central Logo: Scroll-linked slow rotation */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                style={{ rotate: logoRotation }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative z-20 w-[100px] lg:w-[120px] flex items-center justify-center p-2"
            >
                <img
                    src={caldimLogo}
                    alt="CALDIM Logo"
                    className="w-full h-auto object-contain"
                    style={{
                        filter: 'brightness(0) saturate(100%) invert(11%) sepia(87%) saturate(2222%) hue-rotate(196deg) brightness(97%) contrast(106%)'
                    }}
                />
            </motion.div>

            {/* Orbiting Nodes: Continuous Rotation */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
            >
                {nodes.map((node, i) => {
                    const rad = (node.angle * Math.PI) / 180
                    const x = Math.cos(rad) * radius
                    const y = -Math.sin(rad) * radius

                    return (
                        <motion.div
                            key={node.label}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.8, type: 'spring' }}
                            style={{ x, y }}
                            className="absolute flex flex-col items-center gap-3"
                        >
                            {/* Counter-rotate the individual node content infinitely so icons stay upright */}
                            {/* Counter-rotate the individual node content infinitely so icons stay upright */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className="hover:scale-125 transition-transform duration-500 cursor-pointer">
                                    <node.icon />
                                </div>
                                <span className="text-[9px] font-black tracking-widest text-blue-900 bg-white/40 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm whitespace-nowrap uppercase">
                                    {node.label}
                                </span>
                            </motion.div>
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    )
}

const WhoWeAreSVG = () => null // Deprecated

const MissionSVG = () => (
    <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Rocket Body */}
        <ellipse cx="240" cy="200" rx="30" ry="60" fill="#002B54" opacity="0.9" />
        <polygon points="240,100 210,180 270,180" fill="#002B54" />
        <ellipse cx="240" cy="260" rx="30" ry="12" fill="#E0F2FE" />
        {/* Flames (Muted) */}
        <ellipse cx="225" cy="272" rx="10" ry="18" fill="#93C5FD" opacity="0.6" />
        <ellipse cx="240" cy="278" rx="12" ry="22" fill="#60A5FA" opacity="0.5" />
        <ellipse cx="255" cy="272" rx="10" ry="18" fill="#93C5FD" opacity="0.6" />
        {/* Stars */}
        {[[80, 80], [400, 60], [440, 200], [60, 260], [370, 290]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2} fill="#002B54" opacity={0.15} />
        ))}
        {/* Path arc */}
        <path d="M120 300 Q240 140 360 300" stroke="#002B54" strokeWidth="1" strokeDasharray="6 4" fill="none" opacity="0.2" />
        {/* Target */}
        <circle cx="380" cy="100" r="32" fill="none" stroke="#E0F2FE" strokeWidth="2" />
        <circle cx="380" cy="100" r="20" fill="none" stroke="#BAE6FD" strokeWidth="2" />
        <circle cx="380" cy="100" r="8" fill="#002B54" opacity="0.4" />
    </svg>
)

const VisionSVG = () => (
    <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Eye shape */}
        <path d="M60 170 Q240 60 420 170 Q240 280 60 170Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
        <circle cx="240" cy="170" r="50" fill="#F1F5F9" />
        <circle cx="240" cy="170" r="30" fill="#E2E8F0" />
        <circle cx="240" cy="170" r="16" fill="#002B54" opacity="0.8" />
        <circle cx="248" cy="162" r="5" fill="white" opacity="0.6" />
        {/* Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <line key={i}
                x1={240 + Math.cos(deg * Math.PI / 180) * 60}
                y1={170 + Math.sin(deg * Math.PI / 180) * 60}
                x2={240 + Math.cos(deg * Math.PI / 180) * 85}
                y2={170 + Math.sin(deg * Math.PI / 180) * 85}
                stroke="#002B54" strokeWidth="1.5" strokeLinecap="round" opacity="0.1"
            />
        ))}
        {/* Stars */}
        {[[100, 60], [380, 80], [160, 40], [320, 50]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2" fill="#002B54" opacity="0.2" />
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
        { step: '01', phase: 'Discovery', label: 'Understand', color: '#10b981', desc: 'Deep-dive into your business goals, processes, and pain points.' },
        { step: '02', phase: 'Design', label: 'Architect', color: '#f59e0b', desc: 'Design scalable, secure architecture tailored to your requirements.' },
        { step: '03', phase: 'Build', label: 'Develop', color: '#0ea5e9', desc: 'Agile sprint-based development with continuous client collaboration.' },
        { step: '04', phase: 'Test', label: 'Validate', color: '#3b82f6', desc: 'Comprehensive QA, security audits, and performance benchmarking.' },
        { step: '05', phase: 'Deploy', label: 'Launch', color: '#6366f1', desc: 'Smooth production deployment with zero-downtime strategies.' },
        { step: '06', phase: 'Support', label: 'Evolve', color: '#1e3a8a', desc: 'Ongoing monitoring, improvements, and feature expansions.' },
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
                        {[['10+', 'Projects Delivered'], ['100%', 'Client Focus']].map(([val, lbl]) => (
                            <div key={lbl} className="text-center">
                                <div className="text-3xl font-black text-blue-600">{val}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{lbl}</div>
                            </div>
                        ))}
                    </div>
                </FadeIn>

                <FadeIn direction="right" delay={0.2} className="flex-1 flex justify-center lg:justify-end">
                    <div className="w-full max-w-2xl transform lg:scale-110">
                        <HeroSVG />
                    </div>
                </FadeIn>
            </section>

            {/* ══════════════════════════════════════════════════════════
                2. WHO WE ARE
            ══════════════════════════════════════════════════════════ */}
            <section className="py-32 bg-gray-50 border-y border-blue-600/10 overflow-hidden">
                <div className="section-container">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* LEFT: Orbital Diagram */}
                        <FadeIn direction="left" className="flex justify-center h-full">
                            <CircularWhoWeAre />
                        </FadeIn>

                        {/* RIGHT: Who We Are Details */}
                        <div className="flex flex-col gap-10">
                            <div>
                                <SectionHeader
                                    iconStyle={{ background: 'linear-gradient(135deg,#7C3AED 0%,#EC4899 55%,#F97316 100%)', boxShadow: '0 0 28px rgba(168,85,247,0.5)' }}
                                    icon={<Users size={22} className="text-white" />}
                                    title="Who We Are"
                                    subtitle="A startup built on technology, trust, and transformation."
                                />
                            </div>

                            <div className="space-y-8">
                                {whoWeAre.map((item, i) => (
                                    <FadeIn key={i} delay={i * 0.1} direction="right">
                                        <div className="group border-l-2 border-blue-600/20 pl-6 hover:border-blue-600 transition-colors duration-300">
                                            <p className="text-gray-700 font-medium text-lg leading-relaxed">{item.text}</p>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                3. MISSION & VISION
            ══════════════════════════════════════════════════════════ */}
            <section className="py-16 bg-white">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Mission */}
                        <FadeIn direction="left">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-black text-[#002B54] tracking-tight uppercase">Our Mission</h3>
                                    <div className="h-1.5 w-16 bg-[#002B54] rounded-full" />
                                </div>
                                <div className="space-y-8">
                                    {[
                                        'To empower organizations through intelligent, efficient, and reliable software solutions.',
                                        'To transform complex business processes into streamlined digital experiences.',
                                    ].map((pt, i) => (
                                        <div key={i} className="flex items-start gap-6 group">
                                            <div className="mt-2.5 w-2 h-2 rounded-full bg-[#002B54] shrink-0 group-hover:scale-150 transition-transform duration-300" />
                                            <p className="text-[#002B54]/70 text-lg leading-relaxed font-medium transition-colors group-hover:text-[#002B54]">{pt}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>

                        {/* Vision */}
                        <FadeIn direction="right" delay={0.2}>
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-black text-[#002B54] tracking-tight uppercase">Our Vision</h3>
                                    <div className="h-1.5 w-16 bg-[#002B54] rounded-full" />
                                </div>
                                <div className="space-y-8">
                                    {[
                                        'To be a trusted technology partner delivering impactful and future-ready solutions.',
                                        'To drive digital transformation through innovation and excellence.',
                                    ].map((pt, i) => (
                                        <div key={i} className="flex items-start gap-6 group">
                                            <div className="mt-2.5 w-2 h-2 rounded-full bg-[#002B54] shrink-0 group-hover:scale-150 transition-transform duration-300" />
                                            <p className="text-[#002B54]/70 text-lg leading-relaxed font-medium transition-colors group-hover:text-[#002B54]">{pt}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>



            {/* ══════════════════════════════════════════════════════════
                5. DELIVERY ROADMAP — Exact 3D Infographic Style
            ══════════════════════════════════════════════════════════ */}
            <section className="py-32 bg-gray-50/30 overflow-hidden">
                <div className="section-container">
                    <FadeIn className="text-center mb-32">
                        <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight uppercase italic underline decoration-blue-600/30 decoration-8 underline-offset-8">Our Delivery <span className="text-blue-600">Framework</span></h2>
                        <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto font-medium">
                            A high-precision engineering roadmap designed for transparency, speed, and impact.
                        </p>
                    </FadeIn>

                    {/* Infographic Container */}
                    <div className="relative max-w-6xl mx-auto">

                        {/* 3D CENTRAL SPINE - Vertical Zigzag Path */}
                        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-40 hidden lg:block z-0">
                            <div className="relative h-full flex flex-col items-center">
                                {[
                                    { color: '#8BC34A', shadow: '#689F38' }, // Step 1 joint
                                    { color: '#FFCA28', shadow: '#F57F17' }, // Step 2 joint
                                    { color: '#78909C', shadow: '#455A64' }, // Step 3 joint
                                    { color: '#26A69A', shadow: '#00695C' }, // Step 4 joint
                                    { color: '#1a237e', shadow: '#0d1642' }  // Step 5 joint
                                ].map((joint, idx) => (
                                    <div key={idx} className="relative h-[200px] w-full flex items-center justify-center">
                                        {/* Isometric 3D Diamond Joint */}
                                        <div className="relative w-20 h-20 perspective-[1000px]">
                                            <div
                                                className="absolute inset-0 transform rotate-45 border-[6px] border-white shadow-2xl transition-transform duration-700 hover:rotate-[225deg]"
                                                style={{ backgroundColor: joint.color }}
                                            />
                                            {/* Side Faces for 3D depth */}
                                            <div className="absolute top-[10px] -left-[14px] w-[28px] h-full transform skew-y-[45deg] z-[-1]" style={{ backgroundColor: joint.shadow }} />
                                            <div className="absolute -bottom-[14px] left-[10px] w-full h-[28px] transform skew-x-[45deg] z-[-1]" style={{ backgroundColor: joint.shadow, opacity: 0.7 }} />
                                        </div>
                                        {/* Vertical Connector Line */}
                                        {idx < 4 && <div className="absolute top-[70%] w-[6px] h-full bg-blue-600/10" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* BANNER GRID (2 Columns matching infographic) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-56 gap-y-12 lg:gap-y-0 relative z-10">

                            {/* LEFT COLUMN: Steps 1, 2, 3 */}
                            <div className="space-y-12 lg:space-y-0">
                                {[roadmap[0], roadmap[1], roadmap[2]].map((item, i) => (
                                    <div key={i} className="lg:h-[200px] flex items-center justify-end">
                                        <motion.div
                                            initial={{ opacity: 0, x: -150, rotateY: 30 }}
                                            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.8, delay: i * 0.2, type: "spring", stiffness: 40 }}
                                            className="relative w-full max-w-[440px] group"
                                        >
                                            {/* Slanted Card with Exact Infographic Shape */}
                                            <div
                                                className="bg-white p-6 pl-12 pr-24 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border-y border-l border-gray-100 transition-all duration-500 group-hover:shadow-[0_40px_100px_rgba(37,99,235,0.15)] group-hover:-translate-y-2 relative overflow-hidden"
                                                style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)' }}
                                            >
                                                {/* Glossy Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                                                <div className="flex items-center gap-8">
                                                    {/* Step Number in Circle */}
                                                    <div className="w-20 h-20 rounded-full bg-white shadow-[inset_0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center border-2 border-gray-50 flex-shrink-0">
                                                        <span className="text-5xl font-black italic tracking-tighter" style={{ color: item.color, opacity: 0.8 }}>{item.step.replace(/^0/, '')}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-2" style={{ color: item.color }}>{item.phase}</h3>
                                                        <h4 className="text-xl font-black text-black leading-tight uppercase tracking-tight mb-2 italic">{item.label}</h4>
                                                        <p className="text-gray-500 text-xs leading-relaxed font-semibold">{item.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>

                            {/* RIGHT COLUMN: Steps 4, 5, 6 */}
                            <div className="space-y-12 lg:space-y-0">
                                {[roadmap[3], roadmap[4], roadmap[5]].map((item, i) => (
                                    <div key={i} className="lg:h-[200px] flex items-center justify-start">
                                        <motion.div
                                            initial={{ opacity: 0, x: 150, rotateY: -30 }}
                                            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.8, delay: (i + 3) * 0.2, type: "spring", stiffness: 40 }}
                                            className="relative w-full max-w-[440px] group"
                                        >
                                            {/* Mirrored Slanted Card */}
                                            <div
                                                className="bg-white p-6 pr-12 pl-24 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border-y border-r border-gray-100 transition-all duration-500 group-hover:shadow-[0_40px_100px_rgba(37,99,235,0.15)] group-hover:-translate-y-2 relative overflow-hidden"
                                                style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)' }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                                                <div className="flex flex-row-reverse items-center gap-8 text-right">
                                                    {/* Step Number in Circle */}
                                                    <div className="w-20 h-20 rounded-full bg-white shadow-[inset_0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center border-2 border-gray-50 flex-shrink-0">
                                                        <span className="text-5xl font-black italic tracking-tighter" style={{ color: item.color, opacity: 0.8 }}>{item.step.replace(/^0/, '')}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-2" style={{ color: item.color }}>{item.phase}</h3>
                                                        <h4 className="text-xl font-black text-black leading-tight uppercase tracking-tight mb-2 italic">{item.label}</h4>
                                                        <p className="text-gray-500 text-xs leading-relaxed font-semibold">{item.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                6. OUR APPROACH
            ══════════════════════════════════════════════════════════ */}
            <section className="py-16 bg-gray-50 border-y border-blue-600/10">
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
                            className="mb-10"
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
            <section className="py-16 bg-white">
                <div className="section-container">
                    <div className="flex flex-col lg:flex-row items-start gap-16">
                        <div className="flex-1">
                            <SectionHeader
                                iconStyle={{ background: 'linear-gradient(135deg,#22C55E 0%,#14B8A6 55%,#3B82F6 100%)', boxShadow: '0 0 28px rgba(34,197,94,0.5)' }}
                                icon={<Shield size={22} className="text-white" />}
                                title="Our Commitment"
                                subtitle="The promises we keep — every project, every client, every time."
                                className="mb-10"
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
