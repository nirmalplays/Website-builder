import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, ArrowRight, Shield, Calendar, Users, 
  Package, DollarSign, Clock, Menu, X, Star, 
  TrendingUp, HardHat, Phone, Mail, MapPin 
} from 'lucide-react';

const INITIAL_PROJECTS = [
  { id: 1, name: "Riverside Office Complex", type: "Commercial", year: 2023, img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" },
  { id: 2, name: "Sunset Heights Residential", type: "Residential", year: 2022, img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233" },
  { id: 3, name: "City Library Renovation", type: "Public", year: 2023, img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5" },
  { id: 4, name: "Greenwood Industrial Park", type: "Industrial", year: 2021, img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd" },
  { id: 5, name: "Modern Loft Conversion", type: "Residential", year: 2024, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607" },
  { id: 6, name: "Tech Hub Plaza", type: "Commercial", year: 2023, img: "https://images.unsplash.com/photo-1577495508048-b635879837f1" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', type: 'Residential', budget: '$50k-$100k' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [projects] = useState(INITIAL_PROJECTS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', type: 'Residential', budget: '$50k-$100k' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            <HardHat className="w-8 h-8" /> APEX BUILDERS
          </div>
          <div className="hidden md:flex gap-8 font-medium">
            {['Services', 'Projects', 'Process', 'Team'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-700 transition-colors">{item}</a>
            ))}
          </div>
          <a href="#quote" className="hidden md:block bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-all font-semibold">Get a Quote</a>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">Building the Future of <span className="text-blue-700">Infrastructure</span></h1>
            <p className="text-lg text-slate-600 mb-8">Expert construction management and execution with a commitment to safety, sustainability, and structural excellence.</p>
            <div className="flex gap-4">
              <a href="#quote" className="bg-blue-700 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-800">Start Project <ArrowRight size={20} /></a>
              <a href="#projects" className="border border-slate-300 px-8 py-4 rounded-lg font-bold hover:bg-slate-100">View Gallery</a>
            </div>
          </div>
          <div className="h-96 bg-slate-200 rounded-2xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1541976590-713941681591" alt="Construction site" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Commercial Construction', icon: <Package /> },
              { title: 'Residential Development', icon: <Users /> },
              { title: 'Public Infrastructure', icon: <MapPin /> },
              { title: 'Renovation & Retrofit', icon: <TrendingUp /> },
              { title: 'Safety Consulting', icon: <Shield /> },
              { title: 'Project Management', icon: <Clock /> }
            ].map((s, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center mb-6">{s.icon}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-slate-600">Delivering high-quality results with precision engineering and professional oversight.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Completed Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map(p => (
              <div key={p.id} className="group rounded-xl overflow-hidden bg-white shadow-sm border border-slate-200">
                <div className="h-48 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-blue-700 uppercase">{p.type} • {p.year}</span>
                  <h3 className="text-lg font-semibold mt-1">{p.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote" className="py-20 bg-blue-900 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Request A Quote</h2>
          <p className="text-blue-200 text-center mb-10">Get a professional consultation for your next project.</p>
          
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl text-slate-900 space-y-4">
            {formStatus === 'success' ? (
              <div className="text-center py-12 text-green-600 font-bold flex flex-col items-center gap-2">
                <CheckCircle size={48} /> Request submitted successfully! We'll contact you soon.
              </div>
            ) : (
              <>
                <input required placeholder="Full Name" className="w-full p-4 rounded-lg border border-slate-300" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="email" placeholder="Email Address" className="w-full p-4 rounded-lg border border-slate-300" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <select className="w-full p-4 rounded-lg border border-slate-300" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                </select>
                <select className="w-full p-4 rounded-lg border border-slate-300" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
                  <option>$50k-$100k</option>
                  <option>$100k-$500k</option>
                  <option>$500k+</option>
                </select>
                <button disabled={formStatus === 'loading'} type="submit" className="w-full bg-blue-700 text-white font-bold py-4 rounded-lg hover:bg-blue-800 disabled:opacity-50">
                  {formStatus === 'loading' ? 'Processing...' : 'Submit Request'}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold text-white flex items-center gap-2 mb-4">
              <HardHat className="w-6 h-6" /> APEX BUILDERS
            </div>
            <p className="text-sm">Building trust, one foundation at a time since 1998.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <div className="flex items-center gap-2 mb-2"><Phone size={16} /> (555) 123-4567</div>
            <div className="flex items-center gap-2"><Mail size={16} /> info@apexbuilders.com</div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Locations</h4>
            <p>123 Construction Way<br/>Austin, TX 78701</p>
          </div>
          <div className="flex gap-4">
            <Star className="text-yellow-500" />
            <span className="text-white font-bold">5.0 Star Rating</span>
          </div>
        </div>
      </footer>
    </div>
  );
}