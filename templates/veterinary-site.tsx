import React, { useState } from 'react';
import { 
  Shield, 
  Calendar, 
  Clock, 
  Star, 
  Heart, 
  ChevronRight, 
  CheckCircle, 
  Phone,
  MapPin,
  Mail,
  Zap,
  User,
  Users,
  Search
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dogs');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white text-center py-2 px-4 text-sm font-medium flex items-center justify-center gap-2">
        <Zap className="w-4 h-4" />
        <span>Emergency? Call our 24/7 line immediately: (555) 019-8822</span>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Paws & Claws</span>
          </div>
          <div className="hidden md:flex gap-8 font-medium text-slate-600">
            <a href="#services" className="hover:text-emerald-600 transition-colors">Services</a>
            <a href="#vets" className="hover:text-emerald-600 transition-colors">Our Team</a>
            <a href="#plans" className="hover:text-emerald-600 transition-colors">Wellness Plans</a>
            <a href="#book" className="text-emerald-600 font-semibold">Book Appointment</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Compassionate care for <span className="text-emerald-600">your best friend.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">
              From routine wellness check-ups to advanced surgical procedures, our clinic provides gold-standard veterinary care in a warm, stress-free environment.
            </p>
            <div className="flex gap-4">
              <a href="#book" className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition">Book Online</a>
              <button className="border border-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition">View Services</button>
            </div>
          </div>
          <div className="h-96 bg-slate-200 rounded-3xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800" 
              alt="Happy golden retriever" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Care Tailored to Every Pet</h2>
          <div className="flex justify-center gap-4 mb-12">
            {['dogs', 'cats', 'exotics'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full capitalize font-semibold transition ${activeTab === tab ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="p-8 border border-slate-100 rounded-2xl hover:shadow-lg transition">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Routine Wellness</h3>
                <p className="text-slate-600">Comprehensive physical exams, parasite prevention, and age-specific health screenings for your companion.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profiles */}
      <section id="vets" className="py-20 bg-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Meet Our Expert Veterinarians</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Dr. Sarah Jenkins", specialty: "Small Animal Internal Medicine" },
              { name: "Dr. Marcus Thorne", specialty: "Exotic & Avian Specialist" }
            ].map((vet, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl flex gap-6 items-center">
                <div className="w-24 h-24 bg-slate-300 rounded-full shrink-0" />
                <div>
                  <h3 className="text-xl font-bold">{vet.name}</h3>
                  <p className="text-emerald-600 font-medium mb-2">{vet.specialty}</p>
                  <p className="text-sm text-slate-500">Over 15 years of experience dedicated to animal wellness and surgical excellence.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="book" className="py-20 px-4">
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-3xl font-bold mb-8">Schedule an Appointment</h2>
          <form className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Owner Name" className="p-4 border rounded-xl" />
            <input type="text" placeholder="Pet's Name" className="p-4 border rounded-xl" />
            <select className="p-4 border rounded-xl">
              <option>Dog</option>
              <option>Cat</option>
              <option>Exotic</option>
            </select>
            <input type="date" className="p-4 border rounded-xl" />
            <textarea placeholder="Briefly describe the reason for visit" className="md:col-span-2 p-4 border rounded-xl h-32" />
            <button className="md:col-span-2 bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700">Request Appointment</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-white font-bold mb-4">Paws & Claws Clinic</h4>
            <p className="text-sm">Providing exceptional care since 2008. We treat every patient like our own family.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Hours</h4>
            <p className="text-sm">Mon-Fri: 8am - 7pm</p>
            <p className="text-sm">Sat-Sun: 9am - 3pm</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p className="text-sm">123 Vet Lane</p>
            <p className="text-sm">San Francisco, CA 94102</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Emergency</h4>
            <p className="text-emerald-500 font-bold">(555) 019-8822</p>
          </div>
        </div>
      </footer>
    </div>
  );
}