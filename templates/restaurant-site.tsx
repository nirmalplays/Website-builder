import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Users, Utensils, MapPin, Phone, Mail, 
  CheckCircle, XCircle, ChevronDown, Sparkles, Star, ChevronRight 
} from 'lucide-react';

type Reservation = {
  id: string;
  name: string;
  date: string;
  time: string;
  guests: number;
  status: 'confirmed' | 'pending';
};

const MENU_ITEMS = {
  starters: [
    { name: "Truffle Arancini", price: "$14", desc: "Crispy risotto balls, black truffle aioli, parmesan" },
    { name: "Hamachi Crudo", price: "$18", desc: "Citrus-marinated yellowtail, chili oil, radish" }
  ],
  mains: [
    { name: "Pan-Seared Scallops", price: "$34", desc: "Cauliflower purée, pancetta crisp, herb oil" },
    { name: "Braised Short Rib", price: "$38", desc: "Red wine reduction, polenta, roasted root veggies" }
  ],
  desserts: [
    { name: "Dark Chocolate Tart", price: "$12", desc: "Sea salt, hazelnut praline, creme fraiche" },
    { name: "Lemon Basil Sorbet", price: "$10", desc: "Fresh berries, candied lemon zest" }
  ]
};

export default function App() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', date: '', time: '19:00', guests: '2' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('reservations');
      if (saved) setReservations(JSON.parse(saved));
    } catch (e) { console.error(e); }
  }, []);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => {
      const newRes: Reservation = {
        id: Date.now().toString(),
        name: formData.name,
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        status: 'confirmed'
      };
      const updated = [...reservations, newRes];
      setReservations(updated);
      localStorage.setItem('reservations', JSON.stringify(updated));
      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle');
        setIsFormVisible(false);
        setFormData({ name: '', date: '', time: '19:00', guests: '2' });
      }, 2000);
    }, 1000);
  };

  const deleteReservation = (id: string) => {
    const updated = reservations.filter(r => r.id !== id);
    setReservations(updated);
    localStorage.setItem('reservations', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Nav */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-stone-200 py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-serif tracking-tighter">LUMIÈRE</h1>
        <button 
          onClick={() => setIsFormVisible(true)}
          className="bg-stone-900 text-white px-6 py-2 rounded-full hover:bg-stone-700 transition-colors"
        >
          Reserve a Table
        </button>
      </nav>

      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2400" 
          alt="Restaurant interior"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative text-center text-white p-6">
          <Sparkles className="mx-auto mb-4 text-amber-400" />
          <h2 className="text-6xl md:text-8xl font-serif mb-6">Refined Dining</h2>
          <p className="text-xl md:text-2xl font-light italic">Seasonal ingredients, timeless technique.</p>
        </div>
      </header>

      {/* About */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-serif mb-8">Our Philosophy</h3>
        <p className="text-lg leading-relaxed text-stone-600">
          At Lumière, we believe that the best meals are shared. Founded in 2015, our kitchen 
          focuses on the harmony between local producers and artisanal cooking methods. 
          Every dish tells a story of the season, crafted with precision and passion.
        </p>
      </section>

      {/* Menu */}
      <section className="py-24 bg-stone-100 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-4xl font-serif text-center mb-16">The Tasting Menu</h3>
          <div className="grid md:grid-cols-3 gap-12">
            {Object.entries(MENU_ITEMS).map(([cat, items]) => (
              <div key={cat}>
                <h4 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-stone-300 pb-2">{cat}</h4>
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between font-bold">
                        <span>{item.name}</span>
                        <span className="text-amber-700">{item.price}</span>
                      </div>
                      <p className="text-sm text-stone-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
            {formStatus === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-serif">Reserved!</h3>
              </div>
            ) : (
              <form onSubmit={handleReserve} className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-serif">Book a Table</h3>
                  <button onClick={() => setIsFormVisible(false)}><XCircle /></button>
                </div>
                <input required type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="date" className="w-full p-3 border rounded-lg" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                <select className="w-full p-3 border rounded-lg" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})}>
                  {['18:00', '19:00', '20:00', '21:00'].map(t => <option key={t}>{t}</option>)}
                </select>
                <input required type="number" min="1" max="10" className="w-full p-3 border rounded-lg" value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} />
                <button type="submit" disabled={formStatus === 'loading'} className="w-full bg-stone-900 text-white py-3 rounded-lg hover:bg-stone-700">
                  {formStatus === 'loading' ? 'Confirming...' : 'Confirm Reservation'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-white font-bold mb-4">LUMIÈRE</h4>
            <p>123 Culinary Ave, Gastown</p>
            <p>Vancouver, BC V6B 1A1</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Hours</h4>
            <p>Tue-Sat: 5pm - 11pm</p>
            <p>Sun: 4pm - 10pm</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Your Bookings</h4>
            {reservations.length === 0 ? <p>No upcoming reservations.</p> : (
              <ul className="space-y-2">
                {reservations.map(res => (
                  <li key={res.id} className="flex justify-between items-center text-sm">
                    {res.date} at {res.time} ({res.guests} guests)
                    <button onClick={() => deleteReservation(res.id)}><XCircle size={16} className="text-red-400" /></button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}