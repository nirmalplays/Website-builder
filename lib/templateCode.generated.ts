// GENERATED FILE - do not edit.
// Run: node scripts/bake-templates.mjs && node scripts/build-template-index.mjs
// Source of truth is templates/*.tsx

export const TEMPLATE_CODE: Record<string, string> = {
  "agency-site": `import React, { useState } from 'react';
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
}`,

  "blog-site": `import React, { useState } from 'react';
import { 
  Search, Menu, User, TrendingUp, Clock, ChevronRight, 
  Mail, ArrowRight, Zap, Shield, Star, Calendar 
} from 'lucide-react';

const articles = [
  { id: 1, title: "The Future of Sustainable Architecture", category: "Design", author: "Elena Vance", time: "6 min read", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" },
  { id: 2, title: "Mastering TypeScript Generics", category: "Tech", author: "Marcus Chen", time: "12 min read", image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea" },
  { id: 3, title: "Morning Routines of CEOs", category: "Business", author: "Sarah Jenkins", time: "8 min read", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf" },
  { id: 4, title: "Hidden Gems in the Swiss Alps", category: "Travel", author: "David Miller", time: "5 min read", image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb" },
  { id: 5, title: "The Rise of Decentralized Finance", category: "Finance", author: "Aisha Khan", time: "15 min read", image: "https://images.unsplash.com/photo-1605792657660-596af9009e82" },
  { id: 6, title: "Modernist Interior Design Trends", category: "Design", author: "Elena Vance", time: "7 min read", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e" },
  { id: 7, title: "Optimizing Database Performance", category: "Tech", author: "Marcus Chen", time: "10 min read", image: "https://images.unsplash.com/photo-1558494949-ef010bbbb317" },
  { id: 8, title: "How to Build a Resilient Brand", category: "Business", author: "Sarah Jenkins", time: "9 min read", image: "https://images.unsplash.com/photo-1552664730-d307ca884978" },
  { id: 9, title: "Solo Hiking Tips for Beginners", category: "Travel", author: "David Miller", time: "4 min read", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1" },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Design", "Tech", "Business", "Travel", "Finance"];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-bold tracking-tight text-indigo-600">INSIGHT.</div>
            <div className="hidden md:flex space-x-8 font-medium">
              {categories.map(cat => (
                <button key={cat} className="hover:text-indigo-600 transition-colors">{cat}</button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 cursor-pointer hover:text-indigo-600" />
              <User className="w-5 h-5 cursor-pointer hover:text-indigo-600" />
              <Menu className="md:hidden w-6 h-6" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <div className="relative rounded-3xl overflow-hidden h-[500px]">
            <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174" alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10 text-white">
              <span className="bg-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider self-start mb-4">Featured</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">The Next Decade of Digital Transformation</h1>
              <p className="text-lg text-gray-200 max-w-2xl mb-6">Explore how AI, cloud computing, and sustainable practices are reshaping the global corporate landscape in 2024 and beyond.</p>
              <button className="flex items-center text-indigo-300 hover:text-white font-semibold transition-colors">
                Read Full Story <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="text-indigo-600 text-xs font-bold uppercase tracking-wider">{article.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-4 leading-snug">{article.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center"><User className="w-4 h-4 mr-2" /> {article.author}</div>
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {article.time}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-10">
            <div className="bg-white p-8 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold mb-6 flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-indigo-600" /> Popular Posts</h3>
              {articles.slice(0, 3).map((post) => (
                <div key={post.id} className="group flex items-start space-x-4 mb-6">
                  <img src={post.image} className="w-16 h-16 rounded-lg object-cover" alt="" />
                  <div>
                    <h4 className="font-semibold text-sm group-hover:text-indigo-600 cursor-pointer">{post.title}</h4>
                    <span className="text-xs text-gray-400">Oct 24, 2024</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-indigo-900 p-8 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-2">Join our Newsletter</h3>
              <p className="text-indigo-200 text-sm mb-6">Get the latest insights delivered straight to your inbox.</p>
              <div className="space-y-3">
                <input type="email" placeholder="email@address.com" className="w-full px-4 py-3 rounded-lg bg-indigo-800 border-none text-white placeholder-indigo-400 focus:ring-2 focus:ring-white outline-none" />
                <button className="w-full bg-white text-indigo-900 font-bold py-3 rounded-lg hover:bg-indigo-50 transition-colors">Subscribe</button>
              </div>
            </div>
          </aside>
        </div>

        <div className="flex justify-center mt-16 space-x-2">
          {[1, 2, 3].map(n => (
            <button key={n} className={\`w-10 h-10 rounded-lg flex items-center justify-center \${n === 1 ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}\`}>
              {n}
            </button>
          ))}
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 text-sm">
          <div>
            <h2 className="text-white font-bold text-xl mb-4">INSIGHT.</h2>
            <p>Delivering high-quality perspectives on design, technology, and business since 2018.</p>
          </div>
          <div><h4 className="text-white font-bold mb-4">Explore</h4><ul className="space-y-2"><li>Design</li><li>Technology</li><li>Business</li></ul></div>
          <div><h4 className="text-white font-bold mb-4">Support</h4><ul className="space-y-2"><li>Contact</li><li>Privacy Policy</li><li>Terms of Service</li></ul></div>
          <div><h4 className="text-white font-bold mb-4">Social</h4><ul className="space-y-2"><li>Twitter</li><li>LinkedIn</li><li>Instagram</li></ul></div>
        </div>
      </footer>
    </div>
  );
}`,

  "clinic-site": `import React, { useState } from 'react';
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
    { icon: <Baby className="w-8 h-8 text-emerald-600" />, title: 'Pediatrics', desc: 'Gentle, specialized care for your children\\'s growth and health.' },
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
}`,

  "conference-site": `import React, { useState } from 'react';
import { 
  Calendar, MapPin, Clock, Users, ArrowRight, Check, X, 
  ChevronDown, Star, Zap, Shield, Mail, Menu 
} from 'lucide-react';

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const speakers = [
    { name: "Dr. Aris Thorne", role: "AI Ethics Lead", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200" },
    { name: "Elena Vance", role: "Cloud Architect", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200" },
    { name: "Marcus Chen", role: "UX Strategist", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200" },
    { name: "Sarah Jenkins", role: "Data Scientist", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200" },
    { name: "David Okafor", role: "Security Expert", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200" },
    { name: "Nina Petrov", role: "DevOps Engineer", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200" },
    { name: "Jameson Lee", role: "Product Visionary", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200" },
    { name: "Sophia Rossi", role: "Founder, TechFlow", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200" },
  ];

  const faqs = [
    { q: "What is included in the VIP ticket?", a: "VIP includes front-row access, an exclusive networking dinner with speakers, and a lifetime recording pass." },
    { q: "Is there a remote attendance option?", a: "Yes, we offer a Virtual Pass that provides live-stream access to all keynote sessions and breakout tracks." },
    { q: "Can I get a refund?", a: "Refunds are available up to 30 days before the conference date, minus a small processing fee." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600 tracking-tight">SYNAPSE 2025</span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-indigo-600">About</a>
            <a href="#speakers" className="hover:text-indigo-600">Speakers</a>
            <a href="#agenda" className="hover:text-indigo-600">Agenda</a>
            <a href="#tickets" className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition">Get Tickets</a>
          </div>
          <Menu className="md:hidden" />
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">Innovating the Future<br/><span className="text-indigo-600">Together.</span></h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 text-slate-600">
          <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-indigo-500" /> October 12–14, 2025</div>
          <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-indigo-500" /> San Francisco, CA</div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-2xl mx-auto inline-block">
          <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">Countdown to Launch</p>
          <div className="flex justify-center gap-8 text-3xl font-bold">
            <div>12<span className="block text-xs font-normal text-slate-500">Days</span></div>
            <div>08<span className="block text-xs font-normal text-slate-500">Hours</span></div>
            <div>45<span className="block text-xs font-normal text-slate-500">Mins</span></div>
          </div>
        </div>
      </header>

      {/* About */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Why Attend Synapse?</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Synapse is the premier annual gathering for the next generation of engineers, designers, and entrepreneurs. 
            We bridge the gap between emerging technology and real-world application, providing a platform to share 
            breakthroughs and solve the most pressing challenges of our digital age.
          </p>
        </div>
      </section>

      {/* Speakers */}
      <section id="speakers" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet the Visionaries</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {speakers.map((s, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition">
                <img src={s.img} alt={s.name} className="w-full aspect-square object-cover rounded-xl mb-4" />
                <h3 className="font-bold text-lg">{s.name}</h3>
                <p className="text-sm text-indigo-600">{s.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tickets */}
      <section id="tickets" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { tier: "General", price: "$499", features: ["Access to all talks", "Networking lounge", "Lunch included"] },
            { tier: "Pro", price: "$899", features: ["Everything in General", "Workshop access", "Priority seating"] },
            { tier: "VIP", price: "$1499", features: ["Everything in Pro", "Speaker dinner", "Lifetime video access"] }
          ].map((t, i) => (
            <div key={i} className={\`p-8 rounded-3xl border \${i === 1 ? 'border-indigo-600 shadow-xl' : 'border-slate-200'}\`}>
              <h3 className="text-xl font-bold mb-2">{t.tier}</h3>
              <div className="text-4xl font-bold mb-6">{t.price}</div>
              <ul className="space-y-3 mb-8">
                {t.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-slate-600"><Check className="w-4 h-4 text-indigo-500" /> {f}</li>)}
              </ul>
              <button className="w-full py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-indigo-600 transition">Select Plan</button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full justify-between font-bold">
                  {f.q}
                  <ChevronDown className={\`transition \${openFaq === i ? 'rotate-180' : ''}\`} />
                </button>
                {openFaq === i && <p className="mt-4 text-slate-600 text-sm leading-relaxed">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400 text-center">
        <p className="mb-4 text-white font-bold">SYNAPSE 2025</p>
        <p className="text-sm">© 2025 Synapse Conference. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-6">
          <Mail className="cursor-pointer hover:text-white" />
          <Star className="cursor-pointer hover:text-white" />
        </div>
      </footer>
    </div>
  );
}`,

  "course-site": `import React, { useState } from 'react';
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
}`,

  "ecommerce-site": `import React, { useState } from 'react';
import { 
  Search, ShoppingCart, Star, ArrowRight, Menu, Zap, Shield, 
  CreditCard, Mail, ChevronRight, Package, TrendingUp, User
} from 'lucide-react';

const products = [
  { id: 1, name: "Summit Alpine Backpack", price: 129.99, rating: 5, img: "https://images.unsplash.com/photo-1622560480654-d9f2140b88d8?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Meridian Wireless Buds", price: 89.50, rating: 4, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "AeroCore Running Shoes", price: 159.00, rating: 5, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Luminary Desk Lamp", price: 45.00, rating: 4, img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Urban Nomad Jacket", price: 199.99, rating: 5, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Titanium Travel Mug", price: 32.00, rating: 4, img: "https://images.unsplash.com/photo-1517093678835-75c081794270?auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "Zenith Yoga Mat", price: 55.00, rating: 5, img: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=400&q=80" },
  { id: 8, name: "Focus Mechanical Keyboard", price: 149.00, rating: 5, img: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=400&q=80" },
];

export default function App() {
  const [cartCount] = useState(3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-blue-600 fill-blue-600" />
            <span className="text-xl font-bold tracking-tight">VELOCITY</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600">New Arrivals</a>
            <a href="#" className="hover:text-blue-600">Categories</a>
            <a href="#" className="hover:text-blue-600">Support</a>
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-slate-400 cursor-pointer" />
            <div className="relative">
              <ShoppingCart className="w-5 h-5 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{cartCount}</span>
            </div>
            <Menu className="md:hidden w-5 h-5" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32 flex flex-col items-start gap-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-xs font-semibold uppercase tracking-wider">Summer Essentials</span>
          <h1 className="text-5xl lg:text-7xl font-extrabold max-w-2xl leading-tight">Elevate Your Daily Routine.</h1>
          <p className="text-lg text-slate-300 max-w-lg">Discover curated quality goods designed for the modern lifestyle. Fast shipping, guaranteed satisfaction.</p>
          <button className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-100 transition">
            Shop Collection <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Tech', 'Apparel', 'Home', 'Fitness'].map((cat) => (
            <div key={cat} className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer">
              <img src={\`https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80\`} alt={cat} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-bold">{cat}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Best Sellers</h2>
          <button className="text-blue-600 font-semibold flex items-center gap-1 hover:underline">View All <ChevronRight className="w-4 h-4" /></button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded-2xl border border-slate-100 hover:shadow-lg transition">
              <img src={p.img} alt={p.name} className="w-full h-48 object-cover rounded-xl mb-4" />
              <h3 className="font-semibold text-slate-800 mb-1">{p.name}</h3>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(p.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">\${p.price}</span>
                <button className="bg-slate-900 text-white p-2 rounded-lg hover:bg-blue-600">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sale Banner */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Flash Sale: Up to 40% Off</h2>
            <p className="text-blue-100">Don't miss out on your favorite items. Limited stock available.</p>
          </div>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-slate-100">Shop Sale Now</button>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Loved by Thousands</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Jenkins", text: "The quality of the backpack is unmatched. Perfect for my daily commute!" },
            { name: "Mark Peterson", text: "Fastest shipping I've ever experienced. Great product range too." },
            { name: "Elena Rodriguez", text: "Absolutely love my new running shoes. My feet have never felt better." }
          ].map((r, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100">
              <div className="flex gap-1 mb-4 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" />
              </div>
              <p className="text-slate-600 mb-4">"{r.text}"</p>
              <div className="font-bold text-sm">— {r.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-xl mx-auto px-4 text-center">
          <Mail className="w-10 h-10 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Join our Newsletter</h2>
          <p className="text-slate-500 mb-6">Get 10% off your first order and stay updated on new drops.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Zap className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-lg">VELOCITY</span>
            </div>
            <p className="text-sm">Modern living, redefined. Your one-stop shop for premium goods.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>Track Order</li>
              <li>Returns</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold">Secure Payments</h4>
            <div className="flex gap-4">
              <CreditCard className="w-8 h-8" />
              <Shield className="w-8 h-8" />
              <Package className="w-8 h-8" />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
          © 2024 Velocity Retail Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}`,

  "gym-site": `import React, { useState } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Zap, 
  Shield, 
  ChevronRight, 
  Menu, 
  X,
  TrendingUp,
  MapPin
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const schedule = {
    Monday: ["06:00 AM - HIIT Burn", "05:30 PM - Power Yoga"],
    Tuesday: ["07:00 AM - Strength", "06:00 PM - CrossFit"],
    Wednesday: ["06:00 AM - HIIT Burn", "05:30 PM - Pilates"],
    Thursday: ["07:00 AM - Strength", "06:00 PM - CrossFit"],
    Friday: ["06:00 AM - HIIT Burn", "04:00 PM - Recovery Flow"]
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Nav */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter text-orange-600">APEX<span className="text-slate-900">FIT</span></div>
        <div className="hidden md:flex gap-8 font-medium text-sm uppercase tracking-widest">
          {['Schedule', 'Trainers', 'Pricing', 'Results'].map(item => (
            <a key={item} href={\`#\${item.toLowerCase()}\`} className="hover:text-orange-600 transition-colors">{item}</a>
          ))}
        </div>
        <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-700 transition-all">Join Now</button>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">Elevate Your Performance</span>
            <h1 className="text-6xl md:text-7xl font-extrabold mt-4 mb-6 leading-tight">Forge Your Best Self Today.</h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">Join the premier fitness community in the city. Expert coaching, world-class equipment, and a results-driven environment.</p>
            <div className="flex gap-4">
              <button className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-700">Get Started <ArrowRight size={20}/></button>
              <button className="border border-slate-300 px-8 py-4 rounded-lg font-bold hover:bg-slate-100">View Schedule</button>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" alt="Fitness training" className="rounded-2xl shadow-2xl" />
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Weekly Class Schedule</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {Object.entries(schedule).map(([day, classes]) => (
            <div key={day} className="border border-slate-200 rounded-xl p-4">
              <h3 className="font-bold text-orange-600 mb-4 pb-2 border-b">{day}</h3>
              {classes.map((c, i) => (
                <div key={i} className="text-sm py-2 text-slate-700 font-medium">{c}</div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Trainers */}
      <section id="trainers" className="py-20 bg-slate-900 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Meet Your Coaches</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Sarah Jenkins", role: "Head Coach", spec: "HIIT & Cardio" },
              { name: "Marcus Thorne", role: "Strength Lead", spec: "Powerlifting" },
              { name: "Elena Rossi", role: "Yoga Master", spec: "Mobility & Flow" },
              { name: "David Chen", role: "CrossFit Pro", spec: "Olympic Lifting" }
            ].map((t, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto bg-slate-700 mb-4 overflow-hidden border-4 border-orange-600">
                  <img src={\`https://i.pravatar.cc/150?u=\${t.name}\`} alt={t.name} />
                </div>
                <h4 className="font-bold text-lg">{t.name}</h4>
                <p className="text-orange-400 text-sm">{t.role}</p>
                <p className="text-slate-400 text-xs mt-2">{t.spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Membership Tiers</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Starter", price: "$49", perks: ["3 Classes/mo", "Open Gym", "App Access"] },
            { title: "Pro", price: "$99", perks: ["Unlimited Classes", "Towel Service", "Guest Passes", "Nutrition Plan"] },
            { title: "Elite", price: "$149", perks: ["Everything in Pro", "1-on-1 Coaching", "Sauna Access", "Swag Kit"] }
          ].map((p, i) => (
            <div key={i} className={\`p-8 rounded-2xl border \${i === 1 ? 'border-orange-600 shadow-xl' : 'border-slate-200'}\`}>
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <div className="text-4xl font-bold mb-6">{p.price}<span className="text-sm font-normal text-slate-500">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {p.perks.map(perk => <li key={perk} className="flex items-center gap-2"><CheckCircle size={18} className="text-orange-600"/> {perk}</li>)}
              </ul>
              <button className="w-full py-3 rounded-lg border font-bold hover:bg-slate-50">Select Plan</button>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section id="results" className="py-20 bg-slate-100 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Transformation Results</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6">
              <img src="https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=200&h=200&q=80" className="w-24 h-24 rounded-full object-cover" />
              <div>
                <p className="italic text-slate-700 mb-2">"Lost 30 lbs in 4 months. Apex changed my entire perspective on health and discipline. The community kept me accountable."</p>
                <p className="font-bold text-orange-600">— Jessica Miller</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80" className="w-24 h-24 rounded-full object-cover" />
              <div>
                <p className="italic text-slate-700 mb-2">"The strength program is unmatched. I've broken every personal record I had since joining. Best coaches in the business."</p>
                <p className="font-bold text-orange-600">— Robert Chen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-orange-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="mb-8 opacity-90">Sign up today and get your first week of classes completely free. No strings attached.</p>
          <form className="bg-white p-2 rounded-lg flex flex-col md:flex-row gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 text-slate-900 rounded-md focus:outline-none" />
            <button className="bg-slate-900 text-white px-8 py-3 rounded-md font-bold hover:bg-slate-800">Claim Trial</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-950 text-slate-400">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold text-white mb-4">APEXFIT</div>
            <p className="text-sm">Building stronger humans, one session at a time.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Studio</h4>
            <p className="text-sm">123 Fitness Way<br/>Los Angeles, CA 90210</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Hours</h4>
            <p className="text-sm">Mon-Fri: 5am - 9pm<br/>Sat-Sun: 8am - 2pm</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p className="text-sm">hello@apexfit.com<br/>(555) 123-4567</p>
          </div>
        </div>
      </footer>
    </div>
  );
}`,

  "nonprofit-site": `import React, { useState } from 'react';
import { Heart, Users, TrendingUp, Shield, ArrowRight, CheckCircle, Star, Mail, Zap } from 'lucide-react';

export default function App() {
  const [amount, setAmount] = useState<number>(50);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-2xl text-emerald-700">
          <Heart className="fill-emerald-700" />
          <span>KindredGlobal</span>
        </div>
        <div className="hidden md:flex gap-8 font-medium text-sm">
          <a href="#mission" className="hover:text-emerald-600 transition">Mission</a>
          <a href="#programs" className="hover:text-emerald-600 transition">Programs</a>
          <a href="#impact" className="hover:text-emerald-600 transition">Impact</a>
        </div>
        <button className="bg-emerald-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-800 transition shadow-lg">
          Donate Now
        </button>
      </nav>

      {/* Hero */}
      <header className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-950">
          Empowering communities, <span className="text-emerald-700">one child at a time.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
          We provide sustainable resources, clean water, and quality education to underserved regions across the globe. Join our mission to create a brighter future.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-800 flex items-center gap-2">
            Get Involved <ArrowRight size={20} />
          </button>
        </div>
      </header>

      {/* Stats */}
      <section id="impact" className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "12,000+", label: "Children Educated" },
            { val: "85", label: "Clean Water Wells" },
            { val: "40", label: "Countries Reached" },
            { val: "92%", label: "Funds to Programs" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-2">{stat.val}</div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Core Programs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Education First", icon: Star, desc: "Building schools and providing supplies for remote villages." },
            { title: "Clean Water", icon: Zap, desc: "Installing solar-powered filtration systems for safe drinking." },
            { title: "Healthcare Access", icon: Shield, desc: "Mobile clinics offering routine checkups and vaccinations." },
            { title: "Economic Growth", icon: TrendingUp, desc: "Micro-loans and vocational training for local entrepreneurs." },
          ].map((p, i) => (
            <div key={i} className="border border-slate-100 p-6 rounded-2xl hover:shadow-xl transition shadow-sm">
              <p.icon className="text-emerald-700 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6 bg-emerald-900 text-emerald-50">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=600" alt="Student" className="rounded-2xl w-64 h-64 object-cover shadow-2xl" />
          <div>
            <blockquote className="text-2xl font-light italic mb-6">
              "Before KindredGlobal came to our village, I had to walk five miles for water. Now, I spend those hours in school pursuing my dream of becoming a doctor."
            </blockquote>
            <cite className="font-bold text-lg not-italic text-emerald-300">— Amina, Student in Kenya</cite>
          </div>
        </div>
      </section>

      {/* Donation */}
      <section className="py-20 px-6 max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Fuel Our Mission</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[25, 50, 100].map(val => (
            <button 
              key={val}
              onClick={() => setAmount(val)}
              className={\`py-4 rounded-xl font-bold border-2 \${amount === val ? 'border-emerald-700 bg-emerald-50 text-emerald-700' : 'border-slate-200'}\`}
            >
              \${val}
            </button>
          ))}
        </div>
        <input 
          type="number" 
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-4 border border-slate-200 rounded-xl mb-6 text-center text-xl font-bold"
        />
        <button className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-800">
          Contribute \${amount} Today
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <p>© 2024 KindredGlobal Non-Profit. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Financials</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}`,

  "photography-site": `import React, { useState } from 'react';
import { Camera, Mail, Calendar, ChevronRight, Star, Zap, Shield, ArrowUpRight } from 'lucide-react';

export default function App() {
  const galleryImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e", title: "Urban Portraits" },
    { id: 2, src: "https://images.unsplash.com/photo-1554080353-a576cf803bda", title: "Golden Hour" },
    { id: 3, src: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07", title: "Street Life" },
    { id: 4, src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", title: "Candid Moments" },
    { id: 5, src: "https://images.unsplash.com/photo-1551632811-56eda731724d", title: "Studio Sessions" },
    { id: 6, src: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553", title: "Event Coverage" },
    { id: 7, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", title: "Natural Light" },
    { id: 8, src: "https://images.unsplash.com/photo-1519741497674-611481863552", title: "Editorial" },
    { id: 9, src: "https://images.unsplash.com/photo-1517841905240-472988babdf9", title: "Lifestyle" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tighter">ELARA VANCE</span>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#gallery" className="hover:text-amber-600 transition">Gallery</a>
            <a href="#services" className="hover:text-amber-600 transition">Services</a>
            <a href="#contact" className="hover:text-amber-600 transition">Enquire</a>
          </div>
        </div>
      </nav>

      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4" 
          alt="Hero background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl md:text-8xl font-serif mb-6">Capturing Essence.</h1>
          <p className="text-lg md:text-xl font-light opacity-90">Visual storytelling for brands and individuals.</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-24">
        <section id="gallery" className="mb-32">
          <h2 className="text-3xl font-bold mb-12">Recent Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((img) => (
              <div key={img.id} className="group relative aspect-[3/4] overflow-hidden bg-neutral-200">
                <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 text-white font-medium">
                  {img.title}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mb-32">
          <h2 className="text-3xl font-bold mb-12">Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Standard", price: "$450", desc: "Perfect for portraits and headshots.", icon: Camera },
              { title: "Commercial", price: "$1,200", desc: "Full day brand photography.", icon: Zap },
              { title: "Event", price: "$850", desc: "Up to 4 hours of coverage.", icon: Shield },
            ].map((pkg, i) => (
              <div key={i} className="p-8 border border-neutral-200 rounded-2xl hover:border-amber-600 transition group">
                <pkg.icon className="w-8 h-8 text-amber-600 mb-6" />
                <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-neutral-500 text-sm mb-6">{pkg.desc}</p>
                <div className="text-3xl font-bold mb-6">{pkg.price}</div>
                <button className="flex items-center gap-2 text-sm font-bold group-hover:text-amber-600">
                  Select Plan <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-32 bg-white p-12 md:p-20 rounded-3xl border border-neutral-100 shadow-sm">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Elara</h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Based in the Pacific Northwest, I specialize in finding the quiet beauty in chaotic environments. 
                With over 8 years of experience, my approach is collaborative, detail-oriented, and focused on 
                creating images that stand the test of time.
              </p>
              <div className="flex gap-4 text-sm">
                <span className="bg-neutral-100 px-4 py-2 rounded-full">Portrait Specialist</span>
                <span className="bg-neutral-100 px-4 py-2 rounded-full">Available Worldwide</span>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1554744512-78d783bb463c" 
              alt="Photographer" 
              className="rounded-2xl w-full h-[400px] object-cover"
            />
          </div>
        </section>

        <section className="mb-32">
          <h2 className="text-3xl font-bold mb-12">Client Notes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { text: "Elara captured the exact vibe we wanted for our brand launch. Truly professional.", name: "Sarah Jenkins", role: "Creative Director" },
              { text: "The photos from our wedding are absolutely timeless. We couldn't be happier.", name: "Mark & Elena", role: "Newlyweds" },
            ].map((test, i) => (
              <div key={i} className="p-8 border-l-4 border-amber-600 bg-white">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-lg italic mb-6">"{test.text}"</p>
                <div className="font-bold">{test.name}</div>
                <div className="text-sm text-neutral-500">{test.role}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Let's Create</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="Name" className="w-full p-4 bg-white border border-neutral-200 rounded-xl" />
              <input type="email" placeholder="Email" className="w-full p-4 bg-white border border-neutral-200 rounded-xl" />
            </div>
            <select className="w-full p-4 bg-white border border-neutral-200 rounded-xl">
              <option>Standard Session</option>
              <option>Commercial Project</option>
              <option>Event Coverage</option>
            </select>
            <div className="relative">
              <Calendar className="absolute left-4 top-4 text-neutral-400 w-5 h-5" />
              <input type="date" className="w-full pl-12 p-4 bg-white border border-neutral-200 rounded-xl" />
            </div>
            <textarea placeholder="Tell me about your vision..." className="w-full p-4 bg-white border border-neutral-200 rounded-xl h-32" />
            <button className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold hover:bg-amber-600 transition">
              Send Enquiry
            </button>
          </form>
        </section>
      </main>

      <footer className="border-t border-neutral-200 py-12 text-center text-neutral-500 text-sm">
        <p className="mb-4">© 2024 Elara Vance Photography. All Rights Reserved.</p>
        <div className="flex justify-center gap-6">
          <Mail className="w-5 h-5 cursor-pointer hover:text-amber-600" />
          <Camera className="w-5 h-5 cursor-pointer hover:text-amber-600" />
        </div>
      </footer>
    </div>
  );
}`,

  "portfolio-site": `import React from 'react';
import { 
  Mail, 
  ArrowRight, 
  Zap, 
  Shield, 
  Code, 
  Database, 
  Layout, 
  Smartphone, 
  Globe,
  Calendar,
  ChevronRight,
  User,
  Star
} from 'lucide-react';

export default function App() {
  const projects = [
    { title: "Quantum Task Manager", desc: "A real-time collaborative productivity suite built for enterprise teams.", tags: ["React", "Node.js", "WebSockets"] },
    { title: "EcoTrack Analytics", desc: "Carbon footprint monitoring dashboard for manufacturing supply chains.", tags: ["TypeScript", "D3.js", "PostgreSQL"] },
    { title: "Velocity Framework", desc: "Lightweight CSS animation library used by over 500+ active repositories.", tags: ["CSS", "JavaScript", "Webpack"] },
    { title: "CyberGuard API", desc: "Automated security scanning tool for RESTful API endpoints.", tags: ["Python", "Docker", "AWS"] },
    { title: "Nomad Travel Planner", desc: "AI-driven itinerary builder for long-term digital nomads.", tags: ["Next.js", "OpenAI API", "Tailwind"] }
  ];

  const experience = [
    { role: "Senior Frontend Engineer", company: "Nebula Systems", period: "2021 - Present" },
    { role: "Full Stack Developer", company: "Vertex Digital", period: "2018 - 2021" },
    { role: "Junior Web Developer", company: "Pixel Craft Studio", period: "2016 - 2018" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center">
        <span className="text-xl font-bold tracking-tight text-indigo-600">alex.dev</span>
        <div className="flex gap-6 text-sm font-medium text-slate-600">
          <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
          <a href="#projects" className="hover:text-indigo-600 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="py-20 md:py-32">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
            Building digital <br />
            <span className="text-indigo-600">experiences</span> that matter.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
            I'm Alex Rivera, a software architect specializing in scalable web applications and intuitive user interfaces. Passionate about clean code and performance.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-700 transition-all">
            Start a project <ArrowRight size={18} />
          </a>
        </section>

        {/* About */}
        <section id="about" className="py-20 border-t border-slate-200">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-200 rounded-2xl aspect-square w-full flex items-center justify-center text-slate-400">
              <User size={64} strokeWidth={1} />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Beyond the keyboard.</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                With over 8 years of experience, I’ve navigated the evolution of the web from jQuery to modern meta-frameworks. I believe in the power of simplicity and data-driven design. When I'm not coding, you'll find me hiking local trails or contributing to open-source climate tech projects.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Code, label: "Frontend Architecture" },
                  { icon: Database, label: "Systems Design" },
                  { icon: Zap, label: "Performance Tuning" },
                  { icon: Shield, label: "Security Auditing" }
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg">
                    <s.icon size={20} className="text-indigo-600" />
                    <span className="text-sm font-medium">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 border-t border-slate-200">
          <h2 className="text-3xl font-bold mb-12">Selected Work</h2>
          <div className="grid gap-6">
            {projects.map((p, i) => (
              <div key={i} className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600">{p.title}</h3>
                    <p className="text-slate-600 mb-4">{p.desc}</p>
                    <div className="flex gap-2">
                      {p.tags.map(t => (
                        <span key={t} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-indigo-600" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="py-20 border-t border-slate-200">
          <h2 className="text-3xl font-bold mb-12">Experience</h2>
          <div className="space-y-8">
            {experience.map((ex, i) => (
              <div key={i} className="flex items-center gap-6 border-l-2 border-indigo-100 pl-6 py-2">
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-lg">{ex.role}</h4>
                    <span className="text-sm text-slate-500 font-mono flex items-center gap-2">
                      <Calendar size={14} /> {ex.period}
                    </span>
                  </div>
                  <p className="text-indigo-600 font-medium">{ex.company}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 border-t border-slate-200 text-center">
          <h2 className="text-3xl font-bold mb-6">Let's connect</h2>
          <p className="text-slate-600 mb-10 max-w-md mx-auto">
            Currently accepting new projects and consulting opportunities. Let's discuss your vision.
          </p>
          <a 
            href="mailto:alex@example.com" 
            className="inline-flex items-center gap-3 text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <Mail /> alex.rivera@example.com
          </a>
        </section>
      </main>

      <footer className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Alex Rivera. All rights reserved.
        </div>
      </footer>
    </div>
  );
}`,

  "real-estate-site": `import React, { useState } from 'react';
import { 
  Search, MapPin, Bed, Bath, Square, Home, Star, 
  ChevronRight, ArrowRight, DollarSign, Users, Shield, Zap
} from 'lucide-react';

const listings = [
  { id: 1, title: 'Modern Hilltop Villa', price: '$1,250,000', beds: 4, baths: 3, sqft: 2800, img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Downtown Industrial Loft', price: '$895,000', beds: 2, baths: 2, sqft: 1450, img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Coastal Family Retreat', price: '$2,100,000', beds: 5, baths: 4, sqft: 3600, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Suburban Craftsman Home', price: '$725,000', beds: 3, baths: 2, sqft: 1900, img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Minimalist Glass Pavilion', price: '$1,550,000', beds: 3, baths: 3, sqft: 2200, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Historic Brownstone', price: '$980,000', beds: 4, baths: 2, sqft: 2100, img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <Home size={28} />
          <span>PrimeEstate</span>
        </div>
        <div className="hidden md:flex gap-8 font-medium text-slate-600">
          <a href="#" className="hover:text-blue-600">Buy</a>
          <a href="#" className="hover:text-blue-600">Rent</a>
          <a href="#" className="hover:text-blue-600">Agents</a>
          <a href="#" className="hover:text-blue-600">Calculator</a>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
          Sign In
        </button>
      </nav>

      <header className="relative py-24 px-6 bg-slate-900 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Find your dream home today.</h1>
        <p className="text-slate-300 text-lg mb-12 max-w-2xl mx-auto">Explore curated luxury listings across the country with our expert guidance.</p>
        
        <div className="bg-white p-4 rounded-2xl shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          <input className="w-full md:w-1/3 p-3 text-slate-900 border-r border-slate-200 focus:outline-none" placeholder="City or Neighborhood" />
          <select className="w-full md:w-1/4 p-3 text-slate-900 border-r border-slate-200">
            <option>Price Range</option>
            <option>$500k - $1M</option>
            <option>$1M - $2M</option>
          </select>
          <select className="w-full md:w-1/4 p-3 text-slate-900">
            <option>Beds</option>
            <option>2+ Beds</option>
            <option>4+ Beds</option>
          </select>
          <button className="w-full md:w-auto bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700">
            <Search size={20} />
          </button>
        </div>
      </header>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition">
              <img src={item.img} alt={item.title} className="h-64 w-full object-cover" />
              <div className="p-6">
                <div className="text-blue-600 font-bold text-xl mb-2">{item.price}</div>
                <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                <div className="flex gap-4 text-slate-500 text-sm">
                  <span className="flex items-center gap-1"><Bed size={16} /> {item.beds}</span>
                  <span className="flex items-center gap-1"><Bath size={16} /> {item.baths}</span>
                  <span className="flex items-center gap-1"><Square size={16} /> {item.sqft}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Popular Neighborhoods</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Pacific Heights', 'West End', 'Oakwood Hills', 'Riverside'].map((hood) => (
              <div key={hood} className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer">
                <img src={\`https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400\`} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <p className="text-white font-bold text-lg">{hood}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6">Meet Our Top Agents</h2>
            <p className="text-slate-600 mb-8">Our team of dedicated professionals are here to guide you through every step of your real estate journey.</p>
            <button className="flex items-center gap-2 text-blue-600 font-semibold">View All Agents <ArrowRight size={18} /></button>
          </div>
          <div className="flex gap-6">
            {[1, 2].map(i => (
              <div key={i} className="bg-white p-6 rounded-2xl w-64 shadow-sm text-center">
                <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto mb-4 overflow-hidden">
                    <img src={\`https://i.pravatar.cc/150?u=\${i}\`} />
                </div>
                <h4 className="font-bold">Sarah Jenkins</h4>
                <p className="text-slate-500 text-sm mb-4">Senior Consultant</p>
                <div className="flex justify-center gap-2 text-amber-500"><Star size={16} fill="currentColor" /> 4.9</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-blue-50 p-12 rounded-3xl border border-blue-100">
          <h2 className="text-2xl font-bold mb-4">"Finding my first home was stressful, but the team at PrimeEstate made it seamless."</h2>
          <p className="text-slate-600">— Marcus Thompson, Software Engineer</p>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-200 bg-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div><h4 className="font-bold mb-4">Company</h4><ul className="space-y-2 text-slate-600"><li>About</li><li>Careers</li><li>Press</li></ul></div>
          <div><h4 className="font-bold mb-4">Support</h4><ul className="space-y-2 text-slate-600"><li>Help Center</li><li>Contact</li><li>Privacy</li></ul></div>
          <div><h4 className="font-bold mb-4">Legal</h4><ul className="space-y-2 text-slate-600"><li>Terms</li><li>Cookies</li><li>Licenses</li></ul></div>
          <div><h4 className="font-bold mb-4">Newsletter</h4><input className="w-full p-2 border rounded-lg mb-2" placeholder="Email address" /><button className="w-full bg-slate-900 text-white py-2 rounded-lg">Subscribe</button></div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 text-slate-500 text-sm text-center">© 2024 PrimeEstate Inc. All rights reserved.</div>
      </footer>
    </div>
  );
}`,

  "restaurant-site": `import React, { useState } from 'react';
import { 
  Menu as MenuIcon, 
  Calendar, 
  Clock, 
  Users, 
  ChevronRight, 
  Star, 
  MapPin, 
  Phone, 
  Mail,
  Zap
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = {
    starters: [
      { name: "Burrata & Heirloom Tomato", price: "$18", desc: "Creamy burrata, balsamic glaze, basil oil, toasted sourdough." },
      { name: "Wagyu Beef Carpaccio", price: "$22", desc: "Thinly sliced wagyu, truffle emulsion, caper berries, parmesan." },
    ],
    mains: [
      { name: "Pan-Seared Scallops", price: "$38", desc: "Jumbo scallops, cauliflower purée, pancetta crisp, lemon beurre blanc." },
      { name: "Herb-Crusted Lamb Rack", price: "$45", desc: "New Zealand lamb, fondant potatoes, roasted root vegetables, mint jus." },
    ],
    desserts: [
      { name: "Dark Chocolate Fondant", price: "$14", desc: "Valrhona chocolate, salted caramel center, Madagascar vanilla bean gelato." },
      { name: "Lemon Yuzu Tart", price: "$12", desc: "Zesty yuzu curd, Italian meringue, buttery shortbread crust." },
    ]
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tighter text-amber-700">LUMIÈRE</div>
        <div className="hidden md:flex gap-8 font-medium text-sm uppercase tracking-widest">
          <a href="#about" className="hover:text-amber-700 transition">About</a>
          <a href="#menu" className="hover:text-amber-700 transition">Menu</a>
          <a href="#reservation" className="hover:text-amber-700 transition">Reservations</a>
        </div>
        <button className="bg-amber-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-800 transition">Reserve</button>
      </nav>

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center text-white text-center">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2400" 
          alt="Elegant restaurant interior" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Culinary Artistry</h1>
          <p className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto">Experience a symphony of seasonal flavors curated by world-renowned chefs in the heart of the city.</p>
          <a href="#reservation" className="inline-block border-2 border-white px-8 py-3 hover:bg-white hover:text-stone-900 transition font-bold">Book Your Table</a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-serif mb-6">Our Philosophy</h2>
          <p className="text-stone-600 leading-relaxed mb-6">Founded in 2012, Lumière blends traditional French techniques with contemporary local ingredients. We believe that every plate tells a story, and every guest is part of our family.</p>
          <div className="flex items-center gap-2 text-amber-700 font-semibold">
            <Star className="fill-amber-700" size={20} /> 3 Michelin Stars
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" alt="Chef plating food" className="rounded-2xl shadow-xl" />
      </section>

      {/* Menu */}
      <section id="menu" className="py-20 bg-stone-100 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-center mb-16">The Tasting Menu</h2>
          {Object.entries(menuItems).map(([category, items]) => (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-bold uppercase tracking-widest text-amber-700 mb-6 border-b pb-2">{category}</h3>
              {items.map((item, i) => (
                <div key={i} className="flex justify-between items-baseline mb-6 border-b border-stone-200 pb-4">
                  <div>
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="text-stone-500 text-sm italic">{item.desc}</p>
                  </div>
                  <span className="font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Reservation Form */}
      <section id="reservation" className="py-20 px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-stone-100">
          <h2 className="text-3xl font-serif mb-8">Secure Your Table</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2"><Calendar size={16}/> Date</label>
                <input type="date" className="w-full p-3 border rounded-lg bg-stone-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2"><Clock size={16}/> Time</label>
                <select className="w-full p-3 border rounded-lg bg-stone-50">
                  <option>18:00</option><option>19:00</option><option>20:00</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2"><Users size={16}/> Party Size</label>
              <input type="number" min="1" max="10" placeholder="2 People" className="w-full p-3 border rounded-lg bg-stone-50" />
            </div>
            <button className="w-full bg-stone-900 text-white py-4 rounded-lg font-bold hover:bg-amber-700 transition">Confirm Booking</button>
          </form>
        </div>
      </section>

      {/* Location & Footer */}
      <footer className="bg-stone-900 text-stone-300 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p className="flex items-center justify-center md:justify-start gap-2 mb-2"><MapPin size={16}/> 124 Culinary Way, Downtown</p>
            <p className="flex items-center justify-center md:justify-start gap-2 mb-2"><Phone size={16}/> (555) 123-4567</p>
            <p className="flex items-center justify-center md:justify-start gap-2"><Mail size={16}/> hello@lumiere.com</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Opening Hours</h4>
            <p>Tue - Thu: 5pm - 10pm</p>
            <p>Fri - Sat: 5pm - 11pm</p>
            <p>Sun: 10am - 3pm (Brunch)</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center"><Zap size={18}/></div>
              <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center"><Star size={18}/></div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-stone-800 text-sm">
          © 2024 Lumière Fine Dining. All rights reserved.
        </div>
      </footer>
    </div>
  );
}`,

  "saas-site": `import React, { useState } from 'react';
import { 
  Check, ArrowRight, Zap, Shield, BarChart3, Users, 
  CreditCard, Clock, Star, ChevronDown, Menu, X, Sparkles
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white"><Zap size={20} /></div>
            <span className="text-xl font-bold tracking-tight">FlowStream</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600">Features</a>
            <a href="#pricing" className="hover:text-indigo-600">Pricing</a>
            <a href="#integrations" className="hover:text-indigo-600">Integrations</a>
            <a href="#" className="hover:text-indigo-600">Resources</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium hover:text-indigo-600">Log in</button>
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition">Start free trial</button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-20 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
          <Sparkles size={16} />
          <span>v2.4 is now live with AI Insights</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 mb-6 leading-[1.1]">
          Orchestrate your workflow with <span className="text-indigo-600">precision</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          The all-in-one platform for modern teams to plan, track, and ship high-quality products without the operational chaos.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
            Get Started for Free <ArrowRight size={18} />
          </button>
          <button className="bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition">
            Book a Demo
          </button>
        </div>
        <div className="mt-16 bg-slate-900 rounded-2xl p-2 shadow-2xl">
          <div className="bg-slate-800 h-64 md:h-96 rounded-xl flex items-center justify-center text-slate-500">
            [Product Interface Mockup]
          </div>
        </div>
      </header>

      {/* Logos */}
      <div className="py-12 border-b border-slate-100">
        <p className="text-center text-sm font-semibold text-slate-400 mb-8 uppercase tracking-widest">Trusted by innovative teams</p>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 opacity-50 grayscale">
          {['Vertex', 'CloudScale', 'Momentum', 'Nova', 'Pinnacle'].map(n => (
            <div key={n} className="text-2xl font-bold text-center">{n}</div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto space-y-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-6">Automated reporting that saves you hours.</h2>
            <p className="text-lg text-slate-600 mb-8">Stop manually updating spreadsheets. Our AI engine generates real-time performance insights so you can focus on making data-driven decisions.</p>
            <ul className="space-y-4">
              {['Auto-generated weekly briefs', 'Anomaly detection alerts', 'Custom KPI dashboards'].map(f => (
                <li key={f} className="flex items-center gap-3"><Check className="text-indigo-600" size={20} /> {f}</li>
              ))}
            </ul>
          </div>
          <div className="bg-indigo-50 h-80 rounded-3xl flex items-center justify-center text-indigo-400">Visualization</div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 bg-indigo-50 h-80 rounded-3xl flex items-center justify-center text-indigo-400">Collaboration</div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold tracking-tight mb-6">Sync your team, wherever they are.</h2>
            <p className="text-lg text-slate-600 mb-8">Integrated chat, file versioning, and task management ensure that everyone stays aligned, even across time zones.</p>
            <ul className="space-y-4">
              {['Unified notification center', 'Global team presence', 'Real-time document editing'].map(f => (
                <li key={f} className="flex items-center gap-3"><Check className="text-indigo-600" size={20} /> {f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-8">Simple, transparent pricing</h2>
          <div className="flex justify-center mb-12">
            <div className="bg-slate-200 p-1 rounded-full flex gap-1">
              <button onClick={() => setIsAnnual(false)} className={\`px-6 py-2 rounded-full text-sm font-semibold transition \${!isAnnual ? 'bg-white shadow' : ''}\`}>Monthly</button>
              <button onClick={() => setIsAnnual(true)} className={\`px-6 py-2 rounded-full text-sm font-semibold transition \${isAnnual ? 'bg-white shadow' : ''}\`}>Annual (Save 20%)</button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: isAnnual ? 29 : 39, features: ['5 Projects', 'Basic Analytics', 'Community Support'] },
              { name: 'Pro', price: isAnnual ? 79 : 99, features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'API Access'] },
              { name: 'Enterprise', price: 199, features: ['Unlimited Everything', 'Dedicated Manager', 'Custom Security', 'SSO Login'] }
            ].map((p, i) => (
              <div key={p.name} className={\`p-8 rounded-2xl bg-white border \${i === 1 ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-slate-200'}\`}>
                <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                <div className="text-4xl font-extrabold mb-6">\${p.price}<span className="text-base font-normal text-slate-500">/mo</span></div>
                <ul className="space-y-4 mb-8">
                  {p.features.map(f => <li key={f} className="flex items-center gap-2 text-sm"><Check size={16} className="text-indigo-600" /> {f}</li>)}
                </ul>
                <button className={\`w-full py-3 rounded-lg font-semibold \${i === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100'}\`}>Choose Plan</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to transform your workflow?</h2>
        <p className="text-slate-600 mb-8">Join over 2,000+ companies using FlowStream to scale.</p>
        <button className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-800">Start your 14-day trial</button>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {['Product', 'Company', 'Support', 'Legal'].map(section => (
            <div key={section}>
              <h4 className="text-white font-bold mb-4">{section}</h4>
              <ul className="space-y-2 text-sm">
                <li>Features</li><li>About</li><li>Help Center</li><li>Privacy</li>
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}`,

  "startup-site": `import React, { useState } from 'react';
import { 
  CheckCircle, Zap, Shield, BarChart3, Users, Clock, 
  ArrowRight, Star, ChevronDown, Mail, Sparkles, TrendingUp
} from 'lucide-react';

export default function App() {
  const [email, setEmail] = useState('');

  const features = [
    { title: "Real-time Analytics", icon: <BarChart3 className="w-6 h-6" />, desc: "Track every conversion with sub-millisecond latency." },
    { title: "Automated Workflows", icon: <Zap className="w-6 h-6" />, desc: "Eliminate manual data entry with AI-powered triggers." },
    { title: "Enterprise Security", icon: <Shield className="w-6 h-6" />, desc: "Bank-grade encryption for your most sensitive data." },
    { title: "Team Collaboration", icon: <Users className="w-6 h-6" />, desc: "Share insights and build reports with your entire squad." },
    { title: "Scheduled Reporting", icon: <Clock className="w-6 h-6" />, desc: "Automate your daily, weekly, and monthly summaries." },
    { title: "Predictive Insights", icon: <TrendingUp className="w-6 h-6" />, desc: "Use historical data to forecast future performance." },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Sparkles className="text-indigo-600" /> FluxFlow
        </div>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition">
          Join Waitlist
        </button>
      </nav>

      {/* Hero */}
      <header className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Star className="w-4 h-4 fill-indigo-700" /> Now in Private Beta
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          The command center for your <span className="text-indigo-600">growth metrics.</span>
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          Stop juggling spreadsheet tabs. FluxFlow centralizes your revenue, marketing, and user data into one actionable dashboard.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 justify-center" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your work email" 
            className="px-6 py-4 rounded-xl border border-slate-200 w-full sm:w-96 focus:ring-2 focus:ring-indigo-600 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition">
            Get Access <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </header>

      {/* Problem & Solution */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">You're drowning in data, not insights.</h2>
            <p className="text-slate-600 mb-4">Most startups spend 15 hours a week just cleaning data. The fragmentation between your CRM, ads, and product analytics makes it impossible to see the "why" behind your growth.</p>
            <p className="text-slate-600">FluxFlow bridges the gap by transforming raw streams into a single source of truth for your entire team.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Dashboard preview" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-16">Built for fast-moving teams</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 border border-slate-100 rounded-2xl hover:border-indigo-100 hover:shadow-lg transition">
              <div className="text-indigo-600 mb-4 bg-indigo-50 w-12 h-12 flex items-center justify-center rounded-xl">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center">Three steps to clarity</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Connect", desc: "Link your existing tools in seconds." },
              { step: "02", title: "Analyze", desc: "Our models identify key trends." },
              { step: "03", title: "Act", desc: "Execute changes that move the needle." }
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="text-indigo-400 font-mono text-xl mb-4">{s.step}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Early Access Pricing</h2>
        <div className="border-2 border-indigo-600 rounded-3xl p-10 bg-indigo-50/50">
          <div className="text-5xl font-bold mb-4">$49<span className="text-xl text-slate-500 font-normal">/mo</span></div>
          <p className="text-slate-600 mb-8">Lock in our early-bird rate for life if you sign up during the beta period.</p>
          <ul className="text-left space-y-4 mb-8 inline-block">
            {['Unlimited connections', 'AI-powered forecasting', 'Priority email support', 'Export to PDF/CSV'].map(item => (
              <li key={item} className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-indigo-600" /> {item}</li>
            ))}
          </ul>
          <button className="block w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700">Claim My Spot</button>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center">The team behind FluxFlow</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {[
              { name: "Sarah Chen", role: "CEO, Ex-Stripe", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200" },
              { name: "Marcus Thorne", role: "CTO, Ex-Google", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" }
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-6 bg-white p-6 rounded-2xl border border-slate-100">
                <img src={f.img} alt={f.name} className="w-20 h-20 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-lg">{f.name}</h4>
                  <p className="text-indigo-600 text-sm font-medium">{f.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-slate-500 text-sm border-t border-slate-100">
        <div className="mb-4 flex justify-center gap-6 font-medium">
          <a href="#" className="hover:text-indigo-600">Privacy</a>
          <a href="#" className="hover:text-indigo-600">Terms</a>
          <a href="#" className="hover:text-indigo-600">Contact</a>
        </div>
        <p>© 2024 FluxFlow Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}`,

  "travel-site": `import React, { useState } from 'react';
import { 
  Search, MapPin, Calendar, Star, Shield, Zap, 
  Users, Plane, ChevronRight, Menu, X, ArrowUpRight 
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const destinations = [
    { name: "Santorini, Greece", price: "$1,200", img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d45e?auto=format&fit=crop&q=80&w=800" },
    { name: "Kyoto, Japan", price: "$1,850", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800" },
    { name: "Amalfi Coast, Italy", price: "$1,450", img: "https://images.unsplash.com/photo-1533105079780-9097be984a93?auto=format&fit=crop&q=80&w=800" },
    { name: "Bali, Indonesia", price: "$950", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800" },
    { name: "Reykjavik, Iceland", price: "$2,100", img: "https://images.unsplash.com/photo-1504280390367-361c6d8e38f4?auto=format&fit=crop&q=80&w=800" },
    { name: "Cape Town, South Africa", price: "$1,600", img: "https://images.unsplash.com/photo-1580060839134-7545ed0d8548?auto=format&fit=crop&q=80&w=800" },
  ];

  const packages = [
    { title: "Alpine Adventure", duration: "7 Days", price: "$2,400", inc: ["Luxury Chalet", "Ski Pass", "Private Guide"] },
    { title: "Tropical Getaway", duration: "10 Days", price: "$1,900", inc: ["Beach Villa", "All-Inclusive", "Boat Tours"] },
    { title: "Cultural Heritage", duration: "5 Days", price: "$1,300", inc: ["Boutique Hotel", "Museum Passes", "City Tours"] },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <Plane className="w-8 h-8" /> Wanderlust
          </div>
          <div className="hidden md:flex gap-8 font-medium text-slate-600">
            {['Destinations', 'Packages', 'About', 'Support'].map(item => (
              <a key={item} href="#" className="hover:text-indigo-600 transition-colors">{item}</a>
            ))}
          </div>
          <button className="hidden md:block bg-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-700 transition">Book Now</button>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <header className="pt-32 pb-20 px-4 text-center bg-indigo-900 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Your Next Adventure</h1>
        <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">Handpicked destinations and bespoke travel packages crafted for unforgettable experiences.</p>
        <div className="max-w-3xl mx-auto bg-white p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl">
          <div className="flex-1 flex items-center px-4 py-3 gap-3 text-slate-500 border-b md:border-b-0 md:border-r border-slate-200">
            <MapPin className="w-5 h-5" /> <input placeholder="Where to?" className="outline-none w-full" />
          </div>
          <div className="flex-1 flex items-center px-4 py-3 gap-3 text-slate-500">
            <Calendar className="w-5 h-5" /> <input placeholder="When?" className="outline-none w-full" />
          </div>
          <button className="bg-indigo-600 px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition">
            <Search className="w-5 h-5" /> Search
          </button>
        </div>
      </header>

      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((d, i) => (
            <div key={i} className="group rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-100 hover:shadow-xl transition-all">
              <div className="h-64 overflow-hidden">
                <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{d.name}</h3>
                  <p className="text-indigo-600 font-semibold mt-1">From {d.price}</p>
                </div>
                <button className="p-3 bg-slate-100 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition"><ArrowUpRight /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Curated Tour Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <div key={i} className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-indigo-400 font-bold mb-6">{pkg.duration} • {pkg.price}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.inc.map((inc, j) => <li key={j} className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full" /> {inc}</li>)}
                </ul>
                <button className="w-full py-3 rounded-xl border border-indigo-500 hover:bg-indigo-500 transition">View Details</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 text-center">
        {[
          { icon: <Shield />, title: "Trusted Agency", desc: "Licensed & bonded travel protection" },
          { icon: <Zap />, title: "Instant Booking", desc: "Confirm your dream trip in seconds" },
          { icon: <Users />, title: "24/7 Support", desc: "Expert guidance whenever you need" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="bg-indigo-100 text-indigo-600 p-4 rounded-2xl mb-6">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-slate-600">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="py-20 bg-indigo-50 px-4">
        <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-sm text-center">
          <h2 className="text-2xl font-bold mb-8">What our travellers say</h2>
          <div className="flex flex-col items-center">
            <div className="flex gap-1 text-yellow-400 mb-4"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></div>
            <p className="text-xl italic mb-6">"Wanderlust made our honeymoon in Santorini absolutely magical. Every detail was perfectly planned!"</p>
            <div className="font-bold">- Sarah & Marcus, London</div>
          </div>
        </div>
      </section>

      <footer className="py-20 px-4 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-bold text-indigo-600 mb-4 flex items-center gap-2"><Plane /> Wanderlust</div>
            <p className="text-slate-600">Making the world accessible, one trip at a time.</p>
          </div>
          <div><h4 className="font-bold mb-4">Company</h4><ul className="space-y-2 text-slate-600"><li>About Us</li><li>Careers</li><li>Press</li></ul></div>
          <div><h4 className="font-bold mb-4">Support</h4><ul className="space-y-2 text-slate-600"><li>Contact</li><li>Privacy</li><li>Terms</li></ul></div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input placeholder="Email" className="px-4 py-2 rounded-lg border w-full" />
              <button className="bg-indigo-600 text-white px-4 rounded-lg"><ChevronRight /></button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}`,
};

/** Templates that ship with finished code and render without a model call. */
export function hasBakedCode(id: string): boolean {
  return id in TEMPLATE_CODE;
}
