import React from 'react';

const CareersHero = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#0b1120] overflow-hidden flex items-center pt-20">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(63,81,181,0.3)_0%,transparent_60%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1120] via-[#0b1120]/80 to-transparent"></div>
        
        {/* Animated SVG decoration */}
        <div className="absolute right-[-10%] top-0 bottom-0 w-2/3 opacity-40">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M200,1000 C400,800 600,600 800,400" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="none" />
            <path d="M0,800 C300,700 700,300 1000,200" stroke="rgba(255,255,255,0.03)" strokeWidth="2" fill="none" />
            <circle cx="800" cy="400" r="100" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 py-20">
        <div className="max-w-4xl">
          <div className="inline-block">
             <p className="text-xs uppercase font-bold tracking-[0.3em] text-white/60 mb-6 border-b border-white/20 pb-4">
              CALDIM CAREERS
            </p>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-12 leading-[1.1] tracking-tight">
            Caldim Innovation <span className="font-semibold text-blue-400">2026</span><br />
            Grand Finale
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 mb-12 font-light max-w-2xl leading-relaxed">
            Watch as the world's biggest engineering championship unfolds. Discover opportunities to engineer the future with us.
          </p>
          
          <a href={`${import.meta.env.VITE_RIMS_FRONTEND_URL || 'http://localhost:3003'}/jobs`} className="group inline-flex items-center text-xl font-semibold text-white transition-all">
            <span>Explore Opportunities</span>
            <span className="ml-4 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
