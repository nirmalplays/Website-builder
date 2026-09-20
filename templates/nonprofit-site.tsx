import React, { useState } from 'react';
import { Heart, Users, TrendingUp, Shield, ArrowRight, CheckCircle, Star, Mail, Zap } from 'lucide-react';

export default function App() {
  const [amount, setAmount] = useState<number>(50);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-2xl text-emerald-700">
          <Heart className="fill-emerald-700" />
          <span>KindredGlobal</span>
        </div>
        <div className="hidden md:flex gap-8 font-medium text-sm">
          <a href="#mission" className="hover:text-emerald-600 transition">Mission</a>
          <a href="#programs" className="hover:text-emerald-600 transition">Programs</a>
          <a href="#impact" className="hover:text-emerald-600 transition">Impact</a>
        </div>
        <button className="bg-emerald-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-800 transition shadow-lg">
          Donate Now
        </button>
      </nav>

      {/* Hero */}
      <header className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-950">
          Empowering communities, <span className="text-emerald-700">one child at a time.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
          We provide sustainable resources, clean water, and quality education to underserved regions across the globe. Join our mission to create a brighter future.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-800 flex items-center gap-2">
            Get Involved <ArrowRight size={20} />
          </button>
        </div>
      </header>

      {/* Stats */}
      <section id="impact" className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "12,000+", label: "Children Educated" },
            { val: "85", label: "Clean Water Wells" },
            { val: "40", label: "Countries Reached" },
            { val: "92%", label: "Funds to Programs" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-2">{stat.val}</div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Core Programs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Education First", icon: Star, desc: "Building schools and providing supplies for remote villages." },
            { title: "Clean Water", icon: Zap, desc: "Installing solar-powered filtration systems for safe drinking." },
            { title: "Healthcare Access", icon: Shield, desc: "Mobile clinics offering routine checkups and vaccinations." },
            { title: "Economic Growth", icon: TrendingUp, desc: "Micro-loans and vocational training for local entrepreneurs." },
          ].map((p, i) => (
            <div key={i} className="border border-slate-100 p-6 rounded-2xl hover:shadow-xl transition shadow-sm">
              <p.icon className="text-emerald-700 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6 bg-emerald-900 text-emerald-50">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=600" alt="Student" className="rounded-2xl w-64 h-64 object-cover shadow-2xl" />
          <div>
            <blockquote className="text-2xl font-light italic mb-6">
              "Before KindredGlobal came to our village, I had to walk five miles for water. Now, I spend those hours in school pursuing my dream of becoming a doctor."
            </blockquote>
            <cite className="font-bold text-lg not-italic text-emerald-300">— Amina, Student in Kenya</cite>
          </div>
        </div>
      </section>

      {/* Donation */}
      <section className="py-20 px-6 max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Fuel Our Mission</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[25, 50, 100].map(val => (
            <button 
              key={val}
              onClick={() => setAmount(val)}
              className={`py-4 rounded-xl font-bold border-2 ${amount === val ? 'border-emerald-700 bg-emerald-50 text-emerald-700' : 'border-slate-200'}`}
            >
              ${val}
            </button>
          ))}
        </div>
        <input 
          type="number" 
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-4 border border-slate-200 rounded-xl mb-6 text-center text-xl font-bold"
        />
        <button className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-800">
          Contribute ${amount} Today
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <p>© 2024 KindredGlobal Non-Profit. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Financials</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}