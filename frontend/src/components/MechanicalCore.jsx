import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { Cpu, Activity, Shield, Zap, Binary, ChevronRight, BarChart3, Layers, Database } from 'lucide-react'
import { Compass, Code2, Wrench, ShieldCheck, Rocket } from 'lucide-react'

/* ═══════════════════════════════════════════
   PIPELINE CONSTANTS
═══════════════════════════════════════════ */
const PIPELINE_STAGES = [
    { label: 'PLAN', Icon: Compass, color: '#002B54' },
    { label: 'CODE', Icon: Code2, color: '#002B54' },
    { label: 'BUILD', Icon: Wrench, color: '#002B54' },
    { label: 'TEST', Icon: ShieldCheck, color: '#002B54' },
    { label: 'DEPLOY', Icon: Rocket, color: '#002B54' },
]

const CODE_LINES = [
    { text: 'import { Engine } from "@caldim/core"', color: '#2563eb' },
    { text: 'const pipeline = new Engine({', color: '#002B54' },
    { text: '  modules: ["auth", "data", "api"],', color: '#0ea5e9' },
    { text: '  runtime: "edge-v3",', color: '#0ea5e9' },
    { text: '  cache: LRUCache(1024)', color: '#059669' },
    { text: '})', color: '#002B54' },
    { text: '', color: 'transparent' },
    { text: 'await pipeline.build()', color: '#7c3aed' },
    { text: '// ✓ Deployed to 12 regions', color: '#059669' },
]

