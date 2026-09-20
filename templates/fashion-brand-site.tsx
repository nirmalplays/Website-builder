import React, { useState } from 'react';
import { ShoppingCart, Menu, ArrowRight, Star, Shield, Zap, Mail, ChevronRight } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const products = [
    { id: 1, name: 'Obsidian Wool Overcoat', price: '$495', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Architectural Silk Shirt', price: '$185', img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'Seamless Tech Trousers', price: '$220', img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7e803?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'Minimalist Leather Derby', price: '$340', img: 'https://images.unsplash.com/photo-1533867639458-f2f5f14c6c4a?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Nav */}
      <nav className="fixed w-full z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tighter">AURA STUDIO</span>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#collection" className="hover:text-stone-500">Collection</a>
            <a href="#story" className="hover:text-stone-500">Our Story</a>
            <a href="#fit" className="hover:text-stone-500">Fit Guide</a>
          </div>
          <button className="relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[85vh] flex items-end p-12 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2400" alt="Campaign Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
        <div className="relative z-10 text-white max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-tight">The Winter Series.</h1>
          <p className="text-lg mb-8 opacity-90">Precision tailoring for the modern urban landscape. Discover the intersection of form and function.</p>
          <button className="bg-white text-stone-900 px-8 py-4 font-semibold flex items-center gap-2 hover:bg-stone-200 transition">
            Shop New Arrivals <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-light mb-12">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products.map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-stone-200 mb-4 overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <h3 className="font-medium">{p.name}</h3>
              <p className="text-stone-500">{p.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story & Materials */}
      <section id="story" className="py-24 bg-stone-900 text-stone-100">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-light mb-6">Designed for longevity.</h2>
            <p className="text-stone-400 mb-6 leading-relaxed">We reject the cycle of fast-moving trends. Aura Studio is built on the philosophy of 'Less, but better.' Every garment is engineered to endure, using only sustainably sourced organic wools and recycled technical fibers.</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm"><Shield size={16} /> Lifetime Stitch Guarantee</div>
              <div className="flex items-center gap-2 text-sm"><Zap size={16} /> Carbon Neutral</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600" alt="Fabric detail" className="rounded-sm" />
            <img src="https://images.unsplash.com/photo-1525507119023-7561f0857313?auto=format&fit=crop&q=80&w=600" alt="Studio work" className="rounded-sm mt-8" />
          </div>
        </div>
      </section>

      {/* Fit & Press */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div id="fit" className="bg-stone-100 p-12 rounded-2xl">
          <h3 className="text-2xl font-light mb-4">Precision Fit</h3>
          <p className="text-stone-600 mb-8">Not sure about your size? Our AI-powered fit tool analyzes your measurements against our specific garment patterns to ensure the perfect drape every time.</p>
          <button className="text-stone-900 font-semibold border-b-2 border-stone-900 flex items-center gap-2">Find My Size <ChevronRight size={16} /></button>
        </div>
        <div>
          <h3 className="text-2xl font-light mb-8">As Seen In</h3>
          <div className="space-y-6">
            {['Vogue Business', 'The Financial Times', 'Hypebeast'].map((pub) => (
              <div key={pub} className="flex items-center justify-between py-4 border-b border-stone-200">
                <span className="text-lg font-bold">{pub}</span>
                <Star className="text-stone-400" size={16} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email */}
      <section className="py-24 bg-stone-200">
        <div className="max-w-xl mx-auto px-6 text-center">
          <Mail className="mx-auto mb-6" size={40} />
          <h2 className="text-3xl font-light mb-4">Early Access</h2>
          <p className="mb-8 text-stone-600">Join our newsletter to receive first access to seasonal drops and exclusive studio events.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="email@address.com" className="flex-1 px-4 py-3 rounded-md border border-stone-300" />
            <button className="bg-stone-900 text-white px-6 py-3 rounded-md hover:bg-stone-800">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-stone-200 text-sm text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p>&copy; 2024 Aura Studio. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}