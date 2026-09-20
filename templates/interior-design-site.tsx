import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Zap, Shield, Sparkles, Star, Calendar, Mail, User, Menu, X, Check } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const projects = [
    { title: "Azure Waterfront Villa", type: "Living Room", location: "Miami, FL", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800" },
    { title: "Minimalist Loft", type: "Kitchen", location: "New York, NY", img: "https://images.unsplash.com/photo-1556912173-3d706393a771?auto=format&fit=crop&q=80&w=800" },
    { title: "Mid-Century Retreat", type: "Bedroom", location: "Austin, TX", img: "https://images.unsplash.com/photo-1616594822273-2bebc16563fe?auto=format&fit=crop&q=80&w=800" },
  ];

  const services = [
    { name: "Concept Development", price: "$1,500", desc: "Initial space planning, mood boards, and aesthetic direction." },
    { name: "Full Furnishing", price: "$4,200", desc: "Sourcing, procurement, and white-glove installation." },
    { name: "Renovation Design", price: "$8,500", desc: "Technical drawings, contractor coordination, and site visits." },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 bg-stone-50/80 backdrop-blur-md z-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-stone-900">LUMINA INTERIORS</span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
            {['Portfolio', 'Process', 'Services', 'Contact'].map(link => <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-amber-700 transition">{link}</a>)}
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">Elevating spaces through intentional design.</h1>
          <p className="text-lg text-stone-600 mb-8 max-w-md">We create bespoke interiors that balance modern functionality with timeless aesthetic elegance for your home.</p>
          <button className="bg-stone-900 text-white px-8 py-4 rounded hover:bg-stone-700 transition flex items-center gap-2">
            View Our Portfolio <ArrowRight size={18} />
          </button>
        </div>
        <div className="h-[400px] bg-stone-200 rounded-2xl overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200" alt="Interior Design" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Projects */}
      <section id="portfolio" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-serif mb-12">Featured Projects</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="h-80 bg-stone-200 rounded-lg overflow-hidden mb-4">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-stone-500 text-sm">{p.type} • {p.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-stone-900 text-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-serif mb-16 text-center">Our Design Journey</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[ { icon: Sparkles, step: "Discovery", desc: "Understanding your lifestyle and goals." }, { icon: Zap, step: "Concept", desc: "Curating palettes and spatial layouts." }, { icon: Shield, step: "Execution", desc: "Sourcing and procurement oversight." }, { icon: Check, step: "Reveal", desc: "Styling and final transformation." } ].map((item, i) => (
              <div key={i} className="border-t border-stone-700 pt-8">
                <item.icon className="mb-4 text-amber-500" />
                <h4 className="font-bold mb-2">0{i+1}. {item.step}</h4>
                <p className="text-stone-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-serif mb-12">Design Packages</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="border border-stone-200 p-8 rounded-2xl hover:border-amber-600 transition">
              <h3 className="text-xl font-bold mb-2">{s.name}</h3>
              <p className="text-amber-700 font-bold mb-4">{s.price} <span className="text-stone-400 text-sm font-normal">starting</span></p>
              <p className="text-stone-600 text-sm mb-6">{s.desc}</p>
              <button className="text-sm font-semibold flex items-center gap-2 hover:underline">Learn more <ChevronRight size={16}/></button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-20">
        <div className="bg-white p-10 rounded-3xl border border-stone-200 shadow-sm">
          <h2 className="text-3xl font-serif mb-6">Start Your Project</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="w-full p-4 bg-stone-50 rounded border border-stone-200" />
              <input type="email" placeholder="Email Address" className="w-full p-4 bg-stone-50 rounded border border-stone-200" />
            </div>
            <textarea placeholder="Tell us about your space..." className="w-full p-4 bg-stone-50 rounded border border-stone-200 h-32" />
            <button className="w-full bg-amber-700 text-white py-4 rounded font-bold hover:bg-amber-800 transition">Request Consultation</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-12 text-center text-stone-500 text-sm">
        <p className="mb-4 font-bold text-stone-900">LUMINA INTERIORS</p>
        <p>© 2024 Lumina Design Studio. Crafted for modern living.</p>
      </footer>
    </div>
  );
}