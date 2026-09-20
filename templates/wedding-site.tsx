import React, { useState } from 'react';
import { Heart, Calendar, Clock, MapPin, Users, Gift, Plane, Mail, CheckCircle } from 'lucide-react';

export default function App() {
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-serif">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-semibold tracking-tighter">E & J</span>
          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest text-stone-600">
            {['Story', 'Details', 'Party', 'RSVP'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-amber-700 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20" />
        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl mb-6">Elena & Julian</h1>
          <p className="text-xl md:text-2xl font-light italic">September 14, 2024</p>
          <div className="mt-8 flex justify-center text-amber-700"><Heart size={32} fill="currentColor" /></div>
        </div>
      </header>

      {/* Story */}
      <section id="story" className="py-24 max-w-3xl mx-auto px-6">
        <h2 className="text-4xl text-center mb-16">Our Journey</h2>
        <div className="space-y-12 border-l-2 border-amber-200 pl-8">
          {[
            { year: "2018", event: "First coffee at The Roasted Bean, where Julian spilled his latte." },
            { year: "2020", event: "Moved into our first apartment in Brooklyn during the great lockdown." },
            { year: "2023", event: "Julian proposed under the Northern Lights in Iceland." }
          ].map((step, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[41px] bg-amber-700 p-1 rounded-full"><div className="w-3 h-3 bg-white rounded-full" /></div>
              <h3 className="text-xl font-bold mb-2">{step.year}</h3>
              <p className="text-stone-600 leading-relaxed">{step.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section id="details" className="py-24 bg-stone-100">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl mb-6 flex items-center gap-3"><Calendar className="text-amber-700" /> Ceremony</h3>
            <p className="font-semibold">St. Jude’s Chapel</p>
            <p className="text-stone-600">4:00 PM - 5:00 PM</p>
            <p className="mt-2 text-sm text-stone-500">123 Garden Lane, Savannah, GA</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl mb-6 flex items-center gap-3"><Clock className="text-amber-700" /> Reception</h3>
            <p className="font-semibold">The Willow Estate</p>
            <p className="text-stone-600">6:00 PM - 11:00 PM</p>
            <p className="mt-2 text-sm text-stone-500">450 River Road, Savannah, GA</p>
          </div>
        </div>
      </section>

      {/* Party */}
      <section id="party" className="py-24 max-w-5xl mx-auto px-6">
        <h2 className="text-4xl text-center mb-16">Bridal Party</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {['Sarah Jenkins', 'Marcus Thorne', 'Chloe Davis', 'David Wu'].map((name) => (
            <div key={name} className="text-center">
              <div className="w-32 h-32 bg-stone-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img src={`https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300`} alt={name} />
              </div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-stone-500">Bridesmaid</p>
            </div>
          ))}
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-24 bg-amber-50">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-4xl text-center mb-12">RSVP</h2>
          {rsvpSubmitted ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <CheckCircle size={48} className="mx-auto text-green-600 mb-4" />
              <p className="text-xl">Thank you! We've received your response.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setRsvpSubmitted(true); }} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
              <input type="text" placeholder="Full Name" className="w-full p-3 border border-stone-200 rounded" required />
              <select className="w-full p-3 border border-stone-200 rounded">
                <option>Chicken Piccata</option>
                <option>Pan-Seared Salmon</option>
                <option>Vegetarian Risotto</option>
              </select>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="plusone" />
                <label htmlFor="plusone">Attending with a plus one?</label>
              </div>
              <button className="w-full bg-stone-800 text-white py-3 rounded hover:bg-amber-700 transition-colors uppercase tracking-widest text-sm">
                Confirm Attendance
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Travel & Registry */}
      <section className="py-24 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-2xl mb-6 flex items-center gap-2"><Plane /> Travel</h3>
          <p className="text-stone-600">We have reserved a block of rooms at The Grand Savannah Hotel. Use code "ELENAJULIAN" for a discounted rate.</p>
        </div>
        <div>
          <h3 className="text-2xl mb-6 flex items-center gap-2"><Gift /> Registry</h3>
          <p className="text-stone-600">Your presence is the greatest gift, but if you wish to contribute, we are registered at Honeyfund and Crate & Barrel.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-stone-500 border-t border-stone-200">
        <p className="font-serif italic text-lg mb-2">With love,</p>
        <p className="text-sm">Elena & Julian © 2024</p>
      </footer>
    </div>
  );
}