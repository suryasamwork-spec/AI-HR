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
            title: 'Data Insights Pro',
            tagline: 'High-Fidelity Analytics',
            description: 'Advanced dashboard with glassmorphism and real-time insights.',
            fullDescription: 'Experience the pinnacle of data visualization with our Insights Pro dashboard. Built with a focus on UX design, it features vibrant blue and cyan charts, interactive tooltips, and a sleek glassmorphism interface that makes complex data digestible.',
            tech: ['React', 'D3.js', 'Framer Motion', 'Tailwind'],
            gradient: 'from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff]',
            images: [loginPageImg, backgroundImage, designImage, loginPageImg, backgroundImage],
            icon: BarChart3,
            year: '2024',
            client: 'Insight Global',
            theme: 'cyan'
        },
        {
            id: 2,
            title: 'Cloud Neural Matrix',
            tagline: 'Abstract 3D Motion',
            description: 'Isometric glass layers and flowing data lines.',
            fullDescription: 'A futuristic data-processing architecture rendered in 3D. Translucent glass layers float and intersect as glowing data lines flow through the system. This project showcases our capability in building sophisticated, high-tech minimalism.',
            tech: ['Three.js', 'Go', 'Redis', 'TensorFlow'],
            gradient: 'from-[#6366f1] via-[#a855f7] to-[#d946ef]',
            images: [designImage, loginPageImg, backgroundImage, designImage, loginPageImg],
            icon: TrendingUp,
            year: '2023',
            client: 'AlphaCore Systems',
            theme: 'purple'
        },
        {
            id: 3,
            title: 'SecureFlow Suite',
            tagline: 'Geometric Micro-Interaction',
            description: 'Minimalist geometric logo animation and snappy easing.',
            fullDescription: 'Focusing on the fine details of security. This suite uses minimalist geometric logo animations and snappy easing to represent technical precision. Hexagons morph into checkmarks with fluid liquid motion, reflecting our secure infrastructure management.',
            tech: ['Rust', 'WebAssembly', 'Lottie', 'AES-256'],
            gradient: 'from-[#22c55e] via-[#10b981] to-[#3b82f6]',
            images: [backgroundImage, designImage, loginPageImg, backgroundImage, designImage],
            icon: Shield,
            year: '2023',
            client: 'SecureFlow Inc',
            theme: 'green'
        },
        {
            id: 4,
            title: 'Venture Predictor',
            tagline: '2D Vector Explainer',
            description: 'Approachable design for complex financial forecasting.',
            fullDescription: 'Bridging the gap between high-level engineering and user-friendly design. Featuring stylized character animations and bouncy, approachable motion graphics, this platform makes financial forecasting accessible and trustworthy.',
            tech: ['Node.js', 'PostgreSQL', 'Socket.io', 'GSAP'],
            gradient: 'from-[#f59e0b] via-[#ef4444] to-[#ec4899]',
            images: [caldimLogo, backgroundImage, designImage, caldimLogo, backgroundImage],
            icon: PieChart,
            year: '2024',
            client: 'FinTech Solutions',
            theme: 'orange'
        }
    ]

    const [activeIndex, setActiveIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [internalImgIndex, setInternalImgIndex] = useState(0)

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

    return (
        <div
            className="pt-24 min-h-screen bg-[#010826] text-white overflow-hidden relative cursor-default"
            onMouseMove={handleMouseMove}
        >
            {/* Background Data Stream Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                        initial={{
                            width: Math.random() * 200 + 100,
                            x: -500,
                            y: Math.random() * 100 + "%"
                        }}
                        animate={{
                            x: ['-100%', '200%'],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 10
                        }}
                    />
                ))}
            </div>

            <section className="max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 py-8 sm:py-12 relative z-10">
                <div className="flex flex-col items-center gap-8 sm:gap-12">
                    {/* TOP: The 3D Hyper-Stack */}
                    <div
                        className="w-full max-w-6xl h-[350px] sm:h-[500px] relative flex items-center justify-center select-none cursor-pointer"
                        onClick={handleNext}
                        style={{ perspective: '4000px' }}
                    >
                        <motion.div
                            className="relative w-full max-w-xs sm:max-w-3xl aspect-video"
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            <AnimatePresence initial={false}>
                                {[2, 1, 0].map((stackPos) => {
                                    const project = getProjectData(activeIndex + stackPos)
                                    const currentImages = project.images || [project.image]

                                    return (
                                        <motion.div
                                            key={project.id}
                                            initial={{
                                                opacity: 0,
                                                z: -500,
                                                x: 500,
                                                rotateY: 45
                                            }}
                                            animate={{
                                                opacity: stackPos === 0 ? 1 : 0.4 - stackPos * 0.1,
                                                scale: 1 - stackPos * 0.1,
                                                z: stackPos * -80,
                                                x: stackPos * 30,
                                                rotateY: stackPos * -15,
                                                rotateZ: stackPos * 2,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                x: -800,
                                                rotateZ: -45,
                                                rotateY: -90,
                                                scale: 1.2,
                                                filter: 'blur(20px)'
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 100,
                                                damping: 20
                                            }}
                                            className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] bg-[#0A0E27] border border-white/10 shadow-[0_40px_60px_rgba(0,0,0,0.5)] overflow-hidden group/card"
                                            style={{ transformStyle: 'preserve-3d' }}
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
                                            <div className="absolute inset-2 rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center">
                                                <AnimatePresence mode="wait">
                                                    <motion.img
                                                        key={`${project.id}-${internalImgIndex}`}
                                                        src={currentImages[stackPos === 0 ? internalImgIndex : 0]}
                                                        alt="Project Preview"
                                                        initial={{ opacity: 0, scale: 1.1 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        transition={{ duration: 0.6 }}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </AnimatePresence>

                                                {/* Navigation Dots for Internal Images */}
                                                {stackPos === 0 && (
                                                    <div className="absolute bottom-4 flex gap-1.5 z-30">
                                                        {currentImages.map((_, dotIdx) => (
                                                            <div
                                                                key={dotIdx}
                                                                className={`h-1 rounded-full transition-all duration-500 ${dotIdx === internalImgIndex ? 'w-6 bg-cyan-400' : 'w-1.5 bg-white/20'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {stackPos === 0 && (
                                                <div className="absolute inset-x-0 bottom-4 sm:bottom-8 flex justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-500 transform translate-y-4 group-hover/card:translate-y-0 z-40">
                                                    <div
                                                        className="bg-black/60 backdrop-blur-2xl border border-white/20 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full flex items-center gap-4 shadow-2xl hover:bg-black/80 transition-colors"
                                                        onClick={handleInternalNext}
                                                    >
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Next View</span>
                                                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cyan-400 flex items-center justify-center">
                                                            <ChevronRight size={12} className="text-black" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* BOTTOM: Detail Reveal */}
                    <div className="w-full max-w-3xl relative flex flex-col items-center text-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="space-y-4 sm:space-y-6"
                            >
                                <motion.div
                                    variants={{
                                        initial: { opacity: 0, scale: 0.9, y: 20 },
                                        animate: { opacity: 1, scale: 1, y: 0 },
                                        exit: { opacity: 0, scale: 1.1, y: -20 }
                                    }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                >
                                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tighter text-white select-none">
                                        {projects[activeIndex].title}
                                    </h1>
                                </motion.div>

                                <motion.div
                                    variants={{
                                        initial: { opacity: 0, y: 30 },
                                        animate: { opacity: 1, y: 0 },
                                        exit: { opacity: 0, y: -30 }
                                    }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="space-y-6 flex flex-col items-center"
                                >
                                    <p className="text-sm sm:text-base md:text-lg text-blue-100/60 leading-relaxed max-w-xl font-light px-4">
                                        {projects[activeIndex].fullDescription}
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-2 px-6">
                                        {projects[activeIndex].tech.map((t, i) => (
                                            <span key={i} className="px-3 sm:px-4 py-1 sm:py-1.5 bg-white/5 border border-white/5 rounded-lg sm:rounded-xl text-cyan-300 text-[7px] sm:text-[8px] font-black uppercase tracking-[0.2em]">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Project Gallery - Multiple Images */}
                                    <div className="flex justify-center gap-4 py-4 px-6 overflow-hidden">
                                        {[projects[activeIndex].image, backgroundImage, designImage].map((img, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ scale: 1.1, rotate: 2 }}
                                                className="w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden border border-white/10 glass-card"
                                            >
                                                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto px-10 sm:px-0">
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-black uppercase text-[8px] sm:text-[9px] tracking-[0.3em] rounded-full shadow-2xl flex items-center justify-center gap-2"
                                        >
                                            <Sparkles size={12} />
                                            Live Demo
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full sm:w-auto px-8 py-3.5 bg-white/5 text-white font-black uppercase text-[8px] sm:text-[9px] tracking-[0.3em] rounded-full border border-white/10 backdrop-blur-xl"
                                        >
                                            Technical Docs
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Timeline Selector */}
                <div className="mt-12 sm:mt-24 flex justify-center items-center gap-3 sm:gap-6 relative overflow-x-auto sm:overflow-visible no-scrollbar px-4">
                    <div className="hidden sm:block absolute h-[1px] w-[600px] bg-white/10 left-1/2 -translate-x-1/2 pointer-events-none" />
                    {projects.map((p, i) => (
                        <button
                            key={p.id}
                            onClick={() => setActiveIndex(i)}
                            className="relative group py-6 sm:py-8 px-2 sm:px-4 shrink-0"
                        >
                            <div className={`h-1.5 transition-all duration-700 rounded-full ${i === activeIndex ? 'w-16 sm:w-24 bg-cyan-400 shadow-[0_0_30px_#00ffff]' : 'w-3 sm:w-4 bg-white/20 hover:bg-white/40'}`} />
                        </button>
                    ))}
                </div>
            </section >
        </div >
    )
}

export default ProjectsPage
