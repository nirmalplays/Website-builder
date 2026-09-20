import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, Ticket, Users, Zap, Shield, ChevronDown, 
  ChevronRight, Star, Mail, CheckCircle, X, Plus, Minus 
} from 'lucide-react';

const INITIAL_SPEAKERS = [
  { id: 1, name: "Dr. Elena Vance", role: "AI Ethics Lead", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" },
  { id: 2, name: "Marcus Thorne", role: "Cloud Architect", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
  { id: 3, name: "Sarah Jenkins", role: "UX Strategist", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop" },
  { id: 4, name: "David Chen", role: "DevOps Engineer", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" },
  { id: 5, name: "Amara Okafor", role: "Data Science Lead", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop" },
  { id: 6, name: "James Wilson", role: "Cybersecurity Expert", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" },
  { id: 7, name: "Priya Sharma", role: "Product Manager", img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop" },
  { id: 8, name: "Thomas Wright", role: "Systems Engineer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('General');
  const [ticketCount, setTicketCount] = useState(1);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-indigo-600 flex items-center gap-2">
          <Zap /> TECHCON 2024
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-colors">
          Get Tickets
        </button>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-20 px-6 text-center bg-slate-50">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">Innovation Unleashed</h1>
        <div className="flex flex-wrap justify-center gap-6 text-slate-600 mb-10">
          <span className="flex items-center gap-2"><Calendar className="w-5 h-5" /> October 14-16, 2024</span>
          <span className="flex items-center gap-2"><MapPin className="w-5 h-5" /> San Francisco, CA</span>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 inline-block">
          <p className="text-sm uppercase tracking-widest text-slate-500 mb-4">Countdown to Launch</p>
          <div className="flex gap-8 text-3xl font-mono font-bold">
            <div>42 <span className="text-sm block font-sans text-slate-400">Days</span></div>
            <div>08 <span className="text-sm block font-sans text-slate-400">Hours</span></div>
            <div>34 <span className="text-sm block font-sans text-slate-400">Mins</span></div>
          </div>
        </div>
      </header>

      {/* Speakers */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Industry Experts</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {INITIAL_SPEAKERS.map((s) => (
            <div key={s.id} className="group cursor-pointer">
              <img src={s.img} alt={s.name} className="w-full aspect-square object-cover rounded-2xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500" />
              <h3 className="font-bold text-lg">{s.name}</h3>
              <p className="text-indigo-600 text-sm">{s.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agenda */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Conference Agenda</h2>
          <div className="flex justify-center gap-4 mb-8">
            {['General', 'Workshops', 'Networking'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full ${activeTab === tab ? 'bg-indigo-600' : 'bg-slate-800'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {[9, 11, 14].map(time => (
              <div key={time} className="grid grid-cols-[100px,1fr] gap-4 p-6 bg-slate-800 rounded-xl items-center">
                <div className="text-indigo-400 font-bold">{time}:00 AM</div>
                <div>
                  <h4 className="font-bold text-lg">Keynote: Future of {activeTab}</h4>
                  <p className="text-slate-400">Deep dive into industry trends and scalable architectures.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tickets */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Select Your Pass</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-2 border-indigo-600 p-8 rounded-3xl relative">
            <h3 className="text-2xl font-bold mb-2">Pro Pass</h3>
            <div className="text-4xl font-bold mb-6">$599</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-600" /> All sessions</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-600" /> Networking lunch</li>
            </ul>
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setTicketCount(Math.max(1, ticketCount-1))} className="p-2 border rounded"><Minus size={16}/></button>
              <span className="font-bold">{ticketCount}</span>
              <button onClick={() => setTicketCount(ticketCount + 1)} className="p-2 border rounded"><Plus size={16}/></button>
            </div>
            <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">Buy Now</button>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-2">Student Pass</h3>
            <div className="text-4xl font-bold mb-6">$199</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-slate-500"><Shield className="w-5 h-5" /> All sessions</li>
              <li className="flex items-center gap-2 text-slate-500"><Shield className="w-5 h-5" /> Digital materials only</li>
            </ul>
            <button className="w-full py-3 border-2 border-slate-300 rounded-xl font-bold hover:border-slate-900">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Common Questions</h2>
          {[
            { q: "Is lunch included?", a: "Yes, all full-day passes include a fully catered lunch." },
            { q: "Can I get a refund?", a: "Refunds are available up to 14 days before the event." }
          ].map((item, i) => (
            <div key={i} className="mb-4 bg-white rounded-xl border border-slate-200">
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full p-6 flex justify-between items-center font-bold">
                {item.q} <ChevronDown className={faqOpen === i ? 'rotate-180' : ''} />
              </button>
              {faqOpen === i && <div className="px-6 pb-6 text-slate-600">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-slate-500 text-sm">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email for updates" 
              className="flex-1 px-4 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-lg">Subscribe</button>
          </div>
          {submitted && <p className="text-green-600 mt-2 text-xs">Thanks for subscribing!</p>}
        </form>
        <p>&copy; 2024 TechCon International. All rights reserved.</p>
      </footer>
    </div>
  );
}