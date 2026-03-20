import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '@/shared/components/Header'
import Footer from '@/shared/components/Footer'
import Home from '@/modules/home/pages/Home'
import AboutPage from '@/modules/about/pages/AboutPage'
import ProjectsPage from '@/modules/projects/pages/ProjectsPage'
import AllProjectsPage from '@/modules/projects/pages/AllProjectsPage'
import PortalHome from '@/modules/portal/pages/PortalHome'
import ServicesPage from '@/modules/services/pages/ServicesPage'
import RegisterPage from '@/modules/auth/pages/RegisterPage'
import CareersPage from '@/modules/careers/pages/CareersPage'
import RestartProgramPage from '@/modules/careers/pages/RestartProgramPage'
import ScrollToTop from '@/shared/components/ScrollToTop'

// Careers Portal Pages
import CareersHome from '@/modules/careers/pages/CareersHome'
import JobList from '@/modules/careers/pages/JobList'
import JobDetail from '@/modules/careers/pages/JobDetail'
import CareersLogin from '@/modules/careers/pages/CareersLogin'
import CareersRegister from '@/modules/careers/pages/CareersRegister'

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
