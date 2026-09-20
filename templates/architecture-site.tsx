import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, Mail, MapPin, Phone, Award, 
  BookOpen, Users, Building2, ChevronRight, CheckCircle 
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [projects] = useState([
    { id: 1, name: 'Lumina Pavilion', year: '2023', type: 'Public', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Haven Residencies', year: '2022', type: 'Residential', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'Urban Nexus', year: '2024', type: 'Commercial', img: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'Echo Library', year: '2021', type: 'Civic', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1200);
  };

  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(p => p.type === activeTab);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full bg-stone-50/90 backdrop-blur-sm z-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold tracking-tighter">ARCHITECTS COLLECTIVE</span>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
            {['Works', 'Philosophy', 'Services', 'Contact'].map(link => (
              <button key={link} onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-700 transition-colors">
                {link}
              </button>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-8 leading-[0.9]">Designing <br />the future <br />of space.</h1>
        <div className="relative h-[500px] w-full overflow-hidden rounded-sm">
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1600" alt="Architecture" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Works */}
      <section id="works" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-light">Selected Works</h2>
          <div className="flex gap-4">
            {['All', 'Public', 'Residential', 'Commercial'].map(cat => (
              <button key={cat} onClick={() => setActiveTab(cat)} className={`text-sm ${activeTab === cat ? 'text-amber-700 underline' : 'text-stone-400'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map(p => (
            <div key={p.id} className="group cursor-pointer">
              <div className="overflow-hidden mb-4">
                <img src={p.img} alt={p.name} className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="text-sm text-stone-500">{p.year} / {p.type}</p>
              <h3 className="text-2xl font-medium">{p.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="bg-stone-900 text-stone-100 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-light mb-8">Our Philosophy</h2>
          <p className="text-lg leading-relaxed text-stone-300">
            We believe architecture is the bridge between human experience and the built environment. Every project we undertake is rooted in sustainability, material honesty, and a profound respect for the site's history. We don't just build structures; we curate atmospheres that stand the test of time.
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-light mb-16">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'Master Planning', desc: 'Large scale urban integration and site analysis.' },
            { title: 'Architecture', desc: 'Full lifecycle design from concept to construction.' },
            { title: 'Interior Design', desc: 'Crafting bespoke environments with attention to detail.' }
          ].map((s, i) => (
            <div key={i} className="border-t border-stone-300 pt-6">
              <h4 className="text-xl font-medium mb-2">{s.title}</h4>
              <p className="text-stone-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-stone-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-light mb-8">Let's Talk</h2>
            <p className="mb-8 text-stone-600">Have a project in mind? We'd love to collaborate with you.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><MapPin size={18} /> 123 Design District, New York, NY</div>
              <div className="flex items-center gap-3"><Mail size={18} /> studio@architectscollective.com</div>
              <div className="flex items-center gap-3"><Phone size={18} /> (212) 555-0199</div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {formStatus === 'success' ? (
              <div className="p-6 bg-green-100 text-green-800 rounded flex items-center gap-2">
                <CheckCircle /> Message sent successfully!
              </div>
            ) : (
              <>
                <input required type="text" placeholder="Name" className="w-full p-4 border border-stone-300 bg-white" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} />
                <input required type="email" placeholder="Email" className="w-full p-4 border border-stone-300 bg-white" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} />
                <textarea required placeholder="Message" rows={4} className="w-full p-4 border border-stone-300 bg-white" value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} />
                <button disabled={formStatus === 'loading'} type="submit" className="bg-stone-900 text-white px-8 py-4 w-full uppercase tracking-widest hover:bg-amber-700 transition-colors disabled:opacity-50">
                  {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-sm text-stone-500 border-t border-stone-200">
        © 2024 Architects Collective. All rights reserved.
      </footer>
    </div>
  );
}