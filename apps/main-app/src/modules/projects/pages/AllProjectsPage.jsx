import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { projectsData } from '@/data/projectsData'

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
                        <section
                            key={project.id}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
                        >
                            {/* Visual Side */}
                            <div className={`space-y-8 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                                <div
                                    className="relative aspect-video bg-gray-50 overflow-hidden cursor-pointer"
                                    onClick={() => handleFullView(index)}
                                >
                                    <img
                                        src={project.images[0]}
                                        alt={project.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Tech & Action */}
                                <div className="pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-black uppercase tracking-wider text-black/40">Technology Matrix</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech?.map((t) => (
                                                <span key={t} className="px-5 py-2 rounded-lg bg-gray-50 border border-black/5 text-xs font-bold text-black uppercase tracking-widest">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleFullView(index)}
                                        className="px-8 py-4 rounded-xl bg-black text-white flex items-center gap-3"
                                    >
                                        <span className="text-xs font-black uppercase tracking-widest text-white">Full View</span>
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className={`space-y-10 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                                {/* Index number */}
                                <div className="text-[120px] font-black leading-none text-black/5 select-none -mb-8">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                <div>
                                    <h1
                                        className="text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-black mb-4 cursor-pointer hover:text-blue-600 transition-colors"
                                        onClick={() => handleFullView(index)}
                                    >
                                        {project.title}
                                    </h1>
                                    <p className="text-black text-lg font-black tracking-[0.15em] uppercase">
                                        {project.tagline}
                                    </p>
                                </div>

                                <div className="h-[1px] bg-gray-100 w-full" />

                                <div className="space-y-8">
                                    <p className="text-lg text-black leading-relaxed font-light">
                                        {project.fullDescription}
                                    </p>

                                    <div className="grid grid-cols-1 gap-4">
                                        {project.features?.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-start gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                                                <div>
                                                    <div className="text-xs font-black uppercase text-black mb-1">{feature.title}</div>
                                                    <div className="text-sm text-black leading-relaxed">{feature.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                })}
            </div>
        </div>
    )
}

export default AllProjectsPage
