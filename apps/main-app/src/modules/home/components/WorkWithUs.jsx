import React from 'react'
import { motion } from 'framer-motion'
import workBg from '@/assets/circuit-code-blue-screen-icon.jpg'

import efficiencyImg from '@/assets/whats it matters/Improves Operational Efficiency.png'
import transparencyImg from '@/assets/whats it matters/Enhances Transparency.png'
import decisionsImg from '@/assets/whats it matters/Supports Better Decisions.png'
import accountabilityImg from '@/assets/whats it matters/19197125.jpg.png'
import growthImg from '@/assets/whats it matters/Drives Business Growth.png'

const points = [
    {
        title: "Improves Operational Efficiency",
        desc: "Streamlines processes and reduces manual effort across business functions.",
        img: efficiencyImg
    },
    {
        title: "Enhances Transparency",
        desc: "Provides real-time visibility into workflows, performance, and outcomes.",
        img: transparencyImg
    },
    {
        title: "Supports Better Decisions",
        desc: "Transforms data into actionable insights for informed strategic planning.",
        img: decisionsImg
    },
    {
        title: "Strengthens Accountability",
        desc: "Ensures structured workflows, role clarity, and measurable results.",
        img: accountabilityImg
    },
    {
        title: "Drives Business Growth",
        desc: "Optimizes resources and improves productivity to deliver sustainable value.",
        img: growthImg
    }
]

const WorkWithUs = () => {
    return (
        <section className="relative overflow-hidden py-10 bg-white">
            {/* The "Banner" Shape Container */}
            <div
                className="relative w-full min-h-[600px] flex flex-col items-center justify-center overflow-hidden"
                style={{
                    clipPath: 'polygon(0 5%, 15% 10%, 100% 0%, 100% 95%, 85% 90%, 0 100%)',
                    background: '#002B54'
                }}
            >
                {/* Background Image with Fixed Attachment - Clarity Boost */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50"
                    style={{
                        backgroundImage: `url(${workBg})`,
                        backgroundAttachment: 'fixed',
                    }}
                />

                {/* Content Overlay */}
                <div className="relative z-10 container mx-auto px-6 text-center py-40 space-y-40">

                    {/* Why It Matters Content (Moved Here) */}
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-24 max-w-3xl mx-auto">
                            <motion.h2
                                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                                className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6"
                            >
                                Why It <span className="text-[#f25c78]">Matters</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-blue-100/70 font-medium leading-relaxed"
                            >
                                Our approach is centered on delivering measurable business impact through precision engineering and strategic digital transformation.
                            </motion.p>
                        </div>

                        <div className="space-y-16">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                                {points.slice(0, 3).map((p, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 100,
                                            damping: 20,
                                            delay: i * 0.05
                                        }}
                                        className="flex flex-col items-center text-center"
                                    >
                                        <div className="mb-8 h-48 flex items-center justify-center">
                                            <motion.img
                                                whileHover={{ scale: 1.1, rotate: 2 }}
                                                src={p.img}
                                                alt={p.title}
                                                className="max-h-full w-auto object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                            />
                                        </div>
                                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4 max-w-[250px]">
                                            {p.title}
                                        </h3>
                                        <p className="text-blue-100/60 text-sm leading-relaxed max-w-[300px]">
                                            {p.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-4xl mx-auto">
                                {points.slice(3, 5).map((p, i) => (
                                    <motion.div
                                        key={i + 3}
                                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 100,
                                            damping: 20,
                                            delay: (i + 3) * 0.05
                                        }}
                                        className="flex flex-col items-center text-center"
                                    >
                                        <div className="mb-8 h-48 flex items-center justify-center">
                                            <motion.img
                                                whileHover={{ scale: 1.1, rotate: -2 }}
                                                src={p.img}
                                                alt={p.title}
                                                className="max-h-full w-auto object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                            />
                                        </div>
                                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4 max-w-[250px]">
                                            {p.title}
                                        </h3>
                                        <p className="text-blue-100/60 text-sm leading-relaxed max-w-[300px]">
                                            {p.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Original WorkWithUs CTA Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
                            Partner With<br />
                            <span className="text-[#f25c78]">Caldim Solutions</span>
                        </h2>

                        <p className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-12">
                            Transforming businesses through intelligent software engineering
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: '#ff4d6d' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                const el = document.getElementById('contact-section')
                                if (el) el.scrollIntoView({ behavior: 'smooth' })
                            }}
                            className="bg-[#f25c78] text-white px-16 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] shadow-[0_20px_60px_rgba(242,92,120,0.4)] transition-all"
                        >
                            Get a Quote
                        </motion.button>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default WorkWithUs
