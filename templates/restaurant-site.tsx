import React, { useState } from 'react';
import { 
  Menu as MenuIcon, 
  Calendar, 
  Clock, 
  Users, 
  ChevronRight, 
  Star, 
  MapPin, 
  Phone, 
  Mail,
  Zap
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = {
    starters: [
      { name: "Burrata & Heirloom Tomato", price: "$18", desc: "Creamy burrata, balsamic glaze, basil oil, toasted sourdough." },
      { name: "Wagyu Beef Carpaccio", price: "$22", desc: "Thinly sliced wagyu, truffle emulsion, caper berries, parmesan." },
    ],
    mains: [
      { name: "Pan-Seared Scallops", price: "$38", desc: "Jumbo scallops, cauliflower purée, pancetta crisp, lemon beurre blanc." },
      { name: "Herb-Crusted Lamb Rack", price: "$45", desc: "New Zealand lamb, fondant potatoes, roasted root vegetables, mint jus." },
    ],
    desserts: [
      { name: "Dark Chocolate Fondant", price: "$14", desc: "Valrhona chocolate, salted caramel center, Madagascar vanilla bean gelato." },
      { name: "Lemon Yuzu Tart", price: "$12", desc: "Zesty yuzu curd, Italian meringue, buttery shortbread crust." },
    ]
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tighter text-amber-700">LUMIÈRE</div>
        <div className="hidden md:flex gap-8 font-medium text-sm uppercase tracking-widest">
          <a href="#about" className="hover:text-amber-700 transition">About</a>
          <a href="#menu" className="hover:text-amber-700 transition">Menu</a>
          <a href="#reservation" className="hover:text-amber-700 transition">Reservations</a>
        </div>
        <button className="bg-amber-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-800 transition">Reserve</button>
      </nav>

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center text-white text-center">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2400" 
          alt="Elegant restaurant interior" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Culinary Artistry</h1>
          <p className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto">Experience a symphony of seasonal flavors curated by world-renowned chefs in the heart of the city.</p>
          <a href="#reservation" className="inline-block border-2 border-white px-8 py-3 hover:bg-white hover:text-stone-900 transition font-bold">Book Your Table</a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-serif mb-6">Our Philosophy</h2>
          <p className="text-stone-600 leading-relaxed mb-6">Founded in 2012, Lumière blends traditional French techniques with contemporary local ingredients. We believe that every plate tells a story, and every guest is part of our family.</p>
          <div className="flex items-center gap-2 text-amber-700 font-semibold">
            <Star className="fill-amber-700" size={20} /> 3 Michelin Stars
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" alt="Chef plating food" className="rounded-2xl shadow-xl" />
      </section>

      {/* Menu */}
      <section id="menu" className="py-20 bg-stone-100 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-center mb-16">The Tasting Menu</h2>
          {Object.entries(menuItems).map(([category, items]) => (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-bold uppercase tracking-widest text-amber-700 mb-6 border-b pb-2">{category}</h3>
              {items.map((item, i) => (
                <div key={i} className="flex justify-between items-baseline mb-6 border-b border-stone-200 pb-4">
                  <div>
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="text-stone-500 text-sm italic">{item.desc}</p>
                  </div>
                  <span className="font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Reservation Form */}
      <section id="reservation" className="py-20 px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-stone-100">
          <h2 className="text-3xl font-serif mb-8">Secure Your Table</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2"><Calendar size={16}/> Date</label>
                <input type="date" className="w-full p-3 border rounded-lg bg-stone-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2"><Clock size={16}/> Time</label>
                <select className="w-full p-3 border rounded-lg bg-stone-50">
                  <option>18:00</option><option>19:00</option><option>20:00</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2"><Users size={16}/> Party Size</label>
              <input type="number" min="1" max="10" placeholder="2 People" className="w-full p-3 border rounded-lg bg-stone-50" />
            </div>
            <button className="w-full bg-stone-900 text-white py-4 rounded-lg font-bold hover:bg-amber-700 transition">Confirm Booking</button>
          </form>
        </div>
      </section>

      {/* Location & Footer */}
      <footer className="bg-stone-900 text-stone-300 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p className="flex items-center justify-center md:justify-start gap-2 mb-2"><MapPin size={16}/> 124 Culinary Way, Downtown</p>
            <p className="flex items-center justify-center md:justify-start gap-2 mb-2"><Phone size={16}/> (555) 123-4567</p>
            <p className="flex items-center justify-center md:justify-start gap-2"><Mail size={16}/> hello@lumiere.com</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Opening Hours</h4>
            <p>Tue - Thu: 5pm - 10pm</p>
            <p>Fri - Sat: 5pm - 11pm</p>
            <p>Sun: 10am - 3pm (Brunch)</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center"><Zap size={18}/></div>
              <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center"><Star size={18}/></div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-stone-800 text-sm">
          © 2024 Lumière Fine Dining. All rights reserved.
        </div>
      </footer>
    </div>
  );
}