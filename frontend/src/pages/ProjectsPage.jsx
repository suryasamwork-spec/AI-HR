import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView, animate } from 'framer-motion'
import { ChevronRight, BarChart3, TrendingUp, Shield, PieChart, Sparkles, Play, CheckCircle2, CheckCircle, Check, X, Network, Cpu, Database, Gauge, Cloud, AlertCircle } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProjectDemoModal from '../components/ProjectDemoModal'
import ScrollToTop from '../components/ScrollToTop'
import backgroundImage from '../assets/2650401.jpg'
import designImage from '../assets/26760925_2112.i301.031.S.m004.c13.UI_and_UX_designers_concepts_isometric_composition-removebg-preview.png'
import caldimLogo from '../assets/caldim-logo.png'
import demoVid from '../assets/video/videoplayback.mp4'
import archVisualNew from '../assets/slazzer-preview-twxul.png'
import timesheetVisual from '../assets/standard-quality-control-concept-m.jpg'
import outcomeBg from '../assets/19197125.jpg'
import javaLogo from '../assets/logos/java logo.png'
import cppLogo from '../assets/logos/logo c+.png'
import jsLogo from '../assets/logos/logo js.png'
import pyLogo from '../assets/logos/logo py.png'
import mongoLogo from '../assets/logos/mongo logo.png'
import nodeLogo from '../assets/logos/node logo.png'
import reactLogo from '../assets/logos/react.png.png'

const logoMap = {
    java: javaLogo,
    cpp: cppLogo,
    javascript: jsLogo,
    python: pyLogo,
    mongodb: mongoLogo,
    nodejs: nodeLogo,
    react: reactLogo
}


import { projectsData } from '../data/projectsData'

// Counter Component for Stat Animation
const Counter = ({ value, duration = 3 }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-45% 0px" })
    const count = useMotionValue(0)

    // Ensure value is a string and parse
    const valueStr = String(value)
    const numericValue = parseFloat(valueStr)
    const unit = valueStr.replace(/[0-9.]/g, '')

    const displayValue = useTransform(count, (latest) => {
        if (valueStr.includes('.')) {
            return latest.toFixed(1) + unit
        }
        return Math.floor(latest) + unit
    })

    useEffect(() => {
        if (isInView) {
            animate(count, numericValue, {
                duration: duration,
                ease: "easeOut"
            })
        }
    }, [isInView, numericValue, count])

    return <motion.span ref={ref}>{displayValue}</motion.span>
}

