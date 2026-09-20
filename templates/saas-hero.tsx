import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Shield, 
  Zap, 
  BarChart3, 
  Users, 
  Star, 
  X, 
  Check,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-2xl text-indigo-600">
          <Zap className="fill-indigo-600" />
          <span>Velocity</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <button className="hover:text-indigo-600 transition-colors">Features</button>
          <button className="hover:text-indigo-600 transition-colors">Solutions</button>
          <button className="hover:text-indigo-600 transition-colors">Pricing</button>
        </div>

        <button 
          onClick={() => alert('Redirecting to sign-in...')}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-indigo-700" />
            <span>Trusted by 5,000+ growing teams</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Automate your workflow <span className="text-indigo-600">in seconds</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Velocity helps high-growth startups streamline operations, sync data across platforms, and focus on building what matters most.
          </p>

          <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="w-full sm:w-80 px-6 py-4 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <button 
              disabled={status !== 'idle'}
              className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'loading' ? 'Processing...' : status === 'success' ? 'Joined!' : 'Request Access'}
              {status === 'idle' && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
          {status === 'success' && (
            <p className="text-green-600 mt-4 flex items-center justify-center gap-2 font-medium">
              <CheckCircle className="w-4 h-4" /> Added to waitlist successfully!
            </p>
          )}
        </div>

        {/* Screenshot Placeholder */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-indigo-100 bg-slate-50 aspect-video flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/50 to-purple-100/50" />
          <div className="z-10 flex flex-col items-center gap-4 text-indigo-400">
            <BarChart3 className="w-20 h-20 opacity-20" />
            <span className="font-semibold text-slate-400">Dashboard UI Mockup</span>
          </div>
          <button 
            onClick={() => alert('Playing product video tour...')}
            className="absolute bottom-8 right-8 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-xl flex items-center gap-2 hover:bg-white transition-all"
          >
            <Play className="w-4 h-4 fill-indigo-600 text-indigo-600" />
            <span className="font-bold">Watch Demo</span>
          </button>
        </div>

        {/* Social Proof Row */}
        <div className="mt-24 text-center">
          <p className="text-slate-400 font-medium mb-8">POWERING INNOVATION AT</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            {['Acme Corp', 'Vertex', 'Luminary', 'Orbit', 'Echo'].map((brand) => (
              <span key={brand} className="text-2xl font-bold text-slate-600">{brand}</span>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2 font-bold text-indigo-600">
            <Zap className="w-5 h-5" /> Velocity © 2024
          </div>
          <div className="flex gap-8">
            <button className="hover:text-indigo-600">Privacy</button>
            <button className="hover:text-indigo-600">Terms</button>
            <button className="hover:text-indigo-600">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}