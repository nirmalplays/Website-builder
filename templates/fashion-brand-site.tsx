import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Search, Menu, Star, Heart, X, Plus, Minus, 
  ArrowRight, Mail, Zap, Shield, ChevronDown, CheckCircle 
} from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: "Ethereal Linen Blazer", price: 280, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Raw Silk Wide-Leg Trouser", price: 210, img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Organic Cotton Ribbed Tee", price: 85, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Hand-Woven Wool Scarf", price: 145, img: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800" }
];

export default function App() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart(prev => [...prev, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId: number) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setStatus('loading');
    setTimeout(() => { setStatus('success'); setEmail(''); }, 1000);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Menu className="lg:hidden cursor-pointer" />
          <span className="text-xl font-bold tracking-tighter">AETHERIA</span>
        </div>
        <div className="hidden lg:flex gap-8 text-sm uppercase tracking-widest font-medium">
          <a href="#shop" className="hover:text-stone-500">Shop</a>
          <a href="#story" className="hover:text-stone-500">Our Story</a>
          <a href="#fit" className="hover:text-stone-500">Fit Guide</a>
        </div>
        <button onClick={() => setIsCartOpen(true)} className="relative">
          <ShoppingBag />
          {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>}
        </button>
      </nav>

      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover" alt="Campaign" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative text-center text-white p-6">
          <h1 className="text-6xl md:text-8xl font-serif mb-6">Autumn Solstice</h1>
          <a href="#shop" className="bg-white text-stone-900 px-8 py-3 uppercase text-sm font-bold hover:bg-stone-200 transition">Explore Collection</a>
        </div>
      </header>

      {/* Shop */}
      <section id="shop" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-serif mb-12">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map(p => (
            <div key={p.id} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img src={p.img} alt={p.name} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition duration-500" />
                <button 
                  onClick={() => addToCart(p)}
                  className="absolute bottom-4 right-4 bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <Plus size={20} />
                </button>
              </div>
              <h3 className="font-medium">{p.name}</h3>
              <p className="text-stone-500">${p.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="bg-stone-900 text-stone-100 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif mb-8">Consciously Crafted</h2>
          <p className="text-lg leading-relaxed mb-8">We believe fashion should feel like a second skin. Our fabrics are sourced from fair-trade artisan cooperatives, ensuring every piece you wear leaves a lighter footprint on the earth.</p>
          <div className="grid grid-cols-3 gap-8 border-t border-stone-700 pt-8">
            <div><Zap className="mx-auto mb-2" /><span>Zero Waste</span></div>
            <div><Shield className="mx-auto mb-2" /><span>Ethical</span></div>
            <div><Star className="mx-auto mb-2" /><span>Timeless</span></div>
          </div>
        </div>
      </section>

      {/* Signup */}
      <section className="py-20 px-6 max-w-xl mx-auto text-center">
        <h3 className="text-2xl font-serif mb-4">Join the Inner Circle</h3>
        <p className="text-stone-500 mb-8">Get early access to our limited-run drops.</p>
        <form onSubmit={handleSubscribe} className="flex gap-2">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            className="flex-1 border border-stone-300 px-4 py-3 outline-none focus:border-stone-900"
            required
          />
          <button className="bg-stone-900 text-white px-6 py-3 disabled:opacity-50" disabled={status === 'loading'}>
            {status === 'success' ? <CheckCircle /> : <ArrowRight />}
          </button>
        </form>
      </section>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Your Bag ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)}><X /></button>
            </div>
            {cart.map((item: any) => (
              <div key={item.cartId} className="flex gap-4 mb-6">
                <img src={item.img} className="w-20 h-20 object-cover" alt="" />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-stone-500">${item.price}</p>
                </div>
                <button onClick={() => removeFromCart(item.cartId)} className="text-stone-400 hover:text-red-500"><X /></button>
              </div>
            ))}
            {cart.length > 0 ? (
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold mb-6"><span>Total</span><span>${cartTotal}</span></div>
                <button className="w-full bg-stone-900 text-white py-4 uppercase tracking-widest text-sm">Checkout</button>
              </div>
            ) : <p className="text-center text-stone-500 mt-20">Your bag is empty.</p>}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-100 py-12 px-6 text-center text-sm text-stone-500">
        <p className="mb-4">&copy; 2024 AETHERIA. All rights reserved.</p>
        <div className="flex justify-center gap-6">
          <span>Privacy Policy</span>
          <span>Returns</span>
          <span>Contact</span>
        </div>
      </footer>
    </div>
  );
}