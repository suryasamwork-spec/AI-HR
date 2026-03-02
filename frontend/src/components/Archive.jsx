import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    Search, Clock, ShieldCheck, Lock,
    FileText, Image, Globe, BookOpen,
    ArrowRight, Database, Layers, CheckCircle2,
    Zap, Scale, Link2, BookMarked,
} from 'lucide-react'
import archiveHeroImg from '../assets/Gemini_Generated_Image_nrizv1nrizv1nriz.png'

/* ─── Reusable fade-up variant ──────────────────────────────── */
const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut', delay } },
})



/* ─── Key features data ─────────────────────────────────────── */
const features = [
    {
        icon: Search,
        title: 'Real-Time Visibility',
        desc: 'Formats are monitored and updated to prevent digital decay or file obsolescence over decades.',
        gradient: ['#002B54', '#1e40af'],
    },
    {
        icon: Clock,
        title: 'Secure access',
        desc: 'Role-based permissions ensure the right people have access while sensitive data stays protected.',
        gradient: ['#002B54', '#1e3a8a'],
    },
    {
        icon: ShieldCheck,
        title: 'Data Integrity',
        desc: ' Maintain data accuracy, consistency, and reliability across the system .',
        gradient: ['#002B54', '#1d4ed8'],
    },
    {
        icon: Lock,
        title: 'Performance Analytics',
        desc: 'Gain actionable insights through structured data monitoring and analysis.',
        gradient: ['#002B54', '#1c3d5a'],
    },
]

const impacts = [
    { benefit: 'Efficiency', impact: 'Reduces time spent searching for legacy information by up to 80%.', icon: Zap, color: '#002B54' },
    { benefit: 'Compliance', impact: 'Meets legal requirements for document retention and data privacy.', icon: Scale, color: '#002B54' },
    { benefit: 'Continuity', impact: 'Protects institutional knowledge against hardware failure or staff turnover.', icon: Link2, color: '#002B54' },
    { benefit: 'Storytelling', impact: 'Provides a rich source of material for anniversaries and marketing.', icon: BookMarked, color: '#002B54' },
]

/* ═══════════════════════════════════════════════════════════ */
const Archive = () => {

    return (
        <section id="archive" className="py-32 bg-white relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* ══════════════════════════════════════════ */}
                {/* 1. HERO — Headline & Definition             */}
                {/* ══════════════════════════════════════════ */}
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                    {/* Text */}
                    <motion.div variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <div className="inline-flex items-center gap-4 mb-6">
                            <div className="w-8 h-[1px]" style={{ background: '#002B54' }} />
                            <span className="text-[10px] font-black uppercase tracking-[0.8em]" style={{ color: '#002B54' }}>Digital Archive</span>
                            <div className="w-8 h-[1px]" style={{ background: '#002B54' }} />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6" style={{ color: '#002B54' }}>
                            OUR DIGITAL<br />
                            ARCHIVE
                        </h2>
                        <p className="text-base font-black uppercase tracking-[0.15em] mb-4" style={{ color: 'rgba(0,43,84,0.6)' }}>
                            Preserving Our Legacy
                        </p>
                        <p className="text-lg font-light leading-relaxed border-l-2 pl-6 max-w-xl" style={{ borderColor: 'rgba(0,43,84,0.15)', color: 'rgba(0,43,84,0.7)' }}>
                            A central, secure repository designed to collect, organise, and safeguard our digital assets.
                            Unlike a simple backup, our archive ensures that historical records, documents, and media
                            remain accessible and usable for decades to come.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-10">
                            <Link to="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white text-sm font-black uppercase tracking-widest transition-all shadow-lg hover:-translate-y-1"
                                style={{ background: '#002B54' }}>
                                Request Access <ArrowRight size={14} />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Illustration */}
                    <motion.div
                        variants={fadeUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="overflow-hidden">
                            <img
                                src={archiveHeroImg}
                                alt="Digital Archive Platform"
                                className="w-full h-auto"
                            />
                        </div>
                        {/* floating badge */}

                    </motion.div>
                </div>

                {/* ══════════════════════════════════════════ */}
                {/* 2. KEY FEATURES                            */}
                {/* ══════════════════════════════════════════ */}
                <motion.div variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-32">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-4 mb-4">
                            <div className="w-6 h-[1px]" style={{ background: '#002B54' }} />
                            <span className="text-[10px] font-black uppercase tracking-[0.8em]" style={{ color: '#002B54' }}>How It Works</span>
                            <div className="w-6 h-[1px]" style={{ background: '#002B54' }} />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase" style={{ color: '#002B54' }}>Key Features</h3>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((f, i) => {
                            const Icon = f.icon
                            return (
                                <motion.div
                                    key={i}
                                    variants={fadeUp(i * 0.1)}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="group p-8 rounded-3xl bg-white border border-gray-100 relative overflow-hidden"
                                >
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                                        style={{ background: `linear-gradient(135deg, ${f.gradient[0]}, ${f.gradient[1]})` }}
                                    >
                                        <Icon size={22} className="text-white" strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-base font-black uppercase tracking-tight mb-3 group-hover:text-[#002B54] transition-colors font-sans" style={{ color: '#002B54' }}>
                                        {f.title}
                                    </h4>
                                    <p className="text-sm font-light font-sans leading-relaxed" style={{ color: 'rgba(0,43,84,0.65)' }}>{f.desc}</p>

                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#002B54]/10" />
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>


                {/* ══════════════════════════════════════════ */}
                {/* 4. WHY IT MATTERS — Impact table           */}
                {/* ══════════════════════════════════════════ */}
                <motion.div variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-32">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-4 mb-4">
                            <div className="w-6 h-[1px]" style={{ background: '#002B54' }} />
                            <span className="text-[10px] font-black uppercase tracking-[0.8em]" style={{ color: '#002B54' }}>The Value</span>
                            <div className="w-6 h-[1px]" style={{ background: '#002B54' }} />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase" style={{ color: '#002B54' }}>Why It Matters</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        {impacts.map((row, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp(i * 0.1)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="flex items-start gap-5 p-8 rounded-3xl bg-white border border-gray-100 group"
                            >
                                <div
                                    className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                                    style={{ background: row.color + '18', border: `1.5px solid ${row.color}30` }}
                                >
                                    <row.icon size={22} strokeWidth={1.5} style={{ color: row.color }} />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.3em] mb-2" style={{ color: '#002B54' }}>{row.benefit}</p>
                                    <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(0,43,84,0.65)' }}>{row.impact}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>



            </div>
        </section>
    )
}

export default Archive
