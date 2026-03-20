'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Badge } from '@/shared/components/ui/badge'
import {
    ArrowLeft, MapPin, Briefcase, Clock, Building2,
    Loader2, AlertCircle, CheckCircle2, Upload,
    Pencil, ChevronDown, User, GraduationCap,
    CreditCard, X, XCircle, Edit2, Trash2
} from 'lucide-react'
import { useAuth } from '@/app/dashboard/lib/auth-context'
import { Mail, Lock } from 'lucide-react'
import { APIClient } from '@/app/dashboard/lib/api-client'

// ─── Types ──────────────────────────────────────────────────────────────────

interface Job {
    id: number; title: string; description: string
    experience_level: string; location?: string; mode_of_work?: string
    job_type?: string; domain?: string; status: string; closed_at?: string | null
    created_at: string; aptitude_enabled?: boolean; first_level_enabled?: boolean
    interview_mode?: string; behavioral_role?: string; interview_token?: string
}

// Phase 1 quick-apply data
interface QuickApply {
    dob: string; interviewCity: string; workLocation: string
    employer: string; totalExp: string; noticePeriod: string
    currentCtc: string; diplomaPercent: string; graduationPercent: string
    postGradPercent: string; countryCode: string; mobile: string
    panNumber: string; skills: string; gender: string; isExEmployee: boolean
}

// Phase 2 tabs
type Tab = 'personal' | 'address' | 'education' | 'workexp' | 'compensation' | 'other'

const TABS: { id: Tab; label: string }[] = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'address', label: 'Address' },
    { id: 'education', label: 'Education' },
    { id: 'workexp', label: 'Work Experiences' },
    { id: 'compensation', label: 'Compensation and Benefits' },
    { id: 'other', label: 'Other Information' },
]

const COMPLETED_TABS: Tab[] = ['workexp'] // simulate one completed tab

// ─── Component ──────────────────────────────────────────────────────────────

