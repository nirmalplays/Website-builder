import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  X, 
  Filter, 
  ChevronDown, 
  Building,
  User,
  ArrowRight,
  Shield
} from 'lucide-react';

const INITIAL_JOBS = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'TechFlow', location: 'Remote', type: 'Full-time', salary: '$140k - $180k', posted: '2h ago', seniority: 'Senior' },
  { id: 2, title: 'Product Designer', company: 'CreativePulse', location: 'New York', type: 'Full-time', salary: '$120k - $150k', posted: '5h ago', seniority: 'Mid' },
  { id: 3, title: 'Backend Developer (Go)', company: 'ScaleUp', location: 'Remote', type: 'Contract', salary: '$90 - $120/hr', posted: '1d ago', seniority: 'Senior' },
  { id: 4, title: 'Marketing Manager', company: 'GrowthRocket', location: 'San Francisco', type: 'Full-time', salary: '$110k - $140k', posted: '1d ago', seniority: 'Mid' },
  { id: 5, title: 'DevOps Engineer', company: 'CloudScale', location: 'Remote', type: 'Full-time', salary: '$150k - $190k', posted: '2d ago', seniority: 'Senior' },
  { id: 6, title: 'UX Researcher', company: 'UserFirst', location: 'Austin', type: 'Part-time', salary: '$60k - $80k', posted: '3d ago', seniority: 'Junior' },
  { id: 7, title: 'Data Scientist', company: 'InsightAI', location: 'Remote', type: 'Full-time', salary: '$160k - $200k', posted: '4d ago', seniority: 'Senior' },
  { id: 8, title: 'Customer Success Lead', company: 'HappyClients', location: 'Chicago', type: 'Full-time', salary: '$90k - $110k', posted: '5d ago', seniority: 'Mid' },
];

export default function App() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [search, setSearch] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedSeniority, setSelectedSeniority] = useState('All');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', company: '', salary: '' });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('job_board_data');
      if (saved) setJobs(JSON.parse(saved));
    } catch (e) { console.error(e); }
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
                          job.company.toLowerCase().includes(search.toLowerCase());
    const matchesRemote = remoteOnly ? job.location === 'Remote' : true;
    const matchesSeniority = selectedSeniority === 'All' ? true : job.seniority === selectedSeniority;
    return matchesSearch && matchesRemote && matchesSeniority;
  });

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob = {
      ...form,
      id: Date.now(),
      location: 'Remote',
      type: 'Full-time',
      posted: 'Just now',
      seniority: 'Mid'
    };
    const updated = [newJob, ...jobs];
    setJobs(updated);
    localStorage.setItem('job_board_data', JSON.stringify(updated));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setIsPostModalOpen(false);
      setForm({ title: '', company: '', salary: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <Briefcase /> JobPortal
          </div>
          <button 
            onClick={() => setIsPostModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Post a Job
          </button>
        </div>
      </nav>

      <header className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Find your next dream job</h1>
          <div className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-200 border flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 border-r border-slate-100">
              <Search className="text-slate-400 mr-2" />
              <input 
                className="w-full py-3 outline-none" 
                placeholder="Job title or company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
              Search
            </button>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={() => setRemoteOnly(!remoteOnly)}
              className={`px-4 py-2 rounded-full border transition ${remoteOnly ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200'}`}
            >
              Remote Only
            </button>
            <select 
              className="px-4 py-2 rounded-full border border-slate-200 bg-white"
              onChange={(e) => setSelectedSeniority(e.target.value)}
            >
              <option>All</option>
              <option>Junior</option>
              <option>Mid</option>
              <option>Senior</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Latest Openings ({filteredJobs.length})</h2>
        <div className="grid gap-4">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-xl border border-slate-200 flex items-center justify-between hover:border-indigo-300 transition group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                  <Building />
                </div>
                <div>
                  <h3 className="font-bold text-lg group-hover:text-indigo-600 transition">{job.title}</h3>
                  <div className="flex gap-4 text-slate-500 text-sm mt-1">
                    <span className="flex items-center gap-1"><Building className="w-4 h-4" /> {job.company}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-slate-900">{job.salary}</div>
                <div className="text-slate-400 text-sm flex items-center gap-1 justify-end mt-1">
                  <Clock className="w-4 h-4" /> {job.posted}
                </div>
              </div>
            </div>
          ))}
          {filteredJobs.length === 0 && (
            <div className="text-center py-20 text-slate-500">No jobs found matching your criteria.</div>
          )}
        </div>
      </main>

      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get job alerts in your inbox</h2>
          <p className="text-slate-400 mb-8">Never miss a new listing for your dream role.</p>
          <form className="flex gap-2 justify-center" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="px-4 py-3 rounded-lg text-slate-900 w-64" />
            <button className="bg-indigo-500 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-400">Subscribe</button>
          </form>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-500 text-sm">
        © 2024 JobPortal Inc. All rights reserved.
      </footer>

      {isPostModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            {success ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Job Posted!</h3>
              </div>
            ) : (
              <form onSubmit={handlePostJob}>
                <div className="flex justify-between mb-6">
                  <h3 className="text-xl font-bold">Post a new job</h3>
                  <button type="button" onClick={() => setIsPostModalOpen(false)}><X /></button>
                </div>
                <div className="space-y-4">
                  <input required placeholder="Job Title" className="w-full p-3 border rounded-lg" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                  <input required placeholder="Company" className="w-full p-3 border rounded-lg" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                  <input required placeholder="Salary Range" className="w-full p-3 border rounded-lg" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} />
                  <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold">Submit Job</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}