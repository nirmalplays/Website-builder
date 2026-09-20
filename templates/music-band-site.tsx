import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Play, ShoppingCart, Calendar, Mail, 
  ChevronRight, Star, Music, Zap, ArrowUpRight, 
  CheckCircle, Clock, Shield
} from 'lucide-react';

const INITIAL_TOURS = [
  { id: 1, city: 'London', venue: 'The Roundhouse', date: '2024-10-15', status: 'Available' },
  { id: 2, city: 'Berlin', venue: 'Huxleys Neue Welt', date: '2024-10-22', status: 'Sold Out' },
  { id: 3, city: 'Paris', venue: 'Le Bataclan', date: '2024-10-28', status: 'Available' },
  { id: 4, city: 'New York', venue: 'Brooklyn Steel', date: '2024-11-12', status: 'Available' },
];

const ALBUMS = [
  { id: 1, title: 'Neon Shadows', year: 2024, img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=400&q=80' },
  { id: 2, title: 'Midnight Echoes', year: 2022, img: 'https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&w=400&q=80' },
  { id: 3, title: 'Analog Dreams', year: 2020, img: 'https://images.unsplash.com/photo-1514525253101-7299307d0843?auto=format&fit=crop&w=400&q=80' },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [currentTrack, setCurrentTrack] = useState(0);

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

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-indigo-500">
      {/* Nav */}
      <nav className="fixed w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-2xl font-bold tracking-tighter uppercase">Echo Theory</span>
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-neutral-400">
            {['Tour', 'Music', 'Store', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-white transition-colors">{link}</a>
            ))}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden"><Menu /></button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1493225255756-d922e8749171?auto=format&fit=crop&w=2000&q=80" alt="Band" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Zap size={14} /> New Album Out Now
          </div>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 leading-none">Neon Shadows</h1>
          <button className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all">Listen Now</button>
        </div>
      </section>

      {/* Tour */}
      <section id="tour" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 uppercase tracking-tighter">Upcoming Tour</h2>
        <div className="space-y-4">
          {INITIAL_TOURS.map(tour => (
            <div key={tour.id} className="flex flex-col md:flex-row items-center justify-between p-6 bg-neutral-900 border border-white/5 rounded-lg hover:border-indigo-500/50 transition-colors">
              <div className="flex items-center gap-6 mb-4 md:mb-0">
                <div className="text-center p-3 border border-white/10 rounded">
                  <div className="text-xs uppercase text-neutral-400">Oct</div>
                  <div className="text-2xl font-bold">{tour.date.split('-')[2]}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{tour.city}</h3>
                  <p className="text-neutral-400">{tour.venue}</p>
                </div>
              </div>
              <button disabled={tour.status === 'Sold Out'} className={`px-6 py-3 font-bold uppercase tracking-widest ${tour.status === 'Sold Out' ? 'text-neutral-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}>
                {tour.status}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Music Player */}
      <section id="music" className="py-24 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 uppercase tracking-tighter">Discography</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {ALBUMS.map(album => (
              <div key={album.id} className="group cursor-pointer">
                <img src={album.img} alt={album.title} className="w-full aspect-square object-cover rounded-lg mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-bold">{album.title}</h3>
                <p className="text-neutral-500">{album.year}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-black p-8 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">Latest Tracks</h3>
              <div className="flex gap-2">
                <button onClick={() => setCurrentTrack(Math.max(0, currentTrack - 1))} className="p-2 border border-white/20 rounded-full hover:bg-white/10"><ArrowUpRight className="rotate-180" /></button>
                <button onClick={() => setCurrentTrack(Math.min(2, currentTrack + 1))} className="p-2 border border-white/20 rounded-full hover:bg-white/10"><ArrowUpRight /></button>
              </div>
            </div>
            {['Midnight Pulse', 'Echoes of Silence', 'Neon Horizon'].map((track, i) => (
              <div key={track} className={`flex items-center justify-between p-4 rounded-lg ${currentTrack === i ? 'bg-indigo-900/20 text-indigo-400' : 'text-neutral-400'}`}>
                <div className="flex items-center gap-4">
                  <Play size={20} className={currentTrack === i ? 'fill-current' : ''} />
                  <span className="font-medium">{track}</span>
                </div>
                <span className="text-sm">3:{i + 24}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mailing List */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 uppercase tracking-tighter">Join The Inner Circle</h2>
          <p className="text-neutral-400 mb-8">Get exclusive access to pre-sale tickets, merchandise drops, and behind-the-scenes content.</p>
          <form onSubmit={handleSignup} className="relative flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address" 
              className="flex-1 bg-neutral-900 border border-white/10 px-6 py-4 rounded-lg outline-none focus:border-indigo-500"
              required
            />
            <button 
              disabled={status === 'loading'}
              className="bg-indigo-600 px-8 py-4 font-bold uppercase tracking-widest hover:bg-indigo-500 disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : status === 'success' ? <CheckCircle className="mx-auto" /> : 'Subscribe'}
            </button>
          </form>
          {status === 'success' && <p className="mt-4 text-emerald-500">Welcome to the family!</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-neutral-600 text-sm">
        <p className="mb-4 uppercase tracking-widest font-bold text-white">Echo Theory © 2024</p>
        <div className="flex justify-center gap-6">
          {['Instagram', 'Twitter', 'YouTube', 'Spotify'].map(s => <a key={s} href="#" className="hover:text-white transition-colors">{s}</a>)}
        </div>
      </footer>
    </div>
  );
}