import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Search, Star, Package, Heart, ChevronRight, 
  Plus, Minus, Trash2, CheckCircle, Clock, Zap, Shield, User,
  Menu, X
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  { id: 1, name: "Premium Salmon Kibble", price: 45.99, category: "Dogs", rating: 5, image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Organic Catnip Mice", price: 12.50, category: "Cats", rating: 4, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Hamster Fitness Wheel", price: 18.99, category: "Small Pets", rating: 5, image: "https://images.unsplash.com/photo-1548767797-d8c84414694c?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Heavy Duty Chew Toy", price: 24.00, category: "Dogs", rating: 4, image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=400" },
];

export default function App() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('petCart') || '[]'); } catch { return []; }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    localStorage.setItem('petCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('loading');
    setTimeout(() => { setNewsletterStatus('success'); setEmail(""); }, 1000);
  };

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-slate-900">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-orange-100 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600 flex items-center gap-2">
            <Zap className="fill-orange-600" /> PawsitivePet
          </h1>
          <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative p-2 hover:bg-orange-100 rounded-full">
            <ShoppingCart />
            {cart.length > 0 && <span className="absolute top-0 right-0 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart.reduce((a, b) => a + b.qty, 0)}</span>}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-orange-600 text-white py-16 px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4">Happy Pets, Happy Life!</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">Premium nutrition and supplies delivered to your door.</p>
        <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">Shop Best Sellers</button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 py-12 space-y-16">
        
        {/* Categories */}
        <section className="grid md:grid-cols-3 gap-6">
          {['Dogs', 'Cats', 'Small Pets'].map(cat => (
            <div key={cat} className="bg-white p-8 rounded-2xl shadow-sm text-center border border-orange-100 hover:border-orange-300 transition-colors">
              <h3 className="text-2xl font-bold mb-4">{cat}</h3>
              <button className="text-orange-600 font-semibold flex items-center justify-center gap-2 mx-auto">Shop Now <ChevronRight size={18}/></button>
            </div>
          ))}
        </section>

        {/* Products */}
        <section>
          <h3 className="text-3xl font-bold mb-8">Bestselling Products</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {INITIAL_PRODUCTS.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
                <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h4 className="font-bold">{p.name}</h4>
                <div className="flex text-amber-400 my-1">{[...Array(p.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor"/>)}</div>
                <p className="text-orange-600 font-bold mb-4">${p.price.toFixed(2)}</p>
                <button onClick={() => addToCart(p)} className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800">Add to Cart</button>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-white p-8 md:p-16 rounded-3xl border border-orange-100 text-center">
          <h3 className="text-3xl font-bold mb-4">Join our VIP Pack</h3>
          <p className="mb-8 text-slate-600">Get 10% off your first order when you sign up.</p>
          <form onSubmit={handleNewsletter} className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" className="flex-1 p-3 border rounded-full px-6"
            />
            <button disabled={newsletterStatus === 'loading'} className="bg-orange-600 text-white px-6 rounded-full font-bold">
              {newsletterStatus === 'loading' ? '...' : 'Subscribe'}
            </button>
          </form>
          {newsletterStatus === 'success' && <p className="mt-4 text-emerald-600 flex items-center justify-center gap-2"><CheckCircle size={20}/> Thanks for joining!</p>}
        </section>
      </main>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] p-4 flex justify-end">
          <div className="bg-white w-full max-w-sm h-full rounded-l-2xl p-6 shadow-2xl overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Your Cart</h3>
              <button onClick={() => setIsCartOpen(false)}><X/></button>
            </div>
            {cart.length === 0 ? <p className="text-center py-10">Your cart is empty!</p> : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                    <img src={item.image} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setCart(cart.map(i => i.id === item.id ? {...i, qty: Math.max(1, i.qty - 1)} : i))} className="p-1"><Minus size={16}/></button>
                      <span>{item.qty}</span>
                      <button onClick={() => setCart(cart.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i))} className="p-1"><Plus size={16}/></button>
                      <button onClick={() => setCart(cart.filter(i => i.id !== item.id))} className="text-red-500 p-1"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
                <div className="pt-4 font-bold text-lg flex justify-between">
                  <span>Total:</span>
                  <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
                </div>
                <button className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold">Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-xl font-bold mb-4">PawsitivePet</h4>
          <p className="text-slate-400">© 2024 PawsitivePet Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}