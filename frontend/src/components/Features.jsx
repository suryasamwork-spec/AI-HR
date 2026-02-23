import React from 'react'
import { Zap, Shield, Cpu, Globe, Binary, Layers } from 'lucide-react'

const Features = () => {
    const features = [
        { icon: Cpu, title: 'Neural Architecture', gradient: ['#00d2ff', '#3a7bd5'] },
        { icon: Shield, title: 'Encryption Matrix', gradient: ['#a855f7', '#d946ef'] },
        { icon: Zap, title: 'Light-Speed Deployment', gradient: ['#22c55e', '#3b82f6'] },
        { icon: Globe, title: 'Global Interface', gradient: ['#f59e0b', '#ec4899'] },
        { icon: Binary, title: 'System Analysis', gradient: ['#00d2ff', '#2563eb'] },
        { icon: Layers, title: 'Full-Stack Scalability', gradient: ['#6366f1', '#4f46e5'] },
    ]

    // Triple for a seamless loop
    const looped = [...features, ...features, ...features]

    return (
        <section id="features" className="relative overflow-hidden" style={{ background: '#ffffff' }}>

            {/* ── Top thin accent line ── */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)' }} />

            {/* ── Scrolling strip ── */}
            <div className="feat-outer">
                <div className="feat-track">
                    {looped.map((f, i) => {
                        const Icon = f.icon
                        return (
                            <React.Fragment key={i}>
                                {/* Item */}
                                <div className="feat-item group">
                                    {/* Gradient icon */}
                                    <div
                                        className="feat-icon"
                                        style={{ background: `linear-gradient(135deg, ${f.gradient[0]}, ${f.gradient[1]})` }}
                                    >
                                        <Icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                                    </div>
                                    {/* Title */}
                                    <span className="feat-label">{f.title}</span>
                                </div>

                                {/* Separator diamond */}
                                <span className="feat-sep" aria-hidden="true">◆</span>
                            </React.Fragment>
                        )
                    })}
                </div>

                {/* Edge fades */}
                <div className="feat-fade-l" />
                <div className="feat-fade-r" />
            </div>

            {/* ── Bottom thin accent line ── */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.08) 70%, transparent)' }} />

            <style>{`
                /* ── Outer wrapper ── */
                .feat-outer {
                    position: relative;
                    overflow: hidden;
                    padding: 26px 0;
                }
                .feat-outer:hover .feat-track {
                    animation-play-state: paused;
                }

                /* ── Scrolling track ── */
                .feat-track {
                    display: flex;
                    align-items: center;
                    width: max-content;
                    gap: 0;
                    animation: feat-scroll 36s linear infinite;
                    will-change: transform;
                }
                @keyframes feat-scroll {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-33.333%); }
                }

                /* ── Each item ── */
                .feat-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    padding: 0 36px;
                    cursor: default;
                    transition: opacity 0.3s;
                    white-space: nowrap;
                }
                .feat-item:hover {
                    opacity: 0.75;
                }

                /* ── Gradient icon circle ── */
                .feat-icon {
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: transform 0.4s;
                }
                .feat-item:hover .feat-icon {
                    transform: rotate(-10deg) scale(1.1);
                }

                /* ── Label ── */
                .feat-label {
                    font-size: 15px;
                    font-weight: 800;
                    letter-spacing: 0.05em;
                    color: #0a0a0a;
                    text-transform: uppercase;
                    font-family: inherit;
                }

                /* ── Separator ── */
                .feat-sep {
                    font-size: 6px;
                    color: rgba(0,0,0,0.2);
                    flex-shrink: 0;
                    letter-spacing: 0;
                }

                /* ── Edge fade overlays ── */
                .feat-fade-l,
                .feat-fade-r {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 120px;
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
