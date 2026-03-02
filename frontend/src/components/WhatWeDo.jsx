import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Cpu, Settings, Globe, Layout, Activity, ShieldCheck, Rocket } from 'lucide-react'

const services = [
    {
        title: "Custom software development",
        icon: Code2,
        desc: "Tailored high-performance software designed to meet your specific business requirements and scalability needs."
    },
    {
        title: "AI-powered enterprise solutions",
        icon: Cpu,
        desc: "Leveraging cutting-edge machine learning and AI algorithms to solve complex business challenges and drive intelligence."
    },
    {
        title: "Business process automation systems",
        icon: Settings,
        desc: "Streamlining workflows and eliminating manual tasks through intelligent automation, increasing operational efficiency."
    },
    {
        title: "Web-based platforms and product solutions",
        icon: Layout,
        desc: "Developing modern, responsive, and secure web applications that provide seamless user experiences across all devices."
    },
    {
        title: "End-to-end solution design, development, and support",
        icon: ShieldCheck,
        desc: "A comprehensive approach covering the entire software lifecycle from initial architecture to long-term maintenance."
    }
]

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }
    }
})

const WhatWeDo = () => {
    return (
        <section className="relative py-24 bg-[#f8fafc] overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 blur-[120px] rounded-full -mr-64 -mt-32" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/20 blur-[120px] rounded-full -ml-64 -mb-32" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <motion.div
                        variants={fadeUp(0)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-[1px] bg-blue-600/30" />
                            <span className="text-xs font-black uppercase tracking-[0.6em] text-blue-600">Our Expertise</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-[#002B54] uppercase tracking-tight leading-none mb-6">
                            What We <span className="text-transparent" style={{ WebkitTextStroke: '1px #002B54' }}>Do</span>
                        </h2>
                        <p className="text-gray-500 text-lg font-light max-w-xl">
                            We bridge the gap between complex business problems and elegant technological solutions with a human-centric approach.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUp(0.1 * index)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="group relative"
                        >
                            <div className="h-full p-8 rounded-[2.5rem] backdrop-blur-xl border-2 border-white/60 shadow-[0_20px_50px_rgba(0,43,84,0.05)] transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(0,43,84,0.1)] group-hover:border-blue-200/50"
                                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.85))' }}>

                                <div className="space-y-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-50/80 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500">
                                        <service.icon className="w-6 h-6 text-[#002B54] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                                    </div>

                                    {/* Progress Bar from Hero */}
                                    <div className="h-[3px] w-full bg-blue-100/80 relative overflow-hidden rounded-full">
                                        <motion.div
                                            className="absolute inset-y-0 left-0"
                                            style={{ background: '#002B54' }}
                                            initial={{ width: '0%' }}
                                            whileInView={{ width: '60%' }}
                                            transition={{ duration: 2, delay: 0.5 + index * 0.1 }}
                                        />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-[#002B54] uppercase tracking-tight mb-4 group-hover:text-blue-700 transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed font-light mb-8">
                                    {service.desc}
                                </p>

                                {/* Data Bars from Hero */}
                                <div className="flex justify-between items-end">
                                    <div className="h-10 flex items-end gap-1.5">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-1.5 rounded-full"
                                                style={{ background: 'rgba(0,43,84,0.4)' }}
                                                animate={{ height: [8, 8 + Math.random() * 20, 8] }}
                                                transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                                            />
                                        ))}
                                    </div>
                                    <div className="w-8 h-8 rounded-full border border-blue-50 flex items-center justify-center bg-white shadow-sm">
                                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#002B54' }} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Empty placeholder card to complete grid or add CTA */}
                    <motion.div
                        variants={fadeUp(0.6)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="group relative"
                    >
                        <div className="h-full p-8 rounded-[2.5rem] bg-[#002B54] shadow-2xl flex flex-col justify-between overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 blur-3xl rounded-full -mr-16 -mt-16" />

                            <div className="relative z-10">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                                    Ready to <span className="text-blue-400">Innovate?</span>
                                </h3>
                                <p className="text-blue-100/60 text-sm font-light leading-relaxed">
                                    Let's discuss how our expert solutions can transform your business vision into reality.
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative z-10 mt-8 w-full py-4 bg-white text-[#002B54] font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl shadow-lg transition-all"
                            >
                                Contact Us
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default WhatWeDo
