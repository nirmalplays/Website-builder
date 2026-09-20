import React, { useState, useEffect } from 'react';
import { 
  Check, ArrowRight, Zap, Shield, BarChart3, Users, 
  Clock, DollarSign, Star, ChevronDown, Menu, X, 
  TrendingUp, Package, Mail, Globe, Settings
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('billing');
      if (saved) setBillingCycle(JSON.parse(saved));
    } catch {}
  }, []);

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const toggleBilling = () => {
    const next = billingCycle === 'monthly' ? 'annually' : 'monthly';
    setBillingCycle(next);
    localStorage.setItem('billing', JSON.stringify(next));
  };

  const features = [
    { title: 'Automated Analytics', desc: 'Real-time insights into your marketing performance with AI-driven reporting.', icon: BarChart3 },
    { title: 'Team Collaboration', desc: 'Seamlessly manage workflows with shared workspaces and role-based permissions.', icon: Users },
    { title: 'Security First', desc: 'Enterprise-grade encryption and compliance standards to keep your data safe.', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl text-blue-600">
            <Zap className="fill-blue-600" /> OrbitFlow
          </div>
          <div className="hidden md:flex gap-8 font-medium text-slate-600">
            {['Features', 'Integrations', 'Pricing', 'Company'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-blue-600 transition-colors">{link}</a>
            ))}
          </div>
          <button className="hidden md:flex bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all">
            Start free trial
          </button>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-20 md:py-32 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-950">
          Scale your marketing <br /><span className="text-blue-600">without the chaos.</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          OrbitFlow helps fast-growing teams automate campaigns, track ROI, and collaborate seamlessly in one unified dashboard.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700">Get Started Today</button>
          <button className="bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-200">Book a Demo</button>
        </div>
        <div className="mt-16 bg-slate-50 border border-slate-200 rounded-2xl p-2 shadow-2xl max-w-5xl mx-auto">
          <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2000" alt="Dashboard" className="rounded-xl w-full" />
        </div>
      </header>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Simple, predictable pricing</h2>
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={billingCycle === 'monthly' ? 'font-bold' : 'text-slate-500'}>Monthly</span>
            <button onClick={toggleBilling} className="w-14 h-8 bg-blue-600 rounded-full relative transition-all">
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${billingCycle === 'annually' ? 'left-7' : 'left-1'}`} />
            </button>
            <span className={billingCycle === 'annually' ? 'font-bold' : 'text-slate-500'}>Annually <span className="text-blue-600 text-xs bg-blue-50 px-2 py-0.5 rounded">Save 20%</span></span>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { tier: 'Starter', price: 29, feats: ['5 Projects', 'Basic Analytics', 'Email Support'] },
              { tier: 'Pro', price: 79, feats: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'API Access'] },
              { tier: 'Enterprise', price: 199, feats: ['Dedicated Account Mgr', 'SSO & Custom Security', 'Custom Integrations'] }
            ].map(p => (
              <div key={p.tier} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all">
                <h3 className="text-xl font-bold mb-4">{p.tier}</h3>
                <div className="text-4xl font-bold mb-6">${billingCycle === 'annually' ? Math.round(p.price * 0.8) : p.price}<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-8 text-left">
                  {p.feats.map(f => <li key={f} className="flex items-center gap-2"><Check className="w-5 h-5 text-blue-600" /> {f}</li>)}
                </ul>
                <button className="w-full py-3 border-2 border-slate-900 rounded-xl font-semibold hover:bg-slate-900 hover:text-white transition-all">Choose {p.tier}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { title: 'Product', links: ['Features', 'Integrations', 'Pricing', 'Changelog'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
            { title: 'Resources', links: ['Docs', 'Help Center', 'Guides', 'Status'] },
            { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Compliance'] }
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-bold mb-4">{col.title}</h4>
              <ul className="space-y-3 text-slate-600">
                {col.links.map(l => <li key={l}><a href="#" className="hover:text-blue-600">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
      </footer>

      {/* Newsletter */}
      <section className="bg-blue-600 py-16 px-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Ready to scale your business?</h2>
        <form onSubmit={handleTrialSubmit} className="max-w-md mx-auto flex gap-2">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            className="flex-1 px-4 py-3 rounded-xl text-slate-900"
            required
          />
          <button disabled={status !== 'idle'} className="bg-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-black transition-all">
            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Joined!' : 'Join Waitlist'}
          </button>
        </form>
      </section>
    </div>
  );
}