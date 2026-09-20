import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Calendar, 
  Users, 
  Shield, 
  Star, 
  Zap, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const programs = [
    { age: "Infants", range: "6 weeks - 18 months", desc: "Gentle care with sensory play and personalized routines.", color: "bg-amber-100" },
    { age: "Toddlers", range: "18 months - 3 years", desc: "Focus on social development, motor skills, and curiosity.", color: "bg-sky-100" },
    { age: "Preschool", range: "3 years - 5 years", desc: "Pre-literacy, STEM basics, and structured group learning.", color: "bg-emerald-100" },
  ];

  const teachers = [
    { name: "Sarah Jenkins", role: "Lead Educator", cert: "M.Ed in Early Childhood", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200" },
    { name: "Marcus Thorne", role: "Preschool Specialist", cert: "BA Child Development", img: "https://images.unsplash.com/photo-1602116335926-9602f9e42106?auto=format&fit=crop&q=80&w=200" },
  ];

  return (
    <div className="min-h-screen bg-orange-50 text-slate-800 font-sans">
      {/* Nav */}
      <nav className="bg-white sticky top-0 z-50 border-b border-orange-100 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-orange-600 flex items-center gap-2">
          <Zap /> LittleSprouts
        </div>
        <div className="hidden md:flex gap-8 font-medium">
          {['Programs', 'Curriculum', 'Safety', 'Tuition', 'Contact'].map(i => (
            <a key={i} href={`#${i.toLowerCase()}`} className="hover:text-orange-600 transition-colors">{i}</a>
          ))}
        </div>
        <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition">Enrol Now</button>
      </nav>

      {/* Hero */}
      <header className="px-6 py-16 md:py-24 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">Where Little Minds <span className="text-orange-600">Grow Big Dreams</span>.</h1>
          <p className="text-xl text-slate-600">A nurturing, safe, and stimulating environment for your child's first steps into the world of learning.</p>
          <div className="flex gap-4">
            <button className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-700">Schedule a Tour</button>
            <button className="bg-white border-2 border-orange-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-orange-600">View Programs</button>
          </div>
        </div>
        <div className="flex-1 w-full">
          <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800" alt="Happy children playing" className="rounded-3xl shadow-2xl" />
        </div>
      </header>

      {/* Programs */}
      <section id="programs" className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Age-Appropriate Programs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((p, i) => (
              <div key={i} className={`${p.color} p-8 rounded-3xl space-y-4`}>
                <h3 className="text-2xl font-bold">{p.age}</h3>
                <p className="text-sm font-semibold uppercase text-slate-600">{p.range}</p>
                <p>{p.desc}</p>
                <button className="flex items-center gap-2 font-bold underline">Learn more <ArrowRight size={16}/></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section id="curriculum" className="px-6 py-20">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl border border-orange-100">
          <h2 className="text-3xl font-bold mb-8">A Typical Day</h2>
          <div className="space-y-6">
            {[
              { time: "8:00 AM", task: "Arrival & Free Play" },
              { time: "9:30 AM", task: "Morning Circle Time & Music" },
              { time: "11:00 AM", task: "Outdoor Exploration" },
              { time: "12:30 PM", task: "Nutritious Lunch & Rest" },
              { time: "3:00 PM", task: "Creative Arts & Storytelling" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 hover:bg-orange-50 rounded-xl transition">
                <div className="bg-orange-100 p-3 rounded-lg text-orange-600"><Clock size={20}/></div>
                <span className="font-bold w-24">{item.time}</span>
                <span>{item.task}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Teachers */}
      <section id="safety" className="px-6 py-20 bg-orange-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3"><Shield className="text-orange-600"/> Safety First</h2>
            <ul className="space-y-4">
              {['State-licensed facility', 'CPR & First Aid certified staff', 'Secure gated entry', 'Low child-to-teacher ratios'].map(item => (
                <li key={item} className="flex items-center gap-3 bg-white p-4 rounded-xl"><CheckCircle className="text-emerald-500"/> {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Educators</h2>
            <div className="grid grid-cols-2 gap-4">
              {teachers.map(t => (
                <div key={t.name} className="bg-white p-6 rounded-2xl">
                  <img src={t.img} className="w-16 h-16 rounded-full mb-4 object-cover" />
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-sm text-slate-500">{t.role}</p>
                  <p className="text-xs text-orange-600 mt-2">{t.cert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">LittleSprouts</h3>
            <p className="text-slate-400">Nurturing the leaders of tomorrow, one sprout at a time.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold">Contact</h4>
            <p className="text-slate-400 flex items-center gap-2"><MapPin size={16}/> 123 Maple St, Oakwood</p>
            <p className="text-slate-400 flex items-center gap-2"><Mail size={16}/> hello@littlesprouts.edu</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500">
          © 2024 LittleSprouts Early Learning Center. All rights reserved.
        </div>
      </footer>
    </div>
  );
}