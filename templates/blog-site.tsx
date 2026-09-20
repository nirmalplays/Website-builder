import React, { useState } from 'react';
import { 
  Search, Menu, User, TrendingUp, Clock, ChevronRight, 
  Mail, ArrowRight, Zap, Shield, Star, Calendar 
} from 'lucide-react';

const articles = [
  { id: 1, title: "The Future of Sustainable Architecture", category: "Design", author: "Elena Vance", time: "6 min read", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" },
  { id: 2, title: "Mastering TypeScript Generics", category: "Tech", author: "Marcus Chen", time: "12 min read", image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea" },
  { id: 3, title: "Morning Routines of CEOs", category: "Business", author: "Sarah Jenkins", time: "8 min read", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf" },
  { id: 4, title: "Hidden Gems in the Swiss Alps", category: "Travel", author: "David Miller", time: "5 min read", image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb" },
  { id: 5, title: "The Rise of Decentralized Finance", category: "Finance", author: "Aisha Khan", time: "15 min read", image: "https://images.unsplash.com/photo-1605792657660-596af9009e82" },
  { id: 6, title: "Modernist Interior Design Trends", category: "Design", author: "Elena Vance", time: "7 min read", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e" },
  { id: 7, title: "Optimizing Database Performance", category: "Tech", author: "Marcus Chen", time: "10 min read", image: "https://images.unsplash.com/photo-1558494949-ef010bbbb317" },
  { id: 8, title: "How to Build a Resilient Brand", category: "Business", author: "Sarah Jenkins", time: "9 min read", image: "https://images.unsplash.com/photo-1552664730-d307ca884978" },
  { id: 9, title: "Solo Hiking Tips for Beginners", category: "Travel", author: "David Miller", time: "4 min read", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1" },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Design", "Tech", "Business", "Travel", "Finance"];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-bold tracking-tight text-indigo-600">INSIGHT.</div>
            <div className="hidden md:flex space-x-8 font-medium">
              {categories.map(cat => (
                <button key={cat} className="hover:text-indigo-600 transition-colors">{cat}</button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 cursor-pointer hover:text-indigo-600" />
              <User className="w-5 h-5 cursor-pointer hover:text-indigo-600" />
              <Menu className="md:hidden w-6 h-6" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <div className="relative rounded-3xl overflow-hidden h-[500px]">
            <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174" alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10 text-white">
              <span className="bg-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider self-start mb-4">Featured</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">The Next Decade of Digital Transformation</h1>
              <p className="text-lg text-gray-200 max-w-2xl mb-6">Explore how AI, cloud computing, and sustainable practices are reshaping the global corporate landscape in 2024 and beyond.</p>
              <button className="flex items-center text-indigo-300 hover:text-white font-semibold transition-colors">
                Read Full Story <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="text-indigo-600 text-xs font-bold uppercase tracking-wider">{article.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-4 leading-snug">{article.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center"><User className="w-4 h-4 mr-2" /> {article.author}</div>
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {article.time}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-10">
            <div className="bg-white p-8 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold mb-6 flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-indigo-600" /> Popular Posts</h3>
              {articles.slice(0, 3).map((post) => (
                <div key={post.id} className="group flex items-start space-x-4 mb-6">
                  <img src={post.image} className="w-16 h-16 rounded-lg object-cover" alt="" />
                  <div>
                    <h4 className="font-semibold text-sm group-hover:text-indigo-600 cursor-pointer">{post.title}</h4>
                    <span className="text-xs text-gray-400">Oct 24, 2024</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-indigo-900 p-8 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-2">Join our Newsletter</h3>
              <p className="text-indigo-200 text-sm mb-6">Get the latest insights delivered straight to your inbox.</p>
              <div className="space-y-3">
                <input type="email" placeholder="email@address.com" className="w-full px-4 py-3 rounded-lg bg-indigo-800 border-none text-white placeholder-indigo-400 focus:ring-2 focus:ring-white outline-none" />
                <button className="w-full bg-white text-indigo-900 font-bold py-3 rounded-lg hover:bg-indigo-50 transition-colors">Subscribe</button>
              </div>
            </div>
          </aside>
        </div>

        <div className="flex justify-center mt-16 space-x-2">
          {[1, 2, 3].map(n => (
            <button key={n} className={`w-10 h-10 rounded-lg flex items-center justify-center ${n === 1 ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}>
              {n}
            </button>
          ))}
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 text-sm">
          <div>
            <h2 className="text-white font-bold text-xl mb-4">INSIGHT.</h2>
            <p>Delivering high-quality perspectives on design, technology, and business since 2018.</p>
          </div>
          <div><h4 className="text-white font-bold mb-4">Explore</h4><ul className="space-y-2"><li>Design</li><li>Technology</li><li>Business</li></ul></div>
          <div><h4 className="text-white font-bold mb-4">Support</h4><ul className="space-y-2"><li>Contact</li><li>Privacy Policy</li><li>Terms of Service</li></ul></div>
          <div><h4 className="text-white font-bold mb-4">Social</h4><ul className="space-y-2"><li>Twitter</li><li>LinkedIn</li><li>Instagram</li></ul></div>
        </div>
      </footer>
    </div>
  );
}