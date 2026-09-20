import React, { useState, useEffect } from 'react';
import { 
  Search, Home, MapPin, Bed, Bath, Square, DollarSign, 
  ChevronRight, Star, User, Users, Calculator, Shield, 
  Menu, X, CheckCircle 
} from 'lucide-react';

const INITIAL_PROPERTIES = [
  { id: 1, title: 'Modern Hilltop Villa', location: 'Beverly Hills', price: 4250000, beds: 5, baths: 4, sqft: 4500, img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Downtown Loft', location: 'New York', price: 1200000, beds: 2, baths: 2, sqft: 1200, img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Coastal Retreat', location: 'Malibu', price: 6800000, beds: 4, baths: 5, sqft: 3800, img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Suburban Family Home', location: 'Austin', price: 850000, beds: 4, baths: 3, sqft: 2800, img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Tech District Condo', location: 'San Francisco', price: 2100000, beds: 3, baths: 2, sqft: 1800, img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Mountain Cabin', location: 'Aspen', price: 3400000, beds: 3, baths: 3, sqft: 2200, img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800' },
];

export default function App() {
  const [properties, setProperties] = useState(() => {
    try { return JSON.parse(localStorage.getItem('props') || 'null') || INITIAL_PROPERTIES; }
    catch { return INITIAL_PROPERTIES; }
  });
  const [search, setSearch] = useState({ loc: '', price: '9999999', beds: '0' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mortgage, setMortgage] = useState({ amount: 500000, years: 30, rate: 5.5, result: 0 });

  useEffect(() => { localStorage.setItem('props', JSON.stringify(properties)); }, [properties]);

  const filtered = properties.filter(p => 
    (search.loc === '' || p.location.toLowerCase().includes(search.loc.toLowerCase())) &&
    (p.price <= parseInt(search.price)) &&
    (p.beds >= parseInt(search.beds))
  );

  const calculateMortgage = () => {
    const r = mortgage.rate / 100 / 12;
    const n = mortgage.years * 12;
    const res = (mortgage.amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMortgage(prev => ({ ...prev, result: Math.round(res) }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl text-blue-600">
            <Home /> EstateFlow
          </div>
          <div className="hidden md:flex gap-8 font-medium">
            {['Buy', 'Rent', 'Agents', 'Calculator'].map(i => <button key={i} className="hover:text-blue-600 transition">{i}</button>)}
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu /></button>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-20 px-4 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Find your dream home with ease.</h1>
          <div className="bg-white p-4 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4">
            <input placeholder="City or Neighborhood" className="flex-1 p-3 text-slate-900 border rounded-lg" onChange={e => setSearch({...search, loc: e.target.value})} />
            <select className="p-3 text-slate-900 border rounded-lg" onChange={e => setSearch({...search, price: e.target.value})}>
              <option value="9999999">Any Price</option>
              <option value="1000000">Under $1M</option>
              <option value="3000000">Under $3M</option>
            </select>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">Search</button>
          </div>
        </div>
      </header>

      {/* Listings */}
      <main className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-10">Featured Listings</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map(p => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition">
              <img src={p.img} alt={p.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-lg">{p.title}</h3>
                <p className="text-slate-500 mb-4">{p.location}</p>
                <div className="flex justify-between text-sm text-slate-600 mb-4">
                  <span className="flex items-center gap-1"><Bed size={16}/> {p.beds} Beds</span>
                  <span className="flex items-center gap-1"><Bath size={16}/> {p.baths} Baths</span>
                  <span className="flex items-center gap-1"><Square size={16}/> {p.sqft} sqft</span>
                </div>
                <div className="font-bold text-2xl text-blue-600">${p.price.toLocaleString()}</div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="col-span-full text-center py-20 text-slate-500">No properties found matching your criteria.</div>}
        </div>

        {/* Calculator Teaser */}
        <div className="mt-20 bg-slate-900 text-white rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-4">Mortgage Calculator</h2>
            <p className="text-slate-400 mb-6">Estimate your monthly payments with our simple tool. Plan your future with confidence.</p>
            <div className="space-y-4">
              <input type="number" value={mortgage.amount} onChange={e => setMortgage({...mortgage, amount: +e.target.value})} className="w-full p-3 rounded text-slate-900" />
              <button onClick={calculateMortgage} className="bg-blue-600 px-6 py-3 rounded font-bold hover:bg-blue-500">Calculate Now</button>
              {mortgage.result > 0 && <div className="text-2xl font-bold text-green-400">Est. ${mortgage.result.toLocaleString()}/mo</div>}
            </div>
          </div>
          <div className="w-full md:w-1/3 h-64 bg-blue-800 rounded-2xl flex items-center justify-center">
            <Calculator size={64} className="text-blue-400" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
          <div><h4 className="font-bold mb-4">EstateFlow</h4><p className="text-slate-500">Premium real estate services worldwide.</p></div>
          {['Company', 'Resources', 'Legal'].map(section => (
            <div key={section}>
              <h4 className="font-bold mb-4">{section}</h4>
              <ul className="space-y-2 text-slate-600">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}