import React from 'react'
import MechanicalCore from '../components/MechanicalCore'
import WhatWeDo from '../components/WhatWeDo'
import Projects from '../components/Projects'
import ValueProposition from '../components/ValueProposition'
import WhyItMatters from '../components/WhyItMatters'
import WorkWithUs from '../components/WorkWithUs'
import ContactSection from '../components/ContactSection'

const Home = () => {
    return (
        <main>
            <MechanicalCore />
            <WhatWeDo />
            <Projects />
            <ValueProposition />
            <WhyItMatters />
            <WorkWithUs />
            <ContactSection />
        </main>
    )
}

export default Home
