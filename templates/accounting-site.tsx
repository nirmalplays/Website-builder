import React, { useState } from 'react';
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
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-blue-600 transition">{link}</a>
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
}