import React, { useState, useEffect } from 'react';
import { 
  Scale, Phone, Mail, ChevronRight, CheckCircle, 
  Users, Shield, Briefcase, Gavel, FileText, ArrowRight,
  MapPin, Clock, Star, X
} from 'lucide-react';

const INITIAL_DATA = {
  practiceAreas: [
    { title: "Corporate Litigation", icon: <Briefcase className="w-8 h-8" />, desc: "Representing enterprise clients in complex commercial disputes." },
    { title: "Intellectual Property", icon: <Shield className="w-8 h-8" />, desc: "Protecting your innovations, trademarks, and creative assets." },
    { title: "Employment Law", icon: <Users className="w-8 h-8" />, desc: "Defending rights for both management and employees." },
    { title: "Real Estate Law", icon: <MapPin className="w-8 h-8" />, desc: "Streamlining complex commercial and residential transactions." },
    { title: "Criminal Defense", icon: <Gavel className="w-8 h-8" />, desc: "Aggressive advocacy for clients facing serious allegations." },
    { title: "Estate Planning", icon: <FileText className="w-8 h-8" />, desc: "Securing your legacy through comprehensive wealth planning." }
  ],
  attorneys: [
    { name: "Eleanor Vance", role: "Managing Partner", bar: "Admitted: NY, NJ", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400" },
    { name: "Marcus Thorne", role: "Senior Litigation Counsel", bar: "Admitted: CA, IL", img: "https://images.unsplash.com/photo-1560250097-0b93528c31e6?auto=format&fit=crop&w=400&h=400" }
  ]
};

export default function App() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '', status: 'idle' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, status: 'loading' }));
    setTimeout(() => {
      setFormState({ name: '', email: '', message: '', status: 'success' });
      setTimeout(() => setFormState(prev => ({ ...prev, status: 'idle' })), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Nav */}
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-2xl text-stone-800">
            <Scale className="text-amber-700" /> VANCE & THORNE
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#areas" className="hover:text-amber-700">Areas</a>
            <a href="#attorneys" className="hover:text-amber-700">Attorneys</a>
            <a href="#contact" className="bg-amber-700 text-white px-5 py-2 rounded-sm hover:bg-amber-800 flex items-center gap-2">
              <Phone className="w-4 h-4" /> (555) 123-4567
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-20 px-4 bg-stone-900 text-white text-center">
        <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">Elite Advocacy for <br /> Complex Legal Challenges</h1>
        <p className="text-stone-300 text-lg max-w-2xl mx-auto mb-10">Providing strategic counsel and aggressive representation for individuals and corporations since 1994.</p>
        <a href="#contact" className="inline-block bg-amber-700 text-white px-8 py-4 text-lg font-semibold hover:bg-amber-600 transition-colors">
          Schedule Free Consultation
        </a>
      </header>

      {/* Practice Areas */}
      <section id="areas" className="py-20 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-serif text-center mb-12">Practice Areas</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {INITIAL_DATA.practiceAreas.map((area, i) => (
            <div key={i} className="bg-white p-8 border border-stone-200 hover:border-amber-700 transition-colors group">
              <div className="text-amber-700 mb-4">{area.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Attorneys */}
      <section id="attorneys" className="bg-stone-100 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif text-center mb-12">Our Partners</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {INITIAL_DATA.attorneys.map((attr, i) => (
              <div key={i} className="flex gap-6 bg-white p-6 shadow-sm">
                <img src={attr.img} alt={attr.name} className="w-32 h-32 object-cover" />
                <div>
                  <h3 className="text-2xl font-serif">{attr.name}</h3>
                  <p className="text-amber-700 font-medium mb-2">{attr.role}</p>
                  <p className="text-stone-500 text-sm flex items-center gap-1"><Shield className="w-4 h-4" /> {attr.bar}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="contact" className="py-20 max-w-2xl mx-auto px-4">
        <div className="bg-white p-10 border border-stone-200">
          <h2 className="text-3xl font-serif mb-6">Request Consultation</h2>
          {formState.status === 'success' ? (
            <div className="p-6 bg-green-50 text-green-800 border border-green-200 flex items-center gap-3">
              <CheckCircle /> Request received. We will contact you within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleConsultationSubmit} className="space-y-4">
              <input required type="text" placeholder="Full Name" className="w-full p-3 border border-stone-300" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
              <input required type="email" placeholder="Email Address" className="w-full p-3 border border-stone-300" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
              <textarea required placeholder="Brief description of your legal matter" rows={4} className="w-full p-3 border border-stone-300" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} />
              <button disabled={formState.status === 'loading'} className="w-full bg-stone-900 text-white py-4 font-bold disabled:opacity-50">
                {formState.status === 'loading' ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-sm">
          <div>
            <h4 className="text-white font-bold mb-4">VANCE & THORNE LLP</h4>
            <p>1225 Financial District, Suite 400</p>
            <p>New York, NY 10005</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">CONTACT</h4>
            <p>info@vancethorne.law</p>
            <p>(555) 123-4567</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">HOURS</h4>
            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
            <p>Sat - Sun: By Appointment Only</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-stone-800 text-center text-xs">
          © 2024 Vance & Thorne LLP. All Rights Reserved. Not Legal Advice.
        </div>
      </footer>
    </div>
  );
}