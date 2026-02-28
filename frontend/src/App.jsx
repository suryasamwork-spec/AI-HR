import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import AllProjectsPage from './pages/AllProjectsPage'
import ContactPage from './pages/ContactPage'
import PortalHome from './pages/PortalHome'
import ServicesPage from './pages/ServicesPage'
import ScrollToTop from './components/ScrollToTop'

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-white">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/all-projects" element={<AllProjectsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/portal" element={<PortalHome />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

export default App
