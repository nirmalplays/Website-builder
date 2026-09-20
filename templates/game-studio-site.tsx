import React, { useState } from 'react';
import { Play, Star, ArrowRight, Zap, Shield, Users, Mail, ChevronRight, TrendingUp, Calendar, Package } from 'lucide-react';

export default function App() {
  const games = [
    { title: "Aetheria: Void Born", year: "2024", platforms: ["PC", "PS5"], img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" },
    { title: "Neon Syndicate", year: "2023", platforms: ["PC", "Xbox"], img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" },
    { title: "Iron Vanguard", year: "2022", platforms: ["PC"], img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800" },
    { title: "Echoes of Solstice", year: "2021", platforms: ["PC", "PS5", "Switch"], img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800" },
    { title: "Quantum Drift", year: "2020", platforms: ["PC"], img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800" },
    { title: "Titan Protocol", year: "2019", platforms: ["PC", "Xbox"], img: "https://images.unsplash.com/photo-1593341643962-f7b5a6c3e35b?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Nav */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter text-indigo-400">VOID.STUDIOS</div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#games" className="hover:text-white transition">Games</a>
            <a href="#about" className="hover:text-white transition">Studio</a>
            <a href="#press" className="hover:text-white transition">Press</a>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-full text-sm font-semibold transition">
            Join Discord
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">Now in Development</span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-none">AETHERIA:<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">VOID BORN</span></h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-10">Ascend through the shattered dimensions of the Aether. An open-world ARPG where every choice reshapes the fabric of reality.</p>
          <button className="inline-flex items-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition">
            <Play size={20} fill="currentColor" /> Watch Trailer
          </button>
        </div>
      </header>

      {/* Games Grid */}
      <section id="games" className="py-24 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Our Library</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-slate-800">
                  <img src={game.img} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <ArrowRight className="text-white" size={48} />
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{game.title}</h3>
                    <p className="text-slate-500 text-sm">{game.year}</p>
                  </div>
                  <div className="flex gap-2">
                    {game.platforms.map(p => (
                      <span key={p} className="text-[10px] uppercase font-bold text-indigo-400 border border-indigo-400/30 px-2 py-1 rounded">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Next-Gen Mechanics</h2>
            <div className="space-y-8">
              {[
                { icon: Zap, title: "Dynamic Flow Combat", desc: "Adaptive AI that learns your playstyle in real-time." },
                { icon: Shield, title: "Persistent World Impact", desc: "Your choices leave permanent scars on the game world map." },
                { icon: TrendingUp, title: "Procedural Narrative", desc: "Over 500 hours of unique branching questlines." }
              ].map((feat, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <feat.icon />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">{feat.title}</h4>
                    <p className="text-slate-400">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
            <img src="https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=1200" alt="Gameplay" className="rounded-2xl w-full" />
          </div>
        </div>
      </section>

      {/* Newsletter / Wishlist */}
      <section className="py-24 px-6 bg-gradient-to-b from-indigo-950/20 to-slate-950">
        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 p-12 rounded-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-slate-400 mb-8">Join 50,000+ players tracking development. Get exclusive beta access invites and behind-the-scenes content.</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button className="bg-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-500 transition">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-500">© 2024 Void Studios. All rights reserved.</div>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-indigo-400">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400">Terms of Service</a>
            <a href="#" className="hover:text-indigo-400">Press Kit</a>
          </div>
        </div>
      </footer>
    </div>
  );
}