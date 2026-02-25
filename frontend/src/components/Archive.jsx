import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    Search, Clock, ShieldCheck, Lock,
    FileText, Image, Globe, BookOpen,
    ArrowRight, Database, Layers, CheckCircle2,
    Zap, Scale, Link2, BookMarked,
} from 'lucide-react'

/* ─── Reusable fade-up variant ──────────────────────────────── */
const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut', delay } },
})

/* ─── SVG: Floating PDF / document hero illustration ─────────── */
const ArchiveHeroSVG = () => (
    <svg viewBox="0 0 560 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Background glow blobs */}
        <ellipse cx="280" cy="200" rx="200" ry="140" fill="#2563eb" opacity="0.06" />
        <ellipse cx="160" cy="140" rx="80" ry="60" fill="#3b82f6" opacity="0.08" />
        <ellipse cx="400" cy="280" rx="90" ry="60" fill="#2563eb" opacity="0.07" />

        {/* ── Central server / database ── */}
        <rect x="220" y="140" width="120" height="140" rx="14" fill="#1e40af" opacity="0.9" />
        <rect x="228" y="148" width="104" height="16" rx="6" fill="#3b82f6" opacity="0.5" />
        <rect x="228" y="170" width="104" height="6" rx="3" fill="#93c5fd" opacity="0.3" />
        <rect x="228" y="182" width="80" height="6" rx="3" fill="#93c5fd" opacity="0.2" />
        <rect x="228" y="194" width="104" height="6" rx="3" fill="#93c5fd" opacity="0.3" />
        <rect x="228" y="206" width="60" height="6" rx="3" fill="#93c5fd" opacity="0.2" />
        {/* blinking dot */}
        <circle cx="246" cy="240" r="5" fill="#34d399" opacity="0.9" />
        <circle cx="246" cy="240" r="9" fill="#34d399" opacity="0.15" />
        <rect x="258" y="237" width="50" height="6" rx="3" fill="#93c5fd" opacity="0.4" />
        {/* database layers */}
        <ellipse cx="280" cy="270" rx="52" ry="12" fill="#2563eb" opacity="0.4" />
        <ellipse cx="280" cy="280" rx="52" ry="12" fill="#1d4ed8" opacity="0.5" />
        <ellipse cx="280" cy="290" rx="52" ry="12" fill="#1e3a8a" opacity="0.6" />

        {/* ── PDF card – left ── */}
        <g transform="rotate(-12, 110, 160)">
            <rect x="70" y="110" width="80" height="100" rx="10" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
            <rect x="70" y="110" width="80" height="24" rx="10" fill="#ef4444" opacity="0.85" />
            <rect x="70" y="122" width="80" height="12" fill="#ef4444" opacity="0.85" />
            <text x="110" y="126" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">PDF</text>
            <rect x="80" y="142" width="60" height="6" rx="3" fill="#dbeafe" />
            <rect x="80" y="154" width="48" height="6" rx="3" fill="#eff6ff" />
            <rect x="80" y="166" width="56" height="6" rx="3" fill="#dbeafe" />
            <rect x="80" y="178" width="36" height="6" rx="3" fill="#eff6ff" />
        </g>

        {/* ── DOC card – right ── */}
        <g transform="rotate(10, 420, 140)">
            <rect x="380" y="90" width="80" height="100" rx="10" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
            <rect x="380" y="90" width="80" height="24" rx="10" fill="#2563eb" opacity="0.9" />
            <rect x="380" y="102" width="80" height="12" fill="#2563eb" opacity="0.9" />
            <text x="420" y="106" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">DOC</text>
            <rect x="390" y="122" width="60" height="6" rx="3" fill="#dbeafe" />
            <rect x="390" y="134" width="44" height="6" rx="3" fill="#eff6ff" />
            <rect x="390" y="146" width="54" height="6" rx="3" fill="#dbeafe" />
            <rect x="390" y="158" width="34" height="6" rx="3" fill="#eff6ff" />
        </g>

        {/* ── Image card – bottom-left ── */}
        <g transform="rotate(6, 130, 310)">
            <rect x="90" y="270" width="80" height="70" rx="10" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
            <rect x="90" y="270" width="80" height="36" rx="10" fill="#7c3aed" opacity="0.15" />
            <rect x="90" y="294" width="80" height="12" fill="#7c3aed" opacity="0.15" />
            <circle cx="125" cy="287" r="10" fill="#a78bfa" opacity="0.5" />
            <rect x="100" y="316" width="60" height="6" rx="3" fill="#ede9fe" />
            <rect x="100" y="326" width="40" height="6" rx="3" fill="#f5f3ff" />
        </g>

        {/* ── Video card – bottom-right ── */}
        <g transform="rotate(-8, 420, 310)">
            <rect x="380" y="270" width="80" height="70" rx="10" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
            <rect x="380" y="270" width="80" height="36" rx="10" fill="#059669" opacity="0.12" />
            <rect x="380" y="294" width="80" height="12" fill="#059669" opacity="0.12" />
            <polygon points="415,280 415,300 432,290" fill="#059669" opacity="0.6" />
            <rect x="390" y="316" width="60" height="6" rx="3" fill="#d1fae5" />
            <rect x="390" y="326" width="42" height="6" rx="3" fill="#ecfdf5" />
        </g>

        {/* Connection lines from cards to centre */}
        {[
            [150, 185, 220, 200],
            [390, 160, 340, 185],
            [170, 300, 228, 260],
            [390, 300, 332, 265],
        ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#3b82f6" strokeWidth="1" strokeDasharray="5 4" opacity="0.3" />
        ))}

        {/* Sparkle dots */}
        {[[80, 80], [480, 70], [500, 330], [60, 340], [290, 50], [280, 370]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="#2563eb" opacity="0.25" />
        ))}
    </svg>
)

