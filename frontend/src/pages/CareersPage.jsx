import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, MapPin, ArrowRight, ArrowDown, Code2, HardHat, Cpu, Users,
  Star, Target, TrendingUp, Zap, Globe, Shield, BookOpen, Layers,
  ChevronRight, Play, CheckCircle, Building2, Award, BarChart3
} from 'lucide-react';
import caldimLogo from '../assets/caldim-logo-new.png';
import CareersFooter from '../components/careers/CareersFooter';

/* ─────────────────────────────────────────────
   UTILITY — Scroll-triggered fade-in wrapper
───────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, y = 40, x = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   UTILITY — Animated Number Counter
───────────────────────────────────────────── */
const Counter = ({ end, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─────────────────────────────────────────────
   CAREERS STICKY NAVBAR
───────────────────────────────────────────── */
const CareersNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0f172a]/90 backdrop-blur-2xl border-b border-white/10 py-4 shadow-2xl shadow-black/40'
          : 'bg-transparent py-6'
      }`}
    >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <img
                src={caldimLogo}
                alt="Caldim Logo"
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
            <span className="text-white font-black tracking-[0.2em] text-2xl group-hover:text-blue-400 transition-colors">CALDIM</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-white/60">
            {[['Home', '/'], ['Life at Caldim', '#life'], ['About', '/about']].map(([label, href]) => (
              <Link key={label} to={href} className="hover:text-white transition-colors duration-200 relative group">
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <a
              href={`${import.meta.env.VITE_RIMS_FRONTEND_URL || 'http://localhost:3003'}/jobs`}
              className="hover:text-white transition-colors duration-200 relative group"
            >
              Find Jobs
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300" />
            </a>
          </div>


          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link to="/careers/login" className="hidden md:block px-5 py-2.5 text-sm font-bold text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-all duration-200">
              Sign In
            </Link>
            <a href={`${RIMS_URL}/jobs`} className="px-5 py-2.5 text-sm font-black text-[#0f172a] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:scale-105">
              Explore Jobs
            </a>
          </div>
        </div>
      </motion.nav>
  );
};

/* ─────────────────────────────────────────────
   SECTION 1 — CINEMATIC HERO
───────────────────────────────────────────── */
const CAREERS_API = import.meta.env.VITE_CAREERS_API_URL || 'http://localhost:10000';
const RIMS_URL = import.meta.env.VITE_RIMS_FRONTEND_URL || 'http://localhost:3000';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [locationInput, setLocationInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const recommendations = ['Chennai', 'Hosur'];

  const categories = ['Software Engineering', 'Civil & Structural', 'Mechanical', 'HR Operations'];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1d]">

      {/* True 50/50 Split Background Hero Container */}
      <div className="relative z-10 w-full min-h-[90vh] flex flex-col pt-24 pb-12">
        {/* Background Image Halves (Absolute to cover full area) */}
        <div className="absolute inset-0 flex w-full h-full z-0 overflow-hidden">
          {/* Left Half: Civil */}
          <div className="relative w-1/2 h-full">
            <img src="/images/hero-civil.jpg" alt="Civil Engineering Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/70 to-[#020617]/40"></div>
            
            {/* Civil Label */}
            <div className="absolute bottom-10 md:bottom-24 left-6 md:left-12 z-20">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 shadow-lg inline-flex items-center gap-2">
                <HardHat size={16} className="text-blue-400" />
                <span className="text-white font-bold text-xs tracking-widest uppercase">Civil</span>
              </div>
            </div>
          </div>
          
          {/* Right Half: Software */}
          <div className="relative w-1/2 h-full">
            <img src="/images/hero-software.jpg" alt="Software Engineering Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#020617]/95 via-[#020617]/70 to-[#020617]/40"></div>
            
            {/* Software Label */}
            <div className="absolute bottom-10 md:bottom-24 right-6 md:right-12 z-20">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 shadow-lg inline-flex items-center gap-2">
                <Code2 size={16} className="text-cyan-400" />
                <span className="text-white font-bold text-xs tracking-widest uppercase">Software</span>
              </div>
            </div>
          </div>

          {/* Center Dividing Line Overlay */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2 z-10"></div>
        </div>

        {/* Centered Overlay Text Container */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full px-6 pointer-events-none">
          <motion.div style={{ y, opacity }} className="w-full max-w-4xl text-center flex flex-col items-center pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex flex-row items-center justify-center gap-2 px-6 py-1.5 rounded-full border border-blue-500/20 bg-[#0f172a]/80 backdrop-blur-md text-blue-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-10 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Global Engineering Careers · 2024
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-[100px] font-black text-white leading-[1.05] tracking-tight mb-8 drop-shadow-2xl"
            >
              Engineer the
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-[#38bdf8] to-blue-500 pb-2 drop-shadow-md">
                Impossible.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-sm md:text-lg text-white/80 max-w-2xl text-center leading-relaxed font-medium drop-shadow-lg"
            >
              Join a global team of engineers and innovators building the structural and digital infrastructure of tomorrow.
            </motion.p>
          </motion.div>
        </div>

        {/* Search Bar - Center Overlay exactly matching screenshot style */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40 w-full px-6 flex flex-col items-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="w-full max-w-[800px] mb-4 pointer-events-auto"
          >
            <div className="flex flex-col md:flex-row bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-1.5">
              <div className="flex-1 flex items-center px-4 py-3 md:py-4 border-b md:border-b-0 md:border-r border-white/5">
                <Search className="text-blue-400/70 mr-3" size={18} />
                <input
                  type="text"
                  placeholder="Job title, skill, or keyword..."
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  className="w-full bg-transparent text-white text-sm outline-none placeholder:text-white/30 font-medium"
                />
              </div>
              <div className="flex-1 relative flex items-center px-4 py-3 md:py-4">
                <MapPin className="text-cyan-400/70 mr-3" size={18} />
                <input
                  type="text"
                  placeholder="City, country, or Remote..."
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full bg-transparent text-white text-sm outline-none placeholder:text-white/30 font-medium"
                />

                {/* Recommendations Dropdown */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute bottom-full left-0 right-0 mb-2 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 p-2"
                    >
                      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-3 py-2">Suggested Locations</div>
                      {recommendations.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setLocationInput(loc);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-3"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                          {loc}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button 
                onClick={() => {
                  const query = new URLSearchParams({ keyword: keywordInput, location: locationInput }).toString();
                  window.location.href = `${RIMS_URL}/jobs?${query}`;
                }}
                className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#020617] px-8 py-3.5 md:py-4 rounded-xl md:rounded-[14px] font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.2)] ml-0 md:ml-1 mt-2 md:mt-0"
              >
                Search Opportunities
              </button>
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap justify-center gap-3 pointer-events-auto"
          >
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                whileHover={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                className="px-6 py-2.5 rounded-full border border-white/10 bg-[#0f172a]/95 backdrop-blur-md text-white/70 text-xs font-bold transition-all cursor-pointer shadow-sm hover:shadow-md hover:text-white"
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs uppercase tracking-[0.2em] font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-blue-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 2 — ENGINEERING INNOVATION (Counters)
───────────────────────────────────────────── */
const InnovationSection = () => {
  const stats = [
    { num: 10, suffix: ' Years', label: 'Engineering Heritage' },
    { num: 500, suffix: '+', label: 'Global Projects' },
    { num: 2024, suffix: '', label: 'Digital Genesis' },
    { num: 200, suffix: '+', label: 'Elite Professionals' },
  ];

  return (
    <section className="py-32 md:py-40 bg-[#0f172a] relative overflow-hidden flex flex-col items-center justify-center border-t border-b border-white/[0.04]">
      {/* Dark gradient atmospheres */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-blue-900/5 to-[#0f172a] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
        {/* Cinematic Header */}
        <div className="max-w-4xl mx-auto mb-20 md:mb-28">
          <Reveal className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Who We Are
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
              Caldim is an
              <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-[#38bdf8] to-blue-500 drop-shadow-lg px-2"> Engineering Innovation </span> 
              Company.
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10 font-medium tracking-wide">
              We operate at the intersection of structural engineering and software development, delivering precision-driven solutions to the world's most complex infrastructure challenges.
            </p>
          </Reveal>
          
          <Reveal delay={0.3} className="flex justify-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-cyan-400 font-bold hover:text-white transition-colors group text-sm uppercase tracking-widest"
            >
              Discover our story
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </Reveal>
        </div>

        {/* Full-width Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 pt-16 border-t border-white/5 w-full">
          {stats.map((stat, i) => (
            <Reveal key={i} delay={0.1 * i + 0.3} className="flex flex-col items-center group">
              <div className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-6 tracking-tighter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <Counter end={stat.num} suffix={stat.suffix} />
              </div>
              <div className="w-8 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 mb-6 transition-all duration-500 group-hover:w-20" />
          <p className="text-blue-200/50 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-center max-w-[160px] leading-relaxed">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 3 — WHY CALDIM (TCS Inspired Layout)
───────────────────────────────────────────── */
const WhyCaldimSection = () => {
  const [active, setActive] = useState(0);

  const tabs = [
    {
      title: 'Impact',
      contentTitle: 'Leading with purpose',
      content: 'Through the application of innovation and our contextual knowledge, we give associates the opportunity to deliver transformative outcomes that benefit society at large and prove that anything is possible.',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=900&h=600',
    },
    {
      title: 'Development',
      contentTitle: 'Master your craft',
      content: 'Continuous learning is in our DNA. We invest deeply in your growth through global project exposure, hands-on architectural problem solving, and dedicated internal workshops that keep you ahead of the curve.',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=900&h=600',
    },
    {
      title: 'Support',
      contentTitle: 'A culture of care',
      content: 'A collaborative, ego-free workplace where leadership listens and mentorship is practiced daily. We support your mental and professional well-being through flexible arrangements and open communication.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=900&h=600',
    },
    {
      title: 'Progress',
      contentTitle: 'Merit-based momentum',
      content: 'Clear, merit-based career paths. We promote from within, recognizing talent, leadership, and technical excellence over tenure. You own your runway to achieve your highest ambitions.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=900&h=600',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#1e293b] relative">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Left Aligned Section Title */}
        <Reveal className="mb-14">
          <h2 className="text-[32px] md:text-[36px] font-normal text-white tracking-wide">
            Why Caldim
          </h2>
        </Reveal>

        {/* Centered Tab Menu with continuous bottom border */}
        <div className="relative mb-20 w-full overflow-x-auto hide-scrollbar">
          {/* Continuous Faint Border */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
          
          <div className="flex justify-between items-center w-full min-w-[600px] relative z-10">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`pb-4 text-[14px] font-medium transition-all duration-300 relative text-center flex-1 px-4 ${
                  active === i
                    ? 'text-white'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                {/* Active Indicator Line */}
                {active === i && (
                  <motion.div
                    layoutId="whyCaldimTab"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Layout - tighter matching screenshot */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center lg:items-center w-full"
          >
            {/* Image Container (Left) */}
            <div className="relative rounded-[20px] overflow-hidden w-full md:w-[500px] h-[350px] shrink-0">
              <img
                src={tabs[active].image}
                alt={tabs[active].contentTitle}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Content Text (Right) - Vertically centered */}
            <div className="space-y-6 flex-1 max-w-[450px]">
              <h3 className="text-3xl md:text-[40px] font-normal text-white tracking-wide leading-tight">
                {tabs[active].contentTitle}
              </h3>
              <p className="text-white/60 text-[15px] md:text-[16px] leading-[1.8] font-normal">
                {tabs[active].content}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
        
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 4 — LIFE AT CALDIM
───────────────────────────────────────────── */
const LifeAtCaldim = () => {
  const images = [
    { src: '/images/life-1.jpg', label: 'Level Up Your AI Skills!'},
    { src: '/images/life-2.jpg', label: 'Strategy sessions mapping ideas'},
    { src: '/images/life-3.jpg', label: 'Attitudes That Are Holding You Back'},
  ];

  return (
    <section id="life" className="py-32 bg-[#0f172a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            Life at Caldim
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Culture of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Excellence</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">A collaborative environment where engineers ship great work, grow fast, and build a lasting legacy.</p>
        </Reveal>

        {/* Bento-style 3-Image Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[700px] max-w-5xl mx-auto">
          
          {/* Main Large Image (Left) */}
          <Reveal delay={0.1} className="relative rounded-3xl overflow-hidden group h-full">
            <img src={images[0].src} alt={images[0].label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Featured Insight</span>
              <h3 className="text-white text-2xl font-bold leading-snug">{images[0].label}</h3>
            </div>
          </Reveal>

          {/* Right Column Stack */}
          <div className="grid grid-rows-2 gap-4 h-full">
            
            {/* Top Right Image */}
            <Reveal delay={0.2} className="relative rounded-3xl overflow-hidden group h-full">
              <img src={images[1].src} alt={images[1].label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Team Collaboration</span>
                <h3 className="text-white text-xl font-bold leading-snug">{images[1].label}</h3>
              </div>
            </Reveal>

            {/* Bottom Right Image */}
            <Reveal delay={0.3} className="relative rounded-3xl overflow-hidden group h-full">
              <img src={images[2].src} alt={images[2].label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Professional Growth</span>
                <h3 className="text-white text-xl font-bold leading-snug">{images[2].label}</h3>
              </div>
            </Reveal>
            
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 5 — LEARNING EXPERIENCE (LEX)
───────────────────────────────────────────── */
const LEXSection = () => {
  const steps = [
    {
      icon: Target,
      title: 'Project Exposure',
      desc: 'From your first week, you work on real projects with global clients. No sandbox environments — only live, consequential engineering work.',
      color: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    },
    {
      icon: Users,
      title: 'Engineering Collaboration',
      desc: 'Work alongside senior engineers, structural detailers, and software developers in cross-functional teams that accelerate your core expertise.',
      color: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    },
    {
      icon: Star,
      title: 'Technical Mentorship',
      desc: 'Every engineer at Caldim is paired with a senior mentor who actively guides technical decision-making, reviews, and architectural thinking.',
      color: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      desc: 'Clear pathways to senior engineering, specialization, and leadership. We grow people, not just products.',
      color: 'bg-green-500/10 border-green-500/30 text-green-400',
    },
  ];

  return (
    <section className="py-32 bg-[#1e293b] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-20">
          <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
            Learning Experience — LEX
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Growth Through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Real Work.</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            We don't run training programmes. Growth at Caldim is experiential — earned through solving real engineering challenges alongside world-class teams.
          </p>
        </Reveal>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal connecting line (desktop) */}
          <div className="hidden md:block absolute top-[52px] left-[10%] w-[80%] h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="relative flex flex-col items-center md:items-start text-center md:text-left group">
                  {/* Step number bubble */}
                  <div className="relative z-10 w-[104px] h-[104px] mb-8 flex flex-col items-center justify-center">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${step.color}`}>
                      <step.icon size={24} />
                    </div>
                    <div className="mt-2 w-5 h-5 rounded-full bg-[#06101f] border-2 border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 6 — TECHNOLOGY DOMAINS
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   SECTION 6.5 — CIVIL SPOTLIGHT (Deep Dive)
───────────────────────────────────────────── */
const EvolutionBridge = () => (
  <section className="py-24 bg-[#1e293b] relative overflow-hidden flex justify-center">
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <Reveal>
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-10">
          <div className="hidden sm:block h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-orange-500/50" />
          <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
          
          <div className="px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
             <span className="text-white/40 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">The Evolution</span>
          </div>

          <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]" />
          <div className="hidden sm:block h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-cyan-500/50" />
        </div>
        
        <h3 className="text-2xl md:text-4xl font-light text-white leading-tight mb-6 tracking-tight">
          Physical <span className="text-orange-400 font-black italic">Heritage</span>. <br />
          Digital <span className="text-cyan-400 font-black italic">Frontier</span>.
        </h3>
        
        <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
          Our structural heritage isn't just history—it's the algorithm. We've spent nearly 10 years mastering the physics of steel and concrete, so that our software division can automate it with absolute authority.
        </p>
      </Reveal>
    </div>
    
    {/* Subtle connect line background */}
    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
  </section>
);

const CivilSpotlightSection = ({ goToTech }) => {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0f172a] overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Content Side */}
          <div className="space-y-6 md:space-y-10 order-2 lg:order-1">
            <Reveal>
              <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-[10px] font-black uppercase tracking-[0.3em]">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  Civil & Structural Spotlight
                </div>
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] border-l border-white/10 pl-4">
                  A Decade of Excellence
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight">
                The Art of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-600">
                  Structural <br /> Precision.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-white/50 text-base md:text-xl lg:text-2xl leading-relaxed max-w-xl font-medium">
                At Caldim, civil engineering isn't just about drafting. It's about designing the invisible frameworks that sustain global cities.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="pt-2 md:pt-6">
              <div className="grid grid-cols-2 gap-4 md:gap-8 border-t border-white/10 pt-6 md:pt-10">
                <div className="space-y-2">
                  <h4 className="text-orange-400 font-bold uppercase tracking-widest text-xs">Unrivaled Scale</h4>
                  <p className="text-white/40 text-xs md:text-sm leading-relaxed">Modeling complex high-rise frameworks and industrial hubs delivered with millimeter accuracy.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-amber-400 font-bold uppercase tracking-widest text-xs">Core Resilience</h4>
                  <p className="text-white/40 text-xs md:text-sm leading-relaxed">Specializing in seismic-ready structures that stand the test of time and nature.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4} className="pt-2 md:pt-4">
               <button 
                onClick={() => goToTech(0)}
                className="group flex items-center gap-4 text-white font-black uppercase tracking-[0.3em] text-xs hover:text-orange-400 transition-colors">
                  View Structural Tech Stack
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all">
                     <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
               </button>
            </Reveal>
          </div>

          {/* Image Side (Magazine Style Collage) */}
          <div className="relative h-[320px] md:h-[600px] lg:h-[800px] order-1 lg:order-2">
            {/* Main Image */}
            <Reveal delay={0.2} className="absolute inset-0 w-full h-full rounded-[24px] md:rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
              <img src="/images/civil-1.jpg" alt="Structural Engineering Grid" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent" />
            </Reveal>

            {/* Floating Image 2 — only on desktop */}
            <Reveal delay={0.4} y={60} className="absolute -bottom-4 -left-12 w-64 h-80 rounded-3xl overflow-hidden border-4 border-[#0f172a] shadow-2xl hidden lg:block">
              <img src="/images/civil-2.jpg" alt="Engineer at work" className="w-full h-full object-cover" />
            </Reveal>

            {/* Floating Image 3 — only on desktop */}
            <Reveal delay={0.6} y={-40} className="absolute top-12 -right-8 w-48 h-48 rounded-2xl overflow-hidden border-4 border-[#0f172a] shadow-2xl hidden lg:block">
               <img src="/images/civil-3.jpg" alt="CAD Detail" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-orange-600/20 mix-blend-overlay" />
            </Reveal>

            {/* Technical Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 hidden md:block">
               <svg width="400" height="400" className="text-orange-500">
                  <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 10" />
                  <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
               </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 6.6 — SOFTWARE SPOTLIGHT (Deep Dive)
───────────────────────────────────────────── */
const SoftwareSpotlightSection = ({ goToTech }) => {
  return (
    <section className="relative min-h-screen flex items-center bg-[#1e293b] overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Image Side (Magazine Style Collage) */}
          <div className="relative h-[320px] md:h-[600px] lg:h-[800px]">
            {/* Main Image */}
            <Reveal delay={0.2} className="absolute inset-0 w-full h-full rounded-[24px] md:rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
              <img src="/images/software-1.jpg" alt="Digital Infrastructure Network" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/80 via-transparent to-transparent" />
            </Reveal>

            {/* Floating Image 2 — only on desktop */}
            <Reveal delay={0.4} y={60} className="absolute -bottom-4 -right-12 w-64 h-80 rounded-3xl overflow-hidden border-4 border-[#1e293b] shadow-2xl hidden lg:block">
              <img src="/images/software-2.jpg" alt="Developer coding" className="w-full h-full object-cover" />
            </Reveal>

            {/* Floating Image 3 — only on desktop */}
            <Reveal delay={0.6} y={-40} className="absolute top-12 -left-8 w-48 h-48 rounded-2xl overflow-hidden border-4 border-[#1e293b] shadow-2xl hidden lg:block">
               <img src="/images/software-3.jpg" alt="System Architecture" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-cyan-600/20 mix-blend-overlay" />
            </Reveal>

            {/* Technical Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 hidden md:block">
               <svg width="400" height="400" className="text-cyan-500 animate-pulse">
                  <path d="M50 200 L350 200 M200 50 L200 350" stroke="currentColor" strokeWidth="0.5" />
                  <rect x="100" y="100" width="200" height="200" fill="none" stroke="currentColor" strokeWidth="0.5" />
               </svg>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6 md:space-y-10">
            <Reveal>
              <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em]">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  Software & Digital Spotlight
                </div>
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] border-l border-white/10 pl-4">
                  Digital Genesis — 2024
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight">
                The Logic of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-500">
                  Global <br /> Automation.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-white/50 text-base md:text-xl lg:text-2xl leading-relaxed max-w-xl font-medium">
                We deliver <span className="text-white">End-to-End</span> digital solutions. From specialized engineering automation to enterprise-scale web, mobile, and cloud software services.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="pt-2 md:pt-6">
              <div className="grid grid-cols-2 gap-4 md:gap-8 border-t border-white/10 pt-6 md:pt-10">
                <div className="space-y-2">
                  <h4 className="text-cyan-400 font-bold uppercase tracking-widest text-xs">End-to-End Lyfecycle</h4>
                  <p className="text-white/40 text-xs md:text-sm leading-relaxed">Strategic consulting, architecture, development, and maintenance under one roof.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Omnichannel Solutions</h4>
                  <p className="text-white/40 text-xs md:text-sm leading-relaxed">Seamless delivery across Web, Android, iOS, and high-performance Desktop platforms.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4} className="pt-2 md:pt-4">
               <button 
                onClick={() => goToTech(1)}
                className="group flex items-center gap-4 text-white font-black uppercase tracking-[0.3em] text-xs hover:text-cyan-400 transition-colors">
                  Explore Software Tech Stack
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all">
                     <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
               </button>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

const TechDomainsSection = ({ active, setActive }) => {
  const domains = [
    {
      icon: HardHat,
      title: 'Civil & Structural',
      tag: 'Core Engineering',
      desc: 'Mastering the art of structural detailing and seismic-resilient modeling at a global scale.',
      gradient: 'from-orange-500/20 via-orange-500/5 to-transparent',
      accent: 'orange',
      tech: [
        { name: 'Tekla Structures', icon: Layers },
        { name: 'SDS/2 Detailing', icon: Cpu },
        { name: 'Rebar Connectivity', icon: BarChart3 },
        { name: 'BIM Integration', icon: Globe },
      ],
      roles: ['BIM Specialist', 'Structural Detailer', 'Civil Coordinator', 'Bridge Engineer']
    },
    {
      icon: Code2,
      title: 'Software & Digital',
      tag: 'Tech Innovation',
      desc: 'Providing end-to-end full-stack services that transform complex business logic into high-impact digital products.',
      gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
      accent: 'blue',
      tech: [
        { name: 'End-to-End Web', icon: Code2 },
        { name: 'Mobile (iOS/Android)', icon: Zap },
        { name: 'UI/UX & Product', icon: Layers },
        { name: 'Cloud & DevOps', icon: Globe },
      ],
      roles: ['Full Stack Dev', 'Automation Architect', 'Product Engineer', 'DevOps Lead']
    },
  ];

  return (
    <section id="tech-domains" className="py-32 bg-[#1e293b] relative overflow-hidden">
      {/* Background Dynamic Glow */}
      <div className={`absolute top-0 right-0 w-[800px] h-[800px] blur-[150px] rounded-full opacity-10 transition-all duration-1000 ${active === 0 ? 'bg-orange-500 translate-x-1/2' : 'bg-blue-500 -translate-x-1/4'}`} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                Technology Domains
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Scale Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Expertise.</span>
              </h2>
            </Reveal>
          </div>

          {/* High-end Domain Toggle */}
          <div className="bg-white/5 p-1.5 rounded-2xl border border-white/10 flex gap-2">
            {domains.map((d, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-500 relative ${
                  active === i ? 'text-[#1e293b]' : 'text-white/40 hover:text-white/60'
                }`}
              >
                {active === i && (
                  <motion.div
                    layoutId="techTab"
                    className="absolute inset-0 bg-white rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <d.icon size={14} />
                  {d.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Domain Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-8">
              <div className={`inline-block px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 border border-white/10 ${active === 0 ? 'text-orange-400' : 'text-blue-400'}`}>
                {domains[active].tag}
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {domains[active].title}
              </h3>
              <p className="text-white/50 text-xl leading-relaxed max-w-xl">
                {domains[active].desc}
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-6">
                {domains[active].tech.map((t, ti) => (
                  <div key={ti} className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 group hover:border-white/20 transition-all duration-300">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-all ${active === 0 ? 'group-hover:bg-orange-500/20' : 'group-hover:bg-blue-500/20'}`}>
                      <t.icon size={18} />
                    </div>
                    <span className="text-sm font-bold text-white/70">{t.name}</span>
                  </div>
                ))}
              </div>

              {/* Career Tracks area */}
              <div className="pt-8 border-t border-white/5">
                <p className="text-white/30 text-[10px] uppercase font-black tracking-widest mb-6">Critical Success Roles</p>
                <div className="flex flex-wrap gap-3">
                   {domains[active].roles.map((role, ri) => (
                     <div key={ri} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-bold hover:bg-white/10 hover:text-white transition-all cursor-default">
                        {role}
                     </div>
                   ))}
                </div>
              </div>
            </div>

            <div className="relative aspect-square rounded-[40px] overflow-hidden group">
               <div className={`absolute inset-0 bg-gradient-to-br ${domains[active].gradient} mix-blend-overlay z-10`} />
                <motion.img 
                   key={active}
                   initial={{ scale: 1.1, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ duration: 1 }}
                   src={active === 0 ? '/images/tech-civil.jpg' : '/images/tech-software.jpg'} 
                   className="w-full h-full object-cover transition-all duration-1000"
                   alt={domains[active].title}
                />
               <div className="absolute inset-0 p-12 flex flex-col justify-end z-20">
                  <div className="w-16 h-1 w-full bg-white/20 mb-6" />
                  <p className="text-white font-black uppercase tracking-[0.4em] text-xs">Innovation Trail</p>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 7 — INTERACTIVE ENGINEERING VISUAL
───────────────────────────────────────────── */
const EngineeringShowcase = () => (
  <section className="py-32 bg-[#0f172a] relative overflow-hidden">
    {/* Animated structural wireframe background */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Structural Frame Lines */}
        {[
          'M 200 100 L 700 100 L 700 500 L 200 500 Z',
          'M 200 100 L 700 500',
          'M 700 100 L 200 500',
          'M 450 100 L 450 500',
          'M 200 300 L 700 300',
          'M 740 150 L 1240 150 L 1240 450 L 740 450 Z',
          'M 740 150 L 1240 450',
          'M 990 150 L 990 450',
          'M 740 300 L 1240 300',
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, delay: i * 0.2, ease: 'easeInOut' }}
          />
        ))}
        {/* Corner node dots */}
        {[[200,100],[700,100],[200,500],[700,500],[740,150],[1240,150],[740,450],[1240,450]].map(([cx,cy],i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r="5"
            fill="#60a5fa"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.7, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 2 + i * 0.1 }}
          />
        ))}
      </svg>
    </div>

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <Reveal className="text-center">
        <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
          Engineering Showcase
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
          Precision. Scale. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Innovation.</span>
        </h2>
        <p className="text-white/40 max-w-xl mx-auto text-lg mb-12">
          We model complexity and deliver clarity. Every structural frame, every system we automate reflects decades of engineering discipline.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {[['CAD-Precision Structural Models', Award], ['Real-time Project Dashboards', BarChart3], ['Global Delivery Standards', Globe]].map(([label, Icon], i) => (
            <Reveal key={i} delay={0.1 * i} className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
              <Icon size={20} className="text-blue-400" />
              <span className="text-white/70 font-semibold text-sm">{label}</span>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SECTION 8 — CAREER PATH (Vertical Timeline)
───────────────────────────────────────────── */
const CareerPathSection = () => {
  const path = [
    { role: 'Junior Engineer', desc: 'Learn the fundamentals. Gain exposure to live projects. Build speed and precision.', index: '01' },
    { role: 'Detailing Engineer / Developer', desc: 'Specialize. Deliver independently. Own sub-components of major projects.', index: '02' },
    { role: 'Senior Engineer', desc: 'Lead complex engineering tasks. Mentor juniors. Drive quality across deliverables.', index: '03' },
    { role: 'Project Lead', desc: 'Manage end-to-end project delivery. Build client relationships. Coordinate cross-functional teams.', index: '04' },
    { role: 'Engineering Manager', desc: 'Scale teams, strategy, and impact. Shape the technical roadmap and culture of Caldim.', index: '05' },
  ];

  return (
    <section className="py-32 bg-[#1e293b] relative">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal className="text-center mb-20">
          <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            Career Trajectory
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Your Path to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"> Leadership</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">A clear, merit-based journey from your first day to leading engineering at a global scale.</p>
        </Reveal>

        <div className="relative space-y-0">
          {/* Continuous vertical line */}
          <div className="absolute left-[28px] top-8 bottom-8 w-px bg-gradient-to-b from-blue-500/80 via-blue-500/40 to-transparent" />

          {path.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="relative flex gap-8 group pb-12 last:pb-0">
                {/* Timeline node */}
                <div className="relative z-10 shrink-0 w-14 h-14 rounded-full bg-[#1e293b] border-2 border-blue-500/60 group-hover:border-blue-400 flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                  <span className="text-blue-400 text-xs font-black">{item.index}</span>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white/5 border border-white/5 group-hover:border-blue-500/30 rounded-3xl p-7 transition-all duration-300 group-hover:bg-white/[0.07]">
                  <h3 className="text-xl font-black text-white mb-2 group-hover:text-blue-300 transition-colors">{item.role}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 9 — GLOBAL OPPORTUNITIES (Job Cards)
───────────────────────────────────────────── */
const JobsSection = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const CAREERS_API = import.meta.env.VITE_CAREERS_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${CAREERS_API}/api/jobs/public`)
      .then(res => res.json())
      .then(json => {
        setJobs(Array.isArray(json) ? json.slice(0, 6) : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Home Jobs Error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-32 bg-[#1e293b] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/8 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <Reveal>
            <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Current Openings
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Join Our Global <br />Engineering Team
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <a href={`${RIMS_URL}/jobs`} className="group flex items-center gap-3 text-white/60 font-medium hover:text-white transition-all duration-300 pb-2 border-b border-white/10 hover:border-blue-500">
              View all opportunities
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 rounded-[32px] bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, i) => {
              const Icon = job.domain?.toLowerCase().includes('software') ? Code2 : HardHat;
              const color = job.domain?.toLowerCase().includes('software') ? 'text-blue-400' : 'text-orange-400';
              const bg = job.domain?.toLowerCase().includes('software') ? 'bg-blue-500/10' : 'bg-orange-500/10';

              return (
                <Reveal key={i} delay={i * 0.08}>
                  <a href={`${RIMS_URL}/jobs/${job.id}`} className="group relative p-8 rounded-[32px] bg-[#0f172a] border border-white/8 hover:border-blue-500/40 hover:bg-[#162032] transition-all duration-500 flex flex-col h-full overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-8">
                        <div className={`p-3 rounded-2xl ${bg} ${color} shadow-lg shadow-blue-500/5`}>
                          <Icon size={24} />
                        </div>
                        <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest pt-2">{job.job_type}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors leading-tight uppercase">{job.title}</h3>
                      <p className="text-white/40 text-sm font-medium mb-10">{job.domain || 'Engineering'}</p>

                      <div className="mt-auto pt-8 border-t border-white/[0.04] flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/50 text-xs">
                          <MapPin size={14} className="text-blue-400/70" />
                          <span>{job.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest group/btn">
                          <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">View</span>
                          <div className="w-8 h-8 rounded-full bg-white/8 border border-white/15 flex items-center justify-center group-hover/btn:bg-blue-500 group-hover/btn:border-blue-400 group-hover/btn:scale-110 transition-all duration-300">
                            <ArrowRight size={14} className="group-hover/btn:text-white text-white/50" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 9.5 — RESTART YOUR CAREER (Women Program)
   Compact teaser — full details on /careers/restart
───────────────────────────────────────────── */
const RestartCareerSection = () => (
  <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
    {/* Warm decorative blobs */}
    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-200/40 blur-[120px] rounded-full pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-pink-200/30 blur-[100px] rounded-full pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <Reveal>
        <div className="bg-white border border-purple-100 rounded-[40px] p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 shadow-xl shadow-purple-100/40 hover:shadow-purple-200/60 transition-all duration-700 group">

          {/* Left — Text */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-200 bg-purple-50 text-purple-600 text-[10px] font-black uppercase tracking-[0.3em]">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              Special Initiative · For Women in Engineering
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Your Break Didn't <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600">
                Break Your Career.
              </span>
            </h2>

            <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-xl font-medium">
              The <strong className="text-purple-600">Restart with Caldim</strong> program is built for women engineers returning after a career break — with mentorship, flexible hours, equal pay, and a team that truly sees your worth.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <Link
                to="/careers/restart"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black uppercase tracking-[0.2em] text-xs rounded-full shadow-lg shadow-purple-200 hover:scale-105 hover:shadow-purple-300 transition-all duration-300 group/btn"
              >
                Explore the Program
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <span className="text-slate-400 text-xs font-bold">Mentorship · Flexibility · Equal Pay</span>
            </div>
          </div>

          {/* Right — Visual Quote */}
          <div className="w-full md:w-[320px] shrink-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-[28px] p-8 text-white relative overflow-hidden shadow-xl shadow-purple-300/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <div className="text-4xl font-black text-white/15 leading-none mb-3">"</div>
            <p className="text-sm md:text-base font-medium leading-relaxed text-white/90 italic mb-6">
              Caldim didn't just give me a job — they gave me back my identity as an engineer.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-black text-xs">P</div>
              <div>
                <p className="font-black text-xs">Priya Subramanian</p>
                <p className="text-white/50 text-[10px]">Restart Cohort 2024</p>
              </div>
            </div>
          </div>

        </div>
      </Reveal>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SECTION 10 — CALL TO ACTION
───────────────────────────────────────────── */
const CTASection = () => (
  <section className="relative py-40 overflow-hidden bg-[#0f172a]">
    {/* Blueprint background pattern */}
    <div className="absolute inset-0 pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ctaGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#60a5fa" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ctaGrid)" />
      </svg>
      {/* Floating map ping for Chennai & Hosur */}
      <div className="hidden lg:block absolute right-24 top-1/2 -translate-y-1/2 w-[400px] h-[300px] opacity-20">
         <svg viewBox="0 0 300 200" className="w-full h-full text-blue-500">
            <path d="M50,40 Q150,0 250,40 T250,160 Q150,200 50,160 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            {/* Chennai Ping */}
            <motion.circle cx="150" cy="80" r="4" fill="#3b82f6" animate={{ r: [4, 10, 4], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <text x="165" y="85" fill="white" fontSize="10" fontWeight="bold">CHENNAI</text>
            {/* Hosur Ping */}
            <motion.circle cx="100" cy="120" r="4" fill="#3b82f6" animate={{ r: [4, 10, 4], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
            <text x="115" y="125" fill="white" fontSize="10" fontWeight="bold">HOSUR</text>
         </svg>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />
    </div>

    <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
      <Reveal>
        <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-10">
          Ready to Build?
        </div>
        <h2 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tight">
          Build the Future
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
            with Caldim.
          </span>
        </h2>
        <p className="text-white/40 text-xl max-w-2xl mx-auto mb-14 leading-relaxed">
          Based in Chennai & Hosur, we are shipping global infrastructure. Join the elite team that engineers what matters.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={`${import.meta.env.VITE_RIMS_FRONTEND_URL || 'http://localhost:3003'}/jobs`}
            className="px-12 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black uppercase tracking-widest text-sm rounded-full shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/60 hover:scale-105 transition-all duration-200"
          >
            Explore Careers
          </a>
          <Link
            to="/about"
            className="px-12 py-5 bg-transparent border-2 border-white/20 text-white font-black uppercase tracking-widest text-sm rounded-full hover:border-white/50 hover:bg-white/5 transition-all duration-200"
          >
            Our Story
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);


/* ─────────────────────────────────────────────
   ROOT PAGE COMPONENT
───────────────────────────────────────────── */
const CareersPage = () => {
  const { scrollYProgress } = useScroll();
  const [activeTechTab, setActiveTechTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Careers at Caldim — Engineer the Impossible';
  }, []);

  const goToTech = (index) => {
    setActiveTechTab(index);
    document.getElementById('tech-domains')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans antialiased overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
      {/* Premium Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <CareersNavbar />
      <HeroSection />
      <InnovationSection />
      <WhyCaldimSection />
      <LifeAtCaldim />
      <CivilSpotlightSection goToTech={goToTech} />
      <EvolutionBridge />
      <SoftwareSpotlightSection goToTech={goToTech} />
      <RestartCareerSection />
      <LEXSection />
      <TechDomainsSection active={activeTechTab} setActive={setActiveTechTab} />
      <EngineeringShowcase />
      <CareerPathSection />
      <JobsSection />
      <CTASection />
      <CareersFooter />
    </div>
  );
};

export default CareersPage;
