import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, Smartphone, Zap, Shield, BarChart3, Users, Clock, 
  Star, ChevronDown, Plus, Minus, Download, Mail, ArrowRight, ShieldCheck,
  TrendingUp, Package
} from 'lucide-react';

const INITIAL_REVIEWS = [
  { id: 1, name: "Sarah Jenkins", role: "Product Manager", text: "This app streamlined my entire workflow. Absolutely essential for remote teams.", rating: 5 },
  { id: 2, name: "Marcus Thorne", role: "Freelance Designer", text: "The UI is incredibly intuitive. I saved hours of manual entry in my first week.", rating: 5 },
  { id: 3, name: "Elena Rodriguez", role: "Startup Founder", text: "Solid performance and great support. Highly recommend for scaling businesses.", rating: 4 },
];

const FAQ_DATA = [
  { q: "Is there a free trial?", a: "Yes, our starter tier is free forever with no credit card required." },
  { q: "Can I cancel anytime?", a: "Absolutely. You can cancel your subscription from your account settings at any time." },
  { q: "Is my data secure?", a: "We use bank-grade 256-bit encryption to ensure your data stays private and secure." },
];

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [reviews] = useState(INITIAL_REVIEWS);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-2xl text-blue-600">
          <Zap /> FlowState
        </div>
        <button className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition-colors">
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Master your productivity with <span className="text-blue-600">FlowState</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            The all-in-one workspace designed for modern teams to collaborate, track progress, and hit deadlines without the clutter.
          </p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
              <Download size={20} /> Download App
            </button>
          </div>
        </div>
        <div className="bg-slate-200 rounded-3xl h-[400px] flex items-center justify-center relative shadow-2xl border-4 border-white">
          <Smartphone size={120} className="text-blue-400" />
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
            <p className="font-bold">4.9/5 Rating</p>
            <div className="flex text-yellow-400"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            { icon: <ShieldCheck />, title: "Secure Data", desc: "Enterprise-grade security for your peace of mind." },
            { icon: <TrendingUp />, title: "Analytics", desc: "Deep insights into your team's performance." },
            { icon: <Users />, title: "Collaboration", desc: "Real-time editing and team communication." },
            { icon: <Clock />, title: "Time Tracking", desc: "Automated logs for every project task." },
            { icon: <Package />, title: "Resource Mgmt", desc: "Organize assets in a centralized library." },
            { icon: <Zap />, title: "Instant Sync", desc: "Your progress follows you everywhere." }
          ].map((f, i) => (
            <div key={i} className="p-6 border border-slate-100 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="text-blue-600 mb-4">{f.icon}</div>
              <h3 className="font-bold text-xl mb-2">{f.title}</h3>
              <p className="text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Loved by professionals</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map(r => (
            <div key={r.id} className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(r.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-slate-700 italic mb-6">"{r.text}"</p>
              <p className="font-bold">{r.name}</p>
              <p className="text-sm text-slate-500">{r.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          {FAQ_DATA.map((item, idx) => (
            <div key={idx} className="border-b border-slate-700">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center py-6 text-left"
              >
                <span className="font-semibold">{item.q}</span>
                {activeFaq === idx ? <Minus size={20} /> : <Plus size={20} />}
              </button>
              {activeFaq === idx && <p className="pb-6 text-slate-400">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to boost your workflow?</h2>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300"
            />
            <button 
              disabled={status === 'loading'}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Joined!' : 'Join Waitlist'}
            </button>
          </form>
          {status === 'success' && <p className="mt-4 text-green-600 font-medium">Thank you for joining our community!</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 text-center text-slate-500">
        <p>&copy; 2024 FlowState Technologies. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <button className="hover:text-blue-600">Privacy</button>
          <button className="hover:text-blue-600">Terms</button>
          <button className="hover:text-blue-600">Support</button>
        </div>
      </footer>
    </div>
  );
}