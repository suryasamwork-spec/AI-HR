require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json())

// ── JSON Parse Error Handler ────────────────────────────────────────────────
// Catches malformed JSON bodies sent by clients and returns a 400 instead of
// letting body-parser throw an unhandled SyntaxError.
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('⚠️  Bad JSON body received:', err.message)
        return res.status(400).json({
            success: false,
            message: 'Invalid JSON in request body.',
            details: err.message,
        })
    }
    next(err)
})
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:4173',
        'https://caldimengg.in',
        'https://www.caldimengg.in',
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true
}))

// ── Request Logging ─────────────────────────────────────────────────────────
app.use((req, res, next) => {
    console.log(`📡 [${new Date().toISOString()}] ${req.method} ${req.url}`)
    if (req.method === 'POST') {
        console.log('📦 Body:', JSON.stringify(req.body, null, 2))
    }
    next()
})

// ── Nodemailer transporter ──────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,       // smtp.zoho.com
    port: Number(process.env.EMAIL_PORT), // 587
    secure: false,                        // STARTTLS on port 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
})

// ── Verify connection on startup ────────────────────────────────────────────
transporter.verify((error) => {
    if (error) {
        console.error('❌ SMTP connection failed:', error.message)
    } else {
        console.log('✅ SMTP server ready — connected to', process.env.EMAIL_HOST)
    }
})

// ── In-memory OTP storage (Simple implementation) ──────────────────────────
const otpStore = new Map()

// ── GET /api/health ──────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── POST /api/send-otp (Lead Discovery) ──────────────────────────────────────
app.post('/api/send-otp', async (req, res) => {
    const { email, firstName } = req.body

    if (!email) {
        return res.status(400).json({ success: false, message: 'Business email is required.' })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 }) // 10 min expiry

    try {
        console.log(`📨 Attempting to send OTP to ${email}...`)
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Verification Code: ${otp}`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                    <div style="background: #002B54; padding: 30px; text-align: center;">
                        <h2 style="color: #fff; margin: 0; font-size: 20px; letter-spacing: 1px; text-transform: uppercase;">CALDIM Demo Access</h2>
                    </div>
                    <div style="padding: 40px; text-align: center;">
                        <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">Hello ${firstName || 'valued professional'},</p>
                        <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">Use the verification code below to unlock the full technical walkthrough.</p>
                        <div style="margin: 30px 0; padding: 20px; background: #f3f4f6; border-radius: 12px; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #002B54; border: 1px dashed #d1d5db;">
                            ${otp}
                        </div>
                        <p style="color: #ef4444; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">This code expires in 10 minutes</p>
                    </div>
                </div>
            `
        })
        console.log(`✅ OTP successfully sent to ${email}`)
        res.status(200).json({ success: true, message: 'OTP sent to your email.' })
    } catch (error) {
        console.error('❌ OTP Send Error:', error)
        res.status(500).json({ success: false, message: `Failed to send OTP: ${error.message}` })
    }
})

// ── POST /api/verify-otp-only ──────────────────────────────────────────
app.post('/api/verify-otp-only', (req, res) => {
    const { email, otp } = req.body
    if (!otp || !email) {
        return res.status(400).json({ success: false, message: 'OTP and Email are required.' })
    }

    const storedData = otpStore.get(email)
    if (!storedData || storedData.otp !== otp || Date.now() > storedData.expires) {
        return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' })
    }

    res.status(200).json({ success: true, message: 'OTP verified.' })
})

// ── POST /api/verify-otp-and-lead ───────────────────────────────────────
app.post('/api/verify-otp-and-lead', async (req, res) => {
    const { firstName, lastName, email, organization, otp, projectTitle } = req.body

    if (!otp || !email) {
        return res.status(400).json({ success: false, message: 'OTP and Email are required.' })
    }

    const storedData = otpStore.get(email)
    if (!storedData || storedData.otp !== otp || Date.now() > storedData.expires) {
        return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' })
    }

    // OTP verified, clear it
    otpStore.delete(email)

    try {
        // Build CC list from env variable (comma-separated)
        const ccList = process.env.CC_EMAILS
            ? process.env.CC_EMAILS.split(',').map(e => e.trim()).filter(Boolean)
            : []

        // 1. Email to CALDIM Team
        await transporter.sendMail({
            from: `"Lead Discovery" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            cc: ccList,
            subject: `🚀 Demo Watch Lead: ${organization}`,
            html: `
                <div style="font-family: Arial, sans-serif; background: #f4f7fa; padding: 40px;">
                    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
                        <div style="background: #002B54; padding: 20px; color: white;">
                            <h2 style="margin: 0;">New Demo Access Lead</h2>
                        </div>
                        <div style="padding: 30px;">
                            <p><strong>Project:</strong> ${projectTitle}</p>
                            <p><strong>Contact:</strong> ${firstName} ${lastName}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Organization:</strong> ${organization}</p>
                        </div>
                    </div>
                </div>
            `
        })

        // 2. Welcome Email to Client
        await transporter.sendMail({
            from: `"CALDIM Engineering" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Unlocked: ${projectTitle} Technical Demo`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #002B54;">Hello ${firstName},</h2>
                    <p>Thank you for your interest in our <strong>${projectTitle}</strong> system.</p>
                    <p>Your access has been verified. You can now view the full technical demonstration on our website.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #666;">Our engineering team has been notified. We will reach out if you have further inquiries.</p>
                </div>
            `
        })

        res.status(200).json({ success: true, message: 'Verification successful.' })

    } catch (error) {
        console.error('❌ Lead Capture Error:', error.message)
        res.status(500).json({ success: false, message: 'OTP verified but failed to send notifications.' })
    }
})

