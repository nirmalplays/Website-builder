import React, { useState, useEffect } from 'react';
import { 
  Check, ChevronDown, Zap, Shield, BarChart3, Users, Clock, DollarSign, 
  ArrowRight, Mail, Star, Package, TrendingUp, X, CheckCircle 
} from 'lucide-react';

export default function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const features = [
    { title: 'Real-time Analytics', icon: BarChart3, desc: 'Track your growth metrics with sub-second latency.' },
    { title: 'Secure Vault', icon: Shield, desc: 'Enterprise-grade encryption for all your sensitive data.' },
    { title: 'Rapid Deployment', icon: Zap, desc: 'Push updates to production in less than 30 seconds.' },
    { title: 'Team Collaboration', icon: Users, desc: 'Seamlessly integrate your entire team workflow.' },
    { title: 'Smart Scheduling', icon: Clock, desc: 'AI-powered task management that saves you hours.' },
    { title: 'Cost Optimization', icon: DollarSign, desc: 'Automatic resource scaling to reduce your cloud spend.' },
  ];

  const faqs = [
    { q: 'Is there a free trial?', a: 'Yes, we offer a 14-day free trial on all plans. No credit card required.' },
    { q: 'Can I cancel anytime?', a: 'Absolutely. You can manage or cancel your subscription directly from your settings.' },
    { q: 'What integrations do you support?', a: 'We support over 50+ integrations including Slack, GitHub, and Jira.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Nav */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <Package /> NexusLaunch
          </div>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition">
            Get Early Access
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Launch your ideas <span className="text-indigo-600">faster</span> than ever.
          </h1>
          <p className="text-xl text-slate-600 mb-10">
            The all-in-one platform for modern founders to build, ship, and scale their SaaS products without the overhead.
          </p>
          <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
            <button 
              disabled={status === 'loading'}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
          {status === 'success' && (
            <p className="text-green-600 mt-4 flex items-center justify-center gap-2">
              <CheckCircle size={18} /> Thanks for joining the journey!
            </p>
          )}
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">The problem is fragmentation.</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Building a startup today means managing a dozen disparate tools, from payment gateways to analytics dashboards. 
              The overhead of context-switching kills productivity and delays your time-to-market.
            </p>
          </div>
          <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
            <h2 className="text-3xl font-bold mb-6 text-indigo-900">The solution is Nexus.</h2>
            <p className="text-indigo-800 leading-relaxed">
              We provide a unified infrastructure layer that automates the boring stuff. Focus on your code and customers 
              while our platform handles security, billing, and global scaling.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-6 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <f.icon />
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">Get started in three steps</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {['Connect your repo', 'Configure settings', 'Go live'].map((step, i) => (
              <div key={i} className="relative">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Early Access Pricing</h2>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 inline-block w-full max-w-sm">
          <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">Founder Tier</div>
          <div className="text-5xl font-extrabold mb-6">$49<span className="text-xl text-slate-400">/mo</span></div>
          <ul className="text-left space-y-4 mb-8">
            {['Unlimited Projects', 'Priority Support', 'Custom Domain'].map(feat => (
              <li key={feat} className="flex items-center gap-2"><Check size={18} className="text-green-500" /> {feat}</li>
            ))}
          </ul>
          <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800">Start Free Trial</button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Common Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full flex justify-between items-center p-4 bg-white hover:bg-slate-50 transition"
              >
                <span className="font-semibold">{f.q}</span>
                <ChevronDown className={`transition ${activeFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === i && <div className="p-4 bg-slate-50 border-t border-slate-200 text-slate-600">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      <footer className="py-10 border-t border-slate-200 text-center text-slate-500">
        <p>© 2024 NexusLaunch Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}