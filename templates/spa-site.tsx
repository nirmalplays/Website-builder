import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, DollarSign, Sparkles, User, Users, 
  CheckCircle, X, Mail, Phone, MapPin, ChevronRight, 
  Star, Coffee, Shield, Heart, Zap, ArrowRight 
} from 'lucide-react';

const INITIAL_TREATMENTS = [
  { id: 1, name: "Deep Tissue Massage", duration: "60 min", price: 120, category: "Massage" },
  { id: 2, name: "Aromatherapy Journey", duration: "90 min", price: 150, category: "Massage" },
  { id: 3, name: "Radiance Facial", duration: "45 min", price: 95, category: "Facial" },
  { id: 4, name: "Hot Stone Therapy", duration: "75 min", price: 140, category: "Massage" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [treatments] = useState(INITIAL_TREATMENTS);
  const [booking, setBooking] = useState({ name: '', email: '', date: '', treatment: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setBooking({ name: '', email: '', date: '', treatment: '' });
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-stone-200 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif tracking-tight text-emerald-800">Aura Spa</h1>
          <div className="hidden md:flex gap-6 text-sm uppercase tracking-widest font-medium">
            {['Treatments', 'Packages', 'Facilities', 'Book'].map((item) => (
              <button key={item} onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-emerald-600 transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center text-center p-4 bg-stone-900">
        <img 
          src="https://images.unsplash.com/photo-1540555700478-4be2894becef?auto=format&fit=crop&q=80&w=2000" 
          alt="Serene spa interior" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-white max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-serif mb-6">Rejuvenate Your Soul</h2>
          <p className="text-lg mb-8 opacity-90">Discover a sanctuary of peace, where ancient healing meets modern indulgence.</p>
          <button 
            onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-medium transition-all flex items-center gap-2 mx-auto"
          >
            Book a Treatment <ArrowRight size={18} />
          </button>
        </div>
      </header>

      {/* Treatments */}
      <section id="treatments" className="py-20 max-w-4xl mx-auto px-4">
        <h3 className="text-3xl font-serif text-center mb-12">Signature Treatments</h3>
        <div className="grid gap-6">
          {treatments.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
              <div>
                <h4 className="font-semibold text-lg">{t.name}</h4>
                <p className="text-stone-500 text-sm flex items-center gap-2"><Clock size={14} /> {t.duration}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-800">${t.price}</p>
                <button onClick={() => document.getElementById('book')?.scrollIntoView()} className="text-xs text-emerald-600 underline">Select</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" className="py-20 bg-stone-100">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            { title: "Hydrotherapy Pool", icon: <Sparkles />, desc: "Mineral-rich heated waters." },
            { title: "Steam Sanctuary", icon: <Zap />, desc: "Detoxifying eucalyptus steam." },
            { title: "Relaxation Lounge", icon: <Coffee />, desc: "Quiet space with organic teas." }
          ].map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl text-center shadow-sm">
              <div className="text-emerald-700 mb-4 flex justify-center">{f.icon}</div>
              <h4 className="font-semibold mb-2">{f.title}</h4>
              <p className="text-stone-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section id="book" className="py-20 max-w-2xl mx-auto px-4">
        <h3 className="text-3xl font-serif text-center mb-8">Booking Enquiry</h3>
        {showSuccess ? (
          <div className="bg-emerald-50 text-emerald-800 p-8 rounded-xl text-center border border-emerald-200">
            <CheckCircle className="mx-auto mb-4" size={48} />
            <p className="text-lg">Thank you! We will contact you shortly to confirm your booking.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 space-y-4">
            <input required type="text" placeholder="Full Name" value={booking.name} onChange={e => setBooking({...booking, name: e.target.value})} className="w-full p-3 border rounded-lg" />
            <input required type="email" placeholder="Email Address" value={booking.email} onChange={e => setBooking({...booking, email: e.target.value})} className="w-full p-3 border rounded-lg" />
            <select required value={booking.treatment} onChange={e => setBooking({...booking, treatment: e.target.value})} className="w-full p-3 border rounded-lg">
              <option value="">Select Treatment</option>
              {treatments.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
            </select>
            <input required type="date" value={booking.date} onChange={e => setBooking({...booking, date: e.target.value})} className="w-full p-3 border rounded-lg" />
            <button disabled={loading} type="submit" className="w-full bg-stone-900 text-white py-3 rounded-lg hover:bg-stone-800 transition-colors">
              {loading ? 'Processing...' : 'Submit Request'}
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-sm">
          <div>
            <h5 className="text-white font-bold mb-4">Aura Spa</h5>
            <p>123 Serenity Lane, Wellness City</p>
            <p>Open Daily: 9am - 9pm</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Contact</h5>
            <p>hello@auraspa.example</p>
            <p>(555) 123-4567</p>
          </div>
        </div>
        <p className="mt-12 text-xs border-t border-stone-800 pt-8">© 2024 Aura Spa. All rights reserved.</p>
      </footer>
    </div>
  );
}