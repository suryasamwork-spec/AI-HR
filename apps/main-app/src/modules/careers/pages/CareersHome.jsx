import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CareersHero from '@/modules/careers/components/CareersHero';
import CareersLayout from '@/modules/careers/components/CareersLayout';

const CAREERS_API = import.meta.env.VITE_CAREERS_API_URL || 'http://localhost:8000';

const CareersHome = () => {
  const [data, setData] = useState({
    featuredJobs: [],
    departments: [],
    jobStats: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // RIMS: Fetch featured jobs (we'll just take the top ones from public list)
    fetch(`${CAREERS_API}/api/jobs/public`)
      .then(res => res.json())
      .then(json => {
        const jobs = Array.isArray(json) ? json : [];
        const domains = [...new Set(jobs.map(j => j.domain).filter(Boolean))];
        
        setData({
          featuredJobs: jobs.slice(0, 3),
          departments: domains,
          jobStats: { total_jobs: jobs.length }
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch careers home data from RIMS:', err);
        setLoading(false);
      });
  }, []);

  return (
    <CareersLayout>
      <CareersHero />
      
      {/* Featured Jobs Section */}
      <section className="py-24 bg-[#161f30]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-light text-white mb-4">Join us</h2>
              <p className="text-xl text-white/60 font-light">Explore career opportunities at Caldim India</p>
            </div>
            <Link to="/careers/jobs" className="mt-8 md:mt-0 px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all font-medium">
              View all jobs
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-white/5 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.featuredJobs.map(job => (
                <div key={job.id} className="group p-8 rounded-2xl bg-[#0b1120] border border-white/5 hover:border-blue-500/30 transition-all hover:translate-y-[-4px]">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 block">{job.domain || 'Engineering'}</span>
                  <h3 className="text-2xl font-semibold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors uppercase">{job.title}</h3>
                  <div className="flex items-center text-white/50 text-sm space-x-4 mb-8">
                    <span className="flex items-center">
                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                       {job.location}
                    </span>
                    <span className="flex items-center">
                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                       {job.job_type}
                    </span>
                  </div>
                  <Link to={`/careers/jobs/${job.id}`} className="inline-block text-white font-bold border-b-2 border-transparent hover:border-blue-500 pb-1 transition-all">Details</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div>
                <p className="text-5xl font-light text-blue-400 mb-2">{data.jobStats.total_jobs || 0}+</p>
                <p className="text-white/50 text-sm uppercase tracking-widest">Open Roles</p>
              </div>
              <div>
                <p className="text-5xl font-light text-blue-400 mb-2">{data.departments.length || 0}</p>
                <p className="text-white/50 text-sm uppercase tracking-widest">Departments</p>
              </div>
              <div>
                <p className="text-5xl font-light text-blue-400 mb-2">10+</p>
                <p className="text-white/50 text-sm uppercase tracking-widest">Locations</p>
              </div>
              <div>
                <p className="text-5xl font-light text-blue-400 mb-2">24/7</p>
                <p className="text-white/50 text-sm uppercase tracking-widest">Support</p>
              </div>
           </div>
        </div>
      </section>
    </CareersLayout>
  );
};

export default CareersHome;
