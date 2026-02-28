import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Database, Layout, Link as LinkIcon, CheckCircle2, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import archiveImg from '../assets/img.png'

const Projects = () => {
    const navigate = useNavigate()
    const categories = [
        {
            title: "Operational Efficiency",
            icon: Database,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            points: [
                { head: "Centralized Secure Repository", desc: "Create a unified storage layer to collect, organize, and safeguard all digital assets (PDFs, industrial records, multimedia)." },
                { head: "Intelligent Ingestion", desc: "Build an upload interface that handles bulk files and automatically extracts text (using Python/OCR) during the upload process." },
                { head: "Advanced Metadata Search", desc: "A high-speed search bar that queries not just file names, but the metadata and content inside the documents." },
                { head: "Automated Lifecycle Management", desc: "Logic that automatically flags old files for 'Cold Storage' or 'Archive' status to optimize database performance." }
            ]
        },
        {
            title: "Real-Time Visibility",
            icon: Shield,
            color: "text-indigo-600",
            bgColor: "bg-indigo-50",
            points: [
                { head: "WORM Implementation", desc: "'Write Once, Read Many' logic—ensure that once a file is archived, it cannot be edited or deleted without high-level admin override." },
                { head: "Chain of Custody (Audit Logs)", desc: "A backend table to track every action: Who viewed it? When? From what IP?" },
                { head: "Data Integrity Checks", desc: "Automatic background 'checksum' scans to ensure files haven't been corrupted or altered over time." }
            ]
        },
        {
            title: "Process Control & Compliance",
            icon: Layout,
            color: "text-cyan-600",
            bgColor: "bg-cyan-50",
            points: [
                { head: "Dynamic Document Viewer", desc: "An integrated previewer so users can view PDFs, images, or CAD files directly in the browser without downloading them." },
                { head: "Versioning Support", desc: "If a document is updated, the system must keep the 'Archived' version as a historical record while showing the 'Current' version." },
                { head: "Category Tagging", desc: "A sidebar with filters for 'Project Name,' 'Date Range,' 'Department,' and 'Document Type.'" }
            ]
        },
        {
            title: "Data-Driven Decisions",
            icon: LinkIcon,
            color: "text-blue-500",
            bgColor: "bg-blue-50",
            points: [
                { head: "API-First Approach", desc: "Ensure the archive has a clean REST API so your other industrial automation portals can 'push' data into the archive programmatically." },
                { head: "Scalable Storage Backend", desc: "Configure the backend to point to scalable 'Cold' buckets (like AWS S3 Glacier or similar) to keep hosting costs low as data grows." }
            ]
        }
    ]

    return (
        <section id="projects" className="py-24 sm:py-48 bg-white">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start relative">

                    {/* Left Side: Image Visual - Persistent Sticky */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-2/5 lg:sticky lg:top-40 w-full mb-16 lg:mb-0"
                    >
                        <div className="relative">
                            <img
                                src={archiveImg}
                                alt="Archive Solution Visual"
                                className="w-full h-auto object-contain select-none pointer-events-none"
                            />
                        </div>

                        <div className="mt-12 space-y-4">
                            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
                                BUSINESS<br />
                                <span className="text-blue-600">VALUE</span> SECTION
                            </h2>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                A high-fidelity centralized vault designed for the future of industrial data sovereignty.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Side: Technical Roadmap Points */}
                    <div className="lg:w-3/5 space-y-16">
                        {categories.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.8 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`p-4 rounded-2xl ${cat.bgColor} ${cat.color} shadow-sm`}>
                                        <cat.icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                                        {cat.title}
                                    </h3>
                                </div>

                                <div className="grid gap-6">
                                    {cat.points.map((point, pIdx) => (
                                        <div key={pIdx} className="relative pl-12">
                                            <div className="absolute left-0 top-1.5 p-1 rounded-full bg-blue-600/10 text-blue-600">
                                                <CheckCircle2 size={16} strokeWidth={3} />
                                            </div>
                                            <h4 className="text-lg font-bold text-slate-800 mb-1">
                                                {point.head}
                                            </h4>
                                            <p className="text-slate-500 font-light leading-relaxed">
                                                {point.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                {idx < categories.length - 1 && (
                                    <div className="pt-8 border-b border-slate-100" />
                                )}
                            </motion.div>
                        ))}

                        {/* View All Projects Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="pt-12"
                        >
                            <button
                                onClick={() => navigate('/all-projects')}
                                className="px-10 py-4 rounded-2xl bg-[#002B54] text-white flex items-center gap-3 shadow-xl"
                            >
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-white">View All Projects</span>
                                <ChevronRight size={18} />
                            </button>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Projects
