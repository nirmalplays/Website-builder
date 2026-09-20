import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Users, Star, Mail, MapPin, 
  ChevronDown, CheckCircle, XCircle, ArrowRight, 
  Menu, X, Sparkles, DollarSign, Heart 
} from 'lucide-react';

const CLASSES = [
  { id: 1, name: 'Vinyasa Flow', day: 'Monday', time: '08:00 AM', teacher: 'Sarah Jenkins', desc: 'Dynamic movement linked with breath.' },
  { id: 2, name: 'Hatha Basics', day: 'Monday', time: '06:00 PM', teacher: 'Mark Chen', desc: 'Foundational poses for all levels.' },
  { id: 3, name: 'Restorative', day: 'Tuesday', time: '07:30 PM', teacher: 'Elena Rossi', desc: 'Deep relaxation and stillness.' },
  { id: 4, name: 'Power Yoga', day: 'Wednesday', time: '07:00 AM', teacher: 'Sarah Jenkins', desc: 'Strength building and endurance.' },
  { id: 5, name: 'Yin Yoga', day: 'Thursday', time: '06:30 PM', teacher: 'Elena Rossi', desc: 'Deep tissue release and mindfulness.' },
];

const TEACHERS = [
  { name: 'Sarah Jenkins', bio: 'Expert in Vinyasa with 12 years of teaching.', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400' },
  { name: 'Mark Chen', bio: 'Hatha specialist focused on alignment.', img: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=400' },
  { name: 'Elena Rossi', bio: 'Restorative yoga practitioner and sound healer.', img: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=400' },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', status: 'idle' });
  const [activeDay, setActiveDay] = useState('Monday');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ ...formState, status: 'loading' });
    setTimeout(() => {
      setFormState({ name: '', email: '', status: 'success' });
      setTimeout(() => setFormState(prev => ({ ...prev, status: 'idle' })), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight text-teal-700">OM STUDIO</div>
          <div className="hidden md:flex gap-8 font-medium text-sm uppercase tracking-widest">
            {['Schedule', 'Teachers', 'Pricing', 'Testimonials'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-teal-600 transition-colors">{item}</a>
            ))}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light mb-6 text-stone-900">Find Your Balance.</h1>
          <p className="text-xl mb-10 text-stone-600">Join our serene community. Your first class is on us.</p>
          <a href="#signup" className="bg-teal-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-800 transition-all inline-flex items-center gap-2">
            Claim Free Class <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-light mb-12 text-center">Weekly Schedule</h2>
        <div className="flex justify-center gap-4 mb-8">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday'].map(day => (
            <button 
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-2 rounded-full border ${activeDay === day ? 'bg-teal-700 text-white border-teal-700' : 'border-stone-300'}`}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {CLASSES.filter(c => c.day === activeDay).map(c => (
            <div key={c.id} className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{c.name}</h3>
                <p className="text-stone-500">{c.time} • {c.teacher}</p>
              </div>
              <button className="text-teal-700 font-bold hover:underline">Book</button>
            </div>
          ))}
        </div>
      </section>

      {/* Teachers */}
      <section id="teachers" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-light mb-16 text-center">Our Teachers</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {TEACHERS.map(t => (
              <div key={t.name} className="text-center">
                <img src={t.img} alt={t.name} className="w-full h-80 object-cover rounded-2xl mb-6" />
                <h3 className="text-2xl font-medium mb-2">{t.name}</h3>
                <p className="text-stone-600">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup" className="py-20 px-6 max-w-xl mx-auto">
        <div className="bg-stone-900 text-white p-10 rounded-3xl">
          <h2 className="text-3xl font-light mb-6 flex items-center gap-2"><Sparkles className="text-teal-400" /> Start Your Journey</h2>
          {formState.status === 'success' ? (
            <div className="text-center py-12 text-teal-400"><CheckCircle size={48} className="mx-auto mb-4" /> Welcome to the family! Check your email.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Your Name" className="w-full p-4 rounded-lg bg-stone-800 border border-stone-700" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
              <input required type="email" placeholder="Your Email" className="w-full p-4 rounded-lg bg-stone-800 border border-stone-700" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
              <button disabled={formState.status === 'loading'} className="w-full py-4 bg-teal-600 rounded-lg font-bold hover:bg-teal-500 transition-colors">
                {formState.status === 'loading' ? 'Processing...' : 'Get Free Pass'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-stone-200 text-center text-stone-500">
        <p>© 2024 OM Studio. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <span className="flex items-center gap-1"><MapPin size={16} /> 123 Zen Ave, Portland</span>
          <span className="flex items-center gap-1"><Mail size={16} /> hello@omstudio.com</span>
        </div>
      </footer>
    </div>
  );
}