import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, ArrowRight, CheckCircle } from 'lucide-react';
import CareersLayout from '../../components/careers/CareersLayout';

const CAREERS_API = import.meta.env.VITE_CAREERS_API_URL || 'http://localhost:8000';

const CareersRegister = () => {
  const [formData, setFormData] = useState({ 
    full_name: '', 
    email: '', 
    password: '', 
    confirm_password: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${CAREERS_API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           full_name: formData.full_name,
           email: formData.email,
           password: formData.password
        })
      });

      const json = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(json.detail || 'Registration failed.');
      }
    } catch (err) {
      setError('Connection error. Please ensure RIMS AI is running.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <CareersLayout>
        <div className="pt-32 pb-20 min-h-[80vh] flex items-center justify-center bg-[#f8fafc]">
          <div className="w-full max-w-md px-6 text-center">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
               <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle size={40} />
               </div>
               <h2 className="text-2xl font-bold text-[#001b3a] mb-4 font-serif uppercase tracking-tight">Verified Registration</h2>
               <p className="text-slate-500 mb-8 leading-relaxed text-sm">
                 Account created successfully! For security, please check your email for the OTP to verify your account before logging in.
               </p>
               <Link to="/careers/login" className="inline-flex items-center justify-center px-10 py-4 bg-[#001b3a] text-white font-bold rounded-xl hover:bg-blue-900 transition-all shadow-lg">
                 Go to Login <ArrowRight size={18} className="ml-2" />
               </Link>
            </div>
          </div>
        </div>
      </CareersLayout>
    );
  }

  return (
    <CareersLayout>
      <div className="pt-32 pb-20 min-h-[80vh] flex items-center justify-center bg-[#f8fafc]">
        <div className="w-full max-w-md px-6">
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-[#001b3a] mb-2 font-serif uppercase tracking-tight">Create Account</h1>
              <p className="text-slate-400 text-sm">Join the Caldim AI-powered talent pool</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                 {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" required
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 py-3.5 pl-12 pr-4 rounded-xl focus:outline-none focus:border-blue-500 text-[#001b3a]"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 py-3.5 pl-12 pr-4 rounded-xl focus:outline-none focus:border-blue-500 text-[#001b3a]"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="password" required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 py-3.5 pl-12 pr-4 rounded-xl focus:outline-none focus:border-blue-500 text-[#001b3a]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2 ml-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="password" required
                    value={formData.confirm_password}
                    onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 py-3.5 pl-12 pr-4 rounded-xl focus:outline-none focus:border-blue-500 text-[#001b3a]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#38bdf8] text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#0ea5e9] transition-all shadow-lg flex items-center justify-center disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Create Account'} <UserPlus size={18} className="ml-2" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                Already have an account? 
                <Link to="/careers/login" className="text-blue-600 font-bold ml-2 hover:underline inline-flex items-center">
                  Login <ArrowRight size={14} className="ml-1" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </CareersLayout>
  );
};

export default CareersRegister;