// ── POST /api/contact ───────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
    const { name, email, contactNumber, projectInfo } = req.body

    // Basic validation
    if (!name || !email || !contactNumber || !projectInfo) {
        return res.status(400).json({ success: false, message: 'All fields are required.' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email address.' })
    }

    // Build CC list from env variable (comma-separated)
    const ccList = process.env.CC_EMAILS
        ? process.env.CC_EMAILS.split(',').map(e => e.trim()).filter(Boolean)
        : []

    try {
        // ── Email to CALDIM (notification) ──────────────────────────────────
        await transporter.sendMail({
            from: `"CALDIM Website" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,   // support@caldimengg.in
            cc: ccList,                   // member1, member2, member3
            replyTo: email,
            subject: `New Project Enquiry from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 12px; overflow: hidden;">
                    <div style="background: #1d4ed8; padding: 32px 40px;">
                        <h1 style="color: white; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase;">New Project Enquiry</h1>
                        <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 13px;">Received via CALDIM Engineering Website</p>
                    </div>
                    <div style="padding: 40px; background: white;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">Name</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-weight: 600; font-size: 15px;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #1d4ed8; font-weight: 600; font-size: 15px;"><a href="mailto:${email}" style="color: #1d4ed8; text-decoration: none;">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Contact No.</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-weight: 600; font-size: 15px;">${contactNumber}</td>
                            </tr>
                            <tr>
                                <td style="padding: 16px 0 0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Project Info</td>
                                <td style="padding: 16px 0 0; color: #111827; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${projectInfo}</td>
                            </tr>
                        </table>
                    </div>
                    <div style="padding: 20px 40px; background: #f9f9f9; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0; color: #9ca3af; font-size: 11px;">Reply directly to this email to respond to ${name}.</p>
                    </div>
                </div>
            `,
        })

        // ── Auto-reply to the sender ─────────────────────────────────────────
        await transporter.sendMail({
            from: `"CALDIM Engineering" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'We received your enquiry — CALDIM Engineering',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 12px; overflow: hidden;">
                    <div style="background: #1d4ed8; padding: 32px 40px;">
                        <h1 style="color: white; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase;">Thank You, ${name.split(' ')[0]}!</h1>
                        <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 13px;">CALDIM Engineering — Hosur, Tamil Nadu</p>
                    </div>
                    <div style="padding: 40px; background: white;">
                        <p style="color: #374151; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
                            We have received your project enquiry and our engineering team will review it shortly.
                            You can expect a response within <strong>24–48 business hours</strong>.
                        </p>
                        <div style="background: #eff6ff; border-left: 4px solid #1d4ed8; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
                            <p style="margin: 0; color: #1e40af; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Your Submission Summary</p>
                            <p style="margin: 8px 0 0; color: #374151; font-size: 13px; line-height: 1.6;">
                                <strong>Name:</strong> ${name}<br/>
                                <strong>Email:</strong> ${email}<br/>
                                <strong>Contact:</strong> ${contactNumber}
                            </p>
                        </div>
                        <p style="color: #6b7280; font-size: 13px; line-height: 1.7; margin: 20px 0 0;">
                            For urgent matters, you can reach us directly at 
                            <a href="mailto:support@caldimengg.in" style="color: #1d4ed8; text-decoration: none;">support@caldimengg.in</a>.
                        </p>
                    </div>
                    <div style="padding: 20px 40px; background: #f9f9f9; border-top: 1px solid #e5e7eb; text-align: center;">
                        <p style="margin: 0; color: #9ca3af; font-size: 11px;">© 2026 CALDIM Engineering Pvt. Ltd. · Hosur, Tamil Nadu</p>
                    </div>
                </div>
            `,
        })

        console.log(`📧 Contact form submitted by ${name} <${email}>`)
        return res.status(200).json({ success: true, message: 'Email sent successfully.' })

    } catch (error) {
        console.error('❌ Email send error:', error.message)
        return res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' })
    }
})

// ── Health check ────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res, next) => {
    console.log(`⚠️  404 - Not Found: ${req.method} ${req.url}`)
    res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found on this server.` })
})

// ── Error Handler Middleware (MUST BE LAST) ──────────────────────────────────
app.use((err, req, res, next) => {
    console.error('💥 Global Error Handler:', err)
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        details: err.message
    })
})

// ── Start server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 CALDIM backend running on http://localhost:${PORT}`)
})
