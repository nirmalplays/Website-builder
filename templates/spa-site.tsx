import React, { useState } from 'react';
import { 
  Calendar, Clock, DollarSign, Star, Zap, Shield, 
  ChevronRight, Sparkles, User, Mail, Phone, MapPin 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Treatments');

  const treatments = [
    { name: 'Deep Tissue Massage', time: '60 min', price: 120 },
    { name: 'Hydrating Facial', time: '45 min', price: 95 },
    { name: 'Hot Stone Therapy', time: '90 min', price: 160 },
    { name: 'Aromatherapy Soak', time: '30 min', price: 65 },
  ];

  const packages = [
    { title: 'The Serenity Escape', desc: 'Full body massage, facial, and herbal tea service.', price: 250 },
    { title: 'Rejuvenation Day', desc: 'Exfoliation, deep tissue, and scalp treatment.', price: 320 },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-6xl mx-auto">
        <div className="text-2xl font-serif tracking-tighter text-emerald-800">AURA SPA</div>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {['Treatments', 'Packages', 'Facilities', 'Contact'].map(item => (
            <button key={item} className="hover:text-emerald-600 transition-colors">{item}</button>
          ))}
        </div>
        <button className="bg-emerald-700 text-white px-5 py-2 rounded-full text-sm hover:bg-emerald-800">Book Now</button>
      </nav>

      {/* Hero */}
      <header className="px-6 py-16 md:py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif leading-tight mb-6">Rediscover your inner <span className="text-emerald-700">balance.</span></h1>
          <p className="text-lg text-stone-600 mb-8 max-w-md">Experience world-class rejuvenation in our sanctuary designed for your ultimate peace and physical restoration.</p>
          <div className="flex gap-4">
            <button className="bg-emerald-700 text-white px-8 py-4 rounded-lg flex items-center gap-2 hover:bg-emerald-800">
              Book a Treatment <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="h-96 bg-stone-200 rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1540555700478-4be2894becef?auto=format&fit=crop&q=80&w=800" alt="Spa interior" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Treatments Menu */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif mb-12 text-center">Treatment Menu</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {treatments.map((t, i) => (
            <div key={i} className="flex justify-between items-center border-b border-stone-200 py-4">
              <div>
                <h3 className="font-semibold text-lg">{t.name}</h3>
                <div className="flex items-center gap-2 text-stone-500 text-sm mt-1">
                  <Clock size={14} /> {t.time}
                </div>
              </div>
              <span className="font-serif text-xl text-emerald-800">${t.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Packages & Facilities */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-serif mb-8">Spa Packages</h2>
            {packages.map((p, i) => (
              <div key={i} className="mb-6 p-6 border border-stone-100 rounded-xl bg-stone-50">
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-stone-600 text-sm mb-4">{p.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="font-serif text-2xl text-emerald-700">${p.price}</span>
                  <button className="text-emerald-700 font-medium flex items-center text-sm">View Details <ChevronRight size={16}/></button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-3xl font-serif mb-8">Our Facilities</h2>
            <div className="space-y-4">
              {['Infinity Hydrotherapy Pool', 'Himalayan Salt Sauna', 'Steam Room', 'Zen Relaxation Lounge'].map(f => (
                <div key={f} className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg">
                  <Sparkles className="text-emerald-600" size={20} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <div className="bg-emerald-900 text-emerald-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-serif mb-8 text-center">Request an Appointment</h2>
          <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="p-3 rounded-lg bg-emerald-800 border-emerald-700 border placeholder-emerald-400" />
              <input type="email" placeholder="Email Address" className="p-3 rounded-lg bg-emerald-800 border-emerald-700 border placeholder-emerald-400" />
            </div>
            <select className="p-3 rounded-lg bg-emerald-800 border-emerald-700 border text-emerald-100">
              <option>Select Treatment</option>
              <option>Deep Tissue Massage</option>
              <option>Hydrating Facial</option>
            </select>
            <textarea placeholder="Special Requests" className="p-3 rounded-lg bg-emerald-800 border-emerald-700 border placeholder-emerald-400 h-32"></textarea>
            <button className="bg-white text-emerald-900 py-4 rounded-lg font-bold hover:bg-emerald-50">Submit Request</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-stone-500 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-left">
            <p className="font-bold text-stone-900 mb-2">Aura Spa & Wellness</p>
            <p>123 Serenity Way, Coastal City</p>
            <p>Open Daily: 9am - 8pm</p>
          </div>
          <div className="flex gap-6">
            <Mail /> <Phone /> <MapPin />
          </div>
          <p>© 2024 Aura Spa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}