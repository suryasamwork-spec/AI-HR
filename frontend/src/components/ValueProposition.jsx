import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Workflow, Brain, Shield, TrendingUp } from 'lucide-react'
import techBg from '../assets/26760925_2112.i301.031.S.m004.c13.UI_and_UX_designers_concepts_isometric_composition-removebg-preview.png'

/* ─── Value proposition data ─────────────────────────────── */
const values = [
    {
        icon: Code2,
        title: 'Domain Driven Custom Software',
        desc: 'Tailored solutions built specifically for your industry needs and workflows.',
        gradient: ['#2563eb', '#60a5fa'],
        num: '01',
    },
    {
        icon: Workflow,
        title: 'End to End Digitization of Business Processes',
        desc: 'Complete digital transformation from strategy to implementation.',
        gradient: ['#7c3aed', '#a78bfa'],
        num: '02',
    },
    {
        icon: Brain,
        title: 'AI Based Development Model',
        desc: 'AI-powered approach for smarter, faster software development.',
        gradient: ['#0891b2', '#38bdf8'],
        num: '03',
    },
    {
        icon: Shield,
        title: 'Strong Focus on Scalability and Data Integrity',
        desc: 'Secure enterprise-grade solutions that scale with your business.',
        gradient: ['#059669', '#34d399'],
        num: '04',
    },
    {
        icon: TrendingUp,
        title: 'Cost Effective Solutions',
        desc: 'Maximum ROI through optimized development processes.',
        gradient: ['#dc2626', '#fb923c'],
        num: '05',
    },
]


/* ─── Fade-up animation ───────────────────────────────────── */
const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut', delay } },
})

/* ═══════════════════════════════════════════════════════════ */
const ValueProposition = () => {
    return (
        <section id="value-proposition" className="relative py-28 overflow-hidden bg-white">

            {/* ── Background illustration at 50% opacity ── */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ opacity: 0.5 }}>
                <img
                    src={techBg}
                    alt=""
                    className="w-full h-full object-contain"
                    aria-hidden="true"
                />
            </div>

            {/* ── Soft overlay to keep text readable ── */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.55) 100%)' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* ── Section header ── */}
                <motion.div
                    variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-4 mb-5">
                        <div className="w-8 h-[1px] bg-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-blue-600">Why Choose Us</span>
                        <div className="w-8 h-[1px] bg-blue-600" />
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-black uppercase italic leading-none">
                        Our Value<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(37,99,235,0.5)' }}>Proposition</span>
                    </h2>
                </motion.div>

                {/* ── Cards grid ── */}
                {/* First row: 3 cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {values.slice(0, 3).map((v, i) => {
                        const Icon = v.icon
                        return (
                            <motion.div
                                key={i}
                                variants={fadeUp(i * 0.1)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="relative p-8 rounded-[2rem] bg-white/75 backdrop-blur-sm border border-blue-600/10 shadow-sm transition-all duration-500 overflow-hidden"
                            >
                                {/* Number watermark */}
                                <div className="absolute top-6 right-7 text-[11px] font-black tracking-widest text-gray-100 select-none">{v.num}</div>

                                {/* Icon */}
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md transition-transform duration-400"
                                    style={{ background: `linear-gradient(135deg, ${v.gradient[0]}, ${v.gradient[1]})` }}
                                >
                                    <Icon size={22} className="text-white" strokeWidth={1.5} />
                                </div>

                                {/* Text */}
                                <h3 className="text-base font-black text-black uppercase tracking-tight mb-3 leading-snug">
                                    {v.title}
                                </h3>
                                <p className="text-sm text-gray-500 font-light leading-relaxed">{v.desc}</p>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Second row: 2 cards centred */}
                <div className="grid md:grid-cols-2 gap-6 md:max-w-[66%] mx-auto">
                    {values.slice(3).map((v, i) => {
                        const Icon = v.icon
                        return (
                            <motion.div
                                key={i + 3}
                                variants={fadeUp((i + 3) * 0.1)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="relative p-8 rounded-[2rem] bg-white/75 backdrop-blur-sm border border-blue-600/10 shadow-sm transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute top-6 right-7 text-[11px] font-black tracking-widest text-gray-100 select-none">{v.num}</div>

                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md transition-transform duration-400"
                                    style={{ background: `linear-gradient(135deg, ${v.gradient[0]}, ${v.gradient[1]})` }}
                                >
                                    <Icon size={22} className="text-white" strokeWidth={1.5} />
                                </div>

                                <h3 className="text-base font-black text-black uppercase tracking-tight mb-3 leading-snug">
                                    {v.title}
                                </h3>
                                <p className="text-sm text-gray-500 font-light leading-relaxed">{v.desc}</p>
                            </motion.div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}

export default ValueProposition
