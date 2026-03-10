import React from 'react'
import { motion } from 'framer-motion'
import workBg from '../assets/circuit-code-blue-screen-icon.jpg'

const WorkWithUs = () => {
    return (
        <section className="relative overflow-hidden py-40 bg-white">
            {/* The "Banner" Shape Container */}
            <div
                className="relative w-full min-h-[850px] flex items-center justify-center overflow-hidden"
                style={{
                    // Moved top peak left (15% 30%) and bottom peak right (85% 70%)
                    clipPath: 'polygon(0 20%, 15% 30%, 100% 5%, 100% 75%, 85% 70%, 0 95%)',
                    background: '#002B54'
                }}
            >
                {/* Background Image with Fixed Attachment - Clarity Boost */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50"
                    style={{
                        backgroundImage: `url(${workBg})`,
                        backgroundAttachment: 'fixed',
                    }}
                />

                {/* Content Overlay */}
                <div className="relative z-10 container mx-auto px-6 text-center py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
                            Partner With<br />
                            <span className="text-[#f25c78]">Caldim Solutions</span>
                        </h2>

                        <p className="text-white/80 text-sm md:text-lg font-bold uppercase tracking-[0.4em] mb-12">
                            Transforming businesses through intelligent software engineering
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: '#ff4d6d' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#f25c78] text-white px-16 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] shadow-[0_20px_60px_rgba(242,92,120,0.4)] transition-all"
                        >
                            Get a Quote
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default WorkWithUs
