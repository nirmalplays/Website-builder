import React, { useState } from 'react';
import { Camera, Mail, Calendar, ChevronRight, Star, Zap, Shield, ArrowUpRight } from 'lucide-react';

export default function App() {
  const galleryImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e", title: "Urban Portraits" },
    { id: 2, src: "https://images.unsplash.com/photo-1554080353-a576cf803bda", title: "Golden Hour" },
    { id: 3, src: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07", title: "Street Life" },
    { id: 4, src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", title: "Candid Moments" },
    { id: 5, src: "https://images.unsplash.com/photo-1551632811-56eda731724d", title: "Studio Sessions" },
    { id: 6, src: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553", title: "Event Coverage" },
    { id: 7, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", title: "Natural Light" },
    { id: 8, src: "https://images.unsplash.com/photo-1519741497674-611481863552", title: "Editorial" },
    { id: 9, src: "https://images.unsplash.com/photo-1517841905240-472988babdf9", title: "Lifestyle" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tighter">ELARA VANCE</span>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#gallery" className="hover:text-amber-600 transition">Gallery</a>
            <a href="#services" className="hover:text-amber-600 transition">Services</a>
            <a href="#contact" className="hover:text-amber-600 transition">Enquire</a>
          </div>
        </div>
      </nav>

      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4" 
          alt="Hero background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl md:text-8xl font-serif mb-6">Capturing Essence.</h1>
          <p className="text-lg md:text-xl font-light opacity-90">Visual storytelling for brands and individuals.</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-24">
        <section id="gallery" className="mb-32">
          <h2 className="text-3xl font-bold mb-12">Recent Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((img) => (
              <div key={img.id} className="group relative aspect-[3/4] overflow-hidden bg-neutral-200">
                <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 text-white font-medium">
                  {img.title}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mb-32">
          <h2 className="text-3xl font-bold mb-12">Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Standard", price: "$450", desc: "Perfect for portraits and headshots.", icon: Camera },
              { title: "Commercial", price: "$1,200", desc: "Full day brand photography.", icon: Zap },
              { title: "Event", price: "$850", desc: "Up to 4 hours of coverage.", icon: Shield },
            ].map((pkg, i) => (
              <div key={i} className="p-8 border border-neutral-200 rounded-2xl hover:border-amber-600 transition group">
                <pkg.icon className="w-8 h-8 text-amber-600 mb-6" />
                <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-neutral-500 text-sm mb-6">{pkg.desc}</p>
                <div className="text-3xl font-bold mb-6">{pkg.price}</div>
                <button className="flex items-center gap-2 text-sm font-bold group-hover:text-amber-600">
                  Select Plan <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-32 bg-white p-12 md:p-20 rounded-3xl border border-neutral-100 shadow-sm">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Elara</h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Based in the Pacific Northwest, I specialize in finding the quiet beauty in chaotic environments. 
                With over 8 years of experience, my approach is collaborative, detail-oriented, and focused on 
                creating images that stand the test of time.
              </p>
              <div className="flex gap-4 text-sm">
                <span className="bg-neutral-100 px-4 py-2 rounded-full">Portrait Specialist</span>
                <span className="bg-neutral-100 px-4 py-2 rounded-full">Available Worldwide</span>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1554744512-78d783bb463c" 
              alt="Photographer" 
              className="rounded-2xl w-full h-[400px] object-cover"
            />
          </div>
        </section>

        <section className="mb-32">
          <h2 className="text-3xl font-bold mb-12">Client Notes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { text: "Elara captured the exact vibe we wanted for our brand launch. Truly professional.", name: "Sarah Jenkins", role: "Creative Director" },
              { text: "The photos from our wedding are absolutely timeless. We couldn't be happier.", name: "Mark & Elena", role: "Newlyweds" },
            ].map((test, i) => (
              <div key={i} className="p-8 border-l-4 border-amber-600 bg-white">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-lg italic mb-6">"{test.text}"</p>
                <div className="font-bold">{test.name}</div>
                <div className="text-sm text-neutral-500">{test.role}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Let's Create</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="Name" className="w-full p-4 bg-white border border-neutral-200 rounded-xl" />
              <input type="email" placeholder="Email" className="w-full p-4 bg-white border border-neutral-200 rounded-xl" />
            </div>
            <select className="w-full p-4 bg-white border border-neutral-200 rounded-xl">
              <option>Standard Session</option>
              <option>Commercial Project</option>
              <option>Event Coverage</option>
            </select>
            <div className="relative">
              <Calendar className="absolute left-4 top-4 text-neutral-400 w-5 h-5" />
              <input type="date" className="w-full pl-12 p-4 bg-white border border-neutral-200 rounded-xl" />
            </div>
            <textarea placeholder="Tell me about your vision..." className="w-full p-4 bg-white border border-neutral-200 rounded-xl h-32" />
            <button className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold hover:bg-amber-600 transition">
              Send Enquiry
            </button>
          </form>
        </section>
      </main>

      <footer className="border-t border-neutral-200 py-12 text-center text-neutral-500 text-sm">
        <p className="mb-4">© 2024 Elara Vance Photography. All Rights Reserved.</p>
        <div className="flex justify-center gap-6">
          <Mail className="w-5 h-5 cursor-pointer hover:text-amber-600" />
          <Camera className="w-5 h-5 cursor-pointer hover:text-amber-600" />
        </div>
      </footer>
    </div>
  );
}