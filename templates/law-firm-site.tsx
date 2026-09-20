import React, { useState } from 'react';
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
}