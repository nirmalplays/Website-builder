import React, { useState, useEffect } from 'react';
import { Scissors, Calendar, Clock, Star, Users, CheckCircle, X, ChevronDown, MapPin, Phone } from 'lucide-react';

const INITIAL_SERVICES = [
  { id: 1, name: 'Executive Haircut', price: 45, duration: '45 min' },
  { id: 2, name: 'Classic Hot Towel Shave', price: 35, duration: '30 min' },
  { id: 3, name: 'Beard Trim & Shape', price: 25, duration: '20 min' },
  { id: 4, name: 'Full Service Package', price: 70, duration: '75 min' },
];

const BARBERS = [
  { id: 1, name: 'Marcus Thorne', exp: 12, specialty: 'Fades & Precision', img: 'https://images.unsplash.com/photo-1599351431202-180f0b6785c3?auto=format&fit=crop&q=80&w=300' },
  { id: 2, name: 'Elena Rossi', exp: 8, specialty: 'Classic Scissor Cuts', img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=300' },
];

export default function App() {
  const [booking, setBooking] = useState({ name: '', serviceId: '', barberId: '', time: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [activeTab, setActiveTab] = useState('home');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setBooking({ name: '', serviceId: '', barberId: '', time: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      <nav className="fixed w-full z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tighter text-amber-500">IRON & BLADE</h1>
          <div className="flex gap-6">
            {['Services', 'Barbers', 'Booking'].map((item) => (
              <button key={item} onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-500 transition-colors uppercase text-sm font-semibold">
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <header className="pt-32 pb-20 px-6 text-center">
        <h2 className="text-6xl md:text-8xl font-black mb-6 uppercase">Master Your Grooming</h2>
        <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto">Premium cuts, hot towel shaves, and top-tier grooming services in the heart of the city.</p>
        <button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })} className="bg-amber-500 text-stone-950 px-10 py-4 font-bold rounded-full hover:bg-amber-400 transition-all">Book Your Spot</button>
      </header>

      <section id="services" className="py-20 bg-stone-900">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-4xl font-bold mb-12 text-center">Our Services</h3>
          <div className="grid gap-4">
            {INITIAL_SERVICES.map(s => (
              <div key={s.id} className="flex justify-between items-center p-6 bg-stone-950 rounded-lg border border-stone-800">
                <div>
                  <h4 className="font-bold text-lg">{s.name}</h4>
                  <p className="text-stone-500 text-sm">{s.duration}</p>
                </div>
                <span className="text-amber-500 font-bold text-xl">${s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="barbers" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-bold mb-12 text-center">Meet The Team</h3>
          <div className="grid md:grid-cols-2 gap-10">
            {BARBERS.map(b => (
              <div key={b.id} className="bg-stone-900 p-6 rounded-2xl flex gap-6 items-center">
                <img src={b.img} alt={b.name} className="w-32 h-32 rounded-full object-cover" />
                <div>
                  <h4 className="text-2xl font-bold">{b.name}</h4>
                  <p className="text-amber-500">{b.exp} Years Experience</p>
                  <p className="text-stone-400 mt-2">{b.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 bg-amber-500 text-stone-950">
        <div className="max-w-xl mx-auto px-6">
          <h3 className="text-4xl font-bold mb-8">Book an Appointment</h3>
          {status === 'success' ? (
            <div className="p-8 bg-stone-950 text-white rounded-xl text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-2xl font-bold">Booking Confirmed!</h4>
              <p>We'll see you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4">
              <input required type="text" placeholder="Your Name" className="w-full p-4 rounded-lg bg-white" value={booking.name} onChange={e => setBooking({...booking, name: e.target.value})} />
              <select required className="w-full p-4 rounded-lg bg-white" value={booking.serviceId} onChange={e => setBooking({...booking, serviceId: e.target.value})}>
                <option value="">Select Service</option>
                {INITIAL_SERVICES.map(s => <option key={s.id} value={s.id}>{s.name} (${s.price})</option>)}
              </select>
              <select required className="w-full p-4 rounded-lg bg-white" value={booking.barberId} onChange={e => setBooking({...booking, barberId: e.target.value})}>
                <option value="">Select Barber</option>
                {BARBERS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
              <button type="submit" disabled={status === 'loading'} className="w-full bg-stone-950 text-white p-4 rounded-lg font-bold hover:bg-stone-800">
                {status === 'loading' ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-12 border-t border-stone-900 bg-stone-950">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-amber-500 mb-2">IRON & BLADE</h4>
            <p className="text-stone-500 text-sm">123 Grooming Lane, City Center</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Hours</h4>
            <p className="text-stone-500 text-sm">Mon-Fri: 9am - 8pm</p>
            <p className="text-stone-500 text-sm">Sat-Sun: 10am - 6pm</p>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-amber-500" />
            <span>(555) 123-4567</span>
          </div>
        </div>
      </footer>
    </div>
  );
}