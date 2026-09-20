import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Phone, Mail, User, Shield, Stethoscope, 
  Heart, Users, CheckCircle, X, MapPin, Zap, ChevronRight, Star, 
  Building2, Activity, Microscope
} from 'lucide-react';

export default function App() {
  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = localStorage.getItem('clinic_appointments');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [form, setForm] = useState({ name: '', email: '', date: '', service: 'General Practice' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('clinic_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setAppointments([...appointments, { ...form, id: Date.now() }]);
      setForm({ name: '', email: '', date: '', service: 'General Practice' });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 800);
  };

  const services = [
    { name: 'General Practice', icon: <User />, desc: 'Comprehensive primary care for all ages.' },
    { name: 'Cardiology', icon: <Heart />, desc: 'Advanced heart health diagnostics and care.' },
    { name: 'Pediatrics', icon: <Users />, desc: 'Gentle, expert care for children and teens.' },
    { name: 'Laboratory', icon: <Microscope />, desc: 'On-site blood work and diagnostic testing.' },
    { name: 'Preventive Care', icon: <Shield />, desc: 'Annual checkups and wellness screenings.' },
    { name: 'Internal Medicine', icon: <Activity />, desc: 'Managing complex adult health conditions.' },
  ];

  const doctors = [
    { name: 'Dr. Sarah Jenkins', title: 'Chief of Medicine', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80' },
    { name: 'Dr. Marcus Thorne', title: 'Lead Cardiologist', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80' },
    { name: 'Dr. Elena Rodriguez', title: 'Senior Pediatrician', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&q=80' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-xl">
            <Building2 /> Vitality Clinic
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:5550123" className="flex items-center gap-2 text-slate-600 hover:text-sky-700 transition">
              <Phone size={18} /> (555) 012-3456
            </a>
            <a href="#book" className="bg-sky-700 text-white px-5 py-2 rounded-full font-medium hover:bg-sky-800 transition">
              Book Appointment
            </a>
          </div>
        </div>
      </nav>

      <header className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6 leading-tight">Your Health, Our Primary Commitment.</h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">Providing compassionate, evidence-based medical care for families in the greater community since 1998.</p>
          <div className="flex gap-4 justify-center">
            <a href="#services" className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition">Explore Services</a>
          </div>
        </div>
      </header>

      <section id="services" className="py-20 bg-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Specialities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition group">
                <div className="text-sky-700 mb-4 bg-sky-50 w-12 h-12 flex items-center justify-center rounded-lg">{s.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{s.name}</h3>
                <p className="text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Specialists</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {doctors.map((d, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white border border-slate-200">
                <img src={d.img} alt={d.name} className="w-full h-64 object-cover" />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold">{d.name}</h3>
                  <p className="text-sky-700 font-medium">{d.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Clinic Hours</h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-slate-800 pb-2"><span>Monday - Friday</span> <span>8:00 AM - 6:00 PM</span></div>
              <div className="flex justify-between border-b border-slate-800 pb-2"><span>Saturday</span> <span>9:00 AM - 2:00 PM</span></div>
              <div className="flex justify-between border-b border-slate-800 pb-2"><span>Sunday</span> <span>Closed</span></div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Accepted Insurance</h2>
            <div className="grid grid-cols-2 gap-4">
              {['BlueCross BlueShield', 'Aetna', 'UnitedHealthcare', 'Cigna', 'Humana', 'Medicare'].map(ins => (
                <div key={ins} className="bg-slate-800 p-3 rounded text-sm text-slate-300 flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400" /> {ins}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="book" className="py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
            <h2 className="text-3xl font-bold mb-2">Book an Appointment</h2>
            <p className="text-slate-600 mb-8">Fill out the form below and we'll confirm via email.</p>
            
            {success ? (
              <div className="p-6 bg-emerald-50 text-emerald-800 rounded-lg text-center font-medium">
                <CheckCircle className="mx-auto mb-2" /> Request sent successfully! We'll be in touch.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input required type="text" className="w-full p-3 rounded-lg border border-slate-300" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Service</label>
                    <select className="w-full p-3 rounded-lg border border-slate-300" value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
                      {services.map(s => <option key={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Preferred Date</label>
                    <input required type="date" className="w-full p-3 rounded-lg border border-slate-300" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                  </div>
                </div>
                <button disabled={loading || !form.name || !form.date} className="w-full bg-sky-700 text-white p-4 rounded-lg font-bold hover:bg-sky-800 disabled:opacity-50 transition">
                  {loading ? 'Processing...' : 'Confirm Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-slate-100 py-12 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-2 items-center text-slate-800 font-bold text-xl mb-4">
            <Zap className="fill-current" /> Vitality Clinic
          </div>
          <p className="text-slate-500 mb-6">123 Health Avenue, Medical District, Cityville, ST 90210</p>
          <div className="flex justify-center gap-6 text-slate-600">
            <span className="flex items-center gap-1"><MapPin size={16}/> Directions</span>
            <span className="flex items-center gap-1"><Mail size={16}/> contact@vitalityclinic.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}