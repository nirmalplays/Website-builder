import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Calendar, Star, CheckCircle, Mail, 
  Menu, X, ChevronRight, DollarSign, Clock, Shield, 
  Users, Plane, TrendingUp, Sparkles 
} from 'lucide-react';

const INITIAL_DESTINATIONS = [
  { id: 1, name: "Santorini, Greece", price: 1250, image: "https://images.unsplash.com/photo-1613395877344-13d4a8e8d49e?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
  { id: 2, name: "Kyoto, Japan", price: 1800, image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
  { id: 3, name: "Bali, Indonesia", price: 950, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800", rating: 4.7 },
  { id: 4, name: "Swiss Alps, Switzerland", price: 2100, image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
  { id: 5, name: "Tulum, Mexico", price: 1100, image: "https://images.unsplash.com/photo-1503756234508-e32369269dbd?auto=format&fit=crop&q=80&w=800", rating: 4.6 },
  { id: 6, name: "Cape Town, South Africa", price: 1600, image: "https://images.unsplash.com/photo-1580060839134-7545edca6194?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [filteredDestinations, setFilteredDestinations] = useState(INITIAL_DESTINATIONS);

  useEffect(() => {
    const filtered = INITIAL_DESTINATIONS.filter(d => 
      d.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDestinations(filtered);
  }, [search]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes('@')) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl text-blue-600">
            <Plane /> Wanderlust
          </div>
          <div className="hidden md:flex gap-8 font-medium">
            {['Destinations', 'Packages', 'Reviews', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition-colors">{item}</a>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight">
            Discover Your Next <span className="text-blue-600">Adventure</span>
          </h1>
          <p className="text-xl text-slate-600">Explore hand-picked destinations around the world with our curated travel packages.</p>
          <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 border border-slate-100">
            <div className="flex-1 flex items-center px-4 gap-2 border-b md:border-b-0 md:border-r border-slate-100">
              <Search className="text-blue-500" size={20} />
              <input 
                type="text" 
                placeholder="Where to?" 
                className="w-full py-3 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">Search</button>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <section id="destinations" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map(dest => (
            <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100">
              <img src={dest.image} alt={dest.name} className="h-64 w-full object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{dest.name}</h3>
                  <div className="flex items-center gap-1 font-semibold text-yellow-500"><Star size={16} fill="currentColor" /> {dest.rating}</div>
                </div>
                <p className="text-slate-500 mb-4">Starting from <span className="font-bold text-slate-900">${dest.price}</span></p>
                <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">View Details</button>
              </div>
            </div>
          ))}
          {filteredDestinations.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-500">No destinations found matching your search.</div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          {[
            { icon: Shield, title: "Secure Booking", desc: "Your payments are protected with top-tier encryption." },
            { icon: Users, title: "Expert Guides", desc: "Local professionals lead every tour for an authentic experience." },
            { icon: TrendingUp, title: "Best Price Guarantee", desc: "Found it cheaper? We'll match it, plus offer a discount." }
          ].map((item, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-blue-600">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto bg-blue-600 rounded-3xl p-8 md:p-16 text-center text-white space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Get Exclusive Deals</h2>
          <p className="opacity-90">Join 50,000+ travelers and receive our best offers directly to your inbox.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              required
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 rounded-xl text-slate-900 outline-none"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button 
              disabled={status === 'loading'}
              className="bg-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-black transition flex items-center justify-center gap-2"
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
          {status === 'success' && <p className="text-sm font-medium flex items-center justify-center gap-2"><CheckCircle size={16} /> Welcome to the family!</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-2xl text-white">
              <Plane /> Wanderlust
            </div>
            <p className="max-w-xs">Making travel accessible and memorable for everyone.</p>
          </div>
          <div className="flex gap-12">
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>Help Center</li>
                <li>Safety</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-sm">
          © {new Date().getFullYear()} Wanderlust Travel Agency. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
tsx