import React, { useState } from 'react';
import { Play, Calendar, MapPin, ShoppingCart, Mail, ChevronRight, Zap, Star, Music } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('tour');

  const tourDates = [
    { city: 'London', venue: 'O2 Academy', date: 'Oct 24, 2024', status: 'Sold Out' },
    { city: 'Berlin', venue: 'Huxleys Neue Welt', date: 'Nov 02, 2024', status: 'Tickets' },
    { city: 'Paris', venue: 'Le Trianon', date: 'Nov 05, 2024', status: 'Tickets' },
    { city: 'Amsterdam', venue: 'Paradiso', date: 'Nov 08, 2024', status: 'Low Stock' },
  ];

  const albums = [
    { title: 'Neon Echoes', year: '2024', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400' },
    { title: 'Midnight Static', year: '2022', cover: 'https://images.unsplash.com/photo-1558005540-84524458316c?auto=format&fit=crop&q=80&w=400' },
    { title: 'Velvet Horizon', year: '2020', cover: 'https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&q=80&w=400' },
  ];

  const tracks = ['Electric Pulse', 'Neon Dreams', 'Static Heart', 'Midnight Run', 'Echo Chamber'];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <span className="text-2xl font-bold tracking-tighter text-indigo-500">SYNTHWAVE COLLECTIVE</span>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
          {['Tour', 'Music', 'Merch', 'About'].map((item) => (
            <a key={item} href="#" className="hover:text-indigo-400 transition-colors">{item}</a>
          ))}
        </div>
      </nav>

      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Band performance"
        />
        <div className="relative z-10 text-center px-4">
          <div className="inline-block bg-indigo-600 px-4 py-1 mb-4 text-xs font-bold uppercase tracking-widest rounded-full">New Album Out Now</div>
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter">NEON ECHOES</h1>
          <button className="bg-white text-neutral-950 px-8 py-3 rounded-full font-bold hover:bg-indigo-500 hover:text-white transition-all">Listen Now</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3"><Calendar className="text-indigo-500" /> Upcoming Tour Dates</h2>
          <div className="space-y-4">
            {tourDates.map((show, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 bg-neutral-900 rounded-2xl hover:border-indigo-900 border border-transparent transition-all">
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className="text-center w-20">
                    <span className="block text-indigo-400 font-bold">NOV</span>
                    <span className="text-2xl font-bold">02</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{show.city}</h3>
                    <p className="text-neutral-400">{show.venue}</p>
                  </div>
                </div>
                <button className={`px-6 py-2 rounded-full text-sm font-bold ${show.status === 'Sold Out' ? 'bg-neutral-800 text-neutral-500' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}>
                  {show.status}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-3xl font-bold mb-10">Discography</h2>
            <div className="grid grid-cols-2 gap-4">
              {albums.map((a, i) => (
                <div key={i} className="group cursor-pointer">
                  <img src={a.cover} alt={a.title} className="rounded-xl mb-3 aspect-square object-cover group-hover:scale-105 transition-transform" />
                  <h3 className="font-bold">{a.title}</h3>
                  <p className="text-sm text-neutral-500">{a.year}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-neutral-900 p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Music className="text-indigo-500" /> Player</h3>
            <div className="space-y-4">
              {tracks.map((track, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-neutral-800 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-4">
                    <button className="w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full"><Play size={14} fill="white" /></button>
                    <span>{track}</span>
                  </div>
                  <span className="text-neutral-500 text-sm">3:45</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-10">Official Merch</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4].map((item) => (
              <div key={item} className="bg-neutral-900 rounded-2xl p-4">
                <div className="bg-neutral-800 aspect-square rounded-xl mb-4 flex items-center justify-center text-neutral-600">Image</div>
                <h4 className="font-bold">Tour Hoodie Vol. 1</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-indigo-400">$65.00</span>
                  <ShoppingCart size={20} className="cursor-pointer hover:text-indigo-400" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-indigo-900/20 border border-indigo-900/50 p-12 rounded-3xl text-center">
          <Mail className="mx-auto mb-6 text-indigo-500" size={40} />
          <h2 className="text-3xl font-bold mb-4">Join the Inner Circle</h2>
          <p className="text-neutral-400 mb-8 max-w-md mx-auto">Get exclusive updates on new music, secret shows, and limited edition merch drops.</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 bg-neutral-950 px-4 py-3 rounded-full border border-neutral-800 focus:outline-none focus:border-indigo-500" />
            <button className="bg-indigo-600 px-6 py-3 rounded-full font-bold hover:bg-indigo-500">Subscribe</button>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-900 py-12 text-center text-neutral-600 text-sm">
        <p>© 2024 Synthwave Collective. All rights reserved.</p>
        <div className="flex gap-6 justify-center mt-4">
          <a href="#" className="hover:text-indigo-400">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-400">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}