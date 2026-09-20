import React, { useState } from 'react';
import { Calendar, Clock, Star, Zap, Users, ChevronRight, CheckCircle, Mail, MapPin, Phone, Camera as Instagram, ArrowRight } from "lucide-react";

export default function App() {
  const [activeDay, setActiveDay] = useState('Monday');

  const classes = {
    Monday: [{ time: '07:00 AM', name: 'Sunrise Flow', teacher: 'Sarah Jenkins' }, { time: '06:00 PM', name: 'Deep Yin', teacher: 'Marcus Thorne' }],
    Tuesday: [{ time: '08:30 AM', name: 'Power Vinyasa', teacher: 'Elena Rossi' }, { time: '05:30 PM', name: 'Restorative Yoga', teacher: 'Sarah Jenkins' }],
    Wednesday: [{ time: '07:00 AM', name: 'Sunrise Flow', teacher: 'Sarah Jenkins' }, { time: '06:00 PM', name: 'Pilates Fusion', teacher: 'Marcus Thorne' }],
    Thursday: [{ time: '08:30 AM', name: 'Power Vinyasa', teacher: 'Elena Rossi' }, { time: '05:30 PM', name: 'Mindful Meditation', teacher: 'Elena Rossi' }],
    Friday: [{ time: '07:00 AM', name: 'Sunrise Flow', teacher: 'Sarah Jenkins' }, { time: '04:00 PM', name: 'Community Slow Flow', teacher: 'Marcus Thorne' }],
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Nav */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-6xl mx-auto">
        <div className="text-2xl font-bold tracking-tight text-emerald-800">ZENITH YOGA</div>
        <div className="hidden md:flex gap-8 font-medium text-sm uppercase tracking-widest">
          {['Schedule', 'Classes', 'Teachers', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-emerald-700 transition">{item}</a>
          ))}
        </div>
        <button className="bg-emerald-800 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-900 transition">Book Now</button>
      </nav>

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-emerald-700 font-semibold tracking-wider uppercase text-sm">Welcome to your sanctuary</span>
          <h1 className="text-5xl md:text-7xl font-light mt-4 mb-6 leading-tight">Find balance in the <span className="italic">chaos</span>.</h1>
          <p className="text-lg text-stone-600 mb-8">Join our community of mindful practitioners. Start your journey today with your first class on us.</p>
          <button className="bg-emerald-800 text-white px-8 py-4 rounded-lg flex items-center gap-2 hover:bg-emerald-900 transition">
            Claim Free Class <ArrowRight size={18} />
          </button>
        </div>
        <div className="h-80 md:h-96 bg-stone-200 rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" alt="Yoga practice" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Schedule */}
      <section id="schedule" className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-10 text-center">Weekly Schedule</h2>
          <div className="flex gap-2 justify-center mb-8 overflow-x-auto pb-2">
            {Object.keys(classes).map(day => (
              <button 
                key={day} 
                onClick={() => setActiveDay(day)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeDay === day ? 'bg-emerald-100 text-emerald-900' : 'bg-stone-100'}`}
              >
                {day}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {classes[activeDay as keyof typeof classes].map((session, i) => (
              <div key={i} className="flex justify-between items-center p-6 bg-stone-50 rounded-xl border border-stone-100">
                <div>
                  <p className="font-semibold">{session.name}</p>
                  <p className="text-sm text-stone-500">{session.teacher}</p>
                </div>
                <div className="flex items-center gap-4 text-emerald-700 font-medium">
                  <span className="flex items-center gap-1 text-sm"><Clock size={16} /> {session.time}</span>
                  <button className="text-xs border border-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-700 hover:text-white transition">Reserve</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes */}
      <section id="classes" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-light mb-12 text-center">Class Styles</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Vinyasa Flow', desc: 'Dynamic sequences connecting movement with breath to build heat and flexibility.' },
            { title: 'Deep Yin', desc: 'Slow-paced poses held for 3-5 minutes to target deep connective tissues.' },
            { title: 'Restorative', desc: 'Gentle support to calm the nervous system and promote deep relaxation.' }
          ].map((c, i) => (
            <div key={i} className="p-8 bg-white rounded-2xl border border-stone-100 shadow-sm">
              <Zap className="text-emerald-700 mb-4" />
              <h3 className="text-xl mb-3">{c.title}</h3>
              <p className="text-stone-600 text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-stone-900 text-stone-100 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-12 text-center">Membership Options</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border border-stone-700 rounded-2xl">
              <h3 className="text-lg font-semibold">Drop-in Pass</h3>
              <p className="text-4xl font-light my-4">$25</p>
              <ul className="space-y-3 mb-8 text-stone-400">
                <li className="flex items-center gap-2"><CheckCircle size={16} /> Single class access</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} /> Access to all levels</li>
              </ul>
            </div>
            <div className="p-8 bg-emerald-800 rounded-2xl relative overflow-hidden">
              <h3 className="text-lg font-semibold">Monthly Unlimited</h3>
              <p className="text-4xl font-light my-4">$120</p>
              <ul className="space-y-3 mb-8 text-emerald-100">
                <li className="flex items-center gap-2"><CheckCircle size={16} /> Unlimited classes</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} /> 10% off workshops</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} /> Guest passes (2/mo)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-light mb-16">Community Voices</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {[
            { quote: "Zenith has become my second home. The teachers are incredibly supportive.", name: "Sarah K." },
            { quote: "I've gained so much strength and clarity since joining. Highly recommended.", name: "David M." }
          ].map((t, i) => (
            <div key={i} className="relative">
              <p className="italic text-lg text-stone-600 mb-4">"{t.quote}"</p>
              <p className="font-bold text-emerald-800">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-4">ZENITH YOGA</h4>
            <p className="text-stone-500">123 Wellness Way<br/>Coastal City, CA 90210</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-stone-500">hello@zenithyoga.com<br/>(555) 123-4567</p>
          </div>
          <div className="col-span-2 text-stone-500">
            <h4 className="font-bold mb-4 text-stone-800">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-stone-100 px-4 py-2 rounded-full w-full outline-none" />
              <button className="bg-emerald-800 text-white px-4 py-2 rounded-full"><Mail size={16} /></button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}