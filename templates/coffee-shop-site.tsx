import React, { useState, useEffect } from 'react';
import { 
  Coffee, 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Star, 
  Heart, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle,
  Zap,
  Shield,
  ArrowRight
} from 'lucide-react';

const INITIAL_MENU = {
  drinks: [
    { id: 1, name: 'Signature Espresso', price: 3.50, category: 'Coffee' },
    { id: 2, name: 'Oat Milk Latte', price: 5.25, category: 'Coffee' },
    { id: 3, name: 'Cold Brew Reserve', price: 4.75, category: 'Cold' },
    { id: 4, name: 'Matcha Green Tea', price: 5.50, category: 'Tea' },
  ],
  food: [
    { id: 101, name: 'Almond Croissant', price: 4.25, category: 'Pastry' },
    { id: 102, name: 'Avocado Sourdough', price: 8.50, category: 'Breakfast' },
    { id: 103, name: 'Blueberry Muffin', price: 3.75, category: 'Pastry' },
  ]
};

export default function App() {
  const [cart, setCart] = useState<{id: number, name: string, price: number}[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [activeTab, setActiveTab] = useState<'drinks' | 'food'>('drinks');
  const [successMsg, setSuccessMsg] = useState('');

  const addToCart = (item: any) => {
    setCart([...cart, item]);
    setLoyaltyPoints(p => p + 10);
  };

  const handleLoyaltyClaim = () => {
    if (loyaltyPoints >= 100) {
      setLoyaltyPoints(p => p - 100);
      setSuccessMsg('Free drink voucher applied!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 bg-stone-50/90 backdrop-blur-md z-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-orange-800 font-bold text-xl">
            <Coffee /> Golden Bean Roastery
          </div>
          <button className="flex items-center gap-2 bg-orange-700 text-white px-4 py-2 rounded-full hover:bg-orange-800 transition">
            <ShoppingBag size={18} /> Cart ({cart.length})
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-20 px-4 text-center bg-stone-900 text-stone-100">
        <h1 className="text-5xl md:text-7xl font-serif mb-6">Crafted for the Curious</h1>
        <p className="text-xl text-stone-400 max-w-2xl mx-auto mb-10">Artisan coffee roasted daily, sourced with integrity, served with soul in the heart of the city.</p>
        <button className="bg-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 transition">View Full Menu</button>
      </header>

      {/* Menu Section */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('drinks')}
            className={`pb-2 border-b-2 ${activeTab === 'drinks' ? 'border-orange-700 text-orange-700' : 'border-transparent'}`}
          >Drinks</button>
          <button 
            onClick={() => setActiveTab('food')}
            className={`pb-2 border-b-2 ${activeTab === 'food' ? 'border-orange-700 text-orange-700' : 'border-transparent'}`}
          >Food</button>
        </div>
        
        <div className="grid gap-4">
          {(activeTab === 'drinks' ? INITIAL_MENU.drinks : INITIAL_MENU.food).map(item => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-stone-100">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <span className="text-sm text-stone-500">{item.category}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">${item.price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart(item)}
                  className="p-2 hover:bg-orange-50 rounded-full text-orange-700 transition"
                >
                  <Zap size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story & Sourcing */}
      <section className="py-16 bg-stone-100">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-serif mb-4 flex items-center gap-2"><Shield className="text-orange-700" /> Ethical Sourcing</h2>
            <p className="text-stone-600 leading-relaxed">We work directly with farmers in Ethiopia, Colombia, and Sumatra. By cutting out the middleman, we ensure our partners receive 30% above fair trade premiums.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-serif mb-4 flex items-center gap-2"><Star className="text-orange-700" /> Our Roastery</h2>
            <p className="text-stone-600 leading-relaxed">Everything happens on-site in our vintage Probat roaster. We small-batch roast every Monday and Thursday to ensure peak freshness for your morning cup.</p>
          </div>
        </div>
      </section>

      {/* Loyalty & Locations */}
      <section className="py-16 max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        <div className="bg-orange-900 text-white p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Loyalty Rewards</h2>
          <div className="text-4xl font-mono mb-2">{loyaltyPoints} pts</div>
          <p className="text-orange-200 mb-6">Earn 10 points per order. 100 points = Free Drink.</p>
          {successMsg && <p className="text-green-400 mb-2 flex items-center gap-1 text-sm font-bold"><CheckCircle size={16}/> {successMsg}</p>}
          <button 
            disabled={loyaltyPoints < 100}
            onClick={handleLoyaltyClaim}
            className="w-full bg-white text-orange-900 py-2 rounded-lg font-bold disabled:opacity-50 transition"
          >
            {loyaltyPoints >= 100 ? 'Claim Reward' : 'Keep Earning'}
          </button>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-stone-200">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><MapPin /> Visit Us</h2>
          <div className="flex gap-4 mb-4">
            <Clock className="text-stone-400 mt-1" />
            <div>
              <p className="font-bold">Downtown Roastery</p>
              <p className="text-sm text-stone-600">Mon-Fri: 7am - 6pm</p>
              <p className="text-sm text-stone-600">Sat-Sun: 8am - 4pm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-stone-500 text-sm border-t border-stone-200">
        <p>&copy; 2024 Golden Bean Roastery. All rights reserved.</p>
        <p className="mt-2">123 Artisan Way, Coffee District, CA 90210</p>
      </footer>
    </div>
  );
}