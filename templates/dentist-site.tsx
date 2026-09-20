import React, { useState, useEffect } from 'react';
import { 
  Phone, Calendar, Star, CheckCircle, Shield, CreditCard, 
  User, ChevronRight, Sparkles, Clock, MapPin, Mail, ArrowRight 
} from 'lucide-react';

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', date: '', service: 'General Checkup' });

  const treatments = [
    { title: "Cosmetic Whitening", desc: "Professional-grade laser whitening for a brighter, confident smile.", icon: <Sparkles className="w-6 h-6 text-blue-600" /> },
    { title: "Dental Implants", desc: "Permanent solutions for missing teeth using advanced titanium technology.", icon: <CheckCircle className="w-6 h-6 text-blue-600" /> },
    { title: "General Checkups", desc: "Routine cleanings, x-rays, and examinations for optimal oral health.", icon: <Clock className="w-6 h-6 text-blue-600" /> },
    { title: "Orthodontics", desc: "Clear aligners and traditional braces to straighten your smile effectively.", icon: <Shield className="w-6 h-6 text-blue-600" /> }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      setFormData({ name: '', email: '', date: '', service: 'General Checkup' });
      setTimeout(() => setFormSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900 tracking-tight">BrightSmile Dental</div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#treatments" className="text-slate-600 hover:text-blue-600">Treatments</a>
            <a href="#dentists" className="text-slate-600 hover:text-blue-600">Our Team</a>
            <a href="#reviews" className="text-slate-600 hover:text-blue-600">Reviews</a>
            <a href="tel:5550123" className="flex items-center gap-2 font-semibold text-blue-700 bg-blue-50 px-4 py-2 rounded-full">
              <Phone size={18} /> Emergency: (555) 0123
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">Your Best Smile Starts Here.</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">Compassionate, state-of-the-art dental care for the whole family. We make your comfort our priority.</p>
          <a href="#appointment" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2">
            Book Your Appointment <ArrowRight size={20} />
          </a>
        </div>
      </header>

      {/* Treatments */}
      <section id="treatments" className="py-20 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Specialized Treatments</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="mb-4">{t.icon}</div>
              <h3 className="font-bold text-lg mb-2">{t.title}</h3>
              <p className="text-slate-500 text-sm">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Dentists */}
      <section id="dentists" className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Expert Dentists</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { name: "Dr. Sarah Jenkins", deg: "DDS, Cosmetic Specialist", bio: "With over 15 years in restorative dentistry, Dr. Jenkins focuses on natural-looking aesthetics." },
              { name: "Dr. Marcus Thorne", deg: "DMD, Implantology", bio: "Expert in surgical implants and modern oral health, committed to painless procedures." }
            ].map((d, i) => (
              <div key={i} className="flex gap-6 items-start bg-slate-800 p-8 rounded-2xl">
                <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center shrink-0">
                  <User className="w-10 h-10 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{d.name}</h3>
                  <p className="text-blue-400 mb-2 font-medium">{d.deg}</p>
                  <p className="text-slate-400 text-sm">{d.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section id="appointment" className="py-20 max-w-3xl mx-auto px-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
          <h2 className="text-3xl font-bold mb-8">Request an Appointment</h2>
          {formSuccess ? (
            <div className="p-6 bg-green-50 text-green-700 rounded-xl text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4" />
              <p className="font-bold">Appointment request sent!</p>
              <p>We will contact you shortly to confirm.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                <option>General Checkup</option>
                <option>Cosmetic Whitening</option>
                <option>Dental Implants</option>
              </select>
              <button disabled={isSubmitting || !formData.name || !formData.email} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition">
                {isSubmitting ? 'Sending...' : 'Confirm Request'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 py-12 text-slate-600">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2"><MapPin size={18} /> 123 Dental Lane, Smile City</div>
            <div className="flex items-center gap-2"><Mail size={18} /> hello@brightsmile.com</div>
          </div>
          <p>&copy; 2024 BrightSmile Dental Practice. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}