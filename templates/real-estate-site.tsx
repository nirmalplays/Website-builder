import React, { useState } from 'react';
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
                <img src={`https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400`} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
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
                    <img src={`https://i.pravatar.cc/150?u=${i}`} />
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
}