import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, Clock, MapPin, Users, Camera, Gift, 
  Plane, CheckCircle, XCircle, ChevronDown, ChevronRight,
  Menu, X
} from 'lucide-react';

export default function WeddingApp() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [rsvpForm, setRsvpForm] = useState({ name: '', meal: 'Chicken', plusOne: false });
  const [gifts, setGifts] = useState([
    { id: 1, name: 'Espresso Machine', pledged: false },
    { id: 2, name: 'Ceramic Dinnerware Set', pledged: false },
    { id: 3, name: 'Luxurious Bedding', pledged: false }
  ]);

  const toggleGift = (id: number) => {
    setGifts(gifts.map(g => g.id === id ? { ...g, pledged: !g.pledged } : g));
  };

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpForm.name) return;
    setRsvpStatus('loading');
    setTimeout(() => {
      setRsvpStatus('success');
      setRsvpForm({ name: '', meal: 'Chicken', plusOne: false });
      setTimeout(() => setRsvpStatus('idle'), 3000);
    }, 1000);
  };

  const navLinks = ['Our Story', 'Details', 'Bridal Party', 'Gallery', 'Registry', 'RSVP'];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => setActiveTab('Home')} className="text-2xl font-serif italic text-rose-700">Eleanor & Julian</button>
          <div className="hidden md:flex space-x-6">
            {navLinks.map(link => (
              <button key={link} onClick={() => setActiveTab(link)} className="hover:text-rose-600 transition-colors">{link}</button>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden p-4 bg-white border-t flex flex-col space-y-4">
            {navLinks.map(link => (
              <button key={link} onClick={() => { setActiveTab(link); setIsMenuOpen(false); }}>{link}</button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-20 text-center px-4">
        <Heart className="mx-auto text-rose-500 mb-6" size={48} />
        <h1 className="text-5xl md:text-7xl font-serif mb-4">Eleanor & Julian</h1>
        <p className="text-xl text-stone-500 flex items-center justify-center gap-2">
          <Calendar size={20} /> September 14, 2025
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-20">
        {/* Story */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif text-center mb-10">Our Story</h2>
          <div className="space-y-8 border-l-2 border-rose-200 pl-8">
            <div>
              <h3 className="font-bold text-lg text-rose-700">2019: The First Date</h3>
              <p>We met at a rainy bookstore in London and spent four hours discussing classic literature.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-rose-700">2022: The Proposal</h3>
              <p>Under the cherry blossoms in Kyoto, Julian asked the big question.</p>
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="grid md:grid-cols-2 gap-10 mb-20 bg-white p-8 rounded-lg shadow-sm">
          <div>
            <h2 className="text-2xl font-serif mb-4 flex items-center gap-2"><MapPin /> Ceremony</h2>
            <p className="font-bold">St. Jude’s Chapel</p>
            <p>123 Willow Lane, Oxford</p>
            <p className="flex items-center gap-2 mt-2"><Clock size={16} /> 2:00 PM</p>
          </div>
          <div>
            <h2 className="text-2xl font-serif mb-4 flex items-center gap-2"><MapPin /> Reception</h2>
            <p className="font-bold">The Rosewood Garden</p>
            <p>456 Orchard Blvd, Oxford</p>
            <p className="flex items-center gap-2 mt-2"><Clock size={16} /> 5:00 PM</p>
          </div>
        </section>

        {/* Registry */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif text-center mb-10">Registry</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gifts.map(gift => (
              <div key={gift.id} className="p-6 bg-white rounded-lg border text-center">
                <Gift className="mx-auto mb-4 text-rose-500" />
                <h3 className="font-semibold mb-4">{gift.name}</h3>
                <button 
                  onClick={() => toggleGift(gift.id)}
                  className={`px-4 py-2 rounded-full text-sm transition ${gift.pledged ? 'bg-stone-200 cursor-not-allowed' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
                  disabled={gift.pledged}
                >
                  {gift.pledged ? 'Pledged' : 'Mark as Gifted'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* RSVP Form */}
        <section id="rsvp" className="bg-rose-50 p-8 rounded-2xl">
          <h2 className="text-3xl font-serif text-center mb-8">RSVP</h2>
          {rsvpStatus === 'success' ? (
            <div className="text-center py-10 text-green-700 flex flex-col items-center">
              <CheckCircle size={48} className="mb-4" />
              <p className="text-xl">Thank you! Your response has been received.</p>
            </div>
          ) : (
            <form onSubmit={handleRsvp} className="max-w-md mx-auto space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <input 
                  required
                  value={rsvpForm.name}
                  onChange={e => setRsvpForm({...rsvpForm, name: e.target.value})}
                  className="w-full p-2 border rounded" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Meal Preference</label>
                <select 
                  value={rsvpForm.meal}
                  onChange={e => setRsvpForm({...rsvpForm, meal: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  <option>Chicken</option>
                  <option>Vegetarian</option>
                  <option>Vegan</option>
                </select>
              </div>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={rsvpForm.plusOne}
                  onChange={e => setRsvpForm({...rsvpForm, plusOne: e.target.checked})}
                />
                Bringing a plus one?
              </label>
              <button 
                type="submit" 
                disabled={rsvpStatus === 'loading'}
                className="w-full bg-rose-700 text-white py-3 rounded-lg hover:bg-rose-800 disabled:opacity-50"
              >
                {rsvpStatus === 'loading' ? 'Sending...' : 'Confirm RSVP'}
              </button>
            </form>
          )}
        </section>
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 text-center">
        <p>© 2025 Eleanor & Julian Wedding</p>
        <p className="text-sm mt-2">With love and gratitude</p>
      </footer>
    </div>
  );
}