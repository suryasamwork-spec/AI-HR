import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Globe, Target } from 'lucide-react';

const CareersFooter = () => (
  <footer className="bg-gradient-to-b from-[#002B54] to-[#00376b] text-white">
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
              <Building2 size={14} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-[0.2em] text-white uppercase">CALDIM</span>
          </Link>
          <p className="text-blue-100/60 mb-6 leading-relaxed max-w-sm text-sm">
            Building the future, one line of code at a time. Your trusted partner in digital transformation and innovative software solutions.
          </p>
          <div className="flex gap-3">
            {[
              { label: 'LinkedIn', url: 'https://in.linkedin.com/company/caldim-engineering?trk=public_post_feed-actor-name', icon: '🔗' },
              { label: 'YouTube', url: 'https://www.youtube.com/@CaldimEngineering', icon: '▶' },
              { label: 'Instagram', url: 'https://www.instagram.com/caldimengineering/', icon: '📸' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm hover:bg-blue-400 hover:border-blue-400 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-black text-sm uppercase tracking-widest mb-6 text-white">Company</h3>
          <ul className="space-y-4">
            {[
              { name: 'About Us', to: '/about' },
              { name: 'Projects', to: '/projects' },
              { name: 'Careers', to: '/careers' },
              { name: 'Contact', to: '/#contact-section' },
            ].map((l) => (
              <li key={l.name}>
                <Link to={l.to} className="text-blue-100/60 hover:text-blue-400 text-sm transition-all hover:translate-x-1 inline-block duration-200">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-black text-sm uppercase tracking-widest mb-6 text-white">Services</h3>
          <ul className="space-y-4">
            {[
              { name: 'Web Development', to: '/services#web-development' },
              { name: 'AI Solutions', to: '/services#ai-solutions' },
              { name: 'UI/UX Design', to: '/services#ui-ux-design' },
              { name: 'Cloud Services', to: '/services#cloud-services' },
            ].map((l) => (
              <li key={l.name}>
                <Link to={l.to} className="text-blue-100/60 hover:text-blue-400 text-sm transition-all hover:translate-x-1 inline-block duration-200">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="lg:col-span-1">
          <h3 className="font-black text-sm uppercase tracking-widest mb-6 text-white">Contact Us:</h3>
          <p className="text-blue-100/40 text-xs leading-relaxed mb-6">
            Get in touch with our team for expert consultation and business solutions.
          </p>
          <div className="space-y-4">
            {/* Address */}
            <div className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-400/20 transition-colors">
                <MapPin size={14} className="text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-blue-400 opacity-70 mb-0.5">Address:</p>
                <p className="text-xs font-bold text-white/90">Chennai &amp; Hosur, Tamil Nadu, India</p>
              </div>
            </div>
            {/* Email */}
            <a href="mailto:salesandsupport@caldimengg.com" className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-400/20 transition-colors">
                <Globe size={14} className="text-blue-400" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-black uppercase tracking-wider text-blue-400 opacity-70 mb-0.5">Email:</p>
                <p className="text-xs font-bold text-white/90 truncate">salesandsupport@caldimengg.com</p>
              </div>
            </a>
            {/* Phone */}
            <a href="tel:+914344610637" className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-400/20 transition-colors">
                <Target size={14} className="text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-blue-400 opacity-70 mb-0.5">Phone:</p>
                <p className="text-xs font-bold text-white/90">+91 4344-610637</p>
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-blue-100/40 text-xs tracking-wider uppercase font-medium">
          © {new Date().getFullYear()} CALDIM. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
           <Link to="/" className="text-white/30 text-xs hover:text-white/60 transition-colors font-bold">← Visit Caldim.com</Link>
        </div>
        <p className="text-blue-100/40 text-xs tracking-wider uppercase font-medium">
          Developed by <span className="text-blue-400">CALDIM</span>
        </p>
      </div>
    </div>
  </footer>
);

export default CareersFooter;