// Premium Layout Components
const PremiumLayout = ({ project, setIsDemoModalOpen }) => {
    const navigate = useNavigate()
    const [internalImgIndex, setInternalImgIndex] = useState(0)
    const [isPlayingInline, setIsPlayingInline] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const inlineVideoRef = useRef(null)
    const containerRef = useRef(null)
    const revertTimerRef = useRef(null)
    const isInView = useInView(containerRef, { amount: 0.2 })

    // Auto-stop video if scrolled out of view
    useEffect(() => {
        if (!isInView && isPlayingInline) {
            setIsPlayingInline(false)
            setIsPaused(false)
        }
    }, [isInView, isPlayingInline])

    const clearRevertTimer = () => {
        if (revertTimerRef.current) {
            clearTimeout(revertTimerRef.current)
            revertTimerRef.current = null
        }
    }

    const startRevertTimer = () => {
        clearRevertTimer()
        revertTimerRef.current = setTimeout(() => {
            setIsPlayingInline(false)
            setIsPaused(false)
        }, 30000) // 30 seconds
    }

    useEffect(() => {
        if (isPlayingInline && isPaused) {
            startRevertTimer()
        } else {
            clearRevertTimer()
        }
        return () => clearRevertTimer()
    }, [isPlayingInline, isPaused])

    useEffect(() => {
        if (isPlayingInline) return // pause slideshow while video plays
        const imgCount = project?.images?.length || 5
        const interval = setInterval(() => {
            setInternalImgIndex((prev) => (prev + 1) % imgCount)
        }, 3000)
        return () => clearInterval(interval)
    }, [project, isPlayingInline])

    const handleInlineVideoEnd = () => {
        setIsPlayingInline(false)
        setIsPaused(false)
        setIsDemoModalOpen(true)
    }

    const handleMaximize = (e) => {
        e.stopPropagation()
        if (inlineVideoRef.current) inlineVideoRef.current.pause()
        setIsPlayingInline(false)
        setIsPaused(false)
        setIsDemoModalOpen(true)
    }

    const togglePlayPause = () => {
        if (!inlineVideoRef.current) return
        if (inlineVideoRef.current.paused) {
            inlineVideoRef.current.play()
            setIsPaused(false)
        } else {
            inlineVideoRef.current.pause()
            setIsPaused(true)
        }
    }

    const startVideo = () => {
        setIsPlayingInline(true)
        setIsPaused(false)
        // Video will auto-play, and it starts from beginning by default when element is mounted
    }

    const iconMap = {
        Sparkles: <Sparkles className="text-blue-600" size={24} />,
        Shield: <Shield className="text-blue-600" size={24} />,
        BarChart3: <BarChart3 className="text-blue-600" size={24} />,
        PieChart: <PieChart className="text-blue-600" size={24} />,
        TrendingUp: <TrendingUp className="text-blue-600" size={24} />,
        Network: <Network className="text-blue-600" size={20} />,
        Cpu: <Cpu className="text-blue-600" size={20} />,
        Database: <Database className="text-blue-600" size={20} />,
        Gauge: <Gauge className="text-blue-600" size={20} />,
        Cloud: <Cloud className="text-blue-600" size={20} />,
    }

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="max-w-[1700px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h1 className="flex flex-col gap-2 font-black tracking-tighter uppercase text-black">
                            {project.hero.title.includes(' - ') ? (
                                <>
                                    <span className="text-5xl lg:text-7xl leading-none">{project.hero.title.split(' - ')[0]}</span>
                                    <span className="text-2xl lg:text-3xl font-light text-black/50 leading-tight">
                                        {project.hero.title.split(' - ')[1]}
                                    </span>
                                </>
                            ) : (
                                <span className="text-4xl lg:text-5xl leading-[0.9]">{project.hero.title}</span>
                            )}
                        </h1>
                        <p className="text-lg lg:text-xl text-black font-light leading-relaxed max-w-2xl">
                            {project.hero.subtitle && <span className="italic mr-2">"{project.hero.subtitle}"</span>}
                            {project.hero.description}
                        </p>
                        {/* Always use the tech matrix with demo button for premium projects */}
                    </div>

                    <div className="space-y-8" ref={containerRef}>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-blue-600/5 rounded-[3rem] blur-3xl transform group-hover:scale-105 transition-transform duration-700" />
                            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-black/5 bg-black">
                                <AnimatePresence mode="wait">
                                    {!isPlayingInline && (
                                        <motion.img
                                            key={internalImgIndex}
                                            src={project.images[internalImgIndex]}
                                            initial={{ opacity: 0, x: 60 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -60 }}
                                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                                            className="w-full h-full object-cover"
                                            alt="hero"
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Inline Video Player */}
                                {isPlayingInline && (
                                    <div
                                        className="absolute inset-0 z-20 cursor-pointer"
                                        onClick={togglePlayPause}
                                    >
                                        <video
                                            ref={inlineVideoRef}
                                            src={project.demoVideo}
                                            className="w-full h-full object-cover"
                                            autoPlay
                                            controls={false}
                                            controlsList="nodownload"
                                            onContextMenu={(e) => e.preventDefault()}
                                            onEnded={handleInlineVideoEnd}
                                        />

                                        {/* Pause Indicator overlay */}
                                        {isPaused && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                                    <Play size={32} fill="white" className="text-white ml-1" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Maximize button */}
                                        <button
                                            onClick={handleMaximize}
                                            title="Maximize"
                                            className="absolute bottom-4 right-4 z-30 flex items-center justify-center w-10 h-10 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white hover:bg-black/90 transition-all shadow-xl"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="15 3 21 3 21 9" />
                                                <polyline points="9 21 3 21 3 15" />
                                                <line x1="21" y1="3" x2="14" y2="10" />
                                                <line x1="3" y1="21" x2="10" y2="14" />
                                            </svg>
                                        </button>
                                    </div>
                                )}

                                {/* Play Button Overlay (shown only when NOT playing inline) */}
                                {!isPlayingInline && (
                                    <button
                                        onClick={startVideo}
                                        className="absolute inset-0 flex flex-col items-center justify-center group/play z-10"
                                        aria-label="Play Demo"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-black/30 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-black/50">
                                            <Play size={28} fill="white" className="text-white ml-1" />
                                        </div>
                                        <span className="mt-3 text-white/90 text-[11px] font-bold uppercase tracking-widest drop-shadow-lg">Click to play demo</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Tech Matrix */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black uppercase tracking-wider text-black/40 flex items-center gap-3">
                                Technology Matrix <div className="h-[1px] flex-1 bg-black/10" />
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 relative">
                                {project.tech.map((tech) => (
                                    <span key={tech} className="px-5 py-2 rounded-xl bg-gray-50 border border-black/5 text-[10px] font-bold uppercase tracking-widest text-black">
                                        {tech}
                                    </span>
                                ))}

                                {/* New Launch Application Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/register')}
                                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2 group/launch"
                                >
                                    Launch Application
                                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover/launch:translate-x-0.5 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Scope Section */}
            <section className="max-w-[1700px] mx-auto px-6 lg:px-12 py-24 border-t border-black/5">
                <div className="mb-16">
                    <h2 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter text-black leading-[0.9]" dangerouslySetInnerHTML={{ __html: project.projectScope.title }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
                    {[project.projectScope.card1, project.projectScope.card2].map((card, i) => (
                        <div key={i} className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-3xl font-black uppercase tracking-tight text-black">{card.title}</h3>
                                <p className="text-black font-light leading-relaxed text-lg">{card.content}</p>
                            </div>
                            <div className="space-y-3">
                                {card.items.map((item, j) => (
                                    <div key={j} className="flex items-center gap-3 text-sm font-medium text-black">
                                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section >

            {/* Feature Comparison Table Section (if applicable) */}
            {/* Pricing Plans Section (if applicable) */}
            {
                project.pricingPlans && (
                    <section className="max-w-[1700px] mx-auto px-6 lg:px-12 py-32 border-t border-black/5 bg-gray-50/30">
                        <div className="text-center mb-24">
                            <h2 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter text-black leading-none">{project.pricingPlans.title}</h2>
                        </div>

                        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-12 lg:gap-8 max-w-6xl mx-auto">
                            {project.pricingPlans.plans.map((plan, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative w-full lg:w-1/2 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-black/5 transition-all duration-500 group overflow-hidden flex flex-col h-[750px] bg-white text-black"
                                >
                                    {plan.isPopular && (
                                        <div className="absolute top-8 right-8 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-blue-500/20 z-20">
                                            <Sparkles size={12} fill="currentColor" /> MOST POPULAR
                                        </div>
                                    )}

                                    {/* Card Header: Name */}
                                    <div className="p-12 pb-6">
                                        <div className="text-[11px] font-black tracking-[0.2em] uppercase mb-4 text-blue-600">
                                            {plan.name}
                                        </div>
                                        <div className="text-2xl font-black uppercase tracking-tight leading-tight text-black">
                                            {plan.tagline}
                                        </div>
                                    </div>

                                    <div className="h-[1px] w-full mx-auto bg-black opacity-[0.1] w-[calc(100%-6rem)]" />

                                    {/* Card Middle: Scrollable Features */}
                                    <div className="flex-grow overflow-y-auto px-12 py-8 scroll-smooth custom-scrollbar light-scrollbar">
                                        <div className="space-y-6">
                                            {plan.features.map((feature, fIdx) => (
                                                <div key={fIdx} className="flex items-center gap-4 transition-all duration-300">
                                                    <div className="flex-shrink-0">
                                                        {feature.included ? (
                                                            <Check size={18} className="text-green-500" />
                                                        ) : (
                                                            <X size={18} className="text-red-500" />
                                                        )}
                                                    </div>
                                                    <span className={`text-base font-medium tracking-tight ${!feature.included ? 'text-black/30' : 'text-black'}`}>
                                                        {feature.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="h-[1px] w-full mx-auto bg-black opacity-[0.1] w-[calc(100%-6rem)]" />

                                    {/* Card Footer: Price & Button */}
                                    <div className="p-12 pt-8 bg-gray-50/50">
                                        <div className="flex flex-col gap-8">
                                            <div className="flex items-baseline gap-1 justify-center">
                                                <span className="text-4xl font-black tracking-tighter leading-none text-black/60">₹</span>
                                                <span className="text-7xl font-black tracking-tighter leading-none">{plan.price}</span>
                                                <span className="text-base font-bold uppercase tracking-widest text-black/40">
                                                    {plan.unit}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (plan.isFreeTrial || plan.name === 'REGISTER') {
                                                        navigate('/register')
                                                    } else {
                                                        navigate('/contact')
                                                    }
                                                }}
                                                className={`w-full py-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${plan.isPopular
                                                    ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-600/20'
                                                    : 'bg-[#0A1128] text-white hover:bg-[#1a2542] shadow-xl shadow-black/10'
                                                    }`}>
                                                {plan.buttonText}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <style>{`
                        .custom-scrollbar::-webkit-scrollbar {
                            width: 4px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .light-scrollbar::-webkit-scrollbar-thumb {
                            background: rgba(0,0,0,0.1);
                            border-radius: 10px;
                        }
                        .dark-scrollbar::-webkit-scrollbar-thumb {
                            background: rgba(255,255,255,0.1);
                            border-radius: 10px;
                        }
                    `}</style>
                    </section>
                )
            }

            {/* Business Challenges Strip */}
            <section className="bg-slate-900 py-32 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[50%] h-full bg-blue-600/5 skew-x-12 transform translate-x-32" />
                <div className="max-w-[1700px] mx-auto px-6 lg:px-12 relative z-10 text-center">
                    <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-8">{project.businessChallenges.title}</h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto mb-16 font-light">{project.businessChallenges.desc}</p>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-left">
                        {project.businessChallenges.items.map((item, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <span className="text-white/60 font-light leading-relaxed text-lg tracking-wide">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Capabilities */}
            <section className="max-w-[1700px] mx-auto px-6 lg:px-12 py-32 bg-gray-50/50">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-black uppercase tracking-tighter text-black">Core Capabilities</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
                    {project.coreCapabilities.map((cap, i) => (
                        <div key={i} className="space-y-4 text-left group">

                            <h3 className="text-xl font-black uppercase tracking-tight text-black border-b border-black/5 pb-4 inline-block">{cap.title}</h3>
                            <p className="text-sm text-black/50 leading-relaxed font-light">{cap.content}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Key Features Architecture Redesign */}
            <section className="max-w-[1700px] mx-auto px-6 lg:px-12 py-32 bg-white">
                <div className="mb-20">
                    <h2 className="text-5xl font-black uppercase tracking-tighter text-black">
                        Key Features Architecture
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-stretch">
                    {/* Features List */}
                    <div className="w-full lg:w-[40%] space-y-0 divide-y divide-black/5">
                        {(project.keyFeaturesArchitecture?.items || project.keyFeaturesDetail.items).map((item, i) => (
                            <div key={i} className="py-12 group first:pt-0 last:pb-0">
                                <div className="space-y-3">
                                    <h4 className="text-xl font-black uppercase tracking-tight text-black leading-none">{item.title}</h4>
                                    <p className="text-base text-black/50 leading-relaxed font-light">{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sticky Tech Visual (Pinned) */}
                    <div className="w-full lg:w-[60%] flex flex-col justify-center sticky top-0 h-screen">
                        <div className="w-full h-full flex items-center justify-center">
                            <img
                                src={project.id === 1 ? timesheetVisual : archVisualNew}
                                alt="Architecture Visual"
                                className="w-full max-w-2xl mx-auto h-auto object-contain p-0"
                            />
                        </div>
                    </div>

                </div>

                <style>{`
                    .feat-outer {
                        position: relative;
                        overflow: hidden;
                        padding: 20px 0;
                    }
                    .feat-track {
                        display: flex;
                        align-items: center;
                        width: max-content;
                        animation: feat-scroll-projects 30s linear infinite;
                    }
                    .feat-logo-item {
                        padding: 0 40px;
                        flex-shrink: 0;
                    }
                    @keyframes feat-scroll-projects {
                        from { transform: translateX(0); }
                        to   { transform: translateX(-33.333%); }
                    }
                    .feat-fade-l, .feat-fade-r {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        width: 100px;
                        z-index: 10;
                        pointer-events: none;
                    }
                    .feat-fade-l { left: 0; background: linear-gradient(to right, #ffffff, transparent); }
                    .feat-fade-r { right: 0; background: linear-gradient(to left, #ffffff, transparent); }
                `}</style>
            </section >

            {/* Security Section Redesign */}
            < section className="max-w-[1700px] mx-auto px-6 lg:px-12 py-32" >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    <div className="lg:col-span-4 space-y-8">
                        <h2 className="text-6xl font-black uppercase tracking-tighter text-black leading-[0.9]">Security & Governance</h2>
                        <p className="text-black/60 text-lg font-light leading-relaxed italic">
                            "The architecture is designed with enterprise-grade security protocols, ensuring that every transaction is verified..."
                        </p>
                    </div>
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {project.securityGovernance.items.map((item, i) => (
                                <div key={i} className="space-y-4 group">
                                    <div className="flex items-center gap-4">
                                        <h4 className="text-lg font-black uppercase text-black">{item.title}</h4>
                                    </div>
                                    <p className="text-sm text-black/60 leading-relaxed font-light">
                                        {item.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section >

            {/* Outcome & Business Value — universal for premium projects */}
            {
                project.outcome && (
                    <section className="relative py-32 bg-[#002B54] overflow-hidden">
                        {/* Background Image with 50% opacity */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={outcomeBg}
                                alt="Outcome Background"
                                className="w-full h-full object-cover opacity-50"
                            />
                            <div className="absolute inset-0 bg-[#002B54]/50" /> {/* Extra overlay for readability */}
                        </div>

                        <div className="max-w-[1700px] mx-auto px-6 lg:px-12 relative z-10">
                            {/* Outcome Header */}
                            <div className="text-center max-w-4xl mx-auto mb-24">
                                <h2 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white mb-8">Outcome</h2>
                                <p className="text-xl lg:text-2xl text-white font-light leading-relaxed italic">
                                    "{project.outcome}"
                                </p>
                            </div>

                            {/* Business Value Grid */}
                            <div className="pt-24 border-t border-white/20">
                                <div className="text-center mb-16">
                                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Business Value</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                                    {project.businessValueStats.map((item, i) => (
                                        <div key={i} className="border-t border-white/10 pt-8 space-y-4">
                                            <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-none">
                                                {item.label}
                                            </h3>
                                            <p className="text-white/70 text-sm font-light leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
        </div >
    )
}

const ProjectsPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const projects = projectsData

    const [activeIndex, setActiveIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [internalImgIndex, setInternalImgIndex] = useState(0)
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
    const [isPlayingInline, setIsPlayingInline] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const inlineVideoRef = useRef(null)
    const containerRef = useRef(null)
    const revertTimerRef = useRef(null)
    const isInView = useInView(containerRef, { amount: 0.2 })

    // Auto-stop video if scrolled out of view
    useEffect(() => {
        if (!isInView && isPlayingInline) {
            setIsPlayingInline(false)
            setIsPaused(false)
        }
    }, [isInView, isPlayingInline])

    const clearRevertTimer = () => {
        if (revertTimerRef.current) {
            clearTimeout(revertTimerRef.current)
            revertTimerRef.current = null
        }
    }

    const startRevertTimer = () => {
        clearRevertTimer()
        revertTimerRef.current = setTimeout(() => {
            setIsPlayingInline(false)
            setIsPaused(false)
        }, 30000) // 30 seconds
    }

    useEffect(() => {
        if (isPlayingInline && isPaused) {
            startRevertTimer()
        } else {
            clearRevertTimer()
        }
        return () => clearRevertTimer()
    }, [isPlayingInline, isPaused])

    useEffect(() => {
        if (location.state?.projectIndex !== undefined) {
            const index = location.state.projectIndex
            if (index !== activeIndex) {
                setActiveIndex(index)
                setInternalImgIndex(0)
            }
        }
    }, [location.state, activeIndex])

    const currentProject = projects[activeIndex]

    useEffect(() => {
        if (isPlayingInline) return
        const imgCount = currentProject?.images?.length || 5
        const interval = setInterval(() => {
            setInternalImgIndex((prev) => (prev + 1) % imgCount)
        }, 3000)
        return () => clearInterval(interval)
    }, [activeIndex, isPlayingInline])

    const handleInlineVideoEnd = () => {
        setIsPlayingInline(false)
        setIsPaused(false)
        setIsDemoModalOpen(true)
    }

    const handleMaximize = (e) => {
        e.stopPropagation()
        if (inlineVideoRef.current) inlineVideoRef.current.pause()
        setIsPlayingInline(false)
        setIsPaused(false)
        setIsDemoModalOpen(true)
    }

    const togglePlayPause = () => {
        if (!inlineVideoRef.current) return
        if (inlineVideoRef.current.paused) {
            inlineVideoRef.current.play()
            setIsPaused(false)
        } else {
            inlineVideoRef.current.pause()
            setIsPaused(true)
        }
    }

    const startVideo = () => {
        setIsPlayingInline(true)
        setIsPaused(false)
    }


    if (currentProject.isPremiumLayout) {
        return (
            <div className="min-h-screen bg-white text-black relative">
                <ScrollToTop />
                <PremiumLayout project={currentProject} setIsDemoModalOpen={setIsDemoModalOpen} />
                <ProjectDemoModal
                    project={currentProject}
                    isOpen={isDemoModalOpen}
                    onClose={() => setIsDemoModalOpen(false)}
                />
            </div>
        )
    }

    return (
        <div
            className="pt-32 min-h-screen bg-white text-black relative"
        >
            <ScrollToTop />

            <section className="max-w-[1700px] mx-auto px-6 lg:px-12 py-8 pb-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 space-y-8" ref={containerRef}>
                        <div className="aspect-video relative overflow-hidden flex items-center justify-center rounded-[2rem] shadow-xl border border-black/5 bg-black">
                            <AnimatePresence mode="wait">
                                {!isPlayingInline && (
                                    <motion.img
                                        key={`${currentProject.id}-${internalImgIndex}`}
                                        src={currentProject.images[internalImgIndex]}
                                        alt={currentProject.title}
                                        initial={{ opacity: 0, x: 60 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -60 }}
                                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </AnimatePresence>

                            {/* Inline Video Player */}
                            {isPlayingInline && (
                                <div
                                    className="absolute inset-0 z-20 cursor-pointer"
                                    onClick={togglePlayPause}
                                >
                                    <video
                                        ref={inlineVideoRef}
                                        src={currentProject.demoVideo}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        controls={false}
                                        controlsList="nodownload"
                                        onContextMenu={(e) => e.preventDefault()}
                                        onEnded={handleInlineVideoEnd}
                                    />

                                    {/* Pause Indicator overlay */}
                                    {isPaused && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                                <Play size={32} fill="white" className="text-white ml-1" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Maximize / Fullscreen button */}
                                    <button
                                        onClick={handleMaximize}
                                        title="Open fullscreen"
                                        className="absolute bottom-4 right-4 z-30 flex items-center justify-center w-10 h-10 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white hover:bg-black/90 transition-all shadow-xl"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="15 3 21 3 21 9" />
                                            <polyline points="9 21 3 21 3 15" />
                                            <line x1="21" y1="3" x2="14" y2="10" />
                                            <line x1="3" y1="21" x2="10" y2="14" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            {/* Play Button Overlay — shown only when NOT playing inline */}
                            {!isPlayingInline && (
                                <button
                                    onClick={startVideo}
                                    className="absolute inset-0 flex flex-col items-center justify-center group/play z-20"
                                    aria-label="Play Demo"
                                >
                                    <div className="w-20 h-20 rounded-full bg-black/30 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-black/50">
                                        <Play size={28} fill="white" className="text-white ml-1" />
                                    </div>
                                    <span className="mt-3 text-white/90 text-[11px] font-bold uppercase tracking-widest drop-shadow-lg">Click to play demo</span>
                                </button>
                            )}
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black uppercase tracking-wider text-black/40 flex items-center gap-3">
                                Technology Matrix <div className="h-[1px] flex-1 bg-black/10" />
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 relative">
                                {currentProject.tech.map((tech) => (
                                    <span key={tech} className="px-5 py-2 rounded-xl bg-gray-50 border border-black/5 text-[10px] font-bold uppercase tracking-widest text-black">
                                        {tech}
                                    </span>
                                ))}

                                {/* New Launch Application Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/register')}
                                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2 group/launch"
                                >
                                    Launch Application
                                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover/launch:translate-x-0.5 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <div
                            key={currentProject.id}
                            className="space-y-8"
                        >
                            <div>
                                <h1 className="text-5xl font-black tracking-tighter uppercase leading-none mb-4 text-black">
                                    {currentProject.title}
                                </h1>
                                <p className="text-black text-lg font-black tracking-widest uppercase mb-6">{currentProject.tagline}</p>
                                <div className="h-[1px] w-full bg-black/10 mb-8" />
                            </div>
                            <div className="space-y-4">
                                <p className="text-sm text-black leading-relaxed font-light">
                                    {currentProject.fullDescription}
                                </p>
                                {currentProject.features && (
                                    <div className="pt-4 grid grid-cols-1 gap-4">
                                        {currentProject.features.map((feature, idx) => (
                                            <div key={idx} className="flex gap-4 items-start">
                                                <div className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                                                <div>
                                                    <div className="text-[10px] font-black uppercase text-black mb-1">{feature.title}</div>
                                                    <div className="text-xs text-black leading-relaxed">{feature.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div >

                {
                    currentProject.advancedFeatures && (
                        <div className={`mt-32 space-y-24 ${currentProject.id === 4 ? 'pb-32' : 'space-y-32'}`}>
                            {currentProject.advancedFeatures.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                                >
                                    <div className={`space-y-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                                        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none text-black">
                                            {feature.title}
                                        </h2>
                                        <p className="text-lg leading-relaxed font-light text-black/60">
                                            {feature.desc}
                                        </p>
                                        <div className="grid grid-cols-1 gap-6">
                                            {feature.subItems.map((sub, sIdx) => (
                                                <div key={sIdx}>
                                                    <div className="text-[10px] font-black uppercase tracking-wider mb-2 text-black">{sub.label}</div>
                                                    <div className="text-sm leading-relaxed font-light text-black/60">
                                                        {sub.content}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={`relative ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                                        <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden">
                                            <img
                                                src={feature.image}
                                                className="w-full h-full object-contain"
                                                alt={feature.title}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }

                {
                    (currentProject.biasFreeFramework || currentProject.complianceFramework || currentProject.securityFramework || currentProject.inventoryFramework || currentProject.procurementFramework) && (
                        <div className="mt-32 pb-40 border-t border-black/10 pt-20">
                            {(() => {
                                const framework = currentProject.biasFreeFramework || currentProject.complianceFramework || currentProject.securityFramework || currentProject.inventoryFramework || currentProject.procurementFramework;
                                return (
                                    <div className="space-y-12">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                            <div className="space-y-4">
                                                <h2 className="text-5xl font-black uppercase tracking-tighter leading-none text-black">
                                                    {framework.title}
                                                </h2>
                                            </div>
                                            <p className="text-xl font-light max-w-md leading-relaxed text-black">
                                                {framework.desc}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                            {framework.items.map((item, idx) => (
                                                <div key={idx}>
                                                    <div className="text-[11px] font-black uppercase tracking-wider mb-3 flex items-center gap-2 text-black">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                                                        {item.label}
                                                    </div>
                                                    <p className="text-base leading-relaxed font-light text-black">
                                                        {item.content}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    )
                }
            </section >

            <div className="fixed inset-0 pointer-events-none border-[1px] border-black/5 rounded-[3rem] m-4" />

            <ProjectDemoModal
                project={currentProject}
                isOpen={isDemoModalOpen}
                onClose={() => setIsDemoModalOpen(false)}
            />
        </div >
    )
}

export default ProjectsPage
