import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Compass, Code2, Wrench, ShieldCheck, Rocket } from 'lucide-react'

/* ═══════════════════════════════════════════
   INTERACTIVE HERO — white 80% + #002B54 20%
   Laptop with cursor interactivity
   Code pipeline pops up from screen
═══════════════════════════════════════════ */

const PIPELINE_STAGES = [
    { label: 'PLAN', Icon: Compass, color: '#2563eb' },
    { label: 'CODE', Icon: Code2, color: '#0ea5e9' },
    { label: 'BUILD', Icon: Wrench, color: '#002B54' },
    { label: 'TEST', Icon: ShieldCheck, color: '#059669' },
    { label: 'DEPLOY', Icon: Rocket, color: '#7c3aed' },
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

const StartupInnovationHero = () => {
    const containerRef = useRef(null)
    const [pipelineVisible, setPipelineVisible] = useState(false)
    const [activePipelineStage, setActivePipelineStage] = useState(-1)
    const [codeStep, setCodeStep] = useState(0)
    const [isHoveringLaptop, setIsHoveringLaptop] = useState(false)

    // Mouse physics
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 })
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 })

    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
        mouseX.set(x)
        mouseY.set(y)
    }, [mouseX, mouseY])

    // Laptop 3D transforms
    const laptopRotateY = useTransform(smoothX, [-1, 1], [-12, 12])
    const laptopRotateX = useTransform(smoothY, [-1, 1], [8, -8])
    const laptopX = useTransform(smoothX, [-1, 1], [-20, 20])
    const laptopY = useTransform(smoothY, [-1, 1], [-15, 15])

    // Screen color shifts with cursor
    const screenHue = useTransform(smoothX, [-1, 1], [200, 220])
    const screenBrightness = useTransform(smoothY, [-1, 1], [10, 18])

    // Pipeline auto-trigger after mount
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

    // Cursor glow position  
    const glowX = useTransform(smoothX, [-1, 1], [20, 80])
    const glowY = useTransform(smoothY, [-1, 1], [20, 80])

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full min-h-screen bg-white overflow-hidden flex items-center justify-center font-sans selection:bg-blue-100"
        >
            {/* ── Background (white 80%) ── */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50/30" />

            {/* Subtle dot grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{ backgroundImage: 'radial-gradient(#002B54 1px, transparent 1px)', backgroundSize: '48px 48px' }}
            />

            {/* Top-right #002B54 accent blob (20%) */}
            <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full blur-[160px]"
                style={{ background: 'radial-gradient(circle, rgba(0,43,84,0.15) 0%, transparent 70%)' }} />
            {/* Bottom-left subtle accent */}
            <div className="absolute bottom-[-8%] left-[-5%] w-[35%] h-[35%] rounded-full blur-[140px]"
                style={{ background: 'radial-gradient(circle, rgba(0,43,84,0.08) 0%, transparent 70%)' }} />

            {/* Interactive cursor glow */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none z-0"
                style={{
                    left: useTransform(glowX, v => `${v}%`),
                    top: useTransform(glowY, v => `${v}%`),
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(0,43,84,0.06), transparent 70%)',
                }}
            />

            {/* ── Content ── */}
            <div className="relative w-full max-w-[1600px] mx-auto px-8 lg:px-20 grid lg:grid-cols-2 gap-16 items-center z-10 pt-20 pb-10">

                {/* ── LEFT: Typography ── */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                            style={{ borderColor: 'rgba(0,43,84,0.15)', background: 'rgba(0,43,84,0.04)' }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute h-full w-full rounded-full opacity-75" style={{ background: '#002B54' }} />
                                <span className="relative rounded-full h-2 w-2" style={{ background: '#002B54' }} />
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#002B54' }}>
                                Enterprise SaaS · 2026
                            </span>
                        </motion.div>

                        <h1 className="text-6xl md:text-7xl lg:text-[100px] font-bold tracking-tight leading-[0.9] uppercase"
                            style={{ color: '#1a1a2e' }}>
                            Development<br />
                            <span style={{ color: '#002B54' }}>& Software</span>
                        </h1>

                        <div className="space-y-4 max-w-xl">
                            <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
                                We architect production-grade SaaS platforms with modern
                                tech stacks — scalable, secure, and precision-engineered.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-wrap gap-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 25px 60px rgba(0,43,84,0.3)' }}
                            whileTap={{ scale: 0.97 }}
                            className="px-10 py-5 rounded-full text-white text-[12px] font-black uppercase tracking-[0.3em] shadow-xl transition-all"
                            style={{ background: 'linear-gradient(135deg, #002B54 0%, #0a4a8a 100%)' }}
                        >
                            Start Building →
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, background: 'rgba(0,43,84,0.06)' }}
                            whileTap={{ scale: 0.97 }}
                            className="px-10 py-5 rounded-full text-[12px] font-black uppercase tracking-[0.3em] border transition-all"
                            style={{ color: '#002B54', borderColor: 'rgba(0,43,84,0.2)' }}
                        >
                            ▶ Watch Demo
                        </motion.button>
                    </motion.div>

                    {/* Trust bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex items-center gap-6 pt-8 border-t"
                        style={{ borderColor: 'rgba(0,43,84,0.08)' }}
                    >
                        <div className="flex -space-x-3">
                            {['8', '12', '15', '20'].map((n, i) => (
                                <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-200"
                                    style={{ backgroundImage: `url(https://i.pravatar.cc/80?img=${n})`, backgroundSize: 'cover' }} />
                            ))}
                        </div>
                        <div>
                            <div className="font-black text-sm" style={{ color: '#002B54' }}>500+ Teams</div>
                            <div className="text-slate-400 text-[10px] uppercase tracking-widest">Trust CALDIM</div>
                        </div>
                    </motion.div>
                </div>

                {/* ── RIGHT: Interactive Laptop ── */}
                <div className="relative flex items-center justify-center">
                    <motion.div
                        style={{
                            x: laptopX, y: laptopY,
                            rotateX: laptopRotateX,
                            rotateY: laptopRotateY,
                            transformStyle: 'preserve-3d',
                            perspective: 1800
                        }}
                        className="relative w-full max-w-[700px]"
                        onMouseEnter={() => setIsHoveringLaptop(true)}
                        onMouseLeave={() => setIsHoveringLaptop(false)}
                    >
                        ── LAPTOP SVG ──
                        <svg viewBox="0 0 700 520" className="w-full h-auto" style={{ filter: 'drop-shadow(0 40px 80px rgba(0,43,84,0.18))' }}>
                            {/* <defs>
                                <linearGradient id="lidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#e8ecf1" />
                                    <stop offset="100%" stopColor="#d4dce6" />
                                </linearGradient>
                                <linearGradient id="scrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#002B54" />
                                    <stop offset="100%" stopColor="#001a33" />
                                </linearGradient>
                                <linearGradient id="baseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#e2e6ec" />
                                    <stop offset="100%" stopColor="#cdd4de" />
                                </linearGradient>
                                <linearGradient id="kbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#d8dde5" />
                                    <stop offset="100%" stopColor="#c8ced8" />
                                </linearGradient>
                                <filter id="screenGlow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="6" result="blur" />
                                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                            </defs> */}

                            {/* Screen lid outer */}
                            <rect x="95" y="20" width="510" height="320" rx="16" fill="url(#lidGrad)" stroke="#b8c0cc" strokeWidth="1.5" />

                            {/* Screen bezel */}
                            <rect x="110" y="35" width="480" height="290" rx="8" fill="#1a1a2e" />

                            {/* Screen display */}
                            <rect x="118" y="43" width="464" height="274" rx="4" fill="url(#scrGrad)" />

                            {/* Screen ambient glow */}
                            <motion.ellipse
                                cx="350" cy="180"
                                rx={useTransform(smoothX, [-1, 1], [140, 200])}
                                ry="100"
                                fill="rgba(37,99,235,0.12)"
                                style={{ filter: 'blur(40px)' }}
                            />

                            {/* ── Code lines on screen ── */}
                            {/* Editor sidebar */}
                            <rect x="118" y="43" width="36" height="274" rx="0" fill="rgba(0,0,0,0.2)" />
                            {[0, 1, 2, 3, 4, 5].map(i => (
                                <circle key={i} cx="136" cy={65 + i * 20} r="5"
                                    fill={i < 2 ? 'rgba(37,99,235,0.6)' : 'rgba(255,255,255,0.12)'} />
                            ))}

                            {/* Tab bar */}
                            <rect x="154" y="43" width="428" height="22" fill="rgba(0,0,0,0.25)" />
                            <rect x="158" y="47" width="70" height="14" rx="3" fill="rgba(37,99,235,0.3)" />
                            <text x="166" y="58" fontSize="8" fill="rgba(147,197,253,0.9)" fontFamily="monospace">engine.ts</text>

                            {/* Code lines */}
                            {CODE_LINES.map((line, i) => (
                                <g key={i}>
                                    <text x="164" y={86 + i * 24} fontSize="8.5" fill="rgba(255,255,255,0.2)" fontFamily="monospace">{i + 1}</text>
                                    <text x="186" y={86 + i * 24} fontSize="9" fontFamily="monospace"
                                        fill={i <= codeStep ? line.color === '#002B54' ? '#93c5fd' : line.color === '#2563eb' ? '#60a5fa' : line.color === '#0ea5e9' ? '#67e8f9' : line.color === '#059669' ? '#34d399' : '#c4b5fd' : 'rgba(255,255,255,0.15)'}
                                        style={{ transition: 'fill 0.3s ease' }}>
                                        {line.text}
                                    </text>
                                    {/* Active cursor */}
                                    {i === codeStep && (
                                        <motion.rect x={186 + line.text.length * 5.4} y={76 + i * 24}
                                            width="2" height="12" fill="#60a5fa"
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ duration: 0.7, repeat: Infinity }} />
                                    )}
                                </g>
                            ))}

                            {/* Status bar */}
                            <rect x="118" y="293" width="464" height="24" fill="rgba(0,43,84,0.6)" />
                            <circle cx="133" cy="305" r="4" fill="#34d399" />
                            <text x="143" y="309" fontSize="8" fill="rgba(255,255,255,0.6)" fontFamily="monospace">
                                CALDIM OS · main · ✓ compiled · 0 errors
                            </text>

                            {/* Screen neon rim */}
                            <rect x="118" y="43" width="464" height="274" rx="4" fill="none"
                                stroke="rgba(37,99,235,0.25)" strokeWidth="1.5" />

                            {/* Camera dot */}
                            <circle cx="350" cy="29" r="3" fill="#b8c0cc" />
                            <circle cx="350" cy="29" r="1.5" fill={isHoveringLaptop ? '#34d399' : '#94a3b8'}
                                style={{ transition: 'fill 0.3s' }} />

                            {/* ── Laptop base ── */}
                            <path d="M60 345 L95 340 L605 340 L640 345 L680 380 L20 380 Z" fill="url(#baseGrad)" stroke="#b8c0cc" strokeWidth="1" />

                            {/* Base top surface */}
                            <rect x="95" y="340" width="510" height="8" rx="0" fill="url(#kbGrad)" />

                            {/* Keyboard area */}
                            <rect x="125" y="348" width="450" height="4" rx="2" fill="#c0c8d4" />

                            {/* Trackpad */}
                            <rect x="285" y="358" width="130" height="16" rx="6" fill="#d4dae2" stroke="#c0c8d4" strokeWidth="0.8" />

                            {/* Front edge */}
                            <rect x="20" y="378" width="660" height="6" rx="3" fill="#cdd4de" stroke="#b8c0cc" strokeWidth="0.5" />

                            {/* Bottom shadow/reflection */}
                            <ellipse cx="350" cy="395" rx="280" ry="12" fill="rgba(0,43,84,0.06)" />

                            {/* Interactive hover glow on screen */}
                            {isHoveringLaptop && (
                                <motion.rect x="118" y="43" width="464" height="274" rx="4"
                                    fill="none" stroke="rgba(37,99,235,0.4)" strokeWidth="2"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                            )}
                        </svg>

                        {/* ═══════════════════════════
                           PIPELINE POPPING FROM SCREEN
                        ═══════════════════════════ */}
                        <AnimatePresence>
                            {pipelineVisible && (
                                <motion.div
                                    initial={{ opacity: 0, y: 40, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 40 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute"
                                    style={{ top: '-13%', left: '25%' }}
                                >
                                    {/* Floating pipeline icons — no container box */}
                                    <div className="flex items-center gap-4">
                                        {PIPELINE_STAGES.map((stage, idx) => (
                                            <React.Fragment key={idx}>
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={idx <= activePipelineStage ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0.3 }}
                                                    transition={{ delay: idx * 0.15, duration: 0.5, type: 'spring' }}
                                                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                                                    onMouseEnter={() => setActivePipelineStage(idx)}
                                                >
                                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                                                        style={{
                                                            background: idx <= activePipelineStage ? stage.color : '#e2e8f0',
                                                            boxShadow: idx <= activePipelineStage ? `0 8px 24px ${stage.color}40` : 'none'
                                                        }}>
                                                        <stage.Icon size={18} strokeWidth={2} color={idx <= activePipelineStage ? '#fff' : '#94a3b8'} />
                                                    </div>
                                                    <span className="text-[7px] font-black uppercase tracking-[0.15em]"
                                                        style={{ color: idx <= activePipelineStage ? stage.color : '#94a3b8' }}>
                                                        {stage.label}
                                                    </span>
                                                </motion.div>
                                                {idx < PIPELINE_STAGES.length - 1 && (
                                                    <motion.div
                                                        initial={{ scaleX: 0 }}
                                                        animate={{ scaleX: idx < activePipelineStage ? 1 : 0 }}
                                                        transition={{ delay: idx * 0.15 + 0.3, duration: 0.4 }}
                                                        className="w-8 h-0.5 rounded-full origin-left"
                                                        style={{ background: idx < activePipelineStage ? stage.color : '#e2e8f0' }}
                                                    />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    {/* Connector line from pipeline to screen */}
                                    <div className="w-px h-8 mx-auto" style={{ background: 'linear-gradient(to bottom, rgba(0,43,84,0.15), transparent)' }} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ── Floating wireframe accents ── */}
                        {/* <motion.div
                            style={{
                                x: useTransform(smoothX, [-1, 1], [-60, 30]),
                                y: useTransform(smoothY, [-1, 1], [40, -30])
                            }}
                            className="absolute -bottom-4 -left-10 w-32 h-32 rounded-3xl border-2"
                            style2={{ borderColor: 'rgba(0,43,84,0.08)' }}
                        >
                            <div className="w-32 h-32 rounded-3xl" style={{ border: '2px solid rgba(0,43,84,0.08)' }} />
                        </motion.div> */}

                        <motion.div
                            style={{
                                x: useTransform(smoothX, [-1, 1], [40, -40]),
                                y: useTransform(smoothY, [-1, 1], [-50, 50])
                            }}
                            className="absolute -top-6 -right-8"
                        >
                            <div className="w-40 h-24 rounded-3xl" style={{ border: '2px solid rgba(0,43,84,0.06)' }} />
                        </motion.div>

                        {/* ── Floating particles that react to cursor ── */}
                        {[
                            { size: 8, x: [-30, 30], y: [-20, 20], left: '10%', top: '20%', opacity: 0.4 },
                            { size: 6, x: [20, -20], y: [15, -15], left: '85%', top: '15%', opacity: 0.3 },
                            { size: 10, x: [-40, 40], y: [-30, 30], left: '80%', top: '70%', opacity: 0.25 },
                            { size: 5, x: [25, -25], y: [-18, 18], left: '5%', top: '65%', opacity: 0.35 },
                            { size: 7, x: [-20, 20], y: [25, -25], left: '50%', top: '5%', opacity: 0.3 },
                        ].map((p, i) => (
                            <motion.div
                                key={i}
                                style={{
                                    x: useTransform(smoothX, [-1, 1], p.x),
                                    y: useTransform(smoothY, [-1, 1], p.y),
                                    position: 'absolute',
                                    left: p.left,
                                    top: p.top,
                                    width: p.size,
                                    height: p.size,
                                    borderRadius: '50%',
                                    background: '#002B54',
                                    opacity: p.opacity,
                                }}
                            />
                        ))}

                        {/* Ambient screen glow on desk */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-6 rounded-full blur-xl"
                            style={{ background: 'rgba(0,43,84,0.08)' }} />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default StartupInnovationHero
