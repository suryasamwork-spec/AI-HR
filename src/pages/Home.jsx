import React from 'react'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Features from '../components/Features'
import About from '../components/About'
import Contact from '../components/Contact'

const Home = () => {
    return (
        <main>
            <Hero />
            <Projects />
            <Features />
            <About />
            <Contact />
        </main>
    )
}

export default Home
