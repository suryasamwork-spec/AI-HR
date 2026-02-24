import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProjectsDropdownOpen(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const navLinks = [
        { name: 'Home', href: '/', sectionId: 'home' },
        { name: 'Projects', href: '/projects', hasDropdown: true },
        // { name: 'Feature Ideas', href: '/', sectionId: 'features' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Archive', href: '/archive' },
    ]

    const projectsList = [
        { id: 1, title: 'Employee Timesheet' },
        { id: 2, title: 'Project Management' },
        { id: 3, title: 'Inventory Management' },
        { id: 4, title: 'AI Powered Recruitment System' },
        { id: 5, title: 'AI Procurement Workflow' }
    ]

    const handleNavClick = (e, link) => {
        if (link.hasDropdown) {
            e.preventDefault()
            setIsProjectsDropdownOpen(!isProjectsDropdownOpen)
            return
        }

        e.preventDefault()
        setIsMobileMenuOpen(false)
        setIsProjectsDropdownOpen(false)

        if (link.href !== '/' && !link.hasDropdown) {
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

    const handleProjectItemClick = (projectId) => {
        setIsProjectsDropdownOpen(false)
        setIsMobileMenuOpen(false)
        navigate('/projects', { state: { projectIndex: projectId - 1 } })
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
                ? 'bg-white/90 backdrop-blur-lg border-b border-blue-600/10 shadow-sm'
                : 'bg-transparent'
                }`}
        >
            <nav className="max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center space-x-3 group"
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                            setIsProjectsDropdownOpen(false)
                            setIsMobileMenuOpen(false)
                        }}
                    >
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <svg viewBox="0 0 100 60" className="w-full h-full filter drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                <defs>
                                    <linearGradient id="logo-gradient-header" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#2563eb" />
                                        <stop offset="100%" stopColor="#1d4ed8" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M48 5 L10 26 L10 54 Q10 58 14 58 L48 58 L48 48 L18 48 Q16 48 16 46 L16 34 L48 16 Z"
                                    fill="url(#logo-gradient-header)"
                                    stroke="#2563eb"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M52 5 L52 58 L86 58 Q90 58 90 54 L90 26 L52 5 Z M62 18 V46 L80 46 V28 Z"
                                    fill="url(#logo-gradient-header)"
                                    fillRule="evenodd"
                                    stroke="#2563eb"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <span className={`text-2xl font-bold tracking-[0.2em] transition-colors ${isScrolled ? 'text-black' : 'text-black'} group-hover:text-blue-600`}>
                            CALDIM
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <div key={link.name} className="relative" ref={link.hasDropdown ? dropdownRef : null}>
                                <motion.button
                                    onClick={(e) => handleNavClick(e, link)}
                                    className={`nav-link text-sm uppercase tracking-widest font-semibold bg-transparent border-none cursor-pointer flex items-center gap-1 ${isScrolled ? 'text-gray-700' : 'text-gray-700'} ${isProjectsDropdownOpen && link.hasDropdown ? 'text-blue-600' : ''}`}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {link.name}
                                    {link.hasDropdown && (
                                        <ChevronDown size={14} className={`transition-transform duration-300 ${isProjectsDropdownOpen ? 'rotate-180' : ''}`} />
                                    )}
                                </motion.button>

                                {/* Dropdown Menu */}
                                {link.hasDropdown && (
                                    <AnimatePresence>
                                        {isProjectsDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white border border-blue-600/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl"
                                            >
                                                <div className="py-3">
                                                    {projectsList.map((project) => (
                                                        <button
                                                            key={project.id}
                                                            onClick={() => handleProjectItemClick(project.id)}
                                                            className="w-full px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-between group"
                                                        >
                                                            {project.title}
                                                            <X size={12} className="opacity-0 group-hover:opacity-100 transition-opacity rotate-45" />
                                                        </button>
                                                    ))}
                                                    <div className="border-t border-gray-100 mt-2">
                                                        <button
                                                            onClick={() => {
                                                                setIsProjectsDropdownOpen(false)
                                                                navigate('/projects')
                                                            }}
                                                            className="w-full px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 hover:bg-blue-50 transition-all"
                                                        >
                                                            View All Projects
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-black' : 'text-black'} hover:text-blue-600`}
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
                            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl rounded-2xl mt-4 px-6 border border-blue-600/10 shadow-xl"
                        >
                            <div className="py-6 space-y-4">
                                {navLinks.map((link) => (
                                    <div key={link.name}>
                                        <button
                                            onClick={(e) => handleNavClick(e, link)}
                                            className="flex items-center justify-between w-full text-left text-lg font-medium text-gray-400 hover:text-blue-600 transition-colors bg-transparent border-none cursor-pointer py-2"
                                        >
                                            {link.name}
                                            {link.hasDropdown && <ChevronDown size={18} className={isProjectsDropdownOpen ? 'rotate-180' : ''} />}
                                        </button>

                                        {link.hasDropdown && isProjectsDropdownOpen && (
                                            <div className="pl-4 mt-2 mb-4 space-y-2 border-l border-white/10">
                                                {projectsList.map((project) => (
                                                    <button
                                                        key={project.id}
                                                        onClick={() => handleProjectItemClick(project.id)}
                                                        className="block w-full text-left text-sm font-medium text-gray-500 hover:text-white py-2"
                                                    >
                                                        {project.title}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => {
                                                        setIsMobileMenuOpen(false)
                                                        navigate('/projects')
                                                    }}
                                                    className="block w-full text-left text-sm font-bold text-blue-600 py-2"
                                                >
                                                    View All
                                                </button>
                                            </div>
                                        )}
                                    </div>
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
