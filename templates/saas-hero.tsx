import React from 'react';
import { ArrowRight, Zap, Shield, BarChart3, ChevronRight, Star } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">FlowStream</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Solutions</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
        </div>
        <button className="text-sm font-semibold hover:text-indigo-600 transition-colors">Log in</button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-indigo-700" />
            <span>Trusted by over 5,000+ growing teams</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 mb-8 leading-[1.1]">
            Automate your workflow <span className="text-indigo-600">without the complexity.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            FlowStream connects your favorite apps into a single, seamless engine. Spend less time on manual tasks and more time building your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold hover:border-indigo-300 transition-all">
              Request a Demo
            </button>
          </div>
        </div>

        {/* Screenshot Placeholder */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20"></div>
          <div className="relative bg-slate-900 rounded-2xl p-2 shadow-2xl overflow-hidden border border-slate-800">
            <div className="flex gap-2 p-3 border-b border-slate-800">
              <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=2000" 
              alt="Dashboard Preview" 
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Logos */}
        <div className="mt-24 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">Powering industry leaders</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Acme Corp', 'Vertex', 'Nebula', 'Echo Systems', 'Pulse'].map((brand) => (
              <div key={brand} className="flex items-center justify-center font-bold text-2xl text-slate-900">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>© 2024 FlowStream Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}