import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, ArrowRight, Shield, Zap, TrendingUp, 
  DollarSign, Calendar, Users, Mail, User, 
  ChevronRight, Star, X, Check, Package, Clock 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [formState, setFormState] = useState({ name: '', email: '', message: '', status: 'idle' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    { title: 'Tax Planning & Prep', icon: <DollarSign className="w-6 h-6 text-blue-600" />, desc: 'Minimize liability with proactive strategies.' },
    { title: 'Bookkeeping', icon: <TrendingUp className="w-6 h-6 text-blue-600" />, desc: 'Maintain clean, audit-ready financial records.' },
    { title: 'Advisory Services', icon: <Zap className="w-6 h-6 text-blue-600" />, desc: 'Strategic growth consulting for your business.' },
    { title: 'Payroll Management', icon: <Users className="w-6 h-6 text-blue-600" />, desc: 'Automated compliance and payment processing.' }
  ];

  const packages = [
    { name: 'Individual', price: '$299', features: ['Personal Tax Return', 'Audit Protection', 'Quarterly Review'] },
    { name: 'Small Business', price: '$899', features: ['Monthly Bookkeeping', 'Payroll Processing', 'Tax Compliance', 'Quarterly Advisory'] },
    { name: 'Enterprise', price: 'Custom', features: ['CFO Services', 'Risk Management', 'International Tax', 'Dedicated Agent'] }
  ];

  const deadlines = [
    { date: 'April 15', event: 'Federal Tax Filing Deadline' },
    { date: 'June 15', event: 'Q2 Estimated Tax Due' },
    { date: 'Sept 15', event: 'Corporate Extension Deadline' }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ ...formState, status: 'loading' });
    setTimeout(() => {
      setFormState({ name: '', email: '', message: '', status: 'success' });
      setTimeout(() => setFormState(prev => ({ ...prev, status: 'idle' })), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-bold text-2xl text-blue-900 flex items-center gap-2">
            <Shield className="text-blue-600" /> ApexAccountants
          </div>
          <div className="hidden md:flex gap-8 font-medium">
            {['Services', 'Pricing', 'Deadlines', 'Contact'].map(item => (
              <button key={item} onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({behavior:'smooth'})} className="hover:text-blue-600 transition-colors">{item}</button>
            ))}
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all">Free Consultation</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-20 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">Your Financial Growth, <span className="text-blue-600">Simplified.</span></h1>
        <p className="text-xl text-slate-600 mb-10">We provide expert accounting and tax services for individuals and growing businesses. Focus on your passion, leave the numbers to us.</p>
        <div className="flex gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700">Get Started</button>
          <button className="bg-white border border-slate-300 px-8 py-4 rounded-xl font-bold hover:bg-slate-100">View Services</button>
        </div>
      </header>

      {/* Services */}
      <section id="services" className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Expert Financial Solutions</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className="p-6 border border-slate-200 rounded-2xl hover:shadow-lg transition-all">
                <div className="mb-4">{s.icon}</div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((p, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-xl mb-4">{p.name}</h3>
                <div className="text-4xl font-extrabold mb-6">{p.price}<span className="text-base text-slate-400 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-8">
                  {p.features.map((f, fi) => <li key={fi} className="flex items-center gap-2 text-slate-700"><CheckCircle className="w-5 h-5 text-green-500" /> {f}</li>)}
                </ul>
                <button className="w-full py-3 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold">Select Plan</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deadlines */}
      <section id="deadlines" className="py-20 bg-blue-900 text-white px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Important Tax Deadlines</h2>
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-md">
            {deadlines.map((d, i) => (
              <div key={i} className="flex items-center justify-between border-b border-white/20 py-6 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg"><Calendar className="w-6 h-6" /></div>
                  <span className="font-bold text-lg">{d.event}</span>
                </div>
                <span className="font-mono font-bold bg-white/10 px-3 py-1 rounded">{d.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-3xl font-bold mb-8">Book a Free Consultation</h2>
          {formState.status === 'success' ? (
            <div className="text-center py-12 bg-green-50 rounded-xl text-green-700">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-bold">Message Received!</h3>
              <p>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input required value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" type="text" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input required value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" type="email" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea required value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} className="w-full p-3 rounded-lg border border-slate-300 h-32" placeholder="How can we help you?" />
              </div>
              <button disabled={formState.status === 'loading'} className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50">
                {formState.status === 'loading' ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-bold text-2xl text-white mb-4">ApexAccountants</div>
          <p className="mb-8">123 Financial District, New York, NY 10005 | (555) 123-4567</p>
          <p className="text-sm border-t border-slate-800 pt-8">&copy; {new Date().getFullYear()} Apex Accountants Group. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}