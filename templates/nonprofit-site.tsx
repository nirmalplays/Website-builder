import React, { useState, useEffect } from 'react';
import { 
  Heart, Users, Shield, Zap, CheckCircle, ArrowRight, 
  Menu, X, DollarSign, Calendar, Mail, User, Clock, Star
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('monthly');
  const [donationAmount, setDonationAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [volunteerForm, setVolunteerForm] = useState({ name: '', email: '', interest: 'Education' });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ngo_data');
      if (saved) console.log('Data loaded');
    } catch (e) {}
  }, []);

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1000);
  };

  const handleVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you ${volunteerForm.name}, we will contact you via ${volunteerForm.email} soon!`);
    setVolunteerForm({ name: '', email: '', interest: 'Education' });
  };

  const programs = [
    { title: 'Clean Water Initiative', desc: 'Installing solar-powered filtration systems in remote villages.', icon: Zap },
    { title: 'Youth Education Fund', desc: 'Providing scholarships and supplies for underprivileged students.', icon: Users },
    { title: 'Sustainable Farming', desc: 'Training communities in regenerative agriculture techniques.', icon: Shield },
    { title: 'Emergency Relief', desc: 'Rapid response distribution of food and medical supplies.', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="bg-white sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl text-emerald-600">
            <Heart className="fill-emerald-600" /> HopeBridge
          </div>
          <div className="hidden md:flex gap-8 font-medium">
            {['Mission', 'Programs', 'Impact', 'Volunteer'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-emerald-600 transition-colors">{item}</a>
            ))}
          </div>
          <a href="#donate" className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-700 transition-all">Donate Now</a>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative py-20 bg-emerald-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">Bridging Gaps, <br/>Changing Futures.</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-10">We empower marginalized communities by providing the tools for sustainable development, education, and health.</p>
          <div className="flex gap-4 justify-center">
            <a href="#donate" className="bg-white text-emerald-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50">Support Our Cause</a>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Families Helped', val: '12,400+' },
            { label: 'Clean Water Sites', val: '85' },
            { label: 'Students Graduated', val: '3,200' },
            { label: 'Regions Served', val: '14' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.val}</div>
              <div className="text-slate-600 uppercase tracking-wider text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Core Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((p, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-6">
                  <p.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-slate-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation */}
      <section id="donate" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-emerald-50 p-8 md:p-12 rounded-3xl border border-emerald-100">
            <h2 className="text-3xl font-bold text-center mb-8">Make an Impact</h2>
            <div className="flex justify-center gap-4 mb-8">
              {['monthly', 'once'].map(t => (
                <button key={t} onClick={() => setActiveTab(t)} className={`px-6 py-2 rounded-full capitalize font-semibold ${activeTab === t ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-600'}`}>{t}</button>
              ))}
            </div>
            <form onSubmit={handleDonation} className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {['25', '50', '100'].map(amt => (
                  <button type="button" key={amt} onClick={() => setDonationAmount(amt)} className={`py-4 rounded-xl font-bold border-2 ${donationAmount === amt ? 'border-emerald-600 bg-emerald-100' : 'border-slate-200 bg-white'}`}>${amt}</button>
                ))}
              </div>
              <input type="number" placeholder="Custom Amount ($)" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} className="w-full p-4 rounded-xl border border-slate-300" />
              <button disabled={formStatus === 'loading'} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 disabled:opacity-50">
                {formStatus === 'loading' ? 'Processing...' : formStatus === 'success' ? 'Thank You!' : 'Donate Now'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Volunteer */}
      <section id="volunteer" className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Join Our Volunteer Network</h2>
          <form onSubmit={handleVolunteer} className="grid md:grid-cols-3 gap-4">
            <input required type="text" placeholder="Full Name" value={volunteerForm.name} onChange={e => setVolunteerForm({...volunteerForm, name: e.target.value})} className="p-4 rounded-lg text-slate-900" />
            <input required type="email" placeholder="Email Address" value={volunteerForm.email} onChange={e => setVolunteerForm({...volunteerForm, email: e.target.value})} className="p-4 rounded-lg text-slate-900" />
            <button className="bg-emerald-500 hover:bg-emerald-600 py-4 px-6 rounded-lg font-bold">Sign Up</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2024 HopeBridge Nonprofit Organization. All rights reserved.</p>
          <div className="flex gap-6 justify-center">
            {['Privacy Policy', 'Terms of Service', 'Contact'].map(link => <a key={link} href="#" className="hover:text-white underline">{link}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
}