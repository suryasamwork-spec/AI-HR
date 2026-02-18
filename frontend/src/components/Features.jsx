import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, Cpu, Globe, Binary, Layers, ChevronRight } from 'lucide-react'

const Features = () => {
    const [isPaused, setIsPaused] = React.useState(false)

    const features = [
        {
            icon: Cpu,
            title: 'Neural Architecture',
            description: 'Advanced MERN logic layers built with high-fidelity predictive modeling.',
            gradient: 'from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff]',
            id: '001'
        },
        {
            icon: Shield,
            title: 'Encryption Matrix',
            description: 'Zero-knowledge secure protocols intersecting through glass-layer protection.',
            gradient: 'from-[#6366f1] via-[#a855f7] to-[#d946ef]',
            id: '002'
        },
        {
            icon: Zap,
            title: 'Light-Speed Deployment',
            description: 'Optimized data flowing through high-tech minimalist pipelines.',
            gradient: 'from-[#22c55e] via-[#10b981] to-[#3b82f6]',
            id: '003'
        },
        {
            icon: Globe,
            title: 'Global Interface',
            description: 'Scalable cloud infrastructure floating and intersecting across regions.',
            gradient: 'from-[#f59e0b] via-[#ef4444] to-[#ec4899]',
            id: '004'
        },
        {
            icon: Binary,
            title: 'System Analysis',
            description: 'Close-up UX showcases and real-time dashboard data insights.',
            gradient: 'from-[#00d2ff] via-blue-600 to-[#00d2ff]',
            id: '005'
        },
        {
            icon: Layers,
            title: 'Full-Stack Scalability',
            description: 'Clean coding standards following Apple reveal style product architecture.',
            gradient: 'from-blue-600 via-indigo-600 to-blue-700',
            id: '006'
        },
    ]

    // Duplicate features for seamless marquee loop
    const doubledFeatures = [...features, ...features]

    return (
        <section id="features" className="py-32 bg-transparent relative overflow-hidden">
            <div className="max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 mb-24">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl"
                    >
                        {/* <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-[1px] bg-blue-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">Core Capabilities</span>
                        </div> */}
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-tight">
                            TECHNICAL<br />
                            PRECISION
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.4 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="text-xl text-gray-400 font-light max-w-sm mb-4 border-l border-blue-600/20 pl-8"
                    >
                        Engineering sophisticated technology without showing specific screens. Just pure performance.
                    </motion.p>
                </div>
            </div>

            {/* Infinite Marquee Wrapper */}
            <div
                className="features-marquee-container relative flex overflow-hidden py-10"
            >
                <div
                    className="flex gap-8 whitespace-nowrap animate-marquee-ltr"
                >
                    {doubledFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="inline-block w-[450px] shrink-0"
                            style={{ perspective: '1000px' }}
                        >
                            <div className="h-full bg-white rounded-[3rem] p-12 border border-blue-600/10 transition-all duration-500 hover:bg-gray-50 hover:border-blue-600 hover:-translate-y-2 group shadow-sm">
                                <div className="mb-10 relative">
                                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden transition-transform duration-500 group-hover:rotate-y-12 group-hover:rotate-x-[-12deg]`}>
                                        <feature.icon className="w-10 h-10 text-white" strokeWidth={1} />
                                        <div className="absolute inset-0 bg-white/10 animate-pulse" />
                                    </div>
                                    <div className={`absolute -bottom-4 -left-2 w-24 h-4 bg-gradient-to-br ${feature.gradient} blur-2xl opacity-20`} />
                                </div>

                                <h3 className="text-2xl font-black text-black mb-6 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-500 leading-relaxed font-light group-hover:text-gray-700 transition-colors whitespace-normal">
                                    {feature.description}
                                </p>

                                {/* <div className="absolute bottom-10 right-12 text-[8px] font-black tracking-[0.4em] text-gray-300 group-hover:text-blue-600 transition-colors">
                                    {feature.id}
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Left & Right Edge Fades */}
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            </div>

            <style>{`
                .features-marquee-container:hover .animate-marquee-ltr {
                    animation-play-state: paused;
                }

                .animate-marquee-ltr {
                    display: flex;
                    width: max-content;
                    animation: marquee-ltr 40s linear infinite;
                }

                @keyframes marquee-ltr {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
            `}</style>
        </section>
    )
}

export default Features
