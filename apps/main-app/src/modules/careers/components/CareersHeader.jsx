import { Link, useLocation } from 'react-router-dom';
import caldimLogo from '@/assets/caldim-logo-new.png';

const RIMS_URL = import.meta.env.VITE_RIMS_FRONTEND_URL || 'http://localhost:3000';

const CareersHeader = () => {
  const location = useLocation();

  const navLinks = [
    { label: 'Careers Home', to: '/careers' },
    { label: 'Find Jobs', href: `${RIMS_URL}/jobs` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/80 backdrop-blur-2xl border-b border-white/10 py-4 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/careers" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <img
              src={caldimLogo}
              alt="Caldim Logo"
              className="w-full h-full object-contain filter brightness-0 invert"
            />
          </div>
          <span className="text-white font-black tracking-[0.2em] text-2xl group-hover:text-blue-400 transition-colors uppercase">CALDIM</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.href ? (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-white/60 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px bg-blue-400 w-0 group-hover:w-full transition-all duration-300" />
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className={`text-sm font-semibold transition-colors relative group ${
                  location.pathname === link.to
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-blue-400 transition-all duration-300 ${location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            )
          ))}
          <Link
            to="/careers/login"
            className="px-5 py-2.5 text-sm font-bold text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-all duration-200"
          >
            Sign In
          </Link>
          <a
            href={`${RIMS_URL}/jobs`}
            className="px-5 py-2.5 text-sm font-black text-[#0f172a] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
          >
            Explore Jobs
          </a>
        </nav>
      </div>
    </header>
  );
};

export default CareersHeader;