const MechanicalCore = () => {
    const containerRef = useRef(null)

    // Smooth Mouse Physics (Existing)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

    const rotateX = useTransform(smoothY, [-300, 300], [10, -10])
    const rotateY = useTransform(smoothX, [-300, 300], [-10, 10])

    // Laptop Specific State & Motion
    const [pipelineVisible, setPipelineVisible] = useState(false)
    const [activePipelineStage, setActivePipelineStage] = useState(-1)
    const [codeStep, setCodeStep] = useState(0)
    const [isHoveringLaptop, setIsHoveringLaptop] = useState(false)

    const laptopMouseX = useMotionValue(0)
    const laptopMouseY = useMotionValue(0)
    const laptopSmoothX = useSpring(laptopMouseX, { stiffness: 50, damping: 30 })
    const laptopSmoothY = useSpring(laptopMouseY, { stiffness: 50, damping: 30 })

    const laptopRotateY = useTransform(laptopSmoothX, [-1, 1], [-12, 12])
    const laptopRotateX = useTransform(laptopSmoothY, [-1, 1], [8, -8])
    const laptopX = useTransform(laptopSmoothX, [-1, 1], [-20, 20])
    const laptopY = useTransform(laptopSmoothY, [-1, 1], [-15, 15])

    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()

        // Update existing isometric values
        mouseX.set(e.clientX - rect.left - rect.width / 2)
        mouseY.set(e.clientY - rect.top - rect.height / 2)

        // Update laptop normalized values
        const lx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
        const ly = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
        laptopMouseX.set(lx)
        laptopMouseY.set(ly)
    }, [mouseX, mouseY, laptopMouseX, laptopMouseY])

    // Pipeline auto-trigger
    useEffect(() => {
        const timer = setTimeout(() => {
            setPipelineVisible(true)
            let stageIdx = 0
            const stageInterval = setInterval(() => {
                setActivePipelineStage(stageIdx)
                stageIdx++
                if (stageIdx >= PIPELINE_STAGES.length) clearInterval(stageInterval)
            }, 400)
        }, 1800)
        return () => clearTimeout(timer)
    }, [])

    // Code line animation
    useEffect(() => {
        const t = setInterval(() => setCodeStep(s => (s + 1) % CODE_LINES.length), 700)
        return () => clearInterval(t)
    }, [])

    // Abstract Data Layers (Spread globally across the stage)
    const layers = [
        { id: 1, x: -500, y: -250, z: -150, icon: Cpu, color: 'text-blue-500', label: 'develp' },
        { id: 2, x: 500, y: -250, z: -150, icon: BarChart3, color: 'text-blue-500', label: 'ANALYTICS' },
        { id: 3, x: -500, y: 250, z: -150, icon: Shield, color: 'text-blue-500', label: 'SECURE' },
        { id: 4, x: 500, y: 250, z: -150, icon: Layers, color: 'text-blue-500', label: 'APPLICATION' },
    ]

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center cursor-default"
        >
            {/* 1. Enhanced Background & Dynamic Orbs */}
            <div className="absolute inset-0 bg-[#f8fafc]">
                {/* Primary Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] bg-[#002B54]/5 blur-[200px] rounded-full" />

                {/* Floating Accent Orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-[#002B54]/10 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 60, 0],
                        opacity: [0.05, 0.15, 0.05]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-[#002B54]/10 blur-[150px] rounded-full"
                />

                {/* Subtle Grid Accent */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(#002B54 1px, transparent 1px), linear-gradient(90deg, #002B54 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }} />
            </div>

            {/* 2. Enhanced Data Intersections */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                        initial={{
                            width: Math.random() * 600 + 400,
                            x: -1000,
                            y: Math.random() * 100 + "%"
                        }}
                        animate={{
                            x: ['-100%', '200%'],
                        }}
                        transition={{
                            duration: Math.random() * 12 + 8,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            {/* 3. The Isometric Stage */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    perspective: 2000,
                    transformStyle: 'preserve-3d'
                }}
                className="relative w-full h-full flex items-center justify-center"
            >
                {/* 4. Glass Sheets (Global Spread) */}
                <AnimatePresence>
                    {layers.map((layer) => (
                        <motion.div
                            key={layer.id}
                            initial={{ opacity: 0, z: -500, rotateY: 45 }}
                            animate={{
                                opacity: 1, // Full opacity for the container
                                z: layer.z,
                                x: layer.x,
                                y: [layer.y, layer.y - 30, layer.y],
                                rotateY: 0
                            }}
                            transition={{
                                duration: 2,
                                delay: layer.id * 0.2,
                                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
                            }}
                            className="absolute w-60 h-72 backdrop-blur-3xl rounded-[2.5rem] border-2 border-white/60 group shadow-[0_40px_100px_rgba(37,99,235,0.1)]"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.85))',
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            <div className="w-full h-full p-6 flex flex-col justify-between relative overflow-hidden">
                                <div className="space-y-4">
                                    <div className={`w-12 h-12 rounded-2xl bg-blue-50/80 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-500`}>
                                        <layer.icon className="w-6 h-6" style={{ color: '#002B54' }} strokeWidth={2} />
                                    </div>
                                    <div className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: '#002B54' }}>{layer.label}</div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-[3px] w-full bg-blue-100/80 relative overflow-hidden rounded-full">
                                        <motion.div
                                            className="absolute inset-y-0 left-0"
                                            style={{ background: '#002B54' }}
                                            animate={{ width: ['0%', '100%', '0%'] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: layer.id * 0.5 }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="h-10 flex items-end gap-1.5">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-1.5 rounded-full"
                                                    style={{ background: 'rgba(0,43,84,0.4)' }}
                                                    animate={{ height: [8, Math.random() * 25 + 8, 8] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                                />
                                            ))}
                                        </div>
                                        <div className="w-8 h-8 rounded-full border border-blue-50 flex items-center justify-center bg-white shadow-sm">
                                            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#002B54' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>


                {/* 5. Central Hero Content (Centered & Updated) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, z: 200 }}
                    animate={{ opacity: 1, scale: 1, z: 250 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="relative text-center select-none z-10 max-w-5xl px-8"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div className="flex flex-col items-center gap-6">
                        {/* Smaller CALDIM SOLUTIONS branding */}
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-[1px] bg-[#002B54]/30" />
                            <h2 className="text-sm font-black uppercase tracking-[0.8em] opacity-60" style={{ color: '#00aaffff' }}>CALDIM SOLUTIONS</h2>
                            <div className="w-8 h-[1px] bg-[#002B54]/30" />
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 uppercase" style={{ color: '#002B54' }}>
                            Smart<br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(0, 43, 84, 0.4)' }}>Software</span> Solutions
                        </h1>

                        {/* Description */}
                        <div className="max-w-3xl space-y-4">
                            <p className="text-base md:text-lg font-medium leading-relaxed opacity-60" style={{ color: '#002B54' }}>
                                Custom-built digital systems that streamline workflows, enhance visibility, and improve decision-making across modern organizations.
                            </p>
                            <p className="text-base md:text-lg font-medium leading-relaxed opacity-60" style={{ color: '#002B54' }}>
                                Custom web applications and cloud solutions designed to maximize your ROI and streamline your operations.
                            </p>
                        </div>

                        {/* Button */}
                        <motion.button
                            whileHover={{ scale: 1.05, y: -5, boxShadow: '0 30px 60px rgba(0, 43, 84, 0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 px-12 py-5 text-white font-black uppercase text-[10px] tracking-[0.5em] rounded-full shadow-2xl transition-all inline-flex items-center gap-4"
                            style={{ background: '#002B54' }}
                        >
                            Initialize System
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>

            {/* 6. Static Noise Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] contrast-150 brightness-150 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    )
}

export default MechanicalCore

