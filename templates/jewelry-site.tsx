import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Star, Shield, Clock, Calendar, Check, X, 
  ChevronRight, ArrowRight, Menu, Search, Package, Sparkles, 
  Zap, Heart, Trash2 
} from 'lucide-react';

type Product = { id: number; name: string; price: number; category: string; image: string; liked: boolean };

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Celestial Diamond Studs", price: 1250, category: "Earrings", image: "https://images.unsplash.com/photo-1630019852942-f89202989a82?auto=format&fit=crop&q=80&w=600", liked: false },
  { id: 2, name: "Midnight Sapphire Ring", price: 2800, category: "Rings", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600", liked: false },
  { id: 3, name: "Golden Aura Necklace", price: 950, category: "Necklaces", image: "https://images.unsplash.com/photo-1599643478518-a854e5da4700?auto=format&fit=crop&q=80&w=600", liked: false },
  { id: 4, name: "Vintage Pearl Bracelet", price: 1400, category: "Bracelets", image: "https://images.unsplash.com/photo-1611591437281-460bfbe12202?auto=format&fit=crop&q=80&w=600", liked: false }
];

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try { return JSON.parse(localStorage.getItem('jewel_products') || JSON.stringify(INITIAL_PRODUCTS)); }
    catch { return INITIAL_PRODUCTS; }
  });
  const [cart, setCart] = useState<Product[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [booking, setBooking] = useState({ name: '', email: '', date: '', status: 'idle' });

  useEffect(() => { localStorage.setItem('jewel_products', JSON.stringify(products)); }, [products]);

  const toggleLike = (id: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked } : p));
  };

  const addToCart = (product: Product) => setCart([...cart, product]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooking(prev => ({ ...prev, status: 'loading' }));
    setTimeout(() => setBooking({ name: '', email: '', date: '', status: 'success' }), 1200);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-serif font-bold tracking-tight text-amber-900">AURELIA</div>
        <div className="hidden md:flex gap-8 font-medium text-sm tracking-widest uppercase">
          {['Collections', 'Custom', 'Craft', 'Care'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-amber-700 transition">{link}</a>
          ))}
        </div>
        <div className="flex gap-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden"><Menu /></button>
          <div className="relative">
            <ShoppingBag className="cursor-pointer" />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[600px] flex items-center justify-center bg-stone-900 text-white">
        <img src="https://images.unsplash.com/photo-1573408301185-98319f3e28c7?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Hero" />
        <div className="relative text-center space-y-6 px-4">
          <h1 className="text-5xl md:text-7xl font-serif">Timeless Elegance</h1>
          <p className="max-w-lg mx-auto text-lg text-stone-300">Handcrafted jewelry defined by precision, passion, and the purity of precious stones.</p>
          <button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 uppercase tracking-widest text-sm transition">Explore Collection</button>
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif text-center mb-16">Featured Pieces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(p => (
            <div key={p.id} className="group bg-white p-4 border border-stone-200 hover:shadow-lg transition">
              <div className="relative overflow-hidden mb-4">
                <img src={p.image} alt={p.name} className="w-full h-80 object-cover group-hover:scale-105 transition duration-500" />
                <button onClick={() => toggleLike(p.id)} className="absolute top-2 right-2 p-2 bg-white/50 rounded-full">
                  <Heart className={p.liked ? "fill-red-500 text-red-500" : ""} size={20} />
                </button>
              </div>
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-sm text-stone-500 mb-4">{p.category}</p>
              <div className="flex justify-between items-center">
                <span className="font-serif text-lg">${p.price}</span>
                <button onClick={() => addToCart(p)} className="text-xs bg-stone-900 text-white px-4 py-2 hover:bg-amber-700 transition">ADD TO BAG</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking */}
      <section id="custom" className="bg-stone-100 py-20 px-6">
        <div className="max-w-3xl mx-auto bg-white p-12 shadow-sm rounded-sm">
          <h2 className="text-3xl font-serif mb-6">Design Your Legacy</h2>
          {booking.status === 'success' ? (
            <div className="text-center py-12 text-green-700 space-y-4">
              <CheckCircle size={48} className="mx-auto" />
              <p className="text-xl">Appointment requested successfully. We will reach out shortly.</p>
              <button onClick={() => setBooking({ name: '', email: '', date: '', status: 'idle' })} className="underline">Make another booking</button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input required value={booking.name} onChange={e => setBooking({...booking, name: e.target.value})} placeholder="Full Name" className="w-full p-3 border border-stone-300" />
                <input required type="email" value={booking.email} onChange={e => setBooking({...booking, email: e.target.value})} placeholder="Email Address" className="w-full p-3 border border-stone-300" />
              </div>
              <input required type="date" value={booking.date} onChange={e => setBooking({...booking, date: e.target.value})} className="w-full p-3 border border-stone-300" />
              <button disabled={booking.status === 'loading'} className="w-full bg-amber-900 text-white py-4 hover:bg-amber-800 disabled:opacity-50">
                {booking.status === 'loading' ? 'Processing...' : 'Request Consultation'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-sm">
          <div>
            <h4 className="text-white font-bold mb-4 uppercase">Quality Assurance</h4>
            <div className="flex gap-4">
              <Shield className="text-amber-600" />
              <p>Certified Conflict-Free Diamonds <br/> Lifetime Warranty Included</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase">Care Instructions</h4>
            <p>Store in a cool, dry place. Clean gently with a soft cloth and avoid contact with harsh chemicals or perfumes.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase">Connect</h4>
            <p>123 Jewelers Row, NY<br/>contact@aurelia.com<br/>+1 (555) 900-1234</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CheckCircle(props: any) {
  return <CheckCircleIcon {...props} />;
}

function CheckCircleIcon(props: any) {
  return <CheckCircle {...props} />;
}