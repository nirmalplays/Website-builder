import React, { useState, useEffect } from 'react';
import { 
  Search, Menu, Calendar, Clock, TrendingUp, Bell, 
  ChevronRight, ArrowRight, Mail, User, Shield, Zap
} from 'lucide-react';

const INITIAL_STORIES = [
  { id: 1, title: "Global Markets Rally as Inflation Data Cools", category: "Business", author: "Sarah Jenkins", date: "2 hrs ago", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800" },
  { id: 2, title: "The Next Frontier: AI Integration in Daily Life", category: "Technology", author: "Marcus Thorne", date: "4 hrs ago", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800" },
  { id: 3, title: "Modern Minimalism: A Return to Simplicity", category: "Culture", author: "Elena Rossi", date: "6 hrs ago", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800" },
  { id: 4, title: "Renewable Energy Hits Record Milestone", category: "Business", author: "David Chen", date: "8 hrs ago", image: "https://images.unsplash.com/photo-1497435334941-8c8996b38965?w=800" },
  { id: 5, title: "New Smartphone Features Redefine Privacy", category: "Technology", author: "Sarah Jenkins", date: "10 hrs ago", image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bb5?w=800" },
  { id: 6, title: "The Resurgence of Analog Photography", category: "Culture", author: "Elena Rossi", date: "12 hrs ago", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800" }
];

export default function App() {
  const [news, setNews] = useState(INITIAL_STORIES);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-xs py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Calendar size={12} /> {currentTime}</span>
        </div>
        <div className="hidden md:block font-bold truncate max-w-md">
          BREAKING: Global summit concludes with historic climate agreement.
        </div>
        <div className="flex gap-3">
          <Bell size={12} />
          <User size={12} />
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter italic">THE DAILY CHRONICLE</h1>
          <div className="hidden md:flex gap-6 font-semibold text-sm">
            {['Business', 'Tech', 'Culture', 'Opinion'].map(cat => <a key={cat} href="#" className="hover:text-blue-600 transition-colors">{cat}</a>)}
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full"><Search size={20} /></button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Lead Story */}
        <section className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-8 cursor-pointer group">
            <div className="overflow-hidden rounded-lg mb-4">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200" alt="Lead" className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Featured</span>
            <h2 className="text-4xl font-bold mt-2 leading-tight">The Future of Global Connectivity: How Satellites are Bridging the Digital Divide</h2>
            <p className="text-gray-600 mt-4 text-lg">A deep dive into the infrastructure projects currently reshaping the way humanity interacts, learns, and works across the globe.</p>
          </div>
          
          <aside className="md:col-span-4 border-l border-gray-200 pl-8">
            <h3 className="font-bold mb-6 flex items-center gap-2"><TrendingUp size={18} /> Most Read</h3>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <span className="text-blue-600 font-bold text-xs">0{i}</span>
                  <p className="font-semibold group-hover:text-blue-600 transition-colors leading-snug mt-1">Understanding the new geopolitical landscape of the modern era.</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {news.map(story => (
            <div key={story.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <img src={story.image} alt={story.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{story.category}</span>
                <h4 className="font-bold text-lg mt-1 mb-2 leading-snug">{story.title}</h4>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{story.author}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {story.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <section className="bg-gray-900 rounded-2xl p-8 md:p-16 text-white text-center mb-16">
          <Mail className="mx-auto mb-4 text-blue-400" size={40} />
          <h2 className="text-3xl font-bold mb-4">Stay informed, daily.</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Join 50,000+ subscribers and get the most important headlines delivered to your inbox every morning.</p>
          {subscribed ? (
            <div className="bg-blue-600 py-3 px-6 rounded-full inline-block font-bold">Thank you for subscribing!</div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-full font-bold transition-colors">
                {loading ? '...' : 'Join'}
              </button>
            </form>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h2 className="font-black italic mb-4">THE DAILY CHRONICLE</h2>
            <p className="text-sm text-gray-500">Delivering truth in an era of uncertainty since 1984.</p>
          </div>
          {['Company', 'Support', 'Legal'].map(section => (
            <div key={section}>
              <h4 className="font-bold mb-4">{section}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {['About', 'Careers', 'Contact', 'Privacy'].map(link => <li key={link}><a href="#" className="hover:underline">{link}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
          © 2024 The Daily Chronicle. All rights reserved.
        </div>
      </footer>
    </div>
  );
}