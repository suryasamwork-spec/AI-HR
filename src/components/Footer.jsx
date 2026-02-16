import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub' },
        // { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: 'https://in.linkedin.com/company/caldim-engineering?trk=public_post_feed-actor-name', label: 'LinkedIn' },
        { icon: Instagram, href: '', label: 'Instagram' },
    ]

    const footerLinks = [
        {
            title: 'Company',
            links: [
                { name: 'About Us', href: '/about' },
                { name: 'Projects', href: '/projects' },
                // { name: 'Careers', href: '#' },
                { name: 'Contact', href: '/#contact' },
            ]
        },
        {
            title: 'Services',
            links: [
                { name: 'Web Development' },
                { name: 'AI Solutions' },
                { name: 'UI/UX Design' },
                { name: 'Cloud Services' },
            ]
        },
        {
            title: 'Resources',
            links: [
                { name: 'Documentation' },
                { name: 'Privacy Policy' },
                { name: 'Terms of Service' },
                { name: 'Support' },  
            ]
        }
    ]

    return (
        <footer className="bg-transparent border-t border-white/5 text-white">
            <div className="section-container">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center space-x-3 mb-4 group">
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                <svg viewBox="0 0 100 60" className="w-full h-full filter drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                    <defs>
                                        <linearGradient id="logo-gradient-footer" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#ffffffff" />
                                            <stop offset="100%" stopColor="#ffffff" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M48 5 L10 26 L10 54 Q10 58 14 58 L48 58 L48 48 L18 48 Q16 48 16 46 L16 34 L48 16 Z"
                                        fill="url(#logo-gradient-footer)"
                                        stroke="#A7C7E7"
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M52 5 L52 58 L86 58 Q90 58 90 54 L90 26 L52 5 Z M62 18 V46 L80 46 V28 Z"
                                        fill="url(#logo-gradient-footer)"
                                        fillRule="evenodd"
                                        stroke="#A7C7E7"
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold tracking-[0.2em] text-white">CALDIM</span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed max-w-sm">
                            Building the future, one line of code at a time. Your trusted partner in digital transformation and innovative software solutions.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon
                                return (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        aria-label={social.label}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 bg-white/5 hover:bg-cyan-500/20 border border-white/10 rounded-lg flex items-center justify-center transition-all group"
                                    >
                                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-sky-50 transition-colors" />
                                    </motion.a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Links */}
                    {footerLinks.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            <h3 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">{group.title}</h3>
                            <ul className="space-y-4">
                                {group.links.map((link, index) => (
                                    <li key={index}>
                                        {link.href ? (
                                            <Link
                                                to={link.href}
                                                className="text-gray-500 hover:text-cyan-400 transition-all inline-block hover:translate-x-1 duration-200 text-sm"
                                            >
                                                {link.name}
                                            </Link>
                                        ) : (
                                            <span className="text-gray-500 text-sm cursor-default">
                                                {link.name}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs tracking-wider uppercase font-medium">
                        © {new Date().getFullYear()} CALDIM. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs tracking-wider uppercase font-medium flex items-center gap-2">
                        Crafted with <span className="text-cyan-500/80 animate-pulse text-lg">✦</span> by CALDIM
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
