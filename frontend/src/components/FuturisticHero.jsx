import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronRight,
    Shield,
    Activity,
    Layout,
    Lock,
    User,
    ArrowRight,
    Cpu,
    Globe,
    Zap
} from 'lucide-react'
import loginPageImg from '../assets/loginpage.jpg'
import backgroundImage from '../assets/2650401.jpg'

const FuturisticHero = () => {
    const [isHovered, setIsHovered] = useState(null)

    const floatingVariants = {
        animate: (i) => ({
            y: [0, -20, 0],
            transition: {
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut"
            }
        })
    }

    return (
        <section className="relative min-h-screen w-full bg-white overflow-hidden flex items-center justify-center py-20">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Layer 1: Specified Gradient */}
                <div className="absolute inset-0 bg-blue-600 opacity-5" />

                {/* Layer 2: Void */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-white opacity-60" />

                {/* Layer 3: Blue Glow Accents */}
                <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-blue-500/10 blur-[180px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

                {/* Layer 4: Tech Mesh / Grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(37, 99, 235, 0.4) 1px, transparent 0)`, backgroundSize: '80px 80px' }}
                />

                {/* Particle Noise Overlay */}
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
                    style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}
                />
            </div>

            {/* Main Content Container */}
            <div className="container mx-auto px-6 relative z-10 min-h-screen flex flex-col items-center justify-center">

                {/* 1. Header Detail: Archiving the Future */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex items-center gap-6 mb-12"
                >
                    <div className="w-16 h-[1px] bg-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.8em] text-blue-600">Archiving the Future</span>
                    <div className="w-16 h-[1px] bg-blue-600" />
                </motion.div>

                {/* 2. Main Hero Typography Stack */}
                <div className="text-center relative mb-16 select-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="text-7xl sm:text-9xl md:text-[12rem] font-black text-black tracking-tighter uppercase leading-[0.7]">
                            H23
                        </h1>
                        <h2
                            className="text-7xl sm:text-9xl md:text-[12rem] font-black text-transparent tracking-tighter uppercase leading-[0.7] -mt-2"
                            style={{ WebkitTextStroke: '1.5px rgba(0,0,0,0.8)' }}
                        >
                            APPLICATIONS
                        </h2>
                    </motion.div>
                </div>

                {/* 3. Sub-tagline Positioning */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-black text-[10px] sm:text-xs font-bold uppercase tracking-[0.5em] text-center mb-16 max-w-2xl px-4"
                >
                    Sophisticated Engineering For The Next Matrix
                </motion.p>

                {/* 4. Action Button */}
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-14 py-5 bg-blue-600 text-white rounded-full font-black uppercase text-[10px] tracking-[0.4em] flex items-center justify-center gap-6 transition-all shadow-2xl group relative overflow-hidden"
                >
                    Initialize System
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Floating Glassmorphism Panels */}

                {/* Panel 1: Login Interface (Top Left) */}
                <motion.div
                    custom={0}
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-[8%] left-[4%] w-96 p-[1px] rounded-[3.5rem] bg-gradient-to-br from-white/30 via-transparent to-transparent shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] z-20 hidden xl:block overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[#0A0E27]/40 backdrop-blur-[80px] rounded-[3.5rem]" />
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="relative p-12 z-10">
                        <div className="w-16 h-16 rounded-[2rem] bg-blue-600/10 border border-blue-600/20 flex items-center justify-center mb-10 shadow-inner">
                            <Cpu size={32} className="text-blue-600" />
                        </div>
                        <div className="text-[11px] font-black tracking-[0.5em] text-gray-400 uppercase mb-10">Neural_Core_v5</div>

                        <div className="space-y-6">
                            <div className="h-[3px] w-full bg-gray-100 relative rounded-full overflow-hidden">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-blue-600 shadow-[0_0_25px_rgba(37,99,235,0.8)]"
                                    animate={{ width: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                            </div>
                            <div className="flex justify-between items-center opacity-40">
                                <div className="flex gap-2">
                                    {[1, 1, 1, 0.5, 0.5, 0.3].map((op, i) => (
                                        <div key={i} className="w-2 h-6 bg-blue-600 rounded-full" style={{ opacity: op }} />
                                    ))}
                                </div>
                                <div className="w-10 h-10 rounded-full border border-blue-600/10 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Panel 2: Matrix Preview (Top Right) */}
                <motion.div
                    custom={1}
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-[6%] right-[6%] w-[520px] p-[1px] rounded-[4.5rem] bg-gradient-to-br from-blue-600/30 via-transparent to-transparent shadow-2xl z-20 hidden xl:block overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[80px] rounded-[4.5rem]" />

                    <div className="relative p-4 z-10">
                        <div className="relative rounded-[3.8rem] overflow-hidden aspect-video bg-black/40 border border-white/10 group/img shadow-2xl">
                            <img
                                src={loginPageImg}
                                alt="Front Office"
                                className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex items-end p-12">
                                <div>
                                    <h3 className="text-4xl font-black text-black uppercase tracking-tighter">OS_MATRIX_DETECTION</h3>
                                    <p className="text-blue-600 text-[12px] font-black uppercase tracking-[0.5em] mt-4">Security Node Alpha</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Panel 3: Secure Flow (Bottom Left) */}
                <motion.div
                    custom={2}
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-[8%] left-[6%] w-96 p-[1px] rounded-[3.5rem] bg-gradient-to-br from-blue-600/30 via-transparent to-transparent shadow-2xl z-20 hidden xl:block overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-[80px] rounded-[3.5rem]" />
                    <div className="relative p-12 z-10">
                        <div className="w-16 h-16 rounded-[2rem] bg-blue-50 border border-blue-600/10 flex items-center justify-center mb-10">
                            <Shield size={32} className="text-blue-600" />
                        </div>
                        <div className="text-[11px] font-black tracking-[0.5em] text-gray-400 uppercase mb-10">Secure_Flow_Protocol</div>

                        <div className="flex items-center gap-6">
                            <div className="h-[3px] flex-1 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.8)]"
                                    animate={{ width: ['20%', '95%', '20%'] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                />
                            </div>
                            <div className="w-12 h-12 rounded-full bg-blue-600/5 border border-blue-600/20 flex items-center justify-center">
                                <Activity size={18} className="text-blue-600 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Panel 4: Node Analytics (Bottom Right) */}
                <motion.div
                    custom={3}
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-[6%] right-[4%] w-96 p-[1px] rounded-[3.5rem] bg-gradient-to-br from-blue-600/30 via-transparent to-transparent shadow-2xl z-20 hidden xl:block overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-[80px] rounded-[3.5rem]" />
                    <div className="relative p-12 z-10">
                        <div className="w-16 h-16 rounded-[2rem] bg-blue-50 border border-blue-600/10 flex items-center justify-center mb-10">
                            <Layout size={32} className="text-blue-600" />
                        </div>
                        <div className="text-[11px] font-black tracking-[0.5em] text-gray-400 uppercase mb-10">Matrix_Global_Infra</div>

                        <div className="h-[2px] w-full bg-gray-100 mb-8" />

                        <div className="flex gap-3 justify-center">
                            {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-8 bg-blue-600/30 rounded-full"
                                    animate={{ height: [15, 40, 15] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Corner Rim Lighting / Glowing Lines */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-600/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-600/20 to-transparent" />

        </section>
    )
}

export default FuturisticHero