/* ─── Key features data ─────────────────────────────────────── */
const features = [
    {
        icon: Search,
        title: 'Advanced Search',
        desc: 'Instantly locate files using metadata — tags, dates, and keywords — rather than digging through folders.',
        gradient: ['#2563eb', '#60a5fa'],
    },
    {
        icon: Clock,
        title: 'Long-term Preservation',
        desc: 'Formats are monitored and updated to prevent digital decay or file obsolescence over decades.',
        gradient: ['#7c3aed', '#a78bfa'],
    },
    {
        icon: ShieldCheck,
        title: 'Data Integrity',
        desc: 'Automated checks ensure files are never altered, corrupted, or lost over time.',
        gradient: ['#059669', '#34d399'],
    },
    {
        icon: Lock,
        title: 'Secure Access',
        desc: 'Role-based permissions ensure the right people have access while sensitive data stays protected.',
        gradient: ['#dc2626', '#f87171'],
    },
]

const impacts = [
    { benefit: 'Efficiency', impact: 'Reduces time spent searching for legacy information by up to 80%.', icon: Zap, color: '#f59e0b' },
    { benefit: 'Compliance', impact: 'Meets legal requirements for document retention and data privacy.', icon: Scale, color: '#2563eb' },
    { benefit: 'Continuity', impact: 'Protects institutional knowledge against hardware failure or staff turnover.', icon: Link2, color: '#7c3aed' },
    { benefit: 'Storytelling', impact: 'Provides a rich source of material for anniversaries and marketing.', icon: BookMarked, color: '#059669' },
]

