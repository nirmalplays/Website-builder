import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle, XCircle, Users, Mail, ArrowRight, Shield } from 'lucide-react';

export default function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(1248);

  // Persistence for user interaction simulation
  useEffect(() => {
    try {
      const saved = localStorage.getItem('waitlist_count');
      if (saved) setWaitlistCount(parseInt(saved));
    } catch (e) {}
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Please enter a valid professional email address.');
      return;
    }

    setError('');
    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setWaitlistCount((prev) => {
        const next = prev + 1;
        try { localStorage.setItem('waitlist_count', next.toString()); } catch (e) {}
        return next;
      });
      setEmail('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans text-slate-900">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
            <Sparkles size={16} />
            <span>Now in Private Beta</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            The smarter way to <span className="text-indigo-600">manage your creative workflow</span>.
          </h1>
          <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
            Join 1,000+ designers and developers who are saving 10+ hours a week using our automated project coordination tools.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 max-w-md mx-auto">
          {status === 'success' ? (
            <div className="py-6 px-4 flex flex-col items-center animate-in fade-in zoom-in duration-500">
              <CheckCircle className="text-green-500 w-12 h-12 mb-3" />
              <h3 className="text-xl font-bold">You're on the list!</h3>
              <p className="text-slate-500 mt-2">We've sent a confirmation to your inbox.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-indigo-600 font-semibold hover:underline"
              >
                Sign up another account
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-lg"
                  disabled={status === 'loading'}
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm px-2 animate-in slide-in-from-top-1">
                  <XCircle size={14} />
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={status === 'loading' || !email}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-lg"
              >
                {status === 'loading' ? 'Joining...' : 'Get Early Access'}
                {!status && <ArrowRight size={20} />}
              </button>
            </form>
          )}
        </div>

        {/* Social Proof */}
        <div className="flex flex-col items-center gap-4 pt-8">
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Users size={20} />
            <span>{waitlistCount.toLocaleString()} people already joined the waitlist</span>
          </div>
          <div className="flex items-center gap-6 opacity-60 grayscale">
            <span className="font-bold text-xl tracking-tighter">Acme Corp</span>
            <span className="font-bold text-xl tracking-tighter">Vertex</span>
            <span className="font-bold text-xl tracking-tighter">Luminary</span>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="fixed bottom-6 text-slate-400 text-sm flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Shield size={14} />
          <span>We respect your privacy. No spam.</span>
        </div>
      </footer>
    </div>
  );
}