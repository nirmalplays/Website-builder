import React, { useState, useEffect } from 'react';
import { 
  Heart, Shield, Clock, Calendar, Star, Users, 
  CheckCircle, XCircle, ChevronDown, Plus, Minus, 
  Phone, MapPin, Mail, Zap, Package, User, Dog
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('booking');
  const [formData, setFormData] = useState({ name: '', petName: '', type: 'dog', date: '', email: '' });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [plans] = useState([
    { name: 'Basic Wellness', price: 45, features: ['Annual Exam', 'Core Vaccines', 'Fecal Test'] },
    { name: 'Puppy/Kitten Plus', price: 75, features: ['Everything in Basic', 'Deworming', 'Microchip'] },
    { name: 'Senior Care', price: 95, features: ['Full Blood Panel', 'Dental Cleaning', 'Joint Support'] }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('loading');
    setTimeout(() => {
      setBookingStatus('success');
      setFormData({ name: '', petName: '', type: 'dog', date: '', email: '' });
      setTimeout(() => setBookingStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-semibold animate-pulse">
        Emergency? Call us immediately at (555) 123-4567
      </div>

      {/* Nav */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xl">
            <Heart className="w-8 h-8" />
            <span>PawsitiveVets</span>
          </div>
          <div className="hidden md:flex gap-6 font-medium">
            <a href="#services" className="hover:text-indigo-600">Services</a>
            <a href="#vets" className="hover:text-indigo-600">Our Team</a>
            <a href="#plans" className="hover:text-indigo-600">Plans</a>
            <a href="#book" className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-700">Book Now</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative py-20 bg-indigo-900 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Expert care for your <br /> beloved companions.</h1>
          <p className="text-xl text-indigo-200 mb-8 max-w-lg">Compassionate, modern veterinary medicine for dogs, cats, and exotic friends in the heart of the city.</p>
          <a href="#book" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-lg font-bold text-lg transition-all">
            Schedule a Visit <Calendar className="w-5 h-5" />
          </a>
        </div>
      </header>

      {/* Services */}
      <section id="services" className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Specialized Care</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Dogs', desc: 'Routine checkups, dental care, and behavioral health.', icon: <Dog /> },
            { title: 'Cats', desc: 'Low-stress feline handling and specialized nutrition.', icon: <Heart /> },
            { title: 'Exotics', desc: 'Expert care for birds, reptiles, and small mammals.', icon: <Zap /> }
          ].map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="text-indigo-600 mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="plans" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Wellness Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <div key={i} className="border-2 rounded-2xl p-6 flex flex-col">
                <h4 className="text-lg font-bold text-indigo-600">{p.name}</h4>
                <div className="text-4xl font-bold my-4">${p.price}<span className="text-sm font-normal text-slate-400">/mo</span></div>
                <ul className="flex-1 space-y-2 mb-6">
                  {p.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-emerald-500"/> {f}</li>)}
                </ul>
                <button className="w-full py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">Select Plan</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="book" className="py-16 max-w-2xl mx-auto px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>
          {bookingStatus === 'success' ? (
            <div className="text-center py-12 text-emerald-600 font-bold text-xl flex flex-col items-center gap-4">
              <CheckCircle className="w-16 h-16" />
              Request Received! We'll call to confirm.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="Your Name" className="w-full p-3 border rounded-lg" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input required placeholder="Pet's Name" className="w-full p-3 border rounded-lg" value={formData.petName} onChange={e => setFormData({...formData, petName: e.target.value})} />
              <select className="w-full p-3 border rounded-lg" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="exotic">Exotic</option>
              </select>
              <input required type="date" className="w-full p-3 border rounded-lg" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              <button disabled={bookingStatus === 'loading'} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50">
                {bookingStatus === 'loading' ? 'Processing...' : 'Request Appointment'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h5 className="text-white font-bold mb-4">Clinic Hours</h5>
            <p>Mon-Fri: 8am - 7pm</p>
            <p>Sat: 9am - 3pm</p>
            <p>Sun: Closed</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Contact</h5>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4"/> (555) 123-4567</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4"/> hello@pawsitivevets.com</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Location</h5>
            <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-1"/> 123 Wellness Way, Animal City, AC 90210</p>
          </div>
        </div>
      </footer>
    </div>
  );
}