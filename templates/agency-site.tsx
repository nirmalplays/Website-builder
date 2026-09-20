import React, { useState, useEffect } from 'react';
import { 
  Zap, Shield, BarChart3, Package, Users, Settings, 
  ArrowRight, CheckCircle, X, Search, Menu, Star, 
  ChevronRight, Mail, Home, Clock, TrendingUp, DollarSign 
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const projects = [
    { id: 1, title: 'Nebula Branding', cat: 'Branding', img: 'https://images.unsplash.com/photo-1634942539450-466d1192e210?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Velocity UI', cat: 'Digital', img: 'https://images.unsplash.com/photo-1551650975-87de11494a3b?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'EcoFlow Web', cat: 'Development', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'Zenith App', cat: 'Digital', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80' },
    { id: 5, title: 'Apex Strategy', cat: 'Strategy', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80' },
    { id: 6, title: 'Flux Motion', cat: 'Branding', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tighter text-indigo-600">CREA<span className="text-slate-900">TIVE</span></div>
        <div className="hidden md:flex gap-8 font-medium text-sm text-slate-600">
          {['Services', 'Work', 'Team', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-indigo-600 transition-colors">{link}</a>
          ))}
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">We build digital <span className="text-indigo-600">experiences</span> that matter.</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">From strategy to execution, we help brands grow through design, development, and data-driven storytelling.</p>
        <div className="flex gap-4 justify-center">
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-700 transition flex items-center gap-2">View Our Work <ArrowRight size={18} /></button>
          <button className="border border-slate-200 px-8 py-4 rounded-full font-semibold hover:bg-slate-50 transition">Book a Consultation</button>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Brand Identity', desc: 'Crafting visual stories that resonate with audiences.' },
              { icon: Package, title: 'Product Design', desc: 'User-centric interfaces that drive conversion.' },
              { icon: BarChart3, title: 'Data Strategy', desc: 'Turning raw numbers into actionable growth insights.' },
              { icon: Shield, title: 'Security Audits', desc: 'Protecting your digital assets with rigor.' },
              { icon: Users, title: 'UX Research', desc: 'Deep dive into user needs and pain points.' },
              { icon: Settings, title: 'Web Development', desc: 'Scalable solutions for modern business needs.' },
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                <s.icon className="text-indigo-600 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="work" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Selected Work</h2>
          <div className="flex gap-2">
            {['All', 'Digital', 'Branding'].map(cat => (
              <button key={cat} onClick={() => setActiveTab(cat)} className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === cat ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.filter(p => activeTab === 'All' || p.cat === activeTab).map(p => (
            <div key={p.id} className="group cursor-pointer overflow-hidden rounded-2xl relative">
              <img src={p.img} alt={p.title} className="w-full h-64 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-indigo-900/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold text-lg">{p.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-indigo-900 text-white text-center px-6">
        <Star className="mx-auto mb-6 text-yellow-400" size={48} />
        <blockquote className="text-2xl md:text-4xl italic max-w-4xl mx-auto mb-8 font-light">"The creative team transformed our vision into a market leader. Their attention to detail is unmatched."</blockquote>
        <div className="font-bold">Sarah Jenkins</div>
        <div className="text-indigo-300">CEO, TechFlow Inc.</div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Let's work together</h2>
        {status === 'success' ? (
          <div className="bg-green-50 text-green-700 p-8 rounded-2xl text-center border border-green-200">
            <CheckCircle className="mx-auto mb-4" />
            <p className="font-bold">Message sent successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required type="text" placeholder="Name" className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
            <input required type="email" placeholder="Email" className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
            <textarea required rows={4} placeholder="Your project details" className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} />
            <button disabled={status === 'loading'} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 disabled:bg-slate-300 transition">
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <div className="text-white text-xl font-bold mb-4">CREATIVE</div>
            <p className="text-sm">Building the future of digital brands since 2015.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm"><li>About</li><li>Careers</li><li>Blog</li></ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm"><li>Documentation</li><li>Help Center</li><li>Privacy</li></ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              <Mail size={20} />
              <Home size={20} />
              <Clock size={20} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}