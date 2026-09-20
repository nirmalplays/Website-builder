import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Star, Users, MapPin, Mail, ChevronDown, 
  CheckCircle, X, Sparkles, User, Package, DollarSign, Menu
} from 'lucide-react';

const INITIAL_SCHEDULE = [
  { id: 1, day: 'Monday', time: '08:00 AM', name: 'Morning Flow', instructor: 'Sarah J.' },
  { id: 2, day: 'Monday', time: '06:00 PM', name: 'Deep Yin', instructor: 'Marcus T.' },
  { id: 3, day: 'Tuesday', time: '07:00 AM', name: 'Power Vinyasa', instructor: 'Elena R.' },
  { id: 4, day: 'Wednesday', time: '09:00 AM', name: 'Gentle Hatha', instructor: 'Sarah J.' },
  { id: 5, day: 'Thursday', time: '05:30 PM', name: 'Power Vinyasa', instructor: 'Elena R.' },
  { id: 6, day: 'Friday', time: '10:00 AM', name: 'Restorative', instructor: 'Marcus T.' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Schedule');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif tracking-tight text-teal-800">Serenity Yoga</h1>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium text-stone-600">
            {['Schedule', 'Teachers', 'Pricing', 'Testimonials'].map(item => (
              <button key={item} onClick={() => setActiveTab(item)} className="hover:text-teal-700 transition-colors">
                {item}
              </button>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}><Menu /></button>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-4 bg-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-serif mb-6 text-teal-900">Find Your Inner Balance</h2>
          <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto">Join our tranquil community. Start your journey with your first class entirely free.</p>
          <button 
            onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-teal-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-800 transition-all flex items-center gap-2 mx-auto"
          >
            <Sparkles size={20} /> Claim Free Class
          </button>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h3 className="text-3xl font-serif mb-12 text-center">Weekly Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_SCHEDULE.map(s => (
            <div key={s.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full text-xs">{s.day}</span>
                <div className="flex items-center text-stone-400 text-sm"><Clock size={14} className="mr-1"/>{s.time}</div>
              </div>
              <h4 className="text-lg font-semibold">{s.name}</h4>
              <p className="text-stone-500 text-sm mt-1">{s.instructor}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-serif mb-12 text-center">Membership Options</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Drop-in', price: '$25', desc: 'Perfect for visitors' },
              { title: 'Class Pass', price: '$110', desc: '5 sessions, no expiry' },
              { title: 'Unlimited', price: '$150', desc: 'Full monthly access' },
            ].map((p, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-stone-200 text-center">
                <h4 className="text-xl font-serif mb-2">{p.title}</h4>
                <div className="text-4xl font-bold text-teal-800 my-4">{p.price}</div>
                <p className="text-stone-500 mb-6">{p.desc}</p>
                <button className="w-full py-3 border-2 border-teal-700 text-teal-700 rounded-full hover:bg-teal-700 hover:text-white transition-all">Select</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup" className="py-20 px-4 max-w-md mx-auto text-center">
        <h3 className="text-3xl font-serif mb-6">Claim Your Free Class</h3>
        {formStatus === 'success' ? (
          <div className="bg-green-50 text-green-800 p-6 rounded-2xl flex items-center gap-3">
            <CheckCircle /> Welcome! Check your email for details.
          </div>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <input 
              required
              type="text" 
              placeholder="Your Name" 
              className="w-full p-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input 
              required
              type="email" 
              placeholder="Your Email" 
              className="w-full p-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <button 
              disabled={formStatus === 'loading'}
              className="w-full bg-stone-900 text-white py-4 rounded-xl font-semibold hover:bg-stone-800 disabled:opacity-50"
            >
              {formStatus === 'loading' ? 'Processing...' : 'Register Now'}
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-stone-200 text-center text-stone-500">
        <p className="mb-2">© 2024 Serenity Yoga Studio</p>
        <div className="flex justify-center gap-6">
          <span className="flex items-center gap-1"><MapPin size={16}/> 123 Zen Lane, Portland</span>
          <span className="flex items-center gap-1"><Mail size={16}/> hello@serenity.yoga</span>
        </div>
      </footer>
    </div>
  );
}