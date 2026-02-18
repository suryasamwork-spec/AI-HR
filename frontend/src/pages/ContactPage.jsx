import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Send, Terminal, User, AtSign, Cpu, ShieldCheck, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { API_URL } from '../emailConfig'

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        businessEmail: '',
        contactNumber: '',
        projectInfo: '',
    })

    const [submitStatus, setSubmitStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('')

    const cardRef = useRef(null)
    const formRef = useRef(null)
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
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.businessEmail,
                    contactNumber: formData.contactNumber,
                    projectInfo: formData.projectInfo,
                }),
            })
            const data = await res.json()
            if (res.ok && data.success) {
                setSubmitStatus('success')
                setFormData({ firstName: '', lastName: '', businessEmail: '', contactNumber: '', projectInfo: '' })
                setTimeout(() => setSubmitStatus('idle'), 5000)
            } else {
                throw new Error(data.message || 'Server error')
            }
        } catch (error) {
            console.error('Contact form error:', error)
            setSubmitStatus('error')
            setErrorMessage(error.message || 'Failed to send message. Please try again or email us directly at support@caldimengg.in')
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
            title: 'PROTOCOL.SMTP',
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

    const inputClass = "w-full px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gray-50 border border-blue-600/10 text-black focus:border-blue-600 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 text-sm font-medium"

    return (
        <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-white min-h-screen relative overflow-hidden">
            <div className="max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 sm:mb-24 text-center"
                >
                    <div className="inline-flex items-center gap-4 mb-6">
                        <div className="w-8 h-[1px] bg-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-blue-600">Secure Transmission</span>
                        <div className="w-8 h-[1px] bg-blue-600" />
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-black uppercase italic leading-none">
                        CONTACT<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.4)' }}>INTERFACE</span>
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
                            rotateX: typeof window !== 'undefined' && window.innerWidth > 768 ? rotateX : 0,
                            rotateY: typeof window !== 'undefined' && window.innerWidth > 768 ? rotateY : 0,
                            transformStyle: 'preserve-3d',
                            backfaceVisibility: 'hidden',
                        }}
                        transition={{ duration: 0.8 }}
                        className="bg-white p-6 sm:p-12 rounded-[2rem] sm:rounded-[3.5rem] border border-blue-600/10 relative group shadow-2xl overflow-hidden"
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 relative z-10">
                            {/* Name Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex items-center gap-2 ml-4">
                                        <User size={12} className="text-blue-600" />
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">First Name</label>
                                    </div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        disabled={submitStatus === 'loading'}
                                        className={inputClass}
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex items-center gap-2 ml-4">
                                        <User size={12} className="text-blue-600" />
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Last Name</label>
                                    </div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        disabled={submitStatus === 'loading'}
                                        className={inputClass}
                                        placeholder="Cooper"
                                    />
                                </div>
                            </div>

                            {/* Email & Phone Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex items-center gap-2 ml-4">
                                        <AtSign size={12} className="text-blue-600" />
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Email Address</label>
                                    </div>
                                    <input
                                        type="email"
                                        name="businessEmail"
                                        value={formData.businessEmail}
                                        onChange={handleChange}
                                        required
                                        disabled={submitStatus === 'loading'}
                                        className={inputClass}
                                        placeholder="john@company.com"
                                    />
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex items-center gap-2 ml-4">
                                        <Phone size={12} className="text-blue-600" />
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Contact Number</label>
                                    </div>
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
                                </div>
                            </div>

                            {/* Project Information */}
                            <div className="space-y-2 sm:space-y-3">
                                <div className="flex items-center gap-2 ml-4">
                                    <Cpu size={13} className="text-blue-600" />
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Project Information</label>
                                </div>
                                <textarea
                                    name="projectInfo"
                                    value={formData.projectInfo}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    disabled={submitStatus === 'loading'}
                                    className="w-full px-6 sm:px-8 py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] bg-gray-50 border border-blue-600/10 text-black focus:border-blue-600 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 text-sm font-medium resize-none"
                                    placeholder="Describe your project requirements, technical specifications, timeline, and any other relevant details..."
                                />
                            </div>

                            {/* Status Messages */}
                            <AnimatePresence mode="wait">
                                {submitStatus === 'error' && (
                                    <motion.div
                                        key="error"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700"
                                    >
                                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                        <p className="text-sm font-medium">{errorMessage}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={submitStatus === 'loading' || submitStatus === 'success'}
                                whileHover={submitStatus === 'idle' ? { scale: 1.02, y: -5 } : {}}
                                whileTap={submitStatus === 'idle' ? { scale: 0.98 } : {}}
                                className={`w-full py-5 sm:py-7 font-black uppercase text-[9px] sm:text-[10px] tracking-[0.5em] rounded-xl sm:rounded-[2rem] flex items-center justify-center gap-4 transition-all relative overflow-hidden group/btn ${submitStatus === 'success'
                                    ? 'bg-green-500 text-white cursor-default'
                                    : submitStatus === 'loading'
                                        ? 'bg-blue-400 text-white cursor-not-allowed'
                                        : 'bg-blue-600 text-white'
                                    }`}
                            >
                                {submitStatus === 'idle' && (
                                    <>
                                        <motion.div className="absolute inset-0 bg-blue-700 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                                        <span className="relative z-10">TRANSMIT PACKET</span>
                                        <Send size={14} className="relative z-10" />
                                    </>
                                )}
                                {submitStatus === 'loading' && (
                                    <>
                                        <Loader size={16} className="animate-spin" />
                                        <span>TRANSMITTING...</span>
                                    </>
                                )}
                                {submitStatus === 'success' && (
                                    <>
                                        <CheckCircle size={16} />
                                        <span>MESSAGE SENT SUCCESSFULLY!</span>
                                    </>
                                )}
                                {submitStatus === 'error' && (
                                    <>
                                        <span>RETRY TRANSMISSION</span>
                                        <Send size={14} />
                                    </>
                                )}
                            </motion.button>

                            {/* Success message below button */}
                            <AnimatePresence>
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center text-sm text-green-600 font-medium"
                                    >
                                        ✓ Your message has been sent to support@caldimengg.in. We'll respond shortly!
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>

                        <div className="absolute -bottom-10 -right-10 p-12 opacity-5 pointer-events-none hidden sm:block">
                            <ShieldCheck size={300} strokeWidth={1} className="text-blue-600" />
                        </div>
                    </motion.div>

                    {/* Contact details */}
                    <div className="space-y-12 sm:space-y-16">
                        <div className="space-y-6 sm:space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                                    <Terminal size={16} className="text-blue-600" />
                                </div>
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em]">Global Nodes</span>
                            </div>
                            <h2 className="text-3xl sm:text-5xl text-black font-black leading-tight tracking-tighter uppercase italic">
                                ESTABLISH<br />
                                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.4)' }}>CONNECTION</span>
                            </h2>
                            <p className="text-base sm:text-lg text-gray-500 font-light leading-relaxed max-w-sm border-l border-blue-600/20 pl-6 sm:pl-8">
                                Our engineering response team is available for deep-tech consultations and project deployments. Fill in your details and we'll get back to you promptly.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:gap-6">
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon
                                return (
                                    <motion.a
                                        key={index}
                                        href={info.link}
                                        target={info.link.startsWith('http') ? '_blank' : undefined}
                                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group flex items-center gap-6 sm:gap-8 p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-gray-50 border border-blue-600/10 hover:border-blue-600 hover:bg-white transition-all shadow-sm"
                                    >
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white border border-blue-600/10 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                                            <Icon size={20} strokeWidth={1} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <div className="text-[8px] sm:text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">{info.title}</div>
                                            <div className="text-base sm:text-xl font-black text-black group-hover:text-blue-600 transition-colors uppercase tracking-tight truncate">{info.value}</div>
                                        </div>
                                    </motion.a>
                                )
                            })}
                        </div>

                        {/* Info note */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="p-6 rounded-2xl bg-blue-50 border border-blue-100"
                        >
                            <p className="text-xs text-blue-700 font-medium leading-relaxed">
                                <span className="font-black uppercase tracking-wider">Response Time:</span> Our team typically responds within 24–48 business hours. For urgent inquiries, please call us directly.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-[10%] -left-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-600/5 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] -right-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/5 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
        </div>
    )
}

export default ContactPage
