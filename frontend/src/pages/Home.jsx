import React from 'react'
import MechanicalCore from '../components/MechanicalCore'
import WhatWeDo from '../components/WhatWeDo'
import Projects from '../components/Projects'
import ValueProposition from '../components/ValueProposition'
import WorkWithUs from '../components/WorkWithUs'
import TechnologyStack from '../components/TechnologyStack'
import ContactSection from '../components/ContactSection'

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
