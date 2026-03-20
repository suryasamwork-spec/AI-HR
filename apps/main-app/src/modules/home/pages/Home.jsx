import React from 'react'
import MechanicalCore from '@/modules/home/components/MechanicalCore'
import WhatWeDo from '@/modules/home/components/WhatWeDo'
import Projects from '@/modules/home/components/Projects'
import ValueProposition from '@/modules/home/components/ValueProposition'
import WorkWithUs from '@/modules/home/components/WorkWithUs'
import TechnologyStack from '@/modules/home/components/TechnologyStack'
import ContactSection from '@/modules/home/components/ContactSection'

const Home = () => {
    return (
        <main>
            <MechanicalCore />
            <WhatWeDo />
            <Projects />
            <ValueProposition />
            <WorkWithUs />
            <TechnologyStack />
            <ContactSection />
        </main>
    )
}

export default Home
