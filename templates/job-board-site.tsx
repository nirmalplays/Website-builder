import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Zap, Star, ChevronDown, CheckCircle, ArrowRight, Users, Shield, Clock } from 'lucide-react';

const JOBS = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'Nebula Systems', salary: '$140k - $180k', location: 'Remote', type: 'Full-time', posted: '2h ago' },
  { id: 2, title: 'Product Designer', company: 'FlowState UI', salary: '$110k - $150k', location: 'New York, NY', type: 'Full-time', posted: '5h ago' },
  { id: 3, title: 'Backend Developer (Go)', company: 'DataStream', salary: '$130k - $170k', location: 'Remote', type: 'Contract', posted: '1d ago' },
  { id: 4, title: 'Marketing Manager', company: 'GrowthPulse', salary: '$90k - $120k', location: 'Austin, TX', type: 'Full-time', posted: '1d ago' },
  { id: 5, title: 'DevOps Engineer', company: 'CloudScale', salary: '$150k - $190k', location: 'Remote', type: 'Full-time', posted: '2d ago' },
  { id: 6, title: 'UX Researcher', company: 'InsightLab', salary: '$100k - $130k', location: 'San Francisco, CA', type: 'Part-time', posted: '2d ago' },
  { id: 7, title: 'Customer Success Lead', company: 'SupportHero', salary: '$85k - $110k', location: 'Remote', type: 'Full-time', posted: '3d ago' },
  { id: 8, title: 'Full Stack Engineer', company: 'Velocity Apps', salary: '$125k - $165k', location: 'Chicago, IL', type: 'Full-time', posted: '4d ago' },
];

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">TalentPulse</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600">Find Jobs</a>
            <a href="#" className="hover:text-indigo-600">Companies</a>
            <a href="#" className="hover:text-indigo-600">Salaries</a>
          </div>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors">
            Post a Job
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-white border-b border-slate-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">Find your next dream role</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Browse thousands of job openings from top tech companies and startups. Your next career move starts here.</p>
          
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xl flex flex-col md:flex-row gap-2 mt-8">
            <div className="flex-1 flex items-center px-4 gap-2 border-b md:border-b-0 md:border-r border-slate-100">
              <Search className="w-5 h-5 text-slate-400" />
              <input placeholder="Job title or keywords" className="w-full py-3 outline-none" />
            </div>
            <div className="flex-1 flex items-center px-4 gap-2">
              <MapPin className="w-5 h-5 text-slate-400" />
              <input placeholder="City or 'Remote'" className="w-full py-3 outline-none" />
            </div>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700">Search</button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {['Remote', 'Seniority', 'Full-time', 'Contract', 'Engineering', 'Design'].map((filter) => (
              <button 
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-all ${selectedFilter === filter ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 hover:border-slate-300'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Job List */}
      <main className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Recommended for you</h2>
        <div className="space-y-4">
          {JOBS.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-indigo-600 uppercase">
                  {job.company[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 group-hover:text-indigo-600">{job.title}</h3>
                  <p className="text-slate-500 text-sm">{job.company} • {job.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1 text-slate-600"><Briefcase className="w-4 h-4" /> {job.salary}</div>
                <div className="flex items-center gap-1 text-slate-500"><Clock className="w-4 h-4" /> {job.posted}</div>
                <button className="text-indigo-600 font-medium flex items-center gap-1">Apply <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Featured Companies */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10 text-center">Featured Hiring Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Stellar Tech', 'Vertex Labs', 'Omni Health', 'BlueHorizon'].map((name) => (
              <div key={name} className="bg-slate-800 p-6 rounded-xl text-center border border-slate-700">
                <div className="w-12 h-12 mx-auto mb-4 bg-indigo-500 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold">{name}</p>
                <span className="text-xs text-slate-400">12 Open Roles</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto bg-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl shadow-indigo-200">
          <Users className="w-16 h-16 mx-auto mb-6 text-indigo-200" />
          <h2 className="text-3xl font-bold mb-4">Get matched with your dream job</h2>
          <p className="text-indigo-100 mb-8 text-lg">Create a profile and let top companies come to you. No more endless applications.</p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors">Create Candidate Profile</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-12 text-sm text-slate-600">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Zap className="w-5 h-5 text-indigo-600" /> TalentPulse
            </div>
            <p>© 2024 TalentPulse Inc. All rights reserved.</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900">Platform</h4>
            <p>Browse Jobs</p>
            <p>Salaries</p>
            <p>Companies</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900">Company</h4>
            <p>About Us</p>
            <p>Careers</p>
            <p>Support</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900">Legal</h4>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}