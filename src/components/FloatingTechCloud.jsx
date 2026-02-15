import React, { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Database, Code, Boxes, Server } from 'lucide-react'

const TechIcon = ({ Icon, name, color, position, delay }) => {
    const [isHovered, setIsHovered] = useState(false)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5, type: 'spring' }}
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            dragElastic={0.2}
            whileHover={{ scale: 1.2 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`absolute ${position} cursor-grab active:cursor-grabbing`}
            style={{ x, y }}
        >
            <motion.div
                animate={{
                    y: [0, -15, 0],
                }}
                transition={{
                    duration: 3 + delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="relative"
            >
                {/* Glow Effect */}
                <motion.div
                    animate={{
                        scale: isHovered ? [1, 1.2, 1] : 1,
                        opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
                    }}
                    transition={{
                        duration: 2,
                        repeat: isHovered ? Infinity : 0,
                    }}
                    className={`absolute inset-0 ${color} rounded-2xl blur-xl`}
                />

                {/* Icon Container */}
                <motion.div
                    animate={{
                        boxShadow: isHovered
                            ? '0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)'
                            : '0 10px 30px rgba(0, 0, 0, 0.1)',
                    }}
                    className={`relative p-6 ${color} rounded-2xl backdrop-blur-sm border border-white/20`}
                >
                    <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                </motion.div>

                {/* Tooltip */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? -70 : -60,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap pointer-events-none"
                >
                    <div className="bg-deep-sea text-white px-4 py-2 rounded-lg shadow-xl">
                        <div className="font-bold text-sm">{name}</div>
                        <div className="text-xs text-electric-blue font-semibold mt-1">
                            Let's create solution
                        </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-deep-sea"></div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

const FloatingTechCloud = () => {
    const techStack = [
        {
            Icon: Database,
            name: 'MongoDB',
            color: 'bg-gradient-to-br from-green-500 to-green-600',
            position: 'top-10 left-10',
            delay: 0.1,
        },
        {
            Icon: Code,
            name: 'Python',
            color: 'bg-gradient-to-br from-blue-500 to-blue-600',
            position: 'top-20 right-20',
            delay: 0.2,
        },
        {
            Icon: Boxes,
            name: 'React',
            color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
            position: 'bottom-20 left-20',
            delay: 0.3,
        },
        {
            Icon: Server,
            name: 'Node.js',
            color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
            position: 'bottom-10 right-10',
            delay: 0.4,
        },
    ]

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center">
            {/* Central Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute w-64 h-64 bg-electric-blue/20 rounded-full blur-3xl"
            />

            {/* Orbiting Circle */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                className="absolute w-80 h-80 border-2 border-dashed border-electric-blue/30 rounded-full"
            />

            {/* Tech Icons */}
            {techStack.map((tech, index) => (
                <TechIcon key={index} {...tech} />
            ))}

            {/* Center Text */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center z-10"
            >
                <div className="text-4xl font-bold text-gradient mb-2">Tech Stack</div>
                <div className="text-gray-600">Hover or drag the icons!</div>
            </motion.div>
        </div>
    )
}

export default FloatingTechCloud
