import React, { useState } from 'react';
import { 
  Menu, ShoppingCart, Search, User, Star, ArrowRight, 
  Sparkles, Shield, Clock, Calendar, ChevronRight, CheckCircle 
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const collections = [
    { name: "Celestial Rings", price: "$1,250", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80" },
    { name: "Eternal Pendants", price: "$890", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80" },
    { name: "Minimalist Hoops", price: "$420", img: "https://images.unsplash.com/photo-1630019852942-f89202989a82?auto=format&fit=crop&w=600&q=80" },
    { name: "Heritage Bracelets", price: "$2,100", img: "https://images.unsplash.com/photo-1573408301185-985f40391629?auto=format&fit=crop&w=600&q=80" }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-serif font-bold tracking-tighter text-amber-900">AURELIA</div>
            <div className="hidden md:flex space-x-8 font-medium text-sm uppercase tracking-widest">
              <a href="#collections" className="hover:text-amber-700">Collections</a>
              <a href="#custom" className="hover:text-amber-700">Custom Design</a>
              <a href="#care" className="hover:text-amber-700">Craftsmanship</a>
            </div>
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 cursor-pointer" />
              <User className="w-5 h-5 cursor-pointer" />
              <ShoppingCart className="w-5 h-5 cursor-pointer" />
              <Menu className="w-6 h-6 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=80" alt="Jewellery" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-stone-900/40" />
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Timeless Elegance</h1>
          <p className="text-lg md:text-xl mb-8 font-light max-w-2xl mx-auto">Discover artisan-crafted pieces designed to celebrate your most precious moments.</p>
          <button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-full transition-all">Explore Collection</button>
        </div>
      </header>

      {/* Collections */}
      <section id="collections" className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif text-center mb-12">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="overflow-hidden rounded-lg mb-4">
                <img src={item.img} alt={item.name} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="font-medium text-lg">{item.name}</h3>
              <p className="text-amber-800 font-bold">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Design */}
      <section id="custom" className="bg-stone-900 text-stone-100 py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-serif mb-6">Bespoke Creations</h2>
            <p className="text-stone-300 mb-6 leading-relaxed">Work directly with our master goldsmiths to transform your vision into a unique, wearable masterpiece. From initial sketches to the final polish, we ensure perfection.</p>
            <button className="flex items-center text-amber-500 font-semibold border-b border-amber-500 pb-1">
              Start Your Design <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full h-80 bg-stone-700 rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1577903661182-3d7c1775e54d?auto=format&fit=crop&w=800&q=80" alt="Custom design" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Care & Craft */}
      <section id="care" className="py-20 px-4 max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
        {[
          { icon: Sparkles, title: "Ethical Sourcing", desc: "Conflict-free diamonds and recycled gold." },
          { icon: Shield, title: "Lifetime Warranty", desc: "We stand by our craft forever." },
          { icon: Clock, title: "Artisan Care", desc: "Professional cleaning and inspection services." }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <item.icon className="w-10 h-10 text-amber-800 mb-4" />
            <h4 className="text-xl font-bold mb-2">{item.title}</h4>
            <p className="text-stone-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Appointment */}
      <section className="py-20 bg-stone-100 px-4">
        <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-stone-200">
          <h3 className="text-2xl font-serif text-center mb-8">Book a Private Consultation</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-4 border border-stone-300 rounded-lg" />
            <input type="email" placeholder="Email Address" className="w-full p-4 border border-stone-300 rounded-lg" />
            <button className="w-full bg-stone-900 text-white py-4 rounded-lg font-bold hover:bg-stone-800">Request Appointment</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-200 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h5 className="font-bold mb-4">AURELIA</h5>
            <p className="text-stone-600">Fine Jewellery since 1984.</p>
          </div>
          <div>
            <h5 className="font-bold mb-4">Support</h5>
            <ul className="space-y-2 text-stone-600">
              <li>Shipping & Returns</li>
              <li>Size Guide</li>
              <li>Repair Service</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Certifications</h5>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-stone-500" />
              <Shield className="w-6 h-6 text-stone-500" />
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-4">Newsletter</h5>
            <p className="text-stone-600 mb-4">Join for updates and early access.</p>
            <div className="flex bg-white rounded-lg p-1">
              <input type="email" placeholder="Email" className="flex-1 p-2 outline-none" />
              <button className="bg-amber-800 text-white px-4 rounded-md">Join</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}