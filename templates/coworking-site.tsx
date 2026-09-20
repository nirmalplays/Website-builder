import React, { useState } from 'react';
import { 
  Check, 
  MapPin, 
  Calendar, 
  Users, 
  Zap, 
  Coffee, 
  Wifi, 
  Shield, 
  Clock, 
  ArrowRight, 
  Star,
  Menu,
  X,
  CreditCard
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const plans = [
    { name: "Hot Desk", price: "$299", features: ["Access to open areas", "High-speed Wi-Fi", "Unlimited coffee", "Mon-Fri 9-6"] },
    { name: "Dedicated Desk", price: "$499", features: ["Reserved desk", "Lockable storage", "24/7 access", "5 hours meeting rooms"] },
    { name: "Private Office", price: "$899", features: ["Private lockable space", "Customizable layout", "Mail handling", "10 hours meeting rooms"] }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <span className="text-2xl font-bold tracking-tight text-indigo-600">NexusWork</span>
            <div className="hidden md:flex items-center gap-8 font-medium">
              <a href="#workspaces" className="hover:text-indigo-600">Workspaces</a>
              <a href="#membership" className="hover:text-indigo-600">Membership</a>
              <a href="#events" className="hover:text-indigo-600">Events</a>
              <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-full hover:bg-indigo-700 transition">Book a Tour</button>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      <header className="py-20 px-4 text-center bg-white">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">Work where <span className="text-indigo-600">inspiration</span> happens.</h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">Modern, flexible workspaces designed for startups, creatives, and remote teams in the heart of the city.</p>
        <div className="inline-flex items-center gap-4 bg-indigo-50 border border-indigo-100 p-4 rounded-2xl">
          <Zap className="text-indigo-600" />
          <span className="font-semibold text-indigo-900">Try us for free: Get a one-day pass on your first visit!</span>
        </div>
      </header>

      <section id="workspaces" className="py-20 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Workspace Solutions</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Open Lounge", cap: "20 members", price: "Flexible" },
            { title: "Team Suites", cap: "4-12 people", price: "Private" },
            { title: "Focus Pods", cap: "1 person", price: "Hourly" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-500 mb-4">{item.cap}</p>
              <span className="text-indigo-600 font-bold">{item.price}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          {[
            { icon: Wifi, text: "High-speed Fiber" },
            { icon: Coffee, text: "Artisan Coffee" },
            { icon: Shield, text: "Secure Access" },
            { icon: Clock, text: "24/7 Availability" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4">
              <item.icon size={40} className="text-indigo-400" />
              <p className="font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="membership" className="py-20 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Membership Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200">
              <h3 className="text-xl font-bold mb-4">{p.name}</h3>
              <p className="text-4xl font-extrabold mb-6">{p.price}<span className="text-sm font-normal text-slate-400">/mo</span></p>
              <ul className="space-y-4 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-slate-600"><Check size={16} className="text-indigo-600" /> {f}</li>
                ))}
              </ul>
              <button className="w-full py-3 border-2 border-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition">Select Plan</button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">What our members say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-50 rounded-3xl">
              <div className="flex gap-1 mb-4 text-amber-400"><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/></div>
              <p className="text-lg italic mb-6">"NexusWork transformed my productivity. The community is incredibly supportive and the space is beautiful."</p>
              <p className="font-bold">— Sarah Jenkins, Creative Director</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl">
              <div className="flex gap-1 mb-4 text-amber-400"><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/></div>
              <p className="text-lg italic mb-6">"Best decision for my startup. The private offices are quiet, and the meeting rooms are top-notch."</p>
              <p className="font-bold">— Mark Thompson, Founder of Flow</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-white font-bold mb-4">NexusWork</h4>
            <p>123 Innovation Drive</p>
            <p>Tech City, TC 94105</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p>hello@nexuswork.com</p>
            <p>(555) 123-4567</p>
          </div>
          <div className="col-span-2 text-sm">
            <p>© 2024 NexusWork Spaces. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}