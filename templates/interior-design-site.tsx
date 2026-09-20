import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, CheckCircle, Clock, Calendar, Mail, User, 
  Star, ChevronDown, Shield, Zap, Package, Home, Filter, X
} from 'lucide-react';

const INITIAL_PROJECTS = [
  { id: 1, title: "Modern Minimalist Loft", type: "Living Room", location: "SoHo, NY", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Serene Scandinavian Bedroom", type: "Bedroom", location: "Portland, OR", img: "https://images.unsplash.com/photo-1616594822273-2bebc1656346?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Industrial Kitchen Refresh", type: "Kitchen", location: "Austin, TX", img: "https://images.unsplash.com/photo-1556912173-3d706393a772?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Boho Chic Home Office", type: "Office", location: "Denver, CO", img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800" },
];

export default function App() {
  const [projects] = useState(INITIAL_PROJECTS);
  const [filter, setFilter] = useState("All");
  const [formState, setFormState] = useState({ name: '', email: '', date: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.type === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', date: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold tracking-tight text-stone-900">AURA<span className="text-emerald-700">STUDIO</span></h1>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            {['Portfolio', 'Process', 'Services', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-emerald-700 transition-colors">{link}</a>
            ))}
          </div>
          <button className="bg-stone-900 text-white px-5 py-2 rounded-full text-sm hover:bg-emerald-800 transition-all">Book Consultation</button>
        </div>
      </nav>

      <header className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-6xl font-serif leading-tight mb-6">Elevating spaces, <br/>defining <span className="text-emerald-700">lifestyles.</span></h2>
            <p className="text-lg text-stone-600 mb-8 max-w-lg">Award-winning interior design studio specializing in bespoke residential transformations that blend functionality with timeless aesthetics.</p>
            <div className="flex gap-4">
              <a href="#contact" className="bg-emerald-700 text-white px-8 py-3 rounded-md hover:bg-emerald-800 transition-colors">Start Your Project</a>
              <a href="#portfolio" className="border border-stone-300 px-8 py-3 rounded-md hover:border-stone-900 transition-colors">View Portfolio</a>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000" alt="Interior Design" className="rounded-2xl shadow-xl"/>
        </div>
      </header>

      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h3 className="text-4xl font-serif">Featured Projects</h3>
            <div className="flex gap-2">
              {['All', 'Living Room', 'Bedroom', 'Kitchen'].map(t => (
                <button 
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${filter === t ? 'bg-stone-900 text-white' : 'bg-stone-100'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map(p => (
              <div key={p.id} className="group relative overflow-hidden rounded-xl">
                <img src={p.img} alt={p.title} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute bottom-0 p-6 w-full bg-gradient-to-t from-black/80 to-transparent text-white">
                  <p className="text-xs uppercase tracking-widest text-emerald-400">{p.type}</p>
                  <h4 className="text-xl font-semibold">{p.title}</h4>
                  <p className="text-sm opacity-80">{p.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 bg-stone-900 text-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-serif mb-16 text-center">Our Design Journey</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[{title: 'Consultation', desc: 'Understanding your vision'}, {title: 'Concept', desc: 'Mood boards & layout'}, {title: 'Sourcing', desc: 'Curating materials'}, {title: 'Installation', desc: 'Bringing to life'}].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-700 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">{i+1}</div>
                <h4 className="text-xl mb-2">{step.title}</h4>
                <p className="text-stone-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-serif mb-12">Design Packages</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Essential', price: '$2,500', features: ['Concept Board', 'Floor Plan', 'Shopping List'] },
              { title: 'Full Service', price: '$8,000', features: ['Full Project Management', '3D Renderings', 'Purchasing Support'] },
              { title: 'Renovation', price: '$15,000+', features: ['Architectural Consult', 'Contractor Management', 'Site Supervision'] }
            ].map((pkg, i) => (
              <div key={i} className="border border-stone-200 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <h4 className="text-2xl font-serif mb-2">{pkg.title}</h4>
                <p className="text-3xl font-bold text-emerald-700 mb-6">{pkg.price}</p>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map(f => <li key={f} className="flex items-center gap-2"><CheckCircle size={18} className="text-emerald-600"/> {f}</li>)}
                </ul>
                <button className="w-full py-3 border border-stone-900 rounded hover:bg-stone-900 hover:text-white transition-all">Select Plan</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-stone-100">
        <div className="max-w-2xl mx-auto px-6">
          <h3 className="text-4xl font-serif mb-8 text-center">Book a Consultation</h3>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm space-y-4">
            {status === 'success' ? (
              <div className="text-center py-12 text-emerald-700">
                <CheckCircle size={48} className="mx-auto mb-4" />
                <h4 className="text-2xl">Request Received!</h4>
                <p>We will contact you within 24 hours.</p>
              </div>
            ) : (
              <>
                <input required type="text" placeholder="Full Name" className="w-full p-3 border rounded" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
                <input required type="email" placeholder="Email Address" className="w-full p-3 border rounded" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
                <input required type="date" className="w-full p-3 border rounded" value={formState.date} onChange={e => setFormState({...formState, date: e.target.value})} />
                <textarea required placeholder="Briefly describe your project..." className="w-full p-3 border rounded h-32" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} />
                <button disabled={status === 'loading'} className="w-full bg-emerald-700 text-white py-4 rounded font-bold hover:bg-emerald-800 disabled:bg-stone-400">
                  {status === 'loading' ? 'Sending...' : 'Request Consultation'}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      <footer className="py-12 text-center text-stone-500 text-sm">
        <p>© 2024 Aura Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}