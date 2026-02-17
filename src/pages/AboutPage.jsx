import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Users, Code, Globe, Shield } from 'lucide-react'
import caldimLogo from '../assets/caldim-logo.png'
import backgroundImage from '../assets/2650401.jpg'
import designImage from '../assets/26760925_2112.i301.031.S.m004.c13.UI_and_UX_designers_concepts_isometric_composition-removebg-preview.png'

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const stats = [
        { label: 'Members', value: '2,245,341' },
        { label: 'Associations', value: '46,328' },
        { label: 'Event Bookings', value: '828,867' },
        { label: 'Payments', value: '1,926,436' },
    ]

    const milestones = [
        { year: '2020', title: 'Founded', description: 'Started with a vision to revolutionize digital solutions.' },
        { year: '2021', title: 'Global Expansion', description: 'Served clients across 10+ countries.' },
        { year: '2022', title: 'Innovation Award', description: 'Recognized for excellence in AI integration.' },
        { year: '2023', title: 'Enterprise Partnerships', description: 'Partnered with major industry leaders.' },
    ]

    const valuePoints = [
        {
            title: 'Domain driven custom software',
            desc: 'Tailored solutions built specifically for your industry needs.'
        },
        {
            title: 'End-to-End Digitization',
            desc: 'Complete digital transformation from strategy to implementation.'
        },
        {
            title: 'AI Development Model',
            desc: 'AI-powered approach for smarter, faster software development.'
        },
        {
            title: 'Scalability & Integrity',
            desc: 'Secure enterprise-grade solutions that scale with your business.'
        },
        {
            title: 'Cost Effective Solutions',
            desc: 'Maximum ROI through optimized development processes.'
        }
    ]

    // Cursor interaction logic
    const imageRef = useRef(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 100, damping: 30 })
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 100, damping: 30 })

    const handleMouseMove = (e) => {
        if (!imageRef.current) return
        const rect = imageRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <div className="pt-24 min-h-screen bg-[#010826] text-white">
            {/* 1. Hero Section (Nexcent Style) */}
            <section className="section-container relative flex flex-col lg:flex-row items-center gap-16 py-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full" />

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 text-left z-10"
                >
                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1]">
                        Lessons and insights <br />
                        <span className="text-cyan-400 italic">from 8 years</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-xl mb-12 leading-relaxed">
                        Where to grow your business as a photographer: site or social media? At CALDIM, we bridge the gap between creative vision and technical excellence.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-lg shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-all"
                    >
                        Register Now
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex-1 flex justify-center lg:justify-end"
                >
                    <div className="relative w-full max-w-2xl aspect-square">
                        <img src={designImage} alt="Vector Graphic" className="w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(34,211,238,0.3)]" />
                    </div>
                </motion.div>
            </section>

            {/* 2. Our Clients Section */}
            <section className="py-20 border-y border-white/5 bg-white/[0.02]">
                <div className="section-container">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-500">Our Clients</h2>
                        <p className="text-gray-600 mt-2">We have been working with some Fortune 500+ clients</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-16 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                        <Code size={48} />
                        <Globe size={48} />
                        <Shield size={48} />
                        <Users size={48} />
                        <Code size={48} strokeWidth={1} />
                        <Globe size={48} strokeWidth={1} />
                    </div>
                </div>
            </section>

            {/* 3. Manage your entire community (Engineering Excellence) */}
            <section
                className="relative py-48 overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* User's Requested Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={backgroundImage}
                        alt="Background"
                        className="w-full h-full object-cover opacity-50 filter brightness-[0.2]"
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at calc(50% + 0px) calc(50% + 0px), rgba(34, 211, 238, 0.12) 0%, transparent 40%)`
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#010826] via-transparent to-[#010826]" />
                </div>

                <div className="section-container relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase">Manage your entire community <br /> in a single system</h2>
                    <p className="text-gray-400 mb-20">Who is Nextcent suitable for?</p>

                    <div className="relative h-[800px] flex items-center justify-center">
                        {/* THE ORBITAL MAP (Surrounds circularly) */}
                        <div className="hidden lg:block absolute inset-0">
                            {valuePoints.map((point, index) => {
                                const angle = (index * 72) - 90;
                                const radius = 400;
                                const x = Math.cos((angle * Math.PI) / 180) * radius;
                                const y = Math.sin((angle * Math.PI) / 180) * radius;

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.8 }}
                                        style={{
                                            left: `calc(50% + ${x}px)`,
                                            top: `calc(50% + ${y}px)`,
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                        className="absolute w-72 group"
                                    >
                                        {/* Visual Node Point */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 z-20">
                                            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20" />
                                            <div className="absolute inset-0.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
                                        </div>

                                        {/* Connector Line */}
                                        <div className="absolute top-1/2 left-1/2 w-[1px] h-32 bg-gradient-to-t from-cyan-400/40 via-cyan-400/10 to-transparent -z-10 group-hover:h-48 transition-all duration-700 origin-bottom"
                                            style={{ transform: `translate(-50%, -100%) rotate(${angle + 90}deg)` }} />

                                        {/* Card Content */}
                                        <div className="p-8 rounded-[2rem] bg-black/60 backdrop-blur-2xl border border-white/10 transition-all duration-500 hover:bg-cyan-500/10 hover:border-cyan-400/40 text-center group-hover:-translate-y-2">
                                            <div className="text-cyan-400 text-[10px] font-black tracking-[0.4em] uppercase mb-3 opacity-60">NODE.0{index + 1}</div>
                                            <h3 className="text-white text-lg font-black uppercase mb-3 tracking-tighter leading-tight">{point.title}</h3>
                                            <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-wider">{point.desc}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Central Hub */}
                        <motion.div
                            ref={imageRef}
                            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                            className="relative z-20"
                        >
                            <div className="absolute inset-0 bg-cyan-400/20 blur-[100px] rounded-full scale-150 animate-pulse" />
                            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-black/60 backdrop-blur-3xl rounded-full border border-white/20 flex items-center justify-center overflow-hidden">
                                <img src={caldimLogo} alt="CALDIM" className="w-1/2 h-1/2 object-contain" />
                            </div>
                        </motion.div>

                        {/* Mobile List View */}
                        <div className="lg:hidden mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                            {valuePoints.map((point, index) => (
                                <div key={index} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                                    <h3 className="text-white text-lg font-bold mb-2 uppercase">{point.title}</h3>
                                    <p className="text-gray-500 text-sm">{point.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Feature Detail (Content Section 1) */}
            <section className="section-container flex flex-col lg:flex-row items-center gap-16 py-32">
                <div className="flex-1">
                    <div className="relative w-full max-w-lg aspect-square bg-gradient-to-br from-cyan-400/5 to-transparent rounded-[3rem] p-8 border border-white/5">
                        <img src={designImage} alt="Vector" className="w-full h-full object-contain brightness-50 contrast-125" />
                    </div>
                </div>
                <div className="flex-1 space-y-8">
                    <h2 className="text-5xl font-black leading-tight">The unseen of spending three <br /> years at Pixelgrade</h2>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis.
                    </p>
                    <button className="px-8 py-4 bg-cyan-500 text-black font-bold rounded-lg transition-transform hover:scale-105 active:scale-95">Learn More</button>
                </div>
            </section>

            {/* 5. Stats Section (Nexcent Layout) */}
            <section className="bg-white/[0.02] py-32 border-y border-white/5">
                <div className="section-container flex flex-col lg:flex-row items-center justify-between gap-16">
                    <div className="flex-1">
                        <h2 className="text-5xl font-black leading-tight mb-4">Helping a local <br /> <span className="text-cyan-400 italic">business reinvent itself</span></h2>
                        <p className="text-gray-500">We reached here with our hard work and dedication</p>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-16">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                                    <Users className="text-cyan-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black">{stat.value}</h3>
                                    <p className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Content Section 2 */}
            <section className="section-container flex flex-col lg:flex-row-reverse items-center gap-16 py-32">
                <div className="flex-1">
                    <div className="relative w-full max-w-lg aspect-square grayscale opacity-50">
                        <img src={designImage} alt="Vector" className="w-full h-full object-contain" />
                    </div>
                </div>
                <div className="flex-1 space-y-8 text-left">
                    <h2 className="text-5xl font-black leading-tight">How to design your site <br /> footer like we did</h2>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor.
                    </p>
                    <button className="px-8 py-4 bg-cyan-500 text-black font-bold rounded-lg transition-transform hover:scale-105">Learn More</button>
                </div>
            </section>

            {/* 7. Client Quote Section */}
            <section className="py-24 bg-white/[0.03]">
                <div className="section-container flex flex-col lg:flex-row items-center gap-12">
                    <div className="w-full lg:w-1/3 flex justify-center">
                        <div className="w-48 h-48 bg-white/5 rounded-3xl flex items-center justify-center p-4">
                            <Shield size={80} className="text-white/20" />
                        </div>
                    </div>
                    <div className="flex-1 space-y-6">
                        <p className="text-xl text-gray-400 italic leading-relaxed">
                            "Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur."
                        </p>
                        <div>
                            <h4 className="text-cyan-400 font-black text-xl">Tim Smith</h4>
                            <p className="text-gray-500 uppercase tracking-widest text-xs">British Dragon Boat Association</p>
                        </div>
                        <div className="flex flex-wrap gap-8 items-center pt-4 opacity-30 grayscale">
                            <Code size={30} />
                            <Globe size={30} />
                            <Shield size={30} />
                            <Users size={30} />
                            <span className="text-cyan-400 font-bold ml-4">Meet all customers &rarr;</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Blog/Milestones Section */}
            <section className="section-container py-32 text-center">
                <h2 className="text-5xl font-black mb-6 uppercase">Caring is the new marketing</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-20 leading-relaxed">
                    The Nextcent blog is the best place to read about the latest membership insights, trends and more.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {milestones.slice(0, 3).map((item, index) => (
                        <div key={index} className="relative group">
                            <div className="w-full h-64 bg-white/5 rounded-[2rem] overflow-hidden">
                                <img src={backgroundImage} className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity" />
                            </div>
                            <div className="absolute -bottom-10 left-8 right-8 bg-black/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/5 group-hover:border-cyan-400/30 transition-all">
                                <h4 className="text-lg font-black mb-4 uppercase tracking-tighter">{item.title}</h4>
                                <p className="text-cyan-400 font-bold flex items-center justify-center gap-2">Read More <Code size={16} /></p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
export default AboutPage;
