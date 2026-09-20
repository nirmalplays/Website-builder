import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Search, Menu, Star, Package, Shield, 
  Clock, CheckCircle, ChevronRight, X, Plus, Minus, 
  Trash2, Zap, ArrowRight, Home
} from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: number;
  material: string;
  category: string;
  image: string;
};

const PRODUCTS: Product[] = [
  { id: 1, name: "Nordic Oak Dining Table", price: 899, material: "Solid Oak", category: "Dining", image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "Velvet Lounge Chair", price: 450, material: "Velvet & Steel", category: "Living", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "Minimalist Bed Frame", price: 1200, material: "Walnut Wood", category: "Bedroom", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Ceramic Table Lamp", price: 120, material: "Matte Ceramic", category: "Decor", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600" },
];

export default function App() {
  const [cart, setCart] = useState<{product: Product, qty: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('furniture-cart');
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const updateCart = (newCart: any[]) => {
    setCart(newCart);
    localStorage.setItem('furniture-cart', JSON.stringify(newCart));
  };

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      updateCart(cart.map(item => item.product.id === product.id ? {...item, qty: item.qty + 1} : item));
    } else {
      updateCart([...cart, {product, qty: 1}]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => updateCart(cart.filter(item => item.product.id !== id));

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

  const handleConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Home className="w-6 h-6 text-emerald-700" />
          <span>MODERNHOME</span>
        </div>
        <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-stone-100 rounded-full">
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cart.reduce((a,b) => a + b.qty, 0)}</span>}
        </button>
      </nav>

      {/* Hero */}
      <section className="relative h-[500px] flex items-center justify-center text-center px-4 bg-stone-900 text-white">
        <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block py-1 px-3 bg-emerald-600 rounded-full text-sm font-medium mb-4">SEASONAL SALE: UP TO 40% OFF</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Transform Your Living Space</h1>
          <p className="text-lg text-stone-200 mb-8">Curated pieces that blend timeless design with modern comfort. Built to last a lifetime.</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Collection</h2>
          <div className="flex gap-2">
            {['All', 'Dining', 'Living', 'Bedroom'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full border transition-colors ${filter === cat ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 hover:border-stone-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.filter(p => filter === 'All' || p.category === filter).map(product => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100">
              <img src={product.image} className="w-full h-64 object-cover" alt={product.name} />
              <div className="p-4">
                <p className="text-sm text-stone-500 mb-1">{product.material}</p>
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-emerald-700">${product.price}</span>
                  <button onClick={() => addToCart(product)} className="p-2 bg-stone-100 hover:bg-stone-200 rounded-lg">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Design Services */}
      <section className="py-16 bg-stone-100">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Professional Design Services</h2>
            <p className="text-stone-600 mb-6">Not sure what fits your space? Our expert interior designers are here to help you curate your dream home with a personalized consultation.</p>
            <form onSubmit={handleConsultation} className="space-y-4">
              <input required type="email" placeholder="Your email address" className="w-full p-3 rounded-lg border border-stone-300" />
              <button disabled={isSubmitting} type="submit" className="w-full bg-emerald-700 text-white py-3 rounded-lg hover:bg-emerald-800 disabled:opacity-50">
                {isSubmitting ? 'Sending...' : success ? 'Request Sent!' : 'Book Free Consultation'}
              </button>
            </form>
          </div>
          <div className="h-64 bg-stone-200 rounded-2xl flex items-center justify-center">
            <Zap className="w-16 h-16 text-emerald-600" />
          </div>
        </div>
      </section>

      {/* Info Sections */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          { icon: Package, title: 'White Glove Delivery', desc: 'We deliver and assemble your furniture in the room of your choice.' },
          { icon: Shield, title: 'Lifetime Warranty', desc: 'Every piece is covered by our comprehensive structural warranty.' },
          { icon: Clock, title: 'Easy Returns', desc: 'Not happy? Return any item within 30 days, no questions asked.' }
        ].map((item, i) => (
          <div key={i} className="flex gap-4 p-6 bg-white rounded-xl border border-stone-200">
            <item.icon className="w-10 h-10 text-emerald-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-stone-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-stone-900/50" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white p-6 shadow-xl flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-4">
                  <img src={item.product.image} className="w-20 h-20 object-cover rounded-lg" alt="" />
                  <div className="flex-1">
                    <h4 className="font-bold">{item.product.name}</h4>
                    <p className="text-emerald-700">${item.product.price} x {item.qty}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-stone-400 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-xl font-bold mb-4"><span>Total</span><span>${total}</span></div>
              <button className="w-full bg-emerald-700 text-white py-3 rounded-lg font-bold">Checkout</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-bold text-white mb-2">MODERNHOME FURNITURE</p>
          <p className="text-sm">© 2024 ModernHome Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}