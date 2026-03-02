import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronRight, BarChart3, TrendingUp, Shield, PieChart, Sparkles, Play, CheckCircle2, CheckCircle, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import ProjectDemoModal from '../components/ProjectDemoModal'
import ScrollToTop from '../components/ScrollToTop'
import loginPageImg from '../assets/loginpage.jpg'
import backgroundImage from '../assets/2650401.jpg'
import designImage from '../assets/26760925_2112.i301.031.S.m004.c13.UI_and_UX_designers_concepts_isometric_composition-removebg-preview.png'
import caldimLogo from '../assets/caldim-logo.png'
import demoVid from '../assets/video/videoplayback.mp4'


import { projectsData } from '../data/projectsData'

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

    // Premium Layout Components
    const PremiumLayout = ({ project }) => {
        const iconMap = {
            Sparkles: <Sparkles className="text-blue-600" size={24} />,
            Shield: <Shield className="text-blue-600" size={24} />,
            BarChart3: <BarChart3 className="text-blue-600" size={24} />,
            PieChart: <PieChart className="text-blue-600" size={24} />,
            TrendingUp: <TrendingUp className="text-blue-600" size={24} />,
        }

        return (
            <div className="bg-white">
                {/* Hero Section */}
                <section className="max-w-[1700px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] font-serif">Strategy & Design</div>
                            <h1 className="text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-black">
                                Project Overview:<br />
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
                                <button className="px-10 py-5 bg-white border border-black/10 text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                                    View Roadmap
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
                        <div className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-4">Strategy</div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-black">{project.projectScope.title}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[project.projectScope.card1, project.projectScope.card2].map((card, i) => (
                            <div key={i} className={`p-12 rounded-[2.5rem] border ${i === 0 ? 'bg-red-50/30 border-red-100' : 'bg-blue-50/30 border-blue-100'} space-y-8`}>
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${i === 0 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {i === 0 ? <X size={24} /> : <CheckCircle2 size={24} />}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black uppercase tracking-tight text-black">{card.title}</h3>
                                    <p className="text-black/60 font-light leading-relaxed">{card.content}</p>
                                </div>
                                <div className="space-y-3">
                                    {card.items.map((item, j) => (
                                        <div key={j} className="flex items-center gap-3 text-sm font-medium text-black/80">
                                            <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-red-400' : 'bg-blue-400'}`} />
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
                        <div className="text-blue-500 text-xs font-black uppercase tracking-[0.3em] mb-4">Global Network</div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-8">{project.businessChallenges.title}</h2>
                        <p className="text-white/40 text-lg max-w-2xl mx-auto mb-16 font-light">{project.businessChallenges.desc}</p>
                        <div className="max-w-3xl mx-auto space-y-6">
                            {project.businessChallenges.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition-all group">
                                    <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <span className="text-white/80 font-medium tracking-wide">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Core Capabilities */}
                <section className="max-w-[1700px] mx-auto px-6 lg:px-12 py-32 bg-gray-50/50">
                    <div className="text-center mb-20">
                        <div className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-4">Features</div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-black">Core Capabilities</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {project.coreCapabilities.map((cap, i) => (
                            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-black/5 hover:shadow-2xl hover:shadow-blue-600/5 transition-all space-y-6 text-center group">
                                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                    {iconMap[cap.icon] || <Sparkles className="text-blue-600" size={24} />}
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-black">{cap.title}</h3>
                                <p className="text-xs text-black/40 leading-relaxed font-medium">{cap.content}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Key Features Detail */}
                <section className="max-w-[1700px] mx-auto px-6 lg:px-12 py-32">
                    <div className="mb-20">
                        <div className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-4">Deep Dive</div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-black mb-4">{project.keyFeaturesDetail.title}</h2>
                        <p className="text-black/40 italic font-medium">{project.keyFeaturesDetail.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {project.keyFeaturesDetail.items.map((item, i) => (
                            <div key={i} className="flex gap-8 items-start p-8 rounded-3xl border border-black/5 hover:bg-gray-50 transition-all">
                                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0">
                                    {iconMap[item.icon] || <Sparkles size={20} className="text-black" />}
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-xl font-black uppercase tracking-tight text-black">{item.title}</h4>
                                    <p className="text-sm text-black/60 leading-relaxed font-light">{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Business Value Stats Strip */}
                <section className="bg-blue-600 py-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-50" />
                    <div className="max-w-[1700px] mx-auto px-6 lg:px-12 relative z-10">
                        <div className="text-center mb-20">
                            <div className="text-white/60 text-xs font-black uppercase tracking-[0.3em] mb-4">Impact</div>
                            <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Projected Business Value</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 text-center text-white">
                            {project.businessValueStats.map((stat, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="text-7xl lg:text-8xl font-black tracking-tighter">{stat.value}</div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">{stat.label}</div>
                                        <div className="text-xs font-medium text-white/40">{stat.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Security Section Redesign */}
                <section className="max-w-[1700px] mx-auto px-6 lg:px-12 py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                        <div className="lg:col-span-4 space-y-8">
                            <div className="text-blue-600 text-xs font-black uppercase tracking-[0.3em]">Integrity</div>
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
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                <Shield size={18} />
                                            </div>
                                            <h4 className="text-lg font-black uppercase text-black">{item.title}</h4>
                                        </div>
                                        <p className="text-sm text-black/60 leading-relaxed font-light pl-14">
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

    if (currentProject.isPremiumLayout) {
        return (
            <div className="min-h-screen bg-white text-black overflow-hidden relative">
                <ScrollToTop />
                <PremiumLayout project={currentProject} />
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
            className="pt-32 min-h-screen bg-white text-black overflow-hidden relative"
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
