import React, { useState } from 'react';
import { 
  Calendar, MapPin, Clock, Users, ArrowRight, Check, X, 
  ChevronDown, Star, Zap, Shield, Mail, Menu 
} from 'lucide-react';

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const speakers = [
    { name: "Dr. Aris Thorne", role: "AI Ethics Lead", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200" },
    { name: "Elena Vance", role: "Cloud Architect", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200" },
    { name: "Marcus Chen", role: "UX Strategist", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200" },
    { name: "Sarah Jenkins", role: "Data Scientist", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200" },
    { name: "David Okafor", role: "Security Expert", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200" },
    { name: "Nina Petrov", role: "DevOps Engineer", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200" },
    { name: "Jameson Lee", role: "Product Visionary", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200" },
    { name: "Sophia Rossi", role: "Founder, TechFlow", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200" },
  ];

  const faqs = [
    { q: "What is included in the VIP ticket?", a: "VIP includes front-row access, an exclusive networking dinner with speakers, and a lifetime recording pass." },
    { q: "Is there a remote attendance option?", a: "Yes, we offer a Virtual Pass that provides live-stream access to all keynote sessions and breakout tracks." },
    { q: "Can I get a refund?", a: "Refunds are available up to 30 days before the conference date, minus a small processing fee." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600 tracking-tight">SYNAPSE 2025</span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-indigo-600">About</a>
            <a href="#speakers" className="hover:text-indigo-600">Speakers</a>
            <a href="#agenda" className="hover:text-indigo-600">Agenda</a>
            <a href="#tickets" className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition">Get Tickets</a>
          </div>
          <Menu className="md:hidden" />
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">Innovating the Future<br/><span className="text-indigo-600">Together.</span></h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 text-slate-600">
          <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-indigo-500" /> October 12–14, 2025</div>
          <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-indigo-500" /> San Francisco, CA</div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-2xl mx-auto inline-block">
          <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">Countdown to Launch</p>
          <div className="flex justify-center gap-8 text-3xl font-bold">
            <div>12<span className="block text-xs font-normal text-slate-500">Days</span></div>
            <div>08<span className="block text-xs font-normal text-slate-500">Hours</span></div>
            <div>45<span className="block text-xs font-normal text-slate-500">Mins</span></div>
          </div>
        </div>
      </header>

      {/* About */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Why Attend Synapse?</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Synapse is the premier annual gathering for the next generation of engineers, designers, and entrepreneurs. 
            We bridge the gap between emerging technology and real-world application, providing a platform to share 
            breakthroughs and solve the most pressing challenges of our digital age.
          </p>
        </div>
      </section>

      {/* Speakers */}
      <section id="speakers" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet the Visionaries</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {speakers.map((s, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition">
                <img src={s.img} alt={s.name} className="w-full aspect-square object-cover rounded-xl mb-4" />
                <h3 className="font-bold text-lg">{s.name}</h3>
                <p className="text-sm text-indigo-600">{s.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tickets */}
      <section id="tickets" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { tier: "General", price: "$499", features: ["Access to all talks", "Networking lounge", "Lunch included"] },
            { tier: "Pro", price: "$899", features: ["Everything in General", "Workshop access", "Priority seating"] },
            { tier: "VIP", price: "$1499", features: ["Everything in Pro", "Speaker dinner", "Lifetime video access"] }
          ].map((t, i) => (
            <div key={i} className={`p-8 rounded-3xl border ${i === 1 ? 'border-indigo-600 shadow-xl' : 'border-slate-200'}`}>
              <h3 className="text-xl font-bold mb-2">{t.tier}</h3>
              <div className="text-4xl font-bold mb-6">{t.price}</div>
              <ul className="space-y-3 mb-8">
                {t.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-slate-600"><Check className="w-4 h-4 text-indigo-500" /> {f}</li>)}
              </ul>
              <button className="w-full py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-indigo-600 transition">Select Plan</button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full justify-between font-bold">
                  {f.q}
                  <ChevronDown className={`transition ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <p className="mt-4 text-slate-600 text-sm leading-relaxed">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400 text-center">
        <p className="mb-4 text-white font-bold">SYNAPSE 2025</p>
        <p className="text-sm">© 2025 Synapse Conference. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-6">
          <Mail className="cursor-pointer hover:text-white" />
          <Star className="cursor-pointer hover:text-white" />
        </div>
      </footer>
    </div>
  );
}