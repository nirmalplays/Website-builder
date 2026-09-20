import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, ArrowDownRight, TrendingUp, Shield, Zap, 
  Lock, BarChart3, ChevronDown, CheckCircle, XCircle,
  Menu, X, DollarSign, Users, Clock, Globe
} from 'lucide-react';

const INITIAL_ASSETS = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 64230.50, change: 2.4, volume: '28.4B' },
  { id: 2, name: 'Ethereum', symbol: 'ETH', price: 3450.20, change: -1.2, volume: '12.1B' },
  { id: 3, name: 'Solana', symbol: 'SOL', price: 145.80, change: 5.7, volume: '3.2B' },
  { id: 4, name: 'Cardano', symbol: 'ADA', price: 0.45, change: -0.5, volume: '800M' },
  { id: 5, name: 'Polkadot', symbol: 'DOT', price: 7.20, change: 1.1, volume: '450M' },
  { id: 6, name: 'Chainlink', symbol: 'LINK', price: 18.40, change: 3.2, volume: '600M' },
  { id: 7, name: 'Avalanche', symbol: 'AVAX', price: 35.60, change: -2.1, volume: '950M' },
  { id: 8, name: 'Ripple', symbol: 'XRP', price: 0.62, change: 0.8, volume: '1.5B' },
];

export default function App() {
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const filteredAssets = assets.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setEmail('');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <Zap className="fill-blue-600" /> NexusExchange
          </div>
          <div className="hidden md:flex gap-8 font-medium text-slate-600">
            {['Markets', 'Security', 'Features', 'Fees'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition-colors">{item}</a>
            ))}
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all">
            Get Started
          </button>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero & Ticker */}
      <header className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-950 mb-6 tracking-tight">Trade Crypto with <br/><span className="text-blue-600">Confidence</span></h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">The most secure and transparent platform for buying, selling, and managing your digital assets.</p>
          <div className="flex gap-4 justify-center">
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-6 py-3 rounded-full border border-slate-300 w-full max-w-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button onClick={handleSignup} disabled={formStatus === 'loading'} className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 transition-colors">
              {formStatus === 'loading' ? 'Processing...' : 'Join Now'}
            </button>
          </div>
          {formStatus === 'success' && <p className="text-green-600 mt-4">Welcome to the future of finance!</p>}
        </div>
      </header>

      <section className="bg-slate-900 text-white py-4 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex gap-12 animate-pulse text-sm">
          {assets.slice(0, 4).map(a => (
            <div key={a.id} className="flex gap-2">
              <span className="font-bold">{a.symbol}</span>
              <span>${a.price.toLocaleString()}</span>
              <span className={a.change > 0 ? 'text-green-400' : 'text-red-400'}>{a.change}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* Market Table */}
      <section id="markets" className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold">Market Overview</h2>
          <input 
            placeholder="Search assets..." 
            className="px-4 py-2 border rounded-lg"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-4">Asset</th>
                <th className="p-4">Price</th>
                <th className="p-4">24h Change</th>
                <th className="p-4">Volume</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map(a => (
                <tr key={a.id} className="border-b hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold">{a.name} <span className="text-slate-400 font-normal">{a.symbol}</span></td>
                  <td className="p-4">${a.price.toLocaleString()}</td>
                  <td className={`p-4 flex items-center ${a.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {a.change > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {Math.abs(a.change)}%
                  </td>
                  <td className="p-4">{a.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: 'Institutional Security', desc: 'Bank-grade cold storage for 98% of all user funds.' },
            { icon: Zap, title: 'Lightning Fast', desc: 'High-frequency matching engine for instant execution.' },
            { icon: BarChart3, title: 'Pro Analytics', desc: 'Advanced charting and deep liquidity depth charts.' }
          ].map((f, i) => (
            <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <f.icon className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fee Comparison */}
      <section id="fees" className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Industry Leading Fees</h2>
          <div className="grid grid-cols-2 gap-8 text-left">
            <div className="p-6 border border-slate-700 rounded-xl">
              <p className="text-slate-400 mb-2">NexusExchange</p>
              <div className="text-4xl font-bold text-blue-400">0.05%</div>
              <p className="text-sm mt-2">Flat trading fee</p>
            </div>
            <div className="p-6 border border-slate-700 rounded-xl">
              <p className="text-slate-400 mb-2">Traditional Exchanges</p>
              <div className="text-4xl font-bold text-slate-500">0.25%</div>
              <p className="text-sm mt-2">Hidden fees included</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-sm text-slate-500">
          <p className="mb-4">© 2024 NexusExchange. All rights reserved.</p>
          <p className="max-w-3xl">
            Regulatory Disclaimer: Trading digital assets involves significant risk. NexusExchange is not a registered broker-dealer. 
            Past performance is not indicative of future results. Please ensure you are in compliance with your local 
            laws before trading. Crypto assets are highly volatile and can result in the loss of your entire investment.
          </p>
        </div>
      </footer>
    </div>
  );
}