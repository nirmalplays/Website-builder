import React, { useState } from 'react';
import { 
  Calendar, Users, Star, MapPin, Coffee, Wifi, Shield, 
  Clock, ArrowRight, ChevronDown, Sparkles, Zap, DollarSign,
  Phone, Mail, Menu, X 
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const rooms = [
    { name: "Oceanfront Suite", price: 450, guests: 2, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" },
    { name: "Garden Villa", price: 320, guests: 4, image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800" },
    { name: "Deluxe King Room", price: 210, guests: 2, image: "https://images.unsplash.com/photo-1611892440504-42a792e24566?auto=format&fit=crop&q=80&w=800" }
  ];

  const amenities = [
    { icon: <Wifi size={24} />, title: "High-Speed Fiber", desc: "Stay connected anywhere on the property." },
    { icon: <Coffee size={24} />, title: "Artisan Breakfast", desc: "Freshly brewed coffee and seasonal local fruits." },
    { icon: <Shield size={24} />, title: "24/7 Security", desc: "Your safety and privacy are our top priority." },
    { icon: <Sparkles size={24} />, title: "Daily Housekeeping", desc: "Impeccable service for a stress-free stay." }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-serif font-bold tracking-tight text-emerald-800">ELYSIA RESORT</span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
            {['Rooms', 'Dining', 'Spa', 'Location'].map(item => (
              <a key={item} href="#" className="hover:text-emerald-700 transition-colors">{item}</a>
            ))}
          </div>
          <button className="bg-emerald-800 text-white px-6 py-2 rounded-full text-sm hover:bg-emerald-900 transition-all">Book Now</button>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center text-center px-6 pt-20">
        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover" alt="Luxury Resort" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-white max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Experience Serenity</h1>
          <p className="text-lg md:text-xl mb-10 opacity-90">Escape to the shores of Elysia, where luxury meets the horizon.</p>
          
          <div className="bg-white p-4 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-4 text-stone-800">
            <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-stone-200 p-2">
              <Calendar className="text-emerald-700" size={20} />
              <input type="date" className="w-full focus:outline-none text-sm" />
            </div>
            <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-stone-200 p-2">
              <Calendar className="text-emerald-700" size={20} />
              <input type="date" className="w-full focus:outline-none text-sm" />
            </div>
            <div className="flex items-center gap-3 p-2">
              <Users className="text-emerald-700" size={20} />
              <select className="w-full focus:outline-none text-sm bg-transparent">
                <option>2 Guests</option>
                <option>4 Guests</option>
              </select>
            </div>
            <button className="bg-emerald-800 text-white py-3 rounded-xl hover:bg-emerald-900 font-semibold text-sm">Search</button>
          </div>
        </div>
      </header>

      {/* Rooms */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-serif mb-12 text-center">Exquisite Accommodations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room.name} className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow">
              <img src={room.image} alt={room.name} className="h-64 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                <div className="flex justify-between items-center mb-4 text-sm text-stone-500">
                  <span>Up to {room.guests} guests</span>
                  <span className="font-bold text-emerald-800">${room.price}/night</span>
                </div>
                <button className="w-full border border-emerald-800 text-emerald-800 py-2 rounded-lg hover:bg-emerald-50">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-serif mb-16 text-center">Refined Amenities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((a, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
                <div className="text-emerald-800 mb-4">{a.icon}</div>
                <h4 className="font-semibold text-lg mb-2">{a.title}</h4>
                <p className="text-stone-600 text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining & Spa */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif">A Culinary Journey</h2>
            <p className="text-stone-600 leading-relaxed">Our award-winning chefs source local ingredients to create Mediterranean-inspired dishes with a modern twist. Experience dining under the stars at our signature Azure restaurant.</p>
            <button className="flex items-center gap-2 text-emerald-800 font-semibold">Book a table <ArrowRight size={18} /></button>
          </div>
          <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" className="rounded-2xl shadow-xl" alt="Dining" />
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-stone-50">
        <h2 className="text-4xl font-serif mb-12 text-center">Guest Experiences</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Jenkins", text: "The most beautiful resort I have ever visited. The service was impeccable." },
            { name: "Marcus Thorne", text: "Exceptional dining and a spa that truly rejuvenated my mind and body." },
            { name: "Elena Rodriguez", text: "Perfect location. Waking up to the ocean view every morning was a dream." }
          ].map((r, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-stone-100">
              <div className="flex text-amber-400 mb-4"><Star size={16} fill="currentColor" />{[...Array(4)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}</div>
              <p className="text-stone-700 italic mb-4">"{r.text}"</p>
              <p className="font-bold text-sm text-stone-900">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-white font-serif text-lg mb-4">ELYSIA RESORT</h4>
            <p className="text-sm">128 Coastal Drive, Haven Bay, CA 90210</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <p className="text-sm">reservations@elysia.com</p>
            <p className="text-sm">+1 (555) 123-4567</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Explore</h4>
            <ul className="text-sm space-y-2">
              <li>About Us</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="bg-stone-800 p-2 rounded text-sm w-full" />
              <button className="bg-emerald-800 text-white px-4 py-2 rounded text-sm">Join</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}