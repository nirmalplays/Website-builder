import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Menu, 
  X, 
  Check, 
  Star, 
  Mail, 
  Clock, 
  DollarSign, 
  ArrowRight,
  Sparkles,
  Shield
} from 'lucide-react';

const INITIAL_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e", title: "Urban Portraits" },
  { id: 2, src: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07", title: "Film Aesthetics" },
  { id: 3, src: "https://images.unsplash.com/photo-1554080353-a576cf803bda", title: "Nature Capture" },
  { id: 4, src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", title: "Events & Life" },
  { id: 5, src: "https://images.unsplash.com/photo-1554995207-c18c203602cb", title: "Minimalist Studio" },
  { id: 6, src: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553", title: "Golden Hour" },
  { id: 7, src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745", title: "Night Vibes" },
  { id: 8, src: "https://images.unsplash.com/photo-1519741497674-611481863552", title: "Candid Moments" },
  { id: 9, src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", title: "Editorial Style" },
];

const PACKAGES = [
  { id: 'basic', name: 'Essential Session', price: 299, desc: '1 hour shoot, 20 edited photos, digital gallery.' },
  { id: 'pro', name: 'Professional Package', price: 599, desc: '3 hours, 60 edited photos, print release, custom moodboard.' },
  { id: 'event', name: 'Full Event Coverage', price: 1200, desc: 'Full day coverage, 200+ photos, highlight reel, priority editing.' },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', date: '', type: 'portrait' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', date: '', type: 'portrait' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-neutral-50/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-xl tracking-tight">ELARA VANCE</span>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {['Portfolio', 'Services', 'About', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-emerald-600 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center pt-16">
        <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4" className="absolute inset-0 w-full h-full object-cover" alt="Hero background" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center text-white p-6">
          <h1 className="text-5xl md:text-7xl font-light mb-4">Capturing Time</h1>
          <p className="text-lg opacity-90">Visual stories for modern brands and people.</p>
        </div>
      </header>

      {/* Portfolio */}
      <section id="portfolio" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-12">Latest Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_IMAGES.map((img) => (
            <div key={img.id} className="group relative aspect-[4/5] overflow-hidden bg-neutral-200">
              <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white font-medium">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {PACKAGES.map(pkg => (
              <div key={pkg.id} className="border border-neutral-200 p-8 rounded-lg flex flex-col gap-4">
                <h3 className="text-xl font-bold">{pkg.name}</h3>
                <div className="text-3xl font-bold text-emerald-600 flex items-center gap-1">
                  <DollarSign size={24} />{pkg.price}
                </div>
                <p className="text-neutral-600 flex-grow">{pkg.desc}</p>
                <a href="#contact" className="w-full py-3 bg-neutral-900 text-white rounded-md text-center hover:bg-emerald-600 transition-colors">Book Now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 max-w-4xl mx-auto px-6 text-center">
        <div className="w-32 h-32 rounded-full mx-auto mb-8 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" alt="Photographer" />
        </div>
        <h2 className="text-3xl font-bold mb-6">About Elara</h2>
        <p className="text-lg text-neutral-600 leading-relaxed mb-8">
          With over 8 years of experience, I specialize in finding the authentic spark in every subject. Whether it's the quiet intensity of a portrait or the kinetic energy of a live event, my goal is to create images that feel like memories you haven't lived yet.
        </p>
        <div className="flex justify-center gap-6 text-emerald-600">
          <div className="flex flex-col items-center gap-2"><Sparkles /><span className="text-xs">Certified</span></div>
          <div className="flex flex-col items-center gap-2"><Shield /><span className="text-xs">Insured</span></div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-neutral-900 text-white py-24">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Enquire Today</h2>
          {status === 'success' ? (
            <div className="p-8 bg-emerald-600 text-white rounded-lg text-center font-bold">
              Message received! I'll be in touch within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 outline-none focus:border-emerald-500" />
              <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 outline-none focus:border-emerald-500" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 outline-none focus:border-emerald-500" />
                <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 outline-none focus:border-emerald-500">
                  <option value="portrait">Portrait</option>
                  <option value="event">Event</option>
                  <option value="brand">Branding</option>
                </select>
              </div>
              <button disabled={status === 'loading'} type="submit" className="w-full py-4 bg-emerald-600 font-bold rounded hover:bg-emerald-500 transition-colors disabled:opacity-50">
                {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-12 text-center text-neutral-500 text-sm">
        <p>© 2024 Elara Vance Photography. Built with craft and care.</p>
      </footer>
    </div>
  );
}