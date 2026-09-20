import React, { useState } from 'react';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  GraduationCap, 
  MapPin, 
  Star, 
  ChevronRight,
  Mail,
  Shield,
  Zap,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const programs = [
    { faculty: "Engineering", name: "Robotics & AI Systems", icon: Zap },
    { faculty: "Business", name: "Global Finance & Strategy", icon: BookOpen },
    { faculty: "Arts", name: "Digital Media Design", icon: Star },
    { faculty: "Science", name: "Environmental Biology", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-indigo-700">Horizon Univ.</div>
          <div className="hidden md:flex gap-8 font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600">Academics</a>
            <a href="#" className="hover:text-indigo-600">Admissions</a>
            <a href="#" className="hover:text-indigo-600">Campus</a>
          </div>
          <button className="bg-indigo-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-800 transition">
            Apply Now
          </button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full mb-6 font-medium">
            <Clock size={16} />
            <span>Fall 2024 Deadline: May 15th</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-tight">
            Shape Your Future at <br/><span className="text-indigo-700">Horizon University</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Join a global community of innovators, researchers, and leaders. Excellence in education starts here.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2">
              Explore Programs <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Programs Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Faculty & Programmes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((p, i) => (
              <div key={i} className="p-8 border border-slate-200 rounded-2xl hover:border-indigo-300 transition group">
                <p className="text-indigo-600 font-semibold mb-2">{p.faculty}</p>
                <h3 className="text-xl font-bold mb-6">{p.name}</h3>
                <button className="text-indigo-700 font-medium flex items-center gap-2 group-hover:gap-4 transition-all">
                  Learn more <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions & Dates */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Admissions Requirements</h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3"><CheckCircle /> Completed Application Form</li>
              <li className="flex gap-3"><CheckCircle /> Official Academic Transcripts</li>
              <li className="flex gap-3"><CheckCircle /> Two Letters of Recommendation</li>
              <li className="flex gap-3"><CheckCircle /> Personal Statement (500 words)</li>
            </ul>
          </div>
          <div className="bg-white text-slate-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">Key Dates</h3>
            <div className="space-y-6">
              {[
                { date: "May 15", desc: "Fall Application Deadline" },
                { date: "June 01", desc: "Scholarship Decision Date" },
                { date: "Aug 28", desc: "Orientation Week Begins" }
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-4 border-b pb-4">
                  <div className="bg-indigo-100 text-indigo-700 p-3 rounded-lg font-bold">{d.date}</div>
                  <p className="font-semibold">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Student Experiences</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Jenkins", role: "Engineering Senior", quote: "The research opportunities here allowed me to work on actual robotics prototypes before graduating." },
              { name: "Marcus Chen", role: "Business Graduate", quote: "The mentorship program provided me with connections that landed me my dream internship at a top firm." },
              { name: "Elena Rossi", role: "Arts Sophomore", quote: "The campus culture is incredibly inclusive and creative. I've never felt more at home." }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <Star className="text-yellow-400 mb-4 fill-yellow-400" />
                <p className="text-slate-600 italic mb-6">"{t.quote}"</p>
                <p className="font-bold">{t.name}</p>
                <p className="text-indigo-600 text-sm">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 px-6 bg-indigo-50">
        <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold mb-2">Request Information</h2>
          <p className="text-slate-600 mb-8">Get the latest brochure and program details sent to your inbox.</p>
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full p-4 border rounded-xl" />
            <input type="email" placeholder="Email Address" className="w-full p-4 border rounded-xl" />
            <select className="w-full p-4 border rounded-xl">
              <option>Interested Program</option>
              <option>Robotics & AI</option>
              <option>Global Business</option>
            </select>
            <button className="w-full bg-indigo-700 text-white py-4 rounded-xl font-bold hover:bg-indigo-800">
              Submit Request
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="text-white text-xl font-bold mb-4">Horizon Univ.</div>
            <p>123 Academy Way, Innovation City</p>
          </div>
          <div className="flex gap-12">
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>Admissions</li>
                <li>Tuition</li>
                <li>Faculty</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CheckCircle() {
  return <div className="text-indigo-400"><Shield size={20} /></div>;
}