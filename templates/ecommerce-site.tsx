import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Search, Star, Menu, X, ChevronRight, 
  Package, DollarSign, Shield, Zap, Plus, Minus, Trash2, 
  CheckCircle, Mail, ArrowRight
} from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
};

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Minimalist Desk Lamp", price: 89, category: "Home", rating: 4.8, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Ergonomic Office Chair", price: 299, category: "Furniture", rating: 4.9, image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Noise Cancelling Headphones", price: 199, category: "Tech", rating: 4.7, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Mechanical Keyboard", price: 149, category: "Tech", rating: 4.6, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Ceramic Coffee Mug", price: 24, category: "Kitchen", rating: 4.5, image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Canvas Backpack", price: 65, category: "Accessories", rating: 4.8, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "Smart Fitness Watch", price: 249, category: "Tech", rating: 4.4, image: "https://images.unsplash.com/photo-1557961168-e6d8a417537b?auto=format&fit=crop&w=400&q=80" },
  { id: 8, name: "Organic Cotton Throw", price: 55, category: "Home", rating: 4.9, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80" },
];

export default function App() {
  const [cart, setCart] = useState<{product: Product, qty: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart');
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  const updateCart = (product: Product, delta: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      let next;
      if (existing) {
        const newQty = existing.qty + delta;
        next = newQty <= 0 
          ? prev.filter(i => i.product.id !== product.id)
          : prev.map(i => i.product.id === product.id ? { ...i, qty: newQty } : i);
      } else {
        next = [...prev, { product, qty: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(next));
      return next;
    });
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('loading');
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }, 1000);
  };

  const filteredProducts = INITIAL_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600 tracking-tight">MODERN.</div>
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-gray-100 rounded-full">
            <ShoppingBag className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cart.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative py-20 bg-blue-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold max-w-2xl leading-tight">Elevate Your Daily Routine.</h1>
          <p className="mt-6 text-xl text-blue-100 max-w-lg">Hand-picked essentials designed for the modern lifestyle. Quality meeting aesthetic.</p>
          <button className="mt-10 bg-white text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors">Shop Collection</button>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-10">Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl mb-4" />
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="flex items-center text-yellow-500 text-sm font-bold">
                  <Star className="w-4 h-4 fill-current mr-1" /> {product.rating}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-lg">${product.price}</span>
                <button 
                  onClick={() => updateCart(product, 1)}
                  className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Newsletter */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Join Our Community</h2>
          <p className="mt-4 text-gray-400">Get 10% off your first order and stay updated with new arrivals.</p>
          <form onSubmit={handleNewsletter} className="mt-8 flex gap-2">
            <input 
              required
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button 
              disabled={newsletterStatus !== 'idle'}
              className="bg-blue-600 px-8 py-4 rounded-full font-bold flex items-center hover:bg-blue-500 disabled:bg-gray-600"
            >
              {newsletterStatus === 'success' ? <CheckCircle /> : newsletterStatus === 'loading' ? "Wait..." : "Subscribe"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2024 MODERN Storefront. Built for excellence.</p>
          <div className="flex items-center gap-4">
            <Shield className="w-5 h-5" />
            <Zap className="w-5 h-5" />
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full p-6 shadow-xl flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)}><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.length === 0 ? <p className="text-gray-500">Your cart is empty.</p> : cart.map(item => (
                <div key={item.product.id} className="flex gap-4 p-2 border-b">
                  <img src={item.product.image} className="w-16 h-16 rounded object-cover" alt="" />
                  <div className="flex-1">
                    <p className="font-bold">{item.product.name}</p>
                    <p className="text-sm">${item.product.price} x {item.qty}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => updateCart(item.product, -1)}><Trash2 className="w-4 h-4 text-red-500"/></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t mt-6">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total</span>
                <span>${cart.reduce((acc, i) => acc + (i.product.price * i.qty), 0)}</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}