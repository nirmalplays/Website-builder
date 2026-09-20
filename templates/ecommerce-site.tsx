import React, { useState } from 'react';
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
              <img src={`https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80`} alt={cat} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
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
                <span className="text-lg font-bold">${p.price}</span>
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
}