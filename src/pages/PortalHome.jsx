import React, { useEffect } from 'react'
import FuturisticHero from '../components/FuturisticHero'

const PortalHome = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <main className="bg-[#010826]">
            <FuturisticHero />
        </main>
    )
}

export default PortalHome
