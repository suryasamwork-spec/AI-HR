import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Users,
  Zap,
  Calendar,
  ChevronRight,
  Sparkles,
  LifeBuoy,
  Heart,
  CheckCircle,
  Star,
  Quote,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ── Warm Navbar ── */
const RestartNavbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-purple-100 py-4 shadow-sm shadow-purple-100/40">
    <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <Link to="/careers" className="flex items-center gap-2 text-slate-700 font-black tracking-widest text-sm hover:text-purple-600 transition-colors">
        ← Back to Careers
      </Link>
      <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-600 text-[10px] font-black uppercase tracking-[0.2em]">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
        Restart with Caldim · Special Program
      </div>
      <a
        href={`${import.meta.env.VITE_RIMS_FRONTEND_URL || 'http://localhost:3003'}/jobs`}
        className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-lg shadow-purple-200"
      >
        Apply Now
      </a>
    </div>
  </nav>
);

/* ── Testimonial data ── */
const testimonials = [
  {
    quote: "I was away for 3 years caring for my child. Caldim saw my experience, not my gap. Within 6 months I was leading a structural detailing team.",
    name: 'Priya Subramanian',
    role: 'Sr. Structural Engineer · Joined 2024',
    avatar: 'P',
    color: 'bg-purple-500',
  },
  {
    quote: "The mentorship program gave me the technical refresh I needed. I didn't feel like a newcomer — I felt like someone who had been promoted.",
    name: 'Anjali Ramesh',
    role: 'Full Stack Developer · Joined 2024',
    avatar: 'A',
    color: 'bg-pink-500',
  },
  {
    quote: "Flexible hours let me manage school pickups without apologising. I finally found a company that respects both my career and my family.",
    name: 'Deepa Murugesh',
    role: 'Technical Architect · Joined 2023',
    avatar: 'D',
    color: 'bg-indigo-500',
  },
];

const RestartProgramPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Restart with Caldim — For Women Engineers Returning to Work';
    const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const benefits = [
    { icon: '⏰', title: 'Flexible Hours', desc: 'Your schedule, your rules. We work around your life — not the other way around.' },
    { icon: '🤝', title: 'Dedicated Mentor', desc: 'A senior engineer matches with you from day one to guide every step back.' },
    { icon: '💰', title: 'Equal Pay', desc: 'Full market-rate compensation. Your break changes nothing about your worth.' },
    { icon: '🌍', title: 'Remote Friendly', desc: 'Work from home, from your city — wherever you feel most productive.' },
    { icon: '📚', title: 'Skill Refresh', desc: 'Curated technical learning trails to rebuild confidence fast, at your pace.' },
    { icon: '💜', title: 'A Safe Space', desc: 'A judgment-free community of women who have walked the same road.' },
  ];

  const steps = [
    {
      step: '01',
      title: 'Tell Your Story',
      sub: 'A warm, conversational chat with our talent team. No pressure. Just a conversation about your journey.',
      icon: '💬',
    },
    {
      step: '02',
      title: 'Skill Refresh Plan',
      sub: 'We identify what you need and create a personalised learning path — usually just 2–4 weeks.',
      icon: '📋',
    },
    {
      step: '03',
      title: 'Gentle Onboarding',
      sub: '30-day phased onboarding with your mentor. Build confidence before taking full ownership.',
      icon: '🌱',
    },
    {
      step: '04',
      title: 'You Lead',
      sub: 'Own real projects, mentor others, and write the next chapter of your career on your terms.',
      icon: '🚀',
    },
  ];

  const features = [
    {
      icon: Users,
      title: 'Dedicated Mentorship',
      desc: "Every returnee is paired with a senior woman engineer who has been through it. You'll never feel alone navigating this transition.",
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
    },
    {
      icon: Calendar,
      title: 'Flexible Reintegration',
      desc: "Home commitments don't disappear. We offer phased scheduling, flexible hours, and remote-first work to make your return truly sustainable.",
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
    },
    {
      icon: Zap,
      title: 'Skill Refresher Trails',
      desc: 'Curated learning paths in Tekla, SDS/2, React, Cloud, and more. Get back to peak technical confidence faster than you think.',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    {
      icon: LifeBuoy,
      title: 'Supportive Cohort Community',
      desc: "Join a warm community of women who've walked this path. Share, grow, and celebrate each other's wins every week.",
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      border: 'border-teal-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-rose-50 font-sans">
      <RestartNavbar />

      {/* ──────────────────────────────────────────
         HERO — Warm, human, powerful
      ────────────────────────────────────────── */}
      <section className="relative pt-36 pb-0 overflow-hidden">
        {/* Soft background shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-200/40 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-pink-200/30 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text side */}
          <div className="space-y-8 pb-16 lg:pb-32">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-200 bg-white text-purple-600 text-[10px] font-black uppercase tracking-[0.3em] shadow-md shadow-purple-100">
                <Sparkles size={12} className="animate-pulse" />
                A Program Built for You
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
                Your Break Was{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500">
                  Brave.
                </span>
                <br />
                Now Let's Build{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  What's Next.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium max-w-xl">
                Whether you stepped away for family, health, or simply life —
                your experience didn't expire. <strong className="text-purple-700">Restart with Caldim</strong> is
                a dedicated program that welcomes you back with the mentorship,
                flexibility, and respect you deserve.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="flex flex-wrap gap-3">
                {['No judgment', 'Equal pay', 'Flexible schedule', 'Mentor from day 1'].map((tag, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-purple-100 text-slate-600 text-xs font-bold shadow-sm">
                    <CheckCircle size={12} className="text-purple-500" />
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3} className="flex flex-col sm:flex-row gap-4">
              <a
                href={`${import.meta.env.VITE_RIMS_FRONTEND_URL || 'http://localhost:3003'}/jobs`}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black uppercase tracking-[0.2em] text-xs rounded-full shadow-2xl shadow-purple-300 hover:scale-105 hover:shadow-purple-400/60 transition-all duration-300 group"
              >
                Apply to the Program
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 border-2 border-purple-200 text-purple-700 font-black text-xs uppercase tracking-widest rounded-full hover:bg-purple-50 hover:border-purple-300 transition-all"
              >
                Talk to a Mentor First
              </Link>
            </Reveal>
          </div>

          {/* Image side — warm collage */}
          <div className="relative h-[450px] lg:h-[700px] hidden md:block">
            {/* Main image */}
            <Reveal delay={0.2} className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl shadow-purple-200/50">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900&h=1000"
                alt="Woman engineer returning to work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent" />
              {/* Floating quote on image */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white">
                  <Quote size={20} className="text-purple-400 mb-2" />
                  <p className="text-slate-700 font-medium text-sm leading-relaxed italic">
                    "I was away for 3 years. Caldim didn't just give me a job — they gave me back my identity."
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-black text-xs">P</div>
                    <div>
                      <p className="font-black text-slate-800 text-xs">Priya Subramanian</p>
                      <p className="text-purple-500 text-[10px] font-bold">Restart Cohort 2024 · Sr. Structural Engineer</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Floating small image */}
            <Reveal delay={0.5} y={-30} className="absolute -top-6 -right-6 w-36 h-44 rounded-3xl overflow-hidden border-4 border-white shadow-xl hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80&w=300&h=400"
                alt="Woman engineer smiling"
                className="w-full h-full object-cover"
              />
            </Reveal>

            {/* Stats pill */}
            <Reveal delay={0.6} className="absolute -left-8 top-1/3 hidden lg:block">
              <div className="bg-white rounded-3xl px-6 py-5 shadow-xl border border-purple-100">
                <div className="text-3xl font-black text-purple-600 mb-1">92%</div>
                <p className="text-slate-500 text-xs font-bold leading-tight">of returnees<br/>stay beyond year 1</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
         SOCIAL PROOF NUMBERS
      ────────────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-purple-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '40+', label: 'Women Restarted', sub: '…and thriving' },
              { num: '92%', label: 'Retention Rate', sub: 'after year 1' },
              { num: '30', label: 'Day Onboarding', sub: 'at your own pace' },
              { num: '100%', label: 'Equal Pay', sub: 'always, always' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="space-y-1">
                  <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-500">{s.num}</div>
                  <p className="font-black text-slate-800 text-sm">{s.label}</p>
                  <p className="text-slate-400 text-xs">{s.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
         6 BENEFITS — warm cards
      ────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full border border-purple-200 bg-purple-50 text-purple-600 text-[10px] font-black uppercase tracking-[0.3em] mb-5">What You Get</div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Built Around{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Your Life.</span>
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">Every feature of this program was designed by listening to women who came before you.</p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-white border border-purple-100 rounded-3xl p-7 hover:shadow-xl hover:shadow-purple-100/60 hover:-translate-y-1 hover:border-purple-200 transition-all duration-300 group h-full">
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <h4 className="font-black text-slate-800 text-base mb-2 group-hover:text-purple-600 transition-colors">{b.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
         WHY JOIN — Image + Features
      ────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <Reveal className="relative rounded-[40px] overflow-hidden shadow-xl shadow-purple-100">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=900&h=700"
              alt="Supportive team environment"
              className="w-full h-[500px] object-cover"
            />
            {/* Overlaid warm badge */}
            <div className="absolute top-8 left-8 bg-white rounded-2xl px-5 py-3 shadow-lg border border-purple-100">
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-pink-500 fill-pink-500" />
                <span className="font-black text-slate-700 text-sm">You Belong Here</span>
              </div>
            </div>
            {/* Star rating */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-lg border border-purple-50">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                <span className="text-xs font-bold text-slate-500 ml-2">4.9/5 Program Rating</span>
              </div>
              <p className="text-slate-600 text-xs font-medium">"The best decision I made for my career comeback."</p>
            </div>
          </Reveal>

          {/* Features */}
          <div className="space-y-8">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Why Restart <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                  with Caldim?
                </span>
              </h2>
              <p className="text-slate-500 text-base mt-4 leading-relaxed">This isn't just a job. It's a carefully designed re-entry experience built by people who genuinely care.</p>
            </Reveal>

            <div className="space-y-5">
              {features.map((f, i) => (
                <Reveal key={i} delay={0.1 * i}>
                  <div className={`flex gap-5 p-5 rounded-2xl border ${f.border} ${f.bg} group hover:shadow-md transition-all duration-300`}>
                    <div className={`w-12 h-12 shrink-0 rounded-2xl bg-white border ${f.border} ${f.color} flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110`}>
                      <f.icon size={22} />
                    </div>
                    <div>
                      <h4 className={`text-base font-black mb-1 ${f.color}`}>{f.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
         TESTIMONIALS — Auto rotate carousel
      ────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="warmGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#warmGrid)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <div className="text-white/40 text-xs font-black uppercase tracking-[0.4em] mb-4">Their Stories</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-16">
              Real Words from <br />
              <span className="text-pink-300">Real Restarters.</span>
            </h2>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-10 md:p-14"
            >
              <Quote size={40} className="text-pink-300/50 mx-auto mb-6" />
              <p className="text-white text-xl md:text-2xl font-medium leading-relaxed italic mb-10">
                "{testimonials[activeTestimonial].quote}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className={`w-14 h-14 rounded-full ${testimonials[activeTestimonial].color} flex items-center justify-center font-black text-white text-lg shadow-lg`}>
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div className="text-left">
                  <p className="font-black text-white text-base">{testimonials[activeTestimonial].name}</p>
                  <p className="text-white/50 text-sm">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'bg-white w-8' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
         4-STEP JOURNEY
      ────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full border border-purple-200 bg-purple-50 text-purple-600 text-[10px] font-black uppercase tracking-[0.3em] mb-5">How It Works</div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Your Road{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Back.</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">No pressure. No rush. Just a thoughtful, guided path back to the career you love.</p>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-6 md:gap-4 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-purple-200 via-pink-300 to-purple-200" />

            {steps.map((item, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="relative text-center group">
                  {/* Step circle */}
                  <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-white border-2 border-purple-100 flex flex-col items-center justify-center shadow-lg group-hover:shadow-purple-200 group-hover:border-purple-300 group-hover:-translate-y-2 transition-all duration-300">
                    <div className="text-3xl mb-1">{item.icon}</div>
                    <span className="text-purple-400 font-black text-[10px] tracking-widest">{item.step}</span>
                  </div>
                  <h4 className="font-black text-slate-800 text-lg mb-2 group-hover:text-purple-600 transition-colors">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed px-2">{item.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
         CTA — Warm & Inviting
      ────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        {/* Background — warm gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-200/30 blur-[120px] rounded-full" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <div className="text-5xl mb-6">💜</div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] mb-6 tracking-tight">
              Your next chapter{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500">
                starts today.
              </span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              You've been patient, resilient, and strong. Now it's Caldim's turn to show up for you. 
              Take the first step — we promise it's a warm one.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`${import.meta.env.VITE_RIMS_FRONTEND_URL || 'http://localhost:3003'}/jobs`}
                className="inline-flex items-center justify-center gap-3 px-14 py-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black uppercase tracking-[0.2em] text-sm rounded-full shadow-2xl shadow-purple-300 hover:scale-105 hover:shadow-purple-400/60 transition-all duration-300 group"
              >
                View Returnship Roles
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-6 border-2 border-purple-200 text-purple-700 font-black text-sm rounded-full hover:bg-white hover:shadow-lg hover:border-purple-300 transition-all duration-300"
              >
                Ask Us Anything
              </Link>
            </div>

            <p className="mt-8 text-slate-400 text-xs font-bold">No commitment needed · Just a conversation</p>
          </Reveal>
        </div>
      </section>

      {/* ── Warm Footer ── */}
      <footer className="py-10 border-t border-purple-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
            <Heart size={14} className="text-pink-400 fill-pink-400" />
            Caldim Engineering — Restart Initiative
          </div>
          <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Link to="/careers" className="hover:text-purple-600 transition-colors">Main Careers</Link>
            <Link to="/about" className="hover:text-purple-600 transition-colors">About Caldim</Link>
            <Link to="/contact" className="hover:text-purple-600 transition-colors">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RestartProgramPage;
