import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Search, 
  X, 
  Check, 
  Trash2, 
  Plus, 
  Minus, 
  Star, 
  Filter, 
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  { id: 1, name: "Minimalist Leather Backpack", category: "Accessories", price: 129.00, image: "https://images.unsplash.com/photo-1548863227-dc6c257ace6f?auto=format&fit=crop&q=80&w=400", rating: 4.8 },
  { id: 2, name: "Ergonomic Office Chair", category: "Furniture", price: 299.00, image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=400", rating: 4.5 },
  { id: 3, name: "Wireless Noise-Canceling Headphones", category: "Electronics", price: 199.00, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400", rating: 4.9 },
  { id: 4, name: "Ceramic Coffee Mug Set", category: "Home", price: 45.00, image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&q=80&w=400", rating: 4.2 },
  { id: 5, name: "Organic Cotton T-Shirt", category: "Apparel", price: 35.00, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400", rating: 4.6 },
  { id: 6, name: "Mechanical Gaming Keyboard", category: "Electronics", price: 159.00, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400", rating: 4.7 },
];

export default function App() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
  });
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter(i => i.qty > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" /> LuminaStore
          </h1>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-slate-100 rounded-full">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cart.reduce((a, b) => a + b.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 hover:border-indigo-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500">No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow">
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                <div className="p-4">
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{product.category}</span>
                  <h3 className="text-lg font-bold mt-1 text-slate-800">{product.name}</h3>
                  <div className="flex items-center gap-1 my-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            
            {cart.length === 0 ? (
              <p className="text-slate-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <p className="text-indigo-600 font-bold">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center border border-slate-200 rounded-lg">
                      <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-slate-50"><Minus className="w-4 h-4" /></button>
                      <span className="px-2 font-medium">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-slate-50"><Plus className="w-4 h-4" /></button>
                    </div>
                    <button onClick={() => updateQty(item.id, -item.qty)} className="text-slate-400 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                  </div>
                ))}
                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between text-lg font-bold mb-4">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2">
                    Checkout <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}