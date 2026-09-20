import React, { useState } from 'react';
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
}