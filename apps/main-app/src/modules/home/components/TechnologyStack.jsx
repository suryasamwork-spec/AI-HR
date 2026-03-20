import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Layers, Cloud, Database, Smartphone,
    Monitor, Cpu, Code2, Globe, Shield,
    Zap, ZapOff, Server, Terminal, Box,
    Shapes, Hexagon, Component, Coffee
} from 'lucide-react'

const categories = [
    {
        id: 'web',
        num: '01',
        label: 'Web Platform',
        icon: Globe,
        content: {
            "Front-End": [
                { name: 'GRAPHQL', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-01.png" alt="GraphQL" className="w-12 h-12 object-contain" /> },
                { name: 'TYPESCRIPT', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-012.png" alt="TypeScript" className="w-12 h-12 object-contain" /> },
                { name: 'MATERIAL UI', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-02.png" alt="Material UI" className="w-12 h-12 object-contain" /> },
                { name: 'NEXT.JS', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-011.png" alt="Next.js" className="w-12 h-12 object-contain" /> },
                { name: 'REACT.JS', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-04.png" alt="React.js" className="w-12 h-12 object-contain" /> },
                { name: 'REST API', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-06.png" alt="Rest API" className="w-12 h-12 object-contain" /> },
            ],
            "Back-End": [
                { name: 'NODE.JS', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-015.png" alt="Node.js" className="w-12 h-12 object-contain" /> },
                { name: 'PHP', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-08.png" alt="PHP" className="w-12 h-12 object-contain" /> },
                { name: 'LARAVEL', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-03.png" alt="Laravel" className="w-12 h-12 object-contain" /> },
                { name: 'JAVA', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-05.png" alt="Java" className="w-12 h-12 object-contain" /> },
                { name: 'PYTHON', icon: <Code2 size={48} /> },
                { name: 'DOCKER', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-022.png" alt="Docker" className="w-12 h-12 object-contain" /> },
            ]
        }
    },
    {
        id: 'cloud',
        num: '02',
        label: 'Cloud & DevOps',
        icon: Cloud,
        content: {
            "Cloud Infrastructure": [
                { name: 'AZURE', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-021.png" alt="Azure" className="w-12 h-12 object-contain" /> },
                { name: 'NGINX', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-020.png" alt="Nginx" className="w-12 h-12 object-contain" /> },
                { name: 'AWS', icon: <Cloud size={48} /> },
                { name: 'GOOGLE CLOUD', icon: <Cloud size={48} /> },
            ],
            "DevOps & Automation": [
                { name: 'DOCKER', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-022.png" alt="Docker" className="w-12 h-12 object-contain" /> },
                { name: 'KUBERNETES', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-016.png" alt="Kubernetes" className="w-12 h-12 object-contain" /> },
                { name: 'JENKINS', icon: <Zap size={48} /> },
                { name: 'CI/CD', icon: <Zap size={48} /> },
            ]
        }
    },
    {
        id: 'database',
        num: '03',
        label: 'Database',
        icon: Database,
        content: {
            "Database Systems": [
                { name: 'MYSQL', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-027.png" alt="MySQL" className="w-12 h-12 object-contain" /> },
                { name: 'POSTGRESQL', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-025.png" alt="PostgreSQL" className="w-12 h-12 object-contain" /> },
                { name: 'MONGODB', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-024.png" alt="MongoDB" className="w-12 h-12 object-contain" /> },
                { name: 'SOLR', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/06/icon-programing-026.png" alt="Solr" className="w-12 h-12 object-contain" /> },
                { name: 'REDIS', icon: <Zap size={48} /> },
                { name: 'FIREBASE', icon: <Database size={48} /> },
            ]
        }
    },
    {
        id: 'mobile',
        num: '04',
        label: 'Mobile Apps',
        icon: Smartphone,
        content: {
            "Development Platforms": [
                { name: 'FLUTTER', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/07/icon-programing-030.png" alt="Flutter" className="w-12 h-12 object-contain" /> },
                { name: 'SWIFT', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/07/icon-programing-031.png" alt="Swift" className="w-12 h-12 object-contain" /> },
                { name: 'KOTLIN', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/07/icon-programing-028.png" alt="Kotlin" className="w-12 h-12 object-contain" /> },
                { name: 'GO', icon: <img src="https://orizon.1onestrong.com/wp-content/uploads/2023/07/icon-programing-029.png" alt="Go" className="w-12 h-12 object-contain" /> },
                { name: 'REACT NATIVE', icon: <Smartphone size={48} /> },
                { name: 'ANDROID', icon: <Smartphone size={48} /> },
            ]
        }
    }
]

const TechCard = ({ icon, name }) => (
    <div className="flex items-center gap-6 bg-black py-4 px-6 rounded-2xl border border-white/5 shadow-2xl transition-all">
        <div className="flex items-center justify-center text-white shrink-0">
            {icon}
        </div>
        <span className="text-white font-black text-xs tracking-[0.2em] uppercase">{name}</span>
    </div>
)

const TechnologyStack = ({ data = null }) => {
    const [activeIdx, setActiveIdx] = useState(0)
    const effectiveCategories = data || categories
    const activeData = effectiveCategories[activeIdx]

    return (
        <section className="py-24 bg-white">
            <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="mb-24">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black uppercase leading-[0.85]">
                        Technology Stack
                    </h2>
                    <div className="h-[2px] w-full bg-black/5 mt-10" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 lg:gap-0 relative">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1 space-y-12 lg:pr-10 lg:border-r lg:border-black/5">
                        <div className="flex flex-col gap-10">
                            {effectiveCategories.map((cat, idx) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveIdx(idx)}
                                    className="flex items-center gap-10 group text-left"
                                >
                                    <span className={`text-lg font-black transition-colors ${activeIdx === idx ? 'text-[#f25c78]' : 'text-black/5'}`}>
                                        {cat.num}
                                    </span>
                                    <span className={`text-2xl md:text-3xl font-black uppercase tracking-tight transition-all ${activeIdx === idx ? 'text-[#f25c78] translate-x-4' : 'text-black/20 hover:text-black hover:translate-x-2'}`}>
                                        {cat.label}
                                    </span>
                                    {activeIdx === idx && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="ml-auto w-1.5 h-16 bg-[#f25c78] rounded-full hidden lg:block"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-3 lg:pl-16">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx + (data ? 'project' : 'home')}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-24"
                            >
                                {activeData && Object.entries(activeData.content).map(([sectionTitle, items]) => (
                                    <div key={sectionTitle} className="space-y-10">
                                        <h3 className="text-4xl font-black text-black uppercase tracking-tight">
                                            {sectionTitle}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
                                            {items.map((item, i) => (
                                                <TechCard key={i} {...item} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TechnologyStack
