import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Users, Utensils, ChefHat, MapPin, 
  Phone, Mail, Star, ChevronDown, CheckCircle, XCircle 
} from 'lucide-react';

const MENU_ITEMS = {
  starters: [
    { id: 1, name: "Truffle Mushroom Arancini", price: 14, desc: "Crispy risotto balls, black truffle aioli, parmesan" },
    { id: 2, name: "Yellowfin Tuna Tartare", price: 18, desc: "Avocado mousse, citrus ponzu, micro cilantro" },
  ],
  mains: [
    { id: 3, name: "Pan-Seared Scallops", price: 34, desc: "Cauliflower purée, pancetta crisp, herb oil" },
    { id: 4, name: "Aged Wagyu Ribeye", price: 48, desc: "Roasted root vegetables, bordelaise sauce" },
  ],
  desserts: [
    { id: 5, name: "Valrhona Chocolate Fondant", price: 12, desc: "Salted caramel core, vanilla bean gelato" },
    { id: 6, name: "Yuzu Lemon Tart", price: 10, desc: "Meringue shards, raspberry coulis" },
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState('starters');
  const [reserveStatus, setReserveStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [form, setForm] = useState({ date: '', time: '19:00', party: '2' });

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setReserveStatus('loading');
    setTimeout(() => {
      setReserveStatus('success');
      setForm({ date: '', time: '19:00', party: '2' });
      setTimeout(() => setReserveStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Nav */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-stone-200 px-6 py-4 flex justify-between items-center">
        <span className="text-2xl font-serif font-bold tracking-tight text-amber-900">LUMIÈRE</span>
        <a href="#reserve" className="bg-amber-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-amber-800 transition">Reserve Table</a>
      </nav>

      {/* Hero */}
      <header className="h-screen relative flex items-center justify-center text-center px-4">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000" 
          alt="Elegant restaurant interior" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative z-10 text-white space-y-4">
          <h1 className="text-6xl md:text-8xl font-serif">Lumière</h1>
          <p className="text-xl md:text-2xl font-light italic">Refined flavors, timeless elegance.</p>
        </div>
      </header>

      {/* About */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif mb-8">Our Philosophy</h2>
        <p className="text-stone-600 leading-relaxed text-lg italic">
          At Lumière, we believe dining is an art form. Every plate tells a story, sourced from local 
          farms and crafted with surgical precision to awaken your senses. Nestled in the heart of the 
          city, we invite you to experience a culinary journey that celebrates the seasons.
        </p>
      </section>

      {/* Menu */}
      <section className="py-24 bg-stone-100 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-center mb-12">The Seasonal Menu</h2>
          <div className="flex justify-center gap-4 mb-12">
            {['starters', 'mains', 'desserts'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize px-6 py-2 border-b-2 transition ${activeTab === tab ? 'border-amber-900 text-amber-900 font-bold' : 'border-transparent'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="grid gap-6">
            {MENU_ITEMS[activeTab as keyof typeof MENU_ITEMS].map(item => (
              <div key={item.id} className="flex justify-between items-start bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-stone-500 text-sm">{item.desc}</p>
                </div>
                <span className="font-serif font-bold text-amber-900">${item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Highlight */}
      <section className="py-24 px-6 grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <img 
          src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=800" 
          alt="Chef at work" 
          className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
        />
        <div className="space-y-6">
          <ChefHat className="w-12 h-12 text-amber-900" />
          <h2 className="text-4xl font-serif">Executive Chef Elena Rossi</h2>
          <p className="text-stone-600">
            With over 15 years in Michelin-starred kitchens across Europe, Chef Elena brings a 
            Mediterranean soul to our modern techniques. She believes that the simplest ingredients, 
            when handled with respect, produce the most profound memories.
          </p>
          <div className="flex gap-4 items-center">
            <Star className="text-amber-500 fill-amber-500" />
            <span className="font-bold">2024 Michelin Star Recipient</span>
          </div>
        </div>
      </section>

      {/* Reservation */}
      <section id="reserve" className="py-24 bg-amber-950 text-stone-100 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif text-center mb-12">Book Your Table</h2>
          {reserveStatus === 'success' ? (
            <div className="text-center p-12 bg-white/10 rounded-xl space-y-4">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
              <h3 className="text-2xl font-bold">Reservation Confirmed!</h3>
              <p>We look forward to welcoming you.</p>
              <button onClick={() => setReserveStatus('idle')} className="text-sm underline">Make another booking</button>
            </div>
          ) : (
            <form onSubmit={handleReserve} className="grid gap-6 bg-white p-8 rounded-xl text-stone-800">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold">Date</label>
                  <input required type="date" className="w-full p-3 border rounded-lg" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold">Time</label>
                  <select className="w-full p-3 border rounded-lg" value={form.time} onChange={e => setForm({...form, time: e.target.value})}>
                    {['18:00', '19:00', '20:00', '21:00'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold">Party Size</label>
                <input required type="number" min="1" max="10" className="w-full p-3 border rounded-lg" value={form.party} onChange={e => setForm({...form, party: e.target.value})} />
              </div>
              <button disabled={reserveStatus === 'loading'} className="w-full py-4 bg-amber-900 text-white rounded-lg font-bold hover:bg-amber-800 transition disabled:opacity-50">
                {reserveStatus === 'loading' ? 'Processing...' : 'Confirm Reservation'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-stone-900 text-stone-400 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-sm">
          <div className="space-y-2">
            <h4 className="font-bold text-white mb-4">Location</h4>
            <p className="flex items-center gap-2"><MapPin size={16}/> 123 Culinary Avenue, Metro City</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white mb-4">Opening Hours</h4>
            <p>Mon-Fri: 5:00 PM - 11:00 PM</p>
            <p>Sat-Sun: 11:00 AM - 11:00 PM</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <p className="flex items-center gap-2"><Phone size={16}/> (555) 123-4567</p>
            <p className="flex items-center gap-2"><Mail size={16}/> hello@lumiere.com</p>
          </div>
        </div>
        <div className="text-center mt-12 border-t border-stone-800 pt-8">
          © 2024 Lumière Fine Dining. All rights reserved.
        </div>
      </footer>
    </div>
  );
}