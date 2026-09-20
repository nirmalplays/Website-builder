import React from 'react';
import { Play, Calendar, Clock, ArrowRight, Star, Mail, Search, Menu, Zap, Users, ChevronRight } from 'lucide-react';

export default function App() {
  const episodes = [
    { id: '08', title: 'The Future of Neural Interfaces', duration: '54:20', date: 'Oct 24, 2023' },
    { id: '07', title: 'Sustainable Architecture in Cities', duration: '48:15', date: 'Oct 17, 2023' },
    { id: '06', title: 'Decoding Financial Literacy', duration: '52:10', date: 'Oct 10, 2023' },
    { id: '05', title: 'Quantum Computing Explained', duration: '61:05', date: 'Oct 03, 2023' },
    { id: '04', title: 'Modern Culinary Traditions', duration: '45:30', date: 'Sep 26, 2023' },
    { id: '03', title: 'The Psychology of Productivity', duration: '55:40', date: 'Sep 19, 2023' },
    { id: '02', title: 'Renewable Energy Landscapes', duration: '49:20', date: 'Sep 12, 2023' },
    { id: '01', title: 'The Rise of Digital Nomads', duration: '42:15', date: 'Sep 05, 2023' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-6xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter text-indigo-600">SHIFT.POD</div>
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#" className="hover:text-indigo-600">Episodes</a>
          <a href="#" className="hover:text-indigo-600">About</a>
          <a href="#" className="hover:text-indigo-600">Newsletter</a>
        </div>
        <button className="bg-stone-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-indigo-600 transition-colors">
          Subscribe
        </button>
      </nav>

      {/* Hero */}
      <header className="px-6 py-16 md:py-24 max-w-4xl mx-auto text-center">
        <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm">New Episodes Every Tuesday</span>
        <h1 className="text-5xl md:text-7xl font-extrabold mt-4 mb-6 tracking-tight">Exploring the edge of modern thought.</h1>
        <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto">Join hosts Elena Rossi and Marcus Thorne as they dissect complex ideas with world-class experts, engineers, and visionaries.</p>
        <div className="flex gap-4 justify-center">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700">
            <Play size={20} fill="white" /> Listen Now
          </button>
        </div>
      </header>

      {/* Featured Episode */}
      <section className="px-6 py-16 bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square bg-indigo-100 rounded-3xl overflow-hidden">
             <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800" alt="Episode cover" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-indigo-600 font-bold">LATEST EPISODE</span>
            <h2 className="text-4xl font-bold mt-2 mb-6">#09: The Ethics of Artificial Intelligence</h2>
            <div className="bg-stone-100 p-6 rounded-2xl mb-6">
              <div className="w-full h-2 bg-stone-200 rounded-full mb-4">
                <div className="w-1/3 h-2 bg-indigo-600 rounded-full"></div>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>12:45</span>
                <span>58:30</span>
              </div>
            </div>
            <p className="text-stone-600 mb-6">In this episode, we sit down with Dr. Aris Thorne to discuss the shifting landscape of machine learning regulation and what it means for the future of personal privacy.</p>
            <button className="flex items-center gap-2 font-semibold hover:text-indigo-600">Read Show Notes <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

      {/* Episode List */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Past Episodes</h2>
        <div className="space-y-4">
          {episodes.map((ep) => (
            <div key={ep.id} className="flex items-center justify-between p-6 bg-white border border-stone-200 rounded-xl hover:border-indigo-300 transition-colors">
              <div className="flex items-center gap-6">
                <span className="text-stone-400 font-mono text-xl">{ep.id}</span>
                <div>
                  <h3 className="font-bold text-lg">{ep.title}</h3>
                  <div className="flex gap-4 text-sm text-stone-500 mt-1">
                    <span className="flex items-center gap-1"><Clock size={14}/> {ep.duration}</span>
                    <span className="flex items-center gap-1"><Calendar size={14}/> {ep.date}</span>
                  </div>
                </div>
              </div>
              <button className="p-3 bg-stone-100 rounded-full hover:bg-indigo-100 hover:text-indigo-600"><Play size={18} fill="currentColor" /></button>
            </div>
          ))}
        </div>
      </section>

      {/* Hosts */}
      <section className="px-6 py-20 bg-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Meet the Hosts</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="w-32 h-32 bg-indigo-800 rounded-full mx-auto mb-6 overflow-hidden border-4 border-indigo-700">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" alt="Elena" />
              </div>
              <h3 className="text-xl font-bold">Elena Rossi</h3>
              <p className="text-indigo-300 text-sm mt-2">Technology Anthropologist</p>
            </div>
            <div>
              <div className="w-32 h-32 bg-indigo-800 rounded-full mx-auto mb-6 overflow-hidden border-4 border-indigo-700">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" alt="Marcus" />
              </div>
              <h3 className="text-xl font-bold">Marcus Thorne</h3>
              <p className="text-indigo-300 text-sm mt-2">Systems Architect</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Listener Reviews</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Sarah J.", text: "The most insightful podcast I've ever heard. Changed my perspective on tech." },
            { name: "David M.", text: "Production quality is top tier. Always look forward to my Tuesday commute." },
            { name: "Chloe K.", text: "A breath of fresh air in a saturated market. Intellectual and grounded." }
          ].map((r, i) => (
            <div key={i} className="p-6 bg-white border border-stone-200 rounded-2xl">
              <div className="flex text-yellow-400 mb-4"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
              <p className="text-stone-600 text-sm mb-4">"{r.text}"</p>
              <p className="font-bold text-sm">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 py-20 bg-stone-200">
        <div className="max-w-xl mx-auto text-center">
          <Mail className="mx-auto text-indigo-600 mb-4" size={40} />
          <h2 className="text-3xl font-bold mb-4">Get the weekly digest</h2>
          <p className="text-stone-600 mb-8">Join 15,000+ curious listeners getting show notes and bonus content delivered to their inbox.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg border border-stone-300" />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-stone-500 text-sm">
        <p className="mb-4">© 2023 SHIFT.POD Podcast. All rights reserved.</p>
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-600">Terms of Service</a>
          <a href="#" className="hover:text-indigo-600">Sponsorship</a>
        </div>
      </footer>
    </div>
  );
}