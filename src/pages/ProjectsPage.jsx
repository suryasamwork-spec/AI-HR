import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Github, Play, ArrowLeft, Shield, Cpu, Zap, ChevronRight, Layers, BarChart3, PieChart, TrendingUp, Search, Sparkles } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import loginPageImg from '../assets/loginpage.jpg'


const ProjectsPage = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
        if (location.state && typeof location.state.projectIndex === 'number') {
            setActiveIndex(location.state.projectIndex)
        }
    }, [location])

    const projects = [
        {
            id: 1,
            title: 'Data Insights Pro',
            tagline: 'High-Fidelity Analytics',
            description: 'Advanced dashboard with glassmorphism and real-time insights.',
            fullDescription: 'Experience the pinnacle of data visualization with our Insights Pro dashboard. Built with a focus on UX design, it features vibrant blue and cyan charts, interactive tooltips, and a sleek glassmorphism interface that makes complex data digestible.',
            tech: ['React', 'D3.js', 'Framer Motion', 'Tailwind'],
            gradient: 'from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff]',
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
            icon: PieChart,
            year: '2024',
            client: 'FinTech Solutions',
            theme: 'orange'
        }
    ]

    const [activeIndex, setActiveIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

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
        setTimeout(() => setIsAnimating(false), 800)
    }

    const getProjectData = (index) => projects[(index + projects.length) % projects.length]

    return (
        <div
            className="pt-24 min-h-screen bg-[#010826] text-white overflow-hidden relative cursor-default"
            onMouseMove={handleMouseMove}
        >
            {/* Background Data Stream Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(20)].map((_, i) => (
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

            <section className="max-w-7xl mx-auto px-6 py-12 relative z-10 h-full">
                {/* <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all mb-16 group">
                    <div className="w-10 h-10 rounded-full border border-cyan-400/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-400/10 transition-all">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Project Repository</span>
                </Link> */}

                <div className="flex flex-col items-center gap-12">
                    {/* TOP: The 3D Hyper-Stack (Compact Image Section) */}
                    <div
                        className="w-full max-w-5xl h-[450px] relative flex items-center justify-center select-none cursor-pointer"
                        onClick={handleNext}
                        style={{ perspective: '3000px' }}
                    >
                        <motion.div
                            className="relative w-full max-w-3xl aspect-video"
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            <AnimatePresence initial={false}>
                                {[2, 1, 0].map((stackPos) => {
                                    const project = getProjectData(activeIndex + stackPos)
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
                                                z: stackPos * -120,
                                                x: stackPos * 40,
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
                                            className="absolute inset-0 rounded-[2rem] bg-[#0A0E27] border border-white/10 shadow-[0_40px_60px_rgba(0,0,0,0.5)] overflow-hidden group"
                                            style={{ transformStyle: 'preserve-3d' }}
                                        >
                                            {/* Visual Aesthetic Layers */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
                                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />

                                            <div className="absolute inset-2 rounded-[1.5rem] overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center">
                                                <img src={loginPageImg} alt="Project Preview" className="w-full h-full object-contain" />
                                            </div>


                                            {stackPos === 0 && (
                                                <div className="absolute inset-x-0 bottom-8 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                                    <div className="bg-black/60 backdrop-blur-2xl border border-white/20 px-6 py-2 rounded-full flex items-center gap-4 shadow-2xl">
                                                        <div className="w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center">
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

                    {/* BOTTOM: The Detail Reveal Engine (Compact & Centered) */}
                    <div className="w-full max-w-3xl relative flex flex-col items-center text-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="space-y-6"
                            >
                                {/* Stage 2: Hero Title Reveal */}
                                <motion.div
                                    variants={{
                                        initial: { opacity: 0, scale: 0.9, y: 20 },
                                        animate: { opacity: 1, scale: 1, y: 0 },
                                        exit: { opacity: 0, scale: 1.1, y: -20 }
                                    }}
                                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter text-white mb-2 select-none">
                                        {projects[activeIndex].title}
                                    </h1>
                                </motion.div>

                                {/* Stage 3: Content Body & Actions */}
                                <motion.div
                                    variants={{
                                        initial: { opacity: 0, y: 30, filter: 'blur(5px)' },
                                        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
                                        exit: { opacity: 0, y: -30, filter: 'blur(5px)' }
                                    }}
                                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="space-y-6 flex flex-col items-center"
                                >
                                    <p className="text-lg text-blue-100/60 leading-relaxed max-w-xl font-light">
                                        {projects[activeIndex].fullDescription}
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-2">
                                        {projects[activeIndex].tech.map((t, i) => (
                                            <span key={i} className="px-4 py-1.5 bg-white/5 border border-white/5 rounded-xl text-cyan-300 text-[8px] font-black uppercase tracking-[0.2em] backdrop-blur-3xl shadow-xl">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex justify-center gap-4 pt-2">
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(255,255,255,1)' }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-3.5 bg-white text-black font-black uppercase text-[9px] tracking-[0.3em] rounded-full shadow-2xl transition-all flex items-center gap-2"
                                        >
                                            <Sparkles size={12} />
                                            Live Demo
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2, background: "rgba(255,255,255,0.08)" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-3.5 bg-white/5 text-white font-black uppercase text-[9px] tracking-[0.3em] rounded-full border border-white/10 backdrop-blur-xl transition-all"
                                        >
                                            Technical Docs
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* CYBERPUNK TIMELINE SELECTOR */}
                <div className="mt-24 flex justify-center items-center gap-6 relative">
                    <div className="absolute h-[1px] w-[600px] bg-white/10 left-1/2 -translate-x-1/2 pointer-events-none" />
                    {projects.map((p, i) => (
                        <button
                            key={p.id}
                            onClick={() => setActiveIndex(i)}
                            className="relative group py-8 px-4"
                        >
                            <div className={`h-1.5 transition-all duration-700 rounded-full ${i === activeIndex ? 'w-24 bg-cyan-400 shadow-[0_0_30px_#00ffff]' : 'w-4 bg-white/20 hover:bg-white/40'}`} />
                            <AnimatePresence>
                                {i === activeIndex && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-black tracking-widest text-cyan-400"
                                    >
                                        {/* SELECTION.0{p.id} */}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    ))}
                </div>
            </section >
        </div >
    )
}

export default ProjectsPage
