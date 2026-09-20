import React, { useState } from 'react';
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
              <img src={`https://images.unsplash.com/photo-${cat === 'Dogs' ? '1583511655857-d19b40a7a54e' : cat === 'Cats' ? '1514888286974-6c03e2ca1dba' : '1548767797-d86847129f58'}?auto=format&fit=crop&q=80&w=600`} className="w-full h-full object-cover" alt={cat} />
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
                <span className="font-bold text-lg">${p.price}</span>
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
                <div className="text-4xl font-bold mt-4">${s.price}</div>
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
}