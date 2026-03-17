import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, ChevronRight, ArrowLeft } from 'lucide-react';
import CareersLayout from '../../components/careers/CareersLayout';
import { Link } from 'react-router-dom';

const CAREERS_API = import.meta.env.VITE_CAREERS_API_URL || 'http://localhost:8000';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    experience: ''
  });
  const [stats, setStats] = useState({ total: 0, pages: 1, page: 1 });

  const fetchJobs = (newFilters = filters) => {
    setLoading(true);
    fetch(`${CAREERS_API}/api/jobs/public`)
      .then(res => res.json())
      .then(json => {
        let filteredJobs = Array.isArray(json) ? json : [];

        // Apply filters (use newFilters or default to URL params on first load)
        const activeFilters = newFilters;
        
        if (activeFilters.keyword) {
          const kw = activeFilters.keyword.toLowerCase();
          filteredJobs = filteredJobs.filter(j => 
            j.title.toLowerCase().includes(kw) || 
            j.description.toLowerCase().includes(kw) ||
            j.domain?.toLowerCase().includes(kw)
          );
        }

        if (activeFilters.location) {
          const loc = activeFilters.location.toLowerCase();
          filteredJobs = filteredJobs.filter(j => 
            j.location.toLowerCase().includes(loc)
          );
        }

        if (activeFilters.experience) {
          filteredJobs = filteredJobs.filter(j => 
            j.experience_level.toLowerCase() === activeFilters.experience.toLowerCase()
          );
        }

        setJobs(filteredJobs);
        setStats({ total: filteredJobs.length, pages: 1, page: 1 });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching jobs from RIMS:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Read from URL on mount
    const params = new URLSearchParams(window.location.search);
    const initialFilters = {
      keyword: params.get('keyword') || '',
      location: params.get('location') || '',
      experience: params.get('experience') || ''
    };
    
    setFilters(initialFilters);
    fetchJobs(initialFilters);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchJobs(filters, 1);
  };

  return (
    <CareersLayout>
      {/* Search Header - Cinematic Dark Navy */}
      <div className="pt-32 pb-20 bg-[#0a0f1d] relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                Global Opportunities
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight">Caldim Openings</h1>
              <p className="text-white/40 font-medium text-lg">Search active engineering roles across our global hubs.</p>
            </div>
            <Link to="/careers" className="group flex items-center text-white/50 hover:text-white text-sm font-bold transition-all">
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Return to Careers
            </Link>
          </div>

          <div className="bg-[#0f172a]/80 backdrop-blur-xl p-2 rounded-3xl border border-white/10 shadow-2xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-400 transition-colors" size={20} />
                <input 
                  type="text" 
                  name="keyword"
                  placeholder="Job Title or Skill"
                  value={filters.keyword}
                  onChange={handleFilterChange}
                  className="w-full bg-white/5 py-5 pl-14 pr-4 text-white placeholder-white/20 focus:outline-none rounded-2xl border border-transparent focus:border-white/10 transition-all"
                />
              </div>
              <div className="relative group">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-400 transition-colors" size={20} />
                <input 
                  type="text" 
                  name="location"
                  placeholder="Location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full bg-white/5 py-5 pl-14 pr-4 text-white placeholder-white/20 focus:outline-none rounded-2xl border border-transparent focus:border-white/10 transition-all"
                />
              </div>
              <div className="relative group">
                <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-400 transition-colors" size={20} />
                <select 
                  name="experience"
                  value={filters.experience}
                  onChange={handleFilterChange}
                  className="w-full bg-white/5 py-5 pl-14 pr-4 text-white appearance-none focus:outline-none rounded-2xl border border-transparent focus:border-white/10 transition-all cursor-pointer"
                >
                  <option value="" className="bg-[#0f172a]">Experience Level</option>
                  <option value="junior" className="bg-[#0f172a]">Junior (0-2 yrs)</option>
                  <option value="mid-level" className="bg-[#0f172a]">Mid-Level (3-5 yrs)</option>
                  <option value="senior" className="bg-[#0f172a]">Senior (6-10 yrs)</option>
                  <option value="executive" className="bg-[#0f172a]">Executive (10+ yrs)</option>
                </select>
              </div>
              <button type="submit" className="bg-gradient-to-r from-blue-500 to-cyan-400 text-[#0f172a] font-black uppercase tracking-widest py-5 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-95">
                Apply Filters
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-[#0f172a] min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-bold text-white/90">
              <span className="text-blue-400">{stats.total}</span> Results Found
            </h2>
            <div className="flex items-center space-x-3 text-xs font-bold text-white/40 uppercase tracking-widest">
              <span>Sort By:</span>
              <button className="text-white flex items-center gap-1 hover:text-blue-400">
                Latest <ChevronRight size={14} className="rotate-90" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white/5 p-8 rounded-[32px] border border-white/5 animate-pulse h-48"></div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-32 bg-white/5 rounded-[40px] border border-white/5">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                <Search size={40} className="text-white/10" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No openings found</h3>
              <p className="text-white/30 mb-8 max-w-sm mx-auto">Try adjusting your filters or clear your search to see all opportunities.</p>
              <button 
                onClick={() => { setFilters({keyword:'', location:'', experience:''}); fetchJobs({keyword:'', location:'', experience:''}); }}
                className="px-8 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/10"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.map(job => (
                <Link 
                  key={job.id} 
                  to={`/careers/jobs/${job.id}`}
                  className="group relative bg-white/5 p-8 rounded-[32px] border border-white/5 hover:border-blue-500/40 hover:bg-white/[0.07] transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                         <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                           {job.domain?.toLowerCase().includes('software') ? <Code2 size={24} /> : <Briefcase size={24} />}
                         </div>
                         <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors uppercase tracking-tight">{job.title}</h3>
                            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">{job.domain || 'Engineering'}</p>
                         </div>
                      </div>
                      <span className="px-3 py-1 bg-white/5 text-white/40 text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/5">{job.job_type}</span>
                    </div>

                    <div className="flex flex-wrap gap-8 mb-8">
                       <div className="flex items-center gap-2 text-white/50">
                          <MapPin size={16} className="text-cyan-400/70" />
                          <span className="text-sm font-bold">{job.location}</span>
                       </div>
                       <div className="flex items-center gap-2 text-white/50">
                          <Briefcase size={16} className="text-blue-400/70" />
                          <span className="text-sm font-bold uppercase tracking-widest">{job.experience_level}</span>
                       </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                       <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                         Posted {new Date(job.created_at).toLocaleDateString()}
                       </span>
                       <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
                         Details <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                       </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </CareersLayout>
  );
};

export default JobList;
