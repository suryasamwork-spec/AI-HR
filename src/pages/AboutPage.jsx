import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, Target, Heart, Lightbulb, Users, Code, Globe, Shield } from 'lucide-react'

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const stats = [
        { label: 'Years Experience', value: '4+' },
        { label: 'Projects Completed', value: '150+' },
        { label: 'Happy Clients', value: '80+' },
        { label: 'Team Experts', value: '25+' },
    ]

    const milestones = [
        { year: '2020', title: 'Founded', description: 'Started with a vision to revolutionize digital solutions.' },
        { year: '2021', title: 'Global Expansion', description: 'Served clients across 10+ countries.' },
        { year: '2022', title: 'Innovation Award', description: 'Recognized for excellence in AI integration.' },
        { year: '2023', title: 'Enterprise Partnerships', description: 'Partnered with major industry leaders.' },
    ]

    return (
        <div className="pt-24 min-h-screen bg-[#010826]">
            {/* Hero Section */}
            <section className="section-container relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 blur-[100px] rounded-full" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center relative z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-8">
                        Our Story & Vision
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        At CALDIM, we believe in the power of technology to transform businesses and lives.
                        Our journey is driven by a commitment to excellence, innovation, and client success.
                    </p>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="bg-white/5 py-20 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">{stat.value}</h2>
                            <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Details Section */}
            <section className="section-container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-bold text-white mb-6">Expertise in Digital Transformation</h2>
                        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                            <p>
                                We specialize in high-performance web applications, mobile app development,
                                and AI-driven automation systems. Our team stays ahead of the curve
                                by mastering emerging technologies and implementing best-in-class architectures.
                            </p>
                            <p>
                                From initial strategy and design to deployment and ongoing support,
                                we provide a comprehensive approach that ensures your digital
                                presence is robust, scalable, and future-proof.
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { icon: Code, title: 'Clean Tech', color: 'from-blue-500 to-cyan-500' },
                            { icon: Shield, title: 'Secure Labs', color: 'from-purple-500 to-pink-500' },
                            { icon: Globe, title: 'Global Reach', color: 'from-green-500 to-teal-500' },
                            { icon: Users, title: 'Expert Team', color: 'from-orange-500 to-red-500' },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="glass-card p-8 border border-white/5 flex flex-col items-center text-center group"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <item.icon className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="section-container bg-white/5 rounded-3xl mb-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gradient">Our Milestones</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {milestones.map((milestone, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 border-l border-cyan-500/30"
                        >
                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-cyan-500 rounded-full shadow-[0_0_10px_#00ffff]" />
                            <span className="text-cyan-400 font-bold mb-2 block">{milestone.year}</span>
                            <h3 className="text-white font-bold text-xl mb-2">{milestone.title}</h3>
                            <p className="text-gray-400 text-sm">{milestone.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default AboutPage
