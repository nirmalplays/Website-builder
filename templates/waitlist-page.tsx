import React, { useState } from 'react';
import { Sparkles, CheckCircle, ArrowRight, Shield } from 'lucide-react';

export default function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid business email address.');
      return;
    }
    setError('');
    setStatus('success');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span>NexusFlow</span>
        </div>
        <button className="text-sm font-medium hover:text-indigo-600 transition-colors">
          Contact Support
        </button>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Now accepting early access
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
          Orchestrate your workflow with <span className="text-indigo-600">precision.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl">
          NexusFlow bridges the gap between your fragmented tools. Join 2,400+ product leaders waiting for the future of automated operations.
        </p>

        {status === 'success' ? (
          <div className="w-full max-w-md bg-white border border-green-200 rounded-2xl p-6 flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">You're on the list!</h3>
            <p className="text-slate-600">We've sent a confirmation to {email}. We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg shadow-sm"
              />
              {error && <p className="absolute -bottom-6 left-1 text-sm text-red-500">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 text-lg shadow-lg shadow-indigo-200"
            >
              Request Early Access
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        <div className="mt-16 flex flex-col items-center gap-6">
          <p className="text-sm text-slate-500 uppercase tracking-widest font-medium">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-60 grayscale">
            {['Linear', 'Vercel', 'Figma', 'Notion', 'Stripe'].map((brand) => (
              <span key={brand} className="text-xl font-bold tracking-tight text-slate-900">{brand}</span>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>© 2024 NexusFlow Systems Inc.</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}