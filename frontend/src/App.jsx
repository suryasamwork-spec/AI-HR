import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'
import PortalHome from './pages/PortalHome'

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/portal" element={<PortalHome />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

export default App
