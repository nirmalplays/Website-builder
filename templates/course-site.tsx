import React, { useState } from 'react';
import { 
  CheckCircle, 
  Star, 
  ChevronDown, 
  ChevronRight, 
  Play, 
  Shield, 
  Users, 
  Clock, 
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  const curriculum = [
    { title: "Foundations of UI Design", lessons: 6 },
    { title: "Design Systems & Tokens", lessons: 8 },
    { title: "Responsive Layout Patterns", lessons: 5 },
    { title: "Advanced Prototyping in Figma", lessons: 9 },
    { title: "Typography & Visual Hierarchy", lessons: 4 },
    { title: "Accessibility & Inclusive Design", lessons: 7 },
    { title: "Handover & Developer Collaboration", lessons: 5 },
    { title: "Building Your Professional Portfolio", lessons: 6 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-indigo-600">DesignMaster</div>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#curriculum" className="hover:text-indigo-600">Curriculum</a>
            <a href="#testimonials" className="hover:text-indigo-600">Reviews</a>
            <a href="#pricing" className="hover:text-indigo-600">Pricing</a>
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition">Enroll Now</button>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-4">
              <Star className="fill-indigo-600" size={18} />
              <span>4.9/5 Rating from 2,500+ Students</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">Master Modern UI Design in 8 Weeks</h1>
            <p className="text-xl text-slate-600 mb-8">Go from beginner to job-ready designer. Learn industry-standard workflows, Figma mastery, and how to build high-converting interfaces.</p>
            <div className="flex gap-4">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition flex items-center gap-2">
                Start Learning Today <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800" 
            alt="UI Design Workspace" 
            className="rounded-2xl shadow-2xl"
          />
        </div>
      </header>

      {/* Curriculum */}
      <section id="curriculum" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Course Curriculum</h2>
          <div className="space-y-4">
            {curriculum.map((mod, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100"
                  onClick={() => setOpenModule(openModule === idx ? null : idx)}
                >
                  <span className="font-semibold">{mod.title}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500">{mod.lessons} Lessons</span>
                    {openModule === idx ? <ChevronDown size={20}/> : <ChevronRight size={20}/>}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-indigo-900 rounded-3xl p-12 text-white flex flex-col md:flex-row gap-8 items-center">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" className="w-40 h-40 rounded-full object-cover border-4 border-indigo-700" alt="Instructor" />
          <div>
            <h3 className="text-2xl font-bold mb-2">Meet Your Instructor: Sarah Jenkins</h3>
            <p className="text-indigo-200 mb-6 italic">Lead Product Designer at TechFlow with 12+ years of experience building scalable design systems for Fortune 500 companies.</p>
            <div className="flex gap-6 text-sm">
              <span className="flex items-center gap-2"><Users size={16}/> 15k+ Students mentored</span>
              <span className="flex items-center gap-2"><Clock size={16}/> 500+ hours of content</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-xl mx-auto bg-white p-10 rounded-2xl border border-slate-200 shadow-sm text-center">
          <h2 className="text-3xl font-bold mb-4">Lifetime Access</h2>
          <div className="text-6xl font-extrabold mb-2">$299</div>
          <p className="text-slate-500 mb-8">One-time payment, includes all future updates</p>
          <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition mb-6">Enroll Now</button>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
            <Shield size={16} /> 30-day money-back guarantee
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-white font-bold text-xl mb-4">DesignMaster</div>
            <p className="text-sm">Empowering the next generation of digital product designers.</p>
          </div>
          <div><h4 className="text-white font-bold mb-4">Company</h4><p className="text-sm">About Us<br/>Careers<br/>Blog</p></div>
          <div><h4 className="text-white font-bold mb-4">Support</h4><p className="text-sm">Help Center<br/>Terms of Service<br/>Privacy</p></div>
          <div><h4 className="text-white font-bold mb-4">Contact</h4><p className="text-sm">hello@designmaster.com<br/>San Francisco, CA</p></div>
        </div>
      </footer>
    </div>
  );
}