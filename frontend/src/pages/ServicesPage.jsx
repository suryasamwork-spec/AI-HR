import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
    Monitor, Brain, Palette, Cloud,
    CheckCircle2, ArrowRight, Code2, Cpu,
    Layers, Globe, Zap, Shield,
} from 'lucide-react'

/* ─── Service data ─────────────────────────────────────────── */
const services = [
    {
        id: 'web-development',
        label: 'Web Development',
        icon: Monitor,
        gradient: ['#2563eb', '#60a5fa'],
        tag: '01 · Full-Stack',
        title: 'Web\nDevelopment',
        description:
            'We specialise in building responsive, high-performance websites that provide a seamless user experience across all devices. Leveraging the latest technology stack—including React, Next.js, and Node.js—we ensure your digital presence is both fast and future-proof.',
        bullets: [
            'React & Next.js for high-speed dynamic interfaces',
            'Robust backend architecture with Node.js and TypeScript',
            'SEO-optimised and accessibility-compliant development',
        ],
        visual: (
            <svg viewBox="0 0 480 320" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="480" height="320" rx="24" fill="#f0f6ff" />
                {/* Browser frame */}
                <rect x="40" y="30" width="400" height="260" rx="16" fill="white" stroke="#bfdbfe" strokeWidth="2" />
                <rect x="40" y="30" width="400" height="44" rx="16" fill="#eff6ff" />
                <rect x="40" y="62" width="400" height="12" fill="#eff6ff" />
                <circle cx="70" cy="52" r="7" fill="#fca5a5" />
                <circle cx="92" cy="52" r="7" fill="#fcd34d" />
                <circle cx="114" cy="52" r="7" fill="#86efac" />
                <rect x="140" y="44" width="220" height="16" rx="8" fill="#dbeafe" />
                {/* Code lines */}
                {[100, 122, 144, 166, 188, 210, 232].map((y, i) => (
                    <rect key={i} x="70" y={y} width={[180, 140, 200, 100, 160, 120, 180][i]} height="10" rx="5"
                        fill={i % 3 === 0 ? '#bfdbfe' : i % 3 === 1 ? '#dbeafe' : '#eff6ff'} />
                ))}
                {/* Right panel */}
                <rect x="290" y="90" width="130" height="180" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                <rect x="306" y="108" width="98" height="38" rx="8" fill="#2563eb" opacity="0.15" />
                <rect x="306" y="156" width="72" height="8" rx="4" fill="#bfdbfe" />
                <rect x="306" y="172" width="56" height="8" rx="4" fill="#dbeafe" />
                <rect x="306" y="205" width="98" height="32" rx="8" fill="#2563eb" opacity="0.9" />
                <text x="355" y="226" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">Deploy →</text>
            </svg>
        ),
    },
    {
        id: 'ai-solutions',
        label: 'AI Solutions',
        icon: Brain,
        gradient: ['#7c3aed', '#a78bfa'],
        tag: '02 · Machine Learning',
        title: 'AI\nSolutions',
        description:
            'Harness the power of artificial intelligence to transform your business operations. Our team develops custom LLM models and automation tools designed to analyse complex data sets and provide actionable insights that drive growth and efficiency.',
        bullets: [
            'Custom LLM training and RAG implementation',
            'Advanced predictive data analysis and reporting',
            'Intelligent workflow automation and chatbots',
        ],
        visual: (
            <svg viewBox="0 0 480 320" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="480" height="320" rx="24" fill="#f5f3ff" />
                {/* Neural network nodes */}
                {[
                    { cx: 100, cy: 160, r: 22, fill: '#7c3aed' },
                    { cx: 210, cy: 90, r: 18, fill: '#8b5cf6' },
                    { cx: 210, cy: 160, r: 18, fill: '#8b5cf6' },
                    { cx: 210, cy: 230, r: 18, fill: '#8b5cf6' },
                    { cx: 320, cy: 115, r: 16, fill: '#a78bfa' },
                    { cx: 320, cy: 205, r: 16, fill: '#a78bfa' },
                    { cx: 390, cy: 160, r: 22, fill: '#7c3aed' },
                ].map((n, i) => (
                    <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill={n.fill} opacity="0.85" />
                ))}
                {/* Connections */}
                {[
                    [100, 160, 210, 90], [100, 160, 210, 160], [100, 160, 210, 230],
                    [210, 90, 320, 115], [210, 90, 320, 205],
                    [210, 160, 320, 115], [210, 160, 320, 205],
                    [210, 230, 320, 115], [210, 230, 320, 205],
                    [320, 115, 390, 160], [320, 205, 390, 160],
                ].map(([x1, y1, x2, y2], i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c4b5fd" strokeWidth="1.5" opacity="0.6" />
                ))}
                {/* Pulse circles */}
                <circle cx="100" cy="160" r="34" stroke="#7c3aed" strokeWidth="1" opacity="0.2" />
                <circle cx="390" cy="160" r="34" stroke="#7c3aed" strokeWidth="1" opacity="0.2" />
                {/* Label */}
                <rect x="154" y="276" width="172" height="28" rx="14" fill="#7c3aed" opacity="0.1" />
                <text x="240" y="294" textAnchor="middle" fill="#7c3aed" fontSize="11" fontWeight="700">NEURAL NETWORK</text>
            </svg>
        ),
    },
    {
        id: 'ui-ux-design',
        label: 'UI/UX Design',
        icon: Palette,
        gradient: ['#0891b2', '#38bdf8'],
        tag: '03 · Design Systems',
        title: 'UI/UX\nDesign',
        description:
            'We believe that great design starts with understanding the user. Through intensive user research, wireframing, and interactive prototyping with Figma, we craft intuitive interfaces that delight users and achieve your business objectives.',
        bullets: [
            'Deep user research and persona development',
            'High-fidelity wireframing and interactive prototypes',
            'Design systems for consistent brand identity',
        ],
        visual: (
            <svg viewBox="0 0 480 320" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="480" height="320" rx="24" fill="#ecfeff" />
                {/* Phone frame */}
                <rect x="170" y="20" width="140" height="280" rx="24" fill="white" stroke="#bae6fd" strokeWidth="2" />
                <rect x="200" y="10" width="80" height="18" rx="9" fill="#bae6fd" />
                {/* Screen content */}
                <rect x="182" y="50" width="116" height="220" rx="8" fill="#f0f9ff" />
                <rect x="192" y="62" width="96" height="40" rx="10" fill="#0891b2" opacity="0.15" />
                <rect x="200" y="75" width="60" height="8" rx="4" fill="#0891b2" opacity="0.5" />
                <rect x="200" y="87" width="40" height="6" rx="3" fill="#7dd3fc" opacity="0.6" />
                {[118, 140, 162, 184].map((y, i) => (
                    <rect key={i} x="192" y={y} width={[96, 72, 84, 56][i]} height="12" rx="6"
                        fill={i === 0 ? '#bae6fd' : '#e0f2fe'} />
                ))}
                <rect x="192" y="218" width="96" height="36" rx="10" fill="#0891b2" />
                <text x="240" y="241" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">Get Started</text>
                {/* Floating design elements */}
                <rect x="30" y="60" width="110" height="70" rx="12" fill="white" stroke="#bae6fd" strokeWidth="1.5" />
                <circle cx="56" cy="88" r="16" fill="#bae6fd" />
                <rect x="80" y="78" width="46" height="8" rx="4" fill="#e0f2fe" />
                <rect x="80" y="92" width="34" height="6" rx="3" fill="#f0f9ff" />
                <rect x="340" y="160" width="110" height="70" rx="12" fill="white" stroke="#bae6fd" strokeWidth="1.5" />
                <rect x="354" y="176" width="82" height="8" rx="4" fill="#bae6fd" />
                <rect x="354" y="190" width="60" height="6" rx="3" fill="#e0f2fe" />
                <rect x="354" y="204" width="82" height="16" rx="8" fill="#0891b2" opacity="0.8" />
            </svg>
        ),
    },
    {
        id: 'cloud-services',
        label: 'Cloud Services',
        icon: Cloud,
        gradient: ['#059669', '#34d399'],
        tag: '04 · Infrastructure',
        title: 'Cloud\nServices',
        description:
            'Scale your business globally with our expert cloud solutions. We facilitate seamless AWS and Azure migrations, design cost-effective serverless architectures, and ensure your infrastructure is secure, resilient, and highly scalable.',
        bullets: [
            'Strategic migration to AWS and Microsoft Azure',
            'Serverless architecture for cost-efficiency',
            '24/7 infrastructure monitoring and security',
        ],
        visual: (
            <svg viewBox="0 0 480 320" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="480" height="320" rx="24" fill="#ecfdf5" />
                {/* Cloud shape */}
                <ellipse cx="240" cy="150" rx="100" ry="60" fill="#6ee7b7" opacity="0.4" />
                <ellipse cx="190" cy="150" rx="60" ry="48" fill="#6ee7b7" opacity="0.5" />
                <ellipse cx="290" cy="155" rx="60" ry="45" fill="#6ee7b7" opacity="0.5" />
                <ellipse cx="240" cy="165" rx="120" ry="42" fill="#a7f3d0" />
                {/* Connection lines downward */}
                {[160, 210, 260, 310].map((x, i) => (
                    <g key={i}>
                        <line x1={x} y1="195" x2={x} y2="240" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
                        <rect x={x - 28} y="240" width="56" height="36" rx="10" fill="white" stroke="#a7f3d0" strokeWidth="1.5" />
                        <text x={x} y="263" textAnchor="middle" fill="#059669" fontSize="9" fontWeight="700">
                            {['EC2', 'S3', 'Lambda', 'CDN'][i]}
                        </text>
                    </g>
                ))}
                {/* Cloud icon center */}
                <text x="240" y="162" textAnchor="middle" fill="#059669" fontSize="28">☁</text>
                {/* Top label */}
                <rect x="170" y="64" width="140" height="30" rx="15" fill="#059669" opacity="0.1" />
                <text x="240" y="83" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="800">CLOUD INFRASTRUCTURE</text>
            </svg>
        ),
    },
]

