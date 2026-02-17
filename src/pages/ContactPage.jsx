import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Mail, Phone, Send, Terminal, User, AtSign, Cpu, ShieldCheck } from 'lucide-react'

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        businessEmail: '',
        contactNumber: '',
        message: '',
    })

    const cardRef = useRef(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-200, 200], [5, -5]), { stiffness: 100, damping: 30 })
    const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-5, 5]), { stiffness: 100, damping: 30 })

    const handleMouseMove = (e) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        alert('Transmission Received. CALDIM Engineering team will respond shortly.')
        setFormData({ firstName: '', lastName: '', businessEmail: '', contactNumber: '', message: '' })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const contactInfo = [
        {
            icon: Mail,
            title: 'PROTOCOL.SMTP',
            value: 'support@caldimengg.in',
            link: 'mailto:support@caldimengg.in',
        },
        {
            icon: Phone,
            title: 'PROTOCOL.VOIP',
            value: '+91 9876543210',
            link: 'tel:+91 9876543210',
        },
        {
            icon: Terminal,
            title: 'NODE.LOCATION',
            value: 'Hosur, Tamil Nadu',
            link: 'https://www.google.com/maps/search/?api=1&query=12.754579,77.834673',
        },
    ]

    return (
        <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-[#010826] min-h-screen relative overflow-hidden">
            <div className="max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 sm:mb-24 text-center"
                >
                    <div className="inline-flex items-center gap-4 mb-6">
                        <div className="w-8 h-[1px] bg-cyan-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-cyan-400">Secure Transmission</span>
                        <div className="w-8 h-[1px] bg-cyan-400" />
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-none">
                        CONTACT<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>INTERFACE</span>
                    </h1>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 sm:gap-24 items-start">
                    {/* Interactive Contact Form Card */}
                    <motion.div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                            rotateX: window.innerWidth > 768 ? rotateX : 0,
                            rotateY: window.innerWidth > 768 ? rotateY : 0,
                            transformStyle: 'preserve-3d',
                            backfaceVisibility: 'hidden',
                        }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/[0.04] backdrop-blur-3xl p-6 sm:p-12 rounded-[2rem] sm:rounded-[3.5rem] border border-white/10 relative group shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 relative z-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex items-center gap-2 ml-4">
                                        <User size={12} className="text-cyan-400" />
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">First Name</label>
                                    </div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600 text-sm font-medium"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex items-center gap-2 ml-4">
                                        <User size={12} className="text-cyan-400" />
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Last Name</label>
                                    </div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600 text-sm font-medium"
                                        placeholder="Cooper"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex items-center gap-2 ml-4">
                                        <AtSign size={12} className="text-cyan-400" />
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Business Email</label>
                                    </div>
                                    <input
                                        type="email"
                                        name="businessEmail"
                                        value={formData.businessEmail}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600 text-sm font-medium"
                                        placeholder="john@company.com"
                                    />
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex items-center gap-2 ml-4">
                                        <Phone size={12} className="text-cyan-400" />
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Contact Number</label>
                                    </div>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600 text-sm font-medium"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 sm:space-y-3">
                                <div className="flex items-center gap-2 ml-4">
                                    <Cpu size={13} className="text-cyan-400" />
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Project Payload</label>
                                </div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-6 sm:px-8 py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2.5rem] bg-white/5 border border-white/10 text-white focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600 text-sm font-medium resize-none"
                                    placeholder="Tell us about your technical requirements..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-5 sm:py-7 bg-white text-black font-black uppercase text-[9px] sm:text-[10px] tracking-[0.5em] rounded-xl sm:rounded-[2rem] flex items-center justify-center gap-4 transition-all relative overflow-hidden group/btn"
                            >
                                <motion.div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                                <span className="relative z-10 group-hover/btn:text-white transition-colors duration-500">TRANSMIT PACKET</span>
                                <Send size={14} className="relative z-10 group-hover/btn:text-white transition-colors duration-500" />
                            </motion.button>
                        </form>

                        <div className="absolute -bottom-10 -right-10 p-12 opacity-5 pointer-events-none hidden sm:block">
                            <ShieldCheck size={300} strokeWidth={1} className="text-cyan-400" />
                        </div>
                    </motion.div>

                    {/* Contact details */}
                    <div className="space-y-12 sm:space-y-16">
                        <div className="space-y-6 sm:space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                                    <Terminal size={16} className="text-cyan-400" />
                                </div>
                                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.5em]">Global Nodes</span>
                            </div>
                            <h2 className="text-3xl sm:text-5xl text-white font-black leading-tight tracking-tighter uppercase italic">
                                ESTABLISH<br />
                                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>CONNECTION</span>
                            </h2>
                            <p className="text-base sm:text-lg text-blue-100/30 font-light leading-relaxed max-w-sm border-l border-cyan-400/20 pl-6 sm:pl-8">
                                Our engineering response team is available for deep-tech consultations and project deployments.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:gap-6">
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon
                                return (
                                    <motion.a
                                        key={index}
                                        href={info.link}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group flex items-center gap-6 sm:gap-8 p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-white/[0.01] border border-white/[0.03] hover:border-cyan-400/20 hover:bg-white/[0.03] transition-all"
                                    >
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/[0.03] rounded-xl sm:rounded-2.5xl flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-all shrink-0">
                                            <Icon size={20} sm:size={24} strokeWidth={1} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <div className="text-[8px] sm:text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">{info.title}</div>
                                            <div className="text-base sm:text-xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight truncate">{info.value}</div>
                                        </div>
                                    </motion.a>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-[10%] -left-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/5 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] -right-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/5 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
        </div>
    )
}

export default ContactPage
