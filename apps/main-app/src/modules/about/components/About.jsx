import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Zap, Globe, Lightbulb } from 'lucide-react'
import { Link } from 'react-router-dom'

const About = () => {
    const values = [
        {
            icon: ShieldCheck,
            title: 'Reliability',
            description: 'Engineering systems with high-tech minimalism and consistent uptime.',
            gradient: 'from-blue-600 to-indigo-600'
        },
        {
            icon: Zap,
            title: 'Speed',
            description: 'Deploying solutions at light-speed through optimized data pipelines.',
            gradient: 'from-blue-600 to-blue-500'
        },
        {
            icon: Globe,
            title: 'Reach',
            description: 'Scalable cloud intersections floating across global data layers.',
            gradient: 'from-indigo-500 to-purple-600'
        },
        {
            icon: Lightbulb,
            title: 'Vision',
            description: 'Innovating through Apple-style reveal architecture and clean design.',
            gradient: 'from-purple-500 to-pink-600'
        },
    ]

    return (
        <section id="about" className="py-20 sm:py-32 bg-transparent relative overflow-hidden">
            <div className="max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left: Engineering Story */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >


                        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-black mb-6 sm:mb-10 leading-[0.9]">
                            OUR<br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.4)' }}>DNA</span>
                        </h2>

                        <div className="space-y-4 sm:space-y-6 text-gray-600 text-base sm:text-lg font-light leading-relaxed max-w-xl">
                            <p>
                                We're a refined collective of engineers and designers specializing in high-fidelity digital infrastructure. From translucent logic layers to glowing data intersections, we build the technology of tomorrow.
                            </p>
                            <p className="border-l border-blue-600/20 pl-6 sm:pl-8">
                                Our DNA is rooted in Apple-style product reveal aesthetics—combining clean, corporate minimalism with aggressive technical precision. We don't just solve problems; we engineer experiences.
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="mt-10 sm:mt-12"
                        >
                            <Link to="/about">
                                <motion.button
                                    whileHover={{ scale: 1.05, x: 10 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 sm:px-10 py-4 sm:py-5 bg-blue-600 text-white font-black uppercase text-[9px] sm:text-[10px] tracking-[0.4em] rounded-xl sm:rounded-2xl flex items-center gap-4 shadow-2xl"
                                >
                                    Explore the Journey <ArrowRight size={14} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right: Isometric Values Shelf */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative mt-12 lg:mt-0">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-blue-600/10 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />

                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                className="group relative"
                            >
                                <div className="bg-white p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-blue-600/10 transition-all duration-500 hover:bg-gray-50 hover:border-blue-600 hover:-translate-y-2 h-auto sm:h-[280px] flex flex-col justify-between shadow-sm">
                                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${value.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                                        <value.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={1.5} />
                                    </div>

                                    <div>
                                        <h3 className="text-lg sm:text-xl font-black text-black uppercase tracking-tight mb-2 sm:mb-3">
                                            {value.title}
                                        </h3>
                                        <p className="text-[10px] sm:text-[11px] font-light text-gray-500 leading-relaxed uppercase tracking-wider group-hover:text-blue-600 transition-colors">
                                            {value.description}
                                        </p>
                                    </div>

                                    <div className="absolute top-6 sm:top-8 right-6 sm:right-8 text-[7px] sm:text-[8px] font-black tracking-widest text-gray-200 uppercase">v.0{index + 1}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
