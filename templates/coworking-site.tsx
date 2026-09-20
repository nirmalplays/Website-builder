import React, { useState, useEffect } from 'react';
import { 
  Check, X, Calendar, Clock, MapPin, Users, Star, 
  ArrowRight, Sparkles, Shield, Coffee, Wifi, Zap, 
  ChevronDown, Building2, User, Mail, Phone 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Workspace');
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', date: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [tourBookings, setTourBookings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cowork_tours') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('cowork_tours', JSON.stringify(tourBookings));
  }, [tourBookings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.date) return;
    
    setFormStatus('loading');
    setTimeout(() => {
      setTourBookings([...tourBookings, { ...bookingForm, id: Date.now() }]);
      setBookingForm({ name: '', email: '', date: '' });
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1000);
  };

  const workspaces = [
    { name: 'Hot Desk', price: 25, cap: 'Open seating', desc: 'Perfect for nomads and freelancers.' },
    { name: 'Dedicated Desk', price: 350, cap: 'Reserved spot', desc: 'Your own permanent workspace.' },
    { name: 'Private Office', price: 850, cap: '2-4 People', desc: 'Secure, private space for teams.' }
  ];

  const amenities = [
    { icon: <Wifi size={24}/>, title: 'High-speed Fiber', desc: '1Gbps symmetrical internet.' },
    { icon: <Coffee size={24}/>, title: 'Artisan Coffee', desc: 'Unlimited local roasted beans.' },
    { icon: <Shield size={24}/>, title: '24/7 Security', desc: 'Keycard access and surveillance.' },
    { icon: <Zap size={24}/>, title: 'Meeting Rooms', desc: 'Tech-enabled boardrooms.' }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <Building2 /> Nexus Cowork
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {['Workspace', 'Amenities', 'Plans', 'Contact'].map(item => (
            <button key={item} onClick={() => setActiveTab(item)} className={`${activeTab === item ? 'text-indigo-600' : 'text-slate-600'} hover:text-indigo-600 transition-colors`}>{item}</button>
          ))}
        </div>
        <button onClick={() => document.getElementById('tour')?.scrollIntoView({ behavior: 'smooth' })} className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors">Book a Tour</button>
      </nav>

      <header className="py-20 px-6 max-w-5xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles size={14} /> Opening Summer Special
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">Elevate your <span className="text-indigo-600">productivity.</span></h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">Flexible workspaces designed for creators, teams, and high-growth startups in the heart of the city.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-800">Get a Day Pass - $25</button>
        </div>
      </header>

      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Workspace Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {workspaces.map((ws) => (
              <div key={ws.name} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-2">{ws.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{ws.cap}</p>
                <div className="text-4xl font-bold mb-6">${ws.price}<span className="text-sm font-normal text-slate-400">/mo</span></div>
                <p className="text-slate-600 mb-8 text-sm leading-relaxed">{ws.desc}</p>
                <button className="w-full border border-indigo-600 text-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">Select Plan</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {amenities.map((a) => (
            <div key={a.title} className="p-6 bg-white border border-slate-100 rounded-xl">
              <div className="text-indigo-600 mb-4">{a.icon}</div>
              <h4 className="font-bold mb-1">{a.title}</h4>
              <p className="text-xs text-slate-500">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tour" className="py-20 bg-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Book a Tour</h2>
              <p className="text-indigo-200 mb-6">Visit our facility, meet the community, and find your perfect spot. Tours take approximately 30 minutes.</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-indigo-200"><MapPin size={20} /> 123 Innovation Drive, Tech City</div>
                <div className="flex items-center gap-3 text-indigo-200"><Clock size={20} /> Mon-Fri, 9am - 6pm</div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl text-slate-900">
              {formStatus === 'success' ? (
                <div className="text-center py-10 text-green-600 font-bold">Booking Confirmed! See you soon.</div>
              ) : (
                <div className="flex flex-col gap-4">
                  <input required type="text" placeholder="Full Name" className="w-full p-3 border border-slate-200 rounded-lg" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} />
                  <input required type="email" placeholder="Email Address" className="w-full p-3 border border-slate-200 rounded-lg" value={bookingForm.email} onChange={e => setBookingForm({...bookingForm, email: e.target.value})} />
                  <input required type="date" className="w-full p-3 border border-slate-200 rounded-lg" value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} />
                  <button disabled={formStatus === 'loading'} className="bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50">
                    {formStatus === 'loading' ? 'Processing...' : 'Schedule Tour'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
        <p>© 2024 Nexus Cowork Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}