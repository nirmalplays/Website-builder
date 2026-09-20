// GENERATED FILE - do not edit.
// Run: node scripts/bake-templates.mjs && node scripts/build-template-index.mjs
// Source of truth is templates/*.tsx

export const TEMPLATE_CODE: Record<string, string> = {
  "accounting-site": `import React, { useState } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  BarChart3, 
  DollarSign, 
  Calendar, 
  Users, 
  Zap, 
  Clock, 
  Mail, 
  Phone, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    { title: "Tax Planning", desc: "Strategic tax reduction strategies for long-term growth.", icon: <Shield className="w-6 h-6 text-blue-600" /> },
    { title: "Bookkeeping", desc: "Real-time financial tracking and reconciliation services.", icon: <BarChart3 className="w-6 h-6 text-blue-600" /> },
    { title: "Financial Advisory", desc: "Expert guidance on investments and fiscal management.", icon: <DollarSign className="w-6 h-6 text-blue-600" /> },
    { title: "Payroll Management", desc: "Seamless automated payroll processing for your team.", icon: <Users className="w-6 h-6 text-blue-600" /> }
  ];

  const packages = [
    { name: "Starter", price: "$299/mo", features: ["Monthly Bookkeeping", "Basic Tax Prep", "Email Support"] },
    { name: "Growth", price: "$599/mo", features: ["Full Bookkeeping", "Tax Strategy", "Quarterly Advisory", "Priority Support"] },
    { name: "Enterprise", price: "$1,200/mo", features: ["CFO Services", "Complex Tax Filings", "Audit Protection", "Dedicated Manager"] }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-700 tracking-tight">VERITAS Accounting</div>
          <div className="hidden md:flex space-x-8 font-medium text-slate-600">
            {['Services', 'Pricing', 'Testimonials', 'Contact'].map(link => (
              <a key={link} href={\`#\${link.toLowerCase()}\`} className="hover:text-blue-600 transition">{link}</a>
            ))}
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Consultation</button>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <header className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Precision Accounting for <span className="text-blue-600">Ambitious Businesses</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg">We help founders scale by automating their finances and minimizing tax liabilities with expert advisory and proactive planning.</p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700">
              Get Free Consultation <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="bg-blue-100 rounded-2xl h-96 flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1554224155-6726b3e8587d?auto=format&fit=crop&q=80&w=800" alt="Accounting dashboard" className="rounded-xl shadow-2xl object-cover w-full h-full" />
        </div>
      </header>

      <section id="services" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Comprehensive Financial Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <div key={i} className="p-6 border border-slate-100 rounded-2xl hover:shadow-lg transition">
                <div className="mb-4">{s.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-4xl font-extrabold mb-6 text-blue-600">{pkg.price}</div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-green-500" /> {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50">Select Plan</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Important Tax Deadlines</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl flex items-center gap-4">
              <Calendar className="text-blue-400" />
              <div>
                <div className="font-bold">April 15</div>
                <div className="text-sm text-slate-400">Individual Tax Filing Deadline</div>
              </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl flex items-center gap-4">
              <Calendar className="text-blue-400" />
              <div>
                <div className="font-bold">June 15</div>
                <div className="text-sm text-slate-400">Quarterly Estimated Payments</div>
              </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl flex items-center gap-4">
              <Calendar className="text-blue-400" />
              <div>
                <div className="font-bold">Sept 15</div>
                <div className="text-sm text-slate-400">Corporate Extension Deadline</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Request a Consultation</h2>
        <form className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" />
          <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-lg" />
          <textarea placeholder="Tell us about your business goals" className="w-full p-3 border rounded-lg h-32"></textarea>
          <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700">Submit Request</button>
        </form>
      </section>

      <footer className="border-t border-slate-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-bold text-slate-400">VERITAS Accounting</div>
          <div className="flex gap-6 text-sm text-slate-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>License: CPA-123456</span>
          </div>
          <div className="flex gap-4">
            <Mail className="text-slate-400" />
            <Phone className="text-slate-400" />
          </div>
        </div>
      </footer>
    </div>
  );
}`,

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

  "analytics-dashboard": `import React, { useState } from 'react';
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Clock, 
  MoreHorizontal,
  LogOut,
  Zap
} from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('Dashboard');

  const stats = [
    { title: 'Total Revenue', value: '$48,292', trend: '+12.5%', isUp: true, icon: DollarSign },
    { title: 'Active Sessions', value: '1,284', trend: '+8.2%', isUp: true, icon: Zap },
    { title: 'Units Sold', value: '8,940', trend: '-2.4%', isUp: false, icon: Package },
    { title: 'Avg. Response Time', value: '1.2s', trend: '-0.4s', isUp: true, icon: Clock },
  ];

  const activities = [
    { id: 1, user: 'Sarah Jenkins', action: 'Purchased Premium Plan', status: 'Completed', date: '2 mins ago' },
    { id: 2, user: 'Marcus Thorne', action: 'Requested API Access', status: 'Pending', date: '15 mins ago' },
    { id: 3, user: 'Elena Rodriguez', action: 'Updated Billing Info', status: 'Completed', date: '1 hour ago' },
    { id: 4, user: 'David Kim', action: 'Failed Login Attempt', status: 'Failed', date: '3 hours ago' },
    { id: 5, user: 'Alex Rivera', action: 'Created New Workspace', status: 'Completed', date: '5 hours ago' },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-2 text-indigo-500">
          <BarChart3 size={28} />
          <span className="font-bold text-xl text-white">NexusAnalytics</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {['Dashboard', 'Analytics', 'Team', 'Settings'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className={\`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors \${
                activeNav === item ? 'bg-indigo-600 text-white' : 'hover:bg-slate-900 text-slate-400'
              }\`}
            >
              {item === 'Dashboard' && <Home size={20} />}
              {item === 'Analytics' && <BarChart3 size={20} />}
              {item === 'Team' && <Users size={20} />}
              {item === 'Settings' && <Settings size={20} />}
              {item}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Overview</h1>
            <p className="text-slate-400">Welcome back, your system is running smoothly.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search metrics..." 
                className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <button className="p-2 bg-slate-900 rounded-lg border border-slate-800 hover:text-indigo-500">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <div className="flex justify-between mb-4">
                <div className="p-2 bg-slate-800 rounded-lg text-indigo-400">
                  <stat.icon size={20} />
                </div>
                <span className={\`text-xs font-medium flex items-center gap-1 \${stat.isUp ? 'text-emerald-500' : 'text-rose-500'}\`}>
                  {stat.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </section>

        {/* Activity Table */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <button className="text-slate-400 hover:text-indigo-500">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-slate-400 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Action</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {activities.map((act) => (
                <tr key={act.id} className="hover:bg-slate-800/50 transition-colors text-sm">
                  <td className="px-6 py-4 font-medium text-white">{act.user}</td>
                  <td className="px-6 py-4 text-slate-300">{act.action}</td>
                  <td className="px-6 py-4">
                    <span className={\`px-2.5 py-1 rounded-full text-xs font-medium \${
                      act.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                      act.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-rose-500/10 text-rose-500'
                    }\`}>
                      {act.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{act.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}`,

  "architecture-site": `import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Mail, MapPin, Phone, Users, Zap, Shield, Sparkles, Building2 } from 'lucide-react';

export default function App() {
  const projects = [
    { name: "Lumina Pavilion", year: "2023", type: "Public Cultural", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
    { name: "Cedar Ridge Villa", year: "2022", type: "Residential", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" },
    { name: "Urban Tech Hub", year: "2024", type: "Commercial", img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800" },
    { name: "Coastal Retreat", year: "2021", type: "Hospitality", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans">
      {/* Nav */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter">ELARA STUDIO</div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
            {['Works', 'Philosophy', 'Services', 'Team', 'Contact'].map(item => (
              <a key={item} href={\`#\${item.toLowerCase()}\`} className="hover:text-stone-900 transition-colors">{item}</a>
            ))}
          </div>
          <button className="bg-stone-900 text-white px-5 py-2 text-sm rounded-full hover:bg-stone-700 transition">Inquire</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8">Architecture of <br/> intentional stillness.</h1>
        <div className="relative h-[500px] w-full bg-stone-100 rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=2400" alt="Signature building" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Works */}
      <section id="works" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-stone-500 mb-12 font-semibold">Selected Works</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden rounded-xl mb-4 bg-stone-100">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-medium">{p.name}</h3>
                  <p className="text-stone-500">{p.type}</p>
                </div>
                <span className="text-sm font-light text-stone-400">{p.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Sparkles className="mx-auto mb-6 text-stone-400" />
          <h2 className="text-4xl font-light mb-8">We believe that architecture is the art of framing human experience, not just building structures.</h2>
          <p className="text-stone-600 leading-relaxed text-lg">Founded in 2015, Elara Studio prioritizes sustainable materiality, light-driven spatial planning, and an unwavering commitment to the local context of every project we undertake.</p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        {[
          { icon: <Building2 />, title: "Master Planning", desc: "Strategic development of urban landscapes and campus environments." },
          { icon: <Shield />, title: "Sustainable Design", desc: "Net-zero focused methodology integrating passive heating and cooling." },
          { icon: <Zap />, title: "Interior Architecture", desc: "Holistic interior solutions that harmonize form, function, and lighting." }
        ].map((s, i) => (
          <div key={i} className="p-8 border border-stone-100 rounded-2xl hover:border-stone-200 transition">
            <div className="mb-4 text-stone-900">{s.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-stone-500 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-sm uppercase tracking-widest text-stone-400 mb-12 font-semibold">The Collective</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {['Elena Vance', 'Marcus Thorne', 'Sarah Jenkins', 'David Kim'].map((name, i) => (
              <div key={i}>
                <div className="w-full aspect-square bg-stone-800 rounded-lg mb-4"></div>
                <h4 className="font-medium">{name}</h4>
                <p className="text-stone-400 text-sm">Principal Architect</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl font-light mb-8">Let's build something extraordinary.</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-stone-600"><MapPin size={20}/> 124 Architecture Lane, Portland, OR</div>
              <div className="flex items-center gap-3 text-stone-600"><Mail size={20}/> hello@elarastudio.com</div>
              <div className="flex items-center gap-3 text-stone-600"><Phone size={20}/> +1 (503) 555-0192</div>
            </div>
          </div>
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="w-full p-4 bg-stone-50 rounded-lg border-0 focus:ring-2 focus:ring-stone-900"/>
            <input type="email" placeholder="Email" className="w-full p-4 bg-stone-50 rounded-lg border-0 focus:ring-2 focus:ring-stone-900"/>
            <textarea placeholder="Tell us about your project" rows={4} className="w-full p-4 bg-stone-50 rounded-lg border-0 focus:ring-2 focus:ring-stone-900"></textarea>
            <button className="w-full bg-stone-900 text-white py-4 rounded-lg font-medium hover:bg-stone-700 transition">Send Inquiry</button>
          </form>
        </div>
      </section>

      <footer className="py-8 border-t border-stone-100 text-center text-stone-400 text-sm">
        © 2024 Elara Studio Architecture. All rights reserved.
      </footer>
    </div>
  );
}`,

  "bakery-site": `import React, { useState } from 'react';
import { ShoppingCart, Star, Clock, MapPin, Mail, Phone, ChevronRight, Zap, Shield, Calendar, Users } from 'lucide-react';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const products = [
    { name: "Sourdough Country Loaf", price: "$8.50", img: "https://images.unsplash.com/photo-1585478259715-876766860538?auto=format&fit=crop&w=400&q=80" },
    { name: "Butter Croissant", price: "$4.25", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80" },
    { name: "Cinnamon Morning Bun", price: "$5.00", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80" },
    { name: "Olive & Rosemary Focaccia", price: "$7.00", img: "https://images.unsplash.com/photo-1607305387299-a3d9611cd659?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <nav className="sticky top-0 bg-stone-50/90 backdrop-blur-sm z-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tighter text-amber-900">HEARTH & CRUMB</h1>
          <div className="flex items-center gap-6">
            <button className="relative p-2" onClick={() => setCartCount(c => c + 1)}>
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && <span className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      <header className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-amber-700 font-semibold tracking-wide uppercase text-sm">Fresh from the oven</span>
            <h2 className="text-5xl md:text-6xl font-bold mt-4 mb-6 leading-tight">Handcrafted loaves for everyday joy.</h2>
            <p className="text-lg text-stone-600 mb-8">Using stone-milled organic flour and a 48-hour fermentation process to bring you the perfect golden crust.</p>
            <button className="bg-amber-900 text-white px-8 py-4 rounded-full font-medium hover:bg-amber-800 transition">View Daily Specials</button>
          </div>
          <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80" alt="Bakery display" className="rounded-2xl shadow-xl" />
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold mb-12">Our Daily Bakes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition">
              <img src={p.img} alt={p.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h4 className="font-bold text-lg">{p.name}</h4>
              <p className="text-amber-700 font-semibold mb-4">{p.price}</p>
              <button className="w-full border border-stone-200 py-2 rounded-lg hover:bg-stone-50">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-900 text-stone-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-8">Custom Celebration Cakes</h3>
          <p className="text-stone-400 mb-12">From intimate birthdays to grand weddings, we bake memories one layer at a time. Choose from Salted Caramel, Dark Chocolate Ganache, or Vanilla Bean.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {['Signature Tier', 'Premium Tier', 'Grand Tier'].map((tier) => (
              <div key={tier} className="border border-stone-700 p-8 rounded-2xl">
                <h4 className="text-xl font-bold mb-4">{tier}</h4>
                <div className="text-3xl font-light text-amber-500 mb-6">$65+</div>
                <button className="text-sm font-semibold border-b border-amber-500">Inquire Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">Our Baker's Story</h3>
            <p className="text-stone-600 mb-4 leading-relaxed">Founded in 2012 by Elena Rossi, Hearth & Crumb began in a tiny home kitchen with nothing but a sourdough starter named 'Barnaby' and a passion for heritage grains.</p>
            <p className="text-stone-600 leading-relaxed">Today, we work with local farmers to ensure every grain we use supports our regional ecosystem. We believe that good bread shouldn't just taste good—it should do good.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80" className="rounded-xl w-full h-64 object-cover" alt="Baker working" />
            <img src="https://images.unsplash.com/photo-1585478259715-876766860538?auto=format&fit=crop&w=400&q=80" className="rounded-xl w-full h-64 object-cover mt-8" alt="Fresh bread" />
          </div>
        </div>
      </section>

      <footer className="bg-stone-100 py-16 border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <h4 className="font-bold text-lg mb-4 text-amber-900">Hearth & Crumb</h4>
            <p className="text-stone-600 text-sm">124 Baker's Lane, Flour District<br/>Open Daily 7:00 AM - 4:00 PM</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <div className="flex items-center gap-2 text-stone-600 text-sm mb-2"><Phone size={16}/> (555) 123-4567</div>
            <div className="flex items-center gap-2 text-stone-600 text-sm"><Mail size={16}/> hello@hearthandcrumb.com</div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-white border border-stone-300 px-4 py-2 rounded-lg flex-1 text-sm" />
              <button className="bg-amber-900 text-white px-4 py-2 rounded-lg"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}`,

  "barbershop-site": `import React, { useState } from 'react';
import { Scissors, Calendar, Clock, Star, MapPin, ChevronRight, User, Phone, Zap } from 'lucide-react';

export default function App() {
  const [activeBarber, setActiveBarber] = useState('Marcus Thorne');

  const services = [
    { name: 'Classic Gentleman\\'s Cut', price: '$45', duration: '45 min' },
    { name: 'Hot Towel Shave', price: '$35', duration: '30 min' },
    { name: 'Beard Trim & Shape', price: '$25', duration: '20 min' },
    { name: 'The Executive Combo', price: '$70', duration: '75 min' },
  ];

  const barbers = [
    { name: 'Marcus Thorne', specialty: 'Precision Fades', years: 12, img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=400&q=80' },
    { name: 'Julian Vane', specialty: 'Classic Scissor Cuts', years: 8, img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter uppercase flex items-center gap-2">
          <Scissors className="text-amber-600" /> VANGUARD BARBER
        </div>
        <div className="hidden md:flex gap-8 font-medium text-sm uppercase tracking-widest">
          {['Services', 'Barbers', 'Reviews', 'Contact'].map(item => (
            <a key={item} href={\`#\${item.toLowerCase()}\`} className="hover:text-amber-600 transition-colors">{item}</a>
          ))}
        </div>
        <button className="bg-neutral-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-600 transition-colors">Book Now</button>
      </nav>

      <header className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 max-w-3xl">
          Crafting Your Signature Look.
        </h1>
        <p className="text-xl text-neutral-600 mb-10 max-w-xl">
          Modern precision meets traditional craftsmanship. Experience the city's finest grooming services in a classic atmosphere.
        </p>
        <button className="flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-700 transition-all">
          Schedule Appointment <ChevronRight size={20} />
        </button>
      </header>

      <section id="services" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16">Services & Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s) => (
              <div key={s.name} className="flex justify-between items-center border-b border-neutral-200 pb-6">
                <div>
                  <h3 className="text-xl font-semibold">{s.name}</h3>
                  <p className="text-neutral-500 flex items-center gap-2 mt-1 text-sm"><Clock size={14} /> {s.duration}</p>
                </div>
                <span className="text-2xl font-bold text-amber-600">{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="barbers" className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16">Meet Our Barbers</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {barbers.map((b) => (
            <div key={b.name} className="group relative overflow-hidden rounded-2xl bg-neutral-900">
              <img src={b.img} alt={b.name} className="w-full h-96 object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-3xl font-bold">{b.name}</h3>
                <p className="text-amber-500 font-medium mt-1">{b.specialty}</p>
                <p className="text-neutral-300 text-sm mt-2">{b.years} Years of Experience</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="booking" className="py-24 bg-neutral-900 text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Book Your Session</h2>
          <div className="bg-white text-neutral-900 p-8 rounded-2xl shadow-xl">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Select Barber</label>
                  <select className="w-full p-3 bg-neutral-100 rounded-lg outline-none focus:ring-2 focus:ring-amber-600">
                    <option>Marcus Thorne</option>
                    <option>Julian Vane</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Service</label>
                  <select className="w-full p-3 bg-neutral-100 rounded-lg outline-none focus:ring-2 focus:ring-amber-600">
                    {services.map(s => <option key={s.name}>{s.name} ({s.price})</option>)}
                  </select>
                </div>
              </div>
              <button className="w-full bg-amber-600 text-white py-4 rounded-lg font-bold hover:bg-amber-700">Confirm Booking</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-sm text-neutral-600">
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">VANGUARD BARBER</h4>
            <p className="flex items-start gap-2"><MapPin size={18} /> 422 Industrial Way, Brooklyn, NY 11211</p>
            <p className="flex items-center gap-2 mt-2"><Phone size={18} /> (718) 555-0199</p>
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">Hours</h4>
            <div className="space-y-1">
              <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
              <p>Sat: 10:00 AM - 6:00 PM</p>
              <p>Sun: Closed</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-neutral-100 px-4 py-2 rounded-md flex-1" />
              <button className="bg-neutral-900 text-white px-4 py-2 rounded-md"><Zap size={16} /></button>
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

  "booking-calendar": `import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Check, ArrowRight, Star } from 'lucide-react';

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SLOTS = [
  "09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"
];

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(15);
  const [selectedSlot, setSelectedSlot] = useState<string | null>("10:00 AM");

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <header className="px-6 py-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-indigo-600">Zenith Consultations</h1>
            <p className="text-sm text-slate-500">Book your 60-minute strategy session</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-sm font-medium bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              4.9/5 Rating
            </span>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Calendar Section */}
          <div className="p-6 border-b md:border-b-0 md:border-r border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {DAYS_OF_WEEK.map(day => (
                <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={\`empty-\${i}\`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDay === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={\`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all \${
                      isSelected 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'hover:bg-indigo-50 text-slate-700'
                    }\`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slots Section */}
          <div className="p-6 bg-slate-50/50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              Available Time Slots
            </h3>
            
            {selectedDay ? (
              <div className="grid grid-cols-2 gap-3">
                {SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={\`px-4 py-3 rounded-xl border text-sm font-medium transition-all \${
                      selectedSlot === slot
                        ? 'border-indigo-600 bg-white text-indigo-700 shadow-sm ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white hover:border-indigo-300 text-slate-600'
                    }\`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-slate-400 text-sm italic">
                Please select a date from the calendar
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-200">
              <button 
                disabled={!selectedDay || !selectedSlot}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-200"
              >
                Confirm Appointment
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-xs text-slate-400 mt-4">
                You can reschedule or cancel up to 24 hours before your session.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="max-w-4xl mx-auto mt-8 text-center text-slate-400 text-sm">
        &copy; 2024 Zenith Consulting Services. All rights reserved.
      </footer>
    </div>
  );
}`,

  "car-dealership-site": `import React, { useState } from 'react';
import { 
  Search, Phone, Zap, Shield, DollarSign, Calendar, Clock, 
  ChevronRight, Star, ChevronDown, CheckCircle, TrendingUp 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inventory');

  const featuredCars = [
    { id: 1, make: 'Porsche', model: '911 Carrera', year: 2023, price: '$115,000', miles: '4,200', img: 'https://images.unsplash.com/photo-1614162692292-7add56d7dfbf?auto=format&fit=crop&w=800&q=80' },
    { id: 2, make: 'Audi', model: 'e-tron GT', year: 2024, price: '$108,500', miles: '1,100', img: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=800&q=80' },
    { id: 3, make: 'Land Rover', model: 'Range Rover', year: 2022, price: '$98,900', miles: '12,500', img: 'https://images.unsplash.com/photo-1612825173281-9a193378556e?auto=format&fit=crop&w=800&q=80' },
    { id: 4, make: 'BMW', model: 'M4 Competition', year: 2023, price: '$84,200', miles: '8,900', img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80' },
    { id: 5, make: 'Mercedes-Benz', model: 'S-Class 580', year: 2024, price: '$122,000', miles: '500', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228caf1c?auto=format&fit=crop&w=800&q=80' },
    { id: 6, make: 'Tesla', model: 'Model S Plaid', year: 2023, price: '$94,500', miles: '3,800', img: 'https://images.unsplash.com/photo-1617704548623-340376560968?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="text-2xl font-black text-indigo-700 tracking-tighter">ELITE<span className="text-gray-900">MOTORS</span></div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {['Inventory', 'Finance', 'Service', 'Trade-In'].map(item => (
              <a key={item} href="#" className="hover:text-indigo-600 transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-indigo-700 font-bold">
              <Phone size={18} />
              <span>(555) 987-6543</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[600px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1583121274602-3e2820d6988b?auto=format&fit=crop&w=2000&q=80" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Luxury showroom" />
        <div className="relative z-10 max-w-4xl px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">Drive Your Ambition.</h1>
          <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px] text-left">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Make</label>
              <button className="w-full border rounded-lg p-3 flex justify-between items-center text-gray-700">Select Make <ChevronDown size={16}/></button>
            </div>
            <div className="flex-1 min-w-[200px] text-left">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Max Price</label>
              <button className="w-full border rounded-lg p-3 flex justify-between items-center text-gray-700">$150,000 <ChevronDown size={16}/></button>
            </div>
            <button className="bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-800 transition-colors flex items-center gap-2">
              <Search size={20} /> Search Inventory
            </button>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12">Featured Inventory</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map(car => (
            <div key={car.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <img src={car.img} alt={car.model} className="h-48 w-full object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{car.make} {car.model}</h3>
                  <span className="text-indigo-700 font-black text-lg">{car.price}</span>
                </div>
                <div className="text-gray-500 text-sm mb-6 flex gap-4">
                  <span>{car.year}</span> • <span>{car.miles} miles</span>
                </div>
                <button className="w-full py-3 border-2 border-indigo-700 text-indigo-700 rounded-lg font-bold hover:bg-indigo-700 hover:text-white transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Finance & Trade-in */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div className="bg-white text-gray-900 p-8 rounded-2xl">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center mb-6"><DollarSign size={24}/></div>
            <h3 className="text-2xl font-bold mb-4">Finance Calculator</h3>
            <p className="text-gray-600 mb-6">Get an instant estimate on monthly payments based on your credit score and down payment.</p>
            <button className="text-indigo-700 font-bold flex items-center gap-2">Launch Calculator <ChevronRight size={18}/></button>
          </div>
          <div className="bg-indigo-700 p-8 rounded-2xl">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-6"><TrendingUp size={24}/></div>
            <h3 className="text-2xl font-bold mb-4">Trade-In Valuation</h3>
            <p className="text-indigo-100 mb-6">Get a professional appraisal for your current vehicle in under 3 minutes.</p>
            <button className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-bold">Start Valuation</button>
          </div>
        </div>
      </section>

      {/* Why Buy & Reviews */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl font-bold mb-8">Why Elite Motors?</h2>
            <div className="space-y-6">
              {[
                { title: 'Certified Quality', desc: 'Every vehicle passes a 150-point inspection.' },
                { title: 'Transparent Pricing', desc: 'No hidden fees, no dealer add-ons.' },
                { title: 'Home Delivery', desc: 'We deliver your new car to your doorstep.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 text-indigo-700"><CheckCircle size={24} /></div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8">Customer Stories</h2>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 italic mb-6">"Elite Motors made the buying process seamless. I got my dream car delivered in less than 24 hours. The team was professional and transparent."</p>
              <div className="font-bold">Sarah Jenkins</div>
              <div className="text-sm text-gray-500">Porsche 911 Owner</div>
            </div>
          </div>
        </div>
      </section>

      {/* Service */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-indigo-700"><Zap size={32} /></div>
          <h2 className="text-3xl font-bold mb-4">World-Class Service Center</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">From oil changes to complex engine diagnostics, our factory-trained technicians keep your vehicle performing at its peak.</p>
          <div className="flex justify-center gap-4">
            <button className="bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold">Schedule Service</button>
            <button className="bg-white border border-gray-300 px-8 py-3 rounded-lg font-bold">View Service Menu</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-white font-black tracking-tighter text-xl">ELITE MOTORS</div>
            <div className="flex gap-8">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Contact Us</span>
            </div>
            <div>© 2024 Elite Motors Group. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}`,

  "chat-app": `import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  MoreHorizontal, 
  Send, 
  Paperclip, 
  Smile, 
  Clock, 
  CheckCircle,
  Zap,
  User,
  Settings,
  Bell
} from 'lucide-react';

const CONVERSATIONS = [
  { id: 1, name: "Sarah Jenkins", role: "Product Designer", lastMessage: "Let's review the wireframes at 3pm?", time: "10:42 AM", unread: 2, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
  { id: 2, name: "Marcus Thorne", role: "Engineering Lead", lastMessage: "The API deployment went smooth.", time: "9:15 AM", unread: 0, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
  { id: 3, name: "Elena Rodriguez", role: "Marketing Specialist", lastMessage: "Did we approve the ad budget?", time: "Yesterday", unread: 0, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" },
  { id: 4, name: "David Chen", role: "Frontend Developer", lastMessage: "Found a bug in the navigation component.", time: "Tuesday", unread: 0, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80" },
];

const MESSAGES = [
  { id: 1, sender: "other", text: "Hey Sarah, are you available for a quick sync?", time: "10:30 AM" },
  { id: 2, sender: "me", text: "Hi Marcus! Yes, I have some time in about 15 minutes. Does that work for you?", time: "10:32 AM" },
  { id: 3, sender: "other", text: "Perfect. I'll send over the meeting link shortly. I also wanted to discuss the new feature request from the client.", time: "10:35 AM" },
  { id: 4, sender: "me", text: "Sounds good. Should I invite the rest of the design team?", time: "10:38 AM" },
  { id: 5, sender: "other", text: "No, let's keep it small for now. Just us two is enough to align on the scope.", time: "10:40 AM" },
];

export default function App() {
  const [activeChat, setActiveChat] = useState(CONVERSATIONS[0]);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 border-r border-gray-200 bg-white flex flex-col hidden md:flex">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-indigo-600 text-xl">
            <Zap size={24} />
            <span>FluxChat</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg"><Menu size={20} /></button>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map((chat) => (
            <button 
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={\`w-full p-4 flex items-center gap-4 hover:bg-indigo-50 transition-colors \${activeChat.id === chat.id ? 'bg-indigo-50' : ''}\`}
            >
              <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1 text-left overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 truncate">{chat.name}</span>
                  <span className="text-[10px] text-gray-400">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-white">
        <header className="h-16 border-b border-gray-200 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="font-semibold text-gray-900">{activeChat.name}</h2>
              <p className="text-[10px] text-green-500 flex items-center gap-1"><CheckCircle size={10} /> Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <button><Bell size={20} /></button>
            <button><Settings size={20} /></button>
            <button><MoreHorizontal size={20} /></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {MESSAGES.map((msg) => (
            <div key={msg.id} className={\`flex \${msg.sender === 'me' ? 'justify-end' : 'justify-start'}\`}>
              <div className={\`max-w-[70%] rounded-2xl px-4 py-3 \${msg.sender === 'me' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}\`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div className={\`text-[10px] mt-1 flex items-center gap-1 \${msg.sender === 'me' ? 'text-indigo-200 justify-end' : 'text-gray-400'}\`}>
                  <Clock size={10} /> {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <footer className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-2">
            <button className="p-2 text-gray-500 hover:text-indigo-600"><Paperclip size={20} /></button>
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-1"
            />
            <button className="p-2 text-gray-500 hover:text-indigo-600"><Smile size={20} /></button>
            <button className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </footer>
      </main>
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

  "coffee-shop-site": `import React, { useState } from 'react';
import { Coffee, MapPin, Clock, Star, ArrowRight, ChevronDown, Award, Zap, Shield } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Drinks');

  const drinks = [
    { name: 'Velvet Espresso', price: '$3.50', desc: 'Rich, full-bodied single origin roast.' },
    { name: 'Golden Oat Latte', price: '$5.75', desc: 'Creamy oat milk paired with nutty espresso.' },
    { name: 'Midnight Cold Brew', price: '$4.50', desc: 'Steeped for 24 hours for a smooth finish.' },
    { name: 'Honey Lavender Matcha', price: '$6.00', desc: 'Ceremonial grade matcha with floral notes.' },
  ];

  const food = [
    { name: 'Sourdough Avocado Toast', price: '$9.50', desc: 'Topped with radish, microgreens, and chili oil.' },
    { name: 'Almond Croissant', price: '$4.75', desc: 'Buttery, flaky pastry filled with house almond cream.' },
    { name: 'Fig & Goat Cheese Scone', price: '$4.25', desc: 'Sweet, savory, and perfectly crumbly.' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <nav className="sticky top-0 bg-stone-50/90 backdrop-blur-md z-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-orange-900">
            <Coffee className="w-6 h-6" />
            <span>HEARTH & BEAN</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
            {['Menu', 'Story', 'Locations', 'Loyalty'].map((item) => (
              <a key={item} href={\`#\${item.toLowerCase()}\`} className="hover:text-orange-800 transition-colors">{item}</a>
            ))}
          </div>
          <button className="bg-orange-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-800 transition-all">
            Order Pickup
          </button>
        </div>
      </nav>

      <header className="max-w-6xl mx-auto px-6 py-20 md:py-32 text-center">
        <span className="text-orange-700 font-semibold uppercase tracking-widest text-sm">Est. 2018</span>
        <h1 className="text-5xl md:text-7xl font-serif mt-4 mb-6 text-stone-950">Crafted for the <br/>quiet moments.</h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-10">Small-batch roasting, ethically sourced beans, and a warm hearth waiting for you in the heart of the city.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-orange-900 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-orange-800">
            View Menu <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      <section id="menu" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-4 mb-12 border-b border-stone-200">
            {['Drinks', 'Food'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={\`pb-4 px-2 font-medium \${activeTab === tab ? 'text-orange-900 border-b-2 border-orange-900' : 'text-stone-400'}\`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {(activeTab === 'Drinks' ? drinks : food).map((item) => (
              <div key={item.name} className="flex justify-between items-start p-6 border border-stone-100 rounded-2xl hover:border-orange-200 transition-colors">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-stone-500 text-sm mt-1">{item.desc}</p>
                </div>
                <span className="font-mono font-bold text-orange-800">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="py-20 bg-stone-900 text-stone-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-serif mb-6">From farm to hearth.</h2>
            <p className="text-stone-400 leading-relaxed mb-6">We believe coffee is a bridge between the farmer's hard work and your morning ritual. Every batch is roasted in our downtown studio, highlighting the unique terroir of our partner farms in Ethiopia and Colombia.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><Award className="text-orange-500" /> <span>Direct trade partnerships</span></div>
              <div className="flex items-center gap-3"><Zap className="text-orange-500" /> <span>Precision roasted daily</span></div>
              <div className="flex items-center gap-3"><Shield className="text-orange-500" /> <span>Carbon neutral shipping</span></div>
            </div>
          </div>
          <div className="aspect-square bg-stone-800 rounded-3xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800" alt="Coffee roasting process" className="w-full h-full object-cover opacity-80" />
          </div>
        </div>
      </section>

      <section id="locations" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-serif mb-12">Visit us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Downtown Studio', hours: '7am - 6pm' },
              { name: 'North District', hours: '8am - 4pm' },
              { name: 'Riverside Corner', hours: '7am - 8pm' }
            ].map((loc) => (
              <div key={loc.name} className="bg-white p-8 rounded-3xl border border-stone-200">
                <MapPin className="text-orange-800 mb-4" />
                <h3 className="font-bold text-xl mb-2">{loc.name}</h3>
                <div className="flex items-center gap-2 text-stone-500 text-sm">
                  <Clock className="w-4 h-4" /> <span>Daily: {loc.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="loyalty" className="py-20 bg-orange-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Star className="w-12 h-12 text-orange-600 mx-auto mb-6" />
          <h2 className="text-3xl font-serif mb-4">Join the Hearth Club</h2>
          <p className="text-stone-600 mb-8">Earn points on every pour-over and receive exclusive early access to our limited-edition micro-lot releases.</p>
          <button className="bg-orange-950 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-900 transition-colors">
            Sign up for rewards
          </button>
        </div>
      </section>

      <footer className="bg-stone-100 py-12 border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-6 text-center text-stone-500 text-sm">
          <p className="mb-4 font-bold text-stone-800">HEARTH & BEAN COFFEE</p>
          <p>© 2024 Hearth & Bean Inc. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact Us</span>
          </div>
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

  "construction-site": `import React, { useState } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Zap, 
  Calendar, 
  Clock, 
  Users, 
  Building, 
  HardHat, 
  Hammer, 
  ChevronRight,
  TrendingUp,
  Mail
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('General');

  const services = [
    { title: 'Commercial Build', desc: 'Full-scale office complexes and retail spaces designed for longevity.', icon: <Building /> },
    { title: 'Residential Custom', desc: 'Bespoke luxury homes tailored to your unique architectural vision.', icon: <Hammer /> },
    { title: 'Structural Repair', desc: 'Expert reinforcement and restoration of existing foundation structures.', icon: <Shield /> },
    { title: 'Project Management', desc: 'End-to-end oversight ensuring budgets and timelines are strictly met.', icon: <Clock /> },
    { title: 'Industrial Upgrades', desc: 'Heavy-duty facility improvements for manufacturing and logistics.', icon: <Zap /> },
    { title: 'Sustainability Consulting', desc: 'LEED certification guidance and energy-efficient building practices.', icon: <TrendingUp /> },
  ];

  const projects = [
    { name: 'Riverfront Plaza', type: 'Commercial', year: '2023', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab' },
    { name: 'Evergreen Estates', type: 'Residential', year: '2022', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233' },
    { name: 'Summit Tech Hub', type: 'Industrial', year: '2024', img: 'https://images.unsplash.com/photo-1541888946425-d81bb1924823' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-2xl font-bold tracking-tighter text-blue-700 flex items-center gap-2">
            <HardHat className="text-blue-700" /> STRUCTURA
          </span>
          <div className="hidden md:flex gap-8 font-medium text-sm">
            <a href="#services" className="hover:text-blue-700">Services</a>
            <a href="#projects" className="hover:text-blue-700">Projects</a>
            <a href="#quote" className="bg-blue-700 text-white px-5 py-2 rounded-full hover:bg-blue-800 transition">Get a Quote</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[600px] flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e" 
          alt="Construction site" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-2xl leading-tight">Building the future, one foundation at a time.</h1>
          <p className="text-xl mb-8 max-w-lg text-slate-200">Premium construction services for commercial and residential developments across the region.</p>
          <a href="#quote" className="bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex w-fit items-center gap-2 hover:bg-blue-800 transition">
            Start Your Project <ArrowRight size={20} />
          </a>
        </div>
      </header>

      {/* Services */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center">Our Expertise</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="p-8 bg-white border border-slate-200 rounded-2xl hover:shadow-lg transition">
              <div className="text-blue-700 mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16">Completed Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="h-64 rounded-2xl overflow-hidden mb-4">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider">{p.type}</p>
                    <h3 className="text-xl font-bold">{p.name}</h3>
                  </div>
                  <span className="text-slate-500 font-mono">{p.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center">Our Construction Process</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          {['Consultation', 'Planning', 'Permitting', 'Construction', 'Handover'].map((step, i) => (
            <div key={i} className="flex-1 p-6 relative">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">{i + 1}</div>
              <h4 className="font-bold text-lg">{step}</h4>
              {i < 4 && <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-slate-200" />}
            </div>
          ))}
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote" className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8">Request a Quote</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Full Name" className="w-full p-4 bg-slate-50 rounded-lg border border-slate-200" />
              <input type="email" placeholder="Email Address" className="w-full p-4 bg-slate-50 rounded-lg border border-slate-200" />
            </div>
            <select className="w-full p-4 bg-slate-50 rounded-lg border border-slate-200">
              <option>Residential Renovation</option>
              <option>Commercial Development</option>
              <option>Industrial Infrastructure</option>
            </select>
            <textarea placeholder="Tell us about your project requirements..." className="w-full p-4 bg-slate-50 rounded-lg border border-slate-200 h-32"></textarea>
            <button className="w-full bg-blue-700 text-white p-4 rounded-lg font-bold hover:bg-blue-800">Submit Request</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-100 text-slate-600 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bold text-slate-900">© 2024 Structura Construction Co.</div>
          <div className="flex gap-6">
            <span>Safety Record: 0 Incidents</span>
            <span>OSHA Certified</span>
            <span>Licensed & Insured</span>
          </div>
        </div>
      </footer>
    </div>
  );
}`,

  "contact-form": `import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle, Shield } from 'lucide-react';

export default function App() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {submitted ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Received!</h2>
            <p className="text-slate-600 mb-8 max-w-sm">
              Thank you for reaching out. Our support team typically responds within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Get in touch</h1>
              <p className="text-slate-500">Have a question or need assistance? Fill out the form below and we'll be in touch shortly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      required
                      type="text"
                      id="name"
                      placeholder="Jane Doe"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-400">Your full legal name as it appears on your account.</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      required
                      type="email"
                      id="email"
                      placeholder="jane@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-400">We'll never share your email with anyone else.</p>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700">Subject</label>
                <input
                  required
                  type="text"
                  id="subject"
                  placeholder="How can we help you?"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <textarea
                    required
                    id="message"
                    rows={4}
                    placeholder="Describe your inquiry in detail..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <p className="text-xs text-slate-400">Max 500 characters. Please be as descriptive as possible.</p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400">
          <Shield className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wider font-medium">Secure Encrypted Form</span>
        </div>
      </div>
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

  "coworking-site": `import React, { useState } from 'react';
import { 
  Check, 
  MapPin, 
  Calendar, 
  Users, 
  Zap, 
  Coffee, 
  Wifi, 
  Shield, 
  Clock, 
  ArrowRight, 
  Star,
  Menu,
  X,
  CreditCard
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const plans = [
    { name: "Hot Desk", price: "$299", features: ["Access to open areas", "High-speed Wi-Fi", "Unlimited coffee", "Mon-Fri 9-6"] },
    { name: "Dedicated Desk", price: "$499", features: ["Reserved desk", "Lockable storage", "24/7 access", "5 hours meeting rooms"] },
    { name: "Private Office", price: "$899", features: ["Private lockable space", "Customizable layout", "Mail handling", "10 hours meeting rooms"] }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <span className="text-2xl font-bold tracking-tight text-indigo-600">NexusWork</span>
            <div className="hidden md:flex items-center gap-8 font-medium">
              <a href="#workspaces" className="hover:text-indigo-600">Workspaces</a>
              <a href="#membership" className="hover:text-indigo-600">Membership</a>
              <a href="#events" className="hover:text-indigo-600">Events</a>
              <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-full hover:bg-indigo-700 transition">Book a Tour</button>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      <header className="py-20 px-4 text-center bg-white">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">Work where <span className="text-indigo-600">inspiration</span> happens.</h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">Modern, flexible workspaces designed for startups, creatives, and remote teams in the heart of the city.</p>
        <div className="inline-flex items-center gap-4 bg-indigo-50 border border-indigo-100 p-4 rounded-2xl">
          <Zap className="text-indigo-600" />
          <span className="font-semibold text-indigo-900">Try us for free: Get a one-day pass on your first visit!</span>
        </div>
      </header>

      <section id="workspaces" className="py-20 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Workspace Solutions</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Open Lounge", cap: "20 members", price: "Flexible" },
            { title: "Team Suites", cap: "4-12 people", price: "Private" },
            { title: "Focus Pods", cap: "1 person", price: "Hourly" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-500 mb-4">{item.cap}</p>
              <span className="text-indigo-600 font-bold">{item.price}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          {[
            { icon: Wifi, text: "High-speed Fiber" },
            { icon: Coffee, text: "Artisan Coffee" },
            { icon: Shield, text: "Secure Access" },
            { icon: Clock, text: "24/7 Availability" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4">
              <item.icon size={40} className="text-indigo-400" />
              <p className="font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="membership" className="py-20 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Membership Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200">
              <h3 className="text-xl font-bold mb-4">{p.name}</h3>
              <p className="text-4xl font-extrabold mb-6">{p.price}<span className="text-sm font-normal text-slate-400">/mo</span></p>
              <ul className="space-y-4 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-slate-600"><Check size={16} className="text-indigo-600" /> {f}</li>
                ))}
              </ul>
              <button className="w-full py-3 border-2 border-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition">Select Plan</button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">What our members say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-50 rounded-3xl">
              <div className="flex gap-1 mb-4 text-amber-400"><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/></div>
              <p className="text-lg italic mb-6">"NexusWork transformed my productivity. The community is incredibly supportive and the space is beautiful."</p>
              <p className="font-bold">— Sarah Jenkins, Creative Director</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl">
              <div className="flex gap-1 mb-4 text-amber-400"><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/></div>
              <p className="text-lg italic mb-6">"Best decision for my startup. The private offices are quiet, and the meeting rooms are top-notch."</p>
              <p className="font-bold">— Mark Thompson, Founder of Flow</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-white font-bold mb-4">NexusWork</h4>
            <p>123 Innovation Drive</p>
            <p>Tech City, TC 94105</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p>hello@nexuswork.com</p>
            <p>(555) 123-4567</p>
          </div>
          <div className="col-span-2 text-sm">
            <p>© 2024 NexusWork Spaces. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}`,

  "crypto-site": `import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3, 
  DollarSign, 
  CreditCard, 
  ChevronDown, 
  ChevronRight,
  Lock,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';

const assets = [
  { name: 'Bitcoin', symbol: 'BTC', price: '$64,231.42', change: '+2.4%', volume: '$32.4B' },
  { name: 'Ethereum', symbol: 'ETH', price: '$3,452.18', change: '+1.8%', volume: '$15.2B' },
  { name: 'Solana', symbol: 'SOL', price: '$145.67', change: '-0.5%', volume: '$4.1B' },
  { name: 'Chainlink', symbol: 'LINK', price: '$18.23', change: '+4.2%', volume: '$890M' },
  { name: 'Cardano', symbol: 'ADA', price: '$0.45', change: '-1.2%', volume: '$520M' },
  { name: 'Polkadot', symbol: 'DOT', price: '$7.12', change: '+0.9%', volume: '$340M' },
  { name: 'Polygon', symbol: 'MATIC', price: '$0.92', change: '+1.5%', volume: '$280M' },
  { name: 'Avalanche', symbol: 'AVAX', price: '$48.34', change: '-2.1%', volume: '$710M' },
];

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">ApexExchange</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#markets" className="text-sm font-medium text-slate-600 hover:text-blue-600">Markets</a>
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600">Features</a>
            <a href="#security" className="text-sm font-medium text-slate-600 hover:text-blue-600">Security</a>
            <button className="text-sm font-medium text-slate-900">Sign In</button>
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition">Get Started</button>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <header className="py-20 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">Trade with Confidence.<br />Scale your Assets.</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">The professional-grade platform for crypto traders. Low fees, deep liquidity, and institutional-grade security.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700">Create Account</button>
          <button className="bg-white border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50">View Markets</button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          {[
            { name: 'BTC/USD', price: '$64,231', trend: '+2.4%' },
            { name: 'ETH/USD', price: '$3,452', trend: '+1.8%' },
            { name: 'SOL/USD', price: '$145.67', trend: '-0.5%' },
            { name: 'LINK/USD', price: '$18.23', trend: '+4.2%' }
          ].map((coin) => (
            <div key={coin.name} className="text-left">
              <p className="text-xs text-slate-400 font-semibold uppercase">{coin.name}</p>
              <div className="flex items-center gap-2">
                <span className="font-bold">{coin.price}</span>
                <span className={\`text-xs \${coin.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}\`}>{coin.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </header>

      <section id="markets" className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Market Overview</h2>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Asset</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">24h Change</th>
                <th className="px-6 py-4">24h Volume</th>
                <th className="px-6 py-4">Trade</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.symbol} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-semibold">{asset.name} <span className="text-slate-400">{asset.symbol}</span></td>
                  <td className="px-6 py-4">{asset.price}</td>
                  <td className={\`px-6 py-4 \${asset.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}\`}>{asset.change}</td>
                  <td className="px-6 py-4">{asset.volume}</td>
                  <td className="px-6 py-4"><button className="text-blue-600 font-semibold flex items-center gap-1">Trade <ArrowUpRight className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            { icon: BarChart3, title: 'Advanced Charts', desc: 'Real-time data with over 100+ technical indicators for precise trading.' },
            { icon: Zap, title: 'Lightning Execution', desc: 'Our matching engine processes 1.5M orders per second with minimal latency.' },
            { icon: DollarSign, title: 'Competitive Fees', desc: 'Tiered fee structure starting as low as 0.05% for high-volume traders.' }
          ].map((f, i) => (
            <div key={i} className="p-8 border border-slate-100 rounded-2xl hover:shadow-lg transition">
              <f.icon className="w-10 h-10 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="security" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="bg-slate-900 text-white rounded-3xl p-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">Institutional Grade Security</h2>
            <p className="text-slate-400 mb-8 text-lg">We store 98% of all digital assets in cold storage, insured by top-tier global underwriters. Your peace of mind is our priority.</p>
            <ul className="space-y-4">
              {['Multi-signature wallets', 'SOC 2 Type II Compliance', '24/7 Threat Monitoring'].map((item, i) => (
                <li key={i} className="flex items-center gap-3"><CheckCircle className="text-blue-500" /> {item}</li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3 h-64 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700">
            <Lock className="w-20 h-20 text-blue-500" />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            { q: 'How do I deposit funds?', a: 'You can deposit via bank transfer, credit card, or SEPA transfer depending on your region.' },
            { q: 'Is there a minimum deposit?', a: 'The minimum initial deposit is just $10 USD equivalent.' },
            { q: 'Which countries are supported?', a: 'We currently support over 120 countries, including the US, UK, Canada, and EU member states.' }
          ].map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-6 text-left hover:border-blue-300 transition">
              <div className="flex justify-between items-center cursor-pointer">
                <h4 className="font-bold">{faq.q}</h4>
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-slate-100 py-16 px-4 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-blue-600 w-5 h-5" />
              <span className="font-bold">ApexExchange</span>
            </div>
            <p className="text-sm text-slate-500">The world's fastest crypto exchange for professional traders.</p>
          </div>
          {['Products', 'Company', 'Support'].map((col) => (
            <div key={col}>
              <h4 className="font-bold mb-4">{col}</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Spot Trading</li>
                <li>Futures</li>
                <li>Staking</li>
                <li>API Docs</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 text-xs text-slate-400">
          <p className="mb-4">Disclaimer: Trading digital assets involves significant risk and can result in the loss of your invested capital. ApexExchange is not a bank. Digital assets are not subject to standard deposit insurance. Please consult with a financial advisor.</p>
          <p>&copy; 2024 Apex Exchange Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}`,

  "data-table": `import React, { useState } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Shield, 
  Mail, 
  Filter,
  Plus
} from 'lucide-react';

const TEAM_MEMBERS = [
  { id: 1, name: "Elena Rodriguez", role: "Product Designer", status: "Active", email: "elena@nexus.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { id: 2, name: "Marcus Chen", role: "Senior Engineer", status: "Active", email: "marcus@nexus.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 3, name: "Sarah Jenkins", role: "Marketing Lead", status: "Away", email: "sarah@nexus.com", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" },
  { id: 4, name: "David Kim", role: "Data Analyst", status: "Active", email: "david@nexus.com", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
  { id: 5, name: "Amara Okafor", role: "Operations Mgr", status: "Offline", email: "amara@nexus.com", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" },
  { id: 6, name: "Thomas Wright", role: "Frontend Dev", status: "Active", email: "thomas@nexus.com", avatar: "https://images.unsplash.com/photo-1519345182560-3f2d17c4d2d0?w=100&h=100&fit=crop" },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMembers = TEAM_MEMBERS.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team Directory</h1>
            <p className="text-slate-500">Manage your organization's members and access levels.</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium">
            <Plus size={18} /> Add Member
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search members..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 border border-slate-200 px-4 py-2 rounded-lg font-medium transition">
            <Filter size={18} /> Filters
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-sm text-slate-500">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{member.role}</td>
                    <td className="px-6 py-4">
                      <span className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium \${
                        member.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 
                        member.status === 'Away' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }\`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-indigo-600 transition p-1">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-white">
            <p className="text-sm text-slate-500">Showing <strong>{filteredMembers.length}</strong> results</p>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronLeft size={18} />
              </button>
              <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-400 text-sm py-8">
          <p>© 2024 Nexus Operations Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}`,

  "daycare-site": `import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Calendar, 
  Users, 
  Shield, 
  Star, 
  Zap, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const programs = [
    { age: "Infants", range: "6 weeks - 18 months", desc: "Gentle care with sensory play and personalized routines.", color: "bg-amber-100" },
    { age: "Toddlers", range: "18 months - 3 years", desc: "Focus on social development, motor skills, and curiosity.", color: "bg-sky-100" },
    { age: "Preschool", range: "3 years - 5 years", desc: "Pre-literacy, STEM basics, and structured group learning.", color: "bg-emerald-100" },
  ];

  const teachers = [
    { name: "Sarah Jenkins", role: "Lead Educator", cert: "M.Ed in Early Childhood", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200" },
    { name: "Marcus Thorne", role: "Preschool Specialist", cert: "BA Child Development", img: "https://images.unsplash.com/photo-1602116335926-9602f9e42106?auto=format&fit=crop&q=80&w=200" },
  ];

  return (
    <div className="min-h-screen bg-orange-50 text-slate-800 font-sans">
      {/* Nav */}
      <nav className="bg-white sticky top-0 z-50 border-b border-orange-100 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-orange-600 flex items-center gap-2">
          <Zap /> LittleSprouts
        </div>
        <div className="hidden md:flex gap-8 font-medium">
          {['Programs', 'Curriculum', 'Safety', 'Tuition', 'Contact'].map(i => (
            <a key={i} href={\`#\${i.toLowerCase()}\`} className="hover:text-orange-600 transition-colors">{i}</a>
          ))}
        </div>
        <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition">Enrol Now</button>
      </nav>

      {/* Hero */}
      <header className="px-6 py-16 md:py-24 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">Where Little Minds <span className="text-orange-600">Grow Big Dreams</span>.</h1>
          <p className="text-xl text-slate-600">A nurturing, safe, and stimulating environment for your child's first steps into the world of learning.</p>
          <div className="flex gap-4">
            <button className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-700">Schedule a Tour</button>
            <button className="bg-white border-2 border-orange-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-orange-600">View Programs</button>
          </div>
        </div>
        <div className="flex-1 w-full">
          <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800" alt="Happy children playing" className="rounded-3xl shadow-2xl" />
        </div>
      </header>

      {/* Programs */}
      <section id="programs" className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Age-Appropriate Programs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((p, i) => (
              <div key={i} className={\`\${p.color} p-8 rounded-3xl space-y-4\`}>
                <h3 className="text-2xl font-bold">{p.age}</h3>
                <p className="text-sm font-semibold uppercase text-slate-600">{p.range}</p>
                <p>{p.desc}</p>
                <button className="flex items-center gap-2 font-bold underline">Learn more <ArrowRight size={16}/></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section id="curriculum" className="px-6 py-20">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl border border-orange-100">
          <h2 className="text-3xl font-bold mb-8">A Typical Day</h2>
          <div className="space-y-6">
            {[
              { time: "8:00 AM", task: "Arrival & Free Play" },
              { time: "9:30 AM", task: "Morning Circle Time & Music" },
              { time: "11:00 AM", task: "Outdoor Exploration" },
              { time: "12:30 PM", task: "Nutritious Lunch & Rest" },
              { time: "3:00 PM", task: "Creative Arts & Storytelling" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 hover:bg-orange-50 rounded-xl transition">
                <div className="bg-orange-100 p-3 rounded-lg text-orange-600"><Clock size={20}/></div>
                <span className="font-bold w-24">{item.time}</span>
                <span>{item.task}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Teachers */}
      <section id="safety" className="px-6 py-20 bg-orange-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3"><Shield className="text-orange-600"/> Safety First</h2>
            <ul className="space-y-4">
              {['State-licensed facility', 'CPR & First Aid certified staff', 'Secure gated entry', 'Low child-to-teacher ratios'].map(item => (
                <li key={item} className="flex items-center gap-3 bg-white p-4 rounded-xl"><CheckCircle className="text-emerald-500"/> {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Educators</h2>
            <div className="grid grid-cols-2 gap-4">
              {teachers.map(t => (
                <div key={t.name} className="bg-white p-6 rounded-2xl">
                  <img src={t.img} className="w-16 h-16 rounded-full mb-4 object-cover" />
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-sm text-slate-500">{t.role}</p>
                  <p className="text-xs text-orange-600 mt-2">{t.cert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">LittleSprouts</h3>
            <p className="text-slate-400">Nurturing the leaders of tomorrow, one sprout at a time.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold">Contact</h4>
            <p className="text-slate-400 flex items-center gap-2"><MapPin size={16}/> 123 Maple St, Oakwood</p>
            <p className="text-slate-400 flex items-center gap-2"><Mail size={16}/> hello@littlesprouts.edu</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500">
          © 2024 LittleSprouts Early Learning Center. All rights reserved.
        </div>
      </footer>
    </div>
  );
}`,

  "dentist-site": `import React, { useState } from 'react';
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

  "fashion-brand-site": `import React, { useState } from 'react';
import { ShoppingCart, Menu, ArrowRight, Star, Shield, Zap, Mail, ChevronRight } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const products = [
    { id: 1, name: 'Obsidian Wool Overcoat', price: '$495', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Architectural Silk Shirt', price: '$185', img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'Seamless Tech Trousers', price: '$220', img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7e803?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'Minimalist Leather Derby', price: '$340', img: 'https://images.unsplash.com/photo-1533867639458-f2f5f14c6c4a?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Nav */}
      <nav className="fixed w-full z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tighter">AURA STUDIO</span>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#collection" className="hover:text-stone-500">Collection</a>
            <a href="#story" className="hover:text-stone-500">Our Story</a>
            <a href="#fit" className="hover:text-stone-500">Fit Guide</a>
          </div>
          <button className="relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[85vh] flex items-end p-12 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2400" alt="Campaign Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
        <div className="relative z-10 text-white max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-tight">The Winter Series.</h1>
          <p className="text-lg mb-8 opacity-90">Precision tailoring for the modern urban landscape. Discover the intersection of form and function.</p>
          <button className="bg-white text-stone-900 px-8 py-4 font-semibold flex items-center gap-2 hover:bg-stone-200 transition">
            Shop New Arrivals <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-light mb-12">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products.map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-stone-200 mb-4 overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <h3 className="font-medium">{p.name}</h3>
              <p className="text-stone-500">{p.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story & Materials */}
      <section id="story" className="py-24 bg-stone-900 text-stone-100">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-light mb-6">Designed for longevity.</h2>
            <p className="text-stone-400 mb-6 leading-relaxed">We reject the cycle of fast-moving trends. Aura Studio is built on the philosophy of 'Less, but better.' Every garment is engineered to endure, using only sustainably sourced organic wools and recycled technical fibers.</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm"><Shield size={16} /> Lifetime Stitch Guarantee</div>
              <div className="flex items-center gap-2 text-sm"><Zap size={16} /> Carbon Neutral</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600" alt="Fabric detail" className="rounded-sm" />
            <img src="https://images.unsplash.com/photo-1525507119023-7561f0857313?auto=format&fit=crop&q=80&w=600" alt="Studio work" className="rounded-sm mt-8" />
          </div>
        </div>
      </section>

      {/* Fit & Press */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div id="fit" className="bg-stone-100 p-12 rounded-2xl">
          <h3 className="text-2xl font-light mb-4">Precision Fit</h3>
          <p className="text-stone-600 mb-8">Not sure about your size? Our AI-powered fit tool analyzes your measurements against our specific garment patterns to ensure the perfect drape every time.</p>
          <button className="text-stone-900 font-semibold border-b-2 border-stone-900 flex items-center gap-2">Find My Size <ChevronRight size={16} /></button>
        </div>
        <div>
          <h3 className="text-2xl font-light mb-8">As Seen In</h3>
          <div className="space-y-6">
            {['Vogue Business', 'The Financial Times', 'Hypebeast'].map((pub) => (
              <div key={pub} className="flex items-center justify-between py-4 border-b border-stone-200">
                <span className="text-lg font-bold">{pub}</span>
                <Star className="text-stone-400" size={16} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email */}
      <section className="py-24 bg-stone-200">
        <div className="max-w-xl mx-auto px-6 text-center">
          <Mail className="mx-auto mb-6" size={40} />
          <h2 className="text-3xl font-light mb-4">Early Access</h2>
          <p className="mb-8 text-stone-600">Join our newsletter to receive first access to seasonal drops and exclusive studio events.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="email@address.com" className="flex-1 px-4 py-3 rounded-md border border-stone-300" />
            <button className="bg-stone-900 text-white px-6 py-3 rounded-md hover:bg-stone-800">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-stone-200 text-sm text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p>&copy; 2024 Aura Studio. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}`,

  "finance-overview": `import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  ShoppingCart, 
  Zap, 
  Shield, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  Bell,
  Home,
  PieChart,
  Calendar,
  Settings,
  LogOut
} from 'lucide-react';

const transactions = [
  { id: 1, title: 'Apple Store', category: 'Electronics', date: 'Oct 24, 2023', amount: -1299.00, type: 'expense' },
  { id: 2, title: 'Salary Deposit', category: 'Income', date: 'Oct 22, 2023', amount: 5400.00, type: 'income' },
  { id: 3, title: 'Whole Foods Market', category: 'Groceries', date: 'Oct 20, 2023', amount: -184.20, type: 'expense' },
  { id: 4, title: 'Netflix Subscription', category: 'Entertainment', date: 'Oct 18, 2023', amount: -19.99, type: 'expense' },
  { id: 5, title: 'City Gas Station', category: 'Transport', date: 'Oct 15, 2023', amount: -65.50, type: 'expense' },
];

const categories = [
  { name: 'Housing', percent: 45, color: 'bg-emerald-500' },
  { name: 'Groceries', percent: 25, color: 'bg-emerald-400' },
  { name: 'Entertainment', percent: 15, color: 'bg-emerald-300' },
  { name: 'Transport', percent: 15, color: 'bg-emerald-200' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Sidebar */}
      <nav className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <DollarSign className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">FinTrack</span>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-emerald-600 font-medium cursor-pointer"><Home size={20} /> Dashboard</li>
            <li className="flex items-center gap-3 text-slate-500 hover:text-emerald-600 cursor-pointer"><Calendar size={20} /> Transactions</li>
            <li className="flex items-center gap-3 text-slate-500 hover:text-emerald-600 cursor-pointer"><CreditCard size={20} /> Cards</li>
          </ul>
        </div>
        <div className="border-t pt-6 space-y-4">
          <div className="flex items-center gap-3 text-slate-500 cursor-pointer"><Settings size={20} /> Settings</div>
          <div className="flex items-center gap-3 text-red-500 cursor-pointer"><LogOut size={20} /> Logout</div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Alex</h1>
            <p className="text-slate-500">Here's your financial overview for October.</p>
          </div>
          <button className="p-2 bg-white border rounded-full text-slate-600 hover:bg-slate-50">
            <Bell size={20} />
          </button>
        </header>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500 mb-1">Total Balance</p>
            <h2 className="text-3xl font-bold">$24,560.84</h2>
            <div className="flex items-center gap-1 text-emerald-600 text-sm mt-2 font-medium">
              <TrendingUp size={16} /> +2.4% from last month
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500 mb-1">Monthly Spending</p>
            <h2 className="text-3xl font-bold">$3,240.50</h2>
            <div className="flex items-center gap-1 text-red-500 text-sm mt-2 font-medium">
              <TrendingDown size={16} /> -1.2% from last month
            </div>
          </div>
          <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-lg shadow-emerald-200">
            <p className="text-emerald-50 mb-1">Savings Goal</p>
            <h2 className="text-3xl font-bold">$12,000</h2>
            <div className="w-full bg-emerald-800 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-white h-full w-[75%]"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Recent Transactions</h3>
            <div className="space-y-4">
              {transactions.map(t => (
                <div key={t.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                  <div className="flex items-center gap-4">
                    <div className={\`p-2 rounded-lg \${t.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}\`}>
                      {t.type === 'income' ? <ArrowUpRight size={20} /> : <ShoppingCart size={20} />}
                    </div>
                    <div>
                      <p className="font-semibold">{t.title}</p>
                      <p className="text-xs text-slate-500">{t.category} • {t.date}</p>
                    </div>
                  </div>
                  <p className={\`font-bold \${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}\`}>
                    {t.type === 'income' ? '+' : ''}{t.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-8">
            {/* Payment Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl text-white shadow-xl">
              <div className="flex justify-between items-start mb-12">
                <Zap className="text-emerald-400" />
                <Shield className="text-slate-500" />
              </div>
              <p className="text-xl tracking-widest font-mono mb-6">4829 •••• •••• 9201</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase text-slate-400">Card Holder</p>
                  <p className="font-medium">ALEX RIVERA</p>
                </div>
                <p className="font-bold text-lg">VISA</p>
              </div>
            </div>

            {/* Spending Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-lg mb-6">Spending Categories</h3>
              <div className="space-y-4">
                {categories.map(c => (
                  <div key={c.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{c.name}</span>
                      <span className="font-semibold">{c.percent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={\`\${c.color} h-full\`} style={{ width: \`\${c.percent}%\` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}`,

  "furniture-store-site": `import React, { useState } from 'react';
import { ShoppingCart, Menu, Star, Truck, Shield, Zap, ArrowRight, ChevronRight, User, Search } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const products = [
    { id: 1, name: "Nordic Oak Dining Table", price: 899, material: "Solid White Oak", img: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Velvet Lounge Armchair", price: 450, material: "Performance Velvet", img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Minimalist Bed Frame", price: 1200, material: "Walnut Veneer", img: "https://images.unsplash.com/photo-1505693416388-15ce0d65ead5?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "Modular Sectional Sofa", price: 2100, material: "Linen Blend", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-orange-600" />
              <span className="text-xl font-bold tracking-tight">MODERNHOME</span>
            </div>
            <div className="hidden md:flex gap-8 font-medium text-stone-600">
              <a href="#" className="hover:text-orange-600">Living</a>
              <a href="#" className="hover:text-orange-600">Bedroom</a>
              <a href="#" className="hover:text-orange-600">Dining</a>
              <a href="#" className="hover:text-orange-600">Services</a>
            </div>
            <div className="flex items-center gap-4">
              <Search className="h-5 w-5 cursor-pointer" />
              <User className="h-5 w-5 cursor-pointer" />
              <div className="relative cursor-pointer">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
              </div>
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-16 lg:py-24 bg-stone-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1600" alt="Interior" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-orange-600 text-white inline-block px-4 py-1 rounded-full text-sm font-semibold mb-6">SPRING SALE: UP TO 40% OFF</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-2xl leading-tight">Elevate your home, refine your space.</h1>
          <p className="text-xl text-stone-300 mb-8 max-w-lg">Curated designs that blend comfort with modern elegance. Quality craftsmanship built for life.</p>
          <button className="bg-white text-stone-900 px-8 py-4 rounded-lg font-semibold hover:bg-stone-200 transition">Shop Collection</button>
        </div>
      </header>

      {/* Shop by Room */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10">Shop by Room</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Living Room', 'Bedroom', 'Dining Room', 'Home Office'].map((room) => (
            <div key={room} className="group cursor-pointer">
              <div className="h-64 bg-stone-200 rounded-xl mb-4 overflow-hidden">
                <img src={\`https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=400\`} alt={room} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <h3 className="font-semibold text-lg flex items-center justify-between">
                {room} <ChevronRight className="h-4 w-4" />
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10">Featured Arrivals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <img src={p.img} alt={p.name} className="w-full h-60 object-cover rounded-lg mb-4" />
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-stone-500 text-sm mb-2">{p.material}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-xl">\${p.price}</span>
                  <button className="bg-stone-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Services */}
      <section className="py-20 max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-6">Expert Design Services</h2>
          <p className="text-lg text-stone-600 mb-6">Not sure where to start? Our professional interior designers are here to help you bring your vision to life with personalized consultations and 3D space planning.</p>
          <button className="flex items-center gap-2 text-orange-600 font-semibold hover:underline">
            Book a Consultation <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 w-full h-96 bg-stone-200 rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000" alt="Design service" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Logistics & Warranty */}
      <section className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <Truck className="h-10 w-10 text-orange-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">White Glove Delivery</h3>
            <p className="text-stone-600">We deliver, unpack, and assemble your furniture in the room of your choice. Clean and stress-free.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <Shield className="h-10 w-10 text-orange-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">10-Year Warranty</h3>
            <p className="text-stone-600">Every piece is crafted to last. We stand by our quality with a comprehensive 10-year structural warranty.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <Zap className="h-10 w-10 text-orange-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Fast Shipping</h3>
            <p className="text-stone-600">In-stock items ship within 48 hours. Track your delivery directly from our warehouse to your front door.</p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Loved by Homeowners</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Jenkins", review: "The quality of the oak table is unmatched. Exceeded all my expectations!" },
            { name: "Marcus Thorne", review: "Seamless delivery process. The team was professional and incredibly fast." },
            { name: "Elena Rodriguez", review: "Finally found a sofa that is both stylish and comfortable. Perfect for our new home." }
          ].map((r, i) => (
            <div key={i} className="p-8 bg-white border border-stone-100 rounded-2xl">
              <div className="flex text-orange-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-stone-600 italic mb-6">"{r.review}"</p>
              <p className="font-bold">{r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 text-white mb-6">
              <Zap className="h-6 w-6 text-orange-600" />
              <span className="text-xl font-bold">MODERNHOME</span>
            </div>
            <p>Redefining living spaces with timeless design and uncompromising quality since 2012.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>Living Room</li>
              <li>Dining</li>
              <li>Bedroom</li>
              <li>Accessories</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>Track Order</li>
              <li>Shipping Info</li>
              <li>Warranty Policy</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Stay Connected</h4>
            <p className="mb-4">Subscribe for design tips and exclusive early access to seasonal sales.</p>
            <input type="email" placeholder="Your email" className="w-full bg-stone-800 p-3 rounded-lg border border-stone-700 focus:outline-none focus:border-orange-600" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-sm">
          &copy; 2024 ModernHome Interiors. All rights reserved.
        </div>
      </footer>
    </div>
  );
}`,

  "game-studio-site": `import React, { useState } from 'react';
import { Play, Star, ArrowRight, Zap, Shield, Users, Mail, ChevronRight, TrendingUp, Calendar, Package } from 'lucide-react';

export default function App() {
  const games = [
    { title: "Aetheria: Void Born", year: "2024", platforms: ["PC", "PS5"], img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" },
    { title: "Neon Syndicate", year: "2023", platforms: ["PC", "Xbox"], img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" },
    { title: "Iron Vanguard", year: "2022", platforms: ["PC"], img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800" },
    { title: "Echoes of Solstice", year: "2021", platforms: ["PC", "PS5", "Switch"], img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800" },
    { title: "Quantum Drift", year: "2020", platforms: ["PC"], img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800" },
    { title: "Titan Protocol", year: "2019", platforms: ["PC", "Xbox"], img: "https://images.unsplash.com/photo-1593341643962-f7b5a6c3e35b?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Nav */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter text-indigo-400">VOID.STUDIOS</div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#games" className="hover:text-white transition">Games</a>
            <a href="#about" className="hover:text-white transition">Studio</a>
            <a href="#press" className="hover:text-white transition">Press</a>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-full text-sm font-semibold transition">
            Join Discord
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">Now in Development</span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-none">AETHERIA:<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">VOID BORN</span></h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-10">Ascend through the shattered dimensions of the Aether. An open-world ARPG where every choice reshapes the fabric of reality.</p>
          <button className="inline-flex items-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition">
            <Play size={20} fill="currentColor" /> Watch Trailer
          </button>
        </div>
      </header>

      {/* Games Grid */}
      <section id="games" className="py-24 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Our Library</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-slate-800">
                  <img src={game.img} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <ArrowRight className="text-white" size={48} />
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{game.title}</h3>
                    <p className="text-slate-500 text-sm">{game.year}</p>
                  </div>
                  <div className="flex gap-2">
                    {game.platforms.map(p => (
                      <span key={p} className="text-[10px] uppercase font-bold text-indigo-400 border border-indigo-400/30 px-2 py-1 rounded">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Next-Gen Mechanics</h2>
            <div className="space-y-8">
              {[
                { icon: Zap, title: "Dynamic Flow Combat", desc: "Adaptive AI that learns your playstyle in real-time." },
                { icon: Shield, title: "Persistent World Impact", desc: "Your choices leave permanent scars on the game world map." },
                { icon: TrendingUp, title: "Procedural Narrative", desc: "Over 500 hours of unique branching questlines." }
              ].map((feat, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <feat.icon />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">{feat.title}</h4>
                    <p className="text-slate-400">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
            <img src="https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=1200" alt="Gameplay" className="rounded-2xl w-full" />
          </div>
        </div>
      </section>

      {/* Newsletter / Wishlist */}
      <section className="py-24 px-6 bg-gradient-to-b from-indigo-950/20 to-slate-950">
        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 p-12 rounded-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-slate-400 mb-8">Join 50,000+ players tracking development. Get exclusive beta access invites and behind-the-scenes content.</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button className="bg-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-500 transition">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-500">© 2024 Void Studios. All rights reserved.</div>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-indigo-400">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400">Terms of Service</a>
            <a href="#" className="hover:text-indigo-400">Press Kit</a>
          </div>
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

  "home-services-site": `import React, { useState } from 'react';
import { 
  Phone, Zap, Droplets, Flame, Shield, Calendar, 
  CheckCircle, Star, ArrowRight, Clock, MapPin, 
  User, Settings, Mail, CreditCard 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('plumbing');

  const services = [
    { id: 'plumbing', title: 'Plumbing Services', icon: <Droplets className="w-8 h-8 text-blue-600" />, desc: 'Expert leak detection, pipe repair, and drain cleaning.' },
    { id: 'heating', title: 'Heating & Cooling', icon: <Flame className="w-8 h-8 text-blue-600" />, desc: 'Furnace repair, AC installation, and system optimization.' },
    { id: 'electrical', title: 'Electrical Work', icon: <Zap className="w-8 h-8 text-blue-600" />, desc: 'Panel upgrades, lighting fixtures, and circuit diagnostics.' },
  ];

  const pricing = [
    { service: 'Drain Clearing', price: '$129', time: '1 hour' },
    { service: 'AC Tune-up', price: '$99', time: '45 mins' },
    { service: 'Panel Inspection', price: '$189', time: '2 hours' },
    { service: 'Water Heater Flush', price: '$150', time: '1.5 hours' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            <Shield className="w-8 h-8" /> ProFix Home
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#reviews">Reviews</a>
            <a href="tel:5550123456" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
              <Phone className="w-4 h-4" /> 555-012-3456
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative py-20 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Available 24/7 for Emergencies</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mt-4 mb-6 text-slate-900">Your Trusted Home Service Experts</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">From leaky faucets to full electrical panel replacements, our certified technicians are ready to help you today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#booking" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" /> Schedule Emergency Repair
            </a>
          </div>
        </div>
      </header>

      {/* Services */}
      <section id="services" className="py-20 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Core Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.id} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Transparent Pricing</h2>
          <div className="bg-white rounded-xl overflow-hidden text-slate-900">
            {pricing.map((item, i) => (
              <div key={i} className={\`flex justify-between items-center p-6 \${i !== pricing.length - 1 ? 'border-b border-slate-100' : ''}\`}>
                <span className="font-medium text-lg">{item.service}</span>
                <div className="flex items-center gap-6">
                  <span className="text-slate-500 text-sm flex items-center gap-1"><Clock className="w-4 h-4" /> {item.time}</span>
                  <span className="font-bold text-blue-600 text-xl">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technicians & Reviews */}
      <section id="reviews" className="py-20 max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-8">Our Certified Team</h2>
            <div className="space-y-6">
              {[
                { name: 'Sarah Jenkins', role: 'Master Plumber', cert: '15+ Years Experience' },
                { name: 'Marcus Thorne', role: 'Lead Electrician', cert: 'Licensed & Insured' }
              ].map((tech, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-500"><User /></div>
                  <div>
                    <h4 className="font-bold">{tech.name}</h4>
                    <p className="text-sm text-blue-600">{tech.role}</p>
                    <p className="text-xs text-slate-500">{tech.cert}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
            <div className="space-y-6">
              {[
                { name: 'Alice R.', text: 'Fast response and professional service. My water heater was fixed in under two hours!' },
                { name: 'David L.', text: 'Very transparent with pricing. No surprise fees and the work was perfect.' }
              ].map((rev, i) => (
                <div key={i} className="p-6 bg-white rounded-xl border border-slate-200">
                  <div className="flex gap-1 text-yellow-400 mb-3"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
                  <p className="text-slate-600 mb-3 italic">"{rev.text}"</p>
                  <p className="font-bold text-sm">- {rev.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-20 bg-blue-50">
        <div className="max-w-2xl mx-auto px-4 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Book a Service</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="p-3 border border-slate-300 rounded-lg w-full" />
              <input type="tel" placeholder="Phone Number" className="p-3 border border-slate-300 rounded-lg w-full" />
            </div>
            <select className="w-full p-3 border border-slate-300 rounded-lg">
              <option>Select Urgency</option>
              <option>Emergency (Within 2 Hours)</option>
              <option>Scheduled (Within 48 Hours)</option>
              <option>Routine Maintenance</option>
            </select>
            <textarea placeholder="Describe the issue..." className="w-full p-3 border border-slate-300 rounded-lg h-32"></textarea>
            <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700">Submit Request</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-2 items-center text-white font-bold text-xl mb-4">
            <Shield className="w-6 h-6" /> ProFix Home
          </div>
          <p className="text-sm mb-8">Serving the greater metropolitan area with integrity since 2008.</p>
          <div className="flex justify-center gap-8 text-sm">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Careers</a>
          </div>
        </div>
      </footer>
    </div>
  );
}`,

  "hotel-site": `import React, { useState } from 'react';
import { 
  Calendar, Users, Star, MapPin, Coffee, Wifi, Shield, 
  Clock, ArrowRight, ChevronDown, Sparkles, Zap, DollarSign,
  Phone, Mail, Menu, X 
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const rooms = [
    { name: "Oceanfront Suite", price: 450, guests: 2, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" },
    { name: "Garden Villa", price: 320, guests: 4, image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800" },
    { name: "Deluxe King Room", price: 210, guests: 2, image: "https://images.unsplash.com/photo-1611892440504-42a792e24566?auto=format&fit=crop&q=80&w=800" }
  ];

  const amenities = [
    { icon: <Wifi size={24} />, title: "High-Speed Fiber", desc: "Stay connected anywhere on the property." },
    { icon: <Coffee size={24} />, title: "Artisan Breakfast", desc: "Freshly brewed coffee and seasonal local fruits." },
    { icon: <Shield size={24} />, title: "24/7 Security", desc: "Your safety and privacy are our top priority." },
    { icon: <Sparkles size={24} />, title: "Daily Housekeeping", desc: "Impeccable service for a stress-free stay." }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-serif font-bold tracking-tight text-emerald-800">ELYSIA RESORT</span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
            {['Rooms', 'Dining', 'Spa', 'Location'].map(item => (
              <a key={item} href="#" className="hover:text-emerald-700 transition-colors">{item}</a>
            ))}
          </div>
          <button className="bg-emerald-800 text-white px-6 py-2 rounded-full text-sm hover:bg-emerald-900 transition-all">Book Now</button>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center text-center px-6 pt-20">
        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover" alt="Luxury Resort" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-white max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Experience Serenity</h1>
          <p className="text-lg md:text-xl mb-10 opacity-90">Escape to the shores of Elysia, where luxury meets the horizon.</p>
          
          <div className="bg-white p-4 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-4 text-stone-800">
            <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-stone-200 p-2">
              <Calendar className="text-emerald-700" size={20} />
              <input type="date" className="w-full focus:outline-none text-sm" />
            </div>
            <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-stone-200 p-2">
              <Calendar className="text-emerald-700" size={20} />
              <input type="date" className="w-full focus:outline-none text-sm" />
            </div>
            <div className="flex items-center gap-3 p-2">
              <Users className="text-emerald-700" size={20} />
              <select className="w-full focus:outline-none text-sm bg-transparent">
                <option>2 Guests</option>
                <option>4 Guests</option>
              </select>
            </div>
            <button className="bg-emerald-800 text-white py-3 rounded-xl hover:bg-emerald-900 font-semibold text-sm">Search</button>
          </div>
        </div>
      </header>

      {/* Rooms */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-serif mb-12 text-center">Exquisite Accommodations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room.name} className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow">
              <img src={room.image} alt={room.name} className="h-64 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                <div className="flex justify-between items-center mb-4 text-sm text-stone-500">
                  <span>Up to {room.guests} guests</span>
                  <span className="font-bold text-emerald-800">\${room.price}/night</span>
                </div>
                <button className="w-full border border-emerald-800 text-emerald-800 py-2 rounded-lg hover:bg-emerald-50">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-serif mb-16 text-center">Refined Amenities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((a, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
                <div className="text-emerald-800 mb-4">{a.icon}</div>
                <h4 className="font-semibold text-lg mb-2">{a.title}</h4>
                <p className="text-stone-600 text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining & Spa */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif">A Culinary Journey</h2>
            <p className="text-stone-600 leading-relaxed">Our award-winning chefs source local ingredients to create Mediterranean-inspired dishes with a modern twist. Experience dining under the stars at our signature Azure restaurant.</p>
            <button className="flex items-center gap-2 text-emerald-800 font-semibold">Book a table <ArrowRight size={18} /></button>
          </div>
          <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" className="rounded-2xl shadow-xl" alt="Dining" />
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-stone-50">
        <h2 className="text-4xl font-serif mb-12 text-center">Guest Experiences</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Jenkins", text: "The most beautiful resort I have ever visited. The service was impeccable." },
            { name: "Marcus Thorne", text: "Exceptional dining and a spa that truly rejuvenated my mind and body." },
            { name: "Elena Rodriguez", text: "Perfect location. Waking up to the ocean view every morning was a dream." }
          ].map((r, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-stone-100">
              <div className="flex text-amber-400 mb-4"><Star size={16} fill="currentColor" />{[...Array(4)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}</div>
              <p className="text-stone-700 italic mb-4">"{r.text}"</p>
              <p className="font-bold text-sm text-stone-900">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-white font-serif text-lg mb-4">ELYSIA RESORT</h4>
            <p className="text-sm">128 Coastal Drive, Haven Bay, CA 90210</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <p className="text-sm">reservations@elysia.com</p>
            <p className="text-sm">+1 (555) 123-4567</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Explore</h4>
            <ul className="text-sm space-y-2">
              <li>About Us</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="bg-stone-800 p-2 rounded text-sm w-full" />
              <button className="bg-emerald-800 text-white px-4 py-2 rounded text-sm">Join</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}`,

  "interior-design-site": `import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Zap, Shield, Sparkles, Star, Calendar, Mail, User, Menu, X, Check } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const projects = [
    { title: "Azure Waterfront Villa", type: "Living Room", location: "Miami, FL", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800" },
    { title: "Minimalist Loft", type: "Kitchen", location: "New York, NY", img: "https://images.unsplash.com/photo-1556912173-3d706393a771?auto=format&fit=crop&q=80&w=800" },
    { title: "Mid-Century Retreat", type: "Bedroom", location: "Austin, TX", img: "https://images.unsplash.com/photo-1616594822273-2bebc16563fe?auto=format&fit=crop&q=80&w=800" },
  ];

  const services = [
    { name: "Concept Development", price: "$1,500", desc: "Initial space planning, mood boards, and aesthetic direction." },
    { name: "Full Furnishing", price: "$4,200", desc: "Sourcing, procurement, and white-glove installation." },
    { name: "Renovation Design", price: "$8,500", desc: "Technical drawings, contractor coordination, and site visits." },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 bg-stone-50/80 backdrop-blur-md z-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-stone-900">LUMINA INTERIORS</span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
            {['Portfolio', 'Process', 'Services', 'Contact'].map(link => <a key={link} href={\`#\${link.toLowerCase()}\`} className="hover:text-amber-700 transition">{link}</a>)}
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">Elevating spaces through intentional design.</h1>
          <p className="text-lg text-stone-600 mb-8 max-w-md">We create bespoke interiors that balance modern functionality with timeless aesthetic elegance for your home.</p>
          <button className="bg-stone-900 text-white px-8 py-4 rounded hover:bg-stone-700 transition flex items-center gap-2">
            View Our Portfolio <ArrowRight size={18} />
          </button>
        </div>
        <div className="h-[400px] bg-stone-200 rounded-2xl overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200" alt="Interior Design" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Projects */}
      <section id="portfolio" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-serif mb-12">Featured Projects</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="h-80 bg-stone-200 rounded-lg overflow-hidden mb-4">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-stone-500 text-sm">{p.type} • {p.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-stone-900 text-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-serif mb-16 text-center">Our Design Journey</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[ { icon: Sparkles, step: "Discovery", desc: "Understanding your lifestyle and goals." }, { icon: Zap, step: "Concept", desc: "Curating palettes and spatial layouts." }, { icon: Shield, step: "Execution", desc: "Sourcing and procurement oversight." }, { icon: Check, step: "Reveal", desc: "Styling and final transformation." } ].map((item, i) => (
              <div key={i} className="border-t border-stone-700 pt-8">
                <item.icon className="mb-4 text-amber-500" />
                <h4 className="font-bold mb-2">0{i+1}. {item.step}</h4>
                <p className="text-stone-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-serif mb-12">Design Packages</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="border border-stone-200 p-8 rounded-2xl hover:border-amber-600 transition">
              <h3 className="text-xl font-bold mb-2">{s.name}</h3>
              <p className="text-amber-700 font-bold mb-4">{s.price} <span className="text-stone-400 text-sm font-normal">starting</span></p>
              <p className="text-stone-600 text-sm mb-6">{s.desc}</p>
              <button className="text-sm font-semibold flex items-center gap-2 hover:underline">Learn more <ChevronRight size={16}/></button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-20">
        <div className="bg-white p-10 rounded-3xl border border-stone-200 shadow-sm">
          <h2 className="text-3xl font-serif mb-6">Start Your Project</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="w-full p-4 bg-stone-50 rounded border border-stone-200" />
              <input type="email" placeholder="Email Address" className="w-full p-4 bg-stone-50 rounded border border-stone-200" />
            </div>
            <textarea placeholder="Tell us about your space..." className="w-full p-4 bg-stone-50 rounded border border-stone-200 h-32" />
            <button className="w-full bg-amber-700 text-white py-4 rounded font-bold hover:bg-amber-800 transition">Request Consultation</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-12 text-center text-stone-500 text-sm">
        <p className="mb-4 font-bold text-stone-900">LUMINA INTERIORS</p>
        <p>© 2024 Lumina Design Studio. Crafted for modern living.</p>
      </footer>
    </div>
  );
}`,

  "jewelry-site": `import React, { useState } from 'react';
import { 
  Menu, ShoppingCart, Search, User, Star, ArrowRight, 
  Sparkles, Shield, Clock, Calendar, ChevronRight, CheckCircle 
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const collections = [
    { name: "Celestial Rings", price: "$1,250", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80" },
    { name: "Eternal Pendants", price: "$890", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80" },
    { name: "Minimalist Hoops", price: "$420", img: "https://images.unsplash.com/photo-1630019852942-f89202989a82?auto=format&fit=crop&w=600&q=80" },
    { name: "Heritage Bracelets", price: "$2,100", img: "https://images.unsplash.com/photo-1573408301185-985f40391629?auto=format&fit=crop&w=600&q=80" }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-serif font-bold tracking-tighter text-amber-900">AURELIA</div>
            <div className="hidden md:flex space-x-8 font-medium text-sm uppercase tracking-widest">
              <a href="#collections" className="hover:text-amber-700">Collections</a>
              <a href="#custom" className="hover:text-amber-700">Custom Design</a>
              <a href="#care" className="hover:text-amber-700">Craftsmanship</a>
            </div>
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 cursor-pointer" />
              <User className="w-5 h-5 cursor-pointer" />
              <ShoppingCart className="w-5 h-5 cursor-pointer" />
              <Menu className="w-6 h-6 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=80" alt="Jewellery" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-stone-900/40" />
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Timeless Elegance</h1>
          <p className="text-lg md:text-xl mb-8 font-light max-w-2xl mx-auto">Discover artisan-crafted pieces designed to celebrate your most precious moments.</p>
          <button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-full transition-all">Explore Collection</button>
        </div>
      </header>

      {/* Collections */}
      <section id="collections" className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif text-center mb-12">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="overflow-hidden rounded-lg mb-4">
                <img src={item.img} alt={item.name} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="font-medium text-lg">{item.name}</h3>
              <p className="text-amber-800 font-bold">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Design */}
      <section id="custom" className="bg-stone-900 text-stone-100 py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-serif mb-6">Bespoke Creations</h2>
            <p className="text-stone-300 mb-6 leading-relaxed">Work directly with our master goldsmiths to transform your vision into a unique, wearable masterpiece. From initial sketches to the final polish, we ensure perfection.</p>
            <button className="flex items-center text-amber-500 font-semibold border-b border-amber-500 pb-1">
              Start Your Design <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full h-80 bg-stone-700 rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1577903661182-3d7c1775e54d?auto=format&fit=crop&w=800&q=80" alt="Custom design" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Care & Craft */}
      <section id="care" className="py-20 px-4 max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
        {[
          { icon: Sparkles, title: "Ethical Sourcing", desc: "Conflict-free diamonds and recycled gold." },
          { icon: Shield, title: "Lifetime Warranty", desc: "We stand by our craft forever." },
          { icon: Clock, title: "Artisan Care", desc: "Professional cleaning and inspection services." }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <item.icon className="w-10 h-10 text-amber-800 mb-4" />
            <h4 className="text-xl font-bold mb-2">{item.title}</h4>
            <p className="text-stone-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Appointment */}
      <section className="py-20 bg-stone-100 px-4">
        <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-stone-200">
          <h3 className="text-2xl font-serif text-center mb-8">Book a Private Consultation</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-4 border border-stone-300 rounded-lg" />
            <input type="email" placeholder="Email Address" className="w-full p-4 border border-stone-300 rounded-lg" />
            <button className="w-full bg-stone-900 text-white py-4 rounded-lg font-bold hover:bg-stone-800">Request Appointment</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-200 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h5 className="font-bold mb-4">AURELIA</h5>
            <p className="text-stone-600">Fine Jewellery since 1984.</p>
          </div>
          <div>
            <h5 className="font-bold mb-4">Support</h5>
            <ul className="space-y-2 text-stone-600">
              <li>Shipping & Returns</li>
              <li>Size Guide</li>
              <li>Repair Service</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Certifications</h5>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-stone-500" />
              <Shield className="w-6 h-6 text-stone-500" />
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-4">Newsletter</h5>
            <p className="text-stone-600 mb-4">Join for updates and early access.</p>
            <div className="flex bg-white rounded-lg p-1">
              <input type="email" placeholder="Email" className="flex-1 p-2 outline-none" />
              <button className="bg-amber-800 text-white px-4 rounded-md">Join</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}`,

  "job-board-site": `import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Zap, Star, ChevronDown, CheckCircle, ArrowRight, Users, Shield, Clock } from 'lucide-react';

const JOBS = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'Nebula Systems', salary: '$140k - $180k', location: 'Remote', type: 'Full-time', posted: '2h ago' },
  { id: 2, title: 'Product Designer', company: 'FlowState UI', salary: '$110k - $150k', location: 'New York, NY', type: 'Full-time', posted: '5h ago' },
  { id: 3, title: 'Backend Developer (Go)', company: 'DataStream', salary: '$130k - $170k', location: 'Remote', type: 'Contract', posted: '1d ago' },
  { id: 4, title: 'Marketing Manager', company: 'GrowthPulse', salary: '$90k - $120k', location: 'Austin, TX', type: 'Full-time', posted: '1d ago' },
  { id: 5, title: 'DevOps Engineer', company: 'CloudScale', salary: '$150k - $190k', location: 'Remote', type: 'Full-time', posted: '2d ago' },
  { id: 6, title: 'UX Researcher', company: 'InsightLab', salary: '$100k - $130k', location: 'San Francisco, CA', type: 'Part-time', posted: '2d ago' },
  { id: 7, title: 'Customer Success Lead', company: 'SupportHero', salary: '$85k - $110k', location: 'Remote', type: 'Full-time', posted: '3d ago' },
  { id: 8, title: 'Full Stack Engineer', company: 'Velocity Apps', salary: '$125k - $165k', location: 'Chicago, IL', type: 'Full-time', posted: '4d ago' },
];

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">TalentPulse</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600">Find Jobs</a>
            <a href="#" className="hover:text-indigo-600">Companies</a>
            <a href="#" className="hover:text-indigo-600">Salaries</a>
          </div>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors">
            Post a Job
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-white border-b border-slate-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">Find your next dream role</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Browse thousands of job openings from top tech companies and startups. Your next career move starts here.</p>
          
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xl flex flex-col md:flex-row gap-2 mt-8">
            <div className="flex-1 flex items-center px-4 gap-2 border-b md:border-b-0 md:border-r border-slate-100">
              <Search className="w-5 h-5 text-slate-400" />
              <input placeholder="Job title or keywords" className="w-full py-3 outline-none" />
            </div>
            <div className="flex-1 flex items-center px-4 gap-2">
              <MapPin className="w-5 h-5 text-slate-400" />
              <input placeholder="City or 'Remote'" className="w-full py-3 outline-none" />
            </div>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700">Search</button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {['Remote', 'Seniority', 'Full-time', 'Contract', 'Engineering', 'Design'].map((filter) => (
              <button 
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={\`px-4 py-1.5 rounded-full text-sm border transition-all \${selectedFilter === filter ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 hover:border-slate-300'}\`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Job List */}
      <main className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Recommended for you</h2>
        <div className="space-y-4">
          {JOBS.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-indigo-600 uppercase">
                  {job.company[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 group-hover:text-indigo-600">{job.title}</h3>
                  <p className="text-slate-500 text-sm">{job.company} • {job.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1 text-slate-600"><Briefcase className="w-4 h-4" /> {job.salary}</div>
                <div className="flex items-center gap-1 text-slate-500"><Clock className="w-4 h-4" /> {job.posted}</div>
                <button className="text-indigo-600 font-medium flex items-center gap-1">Apply <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Featured Companies */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10 text-center">Featured Hiring Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Stellar Tech', 'Vertex Labs', 'Omni Health', 'BlueHorizon'].map((name) => (
              <div key={name} className="bg-slate-800 p-6 rounded-xl text-center border border-slate-700">
                <div className="w-12 h-12 mx-auto mb-4 bg-indigo-500 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold">{name}</p>
                <span className="text-xs text-slate-400">12 Open Roles</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto bg-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl shadow-indigo-200">
          <Users className="w-16 h-16 mx-auto mb-6 text-indigo-200" />
          <h2 className="text-3xl font-bold mb-4">Get matched with your dream job</h2>
          <p className="text-indigo-100 mb-8 text-lg">Create a profile and let top companies come to you. No more endless applications.</p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors">Create Candidate Profile</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-12 text-sm text-slate-600">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Zap className="w-5 h-5 text-indigo-600" /> TalentPulse
            </div>
            <p>© 2024 TalentPulse Inc. All rights reserved.</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900">Platform</h4>
            <p>Browse Jobs</p>
            <p>Salaries</p>
            <p>Companies</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900">Company</h4>
            <p>About Us</p>
            <p>Careers</p>
            <p>Support</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900">Legal</h4>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}`,

  "law-firm-site": `import React, { useState } from 'react';
import { 
  Scale, Shield, Users, Briefcase, ChevronRight, Phone, 
  Mail, MapPin, ArrowRight, CheckCircle, Zap, Star 
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-8 h-8 text-blue-900" />
            <span className="text-xl font-bold tracking-tight text-blue-950">STERLING & ASSOCIATES</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#practice" className="hover:text-blue-900 transition-colors">Practice Areas</a>
            <a href="#attorneys" className="hover:text-blue-900 transition-colors">Attorneys</a>
            <a href="#results" className="hover:text-blue-900 transition-colors">Case Results</a>
            <a href="#contact" className="hover:text-blue-900 transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-blue-900 font-semibold">
              <Phone className="w-4 h-4" />
              <span>(555) 892-4400</span>
            </div>
            <a href="#contact" className="bg-blue-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-800 transition-all">
              Consultation
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative py-24 px-6 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-bold uppercase tracking-wider mb-6">Serving Clients Since 1994</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-blue-950 leading-tight mb-6">
              Principled Defense. <br /><span className="text-blue-700">Proven Results.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">
              When the stakes are at their highest, you need representation that combines rigorous legal strategy with unwavering advocacy. We protect your rights with precision.
            </p>
            <div className="flex gap-4">
              <a href="#contact" className="bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-800 transition-all">
                Request Free Consultation <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800" 
              alt="Law office interior" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </header>

      {/* Practice Areas */}
      <section id="practice" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-blue-950">Our Practice Areas</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Corporate Litigation", desc: "Protecting business assets and navigating complex commercial disputes." },
            { title: "Criminal Defense", desc: "Aggressive defense for individuals facing serious felony and misdemeanor charges." },
            { title: "Intellectual Property", desc: "Securing patents, trademarks, and copyright protections for innovators." },
            { title: "Family Law", desc: "Compassionate advocacy in divorce, custody, and mediation proceedings." },
            { title: "Real Estate Law", desc: "Expert navigation of property transactions and zoning litigation." },
            { title: "Employment Law", desc: "Defending rights in workplace discrimination and contract disputes." }
          ].map((item, i) => (
            <div key={i} className="p-8 border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Attorneys */}
      <section id="attorneys" className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center">Senior Counsel</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { name: "Elena Sterling, Esq.", role: "Managing Partner", bar: "Admitted: NY State Bar (1998)" },
              { name: "Marcus Thorne, JD", role: "Senior Litigator", bar: "Admitted: CA State Bar (2005)" }
            ].map((attorney, i) => (
              <div key={i} className="flex gap-6 bg-slate-800 p-8 rounded-2xl">
                <div className="w-24 h-24 bg-slate-700 rounded-full flex-shrink-0 flex items-center justify-center">
                  <Users className="w-10 h-10 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{attorney.name}</h3>
                  <p className="text-blue-400 font-medium mb-2">{attorney.role}</p>
                  <p className="text-slate-400 text-sm">{attorney.bar}</p>
                  <button className="mt-4 text-sm font-semibold flex items-center gap-1 hover:text-blue-400 transition-colors">
                    View Profile <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Results */}
      <section id="results" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { stat: "$42M", label: "Recovered for Clients" },
            { stat: "98%", label: "Success Rate" },
            { stat: "25+", label: "Years Experience" }
          ].map((item, i) => (
            <div key={i} className="p-8">
              <div className="text-5xl font-extrabold text-blue-900 mb-2">{item.stat}</div>
              <div className="text-slate-600 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 px-6 bg-blue-50">
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-blue-950 mb-6">Request A Confidential Consultation</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="First Name" className="w-full p-3 border border-slate-200 rounded-lg" />
              <input type="text" placeholder="Last Name" className="w-full p-3 border border-slate-200 rounded-lg" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full p-3 border border-slate-200 rounded-lg" />
            <textarea placeholder="Brief summary of your legal matter" className="w-full p-3 border border-slate-200 rounded-lg h-32" />
            <button className="w-full bg-blue-900 text-white py-4 rounded-lg font-bold hover:bg-blue-800 transition-all">
              Submit Request
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-slate-300 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-bold mb-4">STERLING & ASSOCIATES</h4>
            <p className="text-sm">Providing elite legal counsel with integrity and excellence.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">New York</h4>
            <p className="text-sm">120 Broadway, Suite 800<br />New York, NY 10005</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Los Angeles</h4>
            <p className="text-sm">444 S Flower St, Suite 2100<br />Los Angeles, CA 90071</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p className="text-sm">contact@sterlinglaw.com<br />(555) 892-4400</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-blue-900 text-center text-xs">
          © 2024 Sterling & Associates. All rights reserved. Attorney Advertising.
        </div>
      </footer>
    </div>
  );
}`,

  "memory-game": `import React, { useState, useEffect, useCallback } from 'react';
import { Bell, CheckCircle, Clock, Heart, Package, RefreshCw, Shield, Star, TrendingUp, Trophy, Zap } from "lucide-react";

const ICONS = ['Zap', 'Star', 'Shield', 'Heart', 'Sun', 'Moon', 'Cloud', 'Anchor'];
// Since I can only use specific imports, we map our logic to the allowed icons
const SYMBOLS = ['Zap', 'Star', 'Shield', 'Heart', 'Check', 'Bell', 'Package', 'TrendingUp'];

type Card = {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  const initializeGame = useCallback(() => {
    const deck = [...SYMBOLS, ...SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
    setMoves(0);
    setTimer(0);
    setIsPlaying(true);
    setFlippedIndices([]);
    setIsLocked(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !cards.every((c) => c.isMatched)) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, cards]);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsLocked(true);
      
      const [first, second] = newFlipped;
      if (newCards[first].symbol === newCards[second].symbol) {
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);
        setIsLocked(false);
      } else {
        setTimeout(() => {
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          setCards(newCards);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap': return <Zap className="w-8 h-8" />;
      case 'Star': return <Star className="w-8 h-8" />;
      case 'Shield': return <Shield className="w-8 h-8" />;
      case 'Heart': return <Heart className="w-8 h-8" />;
      case 'Check': return <CheckCircle className="w-8 h-8" />;
      case 'Bell': return <Bell className="w-8 h-8" />;
      case 'Package': return <Package className="w-8 h-8" />;
      case 'TrendingUp': return <TrendingUp className="w-8 h-8" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center font-sans text-slate-900">
      <header className="w-full max-w-2xl flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-indigo-600">Memory Match</h1>
          <p className="text-slate-500 text-sm">Find all pairs to win!</p>
        </div>
        <button 
          onClick={initializeGame}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <RefreshCw className="w-4 h-4" /> Reset
        </button>
      </header>

      <div className="flex gap-6 mb-8">
        <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
          <Clock className="w-5 h-5 text-indigo-500" />
          <span className="font-semibold">{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
        </div>
        <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
          <Trophy className="w-5 h-5 text-indigo-500" />
          <span className="font-semibold">{moves} Moves</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-lg w-full">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={\`aspect-square rounded-xl flex items-center justify-center transition-all duration-300 transform \${
              card.isFlipped || card.isMatched
                ? 'bg-white rotate-0 shadow-md border-indigo-200'
                : 'bg-indigo-600 rotate-y-180 hover:bg-indigo-500'
            } border-2\`}
          >
            {(card.isFlipped || card.isMatched) && (
              <span className="text-indigo-600 animate-in zoom-in duration-300">
                {getIcon(card.symbol)}
              </span>
            )}
          </button>
        ))}
      </div>

      {cards.length > 0 && cards.every((c) => c.isMatched) && (
        <div className="mt-8 p-6 bg-green-50 text-green-800 rounded-xl border border-green-200 text-center animate-bounce">
          <h2 className="text-xl font-bold">Congratulations!</h2>
          <p>You finished in {moves} moves and {Math.floor(timer / 60)}:{timer % 60} minutes!</p>
        </div>
      )}
      
      <footer className="mt-12 text-slate-400 text-sm">
        Built with React & Tailwind
      </footer>
    </div>
  );
}`,

  "mobile-app-site": `import React from 'react';
import { 
  Smartphone, Zap, Shield, BarChart3, Clock, Users, 
  Check, Star, ChevronDown, Download, ArrowRight, Sparkles 
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-xl text-white">
            <Zap size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">Flowstate</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
        </div>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all">
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <header className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter mb-6">
            Master your day with <span className="text-indigo-600">Flowstate</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            The intelligent productivity assistant that helps you prioritize tasks, eliminate distractions, and reclaim your time for what really matters.
          </p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700">
              <Download size={20} /> App Store
            </button>
            <button className="flex items-center gap-2 bg-slate-100 text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200">
              <Download size={20} /> Google Play
            </button>
          </div>
        </div>
        <div className="relative bg-slate-100 rounded-3xl h-[500px] flex items-center justify-center border-4 border-slate-200 overflow-hidden shadow-inner">
          <div className="text-slate-400 font-medium">Phone Interface Placeholder</div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="bg-slate-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Everything you need to focus</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Smart Scheduling", desc: "AI-driven task arrangement based on your energy levels." },
              { icon: Shield, title: "Focus Shield", desc: "Block distracting notifications during your deep work sessions." },
              { icon: BarChart3, title: "Performance Insights", desc: "Detailed weekly reports on your productivity trends." },
              { icon: Clock, title: "Time Boxing", desc: "Dedicated slots for every task to ensure you stay on track." },
              { icon: Users, title: "Team Sync", desc: "Collaborate seamlessly with your team without the clutter." },
              { icon: Smartphone, title: "Cross-Device", desc: "Sync your workflow perfectly across all your devices." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <f.icon className="text-indigo-600 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Walkthrough */}
      <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Simple as 1, 2, 3</h2>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {['Define your goals', 'AI optimizes your day', 'Track your progress'].map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mb-6">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step}</h3>
              <p className="text-slate-600 text-sm">Experience a seamless transition from planning to execution.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Loved by thousands</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Jenkins", role: "Product Designer", quote: "Flowstate transformed my chaotic daily routine into a streamlined machine." },
              { name: "Marcus Chen", role: "Software Engineer", quote: "The focus shield feature is a total game changer for my coding sessions." },
              { name: "Elena Rodriguez", role: "Marketing Manager", quote: "Finally, an app that understands that work-life balance is essential." }
            ].map((r, i) => (
              <div key={i} className="bg-slate-800 p-8 rounded-2xl">
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="mb-6 text-slate-300 italic">"{r.quote}"</p>
                <div className="font-semibold">{r.name}</div>
                <div className="text-sm text-slate-500">{r.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Get started for free</h2>
        <p className="text-slate-600 mb-12">Enjoy the core features of Flowstate at no cost. Upgrade anytime for advanced analytics and team features.</p>
        <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-3xl inline-block w-full">
          <div className="text-4xl font-bold text-indigo-600 mb-4">$0 <span className="text-lg text-slate-500 font-normal">/ month</span></div>
          <ul className="text-left space-y-4 mb-8 inline-block">
            {['Basic task management', 'Daily focus reports', 'Cross-device sync', 'Standard support'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700">
                <Check size={20} className="text-green-500" /> {item}
              </li>
            ))}
          </ul>
          <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700">Download Now</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
        <p>&copy; 2024 Flowstate Technologies Inc. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Support</span>
        </div>
      </footer>
    </div>
  );
}`,

  "music-band-site": `import React, { useState } from 'react';
import { Play, Calendar, MapPin, ShoppingCart, Mail, ChevronRight, Zap, Star, Music } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('tour');

  const tourDates = [
    { city: 'London', venue: 'O2 Academy', date: 'Oct 24, 2024', status: 'Sold Out' },
    { city: 'Berlin', venue: 'Huxleys Neue Welt', date: 'Nov 02, 2024', status: 'Tickets' },
    { city: 'Paris', venue: 'Le Trianon', date: 'Nov 05, 2024', status: 'Tickets' },
    { city: 'Amsterdam', venue: 'Paradiso', date: 'Nov 08, 2024', status: 'Low Stock' },
  ];

  const albums = [
    { title: 'Neon Echoes', year: '2024', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400' },
    { title: 'Midnight Static', year: '2022', cover: 'https://images.unsplash.com/photo-1558005540-84524458316c?auto=format&fit=crop&q=80&w=400' },
    { title: 'Velvet Horizon', year: '2020', cover: 'https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&q=80&w=400' },
  ];

  const tracks = ['Electric Pulse', 'Neon Dreams', 'Static Heart', 'Midnight Run', 'Echo Chamber'];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <span className="text-2xl font-bold tracking-tighter text-indigo-500">SYNTHWAVE COLLECTIVE</span>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
          {['Tour', 'Music', 'Merch', 'About'].map((item) => (
            <a key={item} href="#" className="hover:text-indigo-400 transition-colors">{item}</a>
          ))}
        </div>
      </nav>

      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Band performance"
        />
        <div className="relative z-10 text-center px-4">
          <div className="inline-block bg-indigo-600 px-4 py-1 mb-4 text-xs font-bold uppercase tracking-widest rounded-full">New Album Out Now</div>
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter">NEON ECHOES</h1>
          <button className="bg-white text-neutral-950 px-8 py-3 rounded-full font-bold hover:bg-indigo-500 hover:text-white transition-all">Listen Now</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3"><Calendar className="text-indigo-500" /> Upcoming Tour Dates</h2>
          <div className="space-y-4">
            {tourDates.map((show, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 bg-neutral-900 rounded-2xl hover:border-indigo-900 border border-transparent transition-all">
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className="text-center w-20">
                    <span className="block text-indigo-400 font-bold">NOV</span>
                    <span className="text-2xl font-bold">02</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{show.city}</h3>
                    <p className="text-neutral-400">{show.venue}</p>
                  </div>
                </div>
                <button className={\`px-6 py-2 rounded-full text-sm font-bold \${show.status === 'Sold Out' ? 'bg-neutral-800 text-neutral-500' : 'bg-indigo-600 text-white hover:bg-indigo-500'}\`}>
                  {show.status}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-3xl font-bold mb-10">Discography</h2>
            <div className="grid grid-cols-2 gap-4">
              {albums.map((a, i) => (
                <div key={i} className="group cursor-pointer">
                  <img src={a.cover} alt={a.title} className="rounded-xl mb-3 aspect-square object-cover group-hover:scale-105 transition-transform" />
                  <h3 className="font-bold">{a.title}</h3>
                  <p className="text-sm text-neutral-500">{a.year}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-neutral-900 p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Music className="text-indigo-500" /> Player</h3>
            <div className="space-y-4">
              {tracks.map((track, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-neutral-800 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-4">
                    <button className="w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full"><Play size={14} fill="white" /></button>
                    <span>{track}</span>
                  </div>
                  <span className="text-neutral-500 text-sm">3:45</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-10">Official Merch</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4].map((item) => (
              <div key={item} className="bg-neutral-900 rounded-2xl p-4">
                <div className="bg-neutral-800 aspect-square rounded-xl mb-4 flex items-center justify-center text-neutral-600">Image</div>
                <h4 className="font-bold">Tour Hoodie Vol. 1</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-indigo-400">$65.00</span>
                  <ShoppingCart size={20} className="cursor-pointer hover:text-indigo-400" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-indigo-900/20 border border-indigo-900/50 p-12 rounded-3xl text-center">
          <Mail className="mx-auto mb-6 text-indigo-500" size={40} />
          <h2 className="text-3xl font-bold mb-4">Join the Inner Circle</h2>
          <p className="text-neutral-400 mb-8 max-w-md mx-auto">Get exclusive updates on new music, secret shows, and limited edition merch drops.</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 bg-neutral-950 px-4 py-3 rounded-full border border-neutral-800 focus:outline-none focus:border-indigo-500" />
            <button className="bg-indigo-600 px-6 py-3 rounded-full font-bold hover:bg-indigo-500">Subscribe</button>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-900 py-12 text-center text-neutral-600 text-sm">
        <p>© 2024 Synthwave Collective. All rights reserved.</p>
        <div className="flex gap-6 justify-center mt-4">
          <a href="#" className="hover:text-indigo-400">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-400">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}`,

  "news-magazine-site": `import React, { useState } from 'react';
import { 
  Menu, Search, Bell, User, Calendar, TrendingUp, 
  ChevronRight, ArrowRight, Zap, Clock, Bookmark, Share2, Mail
} from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('Home');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Calendar size={12} /> Tuesday, October 24, 2023</span>
          <span className="hidden md:block">|</span>
          <span className="hidden md:block font-bold text-amber-400">BREAKING:</span>
          <span className="hidden md:block">Global climate summit announces ambitious 2030 emission targets</span>
        </div>
        <div className="flex gap-4">
          <span>Subscribe</span>
          <span>Log In</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 bg-white border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu className="md:hidden" />
            <h1 className="text-2xl font-bold tracking-tighter text-slate-950">CHRONICLE</h1>
          </div>
          <div className="hidden md:flex gap-6 font-medium text-sm text-slate-600">
            {['Home', 'Politics', 'Business', 'Tech', 'Culture', 'Opinion'].map(item => (
              <button 
                key={item} 
                className={\`\${activeNav === item ? 'text-blue-600' : 'hover:text-blue-600'}\`}
                onClick={() => setActiveNav(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex gap-4 items-center">
            <Search size={20} className="text-slate-400" />
            <Bell size={20} className="text-slate-400" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Lead Story */}
        <section className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-8">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200" 
              alt="Global Network"
              className="w-full h-[400px] object-cover rounded-lg mb-6"
            />
            <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">Lead Story</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-2 mb-4 leading-tight">The Future of AI: How Neural Networks Are Redefining Global Economic Policy</h2>
            <p className="text-lg text-slate-600 max-w-2xl">As automated systems integrate into central banking, experts weigh in on the potential for unprecedented stability versus the risks of algorithmic bias.</p>
          </div>
          <div className="md:col-span-4 border-l border-slate-200 pl-8">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><TrendingUp size={20}/> Most Read</h3>
            <div className="space-y-6">
              {[
                { title: 'The hidden cost of urban migration', category: 'Sociology' },
                { title: 'New energy breakthroughs in solar storage', category: 'Tech' },
                { title: 'How to manage remote teams effectively', category: 'Business' },
                { title: 'Top 10 travel destinations for 2024', category: 'Lifestyle' }
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <span className="text-xs text-blue-600 font-semibold">{item.category}</span>
                  <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {['Business', 'Technology', 'Culture'].map((cat) => (
            <section key={cat}>
              <h3 className="text-2xl font-bold mb-6 border-b-2 border-slate-900 pb-2">{cat}</h3>
              <div className="space-y-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex gap-4">
                    <div className="w-20 h-20 bg-slate-200 rounded flex-shrink-0" />
                    <div>
                      <p className="font-bold text-sm leading-snug hover:text-blue-600 cursor-pointer">Market volatility continues as new trade agreements are signed.</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock size={12}/> {n * 2} hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Newsletter */}
        <section className="bg-blue-600 rounded-2xl p-8 md:p-16 text-center text-white mb-16">
          <Zap className="mx-auto mb-4" size={40} />
          <h2 className="text-3xl font-bold mb-4">Stay Ahead of the Curve</h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">Get the daily briefing delivered to your inbox every morning at 7:00 AM. No spam, just the news you need.</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email address" className="flex-1 px-4 py-3 rounded-lg text-slate-900 outline-none" />
            <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">Subscribe</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-white font-bold text-xl mb-4">CHRONICLE</h2>
            <p className="text-sm">Reporting the truth from around the globe since 1994.</p>
          </div>
          {['Sections', 'Company', 'Support'].map(section => (
            <div key={section}>
              <h4 className="text-white font-semibold mb-4">{section}</h4>
              <ul className="space-y-2 text-sm">
                <li>Editorial Ethics</li>
                <li>Careers</li>
                <li>Advertise</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-xs text-center">
          © 2023 Chronicle Media Group. All rights reserved.
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

  "pet-store-site": `import React, { useState } from 'react';
import { ShoppingCart, Star, Zap, Shield, Search, Menu, ArrowRight, ChevronRight, Check, Heart, Clock, Calendar, Mail, User } from 'lucide-react';

const products = [
  { id: 1, name: "Organic Grain-Free Kibble", price: 42.99, rating: 4.8, img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Plush Squeaky Hedgehog", price: 12.50, rating: 4.5, img: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Calming Lavender Bed", price: 65.00, rating: 4.9, img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Interactive Laser Toy", price: 24.99, rating: 4.7, img: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=400" },
];

export default function App() {
  const [cartCount, setCartCount] = useState(2);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg text-white font-bold text-xl">P</div>
            <span className="font-bold text-xl tracking-tight">PetPalace</span>
          </div>
          <div className="hidden md:flex gap-8 font-medium text-slate-600">
            <a href="#" className="hover:text-orange-600">Shop</a>
            <a href="#" className="hover:text-orange-600">Services</a>
            <a href="#" className="hover:text-orange-600">About</a>
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-slate-400 cursor-pointer" />
            <div className="relative cursor-pointer">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{cartCount}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-orange-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">Special Launch Offer</span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">Everything your furry friend could dream of.</h1>
            <p className="text-lg text-slate-600 max-w-lg">Premium supplies, grooming services, and healthy treats delivered right to your doorstep. Join the pack today!</p>
            <button className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 flex items-center gap-2">
              Shop Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <img src="https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?auto=format&fit=crop&q=80&w=800" alt="Happy Dog" className="rounded-3xl w-full md:w-1/2 shadow-2xl" />
        </div>
      </header>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Shop by Pet</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Dogs', 'Cats', 'Small Pets'].map((cat) => (
            <div key={cat} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
              <img src={\`https://images.unsplash.com/photo-\${cat === 'Dogs' ? '1583511655857-d19b40a7a54e' : cat === 'Cats' ? '1514888286974-6c03e2ca1dba' : '1548767797-d86847129f58'}?auto=format&fit=crop&q=80&w=600\`} className="w-full h-full object-cover" alt={cat} />
              <div className="absolute bottom-6 left-6 text-white font-bold text-2xl">{cat}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Fan Favorites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(p => (
            <div key={p.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <img src={p.img} className="w-full h-48 object-cover rounded-xl mb-4" alt={p.name} />
              <h3 className="font-semibold mb-1">{p.name}</h3>
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-slate-600 text-sm font-medium">{p.rating}</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-lg">\${p.price}</span>
                <button className="p-2 bg-slate-100 rounded-lg hover:bg-orange-100 hover:text-orange-600">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Professional Grooming</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[ { title: 'Full Spa Bath', price: '45', time: '60 min' }, { title: 'Haircut & Trim', price: '65', time: '90 min' }, { title: 'Nail Trimming', price: '20', time: '20 min' } ].map(s => (
              <div key={s.title} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 flex flex-col gap-4">
                <h3 className="text-xl font-bold">{s.title}</h3>
                <div className="flex gap-4 text-slate-400">
                  <div className="flex items-center gap-1"><Clock className="w-4 h-4"/> {s.time}</div>
                </div>
                <div className="text-4xl font-bold mt-4">\${s.price}</div>
                <button className="w-full mt-auto bg-white text-slate-900 py-3 rounded-lg font-bold">Book Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 p-1.5 rounded-lg text-white font-bold text-lg">P</div>
              <span className="font-bold text-lg">PetPalace</span>
            </div>
            <p className="text-slate-500 text-sm">Serving happy pets and owners since 2018.</p>
          </div>
          <div><h4 className="font-bold mb-4">Shop</h4><ul className="space-y-2 text-slate-600 text-sm"><li>New Arrivals</li><li>Best Sellers</li><li>Supplies</li></ul></div>
          <div><h4 className="font-bold mb-4">Support</h4><ul className="space-y-2 text-slate-600 text-sm"><li>Shipping Policy</li><li>Returns</li><li>Contact</li></ul></div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-slate-100 rounded-lg px-4 py-2 flex-1 outline-none"/>
              <button className="bg-orange-500 text-white p-2 rounded-lg"><ArrowRight className="w-5 h-5"/></button>
            </div>
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

  "podcast-site": `import React from 'react';
import { Play, Calendar, Clock, ArrowRight, Star, Mail, Search, Menu, Zap, Users, ChevronRight } from 'lucide-react';

export default function App() {
  const episodes = [
    { id: '08', title: 'The Future of Neural Interfaces', duration: '54:20', date: 'Oct 24, 2023' },
    { id: '07', title: 'Sustainable Architecture in Cities', duration: '48:15', date: 'Oct 17, 2023' },
    { id: '06', title: 'Decoding Financial Literacy', duration: '52:10', date: 'Oct 10, 2023' },
    { id: '05', title: 'Quantum Computing Explained', duration: '61:05', date: 'Oct 03, 2023' },
    { id: '04', title: 'Modern Culinary Traditions', duration: '45:30', date: 'Sep 26, 2023' },
    { id: '03', title: 'The Psychology of Productivity', duration: '55:40', date: 'Sep 19, 2023' },
    { id: '02', title: 'Renewable Energy Landscapes', duration: '49:20', date: 'Sep 12, 2023' },
    { id: '01', title: 'The Rise of Digital Nomads', duration: '42:15', date: 'Sep 05, 2023' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-6xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter text-indigo-600">SHIFT.POD</div>
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#" className="hover:text-indigo-600">Episodes</a>
          <a href="#" className="hover:text-indigo-600">About</a>
          <a href="#" className="hover:text-indigo-600">Newsletter</a>
        </div>
        <button className="bg-stone-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-indigo-600 transition-colors">
          Subscribe
        </button>
      </nav>

      {/* Hero */}
      <header className="px-6 py-16 md:py-24 max-w-4xl mx-auto text-center">
        <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm">New Episodes Every Tuesday</span>
        <h1 className="text-5xl md:text-7xl font-extrabold mt-4 mb-6 tracking-tight">Exploring the edge of modern thought.</h1>
        <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto">Join hosts Elena Rossi and Marcus Thorne as they dissect complex ideas with world-class experts, engineers, and visionaries.</p>
        <div className="flex gap-4 justify-center">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700">
            <Play size={20} fill="white" /> Listen Now
          </button>
        </div>
      </header>

      {/* Featured Episode */}
      <section className="px-6 py-16 bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square bg-indigo-100 rounded-3xl overflow-hidden">
             <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800" alt="Episode cover" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-indigo-600 font-bold">LATEST EPISODE</span>
            <h2 className="text-4xl font-bold mt-2 mb-6">#09: The Ethics of Artificial Intelligence</h2>
            <div className="bg-stone-100 p-6 rounded-2xl mb-6">
              <div className="w-full h-2 bg-stone-200 rounded-full mb-4">
                <div className="w-1/3 h-2 bg-indigo-600 rounded-full"></div>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>12:45</span>
                <span>58:30</span>
              </div>
            </div>
            <p className="text-stone-600 mb-6">In this episode, we sit down with Dr. Aris Thorne to discuss the shifting landscape of machine learning regulation and what it means for the future of personal privacy.</p>
            <button className="flex items-center gap-2 font-semibold hover:text-indigo-600">Read Show Notes <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

      {/* Episode List */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Past Episodes</h2>
        <div className="space-y-4">
          {episodes.map((ep) => (
            <div key={ep.id} className="flex items-center justify-between p-6 bg-white border border-stone-200 rounded-xl hover:border-indigo-300 transition-colors">
              <div className="flex items-center gap-6">
                <span className="text-stone-400 font-mono text-xl">{ep.id}</span>
                <div>
                  <h3 className="font-bold text-lg">{ep.title}</h3>
                  <div className="flex gap-4 text-sm text-stone-500 mt-1">
                    <span className="flex items-center gap-1"><Clock size={14}/> {ep.duration}</span>
                    <span className="flex items-center gap-1"><Calendar size={14}/> {ep.date}</span>
                  </div>
                </div>
              </div>
              <button className="p-3 bg-stone-100 rounded-full hover:bg-indigo-100 hover:text-indigo-600"><Play size={18} fill="currentColor" /></button>
            </div>
          ))}
        </div>
      </section>

      {/* Hosts */}
      <section className="px-6 py-20 bg-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Meet the Hosts</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="w-32 h-32 bg-indigo-800 rounded-full mx-auto mb-6 overflow-hidden border-4 border-indigo-700">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" alt="Elena" />
              </div>
              <h3 className="text-xl font-bold">Elena Rossi</h3>
              <p className="text-indigo-300 text-sm mt-2">Technology Anthropologist</p>
            </div>
            <div>
              <div className="w-32 h-32 bg-indigo-800 rounded-full mx-auto mb-6 overflow-hidden border-4 border-indigo-700">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" alt="Marcus" />
              </div>
              <h3 className="text-xl font-bold">Marcus Thorne</h3>
              <p className="text-indigo-300 text-sm mt-2">Systems Architect</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Listener Reviews</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Sarah J.", text: "The most insightful podcast I've ever heard. Changed my perspective on tech." },
            { name: "David M.", text: "Production quality is top tier. Always look forward to my Tuesday commute." },
            { name: "Chloe K.", text: "A breath of fresh air in a saturated market. Intellectual and grounded." }
          ].map((r, i) => (
            <div key={i} className="p-6 bg-white border border-stone-200 rounded-2xl">
              <div className="flex text-yellow-400 mb-4"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
              <p className="text-stone-600 text-sm mb-4">"{r.text}"</p>
              <p className="font-bold text-sm">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 py-20 bg-stone-200">
        <div className="max-w-xl mx-auto text-center">
          <Mail className="mx-auto text-indigo-600 mb-4" size={40} />
          <h2 className="text-3xl font-bold mb-4">Get the weekly digest</h2>
          <p className="text-stone-600 mb-8">Join 15,000+ curious listeners getting show notes and bonus content delivered to their inbox.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg border border-stone-300" />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-stone-500 text-sm">
        <p className="mb-4">© 2023 SHIFT.POD Podcast. All rights reserved.</p>
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-600">Terms of Service</a>
          <a href="#" className="hover:text-indigo-600">Sponsorship</a>
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

  "pricing-page": `import React, { useState } from 'react';
import { Check, Star, Zap, Shield, ArrowRight } from 'lucide-react';

export default function App() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      priceMonthly: 29,
      priceAnnual: 290,
      description: 'Perfect for solo developers and personal projects.',
      features: ['1 Project limit', 'Basic analytics', 'Community support', '1GB storage'],
      cta: 'Get Started',
      highlight: false,
    },
    {
      name: 'Professional',
      priceMonthly: 79,
      priceAnnual: 790,
      description: 'The sweet spot for growing teams and startups.',
      features: ['Unlimited projects', 'Advanced analytics', 'Priority email support', '50GB storage', 'Custom integrations'],
      cta: 'Start Free Trial',
      highlight: true,
    },
    {
      name: 'Enterprise',
      priceMonthly: 199,
      priceAnnual: 1990,
      description: 'Scalable infrastructure for large organizations.',
      features: ['Unlimited everything', 'Dedicated account manager', '24/7 Phone support', 'Unlimited storage', 'SSO & Security'],
      cta: 'Contact Sales',
      highlight: false,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase">Pricing Plans</h2>
          <p className="mt-2 text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Choose the right plan for you
          </p>
          
          {/* Toggle */}
          <div className="mt-8 flex justify-center items-center gap-4">
            <span className={\`text-sm font-medium \${!isAnnual ? 'text-slate-900' : 'text-slate-500'}\`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-blue-600 rounded-full transition-colors duration-200 ease-in-out focus:outline-none"
            >
              <div className={\`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 \${isAnnual ? 'translate-x-7' : ''}\`} />
            </button>
            <span className={\`text-sm font-medium \${isAnnual ? 'text-slate-900' : 'text-slate-500'}\`}>
              Yearly <span className="text-blue-600 text-xs bg-blue-50 px-2 py-0.5 rounded-full font-bold ml-1">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 items-center">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={\`relative p-8 bg-white rounded-2xl border \${plan.highlight ? 'border-blue-600 shadow-xl scale-105 z-10' : 'border-slate-200 shadow-sm'}\`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 -translate-y-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <Star size={12} fill="white" /> Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="mt-2 text-slate-500 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-extrabold text-slate-900">
                  \${isAnnual ? plan.priceAnnual / 12 : plan.priceMonthly}
                </span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check size={18} className="text-blue-600 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={\`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition \${plan.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}\`}>
                {plan.cta}
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-20 flex flex-col md:flex-row justify-center items-center gap-8 text-slate-500 border-t pt-12 border-slate-200">
            <div className="flex items-center gap-2">
                <Zap size={20} className="text-blue-600" />
                <span className="font-medium text-slate-700">Instant Activation</span>
            </div>
            <div className="flex items-center gap-2">
                <Shield size={20} className="text-blue-600" />
                <span className="font-medium text-slate-700">Secure Payment Processing</span>
            </div>
            <p className="text-sm">Cancel anytime. No hidden fees.</p>
        </div>
      </div>
    </div>
  );
}`,

  "product-grid": `import React, { useState } from 'react';
import { ShoppingCart, Star, Filter, ChevronDown, Zap, Shield, Search, Menu, User } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: "Summit Peak Hardshell Jacket", price: 289.00, category: "Apparel", rating: 4.9, image: "https://images.unsplash.com/photo-1544925804-b55225215c0e?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Carbon Fiber Trekking Poles", price: 145.00, category: "Gear", rating: 4.7, image: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Alpine Pro Sleeping Bag", price: 340.00, category: "Gear", rating: 4.8, image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Merino Wool Base Layer", price: 85.00, category: "Apparel", rating: 4.6, image: "https://images.unsplash.com/photo-1523381294911-8d3cead1b424?auto=format&fit=crop&q=80&w=800" },
  { id: 5, name: "Titanium Camping Stove", price: 110.00, category: "Kitchen", rating: 4.5, image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800" },
  { id: 6, name: "Trailblazer Hydration Pack", price: 125.00, category: "Gear", rating: 4.9, image: "https://images.unsplash.com/photo-1522898467493-49726bf28798?auto=format&fit=crop&q=80&w=800" },
];

const CATEGORIES = ["All", "Apparel", "Gear", "Kitchen"];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="text-indigo-600 w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">SummitGear</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600">Equipment</a>
            <a href="#" className="hover:text-indigo-600">Apparel</a>
            <a href="#" className="hover:text-indigo-600">Deals</a>
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-slate-400 cursor-pointer" />
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-slate-600 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </div>
            <User className="w-5 h-5 text-slate-600 cursor-pointer" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold mb-4">Adventure Essentials</h1>
          <p className="text-slate-500 max-w-2xl">High-performance gear engineered for the toughest terrain and harshest conditions.</p>
        </header>

        <section className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full hover:bg-slate-100">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={\`px-5 py-2 rounded-full text-sm font-medium transition-colors \${
                selectedCategory === cat 
                  ? "bg-indigo-600 text-white" 
                  : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-200"
              }\`}
            >
              {cat}
            </button>
          ))}
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{product.category}</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-slate-600">{product.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-4">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">\${product.price.toFixed(2)}</span>
                  <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-colors flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-slate-900">Lifetime Warranty on all technical gear</span>
          </div>
          <p className="text-slate-500 text-sm">© 2024 SummitGear Outfitters. Built for the wild.</p>
        </div>
      </footer>
    </div>
  );
}`,

  "profile-settings": `import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Camera, 
  Save, 
  LogOut, 
  Mail, 
  Smartphone, 
  Globe,
  CheckCircle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-slate-600">Manage your profile and account preferences.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={\`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors \${
                    activeTab === tab.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }\`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </aside>

          <main className="flex-1 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                      <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
                      <Camera size={16} />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Alexander Bennett</h3>
                    <p className="text-sm text-slate-500">Member since January 2022</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input type="text" defaultValue="Alexander Bennett" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                    <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none">Product Designer based in San Francisco, focused on building intuitive user interfaces.</textarea>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { id: 'email', label: 'Email Notifications', desc: 'Receive project updates and system alerts.', icon: Mail },
                    { id: 'push', label: 'Push Notifications', desc: 'Real-time updates on your devices.', icon: Smartphone },
                    { id: 'marketing', label: 'Marketing Emails', desc: 'Receive news about new features and offers.', icon: Globe },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-slate-400"><item.icon size={20} /></div>
                        <div>
                          <p className="font-medium text-slate-900">{item.label}</p>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setNotifications({...notifications, [item.id]: !notifications[item.id as keyof typeof notifications]})}
                        className={\`w-12 h-6 rounded-full transition-colors \${notifications[item.id as keyof typeof notifications] ? 'bg-indigo-600' : 'bg-slate-300'}\`}
                      >
                        <div className={\`w-4 h-4 rounded-full bg-white transition-transform transform \${notifications[item.id as keyof typeof notifications] ? 'translate-x-7' : 'translate-x-1'}\`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button className="px-6 py-2 text-slate-600 font-medium hover:text-slate-900">Cancel</button>
              <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </main>
        </div>
      </div>
      
      <footer className="mt-16 text-center text-slate-400 text-sm">
        <p>© 2024 TechFlow Systems. All rights reserved.</p>
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

  "saas-hero": `import React from 'react';
import { ArrowRight, Zap, Shield, BarChart3, ChevronRight, Star } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">FlowStream</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Solutions</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
        </div>
        <button className="text-sm font-semibold hover:text-indigo-600 transition-colors">Log in</button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-indigo-700" />
            <span>Trusted by over 5,000+ growing teams</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 mb-8 leading-[1.1]">
            Automate your workflow <span className="text-indigo-600">without the complexity.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            FlowStream connects your favorite apps into a single, seamless engine. Spend less time on manual tasks and more time building your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold hover:border-indigo-300 transition-all">
              Request a Demo
            </button>
          </div>
        </div>

        {/* Screenshot Placeholder */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20"></div>
          <div className="relative bg-slate-900 rounded-2xl p-2 shadow-2xl overflow-hidden border border-slate-800">
            <div className="flex gap-2 p-3 border-b border-slate-800">
              <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=2000" 
              alt="Dashboard Preview" 
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Logos */}
        <div className="mt-24 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">Powering industry leaders</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Acme Corp', 'Vertex', 'Nebula', 'Echo Systems', 'Pulse'].map((brand) => (
              <div key={brand} className="flex items-center justify-center font-bold text-2xl text-slate-900">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>© 2024 FlowStream Technologies. All rights reserved.</p>
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

  "spa-site": `import React, { useState } from 'react';
import { 
  Calendar, Clock, DollarSign, Star, Zap, Shield, 
  ChevronRight, Sparkles, User, Mail, Phone, MapPin 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Treatments');

  const treatments = [
    { name: 'Deep Tissue Massage', time: '60 min', price: 120 },
    { name: 'Hydrating Facial', time: '45 min', price: 95 },
    { name: 'Hot Stone Therapy', time: '90 min', price: 160 },
    { name: 'Aromatherapy Soak', time: '30 min', price: 65 },
  ];

  const packages = [
    { title: 'The Serenity Escape', desc: 'Full body massage, facial, and herbal tea service.', price: 250 },
    { title: 'Rejuvenation Day', desc: 'Exfoliation, deep tissue, and scalp treatment.', price: 320 },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-6xl mx-auto">
        <div className="text-2xl font-serif tracking-tighter text-emerald-800">AURA SPA</div>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {['Treatments', 'Packages', 'Facilities', 'Contact'].map(item => (
            <button key={item} className="hover:text-emerald-600 transition-colors">{item}</button>
          ))}
        </div>
        <button className="bg-emerald-700 text-white px-5 py-2 rounded-full text-sm hover:bg-emerald-800">Book Now</button>
      </nav>

      {/* Hero */}
      <header className="px-6 py-16 md:py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif leading-tight mb-6">Rediscover your inner <span className="text-emerald-700">balance.</span></h1>
          <p className="text-lg text-stone-600 mb-8 max-w-md">Experience world-class rejuvenation in our sanctuary designed for your ultimate peace and physical restoration.</p>
          <div className="flex gap-4">
            <button className="bg-emerald-700 text-white px-8 py-4 rounded-lg flex items-center gap-2 hover:bg-emerald-800">
              Book a Treatment <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="h-96 bg-stone-200 rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1540555700478-4be2894becef?auto=format&fit=crop&q=80&w=800" alt="Spa interior" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Treatments Menu */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif mb-12 text-center">Treatment Menu</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {treatments.map((t, i) => (
            <div key={i} className="flex justify-between items-center border-b border-stone-200 py-4">
              <div>
                <h3 className="font-semibold text-lg">{t.name}</h3>
                <div className="flex items-center gap-2 text-stone-500 text-sm mt-1">
                  <Clock size={14} /> {t.time}
                </div>
              </div>
              <span className="font-serif text-xl text-emerald-800">\${t.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Packages & Facilities */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-serif mb-8">Spa Packages</h2>
            {packages.map((p, i) => (
              <div key={i} className="mb-6 p-6 border border-stone-100 rounded-xl bg-stone-50">
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-stone-600 text-sm mb-4">{p.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="font-serif text-2xl text-emerald-700">\${p.price}</span>
                  <button className="text-emerald-700 font-medium flex items-center text-sm">View Details <ChevronRight size={16}/></button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-3xl font-serif mb-8">Our Facilities</h2>
            <div className="space-y-4">
              {['Infinity Hydrotherapy Pool', 'Himalayan Salt Sauna', 'Steam Room', 'Zen Relaxation Lounge'].map(f => (
                <div key={f} className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg">
                  <Sparkles className="text-emerald-600" size={20} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <div className="bg-emerald-900 text-emerald-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-serif mb-8 text-center">Request an Appointment</h2>
          <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="p-3 rounded-lg bg-emerald-800 border-emerald-700 border placeholder-emerald-400" />
              <input type="email" placeholder="Email Address" className="p-3 rounded-lg bg-emerald-800 border-emerald-700 border placeholder-emerald-400" />
            </div>
            <select className="p-3 rounded-lg bg-emerald-800 border-emerald-700 border text-emerald-100">
              <option>Select Treatment</option>
              <option>Deep Tissue Massage</option>
              <option>Hydrating Facial</option>
            </select>
            <textarea placeholder="Special Requests" className="p-3 rounded-lg bg-emerald-800 border-emerald-700 border placeholder-emerald-400 h-32"></textarea>
            <button className="bg-white text-emerald-900 py-4 rounded-lg font-bold hover:bg-emerald-50">Submit Request</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-stone-500 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-left">
            <p className="font-bold text-stone-900 mb-2">Aura Spa & Wellness</p>
            <p>123 Serenity Way, Coastal City</p>
            <p>Open Daily: 9am - 8pm</p>
          </div>
          <div className="flex gap-6">
            <Mail /> <Phone /> <MapPin />
          </div>
          <p>© 2024 Aura Spa. All rights reserved.</p>
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

  "university-site": `import React, { useState } from 'react';
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
}`,

  "veterinary-site": `import React, { useState } from 'react';
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
                className={\`px-6 py-2 rounded-full capitalize font-semibold transition \${activeTab === tab ? 'bg-emerald-600 text-white' : 'bg-slate-100'}\`}
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
}`,

  "waitlist-page": `import React, { useState } from 'react';
import { Sparkles, CheckCircle, ArrowRight, Shield } from 'lucide-react';

export default function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid business email address.');
      return;
    }
    setError('');
    setStatus('success');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span>NexusFlow</span>
        </div>
        <button className="text-sm font-medium hover:text-indigo-600 transition-colors">
          Contact Support
        </button>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Now accepting early access
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
          Orchestrate your workflow with <span className="text-indigo-600">precision.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl">
          NexusFlow bridges the gap between your fragmented tools. Join 2,400+ product leaders waiting for the future of automated operations.
        </p>

        {status === 'success' ? (
          <div className="w-full max-w-md bg-white border border-green-200 rounded-2xl p-6 flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">You're on the list!</h3>
            <p className="text-slate-600">We've sent a confirmation to {email}. We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg shadow-sm"
              />
              {error && <p className="absolute -bottom-6 left-1 text-sm text-red-500">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 text-lg shadow-lg shadow-indigo-200"
            >
              Request Early Access
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        <div className="mt-16 flex flex-col items-center gap-6">
          <p className="text-sm text-slate-500 uppercase tracking-widest font-medium">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-60 grayscale">
            {['Linear', 'Vercel', 'Figma', 'Notion', 'Stripe'].map((brand) => (
              <span key={brand} className="text-xl font-bold tracking-tight text-slate-900">{brand}</span>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>© 2024 NexusFlow Systems Inc.</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}`,

  "wedding-site": `import React, { useState } from 'react';
import { Heart, Calendar, Clock, MapPin, Users, Gift, Plane, Mail, CheckCircle } from 'lucide-react';

export default function App() {
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-serif">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-semibold tracking-tighter">E & J</span>
          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest text-stone-600">
            {['Story', 'Details', 'Party', 'RSVP'].map((item) => (
              <a key={item} href={\`#\${item.toLowerCase()}\`} className="hover:text-amber-700 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20" />
        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl mb-6">Elena & Julian</h1>
          <p className="text-xl md:text-2xl font-light italic">September 14, 2024</p>
          <div className="mt-8 flex justify-center text-amber-700"><Heart size={32} fill="currentColor" /></div>
        </div>
      </header>

      {/* Story */}
      <section id="story" className="py-24 max-w-3xl mx-auto px-6">
        <h2 className="text-4xl text-center mb-16">Our Journey</h2>
        <div className="space-y-12 border-l-2 border-amber-200 pl-8">
          {[
            { year: "2018", event: "First coffee at The Roasted Bean, where Julian spilled his latte." },
            { year: "2020", event: "Moved into our first apartment in Brooklyn during the great lockdown." },
            { year: "2023", event: "Julian proposed under the Northern Lights in Iceland." }
          ].map((step, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[41px] bg-amber-700 p-1 rounded-full"><div className="w-3 h-3 bg-white rounded-full" /></div>
              <h3 className="text-xl font-bold mb-2">{step.year}</h3>
              <p className="text-stone-600 leading-relaxed">{step.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section id="details" className="py-24 bg-stone-100">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl mb-6 flex items-center gap-3"><Calendar className="text-amber-700" /> Ceremony</h3>
            <p className="font-semibold">St. Jude’s Chapel</p>
            <p className="text-stone-600">4:00 PM - 5:00 PM</p>
            <p className="mt-2 text-sm text-stone-500">123 Garden Lane, Savannah, GA</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl mb-6 flex items-center gap-3"><Clock className="text-amber-700" /> Reception</h3>
            <p className="font-semibold">The Willow Estate</p>
            <p className="text-stone-600">6:00 PM - 11:00 PM</p>
            <p className="mt-2 text-sm text-stone-500">450 River Road, Savannah, GA</p>
          </div>
        </div>
      </section>

      {/* Party */}
      <section id="party" className="py-24 max-w-5xl mx-auto px-6">
        <h2 className="text-4xl text-center mb-16">Bridal Party</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {['Sarah Jenkins', 'Marcus Thorne', 'Chloe Davis', 'David Wu'].map((name) => (
            <div key={name} className="text-center">
              <div className="w-32 h-32 bg-stone-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img src={\`https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300\`} alt={name} />
              </div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-stone-500">Bridesmaid</p>
            </div>
          ))}
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-24 bg-amber-50">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-4xl text-center mb-12">RSVP</h2>
          {rsvpSubmitted ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <CheckCircle size={48} className="mx-auto text-green-600 mb-4" />
              <p className="text-xl">Thank you! We've received your response.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setRsvpSubmitted(true); }} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
              <input type="text" placeholder="Full Name" className="w-full p-3 border border-stone-200 rounded" required />
              <select className="w-full p-3 border border-stone-200 rounded">
                <option>Chicken Piccata</option>
                <option>Pan-Seared Salmon</option>
                <option>Vegetarian Risotto</option>
              </select>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="plusone" />
                <label htmlFor="plusone">Attending with a plus one?</label>
              </div>
              <button className="w-full bg-stone-800 text-white py-3 rounded hover:bg-amber-700 transition-colors uppercase tracking-widest text-sm">
                Confirm Attendance
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Travel & Registry */}
      <section className="py-24 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-2xl mb-6 flex items-center gap-2"><Plane /> Travel</h3>
          <p className="text-stone-600">We have reserved a block of rooms at The Grand Savannah Hotel. Use code "ELENAJULIAN" for a discounted rate.</p>
        </div>
        <div>
          <h3 className="text-2xl mb-6 flex items-center gap-2"><Gift /> Registry</h3>
          <p className="text-stone-600">Your presence is the greatest gift, but if you wish to contribute, we are registered at Honeyfund and Crate & Barrel.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-stone-500 border-t border-stone-200">
        <p className="font-serif italic text-lg mb-2">With love,</p>
        <p className="text-sm">Elena & Julian © 2024</p>
      </footer>
    </div>
  );
}`,

  "yoga-studio-site": `import React, { useState } from 'react';
import { Calendar, Clock, Star, Zap, Users, ChevronRight, CheckCircle, Mail, MapPin, Phone, Camera as Instagram, ArrowRight } from "lucide-react";

export default function App() {
  const [activeDay, setActiveDay] = useState('Monday');

  const classes = {
    Monday: [{ time: '07:00 AM', name: 'Sunrise Flow', teacher: 'Sarah Jenkins' }, { time: '06:00 PM', name: 'Deep Yin', teacher: 'Marcus Thorne' }],
    Tuesday: [{ time: '08:30 AM', name: 'Power Vinyasa', teacher: 'Elena Rossi' }, { time: '05:30 PM', name: 'Restorative Yoga', teacher: 'Sarah Jenkins' }],
    Wednesday: [{ time: '07:00 AM', name: 'Sunrise Flow', teacher: 'Sarah Jenkins' }, { time: '06:00 PM', name: 'Pilates Fusion', teacher: 'Marcus Thorne' }],
    Thursday: [{ time: '08:30 AM', name: 'Power Vinyasa', teacher: 'Elena Rossi' }, { time: '05:30 PM', name: 'Mindful Meditation', teacher: 'Elena Rossi' }],
    Friday: [{ time: '07:00 AM', name: 'Sunrise Flow', teacher: 'Sarah Jenkins' }, { time: '04:00 PM', name: 'Community Slow Flow', teacher: 'Marcus Thorne' }],
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Nav */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-6xl mx-auto">
        <div className="text-2xl font-bold tracking-tight text-emerald-800">ZENITH YOGA</div>
        <div className="hidden md:flex gap-8 font-medium text-sm uppercase tracking-widest">
          {['Schedule', 'Classes', 'Teachers', 'Pricing'].map(item => (
            <a key={item} href={\`#\${item.toLowerCase()}\`} className="hover:text-emerald-700 transition">{item}</a>
          ))}
        </div>
        <button className="bg-emerald-800 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-900 transition">Book Now</button>
      </nav>

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-emerald-700 font-semibold tracking-wider uppercase text-sm">Welcome to your sanctuary</span>
          <h1 className="text-5xl md:text-7xl font-light mt-4 mb-6 leading-tight">Find balance in the <span className="italic">chaos</span>.</h1>
          <p className="text-lg text-stone-600 mb-8">Join our community of mindful practitioners. Start your journey today with your first class on us.</p>
          <button className="bg-emerald-800 text-white px-8 py-4 rounded-lg flex items-center gap-2 hover:bg-emerald-900 transition">
            Claim Free Class <ArrowRight size={18} />
          </button>
        </div>
        <div className="h-80 md:h-96 bg-stone-200 rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" alt="Yoga practice" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Schedule */}
      <section id="schedule" className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-10 text-center">Weekly Schedule</h2>
          <div className="flex gap-2 justify-center mb-8 overflow-x-auto pb-2">
            {Object.keys(classes).map(day => (
              <button 
                key={day} 
                onClick={() => setActiveDay(day)}
                className={\`px-4 py-2 rounded-full text-sm font-medium transition \${activeDay === day ? 'bg-emerald-100 text-emerald-900' : 'bg-stone-100'}\`}
              >
                {day}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {classes[activeDay as keyof typeof classes].map((session, i) => (
              <div key={i} className="flex justify-between items-center p-6 bg-stone-50 rounded-xl border border-stone-100">
                <div>
                  <p className="font-semibold">{session.name}</p>
                  <p className="text-sm text-stone-500">{session.teacher}</p>
                </div>
                <div className="flex items-center gap-4 text-emerald-700 font-medium">
                  <span className="flex items-center gap-1 text-sm"><Clock size={16} /> {session.time}</span>
                  <button className="text-xs border border-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-700 hover:text-white transition">Reserve</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes */}
      <section id="classes" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-light mb-12 text-center">Class Styles</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Vinyasa Flow', desc: 'Dynamic sequences connecting movement with breath to build heat and flexibility.' },
            { title: 'Deep Yin', desc: 'Slow-paced poses held for 3-5 minutes to target deep connective tissues.' },
            { title: 'Restorative', desc: 'Gentle support to calm the nervous system and promote deep relaxation.' }
          ].map((c, i) => (
            <div key={i} className="p-8 bg-white rounded-2xl border border-stone-100 shadow-sm">
              <Zap className="text-emerald-700 mb-4" />
              <h3 className="text-xl mb-3">{c.title}</h3>
              <p className="text-stone-600 text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-stone-900 text-stone-100 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-12 text-center">Membership Options</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border border-stone-700 rounded-2xl">
              <h3 className="text-lg font-semibold">Drop-in Pass</h3>
              <p className="text-4xl font-light my-4">$25</p>
              <ul className="space-y-3 mb-8 text-stone-400">
                <li className="flex items-center gap-2"><CheckCircle size={16} /> Single class access</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} /> Access to all levels</li>
              </ul>
            </div>
            <div className="p-8 bg-emerald-800 rounded-2xl relative overflow-hidden">
              <h3 className="text-lg font-semibold">Monthly Unlimited</h3>
              <p className="text-4xl font-light my-4">$120</p>
              <ul className="space-y-3 mb-8 text-emerald-100">
                <li className="flex items-center gap-2"><CheckCircle size={16} /> Unlimited classes</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} /> 10% off workshops</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} /> Guest passes (2/mo)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-light mb-16">Community Voices</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {[
            { quote: "Zenith has become my second home. The teachers are incredibly supportive.", name: "Sarah K." },
            { quote: "I've gained so much strength and clarity since joining. Highly recommended.", name: "David M." }
          ].map((t, i) => (
            <div key={i} className="relative">
              <p className="italic text-lg text-stone-600 mb-4">"{t.quote}"</p>
              <p className="font-bold text-emerald-800">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-4">ZENITH YOGA</h4>
            <p className="text-stone-500">123 Wellness Way<br/>Coastal City, CA 90210</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-stone-500">hello@zenithyoga.com<br/>(555) 123-4567</p>
          </div>
          <div className="col-span-2 text-stone-500">
            <h4 className="font-bold mb-4 text-stone-800">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-stone-100 px-4 py-2 rounded-full w-full outline-none" />
              <button className="bg-emerald-800 text-white px-4 py-2 rounded-full"><Mail size={16} /></button>
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
