import React from 'react'
import { motion } from 'framer-motion'
import efficiencyImg from '../assets/whats it matters/Improves Operational Efficiency.png'
import transparencyImg from '../assets/whats it matters/Enhances Transparency.png'
import decisionsImg from '../assets/whats it matters/Supports Better Decisions.png'
import accountabilityImg from '../assets/whats it matters/19197125.jpg.jpeg'
import growthImg from '../assets/whats it matters/Drives Business Growth.png'

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

const WhyItMatters = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-[#002B54] uppercase tracking-tighter mb-6"
                    >
                        Why It Matters
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 font-medium leading-relaxed"
                    >
                        Our approach is centered on delivering measurable business impact through precision engineering and strategic digital transformation.
                    </motion.p>
                </div>

                {/* Grid - 3 items top, 2 centered bottom */}
                <div className="space-y-16">
                    {/* First Row: 3 items */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                        {points.slice(0, 3).map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="mb-8 h-48 flex items-center justify-center">
                                    <img
                                        src={p.img}
                                        alt={p.title}
                                        className="max-h-full w-auto object-contain hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-xl font-black text-[#002B54] uppercase tracking-tight mb-4 max-w-[250px]">
                                    {p.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-[300px]">
                                    {p.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Second Row: 2 items centered */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-4xl mx-auto">
                        {points.slice(3, 5).map((p, i) => (
                            <motion.div
                                key={i + 3}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (i + 3) * 0.1 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="mb-8 h-48 flex items-center justify-center">
                                    <img
                                        src={p.img}
                                        alt={p.title}
                                        className="max-h-full w-auto object-contain hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-xl font-black text-[#002B54] uppercase tracking-tight mb-4 max-w-[250px]">
                                    {p.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-[300px]">
                                    {p.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyItMatters
