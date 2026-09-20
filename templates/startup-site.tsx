import React, { useState } from 'react';
import { 
  CheckCircle, Zap, Shield, BarChart3, Users, Clock, 
  ArrowRight, Star, ChevronDown, Mail, Sparkles, TrendingUp
} from 'lucide-react';

export default function App() {
  const [email, setEmail] = useState('');

  const features = [
    { title: "Real-time Analytics", icon: <BarChart3 className="w-6 h-6" />, desc: "Track every conversion with sub-millisecond latency." },
    { title: "Automated Workflows", icon: <Zap className="w-6 h-6" />, desc: "Eliminate manual data entry with AI-powered triggers." },
    { title: "Enterprise Security", icon: <Shield className="w-6 h-6" />, desc: "Bank-grade encryption for your most sensitive data." },
    { title: "Team Collaboration", icon: <Users className="w-6 h-6" />, desc: "Share insights and build reports with your entire squad." },
    { title: "Scheduled Reporting", icon: <Clock className="w-6 h-6" />, desc: "Automate your daily, weekly, and monthly summaries." },
    { title: "Predictive Insights", icon: <TrendingUp className="w-6 h-6" />, desc: "Use historical data to forecast future performance." },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Sparkles className="text-indigo-600" /> FluxFlow
        </div>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition">
          Join Waitlist
        </button>
      </nav>

      {/* Hero */}
      <header className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Star className="w-4 h-4 fill-indigo-700" /> Now in Private Beta
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          The command center for your <span className="text-indigo-600">growth metrics.</span>
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          Stop juggling spreadsheet tabs. FluxFlow centralizes your revenue, marketing, and user data into one actionable dashboard.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 justify-center" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your work email" 
            className="px-6 py-4 rounded-xl border border-slate-200 w-full sm:w-96 focus:ring-2 focus:ring-indigo-600 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition">
            Get Access <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </header>

      {/* Problem & Solution */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">You're drowning in data, not insights.</h2>
            <p className="text-slate-600 mb-4">Most startups spend 15 hours a week just cleaning data. The fragmentation between your CRM, ads, and product analytics makes it impossible to see the "why" behind your growth.</p>
            <p className="text-slate-600">FluxFlow bridges the gap by transforming raw streams into a single source of truth for your entire team.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Dashboard preview" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-16">Built for fast-moving teams</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 border border-slate-100 rounded-2xl hover:border-indigo-100 hover:shadow-lg transition">
              <div className="text-indigo-600 mb-4 bg-indigo-50 w-12 h-12 flex items-center justify-center rounded-xl">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center">Three steps to clarity</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Connect", desc: "Link your existing tools in seconds." },
              { step: "02", title: "Analyze", desc: "Our models identify key trends." },
              { step: "03", title: "Act", desc: "Execute changes that move the needle." }
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="text-indigo-400 font-mono text-xl mb-4">{s.step}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Early Access Pricing</h2>
        <div className="border-2 border-indigo-600 rounded-3xl p-10 bg-indigo-50/50">
          <div className="text-5xl font-bold mb-4">$49<span className="text-xl text-slate-500 font-normal">/mo</span></div>
          <p className="text-slate-600 mb-8">Lock in our early-bird rate for life if you sign up during the beta period.</p>
          <ul className="text-left space-y-4 mb-8 inline-block">
            {['Unlimited connections', 'AI-powered forecasting', 'Priority email support', 'Export to PDF/CSV'].map(item => (
              <li key={item} className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-indigo-600" /> {item}</li>
            ))}
          </ul>
          <button className="block w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700">Claim My Spot</button>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center">The team behind FluxFlow</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {[
              { name: "Sarah Chen", role: "CEO, Ex-Stripe", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200" },
              { name: "Marcus Thorne", role: "CTO, Ex-Google", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" }
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-6 bg-white p-6 rounded-2xl border border-slate-100">
                <img src={f.img} alt={f.name} className="w-20 h-20 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-lg">{f.name}</h4>
                  <p className="text-indigo-600 text-sm font-medium">{f.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-slate-500 text-sm border-t border-slate-100">
        <div className="mb-4 flex justify-center gap-6 font-medium">
          <a href="#" className="hover:text-indigo-600">Privacy</a>
          <a href="#" className="hover:text-indigo-600">Terms</a>
          <a href="#" className="hover:text-indigo-600">Contact</a>
        </div>
        <p>© 2024 FluxFlow Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}