import React, { useState } from 'react';
import { 
  Phone, 
  Calendar, 
  CheckCircle, 
  Users, 
  Shield, 
  Star, 
  Clock, 
  MapPin, 
  Mail, 
  ChevronRight,
  Zap,
  Sparkles,
  Heart
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-xl font-bold tracking-tight">PureSmile Dental</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#treatments" className="hover:text-teal-600 transition">Treatments</a>
            <a href="#team" className="hover:text-teal-600 transition">Our Team</a>
            <a href="#reviews" className="hover:text-teal-600 transition">Reviews</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Emergency Line</p>
              <p className="font-bold text-teal-700">(555) 123-4567</p>
            </div>
            <a href="#appointment" className="bg-teal-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-teal-700 transition">
              Book Online
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-teal-600 font-semibold tracking-wide uppercase text-sm">Serving the community since 1998</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mt-4 mb-6 leading-tight">
              Your Healthiest Smile Starts Here.
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">
              We combine advanced clinical technology with a gentle, patient-first approach to provide exceptional dental care for the whole family.
            </p>
            <div className="flex gap-4">
              <a href="#appointment" className="bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-teal-700 shadow-lg shadow-teal-200">
                Book Consultation <Calendar className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="h-96 bg-slate-200 rounded-3xl overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1629904853716-f0bc54881073?auto=format&fit=crop&q=80&w=800" alt="Dentist smiling" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Treatments */}
      <section id="treatments" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Expert Dental Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "General Dentistry", desc: "Routine checkups, cleanings, and fillings to maintain long-term oral health.", icon: <CheckCircle /> },
              { title: "Cosmetic Dentistry", desc: "Professional whitening, veneers, and bonding for your perfect smile.", icon: <Sparkles /> },
              { title: "Restorative Care", desc: "Dental implants, crowns, and bridges to restore functionality and confidence.", icon: <Zap /> }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-teal-500 transition">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-6">{t.icon}</div>
                <h3 className="text-xl font-bold mb-3">{t.title}</h3>
                <p className="text-slate-600">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Meet Our Specialists</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex gap-6">
              <div className="w-32 h-32 bg-slate-300 rounded-xl shrink-0 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300" alt="Dr. Sarah Miller" />
              </div>
              <div>
                <h4 className="text-xl font-bold">Dr. Sarah Miller, DDS</h4>
                <p className="text-teal-600 font-medium mb-2">Lead Cosmetic Dentist</p>
                <p className="text-sm text-slate-500 leading-relaxed">Over 15 years of experience in aesthetic reconstruction and smile design.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex gap-6">
              <div className="w-32 h-32 bg-slate-300 rounded-xl shrink-0 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300" alt="Dr. James Chen" />
              </div>
              <div>
                <h4 className="text-xl font-bold">Dr. James Chen, DMD</h4>
                <p className="text-teal-600 font-medium mb-2">Restorative Specialist</p>
                <p className="text-sm text-slate-500 leading-relaxed">Specializing in dental implants and complex full-mouth rehabilitations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section id="appointment" className="py-20 bg-teal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Request Your Visit</h2>
            <p className="text-teal-100">Fill out the form below and our front desk will contact you to confirm your time.</p>
          </div>
          <form className="bg-white text-slate-900 p-8 rounded-3xl shadow-xl grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Full Name" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200" />
            <input type="email" placeholder="Email Address" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200" />
            <select className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200">
              <option>General Checkup</option>
              <option>Cosmetic Consultation</option>
              <option>Emergency Appointment</option>
            </select>
            <input type="date" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200" />
            <button className="md:col-span-2 bg-teal-600 text-white py-4 rounded-xl font-bold hover:bg-teal-700 transition">Confirm Request</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-bold text-xl mb-4">PureSmile Dental</h3>
            <p className="text-slate-500 text-sm max-w-xs">Excellence in dentistry, performed with care. Located in the heart of downtown.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase text-slate-400">Contact</h4>
            <p className="text-sm text-slate-600 flex items-center gap-2 mb-2"><MapPin className="w-4 h-4" /> 123 Dental Way, City</p>
            <p className="text-sm text-slate-600 flex items-center gap-2"><Mail className="w-4 h-4" /> hello@puresmile.com</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase text-slate-400">Hours</h4>
            <p className="text-sm text-slate-600">Mon-Fri: 8am - 6pm</p>
            <p className="text-sm text-slate-600">Sat: 9am - 2pm</p>
          </div>
        </div>
      </footer>
    </div>
  );
}