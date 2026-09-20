import React, { useState } from 'react';
import { 
  Phone, Zap, Droplets, Flame, Shield, Calendar, 
  CheckCircle, Star, ArrowRight, Clock, MapPin, 
  User, Settings, Mail, CreditCard 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('plumbing');

  const services = [
    { id: 'plumbing', title: 'Plumbing Services', icon: <Droplets className="w-8 h-8 text-blue-600" />, desc: 'Expert leak detection, pipe repair, and drain cleaning.' },
    { id: 'heating', title: 'Heating & Cooling', icon: <Flame className="w-8 h-8 text-blue-600" />, desc: 'Furnace repair, AC installation, and system optimization.' },
    { id: 'electrical', title: 'Electrical Work', icon: <Zap className="w-8 h-8 text-blue-600" />, desc: 'Panel upgrades, lighting fixtures, and circuit diagnostics.' },
  ];

  const pricing = [
    { service: 'Drain Clearing', price: '$129', time: '1 hour' },
    { service: 'AC Tune-up', price: '$99', time: '45 mins' },
    { service: 'Panel Inspection', price: '$189', time: '2 hours' },
    { service: 'Water Heater Flush', price: '$150', time: '1.5 hours' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            <Shield className="w-8 h-8" /> ProFix Home
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#reviews">Reviews</a>
            <a href="tel:5550123456" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
              <Phone className="w-4 h-4" /> 555-012-3456
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative py-20 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Available 24/7 for Emergencies</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mt-4 mb-6 text-slate-900">Your Trusted Home Service Experts</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">From leaky faucets to full electrical panel replacements, our certified technicians are ready to help you today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#booking" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" /> Schedule Emergency Repair
            </a>
          </div>
        </div>
      </header>

      {/* Services */}
      <section id="services" className="py-20 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Core Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.id} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Transparent Pricing</h2>
          <div className="bg-white rounded-xl overflow-hidden text-slate-900">
            {pricing.map((item, i) => (
              <div key={i} className={`flex justify-between items-center p-6 ${i !== pricing.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <span className="font-medium text-lg">{item.service}</span>
                <div className="flex items-center gap-6">
                  <span className="text-slate-500 text-sm flex items-center gap-1"><Clock className="w-4 h-4" /> {item.time}</span>
                  <span className="font-bold text-blue-600 text-xl">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technicians & Reviews */}
      <section id="reviews" className="py-20 max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-8">Our Certified Team</h2>
            <div className="space-y-6">
              {[
                { name: 'Sarah Jenkins', role: 'Master Plumber', cert: '15+ Years Experience' },
                { name: 'Marcus Thorne', role: 'Lead Electrician', cert: 'Licensed & Insured' }
              ].map((tech, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-500"><User /></div>
                  <div>
                    <h4 className="font-bold">{tech.name}</h4>
                    <p className="text-sm text-blue-600">{tech.role}</p>
                    <p className="text-xs text-slate-500">{tech.cert}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
            <div className="space-y-6">
              {[
                { name: 'Alice R.', text: 'Fast response and professional service. My water heater was fixed in under two hours!' },
                { name: 'David L.', text: 'Very transparent with pricing. No surprise fees and the work was perfect.' }
              ].map((rev, i) => (
                <div key={i} className="p-6 bg-white rounded-xl border border-slate-200">
                  <div className="flex gap-1 text-yellow-400 mb-3"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
                  <p className="text-slate-600 mb-3 italic">"{rev.text}"</p>
                  <p className="font-bold text-sm">- {rev.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-20 bg-blue-50">
        <div className="max-w-2xl mx-auto px-4 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Book a Service</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="p-3 border border-slate-300 rounded-lg w-full" />
              <input type="tel" placeholder="Phone Number" className="p-3 border border-slate-300 rounded-lg w-full" />
            </div>
            <select className="w-full p-3 border border-slate-300 rounded-lg">
              <option>Select Urgency</option>
              <option>Emergency (Within 2 Hours)</option>
              <option>Scheduled (Within 48 Hours)</option>
              <option>Routine Maintenance</option>
            </select>
            <textarea placeholder="Describe the issue..." className="w-full p-3 border border-slate-300 rounded-lg h-32"></textarea>
            <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700">Submit Request</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-2 items-center text-white font-bold text-xl mb-4">
            <Shield className="w-6 h-6" /> ProFix Home
          </div>
          <p className="text-sm mb-8">Serving the greater metropolitan area with integrity since 2008.</p>
          <div className="flex justify-center gap-8 text-sm">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Careers</a>
          </div>
        </div>
      </footer>
    </div>
  );
}