import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Clock, ShieldCheck, Mail, User, Phone, Send, Building2, KeyRound, ArrowRight, CheckCircle2 } from 'lucide-react'
import { API_URL } from '../emailConfig'

const ProjectDemoModal = ({ project, isOpen, onClose }) => {
    const [currentTime, setCurrentTime] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [isLeadCaptured, setIsLeadCaptured] = useState(false)
    const [step, setStep] = useState('form') // 'form', 'otp', 'success'
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        businessEmail: '',
        organization: ''
    })
    const [otpValue, setOtpValue] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState('')
    const videoRef = useRef(null)

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const time = videoRef.current.currentTime
            setCurrentTime(time)

            // Pause at 20 seconds if lead is not captured
            if (time >= 20 && !isLeadCaptured) {
                videoRef.current.pause()
                setIsPaused(true)
            }
        }
    }

    const handleSendOTPOnly = async () => {
        if (!formData.businessEmail || !formData.firstName) {
            setError('Please enter your first name and business email.')
            return
        }
        setIsSubmitting(true)
        setError('')

        try {
            const response = await fetch(`${API_URL}/api/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.businessEmail,
                    firstName: formData.firstName
                })
            })
            if (!response.ok) {
                const data = await response.json().catch(() => ({ message: `Http ${response.status}` }))
                setError(`Server Error: ${data.message || 'Verification failed'}`)
                return
            }
            const data = await response.json()
            if (data.success) {
                setIsOtpSent(true)
            } else {
                setError(data.message || 'Failed to send verification code.')
            }
        } catch (err) {
            setError(`Network Error: ${err.message}. Check if server is running.`)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleVerifyOnly = async () => {
        if (!otpValue) return
        setIsSubmitting(true)
        setError('')

        try {
            const response = await fetch(`${API_URL}/api/verify-otp-only`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.businessEmail,
                    otp: otpValue
                })
            })
            if (!response.ok) {
                const data = await response.json().catch(() => ({ message: `Http ${response.status}` }))
                setError(`Verification Error: ${data.message || 'Invalid code'}`)
                return
            }
            const data = await response.json()
            if (data.success) {
                setIsVerified(true)
                setError('')
            } else {
                setError(data.message || 'Invalid verification code.')
            }
        } catch (err) {
            setError(`Network Error: ${err.message}. Check if server is running.`)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleFinalSubmit = async (e) => {
        e.preventDefault()
        if (!isVerified) return
        setIsSubmitting(true)
        setError('')

        try {
            const response = await fetch(`${API_URL}/api/verify-otp-and-lead`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    otp: otpValue,
                    email: formData.businessEmail,
                    projectTitle: project.title
                })
            })
            const data = await response.json()
            if (data.success) {
                setIsLeadCaptured(true)
                setStep('success')
                setIsPaused(false)
                if (videoRef.current) {
                    videoRef.current.play()
                }
            } else {
                setError(data.message || 'Failed to finalize verification.')
            }
        } catch (err) {
            setError('Final submission failed. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentTime(0)
            setIsPaused(false)
            if (!isLeadCaptured) {
                setStep('form')
                setIsOtpSent(false)
                setIsVerified(false)
                setOtpValue('')
            }
        }
    }, [isOpen])

    // Auto-dismiss success overlay after 2s and resume video
    useEffect(() => {
        if (step === 'success') {
            const timer = setTimeout(() => {
                setStep('done') // clear the overlay, video is already playing
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [step])

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            >
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="relative w-full max-w-6xl bg-black rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10"
                    >
                        <X size={24} />
                    </button>

                    <div className="grid lg:grid-cols-12 min-h-[600px]">
                        {/* Video Section */}
                        <div className={`${(isPaused && !isLeadCaptured) ? 'lg:col-span-7' : 'lg:col-span-12'} bg-black relative transition-all duration-700 ease-in-out`}>
                            <video
                                ref={videoRef}
                                src={project.demoVideo}
                                className="w-full h-full object-cover"
                                onTimeUpdate={handleTimeUpdate}
                                controls={!isPaused || isLeadCaptured}
                                autoPlay
                            />

                            {/* Overlay when paused at 20s */}
                            {isPaused && !isLeadCaptured && (
                                <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-6"
                                    >
                                        <Clock size={40} className="text-white" />
                                    </motion.div>
                                    <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Verification Required</h3>
                                    <p className="text-white/80 max-w-sm font-medium">
                                        To protect industrial confidentiality, please verify your professional identity to continue the walkthrough.
                                    </p>
                                </div>
                            )}

                            {/* Progress bar info */}
                            {!isPaused && !isLeadCaptured && (
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center gap-4 text-white/60 text-xs font-bold uppercase tracking-widest">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    Free Preview: {Math.floor(currentTime)}s / 20s
                                </div>
                            )}
                        </div>

                        {/* White Theme Lead Capture Panel */}
                        <AnimatePresence>
                            {(isPaused && !isLeadCaptured) && (
                                <motion.div
                                    initial={{ x: 400, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 400, opacity: 0 }}
                                    className="lg:col-span-5 bg-white p-12 flex flex-col justify-center relative overflow-hidden"
                                >
                                    {/* Brand Accents */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 opacity-50" />

                                    <div className="relative z-10">
                                        <div className="mb-10">
                                            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">
                                                Professional<br />
                                                Access
                                            </h2>
                                            <div className="h-1 w-12 bg-blue-600 rounded-full mb-4" />
                                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                                CALDIM Industrial Intelligence Platform
                                            </p>
                                        </div>

                                        <form onSubmit={handleFinalSubmit} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                        <input
                                                            required
                                                            type="text"
                                                            placeholder="John"
                                                            disabled={isVerified}
                                                            value={formData.firstName}
                                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:border-blue-600 focus:bg-white outline-none transition-all disabled:opacity-50"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Doe"
                                                        disabled={isVerified}
                                                        value={formData.lastName}
                                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                        className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:border-blue-600 focus:bg-white outline-none transition-all disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Business Email</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                    <input
                                                        required
                                                        type="email"
                                                        placeholder="work@company.com"
                                                        disabled={isVerified}
                                                        value={formData.businessEmail}
                                                        onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                                                        className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:border-blue-600 focus:bg-white outline-none transition-all disabled:opacity-50"
                                                    />
                                                    {isVerified && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" size={20} />}
                                                </div>

                                                {/* SEND OTP BUTTON BELOW EMAIL */}
                                                {!isVerified && (
                                                    <div className="mt-2 flex justify-end">
                                                        <button
                                                            type="button"
                                                            onClick={isOtpSent ? handleVerifyOnly : handleSendOTPOnly}
                                                            disabled={isSubmitting}
                                                            className="px-6 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm border border-blue-100 active:scale-95 disabled:opacity-50"
                                                        >
                                                            {isSubmitting ? 'Processing...' : isOtpSent ? 'Verify OTP Code' : 'Send Verification Code'}
                                                            <ArrowRight size={12} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* OTP INPUT (Appears only if sent and not verified) */}
                                            {isOtpSent && !isVerified && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    className="space-y-1.5"
                                                >
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Passcode sent to email</label>
                                                    <div className="relative">
                                                        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                        <input
                                                            required
                                                            type="text"
                                                            maxLength="6"
                                                            placeholder="••••••"
                                                            value={otpValue}
                                                            onChange={(e) => setOtpValue(e.target.value)}
                                                            className="w-full pl-12 pr-4 py-4 bg-blue-50/50 border-2 border-blue-100 rounded-2xl text-blue-600 font-black tracking-[0.5em] focus:border-blue-600 outline-none transition-all"
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}

                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Organization</label>
                                                <div className="relative">
                                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Company Name"
                                                        disabled={isVerified}
                                                        value={formData.organization}
                                                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:border-blue-600 focus:bg-white outline-none transition-all disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>

                                            {error && <p className="text-red-500 text-[10px] font-bold text-center mt-2">{error}</p>}

                                            {/* FINAL BUTTON APPEARS ONLY AFTER VERIFICATION */}
                                            {isVerified && (
                                                <motion.button
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    disabled={isSubmitting}
                                                    type="submit"
                                                    className="w-full mt-4 py-5 bg-blue-600 hover:bg-[#002B54] text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                                                >
                                                    {isSubmitting ? 'Finalizing...' : 'Unlock Full Technical Demo'}
                                                    <ShieldCheck size={20} />
                                                </motion.button>
                                            )}
                                        </form>
                                    </div>

                                    {/* Footer Security Badge */}
                                    <div className="absolute bottom-10 left-0 right-0 px-12 text-center pointer-events-none">
                                        <div className="flex items-center justify-center gap-2 opacity-20">
                                            <div className="h-[1px] w-8 bg-slate-400" />
                                            <ShieldCheck size={14} className="text-slate-900" />
                                            <div className="h-[1px] w-8 bg-slate-400" />
                                        </div>
                                        <p className="mt-2 text-[8px] font-black uppercase tracking-[0.3em] text-slate-300">
                                            Encrypted Enterprise Verification
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Success Message Overlay — briefly shown after OTP verified, then fades out */}
                    <AnimatePresence>
                        {step === 'success' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 z-[60] bg-blue-600 flex flex-col items-center justify-center text-white p-8"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                    className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-8"
                                >
                                    <CheckCircle2 size={48} />
                                </motion.div>
                                <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Access Granted</h2>
                                <p className="text-white/60 font-bold uppercase tracking-widest">Resuming technical walkthrough...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ProjectDemoModal
