import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, ChevronRight, Plus, Minus, Search, 
  BookOpen, Users, Calendar, DollarSign, GraduationCap, 
  Award, Mail, MapPin, Bell, Menu, X, ArrowRight
} from 'lucide-react';

const INITIAL_PROGRAMS = [
  { id: 1, name: 'Computer Science', faculty: 'Engineering', duration: '4 Years' },
  { id: 2, name: 'Business Administration', faculty: 'Business', duration: '4 Years' },
  { id: 3, name: 'Clinical Psychology', faculty: 'Health Sciences', duration: '5 Years' },
  { id: 4, name: 'International Relations', faculty: 'Humanities', duration: '3 Years' },
  { id: 5, name: 'Sustainable Architecture', faculty: 'Engineering', duration: '4 Years' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [programs, setPrograms] = useState(INITIAL_PROGRAMS);
  const [formState, setFormState] = useState({ name: '', email: '', program: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [filter, setFilter] = useState('');

  const filteredPrograms = programs.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) || 
    p.faculty.toLowerCase().includes(filter.toLowerCase())
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setFormState({ name: '', email: '', program: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">Apex University</span>
            </div>
            <div className="hidden md:flex gap-8 font-medium">
              {['Programs', 'Admissions', 'Campus', 'Research'].map(item => (
                <button key={item} className="hover:text-indigo-600 transition-colors">{item}</button>
              ))}
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-all">
              Apply Now
            </button>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-1 rounded-full mb-6 text-sm">
            <Bell size={16} /> Deadline for Fall Enrollment: August 15th
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Shape Your Future at Apex</h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Where academic excellence meets global innovation. Join our diverse community of scholars.</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold hover:bg-slate-100 transition-colors">View Courses</button>
            <button className="border border-slate-700 px-8 py-4 rounded-lg font-bold hover:bg-slate-800 transition-colors">Take a Tour</button>
          </div>
        </div>
      </header>

      {/* Programs Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Academic Programs</h2>
            <p className="text-slate-600">Find your passion across our 5 world-class faculties.</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search programs..." 
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {filteredPrograms.map(p => (
            <div key={p.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
              <BookOpen className="text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-1">{p.name}</h3>
              <p className="text-indigo-600 text-sm mb-4">{p.faculty}</p>
              <div className="flex justify-between items-center text-slate-500 text-sm">
                <span>{p.duration}</span>
                <button className="flex items-center gap-1 font-semibold text-slate-900">Details <ArrowRight size={16} /></button>
              </div>
            </div>
          ))}
          {filteredPrograms.length === 0 && <p className="text-center col-span-3 py-10">No programs found.</p>}
        </div>
      </section>

      {/* Request Info Form */}
      <section className="py-20 bg-indigo-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-indigo-100">
            <h2 className="text-3xl font-bold mb-6">Request Information</h2>
            {formStatus === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Request Received!</h3>
                <p className="text-slate-600">Our admissions team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <input 
                  required
                  placeholder="Full Name"
                  className="w-full p-4 border rounded-lg"
                  value={formState.name}
                  onChange={e => setFormState({...formState, name: e.target.value})}
                />
                <input 
                  required
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 border rounded-lg"
                  value={formState.email}
                  onChange={e => setFormState({...formState, email: e.target.value})}
                />
                <button 
                  disabled={formStatus === 'loading'}
                  className="w-full bg-indigo-600 text-white p-4 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50"
                >
                  {formStatus === 'loading' ? 'Sending...' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4">Apex University</h4>
            <p className="text-sm">123 Academic Way<br/>Innovation City, CA 94000</p>
          </div>
          {['Admissions', 'Resources', 'Support'].map(section => (
            <div key={section}>
              <h4 className="text-white font-bold mb-4">{section}</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-white">Contact</button></li>
                <li><button className="hover:text-white">Careers</button></li>
                <li><button className="hover:text-white">FAQ</button></li>
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}