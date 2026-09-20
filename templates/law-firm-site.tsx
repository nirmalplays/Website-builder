import React, { useState, useEffect } from 'react';
import { 
  Scale, Phone, Mail, ChevronRight, CheckCircle, 
  Users, Shield, Briefcase, DollarSign, Clock, 
  MapPin, Star, User, ArrowRight, X 
} from 'lucide-react';

const PRACTICE_AREAS = [
  { title: "Corporate Litigation", icon: Briefcase, desc: "Aggressive defense and representation for complex business disputes." },
  { title: "Intellectual Property", icon: Shield, desc: "Protecting your innovations, trademarks, and creative assets globally." },
  { title: "Employment Law", icon: Users, desc: "Navigating labor relations, contracts, and workplace compliance issues." },
  { title: "Mergers & Acquisitions", icon: Scale, desc: "Strategic legal guidance for successful corporate transitions." },
  { title: "Real Estate Law", icon: MapPin, desc: "Comprehensive support for commercial and residential property transactions." },
  { title: "White Collar Defense", icon: Lock, desc: "Discreet and robust representation in regulatory and criminal investigations." }
];

const ATTORNEYS = [
  { name: "Eleanor Vance, JD", role: "Managing Partner", bar: "Admitted: NY, CT, DC", bio: "20 years of experience in high-stakes corporate litigation and arbitration." },
  { name: "Marcus Thorne, LLM", role: "Senior Associate", bar: "Admitted: NY, NJ", bio: "Specializing in international trade law and intellectual property protection." }
];

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Nav */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm border-b border-stone-200 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-stone-900 tracking-tight">
            <Scale className="text-blue-900" /> VANCE & THORNE
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#areas" className="hover:text-blue-900">Practice Areas</a>
            <a href="#attorneys" className="hover:text-blue-900">Attorneys</a>
            <a href="#contact" className="bg-blue-900 text-white px-5 py-2 rounded-sm hover:bg-blue-800 transition">Free Consultation</a>
            <div className="flex items-center gap-2 text-blue-900 font-semibold">
              <Phone size={16} /> (212) 555-0198
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-20 px-4 text-center bg-stone-100">
        <h1 className="text-4xl md:text-6xl font-serif text-stone-900 max-w-3xl mx-auto mb-6">
          Elite Legal Counsel for Your Most Critical Challenges
        </h1>
        <p className="text-lg text-stone-600 mb-8 max-w-xl mx-auto">
          We provide strategic, results-driven legal representation for businesses and individuals throughout the tri-state area.
        </p>
        <a href="#contact" className="inline-flex items-center gap-2 bg-blue-900 text-white px-8 py-4 text-lg font-semibold hover:bg-blue-800 transition">
          Schedule Your Consultation <ArrowRight size={20} />
        </a>
      </header>

      {/* Areas */}
      <section id="areas" className="py-20 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-serif mb-12 text-center">Practice Areas</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {PRACTICE_AREAS.map((area, i) => (
            <div key={i} className="p-8 border border-stone-200 bg-white hover:shadow-lg transition">
              <area.icon className="text-blue-900 mb-4" size={32} />
              <h3 className="font-bold mb-2 text-lg">{area.title}</h3>
              <p className="text-stone-600 text-sm">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">$500M+</div>
            <div className="text-blue-200">Recovered in Settlements</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">98%</div>
            <div className="text-blue-200">Client Success Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">25+</div>
            <div className="text-blue-200">Years of Excellence</div>
          </div>
        </div>
      </section>

      {/* Attorneys */}
      <section id="attorneys" className="py-20 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-serif mb-12 text-center">Our Attorneys</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {ATTORNEYS.map((attorney, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="w-24 h-24 bg-stone-300 flex-shrink-0 flex items-center justify-center">
                <User size={40} className="text-stone-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{attorney.name}</h3>
                <div className="text-blue-900 font-medium mb-2">{attorney.role}</div>
                <div className="text-xs text-stone-500 uppercase tracking-wider mb-2">{attorney.bar}</div>
                <p className="text-stone-600 text-sm">{attorney.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-stone-100 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-stone-200">
          <h2 className="text-3xl font-serif mb-6">Request Consultation</h2>
          {status === 'success' ? (
            <div className="p-6 bg-green-50 text-green-800 border border-green-200 text-center">
              <CheckCircle className="mx-auto mb-2" />
              Thank you. We will contact you within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="w-full p-3 border border-stone-300 rounded-none focus:ring-2 focus:ring-blue-900 outline-none" />
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email Address" className="w-full p-3 border border-stone-300 rounded-none focus:ring-2 focus:ring-blue-900 outline-none" />
              <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="How can we help you?" className="w-full p-3 border border-stone-300 rounded-none focus:ring-2 focus:ring-blue-900 outline-none"></textarea>
              <button disabled={status === 'loading'} className="w-full bg-blue-900 text-white py-4 font-bold hover:bg-blue-800 disabled:bg-stone-400">
                {status === 'loading' ? 'Sending...' : 'Submit Request'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 text-sm">
          <div>
            <div className="text-white font-bold mb-4">VANCE & THORNE LLP</div>
            <p>1221 Avenue of the Americas, 42nd Floor</p>
            <p>New York, NY 10020</p>
          </div>
          <div className="text-right space-y-2">
            <p>Phone: (212) 555-0198</p>
            <p>Email: contact@vancethorne.law</p>
            <p className="pt-4 text-xs italic">© 2024 Vance & Thorne. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}