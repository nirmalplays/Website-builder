import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ChevronDown, 
  ChevronRight, 
  Star, 
  Play, 
  Users, 
  Clock, 
  Shield, 
  ArrowRight, 
  Menu, 
  X,
  CreditCard,
  BookOpen
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  const curriculum = [
    { title: "Introduction to Full Stack Architecture", lessons: 4 },
    { title: "Mastering React Hooks & State Management", lessons: 8 },
    { title: "Advanced CSS with Tailwind Mastery", lessons: 6 },
    { title: "Backend Development with Node.js", lessons: 9 },
    { title: "Database Design & PostgreSQL", lessons: 5 },
    { title: "Authentication & Security Best Practices", lessons: 7 },
    { title: "Deployment & CI/CD Pipelines", lessons: 4 },
    { title: "Final Capstone Project: SaaS Platform", lessons: 5 }
  ];

  const handleEnroll = () => {
    setLoading(true);
    setTimeout(() => {
      setEnrolled(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <BookOpen /> DevMastery
          </div>
          <div className="hidden md:flex gap-8 font-medium text-slate-600">
            <a href="#curriculum" className="hover:text-indigo-600">Curriculum</a>
            <a href="#instructor" className="hover:text-indigo-600">Instructor</a>
            <a href="#pricing" className="hover:text-indigo-600">Pricing</a>
          </div>
          <button 
            onClick={handleEnroll}
            className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-indigo-700 transition"
          >
            {enrolled ? "Enrolled" : "Enroll Now"}
          </button>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1 text-amber-500 mb-6 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            <Star className="w-4 h-4 fill-amber-500" /> 4.9/5 Rating from 1,200+ Students
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900">
            Build Modern SaaS Apps from <span className="text-indigo-600">Zero to Hero</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Master React, Node.js, and PostgreSQL. Join 5,000+ developers who leveled up their careers with our project-based curriculum.
          </p>
          <button 
            onClick={handleEnroll}
            disabled={loading || enrolled}
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition flex items-center gap-2 mx-auto disabled:opacity-50"
          >
            {loading ? "Processing..." : enrolled ? "You are enrolled!" : "Start Your Journey Today"} <ArrowRight />
          </button>
        </div>
      </header>

      {/* Curriculum */}
      <section id="curriculum" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Course Curriculum</h2>
          <div className="space-y-3">
            {curriculum.map((mod, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition text-left font-semibold"
                >
                  {mod.title}
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500 font-normal">{mod.lessons} Lessons</span>
                    {activeAccordion === idx ? <ChevronDown /> : <ChevronRight />}
                  </div>
                </button>
                {activeAccordion === idx && (
                  <div className="p-4 border-t border-slate-200 text-slate-600 text-sm">
                    In this module, you will learn professional practices including testing, debugging, and industry-standard architecture patterns.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section id="instructor" className="py-20 bg-slate-900 text-white px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" 
            alt="Instructor" 
            className="w-48 h-48 rounded-full object-cover border-4 border-indigo-500"
          />
          <div>
            <h3 className="text-2xl font-bold mb-2">Meet Marcus Thorne</h3>
            <p className="text-indigo-400 font-semibold mb-4">Senior Software Architect & Ex-Google Engineer</p>
            <p className="text-slate-400 leading-relaxed">
              With over 12 years of experience building scalable systems, Marcus has mentored hundreds of developers at top-tier startups. He believes in teaching through building, ensuring every student leaves with a production-ready portfolio.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
          <h2 className="text-2xl font-bold mb-2">Full Lifetime Access</h2>
          <div className="text-5xl font-extrabold my-6">$199</div>
          <ul className="space-y-4 mb-8 text-left">
            {['All 8 Modules', 'Project Source Code', 'Private Community Access', 'Certificate of Completion'].map(item => (
              <li key={item} className="flex items-center gap-3"><Check className="text-green-500" /> {item}</li>
            ))}
          </ul>
          <button 
            onClick={handleEnroll}
            disabled={enrolled}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition"
          >
            {enrolled ? "Already Enrolled" : "Get Instant Access"}
          </button>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
            <Shield size={16} /> 30-Day Money Back Guarantee
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 text-center text-slate-500">
        <p>&copy; 2024 DevMastery Academy. All rights reserved.</p>
      </footer>
    </div>
  );
}