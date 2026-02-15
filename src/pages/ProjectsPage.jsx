import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Github, Play, ArrowLeft, Shield, Cpu, Zap, ChevronRight, Layers, BarChart3, PieChart, TrendingUp, Search, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProjectsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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

                <div className="flex flex-col lg:flex-row items-center gap-24 min-h-[650px]">
                    {/* LEFT: The Detail Reveal Engine */}
                    <div className="flex-1 w-full order-2 lg:order-1 relative h-[500px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="space-y-12"
                            >
                                {/* Sequential Entry: Stage 1 (Top Meta) */}
                                <motion.div
                                    variants={{
                                        initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
                                        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
                                        exit: { opacity: 0, y: -20, filter: 'blur(10px)' }
                                    }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex items-center gap-6"
                                >
                                    <div className="w-12 h-[1px] bg-gradient-to-r from-cyan-400 to-transparent" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-400">0{projects[activeIndex].id} // {projects[activeIndex].tagline}</span>
                                </motion.div>

                                {/* Stage 2: Hero Title Reveal */}
                                <motion.div
                                    variants={{
                                        initial: { opacity: 0, scale: 0.9, x: 100 },
                                        animate: { opacity: 1, scale: 1, x: 0 },
                                        exit: { opacity: 0, scale: 1.1, x: -100 }
                                    }}
                                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <h1 className="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter text-white mb-6 select-none underline-offset-8">
                                        {projects[activeIndex].title.split(' ').map((word, i) => (
                                            <span key={i} className="block last:opacity-40">
                                                {word}
                                            </span>
                                        ))}
                                    </h1>
                                </motion.div>

                                {/* Stage 3: Content Body & Actions */}
                                <motion.div
                                    variants={{
                                        initial: { opacity: 0, x: 50, filter: 'blur(5px)' },
                                        animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
                                        exit: { opacity: 0, x: -50, filter: 'blur(5px)' }
                                    }}
                                    transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                    className="space-y-10"
                                >
                                    <p className="text-xl text-blue-100/40 leading-relaxed max-w-xl font-light border-l border-white/10 pl-8">
                                        {projects[activeIndex].fullDescription}
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                        {projects[activeIndex].tech.map((t, i) => (
                                            <span key={i} className="px-6 py-2.5 bg-white/5 border border-white/5 rounded-2xl text-cyan-300 text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-3xl shadow-xl">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05, x: 10, backgroundColor: 'rgba(255,255,255,1)' }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-10 py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] rounded-full shadow-2xl transition-all flex items-center gap-3"
                                        >
                                            <Sparkles size={14} />
                                            Live Demo
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05, x: 10, background: "rgba(255,255,255,0.08)" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-10 py-5 bg-white/5 text-white font-black uppercase text-[10px] tracking-[0.4em] rounded-full border border-white/10 backdrop-blur-xl transition-all"
                                        >
                                            Technical Docs
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT: The 3D Hyper-Stack (Redesigned Interaction) */}
                    <div
                        className="flex-1 w-full max-w-[550px] h-[600px] relative order-1 lg:order-2 flex items-center justify-center select-none cursor-pointer"
                        onClick={handleNext}
                        style={{ perspective: '3000px' }}
                    >
                        <motion.div
                            className="relative w-full h-[500px]"
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
                                                z: stackPos * -150,
                                                x: stackPos * 60,
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
                                            className="absolute inset-0 rounded-[4rem] bg-[#0A0E27] border border-white/10 shadow-[0_80px_100px_rgba(0,0,0,0.5)] overflow-hidden group"
                                            style={{ transformStyle: 'preserve-3d' }}
                                        >
                                            {/* Visual Aesthetic Layers */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
                                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />

                                            <div className="absolute inset-8 rounded-[3.5rem] overflow-hidden bg-black/40 border border-white/5 flex flex-col items-center justify-center p-12 text-center backdrop-blur-3xl">
                                                <motion.div
                                                    animate={{
                                                        y: stackPos === 0 ? [0, -15, 0] : 0,
                                                        rotate: stackPos === 0 ? [0, 5, -5, 0] : 0
                                                    }}
                                                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                                    className={`w-44 h-44 bg-gradient-to-br ${project.gradient} rounded-[3rem] flex items-center justify-center shadow-[0_40px_80px_rgba(0,0,0,0.6)] mb-12 relative group-hover:scale-110 transition-transform duration-700`}
                                                >
                                                    <project.icon className="text-white w-20 h-20" strokeWidth={1} />
                                                    <div className="absolute inset-0 bg-white/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full scale-150" />
                                                </motion.div>

                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <div className="h-[1px] w-6 bg-cyan-400/50" />
                                                        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400">DATA_SET_{project.id}</div>
                                                        <div className="h-[1px] w-6 bg-cyan-400/50" />
                                                    </div>
                                                    <div className="text-4xl font-black text-white leading-tight uppercase tracking-tighter">{project.title}</div>
                                                    <div className="w-16 h-1 bg-white/10 mx-auto rounded-full group-hover:w-32 group-hover:bg-cyan-400 transition-all duration-700" />
                                                </div>
                                            </div>

                                            
                                            {stackPos === 0 && (
                                                <div className="absolute inset-x-0 bottom-16 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                                    <div className="bg-black/60 backdrop-blur-2xl border border-white/20 px-10 py-4 rounded-full flex items-center gap-6 shadow-2xl">
                                                        <span className="text-[9px] font-black tracking-[0.4em] text-cyan-400">SWIPE ARCHIVE</span>
                                                        <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center">
                                                            <ChevronRight size={14} className="text-black" />
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
                                        SELECTION.0{p.id}
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
