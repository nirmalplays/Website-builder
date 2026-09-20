import React, { useState, useEffect } from 'react';
import { 
  Phone, Zap, Droplets, Flame, Star, Shield, Clock, CheckCircle, 
  MapPin, User, Calendar, AlertTriangle, ChevronRight, X 
} from 'lucide-react';

const SERVICES = [
  { id: 'plumbing', title: 'Plumbing', icon: Droplets, desc: 'Leak repairs, drain cleaning, and full pipe installations.' },
  { id: 'heating', title: 'Heating', icon: Flame, desc: 'Furnace repair, boiler maintenance, and energy-efficient upgrades.' },
  { id: 'electrical', title: 'Electrical', icon: Zap, desc: 'Panel upgrades, lighting installation, and wiring diagnostics.' },
];

const PRICING = [
  { service: 'Emergency Leak Repair', price: 149 },
  { service: 'Furnace Tune-up', price: 99 },
  { service: 'Panel Inspection', price: 129 },
  { service: 'Drain Cleaning', price: 189 },
];

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', service: 'plumbing', urgency: 'normal' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', service: 'plumbing', urgency: 'normal' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-bold text-2xl text-blue-700 flex items-center gap-2">
            <Shield className="w-8 h-8" /> ProTech Services
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 font-semibold text-slate-600">
              <Phone className="w-5 h-5 text-blue-600" /> 24/7 Support: (555) 123-4567
            </div>
            <a href="#booking" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">Book Now</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-slate-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Reliable Home Services, <br/>Anytime You Need Them.</h1>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">Expert plumbing, heating, and electrical repairs for your home. Licensed, insured, and ready to assist 24/7.</p>
        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 mx-auto text-lg">
          <AlertTriangle /> Emergency Callout
        </button>
      </header>

      {/* Services */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <div key={s.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <s.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Transparent Pricing</h2>
          <div className="space-y-4">
            {PRICING.map((item, i) => (
              <div key={i} className="flex justify-between items-center p-6 border rounded-xl hover:bg-slate-50 transition">
                <span className="font-medium text-lg">{item.service}</span>
                <span className="font-bold text-blue-600 text-xl">${item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="booking" className="py-20 px-4 max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Schedule Service</h2>
          {status === 'success' ? (
            <div className="text-center py-12 text-green-600 flex flex-col items-center gap-4">
              <CheckCircle className="w-16 h-16" />
              <p className="text-xl font-bold">Booking Submitted Successfully!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input className="w-full p-3 border rounded-lg" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input className="w-full p-3 border rounded-lg" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Service Type</label>
                  <select className="w-full p-3 border rounded-lg" onChange={e => setFormData({...formData, service: e.target.value})}>
                    <option value="plumbing">Plumbing</option>
                    <option value="heating">Heating</option>
                    <option value="electrical">Electrical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Urgency</label>
                  <select className="w-full p-3 border rounded-lg" onChange={e => setFormData({...formData, urgency: e.target.value})}>
                    <option value="normal">Standard</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <button disabled={status === 'loading'} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50">
                {status === 'loading' ? 'Processing...' : 'Submit Request'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 text-center">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-4">Coverage</h4>
            <p>Serving the entire Metro Area, including Downtown, North Side, and Suburbs.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Certifications</h4>
            <p>Licensed Master Plumbers, NATE-Certified HVAC Technicians, Licensed Electricians.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p>123 Service Way, Tech City, ST 55555</p>
            <p>(555) 123-4567</p>
          </div>
        </div>
        <p>© 2024 ProTech Services. All rights reserved.</p>
      </footer>
    </div>
  );
}