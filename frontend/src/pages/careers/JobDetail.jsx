import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Briefcase, Calendar, Clock, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import CareersLayout from '../../components/careers/CareersLayout';

const CAREERS_API = import.meta.env.VITE_CAREERS_API_URL || 'http://localhost:8000';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [applied, setApplied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null
  });

  useEffect(() => {
    setLoading(true);
    // RIMS: Fetch job by ID (numeric or identifier)
    fetch(`${CAREERS_API}/api/jobs/public/${id}`)
      .then(res => res.json())
      .then(json => {
        setJob(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching job details from RIMS:', err);
        setLoading(false);
      });
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!formData.resume) return alert('Please upload your resume');
    
    setSubmitting(true);
    const data = new FormData();
    data.append('job_id', job.id);
    data.append('candidate_name', formData.name);
    data.append('candidate_email', formData.email);
    data.append('candidate_phone', formData.phone);
    data.append('resume_file', formData.resume);

    try {
      const res = await fetch(`${CAREERS_API}/api/applications/apply`, {
        method: 'POST',
        body: data
      });
      
      if (res.ok) {
        setApplied(true);
      } else {
        const err = await res.json();
        alert(`Application Error: ${err.detail || 'Failed to submit'}`);
      }
    } catch (err) {
      console.error('Application Bridge Error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <CareersLayout>
        <div className="pt-32 container mx-auto px-6 h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#001b3a]"></div>
        </div>
      </CareersLayout>
    );
  }

  if (!job) {
    return (
      <CareersLayout>
        <div className="pt-32 container mx-auto px-6 text-center py-20">
          <h1 className="text-4xl font-bold text-white mb-4">Job Not Found</h1>
          <Link to="/careers/jobs" className="text-blue-400 hover:underline flex items-center justify-center">
            <ArrowLeft size={16} className="mr-2" /> Back to Job List
          </Link>
        </div>
      </CareersLayout>
    );
  }

  return (
    <CareersLayout>
      {/* Job Header */}
      <div className="pt-32 pb-12 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6">
          <Link to="/careers/jobs" className="inline-flex items-center text-slate-500 hover:text-[#001b3a] text-sm mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> All Opportunities
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded border border-blue-100 italic">
                  {job.domain || 'Engineering'}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest">{job.job_type}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#001b3a] mb-6 tracking-tight leading-tight uppercase">{job.title}</h1>
              
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#001b3a]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location</div>
                    <div className="text-sm font-bold text-[#001b3a]">{job.location}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#001b3a]">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Experience Level</div>
                    <div className="text-sm font-bold text-[#001b3a] uppercase">{job.experience_level}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#001b3a]">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Mode of Work</div>
                    <div className="text-sm font-bold text-[#001b3a]">{job.mode_of_work}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center text-xs text-slate-400 mb-2">
                <Clock size={14} className="mr-1" /> Posted {new Date(job.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-[#001b3a] mb-6 flex items-center">
                <div className="w-1.5 h-8 bg-blue-500 mr-4 rounded-full"></div>
                Job Description
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line bg-white p-8 rounded-2xl border border-slate-100 italic">
                {job.description}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#001b3a] mb-6 flex items-center font-serif">
                <div className="w-1.5 h-8 bg-[#38bdf8] mr-4 rounded-full"></div>
                AI Screening Process
              </h2>
              <div className="bg-slate-900 p-8 rounded-2xl text-white">
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Caldim uses <span className="text-[#38bdf8] font-bold">RIMS (Recruitment Intelligence System)</span> for automated screening. 
                  Upload your CV to begin the AI evaluation and get mapped directly to our elite engineering teams.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                    <div className="text-[#38bdf8] font-bold mb-1">Step 1</div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-white/50">Submit CV</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                    <div className="text-[#38bdf8] font-bold mb-1">Step 2</div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-white/50">AI Extraction</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                    <div className="text-[#38bdf8] font-bold mb-1">Step 3</div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-white/50">Match Score</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Application Form Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl border-2 border-[#001b3a] sticky top-32 shadow-2xl">
              {applied ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#001b3a] mb-2 font-serif">Application Received!</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    Our RIMS AI is currently scanning your profile. Check your email for further instructions.
                  </p>
                  <button 
                    onClick={() => setApplied(false)}
                    className="text-[#38bdf8] font-bold text-sm uppercase tracking-widest border-b-2 border-transparent hover:border-[#38bdf8]"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-[#001b3a] mb-2 font-serif">Apply for this role</h3>
                  <p className="text-slate-400 text-xs mb-8 uppercase tracking-widest font-bold">Powered by CALDIM RIMS</p>
                  
                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Full Name</label>
                      <input 
                        type="text" required
                        placeholder="Your Name"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email Address</label>
                      <input 
                        type="email" required
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Phone Number</label>
                      <input 
                        type="tel"
                        placeholder="+91..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Upload Resume (PDF only)</label>
                      <input 
                        type="file" required accept=".pdf"
                        className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#001b3a] file:text-white hover:file:bg-blue-900 cursor-pointer"
                        onChange={e => setFormData(prev => ({ ...prev, resume: e.target.files[0] }))}
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-[#38bdf8] text-white font-black uppercase tracking-widest text-sm rounded-xl hover:bg-[#0ea5e9] transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20"
                    >
                      {submitting ? 'Scanning CV...' : 'Submit to RIMS'} <Send size={18} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </CareersLayout>
  );
};

export default JobDetail;
