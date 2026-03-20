import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Code2, Cpu, Settings, Layout, ShieldCheck } from 'lucide-react'

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

// Diagonal clip polygon — same value used for both the white background and the navy-text overlay
// so they're guaranteed to be perfectly aligned.
const CLIP = 'polygon(0 0, 62% 0, 38% 100%, 0 100%)'

/**
 * ContentBlock — renders all text with the given colour tokens.
 * Rendered twice: once for each half of the diagonal.
 */
const ContentBlock = ({ titleColor, descColor, labelColor, borderColor, outlineColor }) => (
    <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mb-20 text-center mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-10 h-[1px]" style={{ background: labelColor }} />
                <span
                    className="text-xs font-black uppercase tracking-[0.6em]"
                    style={{ color: labelColor }}
                >
                    Our Expertise
                </span>
                <div className="w-10 h-[1px]" style={{ background: labelColor }} />
            </div>

            <h1
                className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-8"
                style={{ color: titleColor }}
            >
                What We{' '}
                <span style={{
                    color: 'transparent',
                    WebkitTextStroke: `2px ${outlineColor}`
                }}>
                    Do
                </span>
            </h1>

            <p
                className="text-xl font-light max-w-2xl mx-auto leading-relaxed"
                style={{ color: descColor }}
            >
                We bridge the gap between complex business problems and elegant technological
                solutions with a human-centric approach.
            </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {services.map((service, index) => (
                <div key={index} className="space-y-4">
                    <h3
                        className="text-xl font-black uppercase tracking-tight pb-4 inline-block"
                        style={{
                            color: titleColor,
                            borderBottom: `2px solid ${borderColor}`
                        }}
                    >
                        {service.title}
                    </h3>
                    <p
                        className="text-base leading-relaxed font-light"
                        style={{ color: descColor }}
                    >
                        {service.desc}
                    </p>
                </div>
            ))}
        </div>
    </div>
)

const WhatWeDo = () => {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    })

    const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.85, 1]), {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])

    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden min-h-screen flex items-center"
            style={{ background: '#002B54' }}
        >

            {/* ── White triangle (top-left half) ─────────────────────────────── */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: '#ffffff',
                clipPath: CLIP,
                zIndex: 0
            }} />

            {/* ── Base layer: WHITE text — sits on the blue half ───────────── */}
            <motion.div
                className="py-32 w-full"
                style={{
                    position: 'relative',
                    zIndex: 1,
                    scale,
                    opacity
                }}
            >
                <ContentBlock
                    titleColor="#ffffff"
                    descColor="rgba(255,255,255,0.75)"
                    labelColor="rgba(255,255,255,0.6)"
                    borderColor="rgba(255,255,255,0.2)"
                    outlineColor="#ffffff"
                />
            </motion.div>

            {/* ── Overlay layer: NAVY text — clipped to white triangle ─────── */}
            <motion.div
                className="py-32 w-full h-full flex items-center"
                style={{
                    position: 'absolute',
                    inset: 0,
                    clipPath: CLIP,
                    zIndex: 2,
                    scale,
                    opacity
                }}
            >
                <ContentBlock
                    titleColor="#002B54"
                    descColor="#6b7280"
                    labelColor="#2563eb"
                    borderColor="rgba(0,43,84,0.12)"
                    outlineColor="#002B54"
                />
            </motion.div>

        </section>
    )
}

export default WhatWeDo
