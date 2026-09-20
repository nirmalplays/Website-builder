import React, { useState, useEffect } from 'react';
import { 
  Calendar, Users, ChevronDown, Star, Wifi, Coffee, MapPin, 
  Shield, Clock, Sparkles, CheckCircle, ArrowRight, Menu, X,
  DollarSign, Package, Zap
} from 'lucide-react';

const ROOMS = [
  { id: 1, name: 'Ocean View Suite', price: 450, guests: 2, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Deluxe Garden Room', price: 290, guests: 3, image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Family Penthouse', price: 650, guests: 5, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800' },
];

const AMENITIES = [
  { icon: Wifi, title: 'High-Speed Wi-Fi' },
  { icon: Coffee, title: 'Gourmet Breakfast' },
  { icon: Sparkles, title: 'Daily Housekeeping' },
  { icon: Shield, title: '24/7 Security' },
  { icon: Clock, title: 'Concierge Service' },
  { icon: Zap, title: 'Fitness Center' },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [booking, setBooking] = useState({ checkIn: '', checkOut: '', guests: 1 });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFeedback('Booking inquiry submitted! Our team will contact you shortly.');
      setTimeout(() => setFeedback(''), 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <span className="text-2xl font-serif font-bold text-emerald-900">ELYSIA RESORT</span>
          <div className="hidden md:flex space-x-8 font-medium text-sm tracking-wider uppercase">
            {['Rooms', 'Amenities', 'Dining', 'Reviews'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-emerald-700 transition-colors">{item}</a>
            ))}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover" alt="Hotel exterior" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Experience Serenity</h1>
          <p className="text-xl mb-10 opacity-90">Luxury island escape designed for the modern traveler.</p>
        </div>
      </section>

      {/* Booking Bar */}
      <div className="max-w-5xl mx-auto -mt-20 relative z-20 px-4">
        <form onSubmit={handleBooking} className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl grid md:grid-cols-4 gap-4 items-end">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-stone-500">Check In</label>
            <input type="date" required className="w-full border-b border-stone-300 py-2 focus:outline-none" onChange={e => setBooking({...booking, checkIn: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-stone-500">Check Out</label>
            <input type="date" required className="w-full border-b border-stone-300 py-2 focus:outline-none" onChange={e => setBooking({...booking, checkOut: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-stone-500">Guests</label>
            <select className="w-full border-b border-stone-300 py-2 focus:outline-none bg-transparent" onChange={e => setBooking({...booking, guests: parseInt(e.target.value)})}>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Guests</option>)}
            </select>
          </div>
          <button disabled={loading} className="bg-emerald-900 text-white py-3 rounded-lg hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2">
            {loading ? 'Processing...' : <>Check Availability <ArrowRight size={18} /></>}
          </button>
        </form>
        {feedback && <div className="mt-4 p-4 bg-emerald-100 text-emerald-900 rounded-lg text-center font-medium">{feedback}</div>}
      </div>

      {/* Rooms */}
      <section id="rooms" className="py-24 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-serif mb-12 text-center">Our Accommodations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {ROOMS.map(room => (
            <div key={room.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200 group">
              <div className="h-64 overflow-hidden">
                <img src={room.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={room.name} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                <div className="flex justify-between items-center text-emerald-900 font-bold mb-4">
                  <span>${room.price}/night</span>
                  <span className="text-sm font-normal text-stone-500">Max {room.guests} guests</span>
                </div>
                <button className="w-full py-2 border border-emerald-900 text-emerald-900 rounded hover:bg-emerald-900 hover:text-white transition-colors">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="bg-stone-100 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif mb-16 text-center">Premium Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            {AMENITIES.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-white rounded-full shadow-sm text-emerald-900"><item.icon size={28} /></div>
                <h4 className="font-bold">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-serif text-white">ELYSIA RESORT</span>
            <p className="mt-4 text-sm">Where luxury meets the horizon. Your perfect getaway begins with us.</p>
          </div>
          {[
            { title: 'Explore', links: ['Rooms', 'Dining', 'Spa', 'Contact'] },
            { title: 'Support', links: ['FAQ', 'Policies', 'Privacy', 'Help Center'] },
            { title: 'Contact', links: ['123 Coastal Ave', 'Paradise Island', 'hello@elysia.com', '+1 234 567 890'] }
          ].map(section => (
            <div key={section.title}>
              <h5 className="text-white font-bold mb-4">{section.title}</h5>
              <ul className="space-y-2 text-sm">
                {section.links.map(link => <li key={link}><a href="#" className="hover:text-white">{link}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}