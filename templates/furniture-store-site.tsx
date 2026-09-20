import React, { useState } from 'react';
import { ShoppingCart, Menu, Star, Truck, Shield, Zap, ArrowRight, ChevronRight, User, Search } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const products = [
    { id: 1, name: "Nordic Oak Dining Table", price: 899, material: "Solid White Oak", img: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Velvet Lounge Armchair", price: 450, material: "Performance Velvet", img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Minimalist Bed Frame", price: 1200, material: "Walnut Veneer", img: "https://images.unsplash.com/photo-1505693416388-15ce0d65ead5?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "Modular Sectional Sofa", price: 2100, material: "Linen Blend", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-orange-600" />
              <span className="text-xl font-bold tracking-tight">MODERNHOME</span>
            </div>
            <div className="hidden md:flex gap-8 font-medium text-stone-600">
              <a href="#" className="hover:text-orange-600">Living</a>
              <a href="#" className="hover:text-orange-600">Bedroom</a>
              <a href="#" className="hover:text-orange-600">Dining</a>
              <a href="#" className="hover:text-orange-600">Services</a>
            </div>
            <div className="flex items-center gap-4">
              <Search className="h-5 w-5 cursor-pointer" />
              <User className="h-5 w-5 cursor-pointer" />
              <div className="relative cursor-pointer">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
              </div>
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-16 lg:py-24 bg-stone-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1600" alt="Interior" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-orange-600 text-white inline-block px-4 py-1 rounded-full text-sm font-semibold mb-6">SPRING SALE: UP TO 40% OFF</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-2xl leading-tight">Elevate your home, refine your space.</h1>
          <p className="text-xl text-stone-300 mb-8 max-w-lg">Curated designs that blend comfort with modern elegance. Quality craftsmanship built for life.</p>
          <button className="bg-white text-stone-900 px-8 py-4 rounded-lg font-semibold hover:bg-stone-200 transition">Shop Collection</button>
        </div>
      </header>

      {/* Shop by Room */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10">Shop by Room</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Living Room', 'Bedroom', 'Dining Room', 'Home Office'].map((room) => (
            <div key={room} className="group cursor-pointer">
              <div className="h-64 bg-stone-200 rounded-xl mb-4 overflow-hidden">
                <img src={`https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=400`} alt={room} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <h3 className="font-semibold text-lg flex items-center justify-between">
                {room} <ChevronRight className="h-4 w-4" />
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10">Featured Arrivals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <img src={p.img} alt={p.name} className="w-full h-60 object-cover rounded-lg mb-4" />
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-stone-500 text-sm mb-2">{p.material}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-xl">${p.price}</span>
                  <button className="bg-stone-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Services */}
      <section className="py-20 max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-6">Expert Design Services</h2>
          <p className="text-lg text-stone-600 mb-6">Not sure where to start? Our professional interior designers are here to help you bring your vision to life with personalized consultations and 3D space planning.</p>
          <button className="flex items-center gap-2 text-orange-600 font-semibold hover:underline">
            Book a Consultation <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 w-full h-96 bg-stone-200 rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000" alt="Design service" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Logistics & Warranty */}
      <section className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <Truck className="h-10 w-10 text-orange-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">White Glove Delivery</h3>
            <p className="text-stone-600">We deliver, unpack, and assemble your furniture in the room of your choice. Clean and stress-free.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <Shield className="h-10 w-10 text-orange-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">10-Year Warranty</h3>
            <p className="text-stone-600">Every piece is crafted to last. We stand by our quality with a comprehensive 10-year structural warranty.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <Zap className="h-10 w-10 text-orange-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Fast Shipping</h3>
            <p className="text-stone-600">In-stock items ship within 48 hours. Track your delivery directly from our warehouse to your front door.</p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Loved by Homeowners</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Jenkins", review: "The quality of the oak table is unmatched. Exceeded all my expectations!" },
            { name: "Marcus Thorne", review: "Seamless delivery process. The team was professional and incredibly fast." },
            { name: "Elena Rodriguez", review: "Finally found a sofa that is both stylish and comfortable. Perfect for our new home." }
          ].map((r, i) => (
            <div key={i} className="p-8 bg-white border border-stone-100 rounded-2xl">
              <div className="flex text-orange-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-stone-600 italic mb-6">"{r.review}"</p>
              <p className="font-bold">{r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 text-white mb-6">
              <Zap className="h-6 w-6 text-orange-600" />
              <span className="text-xl font-bold">MODERNHOME</span>
            </div>
            <p>Redefining living spaces with timeless design and uncompromising quality since 2012.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>Living Room</li>
              <li>Dining</li>
              <li>Bedroom</li>
              <li>Accessories</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>Track Order</li>
              <li>Shipping Info</li>
              <li>Warranty Policy</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Stay Connected</h4>
            <p className="mb-4">Subscribe for design tips and exclusive early access to seasonal sales.</p>
            <input type="email" placeholder="Your email" className="w-full bg-stone-800 p-3 rounded-lg border border-stone-700 focus:outline-none focus:border-orange-600" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-sm">
          &copy; 2024 ModernHome Interiors. All rights reserved.
        </div>
      </footer>
    </div>
  );
}