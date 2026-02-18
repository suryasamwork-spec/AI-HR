import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { Cpu, Activity, Shield, Zap, Binary, ChevronRight, BarChart3, Layers, Database } from 'lucide-react'

const MechanicalCore = () => {
    const containerRef = useRef(null)

    // Smooth Mouse Physics
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

    const rotateX = useTransform(smoothY, [-300, 300], [10, -10])
    const rotateY = useTransform(smoothX, [-300, 300], [-10, 10])

    const handleMouseMove = (e) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left - rect.width / 2)
        mouseY.set(e.clientY - rect.top - rect.height / 2)
    }

    // Abstract Data Layers (PROMPT: Translucent glass layers floating and intersecting)
    const layers = [
        { id: 1, x: -320, y: -160, z: 120, icon: Cpu, color: 'text-blue-600', label: 'NEURAL_CORE' },
        { id: 2, x: 380, y: -100, z: 60, icon: BarChart3, color: 'text-blue-400', label: 'ANALYTICS_V3' },
        { id: 3, x: -380, y: 180, z: 180, icon: Shield, color: 'text-indigo-400', label: 'SECURE_TRANS' },
        { id: 4, x: 340, y: 240, z: 100, icon: Layers, color: 'text-blue-500', label: 'MATRIX_INFRA' },
    ]

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center cursor-default"
        >
            {/* 1. Deep Space Ambient Glow (PROMPT: High-tech minimalism / Apple style) */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1600px] h-[1600px] bg-blue-600/5 blur-[250px] rounded-full" />
                <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-900/10 blur-[200px] rounded-full" />
            </div>

            {/* 2. Glowing Data Intersections (PROMPT: Glowing blue data lines) */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-[1px] bg-gradient-to-r from-transparent via-blue-600 to-transparent"
                        initial={{
                            width: Math.random() * 500 + 300,
                            x: -800,
                            y: Math.random() * 100 + "%"
                        }}
                        animate={{
                            x: ['-100%', '200%'],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            {/* 3. The Isometric Stage (PROMPT: Isometric view / Octane render) */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    perspective: 2000,
                    transformStyle: 'preserve-3d'
                }}
                className="relative w-full h-full flex items-center justify-center"
            >
                {/* 4. Intersecting Glass Sheets */}
                <AnimatePresence>
                    {layers.map((layer) => (
                        <motion.div
                            key={layer.id}
                            initial={{ opacity: 0, z: 500, rotateY: 45 }}
                            animate={{
                                opacity: 1,
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
                            className="absolute w-48 h-64 sm:w-64 sm:h-80 bg-blue-300 backdrop-blur-[40px] rounded-[2.5rem] sm:rounded-[3.5rem] border border-white/20 group shadow-2xl hidden sm:block overflow-hidden"
                            style={{
                                transformStyle: 'preserve-3d',
                                boxShadow: 'inset 0 0 40px rgba(1, 3, 7, 0.05), shadow-2xl'
                            }}
                        >
                            {/* Hyper-Realistic Glass Reflection Sheen */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style={{
                                    transform: 'translateX(-100%)',
                                }}
                                animate={{
                                    translateX: ['100%', '-100%']
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />

                            {/* Internal Gloss / Rim Lighting */}
                            <div className="absolute inset-0 p-[1px] rounded-[3.5rem] bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-40 pointer-events-none" />

                            {/* Inner Glass Content */}
                            <div className="w-full h-full p-8 rounded-[3.5rem] flex flex-col justify-between relative z-10">
                                <div className="space-y-4">
                                    <div className={`w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:border-white/50 transition-all duration-500`}>
                                        <layer.icon className={`w-7 h-7 text-white`} strokeWidth={1.5} />
                                    </div>
                                    <div className="text-[9px] font-black tracking-[0.4em] text-white">{layer.label}</div>
                                </div>

                                {/* Simulated UI Elements */}
                                <div className="space-y-4">
                                    <div className="h-[2px] w-full bg-white/20 relative overflow-hidden rounded-full">
                                        <motion.div
                                            className="absolute inset-y-0 left-0 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                                            animate={{ width: ['0%', '100%', '0%'] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: layer.id * 0.5 }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="h-12 flex items-end gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-1.5 bg-white/40 rounded-full"
                                                    animate={{ height: [10, Math.random() * 30 + 10, 10] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                                />
                                            ))}
                                        </div>
                                        <div className="w-8 h-8 rounded-full border border-white/10 bg-white/10 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* 5. Central Hero Typography (PROMPT: Apple product reveal / Corporate / Futuristic) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, z: 200 }}
                    animate={{ opacity: 1, scale: 1, z: 250 }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                    className="relative text-center select-none"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-blue-600">Archiving the Future</span>
                        <div className="w-12 h-[1px] bg-blue-600" />
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-black leading-[0.8] mb-12">
                        CALDIM<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(0, 0, 0, 1)' }}>APPLICATIONS</span>
                    </h1>

                    <p className="max-w-xs sm:max-w-md mx-auto text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] mb-16 border-t border-blue-600/10 pt-10 px-4">
                        Sophisticated Engineering for the Next Matrix
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05, y: -5, boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 sm:px-12 py-4 sm:py-5 bg-blue-600 text-white font-black uppercase text-[8px] sm:text-[10px] tracking-[0.5em] rounded-full shadow-2xl transition-all inline-flex items-center gap-4"
                    >
                        Initialize System <ChevronRight size={14} />
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* 6. Static Noise Overlay (PROMPT: Octane render / 4k fidelity) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.0] contrast-150 brightness-150 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    )
}

export default MechanicalCore
