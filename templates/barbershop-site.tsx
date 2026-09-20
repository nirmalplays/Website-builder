import React, { useState } from 'react';
import { Scissors, Calendar, Clock, Star, MapPin, ChevronRight, User, Phone, Zap } from 'lucide-react';

export default function App() {
  const [activeBarber, setActiveBarber] = useState('Marcus Thorne');

  const services = [
    { name: 'Classic Gentleman\'s Cut', price: '$45', duration: '45 min' },
    { name: 'Hot Towel Shave', price: '$35', duration: '30 min' },
    { name: 'Beard Trim & Shape', price: '$25', duration: '20 min' },
    { name: 'The Executive Combo', price: '$70', duration: '75 min' },
  ];

  const barbers = [
    { name: 'Marcus Thorne', specialty: 'Precision Fades', years: 12, img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=400&q=80' },
    { name: 'Julian Vane', specialty: 'Classic Scissor Cuts', years: 8, img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter uppercase flex items-center gap-2">
          <Scissors className="text-amber-600" /> VANGUARD BARBER
        </div>
        <div className="hidden md:flex gap-8 font-medium text-sm uppercase tracking-widest">
          {['Services', 'Barbers', 'Reviews', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-amber-600 transition-colors">{item}</a>
          ))}
        </div>
        <button className="bg-neutral-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-600 transition-colors">Book Now</button>
      </nav>

      <header className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 max-w-3xl">
          Crafting Your Signature Look.
        </h1>
        <p className="text-xl text-neutral-600 mb-10 max-w-xl">
          Modern precision meets traditional craftsmanship. Experience the city's finest grooming services in a classic atmosphere.
        </p>
        <button className="flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-700 transition-all">
          Schedule Appointment <ChevronRight size={20} />
        </button>
      </header>

      <section id="services" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16">Services & Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s) => (
              <div key={s.name} className="flex justify-between items-center border-b border-neutral-200 pb-6">
                <div>
                  <h3 className="text-xl font-semibold">{s.name}</h3>
                  <p className="text-neutral-500 flex items-center gap-2 mt-1 text-sm"><Clock size={14} /> {s.duration}</p>
                </div>
                <span className="text-2xl font-bold text-amber-600">{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="barbers" className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16">Meet Our Barbers</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {barbers.map((b) => (
            <div key={b.name} className="group relative overflow-hidden rounded-2xl bg-neutral-900">
              <img src={b.img} alt={b.name} className="w-full h-96 object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-3xl font-bold">{b.name}</h3>
                <p className="text-amber-500 font-medium mt-1">{b.specialty}</p>
                <p className="text-neutral-300 text-sm mt-2">{b.years} Years of Experience</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="booking" className="py-24 bg-neutral-900 text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Book Your Session</h2>
          <div className="bg-white text-neutral-900 p-8 rounded-2xl shadow-xl">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Select Barber</label>
                  <select className="w-full p-3 bg-neutral-100 rounded-lg outline-none focus:ring-2 focus:ring-amber-600">
                    <option>Marcus Thorne</option>
                    <option>Julian Vane</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Service</label>
                  <select className="w-full p-3 bg-neutral-100 rounded-lg outline-none focus:ring-2 focus:ring-amber-600">
                    {services.map(s => <option key={s.name}>{s.name} ({s.price})</option>)}
                  </select>
                </div>
              </div>
              <button className="w-full bg-amber-600 text-white py-4 rounded-lg font-bold hover:bg-amber-700">Confirm Booking</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-sm text-neutral-600">
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">VANGUARD BARBER</h4>
            <p className="flex items-start gap-2"><MapPin size={18} /> 422 Industrial Way, Brooklyn, NY 11211</p>
            <p className="flex items-center gap-2 mt-2"><Phone size={18} /> (718) 555-0199</p>
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">Hours</h4>
            <div className="space-y-1">
              <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
              <p>Sat: 10:00 AM - 6:00 PM</p>
              <p>Sun: Closed</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-neutral-100 px-4 py-2 rounded-md flex-1" />
              <button className="bg-neutral-900 text-white px-4 py-2 rounded-md"><Zap size={16} /></button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}