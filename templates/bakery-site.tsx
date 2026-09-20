import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, Star, Trash2, Plus, Minus, CheckCircle, Clock, Calendar, Users, Home, ChevronRight, Zap } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'Sourdough Country Loaf', price: 8.50, category: 'Bread', img: 'https://images.unsplash.com/photo-1585478259715-8722a8d5f148?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'Butter Croissant', price: 4.25, category: 'Pastry', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'Cinnamon Morning Bun', price: 4.75, category: 'Pastry', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'Olive Rosemary Focaccia', price: 6.00, category: 'Bread', img: 'https://images.unsplash.com/photo-1606914501447-5a3678130b29?auto=format&fit=crop&q=80&w=400' },
];

export default function App() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bakery-cart') || '[]'); } catch { return []; }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: '', flavor: 'Vanilla Bean', tiers: '1' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    localStorage.setItem('bakery-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart(prev => [...prev, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId: number) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleCakeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setOrderForm({ name: '', flavor: 'Vanilla Bean', tiers: '1' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1200);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-stone-200 z-50 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-orange-900">Hearth & Harvest</h1>
        <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative p-2 hover:bg-stone-100 rounded-full transition">
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{cart.length}</span>}
        </button>
      </nav>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="bg-white w-full max-w-sm p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Order</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2">✕</button>
            </div>
            {cart.length === 0 ? <p className="text-stone-500">Your basket is empty.</p> : (
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b pb-2">
                    <div><p className="font-medium">{item.name}</p><p className="text-sm text-stone-600">${item.price.toFixed(2)}</p></div>
                    <button onClick={() => removeFromCart(item.cartId)} className="text-red-500"><Trash2 size={18}/></button>
                  </div>
                ))}
                <div className="pt-4 border-t font-bold text-xl">Total: ${cartTotal.toFixed(2)}</div>
                <button className="w-full bg-orange-900 text-white py-3 rounded-lg hover:bg-orange-800 transition">Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}

      <header className="py-20 px-6 bg-stone-100 text-center">
        <h2 className="text-5xl md:text-6xl font-serif mb-6 text-stone-900">Artisan Bakes, <br/>Freshly Crafted Daily</h2>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">Hand-kneaded sourdough, delicate pastries, and custom cakes made with locally sourced organic flour.</p>
        <a href="#menu" className="inline-block bg-orange-900 text-white px-8 py-3 rounded-full hover:bg-orange-800 transition">Explore Our Menu</a>
      </header>

      <section id="menu" className="py-20 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-serif mb-10">Today's Selection</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {PRODUCTS.map(p => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition">
              <img src={p.img} alt={p.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <p className="text-xs uppercase tracking-widest text-orange-700 font-bold mb-1">{p.category}</p>
                <h4 className="font-bold mb-2">{p.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${p.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(p)} className="p-2 bg-stone-100 rounded-full hover:bg-orange-100 transition"><Plus size={20} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-orange-50">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-serif mb-8">Order a Custom Cake</h3>
          <form onSubmit={handleCakeOrder} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 space-y-4">
            <input required placeholder="Your Name" value={orderForm.name} onChange={e => setOrderForm({...orderForm, name: e.target.value})} className="w-full p-3 rounded-lg border border-stone-300"/>
            <select value={orderForm.flavor} onChange={e => setOrderForm({...orderForm, flavor: e.target.value})} className="w-full p-3 rounded-lg border border-stone-300">
              <option>Vanilla Bean</option><option>Dark Chocolate</option><option>Lemon Zest</option>
            </select>
            <input type="number" min="1" max="3" value={orderForm.tiers} onChange={e => setOrderForm({...orderForm, tiers: e.target.value})} className="w-full p-3 rounded-lg border border-stone-300" />
            <button disabled={formStatus !== 'idle'} className="w-full bg-orange-900 text-white py-3 rounded-lg hover:bg-orange-800 flex items-center justify-center gap-2">
              {formStatus === 'loading' ? 'Processing...' : formStatus === 'success' ? <><CheckCircle /> Request Sent!</> : 'Submit Request'}
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-stone-900 text-stone-400 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div><h4 className="text-white font-bold mb-4">Hearth & Harvest</h4><p>123 Flour Lane, Artisan District. Established 2018.</p></div>
          <div><h4 className="text-white font-bold mb-4">Hours</h4><p>Mon-Fri: 7am - 4pm<br/>Sat-Sun: 8am - 2pm</p></div>
          <div><h4 className="text-white font-bold mb-4">Delivery</h4><p>We deliver within 5 miles via our carbon-neutral bike fleet. Free for orders over $50.</p></div>
        </div>
      </footer>
    </div>
  );
}