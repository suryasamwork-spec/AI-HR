import React, { useRef } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'
import bgImage from '../assets/result_0.png'
import javaLogo from '../assets/logos/java logo.png'
import cppLogo from '../assets/logos/logo c+.png'
import jsLogo from '../assets/logos/logo js.png'
import pyLogo from '../assets/logos/logo py.png'
import mongoLogo from '../assets/logos/mongo logo.png'
import nodeLogo from '../assets/logos/node logo.png'

const TechStackHero = () => {
    const containerRef = useRef(null)

    // Mouse parallax for background
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

    const bgMoveX = useTransform(smoothX, [-400, 400], [-20, 20])
    const bgMoveY = useTransform(smoothY, [-400, 400], [-20, 20])

    const handleMouseMove = (e) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left - rect.width / 2)
        mouseY.set(e.clientY - rect.top - rect.height / 2)
    }

    const logos = [
        { src: javaLogo, delay: 0, angle: 0 },
        { src: cppLogo, delay: 0.5, angle: 60 },
        { src: jsLogo, delay: 1, angle: 120 },
        { src: pyLogo, delay: 1.5, angle: 180 },
        { src: mongoLogo, delay: 2, angle: 240 },
        { src: nodeLogo, delay: 2.5, angle: 300 },
    ]

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-white"
        >
            {/* 1. Background Image (PNG with Parallax) */}
            <motion.div
                className="absolute w-[95%] md:w-[85%] h-[75%] md:h-[85%] z-0 pointer-events-none flex items-center justify-center"
                style={{
                    x: bgMoveX,
                    y: bgMoveY,
                }}
            >
                <motion.img
                    src={bgImage}
                    alt="Laptop Visual"
                    className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_35px_35px_rgba(0,0,0,0.1)]"
                    style={{
                        opacity: 0.9
                    }}
                />
            </motion.div>

            {/* 2. Text Content */}
            <div className="relative z-20 text-center pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-[8rem] md:text-[15rem] font-black text-black leading-none tracking-tighter"
                >
                    H23
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="text-2xl md:text-4xl font-light text-blue-600 uppercase tracking-[1em] -mt-4 md:-mt-8"
                >
                    SOLUTIONS
                </motion.h2>
            </div>

            {/* 3. Laptop Screen Area (Invisible Anchor for Logos) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-10">
                {logos.map((logo, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: [0, Math.cos(logo.angle * Math.PI / 180) * 420],
                            y: [0, Math.sin(logo.angle * Math.PI / 180) * 320],
                        }}
                        transition={{
                            duration: 2.5,
                            delay: logo.delay,
                            ease: "easeOut"
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        {/* Orbit Animation */}
                        <motion.div
                            animate={{
                                y: [-15, 15, -15],
                                x: [Math.cos(i) * 12, Math.sin(i) * -12, Math.cos(i) * 12]
                            }}
                            transition={{
                                duration: 5 + i,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center pointer-events-none"
                        >
                            <img
                                src={logo.src}
                                alt="tool"
                                className="w-full h-full object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)]"
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* 4. Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />

            {/* 5. Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-blue-600 to-transparent" />
            </motion.div>
        </section>
    )
}

export default TechStackHero
