import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import AllProjectsPage from './pages/AllProjectsPage'
import PortalHome from './pages/PortalHome'
import ServicesPage from './pages/ServicesPage'
import RegisterPage from './pages/RegisterPage'
import CareersPage from './pages/CareersPage'
import RestartProgramPage from './pages/RestartProgramPage'
import ScrollToTop from './components/ScrollToTop'

// Careers Portal Pages (merged from caldimcareers/frontend-react)
import CareersHome from './pages/careers/CareersHome'
import JobList from './pages/careers/JobList'
import JobDetail from './pages/careers/JobDetail'
import CareersLogin from './pages/careers/CareersLogin'
import CareersRegister from './pages/careers/CareersRegister'

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* ── Careers Portal sub-pages (own Header + Footer from CareersLayout) ── */}
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/careers/jobs" element={<JobList />} />
                <Route path="/careers/jobs/:id" element={<JobDetail />} />
                <Route path="/careers/login" element={<CareersLogin />} />
                <Route path="/careers/register" element={<CareersRegister />} />
                <Route path="/careers/restart" element={<RestartProgramPage />} />

                {/* ── Main Site (shared Header + Footer) ── */}
                <Route
                    path="*"
                    element={
                        <div className="min-h-screen bg-white">
                            <Header />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/projects" element={<ProjectsPage />} />
                                <Route path="/all-projects" element={<AllProjectsPage />} />
                                <Route path="/services" element={<ServicesPage />} />
                                <Route path="/portal" element={<PortalHome />} />
                                <Route path="/register" element={<RegisterPage />} />
                            </Routes>
                            <Footer />
                        </div>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
