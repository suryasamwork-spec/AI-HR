import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import caldimLogo from '../assets/caldim-logo.png'

const Footer = () => {
    const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Youtube, href: 'https://www.youtube.com/@CaldimEngineering', label: 'YouTube' },
        { icon: Linkedin, href: 'https://in.linkedin.com/company/caldim-engineering?trk=public_post_feed-actor-name', label: 'LinkedIn' },
        { icon: Instagram, href: 'https://www.instagram.com/caldimengineering/', label: 'Instagram' },
    ]

    const footerLinks = [
        {
            title: 'Company',
            links: [
                { name: 'About Us', href: '/about' },
                { name: 'Projects', href: '/projects' },
                // { name: 'Careers', href: '#' },
                { name: 'Contact', href: '/contact' },
            ]
        },
        {
            title: 'Services',
            links: [
                { name: 'Web Development', href: '/services#web-development' },
                { name: 'AI Solutions', href: '/services#ai-solutions' },
                { name: 'UI/UX Design', href: '/services#ui-ux-design' },
                { name: 'Cloud Services', href: '/services#cloud-services' },
            ]
        }
    ]

    return (
        <footer className="relative bg-gradient-to-b from-[#002B54] to-[#00376b] text-white">
            {/* Wave Top Decoration */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-full">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block w-full h-[60px] md:h-[120px]"
                >
                    <path
                        d="M0,40 L40,43.3 C80,46.7,160,53.3,240,58.3 C320,63.3,400,66.7,480,60 C560,53.3,640,36.7,720,38.3 C800,40,880,60,960,70 C1040,80,1120,80,1200,70 C1280,60,1360,40,1400,30 L1440,20 L1440,120 L1400,120 C1360,120,1280,120,1200,120 C1120,120,1040,120,960,120 C880,120,800,120,720,120 C640,120,560,120,480,120 C400,120,320,120,240,120 C160,120,80,120,40,120 L0,120 Z"
                        fill="#00376b" opacity="0.4"
                    ></path>
                    <path
                        d="M0,67 L24,64.3 C48,61.7,96,56,144,53.3 C192,50.7,240,50.7,288,58.7 C336,66.7,384,82.7,432,82.7 C480,82.7,528,66.7,576,61.3 C624,56,672,61.3,720,66.7 C768,72,816,77.3,864,74.7 C912,72,960,61.3,1008,53.3 C1056,45.3,1104,40,1152,42.7 C1200,45.3,1248,56,1272,61.3 L1296,66.7 L1296,120 L1272,120 C1248,120,1200,120,1152,120 C1104,120,1056,120,1008,120 C960,120,912,120,864,120 C816,120,768,120,720,120 C672,120,624,120,576,120 C528,120,480,120,432,120 C384,120,336,120,288,120 C240,120,192,120,144,120 C96,120,48,120,24,120 L0,120 Z"
                        fill="#002B54"
                    ></path>
                </svg>
            </div>

            <div className="section-container pt-16 md:pt-24 pb-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center space-x-3 mb-4 group">
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                <img
                                    src={caldimLogo}
                                    alt="Caldim Logo"
                                    className="w-full h-full object-contain filter"
                                    style={{ filter: 'brightness(0) invert(1) drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.2))' }}
                                />
                            </div>
                            <span className="text-2xl font-bold tracking-[0.2em] text-white">CALDIM</span>
                        </Link>
                        <p className="text-blue-100/60 mb-6 leading-relaxed max-w-sm">
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
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 bg-white/5 hover:bg-blue-400 border border-white/10 rounded-lg flex items-center justify-center transition-all group"
                                    >
                                        <Icon className="w-5 h-5 text-blue-100 group-hover:text-white transition-colors" />
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
                                                className="text-blue-100/60 hover:text-blue-400 transition-all inline-block hover:translate-x-1 duration-200 text-sm"
                                            >
                                                {link.name}
                                            </Link>
                                        ) : (
                                            <span className="text-blue-100/40 text-sm cursor-default">
                                                {link.name}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter Section */}
                    <div className="lg:col-span-1 max-w-xs">
                        <h3 className="font-bold text-xs uppercase tracking-widest mb-4 text-white">support</h3>
                        <div className="space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white px-3 py-2 rounded-lg text-black border border-blue-600/10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-xs"
                                />
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold text-xs transition-all active:scale-95 shadow-lg shadow-blue-600/20">
                                Send
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-blue-100/40 text-xs tracking-wider uppercase font-medium">
                        © {new Date().getFullYear()} CALDIM. All rights reserved.
                    </p>
                    <p className="text-blue-100/40 text-xs tracking-wider uppercase font-medium flex items-center gap-2">
                        developed by <span className="text-blue-400 animate-pulse text-lg"></span> CALDIM
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
