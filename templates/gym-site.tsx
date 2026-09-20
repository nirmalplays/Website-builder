import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Calendar, Users, Star, CheckCircle, ChevronLeft, 
  ChevronRight, ArrowRight, Clock, Award, Zap, Shield 
} from 'lucide-react';

const CLASSES = [
  { day: 'Mon', time: '07:00 AM', name: 'HIIT Blast', trainer: 'Sarah J.' },
  { day: 'Mon', time: '06:00 PM', name: 'Yoga Flow', trainer: 'Marcus V.' },
  { day: 'Tue', time: '08:00 AM', name: 'Power Lifting', trainer: 'Elena R.' },
  { day: 'Wed', time: '07:00 AM', name: 'HIIT Blast', trainer: 'Sarah J.' },
  { day: 'Thu', time: '06:30 PM', name: 'Spin Cycle', trainer: 'Jax K.' },
  { day: 'Fri', time: '09:00 AM', name: 'Core Strength', trainer: 'Elena R.' },
];

const TRAINERS = [
  { name: 'Sarah Jenkins', spec: 'HIIT & Endurance', img: 'https://images.unsplash.com/photo-1594826876361-51f629198642?auto=format&fit=crop&w=400&q=80' },
  { name: 'Marcus Vane', spec: 'Mindfulness & Yoga', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Elena Rodriguez', spec: 'Strength & Conditioning', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Jax Kincaid', spec: 'Cardio & Cycling', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=400&q=80' },
];

const TESTIMONIALS = [
  { name: 'Alex Rivers', quote: 'Lost 20lbs in 3 months. The community here is unmatched!', role: 'Software Engineer' },
  { name: 'Jordan Smith', quote: 'Finally found a gym that feels like home. Highly recommended.', role: 'Graphic Designer' },
  { name: 'Casey L.', quote: 'The HIIT classes are intense but so rewarding. Changed my life.', role: 'Nurse' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Mon');
  const [testIdx, setTestIdx] = useState(0);
  const [formState, setFormState] = useState({ name: '', email: '', status: 'idle' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ ...formState, status: 'loading' });
    setTimeout(() => {
      setFormState({ name: '', email: '', status: 'success' });
      setTimeout(() => setFormState(prev => ({ ...prev, status: 'idle' })), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Dumbbell className="text-orange-600" /> APEX FITNESS
        </div>
        <button className="bg-orange-600 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-700 transition">Join Now</button>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">Forge Your Best Self.</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">High-intensity training, expert guidance, and a community that pushes you further. Start your 7-day free trial today.</p>
          <div className="flex gap-4 justify-center">
            <a href="#trial" className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-700 transition flex items-center gap-2">Get Started <ArrowRight size={20} /></a>
          </div>
        </div>
      </header>

      {/* Schedule */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Weekly Class Schedule</h2>
        <div className="flex justify-center gap-2 mb-8">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
            <button 
              key={day}
              onClick={() => setActiveTab(day)}
              className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === day ? 'bg-orange-600 text-white' : 'bg-gray-100'}`}
            >{day}</button>
          ))}
        </div>
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          {CLASSES.filter(c => c.day === activeTab).map((c, i) => (
            <div key={i} className="flex items-center justify-between p-6 border-b last:border-0 hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <Clock className="text-orange-600" />
                <div>
                  <div className="font-bold">{c.name}</div>
                  <div className="text-sm text-gray-500">{c.trainer}</div>
                </div>
              </div>
              <div className="font-mono text-gray-600">{c.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trainers */}
      <section className="py-20 bg-gray-900 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Elite Trainers</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {TRAINERS.map((t, i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                <img src={t.img} alt={t.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{t.name}</h3>
                  <p className="text-orange-500 text-sm">{t.spec}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Flexible Membership Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Basic', price: '49', features: ['2 classes/week', 'Gym access', 'Locker'] },
            { name: 'Pro', price: '89', features: ['Unlimited classes', '1 PT Session', 'Nutrition Guide'] },
            { name: 'Elite', price: '129', features: ['All access', '4 PT Sessions', 'Guest Passes'] },
          ].map((tier, i) => (
            <div key={i} className="p-8 border rounded-2xl hover:border-orange-500 transition">
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <div className="text-4xl font-bold mb-6">${tier.price}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {tier.features.map(f => <li key={f} className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-500" /> {f}</li>)}
              </ul>
              <button className="w-full py-3 rounded-lg border-2 border-orange-600 text-orange-600 font-bold hover:bg-orange-600 hover:text-white transition">Select</button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-orange-50 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Star className="text-orange-500 mx-auto mb-6" size={40} />
          <p className="text-2xl font-medium mb-6">"{TESTIMONIALS[testIdx].quote}"</p>
          <div className="font-bold">{TESTIMONIALS[testIdx].name}</div>
          <div className="text-sm text-gray-600 mb-8">{TESTIMONIALS[testIdx].role}</div>
          <div className="flex justify-center gap-4">
            <button onClick={() => setTestIdx((testIdx - 1 + 3) % 3)} className="p-2 bg-white rounded-full"><ChevronLeft /></button>
            <button onClick={() => setTestIdx((testIdx + 1) % 3)} className="p-2 bg-white rounded-full"><ChevronRight /></button>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="trial" className="py-20 px-6 max-w-xl mx-auto">
        <div className="bg-white p-8 border rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Claim Your 7-Day Trial</h2>
          {formState.status === 'success' ? (
            <div className="py-12 text-center text-green-600 font-bold">Registration successful! We'll reach out soon.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
              <input required type="email" placeholder="Email Address" className="w-full p-3 border rounded-lg" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
              <button disabled={formState.status === 'loading'} className="w-full bg-orange-600 text-white p-3 rounded-lg font-bold hover:bg-orange-700 disabled:opacity-50">
                {formState.status === 'loading' ? 'Processing...' : 'Start Free Trial'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12 px-6 text-center text-sm">
        <p>&copy; 2024 Apex Fitness Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}