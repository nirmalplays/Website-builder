import React, { useState } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Zap, 
  Calendar, 
  Clock, 
  Users, 
  Building, 
  HardHat, 
  Hammer, 
  ChevronRight,
  TrendingUp,
  Mail
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('General');

  const services = [
    { title: 'Commercial Build', desc: 'Full-scale office complexes and retail spaces designed for longevity.', icon: <Building /> },
    { title: 'Residential Custom', desc: 'Bespoke luxury homes tailored to your unique architectural vision.', icon: <Hammer /> },
    { title: 'Structural Repair', desc: 'Expert reinforcement and restoration of existing foundation structures.', icon: <Shield /> },
    { title: 'Project Management', desc: 'End-to-end oversight ensuring budgets and timelines are strictly met.', icon: <Clock /> },
    { title: 'Industrial Upgrades', desc: 'Heavy-duty facility improvements for manufacturing and logistics.', icon: <Zap /> },
    { title: 'Sustainability Consulting', desc: 'LEED certification guidance and energy-efficient building practices.', icon: <TrendingUp /> },
  ];

  const projects = [
    { name: 'Riverfront Plaza', type: 'Commercial', year: '2023', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab' },
    { name: 'Evergreen Estates', type: 'Residential', year: '2022', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233' },
    { name: 'Summit Tech Hub', type: 'Industrial', year: '2024', img: 'https://images.unsplash.com/photo-1541888946425-d81bb1924823' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-2xl font-bold tracking-tighter text-blue-700 flex items-center gap-2">
            <HardHat className="text-blue-700" /> STRUCTURA
          </span>
          <div className="hidden md:flex gap-8 font-medium text-sm">
            <a href="#services" className="hover:text-blue-700">Services</a>
            <a href="#projects" className="hover:text-blue-700">Projects</a>
            <a href="#quote" className="bg-blue-700 text-white px-5 py-2 rounded-full hover:bg-blue-800 transition">Get a Quote</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[600px] flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e" 
          alt="Construction site" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-2xl leading-tight">Building the future, one foundation at a time.</h1>
          <p className="text-xl mb-8 max-w-lg text-slate-200">Premium construction services for commercial and residential developments across the region.</p>
          <a href="#quote" className="bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex w-fit items-center gap-2 hover:bg-blue-800 transition">
            Start Your Project <ArrowRight size={20} />
          </a>
        </div>
      </header>

      {/* Services */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center">Our Expertise</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="p-8 bg-white border border-slate-200 rounded-2xl hover:shadow-lg transition">
              <div className="text-blue-700 mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16">Completed Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="h-64 rounded-2xl overflow-hidden mb-4">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider">{p.type}</p>
                    <h3 className="text-xl font-bold">{p.name}</h3>
                  </div>
                  <span className="text-slate-500 font-mono">{p.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center">Our Construction Process</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          {['Consultation', 'Planning', 'Permitting', 'Construction', 'Handover'].map((step, i) => (
            <div key={i} className="flex-1 p-6 relative">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">{i + 1}</div>
              <h4 className="font-bold text-lg">{step}</h4>
              {i < 4 && <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-slate-200" />}
            </div>
          ))}
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote" className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8">Request a Quote</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Full Name" className="w-full p-4 bg-slate-50 rounded-lg border border-slate-200" />
              <input type="email" placeholder="Email Address" className="w-full p-4 bg-slate-50 rounded-lg border border-slate-200" />
            </div>
            <select className="w-full p-4 bg-slate-50 rounded-lg border border-slate-200">
              <option>Residential Renovation</option>
              <option>Commercial Development</option>
              <option>Industrial Infrastructure</option>
            </select>
            <textarea placeholder="Tell us about your project requirements..." className="w-full p-4 bg-slate-50 rounded-lg border border-slate-200 h-32"></textarea>
            <button className="w-full bg-blue-700 text-white p-4 rounded-lg font-bold hover:bg-blue-800">Submit Request</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-100 text-slate-600 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bold text-slate-900">© 2024 Structura Construction Co.</div>
          <div className="flex gap-6">
            <span>Safety Record: 0 Incidents</span>
            <span>OSHA Certified</span>
            <span>Licensed & Insured</span>
          </div>
        </div>
      </footer>
    </div>
  );
}