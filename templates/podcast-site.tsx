import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Clock, 
  Calendar, 
  Search, 
  Menu, 
  Star, 
  Mail, 
  CheckCircle, 
  X, 
  ChevronRight, 
  User, 
  Users, 
  Zap, 
  ArrowRight 
} from 'lucide-react';

const INITIAL_EPISODES = [
  { id: 1, title: "The Future of Artificial Intelligence", duration: "45:20", date: "Oct 24, 2023", guest: "Dr. Aris Thorne" },
  { id: 2, title: "Building Sustainable Cities", duration: "52:10", date: "Oct 17, 2023", guest: "Sarah Jenkins" },
  { id: 3, title: "Quantum Computing Explained", duration: "38:45", date: "Oct 10, 2023", guest: "Marcus Vane" },
  { id: 4, title: "The Psychology of Habits", duration: "41:30", date: "Oct 03, 2023", guest: "Dr. Elena Rossi" },
  { id: 5, title: "Space Exploration in 2024", duration: "55:00", date: "Sep 26, 2023", guest: "Commander Leo Hunt" },
  { id: 6, title: "Economics of the Digital Age", duration: "48:15", date: "Sep 19, 2023", guest: "Julian Banks" },
  { id: 7, title: "Music Theory for Coders", duration: "35:50", date: "Sep 12, 2023", guest: "Mia Chen" },
  { id: 8, title: "The History of Cryptography", duration: "50:20", date: "Sep 05, 2023", guest: "Prof. Alan Turing Jr." },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [episodes] = useState(INITIAL_EPISODES);

  const handleNewsletter = (e: React.FormEvent) => {
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
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter text-indigo-700">TECH HORIZON</div>
          <div className="hidden md:flex space-x-8 font-medium">
            {['Episodes', 'Hosts', 'Reviews', 'Contact'].map(item => (
              <button key={item} className="hover:text-indigo-600 transition-colors">{item}</button>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-20 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-stone-900">
          Exploring the <span className="text-indigo-600">Frontiers</span> of Innovation.
        </h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-10">
          Weekly deep dives into technology, culture, and the people building our tomorrow. Join 50,000+ curious minds.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-700 transition flex items-center gap-2">
            <Play size={20} fill="currentColor" /> Subscribe on Spotify
          </button>
          <button className="border border-stone-300 px-8 py-4 rounded-full font-semibold hover:bg-stone-100 transition">
            Apple Podcasts
          </button>
        </div>
      </header>

      {/* Featured Episode */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Latest Episode</h2>
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 aspect-square bg-indigo-100 rounded-2xl flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" alt="Featured" className="w-full h-full object-cover rounded-2xl" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-indigo-600 font-bold mb-2">EPISODE #001</span>
            <h3 className="text-4xl font-bold mb-4">The AI Revolution: What's Next?</h3>
            <p className="text-stone-600 mb-6 leading-relaxed">Join us as we talk to Dr. Aris Thorne about the ethical implications of AGI and how to navigate the rapid pace of development in silicon valley.</p>
            <div className="flex items-center gap-4 text-stone-500 mb-8">
              <span className="flex items-center gap-1"><Clock size={18} /> 45:20</span>
              <span className="flex items-center gap-1"><Calendar size={18} /> Oct 24, 2023</span>
            </div>
            <button className="bg-stone-900 text-white py-3 rounded-xl w-full md:w-48 font-semibold hover:bg-stone-800 transition">Play Now</button>
          </div>
        </div>
      </section>

      {/* Episode List */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold">Past Episodes</h2>
          <button className="text-indigo-600 font-semibold flex items-center gap-1">View All <ArrowRight size={18} /></button>
        </div>
        <div className="grid gap-4">
          {episodes.map((ep) => (
            <div key={ep.id} className="bg-white p-6 rounded-2xl border border-stone-200 flex items-center justify-between hover:border-indigo-200 transition">
              <div className="flex items-center gap-6">
                <span className="text-2xl font-bold text-stone-300 w-8">0{ep.id}</span>
                <div>
                  <h4 className="font-bold text-lg">{ep.title}</h4>
                  <p className="text-sm text-stone-500">Guest: {ep.guest}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-stone-500">
                <span className="hidden md:block">{ep.date}</span>
                <span className="hidden md:block font-mono">{ep.duration}</span>
                <button className="p-3 bg-stone-100 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition"><Play size={18} fill="currentColor" /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-indigo-900 text-white mt-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Episode</h2>
          <p className="mb-8 opacity-80">Get exclusive show notes and guest deep-dives delivered to your inbox every Thursday.</p>
          {status === 'success' ? (
            <div className="bg-white/10 p-4 rounded-xl flex items-center justify-center gap-2 text-emerald-400">
              <CheckCircle size={20} /> Thanks for subscribing!
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-full text-stone-900 outline-none"
                required
              />
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold hover:bg-stone-100 transition disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-12 text-center text-stone-500 text-sm">
        <p>&copy; 2023 Tech Horizon Podcast. All rights reserved.</p>
      </footer>
    </div>
  );
}