import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Send, Terminal, User, AtSign, Cpu, MessageSquare, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { API_URL } from '../emailConfig'

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        projectInfo: '',
    })

    const [submitStatus, setSubmitStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('')
    const [showPopup, setShowPopup] = useState(false)

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitStatus('loading')
        setErrorMessage('')

        try {
            const res = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    contactNumber: formData.contactNumber,
                    projectInfo: formData.projectInfo,
                }),
            })
            const data = await res.json()
            if (res.ok && data.success) {
                setSubmitStatus('success')
                setFormData({ firstName: '', lastName: '', email: '', contactNumber: '', projectInfo: '' })
                setShowPopup(true)
                setTimeout(() => {
                    setSubmitStatus('idle')
                    setShowPopup(false)
                }, 6000)
            } else {
                throw new Error(data.message || 'Server error')
            }
        } catch (error) {
            console.error('Contact form error:', error)
            setSubmitStatus('error')
            setErrorMessage(error.message || 'Failed to send. Please email us directly at support@caldimengg.in')
            setTimeout(() => setSubmitStatus('idle'), 6000)
        }
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
            title: '',
            value: 'support@caldimengg.in',
            link: 'mailto:support@caldimengg.in',
        },
        {
            icon: Phone,
            title: 'PROTOCOL.VOIP',
            value: '+91 9876543210',
            link: 'tel:+919876543210',
        },
        {
            icon: Terminal,
            title: 'NODE.LOCATION',
            value: 'Hosur, Tamil Nadu',
            link: 'https://www.google.com/maps/search/?api=1&query=12.754579,77.834673',
        },
    ]

    const inputClass = "w-full px-8 py-5 rounded-2xl bg-gray-50 border border-blue-600/10 text-black focus:border-blue-600 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 text-sm font-medium transform-gpu"

    return (
        <>
            {/* ── Success Popup ── */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        key="success-popup"
                        initial={{ opacity: 0, y: -80, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -60, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        className="fixed top-6 left-1/2 z-[9999] w-[90vw] max-w-md"
                        style={{ transform: 'translateX(-50%)' }}
                    >
                        <div className="relative rounded-3xl bg-white border border-blue-600/20 shadow-2xl overflow-hidden">
                            {/* Blue top accent bar */}
                            <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400" />

                            {/* Auto-progress bar */}
                            <motion.div
                                className="h-0.5 bg-blue-600/30"
                                initial={{ width: '100%' }}
                                animate={{ width: '0%' }}
                                transition={{ duration: 6, ease: 'linear' }}
                            />

                            <div className="p-6">
                                {/* Header row */}
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                                            <CheckCircle size={20} className="text-green-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-600">Message Transmitted</p>
                                            <p className="text-sm font-bold text-black mt-0.5">We've received your inquiry!</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowPopup(false)}
                                        className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors shrink-0 mt-0.5"
                                        aria-label="Close notification"
                                    >
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Response time info box */}
                                <div className="rounded-2xl bg-blue-50 border border-blue-100 px-5 py-4">
                                    <p className="text-xs text-blue-700 font-medium leading-relaxed">
                                        <span className="font-black uppercase tracking-wider">Response Time:</span>{' '}
                                        Our team typically responds within 24–48 business hours. For urgent inquiries, please call us directly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                            className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-blue-600/20 relative group shadow-2xl isolation-auto overflow-hidden"
                        >
                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10 p-4 md:p-0">
                                {/* Name Fields Row */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 ml-4">
                                            <User size={12} className="text-blue-600" />
                                            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">First Name</label>
                                        </div>
                                        <div className="relative group/input">
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                                disabled={submitStatus === 'loading'}
                                                className={inputClass}
                                                placeholder="Ex: John"
                                            />
                                            <div className="absolute inset-0 rounded-2xl border border-blue-600/0 group-hover/input:border-blue-600/20 pointer-events-none transition-colors" />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 ml-4">
                                            <User size={12} className="text-blue-600" />
                                            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Last Name</label>
                                        </div>
                                        <div className="relative group/input">
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                                disabled={submitStatus === 'loading'}
                                                className={inputClass}
                                                placeholder="Ex: Cooper"
                                            />
                                            <div className="absolute inset-0 rounded-2xl border border-blue-600/0 group-hover/input:border-blue-600/20 pointer-events-none transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact & Email Row */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 ml-4">
                                            <AtSign size={12} className="text-blue-600" />
                                            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Email Address</label>
                                        </div>
                                        <div className="relative group/input">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                disabled={submitStatus === 'loading'}
                                                className={inputClass}
                                                placeholder="name@company.com"
                                            />
                                            <div className="absolute inset-0 rounded-2xl border border-blue-600/0 group-hover/input:border-blue-600/20 pointer-events-none transition-colors" />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 ml-4">
                                            <Phone size={12} className="text-blue-600" />
                                            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Contact Number</label>
                                        </div>
                                        <div className="relative group/input">
                                            <input
                                                type="tel"
                                                name="contactNumber"
                                                value={formData.contactNumber}
                                                onChange={handleChange}
                                                required
                                                disabled={submitStatus === 'loading'}
                                                className={inputClass}
                                                placeholder="+91 98765 43210"
                                            />
                                            <div className="absolute inset-0 rounded-2xl border border-blue-600/0 group-hover/input:border-blue-600/20 pointer-events-none transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                {/* Project Information */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 ml-4">
                                        <Cpu size={13} className="text-blue-600" />
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Project Information</label>
                                    </div>
                                    <div className="relative group/input">
                                        <textarea
                                            name="projectInfo"
                                            value={formData.projectInfo}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            disabled={submitStatus === 'loading'}
                                            className="w-full px-8 py-6 rounded-[2.5rem] bg-gray-50 border border-blue-600/10 text-black focus:border-blue-600 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 text-sm font-medium resize-none transform-gpu"
                                            placeholder="Describe your project requirements, technical specifications, and timeline..."
                                        />
                                        <div className="absolute inset-0 rounded-[2.5rem] border border-blue-600/0 group-hover/input:border-blue-600/20 pointer-events-none transition-colors" />
                                    </div>
                                </div>

                                {/* Error Message */}
                                <AnimatePresence mode="wait">
                                    {submitStatus === 'error' && (
                                        <motion.div
                                            key="error"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700"
                                        >
                                            <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                            <p className="text-xs font-medium">{errorMessage}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={submitStatus === 'loading' || submitStatus === 'success'}
                                    whileHover={submitStatus === 'idle' ? { scale: 1.02, y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
                                    whileTap={submitStatus === 'idle' ? { scale: 0.98 } : {}}
                                    className={`w-full py-7 font-black uppercase text-[10px] tracking-[0.5em] rounded-[2rem] flex items-center justify-center gap-4 transition-all relative overflow-hidden group/btn ${submitStatus === 'success'
                                        ? 'bg-green-500 text-white cursor-default'
                                        : submitStatus === 'loading'
                                            ? 'bg-blue-400 text-white cursor-not-allowed'
                                            : 'bg-blue-600 text-white'
                                        }`}
                                >
                                    {submitStatus === 'idle' && (
                                        <>
                                            <motion.div className="absolute inset-0 bg-blue-700 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                                            <span className="relative z-10">Send</span>
                                            <Send size={14} className="relative z-10" />
                                        </>
                                    )}
                                    {submitStatus === 'loading' && (
                                        <>
                                            <Loader size={16} className="animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    )}
                                    {submitStatus === 'success' && (
                                        <>
                                            <CheckCircle size={16} />
                                            <span>MESSAGE SENT!</span>
                                        </>
                                    )}
                                    {submitStatus === 'error' && (
                                        <>
                                            <span>RETRY TRANSMISSION</span>
                                            <Send size={14} />
                                        </>
                                    )}
                                </motion.button>

                                {/* Success note */}
                                <AnimatePresence>
                                    {submitStatus === 'success' && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="text-center text-sm text-green-600 font-medium"
                                        >
                                            ✓ Sent to support@caldimengg.in — we'll respond shortly!
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </form>

                            {/* Background Floating Icon */}
                            <div className="absolute -bottom-10 -right-10 p-12 opacity-5 pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                                <MessageSquare size={300} strokeWidth={1} className="text-blue-600" />
                            </div>
                        </motion.div>

                        {/* Technical Contact Info */}
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
                                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all relative z-10 shadow-sm border border-blue-600/10">
                                                <Icon size={24} strokeWidth={1} />
                                            </div>
                                            <div className="relative z-10">
                                                <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">{info.title}</div>
                                                <div className="text-xl font-black text-black group-hover:text-blue-600 transition-colors uppercase tracking-tight">{info.value}</div>
                                            </div>
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
        </>
    )
}

export default Contact
