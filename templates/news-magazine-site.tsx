import React, { useState } from 'react';
import { 
  Menu, Search, Bell, User, Calendar, TrendingUp, 
  ChevronRight, ArrowRight, Zap, Clock, Bookmark, Share2, Mail
} from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('Home');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Calendar size={12} /> Tuesday, October 24, 2023</span>
          <span className="hidden md:block">|</span>
          <span className="hidden md:block font-bold text-amber-400">BREAKING:</span>
          <span className="hidden md:block">Global climate summit announces ambitious 2030 emission targets</span>
        </div>
        <div className="flex gap-4">
          <span>Subscribe</span>
          <span>Log In</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 bg-white border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu className="md:hidden" />
            <h1 className="text-2xl font-bold tracking-tighter text-slate-950">CHRONICLE</h1>
          </div>
          <div className="hidden md:flex gap-6 font-medium text-sm text-slate-600">
            {['Home', 'Politics', 'Business', 'Tech', 'Culture', 'Opinion'].map(item => (
              <button 
                key={item} 
                className={`${activeNav === item ? 'text-blue-600' : 'hover:text-blue-600'}`}
                onClick={() => setActiveNav(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex gap-4 items-center">
            <Search size={20} className="text-slate-400" />
            <Bell size={20} className="text-slate-400" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Lead Story */}
        <section className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-8">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200" 
              alt="Global Network"
              className="w-full h-[400px] object-cover rounded-lg mb-6"
            />
            <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">Lead Story</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-2 mb-4 leading-tight">The Future of AI: How Neural Networks Are Redefining Global Economic Policy</h2>
            <p className="text-lg text-slate-600 max-w-2xl">As automated systems integrate into central banking, experts weigh in on the potential for unprecedented stability versus the risks of algorithmic bias.</p>
          </div>
          <div className="md:col-span-4 border-l border-slate-200 pl-8">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><TrendingUp size={20}/> Most Read</h3>
            <div className="space-y-6">
              {[
                { title: 'The hidden cost of urban migration', category: 'Sociology' },
                { title: 'New energy breakthroughs in solar storage', category: 'Tech' },
                { title: 'How to manage remote teams effectively', category: 'Business' },
                { title: 'Top 10 travel destinations for 2024', category: 'Lifestyle' }
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <span className="text-xs text-blue-600 font-semibold">{item.category}</span>
                  <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {['Business', 'Technology', 'Culture'].map((cat) => (
            <section key={cat}>
              <h3 className="text-2xl font-bold mb-6 border-b-2 border-slate-900 pb-2">{cat}</h3>
              <div className="space-y-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex gap-4">
                    <div className="w-20 h-20 bg-slate-200 rounded flex-shrink-0" />
                    <div>
                      <p className="font-bold text-sm leading-snug hover:text-blue-600 cursor-pointer">Market volatility continues as new trade agreements are signed.</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock size={12}/> {n * 2} hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Newsletter */}
        <section className="bg-blue-600 rounded-2xl p-8 md:p-16 text-center text-white mb-16">
          <Zap className="mx-auto mb-4" size={40} />
          <h2 className="text-3xl font-bold mb-4">Stay Ahead of the Curve</h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">Get the daily briefing delivered to your inbox every morning at 7:00 AM. No spam, just the news you need.</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email address" className="flex-1 px-4 py-3 rounded-lg text-slate-900 outline-none" />
            <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">Subscribe</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-white font-bold text-xl mb-4">CHRONICLE</h2>
            <p className="text-sm">Reporting the truth from around the globe since 1994.</p>
          </div>
          {['Sections', 'Company', 'Support'].map(section => (
            <div key={section}>
              <h4 className="text-white font-semibold mb-4">{section}</h4>
              <ul className="space-y-2 text-sm">
                <li>Editorial Ethics</li>
                <li>Careers</li>
                <li>Advertise</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-xs text-center">
          © 2023 Chronicle Media Group. All rights reserved.
        </div>
      </footer>
    </div>
  );
}