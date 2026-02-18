import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Users, Code, Globe, Shield } from 'lucide-react'
import caldimLogo from '../assets/laptop.png'
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
        <div className="pt-24 min-h-screen bg-white text-black">
            {/* 1. Hero Section (Nexcent Style) */}
            <section className="section-container relative flex flex-col lg:flex-row items-center gap-16 py-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 text-left z-10"
                >
                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1]">
                        About Us  <br />
                        {/* <span className="text-blue-600 italic">from 8 years</span> */}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-xl mb-12 leading-relaxed">
                        We deliver customized software solutions that help organizations achieve greater efficiency,
                        visibility, and operational control. By combining strong engineering expertise with modern
                        technologies such as AI and automation, we transform complex business processes into
                        intelligent digital systems. Our solutions support organizations in evolving from traditional
                        operations to scalable, future-ready environments that drive measurable business value.
                    </p>
                    {/* <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-widest rounded-lg shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] transition-all"
                    >
                        Register Now
                    </motion.button> */}
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
            {/* <section className="py-20 border-y border-blue-600/20 bg-gray-50">
                <div className="section-container">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-500">Who We Are 
                        </h2>
                        <p className="text-gray-600 mt-2">A technology-driven startup specializing in customized software and AI-powered 
                            solutions 
                        </p>
                        <p className="text-gray-600 mt-2">Focused on delivering scalable, secure, and business-oriented digital platforms 
                        </p>
                        <p className="text-gray-600 mt-2">Committed to innovation, quality, and long-term client partnerships 

                        </p>
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
            </section> */}

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
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
                </div>

                <div className="section-container relative z-100 text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase text-black">Our Value Proposition</h2>
                    {/* <p className="text-gray-400 mb-20">Who is Nextcent suitable for?</p> */}

                    <div className="relative h-[500px] flex items-center justify-start lg:pl-32">
                        {/* 1. THE CURVED ARCHIVE (Flowing on the right) */}
                        <div className="hidden lg:block absolute inset-0">
                            {valuePoints.map((point, index) => {
                                // Narrower angular range to keep everything vertically centered
                                const startAngle = -20;
                                const endAngle = 80;
                                const angle = startAngle + (index * (endAngle - startAngle) / (valuePoints.length - 1));
                                const radius = 500; // Increased radius to cover the right side better

                                // Origin center is at 12% left
                                const x = Math.cos((angle * Math.PI) / 180) * radius;
                                const y = Math.sin((angle * Math.PI) / 180) * radius;

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 1 }}
                                        style={{
                                            left: `calc(50% + ${x}px)`,
                                            top: `calc(30% + ${y}px)`,
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                        className="absolute w-72 group"
                                    >
                                        {/* Visual Node Point */}
                                        <div className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 w-4 h-4 z-20">
                                            <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20" />
                                            <div className="absolute inset-0.5 bg-blue-600 rounded-full shadow-[0_0_20px_#2563eb]" />
                                        </div>

                                        {/* Connector Line pointing towards center logo */}
                                        {/* <div className="absolute top-1/2 left-0 w-32 h-[2px] bg-gradient-to-r from-blue-600/60 via-blue-600/10 to-transparent -z-10 group-hover:w-48 transition-all duration-700 origin-left"
                                            style={{ transform: `translate(-100%, -50%) rotate(${180 - angle}deg)` }} /> */}

                                        {/* Card Content (Ultra-Compact for single view) */}
                                        <div className="">
                                            <div className="text-blue-600 text-[9px] font-black uppercase mb-2 opacity-60"></div>
                                            <h3 className="text-black text-base font-black uppercase mb-2 tracking-tighter leading-tight">{point.title}</h3>
                                            <p className="text-black-500 text-[10px] leading-relaxed uppercase tracking-widest">{point.desc}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Central Hub (Fixed on Left) */}
                        <motion.div
                            ref={imageRef}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d',
                                left: '12%'
                            }}
                            className="absolute top-[40%] -translate-y-1/2 -translate-x-1/2 z-20 hidden lg:block"
                        >
                            <div className="absolute inset-0 bg-blue-600/20 blur-[180px] rounded-full scale-150 animate-pulse" />
                            <div className="relative w-[500px] h-[500px] bg-white rounded-full border-2 border-blue-600/30 shadow-[0_0_80px_rgba(37,99,235,0.15)] flex items-center justify-center overflow-hidden">
                                <img src={caldimLogo} alt="CALDIM" className="w-full h-full object-contain scale-100 transform-gpu transition-transform duration-700" />
                            </div>
                        </motion.div>

                        {/* Mobile List View stays the same for clarity */}
                        <div className="lg:hidden mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                            {valuePoints.map((point, index) => (
                                <div key={index} className="p-8 rounded-3xl bg-white border border-blue-600/30">
                                    <h3 className="text-black text-lg font-bold mb-2 uppercase">{point.title}</h3>
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
                    <div className="relative w-full max-w-lg aspect-square bg-blue-50 rounded-[3rem] p-8 border border-blue-600/20">
                        <img src={designImage} alt="Vector" className="w-full h-full object-contain" />
                    </div>
                </div>
                <div className="flex-1 space-y-8">
                    <h2 className="text-5xl font-black leading-tight">The unseen of spending three <br /> years at Pixelgrade</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis.
                    </p>
                    <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg transition-transform hover:scale-105 active:scale-95">Learn More</button>
                </div>
            </section>

            {/* 5. Stats Section (Nexcent Layout) */}
            <section className="bg-gray-50 py-32 border-y border-blue-600/20">
                <div className="section-container flex flex-col lg:flex-row items-center justify-between gap-16">
                    <div className="flex-1">
                        <h2 className="text-5xl font-black leading-tight mb-4">Helping a local <br /> <span className="text-blue-600 italic">business reinvent itself</span></h2>
                        <p className="text-gray-600">We reached here with our hard work and dedication</p>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-16">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center">
                                    <Users className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-black">{stat.value}</h3>
                                    <p className="text-gray-600 text-sm uppercase tracking-wider">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Content Section 2 */}
            <section className="section-container flex flex-col lg:flex-row-reverse items-center gap-16 py-32 text-black">
                <div className="flex-1">
                    <div className="relative w-full max-w-lg aspect-square grayscale opacity-50">
                        <img src={designImage} alt="Vector" className="w-full h-full object-contain" />
                    </div>
                </div>
                <div className="flex-1 space-y-8 text-left">
                    <h2 className="text-5xl font-black leading-tight">How to design your site <br /> footer like we did</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor.
                    </p>
                    <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg transition-transform hover:scale-105">Learn More</button>
                </div>
            </section>

            {/* 7. Client Quote Section */}
            <section className="py-24 bg-gray-50 border-y border-blue-600/10">
                <div className="section-container flex flex-col lg:flex-row items-center gap-12">
                    <div className="w-full lg:w-1/3 flex justify-center">
                        <div className="w-48 h-48 bg-white border border-blue-600/20 rounded-3xl flex items-center justify-center p-4 shadow-sm">
                            <Shield size={80} className="text-blue-600/20" />
                        </div>
                    </div>
                    <div className="flex-1 space-y-6">
                        <p className="text-xl text-gray-600 italic leading-relaxed">
                            "Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur."
                        </p>
                        <div>
                            <h4 className="text-blue-600 font-black text-xl">Tim Smith</h4>
                            <p className="text-gray-500 uppercase tracking-widest text-xs">British Dragon Boat Association</p>
                        </div>
                        <div className="flex flex-wrap gap-8 items-center pt-4 opacity-30 grayscale">
                            <Code size={30} />
                            <Globe size={30} />
                            <Shield size={30} />
                            <Users size={30} />
                            <span className="text-blue-600 font-bold ml-4">Meet all customers &rarr;</span>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}
export default AboutPage;
