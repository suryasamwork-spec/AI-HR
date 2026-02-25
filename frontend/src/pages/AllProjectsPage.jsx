import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { projectsData } from '../data/projectsData'

const AllProjectsPage = () => {
    const navigate = useNavigate()

    const handleFullView = (index) => {
        navigate('/projects', { state: { projectIndex: index } })
    }

    return (
        <div className="pt-32 pb-40 min-h-screen bg-white">
            <div className="max-w-[1700px] mx-auto px-6 lg:px-12 space-y-40">
                {projectsData.map((project, index) => {
                    const isEven = index % 2 === 0
                    return (
                        <motion.section
                            key={project.id}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
                        >
                            {/* Visual Side */}
                            <div className={`space-y-8 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                                <div
                                    className="relative aspect-video rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden p-10 flex items-center justify-center group cursor-pointer"
                                    onClick={() => handleFullView(index)}
                                >
                                    <motion.img
                                        src={project.images[0]}
                                        alt={project.title}
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 blur-3xl -z-10`} />
                                </div>

                                {/* Tech & Action */}
                                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
                                    <div className="space-y-3">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Technology Matrix</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((t) => (
                                                <span key={t} className="px-4 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleFullView(index)}
                                        className="px-8 py-3 rounded-xl bg-[#002B54] text-white flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-1 group"
                                    >
                                        <span className="text-[11px] font-black uppercase tracking-widest text-white">Full View</span>
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className={`space-y-10 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                                {/* Index number */}
                                <div className="text-[120px] font-black leading-none text-gray-50 select-none -mb-8">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                <div>
                                    <h1
                                        className="text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-black mb-4 cursor-pointer hover:text-blue-600 transition-colors"
                                        onClick={() => handleFullView(index)}
                                    >
                                        {project.title}
                                    </h1>
                                    <p className="text-blue-500 text-base font-black tracking-[0.15em] uppercase">
                                        {project.tagline}
                                    </p>
                                </div>

                                <div className="h-[1px] bg-gray-100 w-full" />

                                <div className="space-y-6">
                                    <p className="text-base text-black leading-relaxed font-light">
                                        {project.fullDescription}
                                    </p>

                                    <div className="grid grid-cols-1 gap-3">
                                        {project.features.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-start gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                                                <div>
                                                    <div className="text-[10px] font-black uppercase text-black mb-1">{feature.title}</div>
                                                    <div className="text-xs text-black leading-relaxed">{feature.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    )
                })}
            </div>
        </div>
    )
}

export default AllProjectsPage
