import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3, 
  DollarSign, 
  CreditCard, 
  ChevronDown, 
  ChevronRight,
  Lock,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';

const assets = [
  { name: 'Bitcoin', symbol: 'BTC', price: '$64,231.42', change: '+2.4%', volume: '$32.4B' },
  { name: 'Ethereum', symbol: 'ETH', price: '$3,452.18', change: '+1.8%', volume: '$15.2B' },
  { name: 'Solana', symbol: 'SOL', price: '$145.67', change: '-0.5%', volume: '$4.1B' },
  { name: 'Chainlink', symbol: 'LINK', price: '$18.23', change: '+4.2%', volume: '$890M' },
  { name: 'Cardano', symbol: 'ADA', price: '$0.45', change: '-1.2%', volume: '$520M' },
  { name: 'Polkadot', symbol: 'DOT', price: '$7.12', change: '+0.9%', volume: '$340M' },
  { name: 'Polygon', symbol: 'MATIC', price: '$0.92', change: '+1.5%', volume: '$280M' },
  { name: 'Avalanche', symbol: 'AVAX', price: '$48.34', change: '-2.1%', volume: '$710M' },
];

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">ApexExchange</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#markets" className="text-sm font-medium text-slate-600 hover:text-blue-600">Markets</a>
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600">Features</a>
            <a href="#security" className="text-sm font-medium text-slate-600 hover:text-blue-600">Security</a>
            <button className="text-sm font-medium text-slate-900">Sign In</button>
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition">Get Started</button>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <header className="py-20 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">Trade with Confidence.<br />Scale your Assets.</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">The professional-grade platform for crypto traders. Low fees, deep liquidity, and institutional-grade security.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700">Create Account</button>
          <button className="bg-white border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50">View Markets</button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          {[
            { name: 'BTC/USD', price: '$64,231', trend: '+2.4%' },
            { name: 'ETH/USD', price: '$3,452', trend: '+1.8%' },
            { name: 'SOL/USD', price: '$145.67', trend: '-0.5%' },
            { name: 'LINK/USD', price: '$18.23', trend: '+4.2%' }
          ].map((coin) => (
            <div key={coin.name} className="text-left">
              <p className="text-xs text-slate-400 font-semibold uppercase">{coin.name}</p>
              <div className="flex items-center gap-2">
                <span className="font-bold">{coin.price}</span>
                <span className={`text-xs ${coin.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{coin.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </header>

      <section id="markets" className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Market Overview</h2>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Asset</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">24h Change</th>
                <th className="px-6 py-4">24h Volume</th>
                <th className="px-6 py-4">Trade</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.symbol} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-semibold">{asset.name} <span className="text-slate-400">{asset.symbol}</span></td>
                  <td className="px-6 py-4">{asset.price}</td>
                  <td className={`px-6 py-4 ${asset.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{asset.change}</td>
                  <td className="px-6 py-4">{asset.volume}</td>
                  <td className="px-6 py-4"><button className="text-blue-600 font-semibold flex items-center gap-1">Trade <ArrowUpRight className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            { icon: BarChart3, title: 'Advanced Charts', desc: 'Real-time data with over 100+ technical indicators for precise trading.' },
            { icon: Zap, title: 'Lightning Execution', desc: 'Our matching engine processes 1.5M orders per second with minimal latency.' },
            { icon: DollarSign, title: 'Competitive Fees', desc: 'Tiered fee structure starting as low as 0.05% for high-volume traders.' }
          ].map((f, i) => (
            <div key={i} className="p-8 border border-slate-100 rounded-2xl hover:shadow-lg transition">
              <f.icon className="w-10 h-10 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="security" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="bg-slate-900 text-white rounded-3xl p-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">Institutional Grade Security</h2>
            <p className="text-slate-400 mb-8 text-lg">We store 98% of all digital assets in cold storage, insured by top-tier global underwriters. Your peace of mind is our priority.</p>
            <ul className="space-y-4">
              {['Multi-signature wallets', 'SOC 2 Type II Compliance', '24/7 Threat Monitoring'].map((item, i) => (
                <li key={i} className="flex items-center gap-3"><CheckCircle className="text-blue-500" /> {item}</li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3 h-64 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700">
            <Lock className="w-20 h-20 text-blue-500" />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            { q: 'How do I deposit funds?', a: 'You can deposit via bank transfer, credit card, or SEPA transfer depending on your region.' },
            { q: 'Is there a minimum deposit?', a: 'The minimum initial deposit is just $10 USD equivalent.' },
            { q: 'Which countries are supported?', a: 'We currently support over 120 countries, including the US, UK, Canada, and EU member states.' }
          ].map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-6 text-left hover:border-blue-300 transition">
              <div className="flex justify-between items-center cursor-pointer">
                <h4 className="font-bold">{faq.q}</h4>
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-slate-100 py-16 px-4 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-blue-600 w-5 h-5" />
              <span className="font-bold">ApexExchange</span>
            </div>
            <p className="text-sm text-slate-500">The world's fastest crypto exchange for professional traders.</p>
          </div>
          {['Products', 'Company', 'Support'].map((col) => (
            <div key={col}>
              <h4 className="font-bold mb-4">{col}</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Spot Trading</li>
                <li>Futures</li>
                <li>Staking</li>
                <li>API Docs</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 text-xs text-slate-400">
          <p className="mb-4">Disclaimer: Trading digital assets involves significant risk and can result in the loss of your invested capital. ApexExchange is not a bank. Digital assets are not subject to standard deposit insurance. Please consult with a financial advisor.</p>
          <p>&copy; 2024 Apex Exchange Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}