import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronRight, Clock, User, Star, Mail, ArrowRight, Filter } from 'lucide-react';

const INITIAL_POSTS = [
  { id: 1, title: 'The Future of Sustainable Urban Living', category: 'Environment', author: 'Elena Vance', readTime: '6 min', excerpt: 'How vertical forests and smart energy grids are transforming modern cityscapes into eco-havens.', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607' },
  { id: 2, title: 'Mastering React Server Components', category: 'Tech', author: 'Marcus Chen', readTime: '8 min', excerpt: 'Deep dive into the architecture changes that are making web applications faster than ever.', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee' },
  { id: 3, title: 'Minimalist Design Principles for 2024', category: 'Design', author: 'Sarah Jenson', readTime: '4 min', excerpt: 'Why less is still more, and how to apply intentional whitespace in your interfaces.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5' },
  { id: 4, title: 'The Rise of AI in Personal Finance', category: 'Finance', author: 'David Okafor', readTime: '5 min', excerpt: 'Automating your savings and investments with personalized machine learning models.', image: 'https://images.unsplash.com/photo-1554224155-8d04cb27cd6c' },
  { id: 5, title: 'Hidden Gems of the Italian Coast', category: 'Travel', author: 'Sofia Rossi', readTime: '10 min', excerpt: 'Beyond the tourist traps, discover the quiet villages and secluded beaches of Puglia.', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9' },
  { id: 6, title: 'Effective Remote Team Management', category: 'Business', author: 'James Wilson', readTime: '7 min', excerpt: 'Tools and strategies to keep your distributed team aligned, motivated, and productive.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f' },
  { id: 7, title: 'The Science of High-Performance Sleep', category: 'Health', author: 'Dr. Amy Wu', readTime: '9 min', excerpt: 'Optimizing your circadian rhythm for better focus, recovery, and longevity.', image: 'https://images.unsplash.com/photo-1511295742367-68499c855c88' },
  { id: 8, title: 'Modern Brutalism in Architecture', category: 'Design', author: 'Liam Thorne', readTime: '6 min', excerpt: 'Understanding the resurgence of raw concrete and honest materials in luxury homes.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab' },
  { id: 9, title: 'Building Scalable Node.js APIs', category: 'Tech', author: 'Marcus Chen', readTime: '12 min', excerpt: 'Best practices for middleware, error handling, and security in production environments.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c' }
];

export default function App() {
  const [posts] = useState(INITIAL_POSTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const categories = ['All', 'Tech', 'Design', 'Finance', 'Travel', 'Business', 'Environment'];

  const filteredPosts = posts.filter(post => 
    (activeCategory === 'All' || post.category === activeCategory) &&
    (post.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-indigo-600">INNOVATE.</div>
          <div className="hidden md:flex gap-6 font-medium">
            {['Blog', 'About', 'Contact'].map(link => <a key={link} href="#" className="hover:text-indigo-600 transition">{link}</a>)}
          </div>
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
            <div className="relative hidden md:block">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="pl-8 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <img src={posts[0].image} alt="Featured" className="w-full h-80 object-cover rounded-xl" />
            <div>
              <span className="text-indigo-600 font-semibold uppercase text-xs tracking-widest">{posts[0].category}</span>
              <h1 className="text-4xl font-bold mt-2 mb-4 leading-tight">{posts[0].title}</h1>
              <p className="text-gray-600 mb-6">{posts[0].excerpt}</p>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700">
                Read Full Story <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
              <div className="flex gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-600 hover:border-indigo-600'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.map(post => (
                <article key={post.id} className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <span className="text-xs font-bold text-indigo-600 uppercase">{post.category}</span>
                  <h3 className="text-lg font-bold mt-2 mb-2 hover:text-indigo-600 cursor-pointer">{post.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto">
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-8">
            <div className="bg-indigo-900 p-6 rounded-2xl text-white">
              <h4 className="font-bold mb-4 flex items-center gap-2"><Mail /> Newsletter</h4>
              <p className="text-indigo-200 text-sm mb-4">Get the latest insights delivered to your inbox every week.</p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input 
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full p-2 rounded-lg text-gray-900 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="w-full bg-white text-indigo-900 py-2 rounded-lg font-bold text-sm">
                  {isSubscribed ? 'Subscribed!' : 'Subscribe Now'}
                </button>
              </form>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <h4 className="font-bold mb-4">Popular Posts</h4>
              <div className="space-y-4">
                {posts.slice(0, 3).map(p => (
                  <div key={p.id} className="flex gap-3 group cursor-pointer">
                    <img src={p.image} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-medium group-hover:text-indigo-600">{p.title}</p>
                      <span className="text-[10px] text-gray-400">{p.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t mt-16 bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2024 Innovate Blog. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            {['Privacy', 'Terms', 'Careers', 'Support'].map(f => <a key={f} href="#" className="hover:underline">{f}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
}