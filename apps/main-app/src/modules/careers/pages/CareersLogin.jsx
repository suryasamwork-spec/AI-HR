import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import CareersLayout from '@/modules/careers/components/CareersLayout';
import caldimLogo from '@/assets/caldim-logo-new.png';

const CAREERS_API = import.meta.env.VITE_CAREERS_API_URL || 'http://localhost:8000';

const CareersLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${CAREERS_API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (res.ok) {
        // RIMS returns access_token
        localStorage.setItem('rims_token', json.access_token);
        navigate('/careers');
      } else {
        setError(json.detail || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Connection error. Please ensure the RIMS AI backend is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CareersLayout>
      <div className="pt-32 pb-20 min-h-[80vh] flex items-center justify-center bg-[#f8fafc]">
        <div className="w-full max-w-md px-6">
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-[#001b3a] mb-2 font-serif uppercase tracking-tight">Welcome back</h1>
              <p className="text-slate-400 text-sm">Log in to your Caldim Careers account</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center">
                 {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 py-4 pl-12 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[#001b3a]"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="password" 
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 py-4 pl-12 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[#001b3a]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center cursor-pointer text-slate-500">
                  <input type="checkbox" className="mr-2 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  Remember me
                </label>
                <button type="button" className="text-blue-600 font-bold hover:underline">Forgot password?</button>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#001b3a] text-white font-bold py-4 rounded-xl hover:bg-blue-900 transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Sign In'} <LogIn size={18} className="ml-2" />
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-400 text-sm">
                Don't have an account? 
                <Link to="/careers/register" className="text-blue-600 font-bold ml-2 hover:underline inline-flex items-center">
                  Register <ArrowRight size={14} className="ml-1" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </CareersLayout>
  );
};

export default CareersLogin;
