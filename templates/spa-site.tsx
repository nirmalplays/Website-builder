import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, DollarSign, Star, Package, Users, 
  ChevronRight, CheckCircle, X, Mail, Phone, MapPin, 
  Sparkles, Shield, Coffee, Zap 
} from 'lucide-react';

type Treatment = { id: number; name: string; duration: string; price: number; category: string };
type Booking = { id: number; name: string; email: string; treatment: string; date: string };

const INITIAL_TREATMENTS: Treatment[] = [
  { id: 1, name: "Deep Tissue Massage", duration: "60 min", price: 120, category: "Massage" },
  { id: 2, name: "Aromatherapy Bliss", duration: "90 min", price: 150, category: "Massage" },
  { id: 3, name: "Radiance Facial", duration: "45 min", price: 95, category: "Facial" },
  { id: 4, name: "Himalayan Salt Scrub", duration: "30 min", price: 70, category: "Body" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Massage');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', treatment: '', date: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('spa_bookings');
      if (saved) setBookings(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.treatment || !formData.date) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      const newBooking = { ...formData, id: Date.now() };
      const updated = [...bookings, newBooking];
      setBookings(updated);
      localStorage.setItem('spa_bookings', JSON.stringify(updated));
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', email: '', treatment: '', date: '' });
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-stone-200 py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-serif tracking-tighter text-emerald-800 italic">Aura Spa</h1>
        <div className="hidden md:flex gap-6 text-sm uppercase tracking-widest text-stone-600">
          {['Treatments', 'Packages', 'Facilities', 'Contact'].map(i => (
            <a key={i} href={`#${i.toLowerCase()}`} className="hover:text-emerald-700 transition-colors">{i}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center text-center p-6 bg-[url('https://images.unsplash.com/photo-1540555700478-4be2894becef?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 max-w-2xl text-white">
          <h2 className="text-5xl md:text-7xl font-serif mb-6">Find Your Inner Balance</h2>
          <p className="text-xl mb-8 font-light">Experience ultimate rejuvenation in the heart of the city.</p>
          <a href="#booking" className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-full transition-all text-lg font-medium">
            Book Your Treatment
          </a>
        </div>
      </header>

      {/* Treatments */}
      <section id="treatments" className="py-20 px-6 max-w-4xl mx-auto">
        <h3 className="text-3xl font-serif text-center mb-10 text-emerald-900">Treatment Menu</h3>
        <div className="flex justify-center gap-4 mb-8 border-b border-stone-200">
          {['Massage', 'Facial', 'Body'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`pb-2 px-4 transition-all ${activeTab === cat ? 'border-b-2 border-emerald-700 text-emerald-800' : 'text-stone-500'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid gap-4">
          {INITIAL_TREATMENTS.filter(t => t.category === activeTab).map(t => (
            <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-lg">{t.name}</h4>
                <p className="text-sm text-stone-500 flex items-center gap-1"><Clock size={14}/> {t.duration}</p>
              </div>
              <span className="text-xl font-serif text-emerald-700 font-bold"><DollarSign size={16} className="inline"/>{t.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-stone-100 py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: <Coffee />, title: "Zen Lounge", desc: "Herbal teas and quiet spaces." },
            { icon: <Sparkles />, title: "Sauna Suite", desc: "Infrared and dry heat therapy." },
            { icon: <Shield />, title: "Private Baths", desc: "Hydrotherapy mineral pools." }
          ].map((f, i) => (
            <div key={i} className="text-center p-8">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">{f.icon}</div>
              <h4 className="text-xl font-serif mb-2">{f.title}</h4>
              <p className="text-stone-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-20 px-6 max-w-xl mx-auto">
        <h3 className="text-3xl font-serif text-center mb-8">Reserve Your Time</h3>
        {success ? (
          <div className="bg-emerald-50 text-emerald-800 p-8 rounded-xl text-center border border-emerald-200">
            <CheckCircle size={48} className="mx-auto mb-4" />
            <p>Booking received! We will confirm via email shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleBook} className="space-y-4">
            <input required placeholder="Full Name" className="w-full p-4 rounded-lg border" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required type="email" placeholder="Email Address" className="w-full p-4 rounded-lg border" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <select className="w-full p-4 rounded-lg border" value={formData.treatment} onChange={e => setFormData({...formData, treatment: e.target.value})} required>
              <option value="">Select Treatment</option>
              {INITIAL_TREATMENTS.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
            </select>
            <input required type="date" className="w-full p-4 rounded-lg border" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            <button disabled={isSubmitting} className="w-full bg-stone-900 text-white p-4 rounded-lg hover:bg-black transition-colors">
              {isSubmitting ? 'Confirming...' : 'Submit Request'}
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-sm">
          <div>
            <h5 className="text-white font-serif text-lg mb-4">Aura Spa</h5>
            <p><MapPin size={14} className="inline mr-2"/> 123 Tranquility Lane, Zen City</p>
            <p><Phone size={14} className="inline mr-2"/> (555) 012-3456</p>
          </div>
          <div className="flex flex-col md:items-end gap-2">
            <p>Mon - Fri: 9am - 8pm</p>
            <p>Sat - Sun: 10am - 6pm</p>
          </div>
        </div>
      </footer>
    </div>
  );
}