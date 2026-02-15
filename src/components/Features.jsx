import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, Rocket, Users, Code2, TrendingUp, Cpu, Globe, Binary, Layers } from 'lucide-react'

const Features = () => {
    const features = [
        {
            icon: Cpu,
            title: 'Neural Architecture',
            description: 'Advanced MERN logic layers built with high-fidelity predictive modeling.',
            gradient: 'from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff]',
            delay: 0.1
        },
        {
            icon: Shield,
            title: 'Encryption Matrix',
            description: 'Zero-knowledge secure protocols intersecting through glass-layer protection.',
            gradient: 'from-[#6366f1] via-[#a855f7] to-[#d946ef]',
            delay: 0.2
        },
        {
            icon: Zap,
            title: 'Light-Speed Deployment',
            description: 'Optimized data flowing through high-tech minimalist pipelines.',
            gradient: 'from-[#22c55e] via-[#10b981] to-[#3b82f6]',
            delay: 0.3
        },
        {
            icon: Globe,
            title: 'Global Interface',
            description: 'Scalable cloud infrastructure floating and intersecting across regions.',
            gradient: 'from-[#f59e0b] via-[#ef4444] to-[#ec4899]',
            delay: 0.4
        },
        {
            icon: Binary,
            title: 'System Analysis',
            description: 'Close-up UX showcases and real-time dashboard data insights.',
            gradient: 'from-[#00d2ff] via-cyan-400 to-[#00d2ff]',
            delay: 0.5
        },
        {
            icon: Layers,
            title: 'Full-Stack Scalability',
            description: 'Clean coding standards following Apple reveal style product architecture.',
            gradient: 'from-blue-600 via-indigo-600 to-blue-700',
            delay: 0.6
        },
    ]

    return (
        <section id="features" className="py-32 bg-transparent relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-[1px] bg-cyan-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400">Core Capabilities</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
                            TECHNICAL<br />
                            PRECISION
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.4 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="text-xl text-blue-100 font-light max-w-sm mb-4 border-l border-white/10 pl-8"
                    >
                        Engineering sophisticated technology without showing specific screens. Just pure performance.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: feature.delay, duration: 0.8 }}
                            className="group relative"
                        >
                            <div className="h-full bg-white/[0.02] backdrop-blur-2xl rounded-[3rem] p-12 border border-white/5 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-2">
                                {/* Isometric Feature Graphic (PROMPT inspired) */}
                                <div className="mb-10 relative perspective-1000">
                                    <motion.div
                                        whileHover={{ rotateY: 15, rotateX: -15 }}
                                        className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden`}
                                    >
                                        <feature.icon className="w-10 h-10 text-white" strokeWidth={1} />
                                        {/* Scanner Pulse */}
                                        <div className="absolute inset-0 bg-white/10 animate-pulse" />
                                    </motion.div>

                                    {/* Shadow Blur Underneath */}
                                    <div className={`absolute -bottom-4 -left-2 w-24 h-4 bg-gradient-to-br ${feature.gradient} blur-2xl opacity-20`} />
                                </div>

                                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-blue-100/30 leading-relaxed font-light group-hover:text-blue-100/50 transition-colors">
                                    {feature.description}
                                </p>

                                {/* Bottom Selection Indicator */}
                                <div className="absolute bottom-10 right-12 text-[8px] font-black tracking-[0.4em] text-white/10 group-hover:text-cyan-400/40 transition-colors">
                                    00{index + 1}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </section>
    )
}

export default Features
