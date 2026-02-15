import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Home', href: '/', sectionId: 'home' },
        { name: 'Projects', href: '/projects' },
        { name: 'Feature Ideas', href: '/', sectionId: 'features' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/', sectionId: 'contact' },
    ]

    const handleNavClick = (e, link) => {
        e.preventDefault()
        setIsMobileMenuOpen(false)

        if (link.href === '/about' || link.href === '/projects') {
            navigate(link.href)
            return
        }

        if (location.pathname !== '/') {
            navigate('/', { state: { targetSection: link.sectionId } })
        } else {
            const element = document.getElementById(link.sectionId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    // Handle scroll to section after navigation
    useEffect(() => {
        if (location.pathname === '/' && location.state?.targetSection) {
            const element = document.getElementById(location.state.targetSection)
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' })
                }, 100)
            }
            // Clear state
            window.history.replaceState({}, document.title)
        }
    }, [location])

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'bg-[#080e3b]/80 backdrop-blur-lg border-b border-white/5 shadow-[0_0_20px_rgba(0,0,0,0.5)]'
                : 'bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center space-x-3 group"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <svg viewBox="0 0 100 60" className="w-full h-full filter drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                    <defs>
                                        <linearGradient id="logo-gradient-footer" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#ffffff" />
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
                        <span className="text-2xl font-bold tracking-[0.2em] text-white group-hover:text-cyan-400 transition-colors">
                            CALDIM
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <motion.button
                                key={link.name}
                                onClick={(e) => handleNavClick(e, link)}
                                className="nav-link text-sm uppercase tracking-widest font-semibold bg-transparent border-none cursor-pointer"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {link.name}
                            </motion.button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl rounded-2xl mt-4 px-6 border border-white/5"
                        >
                            <div className="py-6 space-y-6">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.name}
                                        onClick={(e) => handleNavClick(e, link)}
                                        className="block w-full text-left text-lg font-medium text-gray-400 hover:text-cyan-400 transition-colors bg-transparent border-none cursor-pointer"
                                    >
                                        {link.name}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    )
}

export default Header
