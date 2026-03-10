import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { API_URL } from '../emailConfig'

const ContactSection = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    })

    const [submitStatus, setSubmitStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
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
                    projectInfo: formData.message, // Map message to projectInfo as per existing API
                    contactNumber: 'N/A' // Added placeholder for API compatibility
                }),
            })
            const data = await res.json()
            if (res.ok && data.success) {
                setSubmitStatus('success')
                setFormData({ firstName: '', lastName: '', email: '', message: '' })
                setTimeout(() => setSubmitStatus('idle'), 5000)
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

    return (
        <section id="contact-section" className="py-24 bg-white relative">
            <div className="container mx-auto px-6">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-[#002B54] uppercase tracking-tighter mb-6"
                    >
                        GET IN TOUCH
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto"
                    >
                        Nam molestie metus et justo hendrerit, non molestie velit imperdiet. Vivamus ac sapien vitae dui mattis tristique cras finibus convallis ex vel lacinia justo.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                    {/* Left Column: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div>
                            <h3 className="text-2xl font-black text-[#002B54] mb-4">Contact Us:</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">
                                Pellentesque pharetra in mi eget ornare vestibulum gravida nisl eu libero tincidunt luctus interdum metus
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Address */}
                            <div className="flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-[#002B54] group-hover:text-white transition-colors duration-300">
                                    <MapPin size={18} />
                                </div>
                                <div className="pt-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#002B54] opacity-50 mb-1">Address:</p>
                                    <p className="text-base font-bold text-[#002B54]">London Eye, London</p>
                                </div>
                            </div>

                            {/* Email */}
                            <a href="mailto:support@caldimengg.in" className="flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-[#002B54] group-hover:text-white transition-colors duration-300">
                                    <Mail size={18} />
                                </div>
                                <div className="pt-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#002B54] opacity-50 mb-1">Email:</p>
                                    <p className="text-base font-bold text-[#002B54]">support@caldimengg.in</p>
                                </div>
                            </a>

                            {/* Phone */}
                            <a href="tel:+914344610637" className="flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-[#002B54] group-hover:text-white transition-colors duration-300">
                                    <Phone size={18} />
                                </div>
                                <div className="pt-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#002B54] opacity-50 mb-1">Phone:</p>
                                    <p className="text-base font-bold text-[#002B54]">+91 4344-610637</p>
                                </div>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Input Group */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700">Name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-2 pt-6">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Message Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700">Comment or Message *</label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                />
                            </div>

                            {/* Submit and Status */}
                            <div className="space-y-4 pt-2">
                                <AnimatePresence mode="wait">
                                    {submitStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2 text-red-600 text-sm font-bold"
                                        >
                                            <AlertCircle size={16} />
                                            {errorMessage}
                                        </motion.div>
                                    )}
                                    {submitStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2 text-green-600 text-sm font-bold"
                                        >
                                            <CheckCircle size={16} />
                                            Message sent successfully!
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    type="submit"
                                    disabled={submitStatus === 'loading'}
                                    className="px-8 py-3 bg-[#001a33] text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#002B54] transition-all disabled:opacity-50 flex items-center gap-3"
                                >
                                    {submitStatus === 'loading' ? (
                                        <>
                                            <Loader size={14} className="animate-spin" />
                                            Submitting...
                                        </>
                                    ) : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection
