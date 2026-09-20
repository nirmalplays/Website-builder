import React from 'react';
import { 
  Smartphone, Zap, Shield, BarChart3, Clock, Users, 
  Check, Star, ChevronDown, Download, ArrowRight, Sparkles 
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-xl text-white">
            <Zap size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">Flowstate</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
        </div>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all">
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <header className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter mb-6">
            Master your day with <span className="text-indigo-600">Flowstate</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            The intelligent productivity assistant that helps you prioritize tasks, eliminate distractions, and reclaim your time for what really matters.
          </p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700">
              <Download size={20} /> App Store
            </button>
            <button className="flex items-center gap-2 bg-slate-100 text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200">
              <Download size={20} /> Google Play
            </button>
          </div>
        </div>
        <div className="relative bg-slate-100 rounded-3xl h-[500px] flex items-center justify-center border-4 border-slate-200 overflow-hidden shadow-inner">
          <div className="text-slate-400 font-medium">Phone Interface Placeholder</div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="bg-slate-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Everything you need to focus</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Smart Scheduling", desc: "AI-driven task arrangement based on your energy levels." },
              { icon: Shield, title: "Focus Shield", desc: "Block distracting notifications during your deep work sessions." },
              { icon: BarChart3, title: "Performance Insights", desc: "Detailed weekly reports on your productivity trends." },
              { icon: Clock, title: "Time Boxing", desc: "Dedicated slots for every task to ensure you stay on track." },
              { icon: Users, title: "Team Sync", desc: "Collaborate seamlessly with your team without the clutter." },
              { icon: Smartphone, title: "Cross-Device", desc: "Sync your workflow perfectly across all your devices." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <f.icon className="text-indigo-600 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Walkthrough */}
      <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Simple as 1, 2, 3</h2>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {['Define your goals', 'AI optimizes your day', 'Track your progress'].map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mb-6">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step}</h3>
              <p className="text-slate-600 text-sm">Experience a seamless transition from planning to execution.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Loved by thousands</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Jenkins", role: "Product Designer", quote: "Flowstate transformed my chaotic daily routine into a streamlined machine." },
              { name: "Marcus Chen", role: "Software Engineer", quote: "The focus shield feature is a total game changer for my coding sessions." },
              { name: "Elena Rodriguez", role: "Marketing Manager", quote: "Finally, an app that understands that work-life balance is essential." }
            ].map((r, i) => (
              <div key={i} className="bg-slate-800 p-8 rounded-2xl">
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="mb-6 text-slate-300 italic">"{r.quote}"</p>
                <div className="font-semibold">{r.name}</div>
                <div className="text-sm text-slate-500">{r.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Get started for free</h2>
        <p className="text-slate-600 mb-12">Enjoy the core features of Flowstate at no cost. Upgrade anytime for advanced analytics and team features.</p>
        <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-3xl inline-block w-full">
          <div className="text-4xl font-bold text-indigo-600 mb-4">$0 <span className="text-lg text-slate-500 font-normal">/ month</span></div>
          <ul className="text-left space-y-4 mb-8 inline-block">
            {['Basic task management', 'Daily focus reports', 'Cross-device sync', 'Standard support'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700">
                <Check size={20} className="text-green-500" /> {item}
              </li>
            ))}
          </ul>
          <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700">Download Now</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
        <p>&copy; 2024 Flowstate Technologies Inc. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Support</span>
        </div>
      </footer>
    </div>
  );
}