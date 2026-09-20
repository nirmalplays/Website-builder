import React, { useState } from 'react';
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
}