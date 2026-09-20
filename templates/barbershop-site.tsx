import React, { useState, useEffect } from 'react';
import { Scissors, Calendar, Clock, Star, Users, CheckCircle, ChevronDown, MapPin, Phone, Mail, Camera as Instagram, Scissors as CutIcon } from "lucide-react";

const INITIAL_SERVICES = [
  { id: 1, name: 'Classic Gentlemen\'s Cut', price: 35, duration: '45 min' },
  { id: 2, name: 'Hot Towel Shave', price: 30, duration: '30 min' },
  { id: 3, name: 'Beard Trim & Shape', price: 20, duration: '20 min' },
  { id: 4, name: 'The Executive Package', price: 60, duration: '75 min' },
];

const BARBERS = [
  { id: 1, name: 'Marcus Thorne', exp: '12 years', spec: 'Fade specialist' },
  { id: 2, name: 'Elena Rossi', exp: '8 years', spec: 'Classic scissor cuts' },
];

export default function App() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookings, setBookings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('barber-bookings') || '[]'); }
    catch { return []; }
  });

  const [formData, setFormData] = useState({ name: '', service: '', barber: '', date: '' });

  useEffect(() => {
    localStorage.setItem('barber-bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.service || !formData.barber || !formData.date) return;
    
    setLoading(true);
    setTimeout(() => {
      setBookings([...bookings, { ...formData, id: Date.now() }]);
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', service: '', barber: '', date: '' });
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 bg-white border-b border-neutral-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
            <CutIcon className="text-amber-600" /> IRON & BLADE
          </div>
          <a href="#booking" className="bg-neutral-900 text-white px-6 py-2 rounded-full font-medium hover:bg-neutral-800 transition">Book Now</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-20 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">Crafting Excellence<br/>One Cut At A Time</h1>
          <p className="text-neutral-400 text-lg mb-10 max-w-2xl mx-auto">Premium grooming services for the modern gentleman. Experience the perfect blend of tradition and trend.</p>
          <a href="#booking" className="inline-block bg-amber-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-700 transition">Reserve Your Chair</a>
        </div>
      </header>

      {/* Services */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Services & Pricing</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {INITIAL_SERVICES.map(s => (
            <div key={s.id} className="bg-white p-6 rounded-2xl border border-neutral-200 flex justify-between items-center shadow-sm">
              <div>
                <h3 className="font-bold text-lg">{s.name}</h3>
                <p className="text-neutral-500 text-sm flex items-center gap-1"><Clock size={14}/> {s.duration}</p>
              </div>
              <span className="font-bold text-xl text-amber-600">${s.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Barbers */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Master Barbers</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {BARBERS.map(b => (
              <div key={b.id} className="flex gap-6 items-center">
                <div className="w-24 h-24 bg-neutral-200 rounded-full overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1599351431202-180f0b484559?auto=format&fit=crop&w=200&h=200`} alt={b.name} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{b.name}</h3>
                  <p className="text-amber-600 font-medium">{b.spec}</p>
                  <p className="text-neutral-500">{b.exp} experience</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-20 max-w-2xl mx-auto px-6">
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>
          {success ? (
            <div className="text-center py-10 bg-green-50 text-green-700 rounded-xl border border-green-200">
              <CheckCircle className="mx-auto mb-4" size={48} />
              <p className="text-lg font-bold">Booking Confirmed!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="Full Name" className="w-full p-4 border rounded-xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <select required className="w-full p-4 border rounded-xl" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                <option value="">Select Service</option>
                {INITIAL_SERVICES.map(s => <option key={s.id} value={s.name}>{s.name} (${s.price})</option>)}
              </select>
              <select required className="w-full p-4 border rounded-xl" value={formData.barber} onChange={e => setFormData({...formData, barber: e.target.value})}>
                <option value="">Select Barber</option>
                {BARBERS.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
              </select>
              <input type="date" required className="w-full p-4 border rounded-xl" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              <button disabled={loading} className="w-full bg-amber-600 text-white p-4 rounded-xl font-bold hover:bg-amber-700 transition disabled:opacity-50">
                {loading ? 'Confirming...' : 'Confirm Booking'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4">Iron & Blade</h4>
            <p className="flex items-center gap-2"><MapPin size={16}/> 123 Groom St, Cityville, ST 90210</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Hours</h4>
            <p>Mon-Fri: 9am - 8pm</p>
            <p>Sat-Sun: 10am - 6pm</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p className="flex items-center gap-2"><Phone size={16}/> (555) 123-4567</p>
            <p className="flex items-center gap-2"><Mail size={16}/> booking@ironblade.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}