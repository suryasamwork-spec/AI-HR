import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import caldimLogo from '../assets/caldim-logo.png'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-[#002B54] shadow-lg'
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
                            <img
                                src={caldimLogo}
                                alt="Caldim Logo"
                                className="w-full h-full object-contain filter"
                                style={{
                                    filter: isScrolled
                                        ? 'brightness(0) invert(1) drop-shadow(0 0 5px rgba(255,255,255,0.2))'
                                        : 'brightness(0) saturate(100%) invert(11%) sepia(87%) saturate(2222%) hue-rotate(196deg) brightness(97%) contrast(106%) drop-shadow(0 0 10px rgba(59,130,246,0.3))'
                                }}
                            />
                        </div>
                        <span className={`text-2xl font-bold tracking-[0.2em] transition-colors ${isScrolled ? 'text-white' : 'text-[#002B54]'} group-hover:text-blue-400`}>
                            CALDIM
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <div
                                key={link.name}
                                className="relative"
                                ref={link.hasDropdown ? dropdownRef : null}
                                onMouseEnter={() => link.hasDropdown && setIsProjectsDropdownOpen(true)}
                                onMouseLeave={() => link.hasDropdown && setIsProjectsDropdownOpen(false)}
                            >
                                <motion.button
                                    onClick={(e) => {
                                        if (link.hasDropdown) {
                                            // Close dropdown and navigate on click
                                            setIsProjectsDropdownOpen(false)
                                            navigate(link.href)
                                        } else {
                                            handleNavClick(e, link)
                                        }
                                    }}
                                    className={`nav-link text-sm uppercase tracking-widest font-semibold bg-transparent border-none cursor-pointer flex items-center gap-1 ${isScrolled ? 'text-white' : 'text-gray-700'} ${isProjectsDropdownOpen && link.hasDropdown ? 'text-blue-400' : ''}`}
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
                                                className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64 z-[60]"
                                            >
                                                <div className="bg-[#002B54] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl py-3">
                                                    {projectsList.map((project) => (
                                                        <button
                                                            key={project.id}
                                                            onClick={() => handleProjectItemClick(project.id)}
                                                            className="w-full px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-white/80 hover:text-white hover:bg-white/10 transition-all flex items-center justify-between group"
                                                        >
                                                            {project.title}
                                                            <X size={12} className="opacity-0 group-hover:opacity-100 transition-opacity rotate-45 text-blue-400" />
                                                        </button>
                                                    ))}
                                                    <div className="border-t border-white/5 mt-2">
                                                        <button
                                                            onClick={() => {
                                                                setIsProjectsDropdownOpen(false)
                                                                navigate('/all-projects')
                                                            }}
                                                            className="w-full px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 hover:text-blue-300 hover:bg-white/5 transition-all"
                                                        >
                                                            View All Products
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
                        className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-white' : 'text-black'} hover:text-blue-400`}
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
                                                        navigate('/all-projects')
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
