import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronRight, BarChart3, TrendingUp, Shield, PieChart, Sparkles, Play } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import ProjectDemoModal from '../components/ProjectDemoModal'
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

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springX = useSpring(mouseX, { stiffness: 100, damping: 20 })
    const springY = useSpring(mouseY, { stiffness: 100, damping: 20 })

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
    }

    const currentProject = projects[activeIndex]

    return (
        <div
            className="pt-32 min-h-screen bg-white text-black overflow-hidden relative cursor-default"
            onMouseMove={handleMouseMove}
        >
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

            <section className="max-w-[1700px] mx-auto px-6 lg:px-12 py-8 pb-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 space-y-8">
                        <div className="aspect-video relative rounded-[2.5rem] bg-gray-50 border border-blue-600/10 overflow-hidden shadow-2xl group flex items-center justify-center p-8">
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
                        </div>

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
                            <div className="flex flex-wrap items-center gap-2">
                                {currentProject.tech.map((tech) => (
                                    <span key={tech} className="px-5 py-2 rounded-xl bg-gray-50 border border-blue-600/10 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:border-blue-600/40 transition-colors">
                                        {tech}
                                    </span>
                                ))}
                                <button
                                    onClick={() => setIsDemoModalOpen(true)}
                                    className="px-5 py-2 rounded-xl bg-[#002B54] text-white flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg hover:-translate-y-0.5 group border border-white/10"
                                >
                                    <Play size={10} fill="currentColor" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Play Demo</span>
                                </button>
                            </div>
                        </div>
                    </div>

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
                                    <h1 className="text-5xl font-black tracking-tighter uppercase leading-none mb-4 text-black">
                                        {currentProject.title}
                                    </h1>
                                    <p className="text-blue-600 text-lg font-black tracking-widest uppercase mb-6">{currentProject.tagline}</p>
                                    <div className="h-[1px] w-full bg-blue-600/10 mb-8" />
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
                            </motion.div>
                        </AnimatePresence>
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
                                    {currentProject.id !== 4 && (
                                        <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-blue-600/5 border border-blue-600/10 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                                            Advanced Integration 0{idx + 1}
                                        </div>
                                    )}
                                    <h2 className="text-4xl font-black uppercase tracking-tighter leading-none text-black">
                                        {feature.title}
                                    </h2>
                                    <p className={`text-lg leading-relaxed font-light ${currentProject.id === 4 ? 'text-black' : 'text-gray-500'}`}>
                                        {feature.desc}
                                    </p>
                                    <div className="grid grid-cols-1 gap-6">
                                        {feature.subItems.map((sub, sIdx) => (
                                            <div key={sIdx} className={`${currentProject.id === 4 ? '' : 'p-6 rounded-2xl bg-gray-50 border border-blue-600/5 group hover:border-blue-600/20 transition-all'}`}>
                                                <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${currentProject.id === 4 ? 'text-black' : 'text-blue-600'}`}>{sub.label}</div>
                                                <div className={`text-sm leading-relaxed font-light ${currentProject.id === 4 ? 'text-black' : 'text-gray-500 group-hover:text-gray-900 transition-colors'}`}>
                                                    {sub.content}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={`relative ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div className={`relative aspect-[4/3] rounded-[3rem] overflow-hidden ${currentProject.id === 4 ? '' : 'shadow-2xl group'}`}>
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
                                                <div className="text-[11px] font-black uppercase tracking-[0.3em] mb-3 flex items-center gap-3 text-black">
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

            <div className="fixed inset-0 pointer-events-none border-[1px] border-blue-600/5 rounded-[3rem] m-4" />

            <ProjectDemoModal
                project={currentProject}
                isOpen={isDemoModalOpen}
                onClose={() => setIsDemoModalOpen(false)}
            />
        </div>
    )
}

export default ProjectsPage
