import React, { useState, useEffect } from 'react';
import { 
  Phone, Calendar, Star, Shield, CheckCircle, ChevronDown, 
  User, Clock, DollarSign, Heart, X, Sparkles, ChevronRight 
} from 'lucide-react';

const TREATMENTS = [
  { id: 1, title: 'General Dentistry', desc: 'Comprehensive exams, cleanings, and cavity prevention.', icon: 'CheckCircle' },
  { id: 2, title: 'Cosmetic Dentistry', desc: 'Whitening, veneers, and smile makeovers.', icon: 'Sparkles' },
  { id: 3, title: 'Dental Implants', desc: 'Restorative solutions for missing teeth.', icon: 'Shield' },
  { id: 4, title: 'Orthodontics', desc: 'Clear aligners and traditional braces.', icon: 'Heart' },
];

const DENTISTS = [
  { name: 'Dr. Sarah Jenkins', title: 'Lead Dentist', bio: 'DDS, 15 years experience in cosmetic restoration.' },
  { name: 'Dr. Michael Chen', title: 'Orthodontist', bio: 'DMD, MS, specializing in invisible aligner therapy.' },
];

export default function App() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', date: '', service: 'General Dentistry' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (!formData.date) newErrors.date = 'Required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', date: '', service: 'General Dentistry' });
      setTimeout(() => setSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-teal-700">SmilePerfect</div>
          <div className="flex items-center gap-4">
            <a href="tel:5550123" className="hidden md:flex items-center gap-2 text-teal-700 font-semibold hover:text-teal-900">
              <Phone size={18} /> 555-0123 (Emergency)
            </a>
            <a href="#booking" className="bg-teal-600 text-white px-4 py-2 rounded-full font-medium hover:bg-teal-700">Book Now</a>
          </div>
        </div>
      </nav>

      <header className="bg-teal-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">Your Healthiest Smile Starts Here</h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">Providing gentle, advanced dental care for the whole family in a calming, modern environment.</p>
          <a href="#booking" className="inline-block bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-teal-700 transition">Request an Appointment</a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TREATMENTS.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">{t.title}</h3>
              <p className="text-slate-600 text-sm">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Specialists</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {DENTISTS.map((d) => (
              <div key={d.name} className="flex gap-6 items-center bg-slate-50 p-6 rounded-2xl">
                <div className="w-24 h-24 bg-slate-300 rounded-full flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold">{d.name}</h3>
                  <p className="text-teal-700 font-medium mb-1">{d.title}</p>
                  <p className="text-slate-600 text-sm">{d.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="max-w-2xl mx-auto py-16 px-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Schedule Your Visit</h2>
          {success ? (
            <div className="text-center py-10 bg-teal-50 text-teal-800 rounded-lg">
              <CheckCircle size={48} className="mx-auto mb-4" />
              <p className="font-bold">Appointment request sent successfully!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input className="w-full p-2 border rounded-lg" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input className="w-full p-2 border rounded-lg" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Preferred Date</label>
                <input className="w-full p-2 border rounded-lg" type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
              <button disabled={loading} className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 disabled:opacity-50">
                {loading ? 'Processing...' : 'Request Appointment'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="text-white font-bold mb-4">SmilePerfect Dental</h4>
            <p>123 Healthy Lane, Wellness City, CA 90210</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Hours</h4>
            <p>Mon - Fri: 8am - 6pm</p>
            <p>Sat: 9am - 2pm</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Insurance</h4>
            <p>We accept most PPO plans and offer flexible monthly payment options.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}