/* ─── Fade-in animation variant ───────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

/* ─── Component ────────────────────────────────────────────── */
const ServicesPage = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Scroll to hash section after page + animations have settled
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '')
            // Small delay so framer-motion initial renders don't fight the scroll
            const timer = setTimeout(() => {
                const el = document.getElementById(id)
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [location.hash])

    return (
        <div className="min-h-screen bg-white">
            {/* ── Hero ── */}
            <section className="pt-32 pb-20 bg-white relative overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center gap-4 mb-6">
                            <div className="w-8 h-[1px] bg-blue-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-blue-600">What We Offer</span>
                            <div className="w-8 h-[1px] bg-blue-600" />
                        </div>
                        <h1 className="text-5xl md:text-9xl font-black tracking-tighter text-black uppercase italic leading-none mb-6">
                            OUR<br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.35)' }}>SERVICES</span>
                        </h1>
                        <p className="text-lg text-gray-500 font-light max-w-xl mx-auto leading-relaxed">
                            End-to-end digital solutions engineered to transform your ideas into scalable, production-ready products.
                        </p>
                    </motion.div>

                    {/* Quick-nav pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-3 mt-12"
                    >
                        {services.map((s) => {
                            const Icon = s.icon
                            return (
                                <a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-600/15 bg-white hover:bg-blue-50 hover:border-blue-600/40 text-sm font-bold text-gray-700 hover:text-blue-600 transition-all shadow-sm"
                                >
                                    <Icon size={14} />
                                    {s.label}
                                </a>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ── Service sections ── */}
            <div className="max-w-7xl mx-auto px-6 pb-32 space-y-32">
                {services.map((svc, idx) => {
                    const isEven = idx % 2 === 0
                    const Icon = svc.icon
                    return (
                        <motion.section
                            key={svc.id}
                            id={svc.id}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-80px' }}
                            className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:[&>*:first-child]:order-2' : ''}`}
                        >
                            {/* ── Visual ── */}
                            <div className="relative">
                                <div className="rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl aspect-[3/2]">
                                    {svc.visual}
                                </div>
                                {/* floating tag */}
                                <div
                                    className="absolute -bottom-5 -right-5 flex items-center gap-2 px-4 py-2 rounded-2xl shadow-lg text-white text-xs font-black uppercase tracking-wider"
                                    style={{ background: `linear-gradient(135deg, ${svc.gradient[0]}, ${svc.gradient[1]})` }}
                                >
                                    <Icon size={13} />
                                    {svc.label}
                                </div>
                            </div>

                            {/* ── Text ── */}
                            <div className="space-y-8">
                                {/* Tag */}
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
                                        style={{ background: `linear-gradient(135deg, ${svc.gradient[0]}, ${svc.gradient[1]})` }}
                                    >
                                        <Icon size={16} className="text-white" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">{svc.tag}</span>
                                </div>

                                {/* Heading */}
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black leading-tight uppercase">
                                    {svc.title.split('\n').map((line, i) => (
                                        <span key={i} className="block">{line}</span>
                                    ))}
                                </h2>

                                {/* Description */}
                                <p className="text-gray-500 text-base leading-relaxed font-light border-l-2 border-blue-600/20 pl-5">
                                    {svc.description}
                                </p>

                                {/* Bullets */}
                                <ul className="space-y-3">
                                    {svc.bullets.map((b, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2
                                                size={18}
                                                className="shrink-0 mt-0.5"
                                                style={{ color: svc.gradient[0] }}
                                            />
                                            <span className="text-sm text-gray-600 font-medium">{b}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl text-white text-sm font-black uppercase tracking-widest transition-all hover:opacity-90 hover:-translate-y-1 shadow-lg"
                                    style={{ background: `linear-gradient(135deg, ${svc.gradient[0]}, ${svc.gradient[1]})` }}
                                >
                                    Get Started
                                    <ArrowRight size={15} />
                                </Link>
                            </div>
                        </motion.section>
                    )
                })}
            </div>

            {/* ── Bottom CTA strip ── */}
            <section className="py-24 bg-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
                            Ready to build<br />
                            <span className="text-blue-200">something great?</span>
                        </h2>
                        <p className="text-blue-100 font-light max-w-md mx-auto mb-10 text-lg leading-relaxed">
                            Tell us about your project and let's engineer the future together.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-blue-600 font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-1"
                        >
                            Start a Project
                            <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default ServicesPage
