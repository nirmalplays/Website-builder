import React, { useState, useEffect } from 'react';
import { 
  Coffee, Star, MapPin, Clock, ShoppingCart, 
  Plus, Minus, CheckCircle, X, ChevronDown, 
  Zap, Package, Shield, Heart
} from 'lucide-react';

const INITIAL_MENU = {
  drinks: [
    { id: 1, name: 'Ethiopian Yirgacheffe', price: 4.50, category: 'Pour Over' },
    { id: 2, name: 'Classic Flat White', price: 4.25, category: 'Espresso' },
    { id: 3, name: 'Cold Brew Reserve', price: 5.00, category: 'Cold' },
    { id: 4, name: 'Oat Milk Latte', price: 5.50, category: 'Espresso' },
  ],
  food: [
    { id: 5, name: 'Almond Croissant', price: 3.75 },
    { id: 6, name: 'Avocado Sourdough', price: 8.50 },
    { id: 7, name: 'Blueberry Muffin', price: 3.25 },
  ]
};

export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('menu');
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('coffee_cart');
      if (saved) setCart(JSON.parse(saved));
      const points = localStorage.getItem('coffee_points');
      if (points) setLoyaltyPoints(parseInt(points));
    } catch (e) {}
  }, []);

  const updateCart = (item: any, delta: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      let next;
      if (existing) {
        next = prev.map(i => i.id === item.id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
                   .filter(i => i.qty > 0);
      } else if (delta > 0) {
        next = [...prev, { ...item, qty: 1 }];
      } else {
        next = prev;
      }
      localStorage.setItem('coffee_cart', JSON.stringify(next));
      return next;
    });
  };

  const addToLoyalty = () => {
    const newPoints = loyaltyPoints + 10;
    setLoyaltyPoints(newPoints);
    localStorage.setItem('coffee_points', newPoints.toString());
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOrderSuccess(true);
    setCart([]);
    localStorage.removeItem('coffee_cart');
    setTimeout(() => setShowOrderSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <nav className="sticky top-0 bg-stone-50/90 backdrop-blur z-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Coffee className="text-amber-700" size={28} />
            <span className="font-bold text-xl tracking-tight">HEIRLOOM BREW</span>
          </div>
          <div className="flex gap-6 font-medium text-sm">
            <button onClick={() => setActiveTab('menu')} className={activeTab === 'menu' ? 'text-amber-700' : ''}>Menu</button>
            <button onClick={() => setActiveTab('story')} className={activeTab === 'story' ? 'text-amber-700' : ''}>Our Story</button>
            <button onClick={() => setActiveTab('loyalty')} className={activeTab === 'loyalty' ? 'text-amber-700' : ''}>Loyalty</button>
            <button className="relative" onClick={() => setActiveTab('cart')}>
              <ShoppingCart size={20} />
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cart.reduce((a, b) => a + b.qty, 0)}</span>}
            </button>
          </div>
        </div>
      </nav>

      {activeTab === 'menu' && (
        <main className="max-w-4xl mx-auto px-4 py-12">
          <section className="text-center mb-16">
            <h1 className="text-5xl font-serif mb-4">Crafted with Precision</h1>
            <p className="text-stone-600 max-w-lg mx-auto">Small-batch roasted beans sourced directly from independent farmers, brewed to perfection.</p>
          </section>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-serif mb-6 flex items-center gap-2"><Zap className="text-amber-700" /> Drinks</h2>
              {INITIAL_MENU.drinks.map(item => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-stone-200">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-stone-500">{item.category}</p>
                  </div>
                  <button onClick={() => updateCart(item, 1)} className="bg-stone-900 text-white px-3 py-1 rounded-full text-sm hover:bg-amber-700 transition">
                    ${item.price.toFixed(2)}
                  </button>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-2xl font-serif mb-6 flex items-center gap-2"><Package className="text-amber-700" /> Food</h2>
              {INITIAL_MENU.food.map(item => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-stone-200">
                  <p className="font-medium">{item.name}</p>
                  <button onClick={() => updateCart(item, 1)} className="bg-stone-900 text-white px-3 py-1 rounded-full text-sm hover:bg-amber-700 transition">
                    ${item.price.toFixed(2)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {activeTab === 'cart' && (
        <div className="max-w-2xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-serif mb-8">Your Order</h2>
          {showOrderSuccess && (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 flex items-center gap-2">
              <CheckCircle /> Order placed successfully!
            </div>
          )}
          {cart.length === 0 ? <p>Your cart is empty.</p> : (
            <form onSubmit={handleCheckout} className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded border">
                  <span>{item.name} x {item.qty}</span>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => updateCart(item, -1)}><Minus size={18} /></button>
                    <button type="button" onClick={() => updateCart(item, 1)}><Plus size={18} /></button>
                  </div>
                </div>
              ))}
              <button type="submit" className="w-full bg-amber-700 text-white py-3 rounded-lg font-bold hover:bg-amber-800">
                Checkout (${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)})
              </button>
            </form>
          )}
        </div>
      )}

      {activeTab === 'loyalty' && (
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <Star size={48} className="mx-auto text-amber-600 mb-4" />
          <h2 className="text-3xl font-serif mb-4">Loyalty Programme</h2>
          <p className="text-xl mb-8">You have {loyaltyPoints} points</p>
          <button onClick={addToLoyalty} className="bg-stone-900 text-white px-8 py-3 rounded-full hover:bg-amber-700">
            Earn 10 Points
          </button>
        </div>
      )}

      <footer className="bg-stone-900 text-stone-400 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4">Heirloom Brew</h4>
            <p className="text-sm">Sourcing the finest beans since 2015.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Visit Us</h4>
            <p className="text-sm flex items-center gap-2"><MapPin size={14} /> 123 Coffee Lane, Seattle</p>
            <p className="text-sm flex items-center gap-2 mt-2"><Clock size={14} /> Daily: 7am - 6pm</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <form onSubmit={(e) => { e.preventDefault(); setEmail(''); alert('Subscribed!'); }} className="flex gap-2">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address" 
                className="bg-stone-800 px-3 py-2 rounded text-sm w-full"
                required
              />
              <button type="submit" className="bg-amber-700 text-white px-4 py-2 rounded">Join</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}