/* ═══════════════════════════════════════════════════════════ */
const Archive = () => {

    return (
        <section id="archive" className="py-32 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/4 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/4 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* ══════════════════════════════════════════ */}
                {/* 1. HERO — Headline & Definition             */}
                {/* ══════════════════════════════════════════ */}
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                    {/* Text */}
                    <motion.div variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <div className="inline-flex items-center gap-4 mb-6">
                            <div className="w-8 h-[1px] bg-blue-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-blue-600">Digital Archive</span>
                            <div className="w-8 h-[1px] bg-blue-600" />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black uppercase italic leading-none mb-6">
                            OUR DIGITAL<br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(37,99,235,0.6)' }}>ARCHIVE</span>
                        </h2>
                        <p className="text-base text-gray-400 font-black uppercase tracking-[0.15em] mb-4">
                            Preserving Our Legacy
                        </p>
                        <p className="text-lg text-gray-500 font-light leading-relaxed border-l-2 border-blue-600/25 pl-6 max-w-xl">
                            A central, secure repository designed to collect, organise, and safeguard our digital assets.
                            Unlike a simple backup, our archive ensures that historical records, documents, and media
                            remain accessible and usable for decades to come.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-10">
                            <Link to="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white text-sm font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg hover:-translate-y-1">
                                Request Access <ArrowRight size={14} />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Illustration */}
                    <motion.div
                        variants={fadeUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] rounded-[3rem] overflow-hidden border border-blue-600/10 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-2xl">
                            <ArchiveHeroSVG />
                        </div>
                        {/* floating badge */}
                        <div className="absolute -bottom-5 -left-5 flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-xl border border-blue-600/10">
                            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                                <Database size={16} className="text-white" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Archive Status</p>
                                <p className="text-sm font-black text-black">Secure & Active</p>
                            </div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse ml-2" />
                        </div>
                    </motion.div>
                </div>

                {/* ══════════════════════════════════════════ */}
                {/* 2. KEY FEATURES                            */}
                {/* ══════════════════════════════════════════ */}
                <motion.div variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-32">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-4 mb-4">
                            <div className="w-6 h-[1px] bg-blue-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-blue-600">How It Works</span>
                            <div className="w-6 h-[1px] bg-blue-600" />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-black uppercase">Key Features</h3>
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
                                    className="group p-8 rounded-[2rem] bg-white border border-blue-600/10 hover:border-blue-600/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
                                >
                                    {/* gradient blob bg on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-[2rem]"
                                        style={{ background: `linear-gradient(135deg, ${f.gradient[0]}, ${f.gradient[1]})` }} />
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                                        style={{ background: `linear-gradient(135deg, ${f.gradient[0]}, ${f.gradient[1]})` }}
                                    >
                                        <Icon size={22} className="text-white" strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-base font-black text-black uppercase tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
                                        {f.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 font-light leading-relaxed">{f.desc}</p>

                                    {/* bottom accent line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ background: `linear-gradient(90deg, ${f.gradient[0]}, ${f.gradient[1]})` }} />
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
                            <div className="w-6 h-[1px] bg-blue-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-blue-600">The Value</span>
                            <div className="w-6 h-[1px] bg-blue-600" />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-black uppercase">Why It Matters</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        {impacts.map((row, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp(i * 0.1)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="flex items-start gap-5 p-8 rounded-[2rem] bg-white border border-blue-600/10 hover:border-blue-600/30 hover:shadow-lg transition-all duration-500 group"
                            >
                                <div
                                    className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                                    style={{ background: row.color + '18', border: `1.5px solid ${row.color}30` }}
                                >
                                    <row.icon size={22} strokeWidth={1.5} style={{ color: row.color }} />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-2">{row.benefit}</p>
                                    <p className="text-sm text-gray-600 font-light leading-relaxed">{row.impact}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ══════════════════════════════════════════ */}
                {/* 5. CTA Strip                               */}
                {/* ══════════════════════════════════════════ */}
                <motion.div
                    variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="relative rounded-[3rem] overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)' }}
                >
                    {/* dot grid */}
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                    {/* glow orb */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 blur-[80px] rounded-full" />

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center p-12 md:p-20">
                        {/* Left */}
                        <div>
                            <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.8em] mb-4">Next Step</p>
                            <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-tight mb-4">
                                Dive into<br />
                                <span className="text-blue-200">the Archive</span>
                            </h3>
                            <p className="text-blue-100 font-light leading-relaxed max-w-sm">
                                Explore our collections, contribute new records, or request access to historical data.
                            </p>
                        </div>

                        {/* Right — 3 CTA buttons */}
                        <div className="flex flex-col gap-4">
                            {[
                                { label: 'Explore the Collections', sub: 'Browse all archived assets', icon: Database },
                                { label: 'Submit an Item to the Archive', sub: 'Contribute historical records', icon: Layers },
                                { label: 'Request Access to Historical Records', sub: 'For authorised personnel', icon: Lock },
                            ].map((cta, i) => {
                                const Icon = cta.icon
                                return (
                                    <Link
                                        to="/contact"
                                        key={i}
                                        className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-all">
                                            <Icon size={16} className="text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm font-black uppercase tracking-wide truncate">{cta.label}</p>
                                            <p className="text-blue-200 text-xs font-light">{cta.sub}</p>
                                        </div>
                                        <ArrowRight size={14} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}

export default Archive
