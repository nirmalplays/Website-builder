import React, { useState } from 'react';
import { Coffee, MapPin, Clock, Star, ArrowRight, ChevronDown, Award, Zap, Shield } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Drinks');

  const drinks = [
    { name: 'Velvet Espresso', price: '$3.50', desc: 'Rich, full-bodied single origin roast.' },
    { name: 'Golden Oat Latte', price: '$5.75', desc: 'Creamy oat milk paired with nutty espresso.' },
    { name: 'Midnight Cold Brew', price: '$4.50', desc: 'Steeped for 24 hours for a smooth finish.' },
    { name: 'Honey Lavender Matcha', price: '$6.00', desc: 'Ceremonial grade matcha with floral notes.' },
  ];

  const food = [
    { name: 'Sourdough Avocado Toast', price: '$9.50', desc: 'Topped with radish, microgreens, and chili oil.' },
    { name: 'Almond Croissant', price: '$4.75', desc: 'Buttery, flaky pastry filled with house almond cream.' },
    { name: 'Fig & Goat Cheese Scone', price: '$4.25', desc: 'Sweet, savory, and perfectly crumbly.' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <nav className="sticky top-0 bg-stone-50/90 backdrop-blur-md z-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-orange-900">
            <Coffee className="w-6 h-6" />
            <span>HEARTH & BEAN</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
            {['Menu', 'Story', 'Locations', 'Loyalty'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-orange-800 transition-colors">{item}</a>
            ))}
          </div>
          <button className="bg-orange-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-800 transition-all">
            Order Pickup
          </button>
        </div>
      </nav>

      <header className="max-w-6xl mx-auto px-6 py-20 md:py-32 text-center">
        <span className="text-orange-700 font-semibold uppercase tracking-widest text-sm">Est. 2018</span>
        <h1 className="text-5xl md:text-7xl font-serif mt-4 mb-6 text-stone-950">Crafted for the <br/>quiet moments.</h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-10">Small-batch roasting, ethically sourced beans, and a warm hearth waiting for you in the heart of the city.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-orange-900 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-orange-800">
            View Menu <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      <section id="menu" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-4 mb-12 border-b border-stone-200">
            {['Drinks', 'Food'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-medium ${activeTab === tab ? 'text-orange-900 border-b-2 border-orange-900' : 'text-stone-400'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {(activeTab === 'Drinks' ? drinks : food).map((item) => (
              <div key={item.name} className="flex justify-between items-start p-6 border border-stone-100 rounded-2xl hover:border-orange-200 transition-colors">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-stone-500 text-sm mt-1">{item.desc}</p>
                </div>
                <span className="font-mono font-bold text-orange-800">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="py-20 bg-stone-900 text-stone-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-serif mb-6">From farm to hearth.</h2>
            <p className="text-stone-400 leading-relaxed mb-6">We believe coffee is a bridge between the farmer's hard work and your morning ritual. Every batch is roasted in our downtown studio, highlighting the unique terroir of our partner farms in Ethiopia and Colombia.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><Award className="text-orange-500" /> <span>Direct trade partnerships</span></div>
              <div className="flex items-center gap-3"><Zap className="text-orange-500" /> <span>Precision roasted daily</span></div>
              <div className="flex items-center gap-3"><Shield className="text-orange-500" /> <span>Carbon neutral shipping</span></div>
            </div>
          </div>
          <div className="aspect-square bg-stone-800 rounded-3xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800" alt="Coffee roasting process" className="w-full h-full object-cover opacity-80" />
          </div>
        </div>
      </section>

      <section id="locations" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-serif mb-12">Visit us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Downtown Studio', hours: '7am - 6pm' },
              { name: 'North District', hours: '8am - 4pm' },
              { name: 'Riverside Corner', hours: '7am - 8pm' }
            ].map((loc) => (
              <div key={loc.name} className="bg-white p-8 rounded-3xl border border-stone-200">
                <MapPin className="text-orange-800 mb-4" />
                <h3 className="font-bold text-xl mb-2">{loc.name}</h3>
                <div className="flex items-center gap-2 text-stone-500 text-sm">
                  <Clock className="w-4 h-4" /> <span>Daily: {loc.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="loyalty" className="py-20 bg-orange-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Star className="w-12 h-12 text-orange-600 mx-auto mb-6" />
          <h2 className="text-3xl font-serif mb-4">Join the Hearth Club</h2>
          <p className="text-stone-600 mb-8">Earn points on every pour-over and receive exclusive early access to our limited-edition micro-lot releases.</p>
          <button className="bg-orange-950 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-900 transition-colors">
            Sign up for rewards
          </button>
        </div>
      </section>

      <footer className="bg-stone-100 py-12 border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-6 text-center text-stone-500 text-sm">
          <p className="mb-4 font-bold text-stone-800">HEARTH & BEAN COFFEE</p>
          <p>© 2024 Hearth & Bean Inc. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
}