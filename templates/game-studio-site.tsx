import React, { useState, useEffect } from 'react';
import { 
  Play, Star, Calendar, Users, Mail, ArrowRight, X, 
  CheckCircle, Plus, Heart, Zap, Shield, TrendingUp,
  Package, ChevronDown, Monitor, Smartphone, Gamepad2
} from 'lucide-react';

const INITIAL_GAMES = [
  { id: 1, title: "Aether Chronicles", platform: "PC/PS5", year: "2024", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800", featured: true },
  { id: 2, title: "Neon Velocity", platform: "PC/Xbox", year: "2023", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800", featured: false },
  { id: 3, title: "Shadow Tactics", platform: "Mobile", year: "2022", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800", featured: false },
  { id: 4, title: "Orbital Drift", platform: "PC", year: "2021", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800", featured: false },
  { id: 5, title: "Deep Sea Scavenger", platform: "PC/Switch", year: "2020", img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800", featured: false },
  { id: 6, title: "Cyber Siege", platform: "PC", year: "2019", img: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=800", featured: false },
];

export default function App() {
  const [games, setGames] = useState(() => {
    try { return JSON.parse(localStorage.getItem('games') || 'null') || INITIAL_GAMES; }
    catch { return INITIAL_GAMES; }
  });
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    localStorage.setItem('games', JSON.stringify(games));
  }, [games]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes('@')) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter text-indigo-400">NEBULA<span className="text-white">STUDIOS</span></div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            {['Games', 'Studio', 'Careers', 'Support'].map(item => (
              <button key={item} className="hover:text-white transition-colors">{item}</button>
            ))}
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-full text-sm font-semibold transition-all">Join Discord</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-indigo-400 font-semibold tracking-wide uppercase text-sm">Now Available</span>
            <h1 className="text-6xl md:text-8xl font-black mt-4 mb-6 leading-[0.9]">AETHER<br/>CHRONICLES</h1>
            <p className="text-slate-400 text-lg mb-8 max-w-md">Embark on a sprawling interstellar odyssey. Master gravity-defying combat and uncover the secrets of the lost nebula.</p>
            <div className="flex gap-4">
              <button onClick={() => setShowTrailer(true)} className="flex items-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-all">
                <Play size={20} fill="currentColor" /> Watch Trailer
              </button>
              <button className="px-8 py-4 border border-slate-700 rounded-full font-bold hover:bg-slate-900 transition-all">Buy Now</button>
            </div>
          </div>
          <div className="relative h-96 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/20">
            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200" alt="Game" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-bold">Our Library</h2>
          <button className="text-indigo-400 flex items-center gap-2">View All <ArrowRight size={16} /></button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {games.map(game => (
            <div key={game.id} className="group bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all">
              <div className="h-48 overflow-hidden">
                <img src={game.img} alt={game.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{game.title}</h3>
                    <p className="text-slate-500 text-sm">{game.platform} • {game.year}</p>
                  </div>
                  <button onClick={() => toggleWishlist(game.id)} className={`p-2 rounded-full ${wishlist.includes(game.id) ? 'text-indigo-400' : 'text-slate-600'}`}>
                    <Heart size={20} fill={wishlist.includes(game.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <button className="w-full py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 bg-slate-900 border-y border-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Stay in the Loop</h3>
          <p className="text-slate-400 mb-8">Get exclusive updates on game development, patch notes, and studio news directly in your inbox.</p>
          <form onSubmit={handleNewsletter} className="flex gap-2 bg-slate-950 p-2 rounded-full border border-slate-800">
            <input 
              type="email" 
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email" 
              className="flex-1 bg-transparent px-4 outline-none text-white"
              required
            />
            <button 
              disabled={status === 'loading'}
              className="bg-indigo-600 px-6 py-3 rounded-full font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all"
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
          {status === 'success' && <p className="mt-4 text-emerald-400 flex items-center justify-center gap-2"><CheckCircle size={16}/> Thank you for joining!</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 max-w-7xl mx-auto text-slate-600 text-sm">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold text-slate-400 mb-4">NEBULA</div>
            <p>© 2024 Nebula Studios Inc.</p>
          </div>
          {['Company', 'Resources', 'Legal'].map(section => (
            <div key={section}>
              <h4 className="font-bold text-slate-300 mb-4">{section}</h4>
              <ul className="space-y-2">
                {['About', 'Press', 'Jobs', 'Privacy'].map(link => <li key={link}><button className="hover:text-indigo-400">{link}</button></li>)}
              </ul>
            </div>
          ))}
        </div>
      </footer>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6">
          <div className="max-w-4xl w-full bg-slate-900 rounded-2xl p-4 relative">
            <button onClick={() => setShowTrailer(false)} className="absolute -top-12 right-0 text-white"><X /></button>
            <div className="aspect-video bg-black flex items-center justify-center text-slate-600">
              <div className="text-center">
                <Play size={64} className="mx-auto mb-4 opacity-50" />
                <p>Simulated Trailer Player</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}