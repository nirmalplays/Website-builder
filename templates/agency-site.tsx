import React, { useState } from 'react';
import { 
  ArrowRight, Zap, Target, Palette, Code, BarChart3, Users, 
  Star, ChevronRight, Menu, X, Shield, Sparkles 
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    { icon: <Palette className="w-8 h-8" />, title: "Brand Identity", desc: "Crafting visual languages that resonate with your core audience." },
    { icon: <Code className="w-8 h-8" />, title: "Web Development", desc: "High-performance websites built for scale and modern experiences." },
    { icon: <Target className="w-8 h-8" />, title: "Digital Strategy", desc: "Data-driven roadmaps to navigate the complex digital landscape." },
    { icon: <Zap className="w-8 h-8" />, title: "Motion Design", desc: "Bringing static concepts to life through fluid animation." },
    { icon: <BarChart3 className="w-8 h-8" />, title: "Growth Marketing", desc: "Precision-targeted campaigns that drive measurable conversion." },
    { icon: <Shield className="w-8 h-8" />, title: "Content Security", desc: "Protecting your digital assets with robust infrastructure." }
  ];

  const projects = [
    { title: "Neon Pulse", category: "App UI", img: "https://images.unsplash.com/photo-1551650975-87de1940e457?auto=format&fit=crop&q=80&w=800" },
    { title: "Summit Gear", category: "E-commerce", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800" },
    { title: "EcoFlow", category: "Sustainability", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" },
    { title: "Velocity AI", category: "Tech Platform", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
    { title: "Urban Oasis", category: "Architecture", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
    { title: "Zenith Sound", category: "Audio Brand", img: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter text-indigo-600">LUMINA.</div>
          <div className="hidden md:flex gap-8 font-medium text-slate-600">
            {['Services', 'Work', 'Team', 'Contact'].map(link => (
              <a key={link} href="#" className="hover:text-indigo-600 transition-colors">{link}</a>
            ))}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 mr-2" /> We build future-ready brands
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Digital craftsmanship for <span className="text-indigo-600">ambitious ventures.</span>
          </h1>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            We merge cutting-edge technology with human-centric design to create products that people actually want to use.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition">View Our Work</button>
            <button className="border border-slate-200 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition">Let's Talk</button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Our Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition">
                <div className="text-indigo-600 mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold">Selected Work</h2>
            <a href="#" className="text-indigo-600 font-semibold flex items-center hover:gap-2 transition-all">View All Projects <ArrowRight className="ml-2 w-4 h-4" /></a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={i} className="group cursor-pointer overflow-hidden rounded-2xl">
                <img src={p.img} alt={p.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="p-4">
                  <p className="text-sm text-indigo-600 font-semibold">{p.category}</p>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Star className="w-12 h-12 text-yellow-400 mx-auto mb-8" />
          <p className="text-2xl md:text-3xl font-light italic mb-8">
            "Lumina transformed our vision into a cohesive digital ecosystem. Their attention to detail and strategic foresight are truly unmatched in the industry."
          </p>
          <div className="flex items-center justify-center gap-4">
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200" className="w-12 h-12 rounded-full" alt="CEO" />
            <div className="text-left">
              <p className="font-bold">Marcus Thorne</p>
              <p className="text-indigo-300">CEO, Velocity Systems</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <h4 className="font-bold text-lg mb-4">Lumina Agency</h4>
            <p className="text-slate-500 text-sm">Building the future of digital experiences since 2015.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li>Design</li><li>Development</li><li>Strategy</li><li>Branding</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li>Our Story</li><li>Careers</li><li>Press</li><li>Privacy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram'].map(s => (
                <div key={s} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-indigo-600 hover:text-white transition">
                  <span className="text-[10px] font-bold">{s[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}