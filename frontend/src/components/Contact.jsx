import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Mail, Phone, Map, Send, ChevronRight, MessageSquare, Terminal, User, AtSign, Cpu } from 'lucide-react'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
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
        setFormData({ name: '', email: '', message: '' })
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
        <section id="contact" className="py-32 bg-transparent relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 text-center"
                >
                    <div className="inline-flex items-center gap-4 mb-6">
                        <div className="w-8 h-[1px] bg-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-blue-600">Initialize Link</span>
                        <div className="w-8 h-[1px] bg-blue-600" />
                    </div>
                    <h2 className="text-5xl md:text-9xl font-black tracking-tighter text-black uppercase italic">
                        CONNECT<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.4)' }}>CORE</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-24 max-w-7xl mx-auto items-center">
                    {/* Interactive Contact Form Card */}
                    <motion.div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: 'preserve-3d',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden'
                        }}
                        transition={{ duration: 0.8 }}
                        className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-blue-600/20 relative group shadow-2xl isolation-auto"
                    >
                        {/* ... (rest of form content) ... */}
                        <motion.div
                            className="absolute -inset-px rounded-[3.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                                background: `radial-gradient(400px circle at ${mouseX.get() + (cardRef.current?.offsetWidth / 2 || 0)}px ${mouseY.get() + (cardRef.current?.offsetHeight / 2 || 0)}px, rgba(34, 211, 238, 0.15), transparent 80%)`,
                            }}
                        />

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10 p-4 md:p-0">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Name Input Wrapper */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 ml-4">
                                        <User size={12} className="text-blue-600" />
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Identifier</label>
                                    </div>
                                    <div className="relative group/input">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-blue-600/10 text-black focus:border-blue-600 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 text-sm font-medium transform-gpu"
                                            placeholder="Ex: John Cooper"
                                        />
                                        <div className="absolute inset-0 rounded-2xl border border-blue-600/0 group-hover/input:border-blue-600/20 pointer-events-none transition-colors" />
                                    </div>
                                </div>

                                {/* Email Input Wrapper */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 ml-4">
                                        <AtSign size={12} className="text-blue-600" />
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Network Address</label>
                                    </div>
                                    <div className="relative group/input">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-blue-600/10 text-black focus:border-blue-600 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 text-sm font-medium transform-gpu"
                                            placeholder="name@matrix.com"
                                        />
                                        <div className="absolute inset-0 rounded-2xl border border-blue-600/0 group-hover/input:border-blue-600/20 pointer-events-none transition-colors" />
                                    </div>
                                </div>
                            </div>

                            {/* Message Area Wrapper */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 ml-4">
                                    <Cpu size={13} className="text-blue-600" />
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Data Packet Payload</label>
                                </div>
                                <div className="relative group/input">
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-8 py-6 rounded-[2.5rem] bg-gray-50 border border-blue-600/10 text-black focus:border-blue-600 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 text-sm font-medium resize-none transform-gpu"
                                        placeholder="Brief your project requirements or technical specifications here..."
                                    />
                                    <div className="absolute inset-0 rounded-[2.5rem] border border-blue-600/0 group-hover/input:border-blue-600/20 pointer-events-none transition-colors" />
                                </div>
                            </div>

                            {/* Submit Button Refinement */}
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02, y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-7 bg-blue-600 text-white font-black uppercase text-[10px] tracking-[0.5em] rounded-[2rem] flex items-center justify-center gap-4 transition-all relative overflow-hidden group/btn"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-blue-700 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"
                                />
                                <span className="relative z-10">TRANSMIT PACKET</span>
                                <Send size={14} className="relative z-10" />
                            </motion.button>
                        </form>

                        {/* Background Floating Icon */}
                        <div className="absolute -bottom-10 -right-10 p-12 opacity-5 pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                            <MessageSquare size={300} strokeWidth={1} className="text-blue-600" />
                        </div>
                    </motion.div>

                    {/* Technical Contact Info Refinement */}
                    <div className="flex flex-col space-y-12">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                                    <Terminal size={16} className="text-blue-600" />
                                </div>
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em]">Transmission Hub</span>
                            </div>
                            <p className="text-3xl md:text-5xl text-black font-black leading-tight tracking-tighter uppercase italic">
                                Ready to <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.4)' }}>deploy?</span>
                            </p>
                            <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md border-l border-blue-600/20 pl-8">
                                Connect with our technical core to initialize your next project architecture. Standing by for secure transmissions.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon
                                return (
                                    <motion.a
                                        key={index}
                                        href={info.link}
                                        target={info.link.startsWith('http') ? '_blank' : undefined}
                                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.8 }}
                                        className="group flex items-center gap-8 p-10 rounded-[3rem] bg-gray-50 border border-blue-600/10 hover:border-blue-600 hover:bg-white transition-all relative overflow-hidden"
                                    >
                                        <div className="w-16 h-16 bg-white rounded-2.5xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all relative z-10 shadow-sm border border-blue-600/10">
                                            <Icon size={24} strokeWidth={1} />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">{info.title}</div>
                                            <div className="text-xl font-black text-black group-hover:text-blue-600 transition-colors uppercase tracking-tight">{info.value}</div>
                                        </div>
                                        {/* Subtle background glow on hover */}
                                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-40 h-40 bg-blue-600/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.a>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decorative Blur */}
            <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
        </section>
    )
}

export default Contact
