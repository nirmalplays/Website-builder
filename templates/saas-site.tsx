import React, { useState } from 'react';
import { 
  Check, ArrowRight, Zap, Shield, BarChart3, Users, 
  CreditCard, Clock, Star, ChevronDown, Menu, X, Sparkles
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white"><Zap size={20} /></div>
            <span className="text-xl font-bold tracking-tight">FlowStream</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600">Features</a>
            <a href="#pricing" className="hover:text-indigo-600">Pricing</a>
            <a href="#integrations" className="hover:text-indigo-600">Integrations</a>
            <a href="#" className="hover:text-indigo-600">Resources</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium hover:text-indigo-600">Log in</button>
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition">Start free trial</button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-20 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
          <Sparkles size={16} />
          <span>v2.4 is now live with AI Insights</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 mb-6 leading-[1.1]">
          Orchestrate your workflow with <span className="text-indigo-600">precision</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          The all-in-one platform for modern teams to plan, track, and ship high-quality products without the operational chaos.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
            Get Started for Free <ArrowRight size={18} />
          </button>
          <button className="bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition">
            Book a Demo
          </button>
        </div>
        <div className="mt-16 bg-slate-900 rounded-2xl p-2 shadow-2xl">
          <div className="bg-slate-800 h-64 md:h-96 rounded-xl flex items-center justify-center text-slate-500">
            [Product Interface Mockup]
          </div>
        </div>
      </header>

      {/* Logos */}
      <div className="py-12 border-b border-slate-100">
        <p className="text-center text-sm font-semibold text-slate-400 mb-8 uppercase tracking-widest">Trusted by innovative teams</p>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 opacity-50 grayscale">
          {['Vertex', 'CloudScale', 'Momentum', 'Nova', 'Pinnacle'].map(n => (
            <div key={n} className="text-2xl font-bold text-center">{n}</div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto space-y-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-6">Automated reporting that saves you hours.</h2>
            <p className="text-lg text-slate-600 mb-8">Stop manually updating spreadsheets. Our AI engine generates real-time performance insights so you can focus on making data-driven decisions.</p>
            <ul className="space-y-4">
              {['Auto-generated weekly briefs', 'Anomaly detection alerts', 'Custom KPI dashboards'].map(f => (
                <li key={f} className="flex items-center gap-3"><Check className="text-indigo-600" size={20} /> {f}</li>
              ))}
            </ul>
          </div>
          <div className="bg-indigo-50 h-80 rounded-3xl flex items-center justify-center text-indigo-400">Visualization</div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 bg-indigo-50 h-80 rounded-3xl flex items-center justify-center text-indigo-400">Collaboration</div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold tracking-tight mb-6">Sync your team, wherever they are.</h2>
            <p className="text-lg text-slate-600 mb-8">Integrated chat, file versioning, and task management ensure that everyone stays aligned, even across time zones.</p>
            <ul className="space-y-4">
              {['Unified notification center', 'Global team presence', 'Real-time document editing'].map(f => (
                <li key={f} className="flex items-center gap-3"><Check className="text-indigo-600" size={20} /> {f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-8">Simple, transparent pricing</h2>
          <div className="flex justify-center mb-12">
            <div className="bg-slate-200 p-1 rounded-full flex gap-1">
              <button onClick={() => setIsAnnual(false)} className={`px-6 py-2 rounded-full text-sm font-semibold transition ${!isAnnual ? 'bg-white shadow' : ''}`}>Monthly</button>
              <button onClick={() => setIsAnnual(true)} className={`px-6 py-2 rounded-full text-sm font-semibold transition ${isAnnual ? 'bg-white shadow' : ''}`}>Annual (Save 20%)</button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: isAnnual ? 29 : 39, features: ['5 Projects', 'Basic Analytics', 'Community Support'] },
              { name: 'Pro', price: isAnnual ? 79 : 99, features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'API Access'] },
              { name: 'Enterprise', price: 199, features: ['Unlimited Everything', 'Dedicated Manager', 'Custom Security', 'SSO Login'] }
            ].map((p, i) => (
              <div key={p.name} className={`p-8 rounded-2xl bg-white border ${i === 1 ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-slate-200'}`}>
                <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                <div className="text-4xl font-extrabold mb-6">${p.price}<span className="text-base font-normal text-slate-500">/mo</span></div>
                <ul className="space-y-4 mb-8">
                  {p.features.map(f => <li key={f} className="flex items-center gap-2 text-sm"><Check size={16} className="text-indigo-600" /> {f}</li>)}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold ${i === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>Choose Plan</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to transform your workflow?</h2>
        <p className="text-slate-600 mb-8">Join over 2,000+ companies using FlowStream to scale.</p>
        <button className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-800">Start your 14-day trial</button>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {['Product', 'Company', 'Support', 'Legal'].map(section => (
            <div key={section}>
              <h4 className="text-white font-bold mb-4">{section}</h4>
              <ul className="space-y-2 text-sm">
                <li>Features</li><li>About</li><li>Help Center</li><li>Privacy</li>
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}