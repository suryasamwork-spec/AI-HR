require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json())
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:4173',
        'https://caldimengg.in',
        'https://www.caldimengg.in',
    ],
    methods: ['POST'],
}))

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

// ── Start server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 CALDIM backend running on http://localhost:${PORT}`)
})
