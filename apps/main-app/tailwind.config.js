/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'deep-sea': '#1a365d',
                'electric-blue': '#3b82f6',
                'cyan-400': '#22d3ee',
                'ice': '#ffffff',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            boxShadow: {
                'neon-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
                'neon-blue-lg': '0 0 30px rgba(59, 130, 246, 0.4)',
                'neon-cyan': '0 0 20px rgba(0, 255, 255, 0.5)',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
                    '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)' },
                },
            },
        },
    },
    plugins: [],
}
