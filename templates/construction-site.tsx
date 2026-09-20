import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, ArrowRight, Shield, Calendar, Users, 
  DollarSign, Package, Zap, Construction, HardHat, 
  Phone, Mail, MapPin, ChevronRight, Star, XCircle 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', type: 'Residential', budget: '50k-100k', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [projects] = useState([
    { id: 1, title: 'Riverside Modern Villa', type: 'Residential', year: 2023, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Downtown Tech Hub', type: 'Commercial', year: 2022, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Green Valley School', type: 'Institutional', year: 2023, img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800' },
  ]);

  const services = [
    { title: 'General Contracting', icon: <Construction /> },
    { title: 'Project Management', icon: <Package /> },
    { title: 'Custom Design-Build', icon: <Zap /> },
    { title: 'Safety Consulting', icon: <Shield /> },
    { title: 'Renovation & Remodel', icon: <HardHat /> },
    { title: 'Site Preparation', icon: <MapPin /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setQuoteForm({ name: '', email: '', type: 'Residential', budget: '50k-100k', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-amber-600 flex items-center gap-2">
            <HardHat /> APEX CONSTRUCT
          </div>
          <div className="hidden md:flex gap-8 font-medium">
            {['Services', 'Projects', 'Process', 'Team'].map(item => (
              <button key={item} onClick={() => document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-600 transition-colors">
                {item}
              </button>
            ))}
          </div>
          <button onClick={() => document.getElementById('Quote')?.scrollIntoView({ behavior: 'smooth' })} className="bg-amber-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-700 transition-all flex items-center gap-2">
            Get a Quote <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[600px] flex items-center justify-center text-white text-center">
        <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000" alt="Construction site" className="absolute inset-0 w-full h-full object-cover brightness-50" />
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Building Tomorrow's Skyline</h1>
          <p className="text-xl mb-8">Professional construction services with a commitment to quality, safety, and timelines.</p>
          <button onClick={() => document.getElementById('Services')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-stone-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-stone-100">Explore Our Services</button>
        </div>
      </header>

      {/* Services */}
      <section id="Services" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Our Expert Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="p-8 bg-white border border-stone-200 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="text-amber-600 mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-stone-600">Premium quality delivery tailored to your specific project needs with industry-leading standards.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="Projects" className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16">Completed Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map(p => (
              <div key={p.id} className="group overflow-hidden rounded-2xl">
                <img src={p.img} alt={p.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="p-6 bg-stone-800">
                  <p className="text-amber-500 font-semibold text-sm">{p.type} • {p.year}</p>
                  <h3 className="text-xl font-bold mt-1">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="Process" className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Our Proven Process</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {['Consultation', 'Design', 'Permitting', 'Construction', 'Handover'].map((step, i) => (
            <div key={step} className="text-center">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">{i + 1}</div>
              <h4 className="font-bold">{step}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section id="Quote" className="py-20 bg-amber-50">
        <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-stone-200">
          <h2 className="text-3xl font-bold mb-6">Request a Quote</h2>
          {formStatus === 'success' ? (
            <div className="text-center p-8 bg-green-50 text-green-700 rounded-lg flex flex-col items-center gap-4">
              <CheckCircle size={48} />
              <p className="font-bold text-lg">Request Received!</p>
              <p>Our team will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Your Name" value={quoteForm.name} onChange={e => setQuoteForm({...quoteForm, name: e.target.value})} className="w-full p-3 border border-stone-300 rounded-lg" />
              <input required type="email" placeholder="Your Email" value={quoteForm.email} onChange={e => setQuoteForm({...quoteForm, email: e.target.value})} className="w-full p-3 border border-stone-300 rounded-lg" />
              <select value={quoteForm.type} onChange={e => setQuoteForm({...quoteForm, type: e.target.value})} className="w-full p-3 border border-stone-300 rounded-lg">
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
              </select>
              <textarea placeholder="Tell us about your project" value={quoteForm.message} onChange={e => setQuoteForm({...quoteForm, message: e.target.value})} className="w-full p-3 border border-stone-300 rounded-lg h-32" />
              <button disabled={formStatus === 'loading'} type="submit" className="w-full bg-amber-600 text-white p-4 rounded-lg font-bold hover:bg-amber-700 transition-colors">
                {formStatus === 'loading' ? 'Sending...' : 'Submit Request'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="text-white font-bold text-xl mb-4">APEX CONSTRUCT</div>
            <p>Building excellence since 1998.</p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center gap-2"><Phone size={16}/> (555) 123-4567</p>
            <p className="flex items-center gap-2"><Mail size={16}/> contact@apex.build</p>
            <p className="flex items-center gap-2"><MapPin size={16}/> 123 Builder Way, Construction City</p>
          </div>
        </div>
        <div className="text-center pt-12 border-t border-stone-800 mt-12 text-sm">© 2024 Apex Construction. All rights reserved.</div>
      </footer>
    </div>
  );
}