import React, { useRef, useCallback, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import bgImage from '../assets/wmremove-transformed.png'

const Particle = ({ x, y, color, size }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, x, y }}
            animate={{
                opacity: [0, 1, 0.7, 0],
                scale: [0, size || 1.3, 0.4, 0],
                rotate: [0, 180],
                x: x + (Math.random() - 0.5) * 350, // High spread
                y: y + (Math.random() - 0.5) * 350
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute pointer-events-none z-50"
            style={{
                width: '3px',
                height: '3px',
                backgroundColor: color,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                boxShadow: `0 0 8px ${color}`
            }}
        />
    )
}

const MechanicalCore = () => {
    const containerRef = useRef(null)
    const [particles, setParticles] = useState([])

    // Motion values for mouse position (for text tilt only)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Smooth movement with springs
    const mouseX = useSpring(x, { stiffness: 60, damping: 25 })
    const mouseY = useSpring(y, { stiffness: 60, damping: 25 })

    // Rotation transforms for the 3D tilt effect (Text only)
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8])

    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Normalize coordinates to -0.5 to 0.5
        x.set((e.clientX - centerX) / rect.width)
        y.set((e.clientY - centerY) / rect.height)

        // Add particles EXACTLY at cursor for "trail" follow
        const px = e.clientX - rect.left
        const py = e.clientY - rect.top

        const newParticles = Array.from({ length: 15 }).map(() => {
            const isWhite = Math.random() < 0.6 // 60% White
            return {
                id: Math.random(),
                x: px + (Math.random() - 0.5) * 40, // Small spread around birth point
                y: py + (Math.random() - 0.5) * 40,
                color: isWhite ? '#ffffff' : '#002B54',
                size: Math.random() * 2.0 + 0.5
            }
        })

        setParticles(prev => [...prev.slice(-80), ...newParticles])
    }, [x, y])

    useEffect(() => {
        const timer = setInterval(() => {
            setParticles(prev => prev.slice(3))
        }, 40)
        return () => clearInterval(timer)
    }, [])

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
        setParticles([])
    }

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-screen overflow-hidden flex items-center justify-center cursor-default bg-white"
            style={{ perspective: '1200px' }}
        >
            {/* Spark Trail Layer */}
            <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
                {particles.map(p => (
                    <Particle key={p.id} x={p.x} y={p.y} color={p.color} size={p.size} />
                ))}
            </div>

            {/* 1. Static Background Image (Fixed) */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundAttachment: 'fixed',
                    opacity: 0.5
                }}
            />

            {/* 2. Interactive Content Overlay */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative text-center select-none z-10 max-w-6xl px-8"
            >
                <div className="flex flex-col items-center gap-2" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Branding */}
                    <motion.div
                        style={{ transform: 'translateZ(60px)' }}
                        className="flex items-center gap-8 mb-6"
                    >
                        <div className="w-12 h-[1.5px] bg-[#002B54]/40" />
                        <h2 className="text-lg md:text-2xl font-black uppercase tracking-[0.9em]" style={{ color: '#002B54' }}>
                            CALDIM SOLUTIONS
                        </h2>
                        <div className="w-12 h-[1.5px] bg-[#002B54]/40" />
                    </motion.div>

                    {/* Main Headline */}
                    <div className="flex flex-col items-center" style={{ transformStyle: 'preserve-3d' }}>
                        {/* Line 1: SMART */}
                        <motion.h1
                            className="text-[35px] md:text-[60px] lg:text-[80px] font-black tracking-tighter leading-none uppercase"
                            style={{
                                color: '#002B54',
                                transform: 'translateZ(120px)'
                            }}
                        >
                            Smart
                        </motion.h1>

                        {/* Line 2: SOFTWARE SOLUTIONS */}
                        <motion.div
                            className="flex flex-nowrap justify-center items-center gap-x-3 md:gap-x-5 -mt-1 md:-mt-3"
                            style={{ transform: 'translateZ(100px)' }}
                        >
                            <h1
                                className="text-[35px] md:text-[60px] lg:text-[80px] font-black tracking-tighter leading-none uppercase"
                                style={{
                                    color: 'transparent',
                                    WebkitTextStroke: '1px #002B54',
                                    opacity: 0.95
                                }}
                            >
                                Software
                            </h1>
                            <h1
                                className="text-[35px] md:text-[60px] lg:text-[80px] font-black tracking-tighter leading-none uppercase"
                                style={{ color: '#002B54' }}
                            >
                                Solutions
                            </h1>
                        </motion.div>
                    </div>

                    {/* Button */}
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: '#001a33',
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-16 px-14 py-4 md:py-6 bg-[#002B54] text-white font-black uppercase text-[10px] md:text-[11px] tracking-[0.4em] rounded-full shadow-[0_20px_50px_rgba(0,43,84,0.3)] transition-all"
                        style={{ transform: 'translateZ(140px)' }}
                    >
                        Initialize System
                    </motion.button>
                </div>
            </motion.div>

            {/* Subtle Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-white/5 backdrop-blur-[0.5px] z-[5]" />
        </div>
    )
}

export default MechanicalCore
