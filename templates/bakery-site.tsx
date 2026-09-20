import React, { useState, useEffect } from 'react';
import { 
  ShoppingBasket, 
  Minus, 
  Plus, 
  Trash2, 
  CheckCircle, 
  X, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  MessageSquare, 
  ArrowRight,
  Sparkles,
  Zap,
  Shield
} from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: "Sourdough Boule", price: 8.50, category: "Bread", img: "https://images.unsplash.com/photo-1585478259715-872266d44eba?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Butter Croissant", price: 4.25, category: "Pastry", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Cinnamon Swirl", price: 4.75, category: "Pastry", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Focaccia Slab", price: 6.00, category: "Bread", img: "https://images.unsplash.com/photo-1573069352243-7f2877a5e957?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "Pain au Chocolat", price: 4.50, category: "Pastry", img: "https://images.unsplash.com/photo-1608198093002-ad4e005486d9?auto=format&fit=crop&q=80&w=400" },
  { id: 6, name: "Rye Loaf", price: 7.50, category: "Bread", img: "https://images.unsplash.com/photo-1597647248352-736b44589258?auto=format&fit=crop&q=80&w=400" },
];

export default function App() {
  const [cart, setCart] = useState<{id: number, qty: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: '', date: '', tiers: '1', flavor: 'Vanilla' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bakery-cart');
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    localStorage.setItem('bakery-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) return prev.map(item => item.id === id ? {...item, qty: item.qty + 1} : item);
      return [...prev, { id, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((acc, item) => {
    const prod = PRODUCTS.find(p => p.id === item.id);
    return acc + (prod?.price || 0) * item.qty;
  }, 0);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setOrderForm({ name: '', date: '', tiers: '1', flavor: 'Vanilla' });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md z-40 border-b border-stone-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold text-amber-800">Rise & Flourish</h1>
        <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-stone-100 rounded-full">
          <ShoppingBasket className="w-6 h-6" />
          {cart.length > 0 && <span className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cart.reduce((a,b) => a + b.qty, 0)}</span>}
        </button>
      </nav>

      <header className="relative h-[500px] flex items-center justify-center text-center px-4">
        <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover brightness-50" alt="Bakery Hero" />
        <div className="relative z-10 text-white max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-serif mb-6">Artisan Bakes, Daily Fresh</h2>
          <p className="text-lg mb-8">Hand-crafted sourdough, buttery pastries, and custom cakes made with love in our village kitchen.</p>
          <a href="#menu" className="bg-amber-700 hover:bg-amber-800 px-8 py-3 rounded-full font-medium transition">View Daily Menu</a>
        </div>
      </header>

      <section id="menu" className="max-w-6xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-serif mb-12 text-center">Our Daily Bakes</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.map(p => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition">
              <img src={p.img} alt={p.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">{p.category}</span>
                <h4 className="text-xl font-semibold mt-1 mb-3">{p.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">${p.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(p.id)} className="bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-800">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-900 text-stone-100 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-serif mb-8 text-center">Custom Cake Orders</h3>
          <form onSubmit={handleOrderSubmit} className="grid md:grid-cols-2 gap-6 bg-white text-stone-900 p-8 rounded-2xl">
            <input required placeholder="Your Name" value={orderForm.name} onChange={e => setOrderForm({...orderForm, name: e.target.value})} className="border rounded-lg p-3 w-full" />
            <input required type="date" value={orderForm.date} onChange={e => setOrderForm({...orderForm, date: e.target.value})} className="border rounded-lg p-3 w-full" />
            <select value={orderForm.tiers} onChange={e => setOrderForm({...orderForm, tiers: e.target.value})} className="border rounded-lg p-3 w-full">
              <option value="1">1 Tier</option><option value="2">2 Tiers</option><option value="3">3 Tiers</option>
            </select>
            <select value={orderForm.flavor} onChange={e => setOrderForm({...orderForm, flavor: e.target.value})} className="border rounded-lg p-3 w-full">
              <option>Vanilla</option><option>Chocolate</option><option>Lemon</option>
            </select>
            <button disabled={!orderForm.name || !orderForm.date} className="md:col-span-2 bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800 disabled:opacity-50">
              {isSubmitted ? <span className="flex items-center justify-center gap-2"><CheckCircle size={18}/> Inquiry Sent!</span> : "Request Consultation"}
            </button>
          </form>
        </div>
      </section>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-sm h-full p-6 shadow-2xl flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-bold">Your Basket</h4>
              <button onClick={() => setIsCartOpen(false)}><X/></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.length === 0 ? <p className="text-stone-500">Your basket is empty.</p> : cart.map(item => {
                const prod = PRODUCTS.find(p => p.id === item.id)!;
                return (
                  <div key={item.id} className="flex justify-between items-center border-b pb-4">
                    <div>
                      <p className="font-medium">{prod.name}</p>
                      <p className="text-sm text-stone-500">${prod.price.toFixed(2)} x {item.qty}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500"><Trash2 size={18}/></button>
                  </div>
                );
              })}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold mb-4"><span>Total:</span><span>${total.toFixed(2)}</span></div>
              <button className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800">Checkout</button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-12 bg-stone-100 border-t text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h5 className="font-bold text-lg mb-4">Rise & Flourish Bakery</h5>
          <p className="text-stone-600 mb-6">123 Baker Street, Village Center | Open Wed-Sun 8am - 3pm</p>
          <div className="flex gap-6 justify-center text-stone-500 text-sm">
            <span className="flex items-center gap-2"><Sparkles size={16}/> Organic Ingredients</span>
            <span className="flex items-center gap-2"><Shield size={16}/> Local Sourced</span>
          </div>
        </div>
      </footer>
    </div>
  );
}