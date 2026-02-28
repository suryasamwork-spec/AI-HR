import React from 'react'
import javaLogo from '../assets/logos/java logo.png'
import cppLogo from '../assets/logos/logo c+.png'
import jsLogo from '../assets/logos/logo js.png'
import pyLogo from '../assets/logos/logo py.png'
import mongoLogo from '../assets/logos/mongo logo.png'
import nodeLogo from '../assets/logos/node logo.png'

const Features = () => {
    const logos = [
        javaLogo, cppLogo, jsLogo, pyLogo, mongoLogo, nodeLogo
    ]

    // Triple for a seamless loop
    const looped = [...logos, ...logos, ...logos]

    return (
        <section id="features" className="relative overflow-hidden border-y border-gray-100" style={{ background: '#ffffff' }}>
            {/* ── Scrolling strip ── */}
            <div className="feat-outer">
                <div className="feat-track">
                    {looped.map((logo, i) => (
                        <div key={i} className="feat-logo-item">
                            <img
                                src={logo}
                                alt="tech logo"
                                className="h-10 lg:h-12 w-auto object-contain grayscale-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    filter: 'brightness(0) saturate(100%) invert(11%) sepia(87%) saturate(2222%) hue-rotate(196deg) brightness(97%) contrast(106%)'
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Edge fades */}
                <div className="feat-fade-l" />
                <div className="feat-fade-r" />
            </div>

            <style>{`
                .feat-outer {
                    position: relative;
                    overflow: hidden;
                    padding: 35px 0;
                }
                .feat-track {
                    display: flex;
                    align-items: center;
                    width: max-content;
                    animation: feat-scroll 40s linear infinite;
                    will-change: transform;
                }
                .feat-logo-item {
                    padding: 0 45px;
                    flex-shrink: 0;
                }
                @keyframes feat-scroll {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-33.333%); }
                }
                .feat-fade-l, .feat-fade-r {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 150px;
                    z-index: 10;
                    pointer-events: none;
                }
                .feat-fade-l {
                    left: 0;
                    background: linear-gradient(to right, #ffffff, transparent);
                }
                .feat-fade-r {
                    right: 0;
                    background: linear-gradient(to left, #ffffff, transparent);
                }
            `}</style>
        </section>
    )
}

export default Features
