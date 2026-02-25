import React, { useRef } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'
import heroImage from '../assets/fdd263ac-4eeb-4e9b-92e8-ac96a28a38fb.png'

const StartupInnovationHero = () => {
    const containerRef = useRef(null)

    // Advanced Mouse Physics for Parallax
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 })
    const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 })

    const handleMouseMove = (e) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
        mouseX.set(x)
        mouseY.set(y)
    }

    // Transformations
    const laptopRotateY = useTransform(smoothX, [-1, 1], [-20, 10])
    const laptopRotateX = useTransform(smoothY, [-1, 1], [15, -15])
    const laptopX = useTransform(smoothX, [-1, 1], [-25, 25])
    const laptopY = useTransform(smoothY, [-1, 1], [-25, 25])

    // Specific particle styles aligned to the LED screen of the new image
    const particles = [
        { w: 100, h: 12, x: 50, y: -100, color: 'bg-cyan-400', speed: 80, delay: 0.1 },
        { w: 140, h: 14, x: 80, y: -60, color: 'bg-blue-400', speed: 50, delay: 0.2 },
        { w: 80, h: 10, x: 120, y: -20, color: 'bg-cyan-300', speed: 100, delay: 0.3 },
        { w: 120, h: 12, x: 40, y: 20, color: 'bg-blue-500', speed: 60, delay: 0.4 },
        { w: 160, h: 16, x: 90, y: 80, color: 'bg-cyan-400/80', speed: 40, delay: 0.5 },
        { w: 90, h: 10, x: 150, y: 130, color: 'bg-blue-400/90', speed: 90, delay: 0.6 },
        { w: 110, h: 12, x: 60, y: 170, color: 'bg-cyan-500', speed: 70, delay: 0.7 },
        { w: 130, h: 14, x: 100, y: -140, color: 'bg-blue-600/80', speed: 30, delay: 0.8 },
        // Trailing particles
        { w: 40, h: 8, x: 20, y: -40, color: 'bg-cyan-400', speed: 120, delay: 0.9 },
        { w: 60, h: 10, x: 180, y: 40, color: 'bg-blue-400', speed: 110, delay: 1.0 },
    ]

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center font-sans selection:bg-cyan-100"
        >
            {/* Soft Visual Texture */}
            <div className="absolute inset-0 bg-[#fafafa]/50" />
            <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[60%] bg-blue-50/40 rounded-full blur-[160px]" />
            <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] bg-cyan-50/30 rounded-full blur-[160px]" />

            <div className="relative w-full max-w-[1700px] mx-auto px-12 lg:px-24 grid lg:grid-cols-2 gap-20 items-center z-10 pt-10">

                {/* Brand Section (Left) */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8"
                    >
                        <h1 className="text-7xl md:text-8xl lg:text-[110px] font-medium text-[#2d3436] tracking-tight leading-[0.9] uppercase font-sans">
                            DEVELOPMENT<br />
                            AND SOFTWARE
                        </h1>

                        <div className="space-y-6 max-w-xl">
                            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur <br className="hidden md:block" />
                                In diam massa, tincidunt et molestie eget.
                            </p>
                            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed">
                                Sed pharetra, turpis eu sagittis tempus, augue <br className="hidden md:block" />
                                magna mattis leo, sed vestibulum metus.
                            </p>
                        </div>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(52, 152, 219, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                        className="px-12 py-5 rounded-full bg-gradient-to-r from-[#3498db] to-[#2ecc71] text-white text-[15px] font-bold uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(52,152,219,0.3)] transition-all flex items-center justify-center"
                    >
                        Learn More
                    </motion.button>
                </div>

                {/* Interactive Visuals (Right) */}
                <div className="relative flex items-center justify-center">
                    <motion.div
                        style={{
                            x: laptopX,
                            y: laptopY,
                            rotateX: laptopRotateX,
                            rotateY: laptopRotateY,
                            transformStyle: "preserve-3d",
                            perspective: 2000
                        }}
                        className="relative w-full max-w-[800px] aspect-square flex items-center justify-center"
                    >
                        {/* Floating Wireframes (as seen in image) */}
                        <motion.div
                            style={{
                                x: useTransform(smoothX, [-1, 1], [-80, 20]),
                                y: useTransform(smoothY, [-1, 1], [100, -20])
                            }}
                            className="absolute bottom-20 left-[-40px] w-48 h-48 border-[3px] border-cyan-400/20 rounded-[2.5rem] backdrop-blur-[2px]"
                        />
                        <motion.div
                            style={{
                                x: useTransform(smoothX, [-1, 1], [60, -60]),
                                y: useTransform(smoothY, [-1, 1], [-120, 120])
                            }}
                            className="absolute top-10 right-[-60px] w-56 h-32 border-[3px] border-blue-400/10 rounded-[2.5rem]"
                        />

                        {/* Isometric Hero Image Component */}
                        <motion.img
                            src={heroImage}
                            alt="Visual Concept"
                            initial={{ opacity: 0, scale: 0.7, rotateY: 30 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full h-full object-contain filter drop-shadow-[0_60px_120px_rgba(52,152,219,0.25)] relative z-10 select-none pointer-events-none"
                        />

                        {/* Interactive Data Streams (Front Layer) */}
                        <div className="absolute inset-0 z-20 pointer-events-none">
                            {particles.map((p, i) => (
                                <motion.div
                                    key={i}
                                    style={{
                                        x: useTransform(smoothX, [-1, 1], [-p.speed * 0.8, p.speed * 0.8]),
                                        y: useTransform(smoothY, [-1, 1], [-p.speed * 0.4, p.speed * 0.4]),
                                    }}
                                    className="absolute"
                                >
                                    <div
                                        className={`rounded-full ${p.color} shadow-[0_4px_20px_rgba(46,204,113,0.3)] opacity-90`}
                                        style={{
                                            width: p.w,
                                            height: p.h,
                                            // Adjusted coordinates to align with screen
                                            transform: `translate(${p.x + 400}px, ${p.y}px) skewX(-25deg)`
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Interactive Radial Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] bg-cyan-400/5 blur-[120px] z-0 rounded-full" />
                    </motion.div>
                </div>
            </div>

            {/* Subtle Industrial Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:60px_60px]" />
        </section>
    )
}

export default StartupInnovationHero
