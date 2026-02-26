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
        { id: 1, x: -180, y: -120, z: 100, icon: Cpu, color: 'text-blue-500', label: 'NEURAL_CORE' },
        { id: 2, x: 200, y: -80, z: 50, icon: BarChart3, color: 'text-cyan-500', label: 'ANALYTICS_V3' },
        { id: 3, x: -220, y: 150, z: 150, icon: Shield, color: 'text-indigo-500', label: 'SECURE_TRANS' },
        { id: 4, x: 180, y: 180, z: 80, icon: Layers, color: 'text-blue-400', label: 'MATRIX_INFRA' },
    ]

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center cursor-default"
        >
            {/* 1. White & Blue 10% Background Glow */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-600/10 blur-[180px] rounded-full" />
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-900/5 blur-[150px] rounded-full" />
            </div>

            {/* 2. Glowing Data Intersections */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
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
                            className="absolute w-64 h-80 backdrop-blur-3xl rounded-[3rem] border border-blue-100/20 group shadow-[0_50px_100px_rgba(0,0,0,0.05)]"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))',
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            {/* Inner Glass Content */}
                            <div className="w-full h-full p-8 flex flex-col justify-between relative overflow-hidden">
                                <div className="space-y-4">
                                    <div className={`w-14 h-14 rounded-2xl bg-blue-50/50 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                                        <layer.icon className={`w-7 h-7 ${layer.color}`} strokeWidth={1.5} />
                                    </div>
                                    <div className="text-[9px] font-black tracking-[0.4em] text-blue-900/40 uppercase">{layer.label}</div>
                                </div>

                                {/* Simulated UI Elements */}
                                <div className="space-y-4">
                                    <div className="h-[2px] w-full bg-blue-100 relative overflow-hidden">
                                        <motion.div
                                            className="absolute inset-y-0 left-0 bg-blue-600"
                                            animate={{ width: ['0%', '100%', '0%'] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: layer.id * 0.5 }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="h-12 flex items-end gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-1.5 bg-blue-400/30 rounded-full"
                                                    animate={{ height: [10, Math.random() * 30 + 10, 10] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                                />
                                            ))}
                                        </div>
                                        <div className="w-6 h-6 rounded-full border border-blue-200 flex items-center justify-center">
                                            <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse" />
                                        </div>
                                    </div>
                                </div>

                                {/* Glass Reflection Sheen */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* 5. Central Hero Typography */}
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

                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-blue-900 leading-[0.85] mb-8">
                        CALDIM<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(30, 58, 138, 1)' }}>SOLUTIONS</span>
                    </h1>


                    <p className="max-w-md mx-auto text-blue-900/40 text-xs font-bold uppercase tracking-[0.4em] mb-12 border-t border-blue-100 pt-8">
                        Sophisticated Engineering for the Next Matrix
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05, y: -5, boxShadow: '0 30px 60px rgba(37, 99, 235, 0.2)' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-5 bg-blue-600 text-white font-black uppercase text-[10px] tracking-[0.5em] rounded-full shadow-2xl transition-all inline-flex items-center gap-4"
                    >
                        Initialize System <ChevronRight size={14} />
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* 6. Static Noise Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] contrast-150 brightness-150 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    )
}

export default MechanicalCore
