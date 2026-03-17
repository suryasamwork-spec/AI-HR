import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, User, AtSign, Building2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../emailConfig'

const RegisterPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        businessEmail: '',
        organization: '',
    })
    const [otpValue, setOtpValue] = useState('')
    const [showOtp, setShowOtp] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'verifying' | 'loading' | 'success'

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSendOtp = async () => {
        if (!formData.businessEmail || !formData.firstName) return
        setStatus('sending')
        try {
            const response = await fetch(`${API_URL}/api/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.businessEmail,
                    firstName: formData.firstName
                })
            })
            const data = await response.json()
            if (data.success) {
                setShowOtp(true)
                setStatus('idle')
            } else {
                alert(data.message || 'Failed to send verification code.')
                setStatus('idle')
            }
        } catch (err) {
            console.error('OTP error:', err)
            setStatus('idle')
        }
    }

    const handleVerifyOtp = async () => {
        if (otpValue.length < 4) return
        setStatus('verifying')
        try {
            const response = await fetch(`${API_URL}/api/verify-otp-only`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.businessEmail,
                    otp: otpValue
                })
            })
            const data = await response.json()
            if (data.success) {
                setIsVerified(true)
                setStatus('verified')
            } else {
                alert(data.message || 'Invalid code')
                setStatus('idle')
            }
        } catch (err) {
            console.error('Verify error:', err)
            setStatus('idle')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isVerified) return
        setStatus('loading')
        try {
            const response = await fetch(`${API_URL}/api/verify-otp-and-lead`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    email: formData.businessEmail,
                    otp: otpValue,
                    projectTitle: 'General Registration'
                })
            })
            const data = await response.json()
            if (data.success) {
                setStatus('success')
            } else {
                alert(data.message || 'Submission failed')
                setStatus('verified')
            }
        } catch (err) {
            console.error('Submit error:', err)
            setStatus('verified')
        }
    }

    const inputClass = "w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 text-black focus:border-blue-600 focus:bg-white focus:outline-none transition-all placeholder:text-gray-300 text-sm font-medium shadow-sm"

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row">
            {/* Left Side: Verification Info */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:w-[45%] bg-[#0A1128] text-white p-12 lg:p-24 flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
                <div className="relative z-10 space-y-12 max-w-md">
                    <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mx-auto ring-8 ring-white/5 animate-pulse">
                        <Clock size={40} className="text-white/60" />
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                            VERIFICATION<br />REQUIRED
                        </h1>
                        <p className="text-white/40 text-lg font-light leading-relaxed">
                            To protect industrial confidentiality, please verify your professional identity to continue the walkthrough.
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-3 py-4 opacity-30 border-t border-white/10">
                        <ShieldCheck size={16} />
                        <span className="text-[10px] uppercase font-black tracking-widest">Encrypted Enterprise Verification</span>
                    </div>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
            </motion.div>

            {/* Right Side: Registration Form */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:w-[55%] p-12 lg:p-24 flex items-center justify-center bg-white"
            >
                <div className="w-full max-w-xl space-y-12">
                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-black leading-none italic">
                            PROFESSIONAL<br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '1px #000' }}>ACCESS</span>
                        </h2>
                        <div className="w-12 h-1 bg-blue-600 mb-6" />
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                            CALDIM Industrial Intelligence Platform
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Name Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/40 ml-2">First Name</label>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        placeholder="John"
                                        className={`${inputClass} !pl-16 shadow-none hover:border-gray-200`}
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/40 ml-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    placeholder="Doe"
                                    className={`${inputClass} hover:border-gray-200`}
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Business Email */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/40 ml-2">Business Email</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors">
                                    <AtSign size={18} />
                                </div>
                                <input
                                    type="email"
                                    name="businessEmail"
                                    required
                                    placeholder="work@company.com"
                                    className={`${inputClass} !pl-16 pr-32 hover:border-gray-200`}
                                    value={formData.businessEmail}
                                    onChange={handleChange}
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={status === 'sending' || showOtp}
                                        className="bg-blue-600 sm:bg-blue-50 text-white sm:text-blue-600 text-[9px] font-black uppercase tracking-tight px-3 py-2 rounded-xl border border-blue-600 sm:border-blue-100/50 hover:bg-black hover:text-white transition-all flex items-center gap-1"
                                    >
                                        {status === 'sending' ? 'SENDING...' : showOtp ? 'SENT' : 'SEND CODE'} <ArrowRight size={10} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* OTP Input - Appears after sending code */}
                        <AnimatePresence>
                            {showOtp && !isVerified && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-3 overflow-hidden"
                                >
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/40 ml-2">OTP Verification</label>
                                    <div className="relative group flex flex-col sm:flex-row gap-4">
                                        <input
                                            type="text"
                                            maxLength={6}
                                            placeholder="6-DIGIT CODE"
                                            className={`${inputClass} text-center tracking-[0.5em] sm:tracking-[1em] font-black text-lg sm:text-xl`}
                                            value={otpValue}
                                            onChange={(e) => setOtpValue(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleVerifyOtp}
                                            disabled={status === 'verifying' || otpValue.length < 4}
                                            className="w-full sm:w-auto px-8 py-4 sm:py-0 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50"
                                        >
                                            {status === 'verifying' ? 'VERIFYING...' : 'VERIFY'}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Organization */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900/40 ml-2">Organization</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors">
                                    <Building2 size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="organization"
                                    required
                                    placeholder="Company Name"
                                    className={`${inputClass} !pl-16 hover:border-gray-200`}
                                    value={formData.organization}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Footer Msg & Button */}
                        <div className="pt-6 relative">
                            <div className="text-[9px] font-black uppercase tracking-[0.4em] text-black/20 text-center mb-8">
                                ENCRYPTED ENTERPRISE VERIFICATION
                            </div>

                            <AnimatePresence>
                                {isVerified && status !== 'success' && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={`w-full py-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.5em] transition-all duration-500 shadow-2xl flex flex-col items-center justify-center gap-2 bg-[#0A1128] hover:bg-[#1a2542] text-white`}
                                    >
                                        {status === 'loading' ? (
                                            <div className="flex items-center gap-3">
                                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                INITIALIZING ACCESS
                                            </div>
                                        ) : (
                                            'INITIALIZE ACCESS'
                                        )}
                                    </motion.button>
                                )}

                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-8 bg-green-50 border border-green-100 rounded-[2rem] text-center space-y-4"
                                    >
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                            <CheckCircle2 size={32} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-black uppercase tracking-tight text-green-900">Registration Complete</h3>
                                            <p className="text-sm text-green-700 font-medium leading-relaxed">
                                                Your access credentials have been dispatched to: <br />
                                                <span className="font-bold text-green-900">{formData.businessEmail}</span>
                                            </p>
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-green-900/40 pt-4 border-t border-green-200">
                                            Check your inbox & spam folder
                                        </div>
                                    </motion.div>
                                )}

                                {!isVerified && showOtp && status !== 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="p-6 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center gap-3 border border-green-100"
                                    >
                                        <CheckCircle2 size={18} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Code Sent Successfully</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default RegisterPage
