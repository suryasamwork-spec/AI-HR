import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView, animate } from 'framer-motion'
import { ChevronRight, BarChart3, TrendingUp, Shield, PieChart, Sparkles, Play, CheckCircle2, CheckCircle, X, Network, Cpu, Database, Gauge, Cloud, AlertCircle } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import ProjectDemoModal from '../components/ProjectDemoModal'
import ScrollToTop from '../components/ScrollToTop'
import loginPageImg from '../assets/loginpage.jpg'
import backgroundImage from '../assets/2650401.jpg'
import designImage from '../assets/26760925_2112.i301.031.S.m004.c13.UI_and_UX_designers_concepts_isometric_composition-removebg-preview.png'
import caldimLogo from '../assets/caldim-logo.png'
import demoVid from '../assets/video/videoplayback.mp4'
import archVisualNew from '../assets/slazzer-preview-twxul.png'
import timesheetVisual from '../assets/standard-quality-control-concept-m.jpg'
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
                        <h1 className="text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-black">
                            {project.hero.title}
                        </h1>
                        <p className="text-xl text-black font-light leading-relaxed max-w-xl italic">
                            "{project.hero.subtitle}" {project.hero.description}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                onClick={() => setIsDemoModalOpen(true)}
                                className="px-10 py-5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
                            >
                                <Play size={14} fill="currentColor" />
                                Demo Video
                            </button>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-blue-600/5 rounded-[3rem] blur-3xl transform group-hover:scale-105 transition-transform duration-700" />
                        <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-black/5">
                            <img src={project.images[0]} className="w-full h-full object-cover" alt="hero" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Scope Section */}
            <section className="max-w-[1700px] mx-auto px-6 lg:px-12 py-24 border-t border-black/5">
                <div className="mb-16">
                    <h2 className="text-5xl font-black uppercase tracking-tighter text-black">{project.projectScope.title}</h2>
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
            </section>

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
                            {cap.logo && logoMap[cap.logo] && project.id !== 1 && (
                                <div className="mb-6 h-12 flex items-center justify-start">
                                    <img
                                        src={logoMap[cap.logo]}
                                        alt="tech logo"
                                        className="h-full w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            )}
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
                    <div className="w-full lg:w-[60%] flex flex-col justify-start">
                        <div className="sticky top-32 h-fit space-y-12">
                            <img
                                src={project.id === 1 ? timesheetVisual : archVisualNew}
                                alt="Architecture Visual"
                                className="w-full max-w-md mx-auto h-auto object-contain p-0"
                            />

                            {/* Tech Stack Marquee — hidden for Employee Timesheet (id 1) */}
                            {project.id !== 1 && (
                                <div className="feat-outer scale-75">
                                    <div className="feat-track">
                                        {[...Array(3)].map((_, i) => (
                                            <React.Fragment key={i}>
                                                {[javaLogo, cppLogo, jsLogo, pyLogo, mongoLogo, nodeLogo, reactLogo].map((logo, j) => (
                                                    <div key={`${i}-${j}`} className="feat-logo-item">
                                                        <img
                                                            src={logo}
                                                            alt="tech logo"
                                                            className="h-10 w-auto object-contain opacity-100 hover:scale-110 transition-transform duration-300"
                                                        />
                                                    </div>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <div className="feat-fade-l" />
                                    <div className="feat-fade-r" />
                                </div>
                            )}
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
                    </div>
                </div>
            </section>

            {/* Business Value Stats Strip — hidden for Employee Timesheet (id 1) */}
            {project.id !== 1 && (
                <section className="bg-[#002B54] py-20 relative overflow-hidden">
                    <div className="max-w-[1700px] mx-auto px-6 lg:px-12 relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Business Value</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 text-center text-white">
                            {project.businessValueStats.map((stat, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="text-6xl lg:text-7xl font-black tracking-tighter">
                                        <Counter value={stat.value} />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">{stat.label}</div>
                                        <div className="text-[11px] font-medium text-white/30 leading-tight px-4">{stat.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Business Value — Employee Timesheet only (id 1) */}
            {project.id === 1 && (
                <section className="bg-[#002B54] py-24 relative overflow-hidden">
                    <div className="max-w-[1700px] mx-auto px-6 lg:px-12 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Business Value</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                            {[
                                {
                                    title: 'Transparency',
                                    desc: 'Complete visibility into hours worked, project allocation, and workforce activity.'
                                },
                                {
                                    title: 'Traceability',
                                    desc: 'Comprehensive audit trail supporting compliance and accountability.'
                                },
                                {
                                    title: 'Faster Settlement',
                                    desc: 'Automated processing enables quicker payroll preparation with reduced errors.'
                                },
                                {
                                    title: 'Productivity Insights',
                                    desc: 'Data-driven analysis supports better workforce planning and performance optimization.'
                                }
                            ].map((item, i) => (
                                <div key={i} className="border-t border-white/10 pt-8 space-y-4">
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-none">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/50 text-sm font-light leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Security Section Redesign */}
            <section className="max-w-[1700px] mx-auto px-6 lg:px-12 py-32">
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
            </section>
        </div>
    )
}

const ProjectsPage = () => {
    const location = useLocation()
    const projects = projectsData

    const [activeIndex, setActiveIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [internalImgIndex, setInternalImgIndex] = useState(0)
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

    useEffect(() => {
        if (location.state?.projectIndex !== undefined) {
            const index = location.state.projectIndex
            if (index !== activeIndex) {
                setActiveIndex(index)
                setInternalImgIndex(0)
            }
        }
    }, [location.state, activeIndex])

    useEffect(() => {
        const interval = setInterval(() => {
            setInternalImgIndex((prev) => (prev + 1) % 5)
        }, 4000)
        return () => clearInterval(interval)
    }, [])


    const currentProject = projects[activeIndex]


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
                    <div className="lg:col-span-7 space-y-8">
                        <div className="aspect-video relative overflow-hidden flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={`${currentProject.id}-${internalImgIndex}`}
                                    src={currentProject.images[internalImgIndex]}
                                    alt={currentProject.title}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full object-contain relative z-10"
                                />
                            </AnimatePresence>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                            {currentProject.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setInternalImgIndex(idx)}
                                    className={`relative flex-shrink-0 w-28 aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${internalImgIndex === idx ? 'border-black scale-105' : 'border-gray-200 opacity-50'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover" alt="view" />
                                </button>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black uppercase tracking-wider text-black/40 flex items-center gap-3">
                                Technology Matrix <div className="h-[1px] flex-1 bg-black/10" />
                            </h3>
                            <div className="flex flex-wrap items-center gap-2">
                                {currentProject.tech.map((tech) => (
                                    <span key={tech} className="px-5 py-2 rounded-xl bg-gray-50 border border-black/5 text-[10px] font-bold uppercase tracking-widest text-black">
                                        {tech}
                                    </span>
                                ))}
                                <button
                                    onClick={() => setIsDemoModalOpen(true)}
                                    className="px-5 py-2 rounded-xl bg-black text-white flex items-center gap-2 transition-all border border-white/10"
                                >
                                    <Play size={10} fill="currentColor" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Play Demo</span>
                                </button>
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
                </div>

                {currentProject.advancedFeatures && (
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
                )}

                {(currentProject.biasFreeFramework || currentProject.complianceFramework || currentProject.securityFramework || currentProject.inventoryFramework || currentProject.procurementFramework) && (
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
                )}
            </section>

            <div className="fixed inset-0 pointer-events-none border-[1px] border-black/5 rounded-[3rem] m-4" />

            <ProjectDemoModal
                project={currentProject}
                isOpen={isDemoModalOpen}
                onClose={() => setIsDemoModalOpen(false)}
            />
        </div>
    )
}

export default ProjectsPage
