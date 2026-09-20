import React, { useState } from 'react';
import { ShoppingCart, Star, Filter, ChevronDown, Zap, Shield, Search, Menu, User } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: "Summit Peak Hardshell Jacket", price: 289.00, category: "Apparel", rating: 4.9, image: "https://images.unsplash.com/photo-1544925804-b55225215c0e?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Carbon Fiber Trekking Poles", price: 145.00, category: "Gear", rating: 4.7, image: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Alpine Pro Sleeping Bag", price: 340.00, category: "Gear", rating: 4.8, image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Merino Wool Base Layer", price: 85.00, category: "Apparel", rating: 4.6, image: "https://images.unsplash.com/photo-1523381294911-8d3cead1b424?auto=format&fit=crop&q=80&w=800" },
  { id: 5, name: "Titanium Camping Stove", price: 110.00, category: "Kitchen", rating: 4.5, image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800" },
  { id: 6, name: "Trailblazer Hydration Pack", price: 125.00, category: "Gear", rating: 4.9, image: "https://images.unsplash.com/photo-1522898467493-49726bf28798?auto=format&fit=crop&q=80&w=800" },
];

const CATEGORIES = ["All", "Apparel", "Gear", "Kitchen"];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="text-indigo-600 w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">SummitGear</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600">Equipment</a>
            <a href="#" className="hover:text-indigo-600">Apparel</a>
            <a href="#" className="hover:text-indigo-600">Deals</a>
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-slate-400 cursor-pointer" />
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-slate-600 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </div>
            <User className="w-5 h-5 text-slate-600 cursor-pointer" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold mb-4">Adventure Essentials</h1>
          <p className="text-slate-500 max-w-2xl">High-performance gear engineered for the toughest terrain and harshest conditions.</p>
        </header>

        <section className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full hover:bg-slate-100">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat 
                  ? "bg-indigo-600 text-white" 
                  : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{product.category}</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-slate-600">{product.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-4">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                  <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-colors flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-slate-900">Lifetime Warranty on all technical gear</span>
          </div>
          <p className="text-slate-500 text-sm">© 2024 SummitGear Outfitters. Built for the wild.</p>
        </div>
      </footer>
    </div>
  );
}