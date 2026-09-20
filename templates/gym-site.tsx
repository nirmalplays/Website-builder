import React, { useState } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Zap, 
  Shield, 
  ChevronRight, 
  Menu, 
  X,
  TrendingUp,
  MapPin
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const schedule = {
    Monday: ["06:00 AM - HIIT Burn", "05:30 PM - Power Yoga"],
    Tuesday: ["07:00 AM - Strength", "06:00 PM - CrossFit"],
    Wednesday: ["06:00 AM - HIIT Burn", "05:30 PM - Pilates"],
    Thursday: ["07:00 AM - Strength", "06:00 PM - CrossFit"],
    Friday: ["06:00 AM - HIIT Burn", "04:00 PM - Recovery Flow"]
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Nav */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter text-orange-600">APEX<span className="text-slate-900">FIT</span></div>
        <div className="hidden md:flex gap-8 font-medium text-sm uppercase tracking-widest">
          {['Schedule', 'Trainers', 'Pricing', 'Results'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-orange-600 transition-colors">{item}</a>
          ))}
        </div>
        <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-700 transition-all">Join Now</button>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">Elevate Your Performance</span>
            <h1 className="text-6xl md:text-7xl font-extrabold mt-4 mb-6 leading-tight">Forge Your Best Self Today.</h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">Join the premier fitness community in the city. Expert coaching, world-class equipment, and a results-driven environment.</p>
            <div className="flex gap-4">
              <button className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-700">Get Started <ArrowRight size={20}/></button>
              <button className="border border-slate-300 px-8 py-4 rounded-lg font-bold hover:bg-slate-100">View Schedule</button>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" alt="Fitness training" className="rounded-2xl shadow-2xl" />
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Weekly Class Schedule</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {Object.entries(schedule).map(([day, classes]) => (
            <div key={day} className="border border-slate-200 rounded-xl p-4">
              <h3 className="font-bold text-orange-600 mb-4 pb-2 border-b">{day}</h3>
              {classes.map((c, i) => (
                <div key={i} className="text-sm py-2 text-slate-700 font-medium">{c}</div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Trainers */}
      <section id="trainers" className="py-20 bg-slate-900 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Meet Your Coaches</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Sarah Jenkins", role: "Head Coach", spec: "HIIT & Cardio" },
              { name: "Marcus Thorne", role: "Strength Lead", spec: "Powerlifting" },
              { name: "Elena Rossi", role: "Yoga Master", spec: "Mobility & Flow" },
              { name: "David Chen", role: "CrossFit Pro", spec: "Olympic Lifting" }
            ].map((t, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto bg-slate-700 mb-4 overflow-hidden border-4 border-orange-600">
                  <img src={`https://i.pravatar.cc/150?u=${t.name}`} alt={t.name} />
                </div>
                <h4 className="font-bold text-lg">{t.name}</h4>
                <p className="text-orange-400 text-sm">{t.role}</p>
                <p className="text-slate-400 text-xs mt-2">{t.spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Membership Tiers</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Starter", price: "$49", perks: ["3 Classes/mo", "Open Gym", "App Access"] },
            { title: "Pro", price: "$99", perks: ["Unlimited Classes", "Towel Service", "Guest Passes", "Nutrition Plan"] },
            { title: "Elite", price: "$149", perks: ["Everything in Pro", "1-on-1 Coaching", "Sauna Access", "Swag Kit"] }
          ].map((p, i) => (
            <div key={i} className={`p-8 rounded-2xl border ${i === 1 ? 'border-orange-600 shadow-xl' : 'border-slate-200'}`}>
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <div className="text-4xl font-bold mb-6">{p.price}<span className="text-sm font-normal text-slate-500">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {p.perks.map(perk => <li key={perk} className="flex items-center gap-2"><CheckCircle size={18} className="text-orange-600"/> {perk}</li>)}
              </ul>
              <button className="w-full py-3 rounded-lg border font-bold hover:bg-slate-50">Select Plan</button>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section id="results" className="py-20 bg-slate-100 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Transformation Results</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6">
              <img src="https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=200&h=200&q=80" className="w-24 h-24 rounded-full object-cover" />
              <div>
                <p className="italic text-slate-700 mb-2">"Lost 30 lbs in 4 months. Apex changed my entire perspective on health and discipline. The community kept me accountable."</p>
                <p className="font-bold text-orange-600">— Jessica Miller</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80" className="w-24 h-24 rounded-full object-cover" />
              <div>
                <p className="italic text-slate-700 mb-2">"The strength program is unmatched. I've broken every personal record I had since joining. Best coaches in the business."</p>
                <p className="font-bold text-orange-600">— Robert Chen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-orange-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="mb-8 opacity-90">Sign up today and get your first week of classes completely free. No strings attached.</p>
          <form className="bg-white p-2 rounded-lg flex flex-col md:flex-row gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 text-slate-900 rounded-md focus:outline-none" />
            <button className="bg-slate-900 text-white px-8 py-3 rounded-md font-bold hover:bg-slate-800">Claim Trial</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-950 text-slate-400">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold text-white mb-4">APEXFIT</div>
            <p className="text-sm">Building stronger humans, one session at a time.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Studio</h4>
            <p className="text-sm">123 Fitness Way<br/>Los Angeles, CA 90210</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Hours</h4>
            <p className="text-sm">Mon-Fri: 5am - 9pm<br/>Sat-Sun: 8am - 2pm</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p className="text-sm">hello@apexfit.com<br/>(555) 123-4567</p>
          </div>
        </div>
      </footer>
    </div>
  );
}