import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, Clock, MapPin, Users, Camera, Gift, Plane, 
  CheckCircle, XCircle, ChevronDown, Sparkles, Mail
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [rsvpForm, setRsvpForm] = useState({ name: '', email: '', attending: 'yes', meal: 'beef', plusOne: false });
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [gifts, setGifts] = useState([
    { id: 1, name: 'Espresso Machine', purchased: false },
    { id: 2, name: 'Dinnerware Set', purchased: true },
    { id: 3, name: 'Honeymoon Fund', purchased: false },
  ]);

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpStatus('loading');
    setTimeout(() => {
      setRsvpStatus('success');
      setRsvpForm({ name: '', email: '', attending: 'yes', meal: 'beef', plusOne: false });
      setTimeout(() => setRsvpStatus('idle'), 3000);
    }, 1200);
  };

  const toggleGift = (id: number) => {
    setGifts(gifts.map(g => g.id === id ? { ...g, purchased: !g.purchased } : g));
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-stone-200 py-4 px-6 flex justify-between items-center">
        <span className="font-serif text-2xl tracking-tight text-rose-800">E & J</span>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
          {['Our Story', 'Details', 'Bridal Party', 'RSVP'].map(item => (
            <button key={item} onClick={() => document.getElementById(item.toLowerCase().replace(' ','-'))?.scrollIntoView({behavior:'smooth'})} className="hover:text-rose-600 transition">
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <header className="h-screen flex flex-col items-center justify-center text-center bg-stone-100">
        <Sparkles className="text-rose-400 mb-6" size={48} />
        <h1 className="font-serif text-6xl md:text-8xl mb-6">Elena & Julian</h1>
        <p className="text-xl font-light tracking-wide mb-8">Save the Date • September 14, 2025</p>
        <div className="flex gap-4">
          <button className="bg-rose-800 text-white px-8 py-3 rounded-full hover:bg-rose-900 transition">View Details</button>
        </div>
      </header>

      {/* Story */}
      <section id="our-story" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl text-center mb-16">Our Journey</h2>
        <div className="space-y-12">
          {[
            { date: '2021', title: 'The First Date', desc: 'A rainy afternoon at the local bookstore led to a conversation that lasted six hours.' },
            { date: '2023', title: 'The Proposal', desc: 'Under the cherry blossoms in Kyoto, Julian asked the big question.' }
          ].map((item, i) => (
            <div key={i} className="flex gap-8 border-l-2 border-rose-200 pl-8">
              <div className="text-rose-800 font-bold w-20">{item.date}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-stone-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section id="details" className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="p-8 border border-stone-200 rounded-lg">
            <Clock className="text-rose-600 mb-4" />
            <h3 className="text-2xl font-serif mb-4">Ceremony</h3>
            <p className="mb-2">St. Jude’s Chapel</p>
            <p className="text-stone-500">2:00 PM - 3:00 PM</p>
          </div>
          <div className="p-8 border border-stone-200 rounded-lg">
            <MapPin className="text-rose-600 mb-4" />
            <h3 className="text-2xl font-serif mb-4">Reception</h3>
            <p className="mb-2">The Grand Conservatory</p>
            <p className="text-stone-500">5:00 PM - 11:00 PM</p>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-20 px-6 bg-stone-100">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm">
          <h2 className="font-serif text-3xl mb-6 text-center">RSVP</h2>
          {rsvpStatus === 'success' ? (
            <div className="text-center py-12 text-emerald-600 font-medium flex flex-col items-center">
              <CheckCircle size={48} className="mb-4" />
              Thank you for your response!
            </div>
          ) : (
            <form onSubmit={handleRsvp} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input required value={rsvpForm.name} onChange={e => setRsvpForm({...rsvpForm, name: e.target.value})} className="w-full p-2 border border-stone-300 rounded" />
              </div>
              <div>
                <label className="block text-sm mb-1">Meal Preference</label>
                <select value={rsvpForm.meal} onChange={e => setRsvpForm({...rsvpForm, meal: e.target.value})} className="w-full p-2 border border-stone-300 rounded">
                  <option value="beef">Roasted Beef</option>
                  <option value="fish">Atlantic Salmon</option>
                  <option value="veg">Vegetarian Risotto</option>
                </select>
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={rsvpForm.plusOne} onChange={e => setRsvpForm({...rsvpForm, plusOne: e.target.checked})} />
                Bringing a plus one?
              </label>
              <button disabled={rsvpStatus === 'loading'} type="submit" className="w-full bg-rose-800 text-white py-3 rounded hover:bg-rose-900 disabled:opacity-50">
                {rsvpStatus === 'loading' ? 'Sending...' : 'Submit RSVP'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Registry */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl mb-10 text-center">Gift Registry</h2>
        <div className="grid gap-4">
          {gifts.map(gift => (
            <div key={gift.id} className="flex justify-between items-center p-4 bg-white border border-stone-200 rounded">
              <span className={gift.purchased ? 'line-through text-stone-400' : ''}>{gift.name}</span>
              <button onClick={() => toggleGift(gift.id)} className={`px-4 py-1 rounded ${gift.purchased ? 'bg-stone-200' : 'bg-rose-100 text-rose-800'}`}>
                {gift.purchased ? 'Purchased' : 'Mark as Purchased'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-10 text-center border-t border-stone-200 text-stone-500 text-sm">
        <p>© 2025 Elena & Julian Wedding. Designed with love.</p>
      </footer>
    </div>
  );
}