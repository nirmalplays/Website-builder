import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Mail, MapPin, Phone, Users, Zap, Shield, Sparkles, Building2 } from 'lucide-react';

export default function App() {
  const projects = [
    { name: "Lumina Pavilion", year: "2023", type: "Public Cultural", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
    { name: "Cedar Ridge Villa", year: "2022", type: "Residential", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" },
    { name: "Urban Tech Hub", year: "2024", type: "Commercial", img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800" },
    { name: "Coastal Retreat", year: "2021", type: "Hospitality", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans">
      {/* Nav */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter">ELARA STUDIO</div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
            {['Works', 'Philosophy', 'Services', 'Team', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-stone-900 transition-colors">{item}</a>
            ))}
          </div>
          <button className="bg-stone-900 text-white px-5 py-2 text-sm rounded-full hover:bg-stone-700 transition">Inquire</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8">Architecture of <br/> intentional stillness.</h1>
        <div className="relative h-[500px] w-full bg-stone-100 rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=2400" alt="Signature building" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Works */}
      <section id="works" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-stone-500 mb-12 font-semibold">Selected Works</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden rounded-xl mb-4 bg-stone-100">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-medium">{p.name}</h3>
                  <p className="text-stone-500">{p.type}</p>
                </div>
                <span className="text-sm font-light text-stone-400">{p.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Sparkles className="mx-auto mb-6 text-stone-400" />
          <h2 className="text-4xl font-light mb-8">We believe that architecture is the art of framing human experience, not just building structures.</h2>
          <p className="text-stone-600 leading-relaxed text-lg">Founded in 2015, Elara Studio prioritizes sustainable materiality, light-driven spatial planning, and an unwavering commitment to the local context of every project we undertake.</p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        {[
          { icon: <Building2 />, title: "Master Planning", desc: "Strategic development of urban landscapes and campus environments." },
          { icon: <Shield />, title: "Sustainable Design", desc: "Net-zero focused methodology integrating passive heating and cooling." },
          { icon: <Zap />, title: "Interior Architecture", desc: "Holistic interior solutions that harmonize form, function, and lighting." }
        ].map((s, i) => (
          <div key={i} className="p-8 border border-stone-100 rounded-2xl hover:border-stone-200 transition">
            <div className="mb-4 text-stone-900">{s.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-stone-500 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-sm uppercase tracking-widest text-stone-400 mb-12 font-semibold">The Collective</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {['Elena Vance', 'Marcus Thorne', 'Sarah Jenkins', 'David Kim'].map((name, i) => (
              <div key={i}>
                <div className="w-full aspect-square bg-stone-800 rounded-lg mb-4"></div>
                <h4 className="font-medium">{name}</h4>
                <p className="text-stone-400 text-sm">Principal Architect</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl font-light mb-8">Let's build something extraordinary.</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-stone-600"><MapPin size={20}/> 124 Architecture Lane, Portland, OR</div>
              <div className="flex items-center gap-3 text-stone-600"><Mail size={20}/> hello@elarastudio.com</div>
              <div className="flex items-center gap-3 text-stone-600"><Phone size={20}/> +1 (503) 555-0192</div>
            </div>
          </div>
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="w-full p-4 bg-stone-50 rounded-lg border-0 focus:ring-2 focus:ring-stone-900"/>
            <input type="email" placeholder="Email" className="w-full p-4 bg-stone-50 rounded-lg border-0 focus:ring-2 focus:ring-stone-900"/>
            <textarea placeholder="Tell us about your project" rows={4} className="w-full p-4 bg-stone-50 rounded-lg border-0 focus:ring-2 focus:ring-stone-900"></textarea>
            <button className="w-full bg-stone-900 text-white py-4 rounded-lg font-medium hover:bg-stone-700 transition">Send Inquiry</button>
          </form>
        </div>
      </section>

      <footer className="py-8 border-t border-stone-100 text-center text-stone-400 text-sm">
        © 2024 Elara Studio Architecture. All rights reserved.
      </footer>
    </div>
  );
}