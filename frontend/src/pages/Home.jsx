import React from 'react'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Features from '../components/Features'
import About from '../components/About'
import Archive from '../components/Archive'

const Home = () => {
    return (
        <main>
            <Hero />
            <Projects />
            <Features />
            <About />
            <Archive />
        </main>
    )
}

export default Home
