import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Search, Star, Menu, X, ChevronRight, 
  Package, DollarSign, Shield, Zap, Trash2, Plus, Minus,
  CheckCircle, Mail
} from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: "Minimalist Chronograph", price: 189, category: "Watches", rating: 5, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80" },
  { id: 2, name: "Premium Leather Tote", price: 245, category: "Bags", rating: 4, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80" },
  { id: 3, name: "Noise-Cancelling Buds", price: 299, category: "Tech", rating: 5, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80" },
  { id: 4, name: "Ergonomic Desk Lamp", price: 85, category: "Home", rating: 4, image: "https://images.unsplash.com/photo-1534073828943-f801091abb18?w=500&q=80" },
  { id: 5, name: "Modern Ceramic Vase", price: 45, category: "Home", rating: 5, image: "https://images.unsplash.com/photo-1581783329468-d56637330085?w=500&q=80" },
  { id: 6, name: "Canvas Weekend Bag", price: 120, category: "Bags", rating: 4, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80" },
  { id: 7, name: "Smart Fitness Tracker", price: 155, category: "Tech", rating: 4, image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500&q=80" },
  { id: 8, name: "Classic Aviator Frames", price: 110, category: "Accessories", rating: 5, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80" },
];

export default function App() {
  const [cart, setCart] = useState<{id: number, qty: number}[]>(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [newsletter, setNewsletter] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id: number) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      return item ? prev.map(i => i.id === id ? {...i, qty: i.qty + 1} : i) : [...prev, {id, qty: 1}];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => { setStatus('success'); setNewsletter(''); }, 1000);
  };

  const cartTotal = cart.reduce((acc, item) => {
    const p = PRODUCTS.find(p => p.id === item.id);
    return acc + (p?.price || 0) * item.qty;
  }, 0);

  const filteredProducts = PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tighter text-blue-600">AURA</h1>
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..." className="bg-transparent border-none outline-none ml-2 w-full text-sm"
            />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <ShoppingBag className="w-6 h-6" />
            {cart.length > 0 && <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cart.reduce((a, b) => a + b.qty, 0)}</span>}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">Designed for<br/> the Modern Life.</h2>
          <p className="text-xl text-gray-300 max-w-lg mb-8">Discover our curated collection of premium essentials built for quality and timeless style.</p>
          <button className="bg-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition">Shop Now</button>
        </div>
      </header>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Watches', 'Bags', 'Tech', 'Home'].map(cat => (
          <div key={cat} className="h-40 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center font-bold text-lg hover:border-blue-500 cursor-pointer transition">
            {cat}
          </div>
        ))}
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold mb-8">Best Sellers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <img src={product.image} alt={product.name} className="h-64 w-full object-cover" />
              <div className="p-4 flex-1">
                <p className="text-sm text-blue-600 font-medium">{product.category}</p>
                <h4 className="font-bold text-lg">{product.name}</h4>
                <div className="flex my-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}
                </div>
                <p className="text-xl font-bold">${product.price}</p>
                <button onClick={() => addToCart(product.id)} className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sale Banner */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h3 className="text-4xl font-bold mb-4">Summer Clearance Sale</h3>
        <p className="text-blue-100 mb-8">Get up to 40% off on selected items store-wide.</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold">View Deals</button>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold mb-12 text-center">Customer Stories</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah J.", text: "The quality of the leather bag is unmatched. Perfectly crafted." },
            { name: "Mark T.", text: "Fast shipping and the watch looks even better in person." },
            { name: "Elena R.", text: "My go-to store for minimalist tech accessories. Great experience." }
          ].map((r, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
              <p className="italic text-gray-600 mb-4">"{r.text}"</p>
              <p className="font-bold">- {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-100 py-16 border-t border-gray-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Join our Newsletter</h3>
          <p className="text-gray-600 mb-8">Get early access to new drops and exclusive offers.</p>
          {status === 'success' ? (
            <div className="flex items-center justify-center text-green-600 font-bold gap-2"><CheckCircle /> Thank you for subscribing!</div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input 
                required type="email" value={newsletter} onChange={e => setNewsletter(e.target.value)}
                placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 outline-none"
              />
              <button disabled={status === 'loading'} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50">
                {status === 'loading' ? 'Sending...' : <Mail />}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-200 text-center text-gray-500">
        <p className="mb-4">© 2024 Aura Commerce. All rights reserved.</p>
        <div className="flex justify-center gap-4 text-sm">
          <span>Secure Payments:</span>
          <span>Visa</span><span>Mastercard</span><span>PayPal</span>
        </div>
      </footer>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-full max-w-sm bg-white h-full p-6 shadow-2xl overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Your Cart</h3>
              <button onClick={() => setIsCartOpen(false)}><X /></button>
            </div>
            {cart.length === 0 ? <p className="text-gray-500">Your cart is empty.</p> : (
              <div className="space-y-4">
                {cart.map(item => {
                  const p = PRODUCTS.find(prod => prod.id === item.id);
                  return p && (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img src={p.image} className="w-16 h-16 rounded object-cover" />
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{p.name}</h4>
                        <p className="text-sm">${p.price} x {item.qty}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  );
                })}
                <div className="border-t pt-4 mt-4 font-bold text-lg flex justify-between">
                  <span>Total</span>
                  <span>${cartTotal}</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}