import React, { useState } from 'react';
import { 
  Phone, Calendar, Users, Shield, Clock, Heart, 
  Stethoscope, Microscope, Brain, Baby, Activity, 
  ChevronRight, MapPin, Mail, CheckCircle 
} from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', date: '', department: '' });

  const services = [
    { icon: <Stethoscope className="w-8 h-8 text-emerald-600" />, title: 'General Medicine', desc: 'Comprehensive primary care for patients of all ages.' },
    { icon: <Brain className="w-8 h-8 text-emerald-600" />, title: 'Neurology', desc: 'Expert diagnosis and management of nervous system disorders.' },
    { icon: <Baby className="w-8 h-8 text-emerald-600" />, title: 'Pediatrics', desc: 'Gentle, specialized care for your children\'s growth and health.' },
    { icon: <Microscope className="w-8 h-8 text-emerald-600" />, title: 'Diagnostic Lab', desc: 'Advanced on-site testing with rapid, accurate results.' },
    { icon: <Activity className="w-8 h-8 text-emerald-600" />, title: 'Cardiology', desc: 'Heart health monitoring and preventative cardiovascular care.' },
    { icon: <Heart className="w-8 h-8 text-emerald-600" />, title: 'Preventative Wellness', desc: 'Personalized health checkups and lifestyle management.' },
  ];

  const doctors = [
    { name: 'Dr. Elena Rodriguez', spec: 'Chief of Cardiology', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300' },
    { name: 'Dr. Marcus Thorne', spec: 'Neurology Specialist', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300' },
    { name: 'Dr. Sarah Jenkins', spec: 'Pediatric Consultant', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg text-white"><Heart size={24} /></div>
            <span className="text-xl font-bold tracking-tight">VitalCare Clinic</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <span className="hidden md:flex items-center gap-2 text-emerald-700">
              <Phone size={18} /> (555) 123-4567
            </span>
            <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-full hover:bg-emerald-700 transition">Book Appointment</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6">Your health is our <span className="text-emerald-600">top priority.</span></h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">Compassionate care, cutting-edge technology, and a dedicated team of professionals focused on your long-term wellness.</p>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl flex items-center gap-2 text-lg hover:bg-slate-800">
              Schedule your visit <ChevronRight size={20} />
            </button>
          </div>
          <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" alt="Clinic Interior" className="rounded-3xl shadow-2xl" />
        </div>
      </header>

      {/* Services */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Medical Specialities</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="p-8 bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition">
              <div className="mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctors & Hours */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-8">Meet Our Specialists</h2>
            <div className="space-y-6">
              {doctors.map((d, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
                  <img src={d.img} alt={d.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold">{d.name}</h4>
                    <p className="text-sm text-emerald-700">{d.spec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 text-white p-10 rounded-3xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Clock /> Opening Hours</h3>
            <div className="space-y-4 text-slate-300">
              <div className="flex justify-between border-b border-slate-700 pb-2"><span>Mon - Fri</span><span>8:00 AM - 8:00 PM</span></div>
              <div className="flex justify-between border-b border-slate-700 pb-2"><span>Saturday</span><span>9:00 AM - 4:00 PM</span></div>
              <div className="flex justify-between"><span>Sunday</span><span className="text-emerald-400">Closed</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Request an Appointment</h2>
          <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Full Name" className="p-4 rounded-xl border border-slate-200 w-full" />
            <input type="email" placeholder="Email Address" className="p-4 rounded-xl border border-slate-200 w-full" />
            <input type="date" className="p-4 rounded-xl border border-slate-200 w-full" />
            <select className="p-4 rounded-xl border border-slate-200 w-full text-slate-500">
              <option>Select Department</option>
              <option>Cardiology</option>
              <option>Neurology</option>
            </select>
            <button className="md:col-span-2 bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700">Submit Request</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-white font-bold mb-4">VitalCare Clinic</h4>
            <p className="text-sm leading-relaxed">Dedicated to providing world-class medical care with a personal touch in the heart of the city.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <div className="flex items-center gap-2 mb-2"><MapPin size={16} /> 123 Health Ave, Medical City</div>
            <div className="flex items-center gap-2"><Mail size={16} /> contact@vitalcare.clinic</div>
          </div>
          <div className="bg-slate-800 h-32 rounded-xl flex items-center justify-center text-slate-600">Map Placeholder</div>
        </div>
      </footer>
    </div>
  );
}