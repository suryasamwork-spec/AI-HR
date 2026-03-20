import React, { useEffect } from 'react'
import FuturisticHero from '@/modules/home/components/FuturisticHero'

const PortalHome = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <main className="bg-white">
            <FuturisticHero />
        </main>
    )
}

export default PortalHome
