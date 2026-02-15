import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Play, ArrowUpRight, BarChart2, Globe, Box } from 'lucide-react'
import { Link } from 'react-router-dom'

const Projects = () => {
    const projects = [
        {
            title: 'Data Insights Pro',
            description: 'Close-up animation-style dashboard interface with vibrant blue and cyan charts.',
            tech: ['React', 'D3.js', 'Framer Motion'],
            gradient: 'from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff]',
            icon: BarChart2,
            tag: 'DATA ANALYTICS'
        },
        {
            title: 'Cloud Core Matrix',
            description: 'Isometric 3D motion graphic of floating glass layers and glowing data lines.',
            tech: ['Python', 'TensorFlow', 'Three.js'],
            gradient: 'from-[#6366f1] via-[#a855f7] to-[#d946ef]',
            icon: Globe,
            tag: 'INFRASTRUCTURE'
        },
        {
            title: 'SecureFlow Suite',
            description: 'Geometric micro-interactions with fluid liquid motion and snappy easing.',
            tech: ['Go', 'WebAssembly', 'Lottie'],
            gradient: 'from-[#22c55e] via-[#10b981] to-[#3b82f6]',
            icon: Box,
            tag: 'SECURITY'
        },
    ]

    return (
        <section id="projects" className="py-32 bg-transparent relative overflow-hidden">
            {/* Background Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-[1px] bg-cyan-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400">Selected Works // 2024</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white">
                        DIGITAL<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>ARCHIVE</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="group relative"
                        >
                            <div className="h-full bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-2xl">
                                {/* Visual Header (UI Mockup Style) */}
                                <div className={`h-56 bg-gradient-to-br ${project.gradient} relative p-8 flex flex-col justify-end overflow-hidden`}>
                                    {/* Simulated Dashboard UI Elements */}
                                    <div className="absolute top-8 right-8 flex gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                    </div>

                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                                        transition={{ duration: 5, repeat: Infinity }}
                                        className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"
                                    />

                                    <div className="relative z-10">
                                        <div className="p-3 bg-black/20 backdrop-blur-xl rounded-2xl inline-flex mb-4 group-hover:scale-110 transition-transform">
                                            <project.icon className="text-white w-6 h-6" strokeWidth={1.5} />
                                        </div>
                                        <div className="text-[8px] font-black tracking-[0.3em] text-white/60 mb-1 uppercase">{project.tag}</div>
                                        <h3 className="text-2xl font-black text-white">{project.title}</h3>
                                    </div>

                                    {/* Glass Sheen */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                </div>

                                <div className="p-10 space-y-8">
                                    <p className="text-blue-100/40 leading-relaxed font-light line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="px-4 py-1.5 bg-white/5 border border-white/5 rounded-xl text-cyan-300 text-[9px] font-black uppercase tracking-widest backdrop-blur-md">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex pt-4">
                                        <Link to="/projects" className="w-full">
                                            <motion.button
                                                whileHover={{ y: -2 }}
                                                className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white group-hover:bg-white group-hover:text-black transition-all"
                                            >
                                                INITIALIZE <ArrowUpRight size={14} />
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
