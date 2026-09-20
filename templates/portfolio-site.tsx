import React, { useState, useEffect } from 'react';
import { Mail, Code as Github, Briefcase as Linkedin, ExternalLink, Download, Code, Briefcase, User, MessageSquare, Star, ChevronRight, CheckCircle, X, Send } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [projects] = useState([
    { id: 1, title: 'CloudScale Dashboard', tech: ['React', 'AWS', 'Tailwind'], desc: 'Real-time analytics platform for enterprise cloud infrastructure.' },
    { id: 2, title: 'SecurePay API', tech: ['Node.js', 'PostgreSQL', 'Redis'], desc: 'High-throughput payment gateway processing 10k+ requests/sec.' },
    { id: 3, title: 'DesignFlow', tech: ['TypeScript', 'Framer', 'React'], desc: 'Collaborative UI design tool for remote product teams.' },
    { id: 4, title: 'DataPulse AI', tech: ['Python', 'PyTorch', 'FastAPI'], desc: 'Predictive modeling engine for retail supply chain optimization.' },
    { id: 5, title: 'EcoTrack Mobile', tech: ['React Native', 'Firebase'], desc: 'Sustainability tracking app with 50k+ active monthly users.' },
  ]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-xl text-blue-600">alex.dev</span>
          <div className="hidden md:flex gap-8">
            {['About', 'Projects', 'Experience', 'Contact'].map(item => (
              <button 
                key={item}
                onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <div className="space-y-1.5"><div className="w-6 h-0.5 bg-slate-900"></div><div className="w-6 h-0.5 bg-slate-900"></div></div>}
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6 max-w-5xl mx-auto">
        <section className="py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-slate-900">Alex Rivers</h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto">Full-stack software engineer building robust, scalable digital experiences that matter.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-all">Work with me</button>
            <button className="border border-slate-300 px-8 py-3 rounded-full font-medium hover:bg-slate-100 transition-all flex items-center gap-2"><Download size={18} /> View CV</button>
          </div>
        </section>

        <section id="about" className="py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-slate-200 h-96 rounded-2xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Alex" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">I have spent the last 6 years obsessing over clean code, performance, and user-centric design. My goal is to bridge the gap between complex engineering and intuitive product experiences.</p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'].map(skill => (
                <div key={skill} className="flex items-center gap-2 font-medium bg-white p-3 rounded-lg border border-slate-200">
                  <CheckCircle size={16} className="text-blue-600" /> {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20">
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => (
              <div key={p.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <Star className="text-blue-600" />
                  <ExternalLink size={18} className="text-slate-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map(t => <span key={t} className="text-xs bg-slate-100 px-2 py-1 rounded">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="py-20">
          <h2 className="text-3xl font-bold mb-12">Experience</h2>
          <div className="space-y-8">
            {[
              { role: 'Senior Engineer', comp: 'TechFlow Inc', date: '2021 - Present' },
              { role: 'Full Stack Dev', comp: 'Startup Hub', date: '2018 - 2021' }
            ].map((exp, i) => (
              <div key={i} className="flex gap-6 items-start border-l-2 border-blue-600 pl-6">
                <div>
                  <h3 className="font-bold text-xl">{exp.role}</h3>
                  <p className="text-blue-600 font-medium">{exp.comp} • {exp.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-20 bg-white rounded-3xl p-8 md:p-16 border border-slate-200">
          <h2 className="text-3xl font-bold mb-8">Let's connect</h2>
          <form onSubmit={handleContactSubmit} className="max-w-md">
            <div className="space-y-4">
              <input required type="text" placeholder="Your Name" className="w-full p-4 border rounded-xl" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} />
              <input required type="email" placeholder="Your Email" className="w-full p-4 border rounded-xl" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} />
              <textarea required placeholder="Your Message" className="w-full p-4 border rounded-xl h-32" value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})}></textarea>
              <button disabled={status === 'loading'} className="w-full bg-slate-900 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50">
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : <><Send size={18}/> Send Message</>}
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="py-12 text-center border-t border-slate-200">
        <div className="flex justify-center gap-6 mb-6">
          <button className="hover:text-blue-600"><Github /></button>
          <button className="hover:text-blue-600"><Linkedin /></button>
          <button className="hover:text-blue-600"><Mail /></button>
        </div>
        <p className="text-slate-500 text-sm">© 2024 Alex Rivers. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}