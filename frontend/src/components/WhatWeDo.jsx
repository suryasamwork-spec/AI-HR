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
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mb-20 text-center mx-auto">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-10 h-[1px] bg-blue-600/30" />
                        <span className="text-xs font-black uppercase tracking-[0.6em] text-blue-600">Our Expertise</span>
                        <div className="w-10 h-[1px] bg-blue-600/30" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-[#002B54] uppercase tracking-tight leading-none mb-8">
                        What We <span className="text-transparent" style={{ WebkitTextStroke: '2px #002B54' }}>Do</span>
                    </h1>
                    <p className="text-gray-500 text-xl font-light max-w-2xl mx-auto leading-relaxed">
                        We bridge the gap between complex business problems and elegant technological solutions with a human-centric approach.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {services.map((service, index) => (
                        <div key={index} className="space-y-4">
                            <h3 className="text-xl font-black text-[#002B54] uppercase tracking-tight border-b-2 border-blue-50 pb-4 inline-block">
                                {service.title}
                            </h3>
                            <p className="text-gray-500 text-base leading-relaxed font-light">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhatWeDo
