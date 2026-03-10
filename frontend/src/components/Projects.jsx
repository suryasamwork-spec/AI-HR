import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Database, Layout, Link as LinkIcon, CheckCircle2, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import archiveImg from '../assets/img.png'

const Projects = () => {
    const navigate = useNavigate()
    const sectionRef = useRef(null)
    const imgWrapRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !imgWrapRef.current) return
            const section = sectionRef.current
            const imgWrap = imgWrapRef.current
            const sectionRect = section.getBoundingClientRect()
            const imgHeight = imgWrap.offsetHeight

            if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
                // Center of image = center of viewport
                const desiredTop = (window.innerHeight / 2) - sectionRect.top - (imgHeight / 2)
                const minTop = 0
                const maxTop = section.offsetHeight - imgHeight
                const clampedTop = Math.max(minTop, Math.min(maxTop, desiredTop))
                imgWrap.style.top = `${clampedTop}px`
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const categories = [
        {
            title: "Operational Efficiency",
            icon: Database,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            desc: "Automate manual processes, eliminate redundancies, and significantly reduce administrative effort across departments."
        },
        {
            title: "Real-Time Visibility",
            icon: Shield,
            color: "text-indigo-600",
            bgColor: "bg-indigo-50",
            desc: "Gain instant insights into workforce activity, resource allocation, project status, and overall performance metrics."
        },
        {
            title: "Process Control & Compliance",
            icon: Layout,
            color: "text-cyan-600",
            bgColor: "bg-cyan-50",
            desc: "Standardized workflows with complete traceability, approval hierarchies, and audit readiness to ensure policy adherence."
        },
        {
            title: "Data-Driven Decisions",
            icon: LinkIcon,
            color: "text-blue-500",
            bgColor: "bg-blue-50",
            desc: "Leverage actionable insights and structured analytics to optimize productivity, resource utilization, and strategic planning."
        },
        {
            title: "Improved Accountability",
            icon: CheckCircle2,
            color: "text-green-600",
            bgColor: "bg-green-50",
            desc: "Establish clear ownership, defined responsibilities, and measurable performance tracking across teams."
        },
        {
            title: "Cost Optimization",
            icon: Database,
            color: "text-amber-600",
            bgColor: "bg-amber-50",
            desc: "Identify inefficiencies, control operational expenses, and maximize return on organizational resources."
        },
        {
            title: "Scalability & Growth Readiness",
            icon: Layout,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            desc: "Adapt seamlessly to expanding teams, increasing workloads, and evolving business requirements."
        }
    ]

    return (
        <section id="projects" className="py-24 sm:py-48 bg-white">
            <div className="max-w-[1440px] mx-auto px-6">
                <div ref={sectionRef} className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

                    {/* Left Side: Image Visual - JS Centered (desktop only) */}
                    <div className="hidden lg:block lg:w-2/5 relative">
                        <div ref={imgWrapRef} className="absolute left-0 w-full">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <img
                                    src={archiveImg}
                                    alt="Business Value Visual"
                                    className="w-full h-auto object-contain"
                                />
                                <div className="mt-8 space-y-4">
                                    <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
                                        BUSINESS<br />
                                        <span className="text-blue-600">VALUE</span> SECTION
                                    </h2>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Mobile Image (static) */}
                    <div className="block lg:hidden w-full mb-8">
                        <img src={archiveImg} alt="Business Value Visual" className="w-full max-w-sm mx-auto h-auto object-contain" />
                        <h2 className="text-4xl font-black tracking-tighter text-slate-900 leading-tight mt-6">
                            BUSINESS<br />
                            <span className="text-blue-600">VALUE</span> SECTION
                        </h2>
                    </div>

                    {/* Right Side: Scrollable Points */}
                    <div className="lg:w-3/5 flex flex-col relative">
                        <div className="w-full pr-8 space-y-16 py-12">
                            {categories.map((cat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.8 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`p-4 rounded-2xl ${cat.bgColor} ${cat.color} shadow-sm`}>
                                            <cat.icon size={32} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                                            {cat.title}
                                        </h3>
                                    </div>
                                    <div className="grid gap-6">
                                        <p className="text-slate-500 font-light leading-relaxed text-lg">
                                            {cat.desc}
                                        </p>
                                    </div>
                                    {idx < categories.length - 1 && (
                                        <div className="pt-8 border-b border-slate-100" />
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* View All Projects Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="pt-12 border-t border-slate-50"
                        >
                            <button
                                onClick={() => navigate('/all-projects')}
                                className="px-10 py-4 rounded-2xl bg-[#002B54] text-white flex items-center gap-3 shadow-xl hover:scale-[1.02] transition-transform"
                            >
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-white">View All Projects</span>
                                <ChevronRight size={18} />
                            </button>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Projects
