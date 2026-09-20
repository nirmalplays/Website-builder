import React, { useState } from 'react';
import { ShoppingCart, Star, Clock, MapPin, Mail, Phone, ChevronRight, Zap, Shield, Calendar, Users } from 'lucide-react';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const products = [
    { name: "Sourdough Country Loaf", price: "$8.50", img: "https://images.unsplash.com/photo-1585478259715-876766860538?auto=format&fit=crop&w=400&q=80" },
    { name: "Butter Croissant", price: "$4.25", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80" },
    { name: "Cinnamon Morning Bun", price: "$5.00", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80" },
    { name: "Olive & Rosemary Focaccia", price: "$7.00", img: "https://images.unsplash.com/photo-1607305387299-a3d9611cd659?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <nav className="sticky top-0 bg-stone-50/90 backdrop-blur-sm z-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tighter text-amber-900">HEARTH & CRUMB</h1>
          <div className="flex items-center gap-6">
            <button className="relative p-2" onClick={() => setCartCount(c => c + 1)}>
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && <span className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      <header className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-amber-700 font-semibold tracking-wide uppercase text-sm">Fresh from the oven</span>
            <h2 className="text-5xl md:text-6xl font-bold mt-4 mb-6 leading-tight">Handcrafted loaves for everyday joy.</h2>
            <p className="text-lg text-stone-600 mb-8">Using stone-milled organic flour and a 48-hour fermentation process to bring you the perfect golden crust.</p>
            <button className="bg-amber-900 text-white px-8 py-4 rounded-full font-medium hover:bg-amber-800 transition">View Daily Specials</button>
          </div>
          <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80" alt="Bakery display" className="rounded-2xl shadow-xl" />
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold mb-12">Our Daily Bakes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition">
              <img src={p.img} alt={p.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h4 className="font-bold text-lg">{p.name}</h4>
              <p className="text-amber-700 font-semibold mb-4">{p.price}</p>
              <button className="w-full border border-stone-200 py-2 rounded-lg hover:bg-stone-50">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-900 text-stone-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-8">Custom Celebration Cakes</h3>
          <p className="text-stone-400 mb-12">From intimate birthdays to grand weddings, we bake memories one layer at a time. Choose from Salted Caramel, Dark Chocolate Ganache, or Vanilla Bean.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {['Signature Tier', 'Premium Tier', 'Grand Tier'].map((tier) => (
              <div key={tier} className="border border-stone-700 p-8 rounded-2xl">
                <h4 className="text-xl font-bold mb-4">{tier}</h4>
                <div className="text-3xl font-light text-amber-500 mb-6">$65+</div>
                <button className="text-sm font-semibold border-b border-amber-500">Inquire Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">Our Baker's Story</h3>
            <p className="text-stone-600 mb-4 leading-relaxed">Founded in 2012 by Elena Rossi, Hearth & Crumb began in a tiny home kitchen with nothing but a sourdough starter named 'Barnaby' and a passion for heritage grains.</p>
            <p className="text-stone-600 leading-relaxed">Today, we work with local farmers to ensure every grain we use supports our regional ecosystem. We believe that good bread shouldn't just taste good—it should do good.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80" className="rounded-xl w-full h-64 object-cover" alt="Baker working" />
            <img src="https://images.unsplash.com/photo-1585478259715-876766860538?auto=format&fit=crop&w=400&q=80" className="rounded-xl w-full h-64 object-cover mt-8" alt="Fresh bread" />
          </div>
        </div>
      </section>

      <footer className="bg-stone-100 py-16 border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <h4 className="font-bold text-lg mb-4 text-amber-900">Hearth & Crumb</h4>
            <p className="text-stone-600 text-sm">124 Baker's Lane, Flour District<br/>Open Daily 7:00 AM - 4:00 PM</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <div className="flex items-center gap-2 text-stone-600 text-sm mb-2"><Phone size={16}/> (555) 123-4567</div>
            <div className="flex items-center gap-2 text-stone-600 text-sm"><Mail size={16}/> hello@hearthandcrumb.com</div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-white border border-stone-300 px-4 py-2 rounded-lg flex-1 text-sm" />
              <button className="bg-amber-900 text-white px-4 py-2 rounded-lg"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}