export default function PublicJobDetailPage() {
    const params = useParams()
    const router = useRouter()
    const jobId = params.id as string

    const [job, setJob] = useState<Job | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { user, isAuthenticated, login, register, verify } = useAuth()

    // Phase 0=auth/verify, Phase 1=quick, Phase 2=detailed tabs, success
    const [phase, setPhase] = useState<'auth' | 'verify' | 'quick' | 'detailed' | 'success'>('auth')

    // Auth form state
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
    const [authEmail, setAuthEmail] = useState('')
    const [authPassword, setAuthPassword] = useState('')
    const [authName, setAuthName] = useState('')
    const [authOtp, setAuthOtp] = useState('')
    const [authError, setAuthError] = useState<string | null>(null)
    const [authLoading, setAuthLoading] = useState(false)
    const [activeTab, setActiveTab] = useState<Tab>('personal')
    const [completedTabs, setCompletedTabs] = useState<Set<Tab>>(new Set())

    // Resume & photo
    const [resumeFile, setResumeFile] = useState<File | null>(null)
    const [photoFile, setPhotoFile] = useState<File | null>(null)
    const [photoPreview, setPhotoPreview] = useState<string | null>(null)
    const resumeRef = useRef<HTMLInputElement>(null)
    const photoRef = useRef<HTMLInputElement>(null)

    // Quick apply form state
    const [quick, setQuick] = useState<QuickApply>({
        dob: '', interviewCity: '', workLocation: '',
        employer: '', totalExp: '0', noticePeriod: '',
        currentCtc: '', diplomaPercent: '', graduationPercent: '',
        postGradPercent: '', countryCode: '91', mobile: '',
        panNumber: '', skills: '', gender: '', isExEmployee: false
    })
    const [quickError, setQuickError] = useState<string | null>(null)
    const [quickSubmitting, setQuickSubmitting] = useState(false)

    // Phase 2 personal tab
    const [personal, setPersonal] = useState({
        citizenship: '', countryCode: '91', mobile: '',
        hasPassport: '', gender: '', photoIdType: '', panNumber: '',
        maritalStatus: '', dateOfBirth: '', nationality: ''
    })

    // Phase 2 address tab
    const [address, setAddress] = useState({
        houseNo: '', street: '', city: '', state: '', country: 'India', pin: '',
        sameAsPermanent: false,
        currentHouseNo: '', currentStreet: '', currentCity: '', currentState: '', currentCountry: '', currentPin: ''
    })

    // Phase 2 education tab
    const [education, setEducation] = useState({
        tenth: { school: '', board: '', year: '', score: '' },
        twelfth: { school: '', board: '', year: '', score: '' },
        grad: { degree: '', specialization: '', institute: '', university: '', year: '', score: '' },
        pg: { degree: '', specialization: '', institute: '', university: '', year: '', score: '' }
    })

    // Phase 2 work exp tab
    const [workExp, setWorkExp] = useState({
        currentEmployer: '', designation: '', joiningDate: '', leavingDate: '',
        jobDescription: '', reasonLeaving: '', currentCtc: ''
    })

    // Phase 2 compensation tab
    const [compensation, setCompensation] = useState({
        expectedCtc: '', currency: 'INR', paymentType: '', benefits: ''
    })

    // Phase 2 other tab
    const [other, setOther] = useState({
        disabilityStatus: '', referredBy: '', sourceOfInfo: '', additionalInfo: ''
    })

    const [detailError, setDetailError] = useState<string | null>(null)
    const [detailSubmitting, setDetailSubmitting] = useState(false)

    // Skip Phase 0 if already logged in
    useEffect(() => {
        if (isAuthenticated) setPhase(prev => prev === 'auth' || prev === 'verify' ? 'quick' : prev)
    }, [isAuthenticated])

    useEffect(() => { fetchJobDetails() }, [jobId])

    const fetchJobDetails = async () => {
        try {
            setIsLoading(true)
            const data = await APIClient.get<Job>(`/api/jobs/public/${jobId}`)
            setJob(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setAuthError(null)
        setAuthLoading(true)
        try {
            if (authMode === 'login') {
                await login(authEmail, authPassword)
                // useEffect above will move to 'quick' once isAuthenticated=true
            } else {
                await register(authEmail, authPassword, authName)
                setPhase('verify')
            }
        } catch (err: any) {
            setAuthError(err.message)
        } finally {
            setAuthLoading(false)
        }
    }

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        setAuthError(null)
        setAuthLoading(true)
        try {
            await verify(authEmail, authOtp)
            setAuthMode('login')
            setPhase('auth')
            setAuthError(null)
            alert('Email verified! Please login to continue.')
        } catch (err: any) {
            setAuthError(err.message)
        } finally {
            setAuthLoading(false)
        }
    }

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setPhotoFile(file)
            setPhotoPreview(URL.createObjectURL(file))
        }
    }

    const handleQuickSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!resumeFile) { setQuickError('Please upload your resume.'); return }
        if (!quick.dob) { setQuickError('Date of Birth is required.'); return }
        if (!quick.employer) { setQuickError('Current/Previous Employer is required.'); return }
        if (!quick.skills) { setQuickError('Skills are required.'); return }
        if (!quick.gender) { setQuickError('Gender is required.'); return }
        if (quick.mobile.length !== 10) { setQuickError('Mobile number must be exactly 10 digits.'); return }
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(quick.panNumber)) { setQuickError('Invalid PAN Number format (e.g., ABCDE1234F).'); return }
        
        setQuickError(null)
        setQuickSubmitting(true)
        try {
            // Pre-fill phase 2 personal data from quick apply
            setPersonal(prev => ({
                ...prev,
                countryCode: quick.countryCode,
                mobile: quick.mobile,
                gender: quick.gender,
                panNumber: quick.panNumber,
                dateOfBirth: quick.dob
            }))
            setWorkExp(prev => ({ ...prev, currentEmployer: quick.employer, currentCtc: quick.currentCtc }))
            // Formally submit application to trigger database record and email notification
            await submitFinalApplication()
            
            // Move to phase 2 for optional detailed data
            setPhase('detailed')
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (err: any) {
            setQuickError(err.message)
        } finally {
            setQuickSubmitting(false)
        }
    }

    const handleTabSave = async () => {
        setDetailError(null)
        setDetailSubmitting(true)
        try {
            if (activeTab === 'personal') {
                if (!personal.citizenship) throw new Error('Citizenship is required.');
                if (personal.mobile.length !== 10) throw new Error('Mobile number must be exactly 10 digits.');
                if (!personal.gender) throw new Error('Gender is required.');
                if (!personal.photoIdType) throw new Error('Photo Identity Proof type is required.');
                if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(personal.panNumber)) throw new Error('Invalid PAN Number format (e.g., ABCDE1234F).');
            }
            if (activeTab === 'address') {
                if (!address.houseNo || !address.street || !address.city || !address.state || !address.pin) throw new Error('Permanent address fields are required.');
                if (!address.sameAsPermanent && (!address.currentHouseNo || !address.currentStreet || !address.currentCity || !address.currentState || !address.currentPin)) {
                    throw new Error('Current address fields are required if not same as permanent.');
                }
            }
            if (activeTab === 'education') {
                if (!education.grad.degree || !education.grad.institute || !education.grad.year || !education.grad.score) throw new Error('Graduation details are required.');
                if (!education.twelfth.school || !education.twelfth.board || !education.twelfth.year || !education.twelfth.score) throw new Error('Class XII details are required.');
                if (!education.tenth.school || !education.tenth.board || !education.tenth.year || !education.tenth.score) throw new Error('Class X details are required.');
            }

            setCompletedTabs(prev => new Set([...prev, activeTab]))
            // Move to next tab
            const idx = TABS.findIndex(t => t.id === activeTab)
            if (idx < TABS.length - 1) {
                setActiveTab(TABS[idx + 1].id)
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                // All tabs done in Phase 2 → just move to success (Application was already submitted in Phase 1)
                setPhase('success')
            }
        } catch (err: any) {
            setDetailError(err.message)
        } finally {
            setDetailSubmitting(false)
        }
    }

    const submitFinalApplication = async () => {
        const formData = new FormData()
        formData.append('job_id', jobId)
        formData.append('candidate_name', user?.full_name || '')
        formData.append('candidate_email', user?.email || '')
        formData.append('candidate_phone', quick.mobile || 'N/A')
        if (resumeFile) formData.append('resume_file', resumeFile)
        if (photoFile) formData.append('photo_file', photoFile)

        // Step 1: Update/Save basic candidate profile
        await APIClient.put('/api/candidate/profile', {
            date_of_birth: personal.dateOfBirth || quick.dob || null,
            gender: personal.gender || quick.gender || null,
            citizenship: personal.citizenship || null,
            passport_number: personal.hasPassport === 'yes' ? 'provided' : null,
            address_city: address.city || null,
            address_state: address.state || null,
            primary_skills: quick.skills || null,
            education_grad: JSON.stringify(education.grad),
            education_10th: JSON.stringify(education.tenth),
            education_12th: JSON.stringify(education.twelfth),
        })

        // Step 2: Submit application (This triggers the AI-generated email in the backend)
        await APIClient.postFormData('/api/applications/apply', formData)
        
        // Note: We don't setPhase('success') here anymore because we want them to stay in Phase 2
        // for optional details if they just finished Phase 1.
        // We only show success if they finish the LAST tab of Phase 2 or if we decide Phase 1 is enough.
    }

    // ─── Loading / Error states ────────────────────────────────────────────

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Loader2 className="h-10 w-10 text-purple-700 animate-spin" />
        </div>
    )

    if (error || !job) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
            <AlertCircle className="h-14 w-14 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Job not found</h2>
            <p className="text-gray-500 mb-6">{error}</p>
            <Link href="/jobs"><Button>Browse Other Jobs</Button></Link>
        </div>
    )

    // ─── SUCCESS ──────────────────────────────────────────────────────────

    if (phase === 'success') return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="bg-white rounded-2xl shadow-md p-12 text-center max-w-md">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h1>
                <p className="text-gray-500 mb-8">Your application for <strong>{job.title}</strong> has been received. Our team will contact you soon.</p>
                <Link href="/jobs"><Button className="w-full bg-purple-700 hover:bg-purple-800 text-white rounded-lg">Back to Job Search</Button></Link>
            </div>
        </div>
    )

    // ─── PHASE 0a: Login / Register ───────────────────────────────────────

    if (phase === 'auth') return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Top header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <Link href="/jobs" className="text-purple-700 text-sm font-medium hover:underline flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" /> Back to job search
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">{job.title}</h1>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> Caldim Engineering</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location || 'Bengaluru'}</span>
                </div>
            </div>

            <div className="max-w-md mx-auto px-4 py-12">
                {/* Tab toggle: Login / Register */}
                <div className="flex border-b border-gray-200 mb-8">
                    {(['login', 'register'] as const).map(m => (
                        <button
                            key={m}
                            onClick={() => { setAuthMode(m); setAuthError(null) }}
                            className={`flex-1 pb-3 text-lg font-bold capitalize transition-colors ${
                                authMode === m
                                    ? 'border-b-2 border-purple-700 text-purple-700'
                                    : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {m === 'login' ? 'Login' : 'New Registration'}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {authMode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
                    </h2>
                    <p className="text-base text-gray-500 mb-6 font-medium">
                        {authMode === 'login'
                            ? 'Login to continue with your application.'
                            : 'Register to apply for this role. After registering please login again to proceed.'}
                    </p>

                    {authError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 shrink-0" /> {authError}
                        </div>
                    )}

                    <form onSubmit={handleAuth} className="space-y-6">
                        {authMode === 'register' && (
                            <div>
                                <label className="block text-sm text-gray-500 mb-1.5 font-semibold">Full Name *</label>
                                <input
                                    value={authName} onChange={e => setAuthName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                    className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-purple-600"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm text-purple-700 mb-1.5 font-semibold">Email Address *</label>
                            <input
                                type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)}
                                placeholder="john@example.com"
                                required
                                className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-purple-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1.5 font-semibold">Password *</label>
                            <input
                                type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-gray-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full py-4 bg-gray-900 text-white text-base font-black uppercase tracking-wider rounded-lg hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2 shadow-lg"
                        >
                            {authLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                            {authMode === 'login' ? 'LOGIN & CONTINUE' : 'REGISTER'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-400 mt-8 font-medium">
                        {authMode === 'login' ? "Don't have an account?" : 'Already registered?'}
                        <button
                            onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthError(null) }}
                            className="ml-1 text-purple-700 font-bold hover:underline"
                        >
                            {authMode === 'login' ? 'Register here' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )

    // ─── PHASE 0b: OTP Verification ───────────────────────────────────────

    if (phase === 'verify') return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <Link href="/jobs" className="text-purple-700 text-sm font-medium hover:underline flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" /> Back to job search
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">{job.title}</h1>
            </div>

            <div className="max-w-md mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="h-8 w-8 text-purple-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                    <p className="text-base text-gray-500 mb-2 font-medium">
                        A 6-digit verification code was sent to
                    </p>
                    <p className="text-lg font-bold text-purple-700 mb-8">{authEmail}</p>

                    {authError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 shrink-0" /> {authError}
                        </div>
                    )}

                    <form onSubmit={handleVerifyOtp} className="space-y-8 text-left">
                        <div>
                            <label className="block text-sm text-gray-500 mb-3 font-semibold text-center uppercase tracking-widest">Enter OTP</label>
                            <input
                                value={authOtp} onChange={e => setAuthOtp(e.target.value)}
                                placeholder="000000"
                                maxLength={6}
                                required
                                className="w-full border-b-2 border-gray-300 bg-transparent py-4 text-4xl font-black text-center tracking-[0.5em] focus:outline-none focus:border-purple-600 text-purple-700"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full py-4 bg-gray-900 text-white text-base font-black uppercase tracking-wider rounded-lg hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                        >
                            {authLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                            VERIFY & LOGIN
                        </button>
                        <p className="text-center text-sm text-gray-400 font-medium">
                            Didn't receive it?{' '}
                            <button type="button" className="text-purple-700 font-bold hover:underline ml-1">Resend OTP</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )

    // ─── PHASE 1: Quick Apply Form ─────────────────────────────────────────

    if (phase === 'quick') return (

        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Top bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <Link href="/jobs" className="text-purple-700 text-sm font-medium hover:underline flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" /> Back to job search
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">{job.title}</h1>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> Caldim Engineering</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location || 'Bengaluru'}</span>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8">
                {!isAuthenticated && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-amber-800">Login required to apply</p>
                            <p className="text-sm text-amber-700 mt-1">
                                Please <Link href="/dashboard" className="underline font-bold">login or register</Link> first, then come back to apply.
                            </p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleQuickSubmit}>
                    {/* Resume Upload Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Left: instructions + drop zone */}
                            <div className="flex-1 flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Resume</h2>
                                    <p className="text-base text-gray-600 mb-4 font-medium">Please upload resume to extract and autofill application.</p>
                                    <ul className="text-sm text-gray-500 space-y-2 list-disc pl-5 font-medium">
                                        <li>File size should not exceed 5 MB.</li>
                                        <li>Ensure the resume is up to date with skills and Work history dates.</li>
                                        <li>Use either .docx or .pdf file for your resume.</li>
                                    </ul>
                                </div>
                                <div
                                    onClick={() => resumeRef.current?.click()}
                                    className={`w-56 h-36 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${resumeFile ? 'border-green-500 bg-green-50' : 'border-purple-500 hover:bg-purple-50'}`}
                                >
                                    <input ref={resumeRef} type="file" hidden accept=".pdf,.doc,.docx" onChange={e => setResumeFile(e.target.files?.[0] || null)} />
                                    {resumeFile ? (
                                        <>
                                            <CheckCircle2 className="h-7 w-7 text-green-600 mb-1" />
                                            <p className="text-xs font-semibold text-green-700 text-center px-2 break-words">{resumeFile.name}</p>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="h-8 w-8 text-purple-600 mb-2" />
                                            <p className="text-base font-bold text-purple-700">Browse File</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Right: Photo upload */}
                            <div
                                onClick={() => photoRef.current?.click()}
                                className="relative w-36 h-36 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-center bg-gray-100 overflow-hidden shrink-0 self-start"
                            >
                                <input ref={photoRef} type="file" hidden accept="image/*" onChange={handlePhotoChange} />
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Photo" className="w-full h-full object-cover" />
                                ) : (
                                    <svg viewBox="0 0 100 100" className="w-24 h-24 text-gray-400" fill="currentColor">
                                        <circle cx="50" cy="35" r="20" />
                                        <ellipse cx="50" cy="80" rx="35" ry="25" />
                                    </svg>
                                )}
                                <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow border border-gray-200">
                                    <Pencil className="h-3.5 w-3.5 text-gray-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fields Grid */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        {quickError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-medium flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />{quickError}
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                            <div>
                                <label className="block text-sm text-[#001b3a] mb-1.5 font-bold flex items-center gap-1">
                                    Date of Birth <span className="text-red-500 font-black">*</span>
                                    <span className="text-[10px] text-gray-400 font-medium ml-auto">(As per Marksheet)</span>
                                </label>
                                <div className="relative group">
                                    <input type="date" value={quick.dob} onChange={e => setQuick({...quick, dob: e.target.value})}
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 pr-8 text-base font-semibold focus:outline-none focus:border-purple-600 transition-colors" required />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-focus-within:w-full"></div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-[#001b3a] mb-1.5 font-bold">Preferred Interview City <span className="text-red-500">*</span></label>
                                <div className="relative group">
                                    <input value={quick.interviewCity} onChange={e => setQuick({...quick, interviewCity: e.target.value})}
                                        placeholder="e.g. Bengaluru"
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base font-semibold focus:outline-none focus:border-purple-600 transition-colors" required />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-focus-within:w-full"></div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-[#001b3a] mb-1.5 font-bold">Preferred Work Location <span className="text-red-500">*</span></label>
                                <div className="relative group">
                                    <select value={quick.workLocation} onChange={e => setQuick({...quick, workLocation: e.target.value})}
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 pr-8 text-base font-semibold focus:outline-none focus:border-purple-600 appearance-none transition-colors" required>
                                        <option value="" disabled>Select Location</option>
                                        <option>Chennai</option><option>Bengaluru</option><option>Hyderabad</option>
                                        <option>Mumbai</option><option>Delhi</option><option>Pune</option>
                                    </select>
                                    <ChevronDown className="absolute right-1 top-3 h-5 w-5 text-gray-400 pointer-events-none group-focus-within:text-purple-600" />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-focus-within:w-full"></div>
                                </div>
                            </div>
                            {/* Employer */}
                            <div>
                                <label className="block text-sm text-[#001b3a] mb-1.5 font-bold">Current/Previous Employer</label>
                                <div className="relative group">
                                    <input value={quick.employer} onChange={e => setQuick({...quick, employer: e.target.value})}
                                        placeholder="Company Name"
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base font-semibold focus:outline-none focus:border-purple-600 transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-focus-within:w-full"></div>
                                </div>
                            </div>
                            {/* Total Exp */}
                            <div>
                                <label className="block text-sm text-[#001b3a] mb-1.5 font-bold">Total Experience in Years</label>
                                <div className="relative group">
                                    <input type="number" min="0" value={quick.totalExp} onChange={e => setQuick({...quick, totalExp: e.target.value})}
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base font-semibold focus:outline-none focus:border-purple-600 transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-focus-within:w-full"></div>
                                </div>
                            </div>
                            {/* Notice Period */}
                            <div>
                                <label className="block text-sm text-[#001b3a] mb-1.5 font-bold">Notice Period (days)</label>
                                <div className="relative group">
                                    <input value={quick.noticePeriod} onChange={e => setQuick({...quick, noticePeriod: e.target.value})}
                                        placeholder="e.g. 30"
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base font-semibold focus:outline-none focus:border-purple-600 transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-focus-within:w-full"></div>
                                </div>
                            </div>
                            {/* CTC */}
                            <div>
                                <label className="block text-sm text-[#001b3a] mb-1.5 font-bold">Current CTC (In Lakhs/INR)</label>
                                <div className="relative group">
                                    <input value={quick.currentCtc} onChange={e => setQuick({...quick, currentCtc: e.target.value})}
                                        placeholder="e.g. 12"
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base font-semibold focus:outline-none focus:border-purple-600 transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-focus-within:w-full"></div>
                                </div>
                            </div>
                            {/* Diploma */}
                            <div>
                                <label className="block text-sm text-[#001b3a] mb-1.5 font-bold">Diploma Percentage (if applicable)</label>
                                <div className="relative group">
                                    <input value={quick.diplomaPercent} onChange={e => setQuick({...quick, diplomaPercent: e.target.value})}
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base font-semibold focus:outline-none focus:border-purple-600 transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-focus-within:w-full"></div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1.5 font-bold uppercase tracking-wider text-[10px]">Graduation Percentage (%)</label>
                                <input value={quick.graduationPercent} onChange={e => setQuick({...quick, graduationPercent: e.target.value})}
                                    placeholder="e.g. 85%"
                                    className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-gray-600" />
                            </div>
                            {/* Post Grad */}
                            <div>
                                <label className="block text-sm text-[#001b3a] mb-1.5 font-bold">Post-Graduation Percentage (if applicable)</label>
                                <div className="relative group">
                                    <input value={quick.postGradPercent} onChange={e => setQuick({...quick, postGradPercent: e.target.value})}
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base font-semibold focus:outline-none focus:border-purple-600 transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-focus-within:w-full"></div>
                                </div>
                            </div>
                            {/* Mobile */}
                            <div>
                                <label className="block text-sm text-[#001b3a] mb-1.5 font-bold">Mobile No. <span className="text-red-500">*</span></label>
                                <div className="flex items-center gap-2 group relative">
                                    <span className="text-base font-black text-gray-400">+</span>
                                    <input value={quick.countryCode} onChange={e => setQuick({...quick, countryCode: e.target.value})}
                                        className="w-16 border-b border-gray-300 bg-transparent py-2.5 text-base text-center font-bold focus:outline-none focus:border-purple-600" placeholder="91" />
                                    <span className="text-base text-gray-400 font-bold">-</span>
                                    <input value={quick.mobile} onChange={e => setQuick({...quick, mobile: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                                        maxLength={10}
                                        className="flex-1 border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-purple-600 font-black tracking-widest text-gray-700" placeholder="9876543210" required />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-focus-within:w-full"></div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-[#001b3a] mb-1.5 font-bold flex items-center gap-1">
                                    PAN Number <span className="text-red-500 font-black">*</span>
                                    <span className="text-[9px] text-gray-400 font-medium ml-auto uppercase tracking-tighter">(10 characters required)</span>
                                </label>
                                <div className="relative group">
                                    <input value={quick.panNumber} onChange={e => setQuick({...quick, panNumber: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)})}
                                        maxLength={10}
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-purple-600 uppercase font-black tracking-[0.25em] text-gray-800 placeholder:text-gray-200" placeholder="ABCDE1234F" required />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-focus-within:w-full"></div>
                                </div>
                            </div>
                            {/* Skills (full width) */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm text-[#001b3a] mb-1.5 font-bold">Skills</label>
                                <div className="relative group">
                                    <input value={quick.skills} onChange={e => setQuick({...quick, skills: e.target.value})}
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-purple-600 font-bold text-purple-700" placeholder="React, Node.js, Python..." icon-placeholder="💡" />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-focus-within:w-full"></div>
                                </div>
                            </div>
                            {/* Gender */}
                            <div>
                                <label className="block text-sm text-[#001b3a] mb-1.5 font-bold">Gender</label>
                                <div className="relative group">
                                    <select value={quick.gender} onChange={e => setQuick({...quick, gender: e.target.value})}
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base font-semibold focus:outline-none focus:border-purple-600 appearance-none pr-6 transition-colors">
                                        <option value="">Select Gender</option>
                                        <option>Male</option><option>Female</option><option>Other</option>
                                    </select>
                                    <ChevronDown className="absolute right-1 top-3 h-5 w-5 text-gray-400 pointer-events-none group-focus-within:text-purple-600" />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-focus-within:w-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Ex-employee toggle */}
                        <div className="mt-8 mb-2">
                            <div className="inline-flex items-center gap-4 border border-gray-200 rounded-xl px-5 py-4 bg-gray-50">
                                <button
                                    type="button"
                                    onClick={() => setQuick({...quick, isExEmployee: !quick.isExEmployee})}
                                    className={`relative inline-flex h-6 w-11 rounded-full transition-colors focus:outline-none ${quick.isExEmployee ? 'bg-purple-600' : 'bg-gray-300'}`}
                                >
                                    <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform mt-0.5 ${quick.isExEmployee ? 'translate-x-5' : 'translate-x-1'}`} />
                                </button>
                                <span className="text-base font-bold text-gray-700">Are you an Ex-Employee of Caldim?</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 mt-8">
                            <button
                                type="submit"
                                disabled={quickSubmitting || !isAuthenticated}
                                className="px-12 py-4 bg-gray-900 text-white text-base font-black uppercase tracking-wider rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                            >
                                {quickSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                                APPLY
                            </button>
                            <Link href="/jobs">
                                <button type="button" className="px-10 py-4 border border-gray-400 text-base font-black uppercase tracking-wider rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                                    CANCEL
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

    // ─── PHASE 2: Detailed Multi-Tab Profile Form ──────────────────────────

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Top header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <h1 className="text-xl font-bold text-gray-900">{job.title}</h1>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> Caldim Engineering</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location || 'Bengaluru'}</span>
                </div>
            </div>

            {/* Tab Navigation (Infosys-style horizontal stepper) */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 overflow-x-auto">
                <div className="flex items-center gap-0 min-w-max">
                    {TABS.map((tab, idx) => {
                        const isActive = activeTab === tab.id
                        const isDone = completedTabs.has(tab.id)
                        return (
                            <React.Fragment key={tab.id}>
                                <button
                                    onClick={() => setActiveTab(tab.id)}
                                    className="flex flex-col items-center gap-1.5 group"
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all ${
                                        isDone ? 'border-green-500 bg-green-500 text-white' :
                                        isActive ? 'border-purple-600 text-purple-600 bg-white' :
                                        'border-gray-300 text-gray-400 bg-white'
                                    }`}>
                                        {isDone ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                                    </div>
                                    <span className={`text-sm font-bold whitespace-nowrap ${
                                        isActive ? 'text-purple-600' : isDone ? 'text-green-600' : 'text-gray-400'
                                    }`}>{tab.label}</span>
                                </button>
                                {idx < TABS.length - 1 && (
                                    <div className={`h-px w-8 mb-5 mx-1 ${isDone ? 'bg-green-400' : 'bg-gray-200'}`} />
                                )}
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {detailError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-medium flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />{detailError}
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    {/* ── PERSONAL ─────────────────────────────────────────── */}
                    {activeTab === 'personal' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal</h2>
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Photo */}
                                <div
                                    onClick={() => photoRef.current?.click()}
                                    className="relative w-40 h-40 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-center bg-gray-100 overflow-hidden shrink-0"
                                >
                                    <input ref={photoRef} type="file" hidden accept="image/*" onChange={handlePhotoChange} />
                                    {photoPreview ? (
                                        <img src={photoPreview} alt="Photo" className="w-full h-full object-cover" />
                                    ) : (
                                        <svg viewBox="0 0 100 100" className="w-28 h-28 text-gray-400" fill="currentColor">
                                            <circle cx="50" cy="35" r="20" />
                                            <ellipse cx="50" cy="80" rx="35" ry="25" />
                                        </svg>
                                    )}
                                    <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow border border-gray-200">
                                        <Pencil className="h-3.5 w-3.5 text-gray-600" />
                                    </div>
                                </div>

                                {/* Fields */}
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                    {/* Citizenship */}
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm text-purple-700 mb-1.5 font-semibold">Citizenship(s) *</label>
                                        <input value={personal.citizenship} onChange={e => setPersonal({...personal, citizenship: e.target.value})}
                                            className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-purple-600" required />
                                    </div>
                                    {/* Mobile */}
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1.5 font-semibold">Country Code + Mobile *</label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-base text-gray-500">+</span>
                                            <input value={personal.countryCode} onChange={e => setPersonal({...personal, countryCode: e.target.value})}
                                                className="w-16 border-b border-gray-300 bg-transparent py-2.5 text-base text-center focus:outline-none" placeholder="91" />
                                            <span className="text-base text-gray-400">-</span>
                                            <input value={personal.mobile} onChange={e => setPersonal({...personal, mobile: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                                                maxLength={10}
                                                className="flex-1 border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-gray-600 font-semibold" placeholder="9876543210" required />
                                        </div>
                                    </div>
                                    {/* Gender */}
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1 font-medium">Gender *</label>
                                        <div className="relative">
                                            <select value={personal.gender} onChange={e => setPersonal({...personal, gender: e.target.value})}
                                                className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none appearance-none pr-6">
                                                <option value=""></option>
                                                <option>Male</option><option>Female</option><option>Other</option>
                                            </select>
                                            <ChevronDown className="absolute right-1 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    {/* Passport */}
                                    <div>
                                        <label className="block text-xs text-purple-700 mb-2 font-medium">Do You Have a Passport?</label>
                                        <div className="flex items-center gap-6">
                                            {['yes', 'no'].map(v => (
                                                <label key={v} className="flex items-center gap-2 cursor-pointer">
                                                    <input type="radio" name="passport" value={v}
                                                        checked={personal.hasPassport === v}
                                                        onChange={() => setPersonal({...personal, hasPassport: v})}
                                                        className="w-4 h-4 accent-purple-600" />
                                                    <span className="text-sm capitalize">{v}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Photo ID */}
                                    <div>
                                        <label className="block text-sm text-purple-700 mb-1.5 font-semibold">Select Any Photo Identity Proof *</label>
                                        <div className="relative">
                                            <select value={personal.photoIdType} onChange={e => setPersonal({...personal, photoIdType: e.target.value})}
                                                className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none appearance-none pr-6 font-medium">
                                                <option value=""></option>
                                                <option>Aadhaar Card</option>
                                                <option>PAN Card</option>
                                                <option>Passport</option>
                                                <option>Voter ID</option>
                                                <option>Driving License</option>
                                            </select>
                                            <ChevronDown className="absolute right-1 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    {/* PAN */}
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm text-gray-500 mb-1.5 font-semibold">Permanent Account Number (PAN) *</label>
                                        <input value={personal.panNumber} onChange={e => setPersonal({...personal, panNumber: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)})}
                                            maxLength={10}
                                            className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-gray-600 uppercase font-bold tracking-widest text-gray-800" placeholder="ABCDE1234F" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── ADDRESS ──────────────────────────────────────────── */}
                    {activeTab === 'address' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Permanent Address</h2>
                            <p className="text-sm text-gray-400 mb-8 font-medium">This will be used for official correspondence.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                                {[
                                    { key: 'houseNo', label: 'House / Flat No.' },
                                    { key: 'street', label: 'Street / Area' },
                                    { key: 'city', label: 'City' },
                                    { key: 'state', label: 'State' },
                                    { key: 'country', label: 'Country' },
                                    { key: 'pin', label: 'PIN / ZIP Code' },
                                ].map(({ key, label }) => (
                                    <div key={key}>
                                        <label className="block text-sm text-gray-500 mb-1.5 font-semibold">{label}</label>
                                        <input
                                            value={(address as any)[key]}
                                            onChange={e => setAddress({...address, [key]: e.target.value})}
                                            className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-gray-600 font-medium"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 flex items-center gap-4">
                                <input type="checkbox" id="same" checked={address.sameAsPermanent} onChange={e => setAddress({...address, sameAsPermanent: e.target.checked})} className="w-5 h-5 accent-purple-600" />
                                <label htmlFor="same" className="text-base text-gray-700 cursor-pointer font-bold">Current address same as permanent address</label>
                            </div>
                            {!address.sameAsPermanent && (
                                <div className="mt-10">
                                    <h3 className="text-lg font-bold text-gray-800 mb-6">Current Address</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                                        {[
                                            { key: 'currentHouseNo', label: 'House / Flat No.' },
                                            { key: 'currentStreet', label: 'Street / Area' },
                                            { key: 'currentCity', label: 'City' },
                                            { key: 'currentState', label: 'State' },
                                            { key: 'currentCountry', label: 'Country' },
                                            { key: 'currentPin', label: 'PIN / ZIP Code' },
                                        ].map(({ key, label }) => (
                                            <div key={key}>
                                                <label className="block text-sm text-gray-500 mb-1.5 font-semibold">{label}</label>
                                                <input value={(address as any)[key]} onChange={e => setAddress({...address, [key]: e.target.value})}
                                                    className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-gray-600 font-medium" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── EDUCATION ────────────────────────────────────────── */}
                    {activeTab === 'education' && (
                        <div className="space-y-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Education Qualifications</h2>

                            {/* Graduation */}
                            <div className="p-8 border border-gray-200 rounded-2xl bg-gray-50/50 shadow-sm">
                                <h3 className="text-base font-black text-purple-700 uppercase tracking-widest mb-6 border-l-4 border-purple-700 pl-4">Graduation / UG Degree</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                                    {[
                                        { key: 'degree', label: 'Degree / Programme' },
                                        { key: 'specialization', label: 'Specialization' },
                                        { key: 'institute', label: 'Institute Name' },
                                        { key: 'university', label: 'University' },
                                        { key: 'year', label: 'Year of Passing' },
                                        { key: 'score', label: 'Score / CGPA' },
                                    ].map(({ key, label }) => (
                                        <div key={key}>
                                            <label className="block text-sm text-gray-500 mb-1.5 font-semibold">{label}</label>
                                            <input value={(education.grad as any)[key]}
                                                onChange={e => setEducation({...education, grad: {...education.grad, [key]: e.target.value}})}
                                                className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-gray-600 font-medium" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 12th */}
                            <div className="p-8 border border-gray-200 rounded-2xl bg-white shadow-sm">
                                <h3 className="text-base font-black text-gray-600 uppercase tracking-widest mb-6 border-l-4 border-gray-400 pl-4">Class XII / Higher Secondary</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                                    {[
                                        { key: 'school', label: 'School / Institute' },
                                        { key: 'board', label: 'Board' },
                                        { key: 'year', label: 'Year of Passing' },
                                        { key: 'score', label: 'Score / Percentage (%)' },
                                    ].map(({ key, label }) => (
                                        <div key={key}>
                                            <label className="block text-sm text-gray-500 mb-1.5 font-semibold">{label}</label>
                                            <input value={(education.twelfth as any)[key]}
                                                onChange={e => setEducation({...education, twelfth: {...education.twelfth, [key]: e.target.value}})}
                                                className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-gray-600 font-medium" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 10th */}
                            <div className="p-8 border border-gray-200 rounded-2xl bg-white shadow-sm">
                                <h3 className="text-base font-black text-gray-600 uppercase tracking-widest mb-6 border-l-4 border-gray-400 pl-4">Class X / Secondary</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                                    {[
                                        { key: 'school', label: 'School / Institute' },
                                        { key: 'board', label: 'Board' },
                                        { key: 'year', label: 'Year of Passing' },
                                        { key: 'score', label: 'Score / Percentage (%)' },
                                    ].map(({ key, label }) => (
                                         <div key={key}>
                                             <label className="block text-sm text-gray-500 mb-1.5 font-semibold">{label}</label>
                                             <input value={(education.tenth as any)[key]}
                                                 onChange={e => setEducation({...education, tenth: {...education.tenth, [key]: e.target.value}})}
                                                 className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-gray-600 font-medium" />
                                         </div>
                                     ))}
                                 </div>
                             </div>
                         </div>
                     )}

                    {/* ── WORK EXPERIENCE ──────────────────────────────────── */}
                    {activeTab === 'workexp' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Work Experience</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                                {[
                                    { key: 'currentEmployer', label: 'Current / Previous Employer' },
                                    { key: 'designation', label: 'Designation / Job Title' },
                                    { key: 'joiningDate', label: 'Date of Joining', type: 'date' },
                                    { key: 'leavingDate', label: 'Date of Leaving (leave blank if current)', type: 'date' },
                                    { key: 'currentCtc', label: 'Current CTC (In Lakhs/INR)' },
                                    { key: 'reasonLeaving', label: 'Reason for Leaving' },
                                ].map(({ key, label, type }) => (
                                    <div key={key}>
                                        <label className="block text-sm text-gray-500 mb-1.5 font-semibold">{label}</label>
                                        <input type={type || 'text'}
                                            value={(workExp as any)[key]}
                                            onChange={e => setWorkExp({...workExp, [key]: e.target.value})}
                                            className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-gray-600 font-medium" />
                                    </div>
                                ))}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm text-gray-500 mb-1.5 font-semibold">Job Responsibilities / Description</label>
                                    <textarea value={workExp.jobDescription}
                                        onChange={e => setWorkExp({...workExp, jobDescription: e.target.value})}
                                        rows={4}
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-gray-600 resize-none font-medium" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── COMPENSATION ─────────────────────────────────────── */}
                    {activeTab === 'compensation' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Compensation & Benefits</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1.5 font-semibold">Expected CTC (In Lakhs/INR)</label>
                                    <input value={compensation.expectedCtc} onChange={e => setCompensation({...compensation, expectedCtc: e.target.value})}
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-gray-600 font-bold text-purple-700" placeholder="0" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1.5 font-semibold">Currency</label>
                                    <div className="relative">
                                        <select value={compensation.currency} onChange={e => setCompensation({...compensation, currency: e.target.value})}
                                            className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none appearance-none pr-6 font-medium">
                                            <option>INR</option><option>USD</option><option>EUR</option><option>GBP</option>
                                        </select>
                                        <ChevronDown className="absolute right-1 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm text-gray-500 mb-1.5 font-semibold">Additional Benefits / Requirements</label>
                                    <textarea value={compensation.benefits} onChange={e => setCompensation({...compensation, benefits: e.target.value})}
                                        rows={4} placeholder="Any specific benefits or compensation requirements..."
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-gray-600 resize-none font-medium" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── OTHER INFO ───────────────────────────────────────── */}
                    {activeTab === 'other' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Other Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1.5 font-semibold">Disability Status</label>
                                    <div className="relative">
                                        <select value={other.disabilityStatus} onChange={e => setOther({...other, disabilityStatus: e.target.value})}
                                            className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none appearance-none pr-6 font-medium">
                                            <option value="">Select</option>
                                            <option>No Disability</option>
                                            <option>Visual Impairment</option>
                                            <option>Hearing Impairment</option>
                                            <option>Locomotor Disability</option>
                                            <option>Other</option>
                                        </select>
                                        <ChevronDown className="absolute right-1 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1.5 font-semibold">How did you hear about us?</label>
                                    <div className="relative">
                                        <select value={other.sourceOfInfo} onChange={e => setOther({...other, sourceOfInfo: e.target.value})}
                                            className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none appearance-none pr-6 font-medium">
                                            <option value="">Select</option>
                                            <option>Job Portal</option>
                                            <option>LinkedIn</option>
                                            <option>Employee Referral</option>
                                            <option>Company Website</option>
                                            <option>Campus Placement</option>
                                            <option>Other</option>
                                        </select>
                                        <ChevronDown className="absolute right-1 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1.5 font-semibold">Referred By (Employee Name/ID, if any)</label>
                                    <input value={other.referredBy} onChange={e => setOther({...other, referredBy: e.target.value})}
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-gray-600 font-medium" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm text-gray-500 mb-1.5 font-semibold">Additional Information / Cover Note</label>
                                    <textarea value={other.additionalInfo} onChange={e => setOther({...other, additionalInfo: e.target.value})} rows={5}
                                        placeholder="Anything else you'd like us to know..."
                                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base focus:outline-none focus:border-gray-600 resize-none font-medium" />
                                </div>

                                {/* Declaration */}
                                <div className="sm:col-span-2 mt-8 p-6 bg-amber-50 border border-amber-100 rounded-xl shadow-inner">
                                    <p className="text-sm text-amber-900 leading-relaxed font-medium">
                                        <strong className="text-amber-950 font-bold">Declaration:</strong> I hereby certify that all information provided in this application is accurate and complete to the best of my knowledge. I understand that any misrepresentation or omission may result in disqualification or termination of employment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Save / Next Button */}
                <div className="mt-10 flex items-center gap-6">
                    <button
                        onClick={handleTabSave}
                        disabled={detailSubmitting}
                        className="px-12 py-4 bg-gray-900 text-white text-base font-black uppercase tracking-wider rounded-lg hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2 shadow-xl"
                    >
                        {detailSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                        {activeTab === 'other' ? 'SUBMIT APPLICATION' : 'SAVE & CONTINUE'}
                    </button>
                    {activeTab !== 'personal' && (
                        <button
                            type="button"
                            onClick={() => {
                                const idx = TABS.findIndex(t => t.id === activeTab)
                                if (idx > 0) setActiveTab(TABS[idx - 1].id)
                            }}
                            className="px-10 py-4 border-2 border-gray-300 text-base font-black uppercase tracking-wider rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                        >
                            BACK
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
