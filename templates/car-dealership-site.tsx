import React, { useState, useEffect } from 'react';
import { 
  Search, Car, DollarSign, Shield, Users, Clock, 
  ChevronRight, Star, TrendingUp, Phone, Menu, X, CheckCircle 
} from 'lucide-react';

const INITIAL_INVENTORY = [
  { id: 1, make: 'Tesla', model: 'Model 3', year: 2022, price: 34990, mileage: 28000, img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=600' },
  { id: 2, make: 'Toyota', model: 'Camry', year: 2021, price: 24500, mileage: 42000, img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=600' },
  { id: 3, make: 'BMW', model: 'X5', year: 2023, price: 58900, mileage: 12000, img: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=600' },
  { id: 4, make: 'Honda', model: 'Civic', year: 2020, price: 21900, mileage: 35000, img: 'https://images.unsplash.com/photo-1591465201947-a8220023a886?auto=format&fit=crop&q=80&w=600' },
  { id: 5, make: 'Ford', model: 'Mustang', year: 2022, price: 38500, mileage: 15000, img: 'https://images.unsplash.com/photo-1584345604476-8aa5e58b96d7?auto=format&fit=crop&q=80&w=600' },
  { id: 6, make: 'Audi', model: 'A4', year: 2021, price: 32000, mileage: 29000, img: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1872?auto=format&fit=crop&q=80&w=600' },
];

export default function App() {
  const [inventory] = useState(INITIAL_INVENTORY);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(INITIAL_INVENTORY);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  // Finance Calculator State
  const [price, setPrice] = useState(30000);
  const [term, setTerm] = useState(60);
  const [rate, setRate] = useState(4.9);
  
  // Trade-in State
  const [tradeForm, setTradeForm] = useState({ make: '', model: '', year: '' });
  const [tradeSuccess, setTradeSuccess] = useState(false);

  useEffect(() => {
    setFiltered(inventory.filter(c => 
      `${c.make} ${c.model}`.toLowerCase().includes(search.toLowerCase())
    ));
  }, [search, inventory]);

  const handleTradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTradeSuccess(true);
    setTimeout(() => setTradeSuccess(false), 3000);
    setTradeForm({ make: '', model: '', year: '' });
  };

  const monthlyPayment = ((price * (1 + (rate / 100) * (term / 12))) / term).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Nav */}
      <nav className="bg-white sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            <Car /> PREMIER MOTORS
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#inventory" className="hover:text-blue-700">Inventory</a>
            <a href="#finance" className="hover:text-blue-700">Finance</a>
            <a href="#service" className="hover:text-blue-700">Service</a>
            <div className="flex items-center gap-2 text-blue-700 font-bold">
              <Phone size={18} /> (555) 123-4567
            </div>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Drive Your Dream Today</h1>
          <div className="bg-white p-4 rounded-xl shadow-2xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by make or model..." 
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800">Search Inventory</button>
          </div>
        </div>
      </header>

      {/* Featured */}
      <section id="inventory" className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10">Featured Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(car => (
            <div key={car.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              <img src={car.img} alt={car.model} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold">{car.year} {car.make} {car.model}</h3>
                <p className="text-gray-500 mb-4">{car.mileage.toLocaleString()} miles</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-700">${car.price.toLocaleString()}</span>
                  <button className="text-blue-700 font-bold flex items-center hover:underline">View Details <ChevronRight size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Finance Calculator */}
      <section id="finance" className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-3xl font-bold mb-8">Finance Calculator</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Vehicle Price (${price})</label>
                <input type="range" min="5000" max="100000" step="500" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Loan Term ({term} months)</label>
                <select value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg">
                  <option value={36}>36 Months</option>
                  <option value={48}>48 Months</option>
                  <option value={60}>60 Months</option>
                  <option value={72}>72 Months</option>
                </select>
              </div>
            </div>
            <div className="bg-blue-700 text-white p-8 rounded-xl flex flex-col justify-center items-center">
              <p className="text-blue-100 uppercase tracking-widest text-sm mb-2">Estimated Payment</p>
              <div className="text-5xl font-bold mb-4">${monthlyPayment}</div>
              <p className="text-sm text-blue-200 italic">Based on {rate}% APR</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trade-in Form */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="bg-blue-900 text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Trade-in Your Vehicle</h2>
            <p className="text-blue-200">Get an instant valuation for your current car. No obligations, just fair market pricing.</p>
          </div>
          <form onSubmit={handleTradeSubmit} className="flex-1 w-full bg-white text-gray-900 p-6 rounded-xl space-y-4">
            {tradeSuccess ? (
              <div className="text-green-600 font-bold text-center py-8">
                <CheckCircle className="mx-auto mb-2" /> Evaluation request received!
              </div>
            ) : (
              <>
                <input required placeholder="Make" className="w-full p-3 border rounded-lg" value={tradeForm.make} onChange={e => setTradeForm({...tradeForm, make: e.target.value})} />
                <input required placeholder="Model" className="w-full p-3 border rounded-lg" value={tradeForm.model} onChange={e => setTradeForm({...tradeForm, model: e.target.value})} />
                <input required type="number" placeholder="Year" className="w-full p-3 border rounded-lg" value={tradeForm.year} onChange={e => setTradeForm({...tradeForm, year: e.target.value})} />
                <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition">Get Valuation</button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Why Buy & Service */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-8">Why Buy From Us?</h2>
            <div className="space-y-6">
              {[
                { title: 'Certified Quality', icon: Shield },
                { title: 'Transparent Pricing', icon: DollarSign },
                { title: 'Excellent Service', icon: Users }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-gray-600">We prioritize your satisfaction with our 100-point inspection and no-haggle pricing.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id="service" className="bg-gray-900 text-white p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6">Service Department</h2>
            <p className="mb-6 text-gray-400">Our expert technicians are here to keep your vehicle running like new. From oil changes to major repairs, we use genuine parts.</p>
            <div className="flex items-center gap-4 text-sm bg-gray-800 p-4 rounded-lg">
              <Clock className="text-blue-500" />
              <span>Mon-Fri: 7am - 7pm | Sat: 8am - 4pm</span>
            </div>
            <button className="mt-8 w-full border-2 border-blue-600 py-3 rounded-lg font-bold hover:bg-blue-600 transition">Schedule Appointment</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-2xl font-bold text-white mb-4">PREMIER MOTORS</div>
          <p className="mb-8">123 Highway Blvd, Automotive City, CA 90210</p>
          <div className="flex justify-center gap-6 text-sm">
            <span>© 2024 Premier Motors. All rights reserved.</span>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}