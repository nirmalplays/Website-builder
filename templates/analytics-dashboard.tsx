import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Package, DollarSign, TrendingUp, TrendingDown, 
  Search, Bell, Settings, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight,
  CheckCircle, Clock, XCircle, ChevronDown, Plus
} from 'lucide-react';

const INITIAL_DATA = [
  { id: 1, user: 'Sarah Jenkins', action: 'Subscription Renewal', amount: '$49.00', status: 'Completed', time: '10 mins ago' },
  { id: 2, user: 'Marcus Thorne', action: 'API Integration', amount: '$120.00', status: 'Pending', time: '2 hours ago' },
  { id: 3, user: 'Elena Rodriguez', action: 'Server Migration', amount: '$0.00', status: 'Failed', time: '5 hours ago' },
  { id: 4, user: 'David Kim', action: 'Enterprise License', amount: '$499.00', status: 'Completed', time: '1 day ago' },
  { id: 5, user: 'TechFlow Inc', action: 'Cloud Storage', amount: '$89.00', status: 'Completed', time: '2 days ago' },
];

export default function App() {
  const [activities, setActivities] = useState(() => {
    try {
      const saved = localStorage.getItem('dash_activities');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch { return INITIAL_DATA; }
  });
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('dash_activities', JSON.stringify(activities));
  }, [activities]);

  const stats = [
    { title: 'Total Revenue', value: '$48,294', trend: '+12.5%', isUp: true },
    { title: 'Active Users', value: '1,284', trend: '+3.2%', isUp: true },
    { title: 'Pending Orders', value: '24', trend: '-8.1%', isUp: false },
    { title: 'System Uptime', value: '99.98%', trend: '+0.1%', isUp: true },
  ];

  const filteredActivities = filter === 'All' 
    ? activities 
    : activities.filter(a => a.status === filter);

  const deleteActivity = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      setActivities(activities.filter(a => a.id !== id));
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 p-6 flex flex-col hidden md:flex">
        <div className="flex items-center gap-2 mb-10 text-emerald-500 font-bold text-xl">
          <LayoutDashboard /><span>NexusFlow</span>
        </div>
        <nav className="space-y-4 flex-grow">
          {['Dashboard', 'Analytics', 'Customers', 'Billing', 'Settings'].map((item) => (
            <button key={item} className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors text-slate-400 hover:text-white">
              {item}
            </button>
          ))}
        </nav>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <p className="text-sm font-semibold mb-1">Upgrade Plan</p>
          <p className="text-xs text-slate-400 mb-3">Get access to pro features.</p>
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 py-2 rounded-lg text-sm font-medium transition">Upgrade Now</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
          <div className="flex gap-4">
            <button className="p-2 bg-slate-900 rounded-full border border-slate-800"><Bell size={20} /></button>
            <div className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center font-bold">SJ</div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <p className="text-slate-400 text-sm mb-2">{s.title}</p>
              <div className="flex justify-between items-end">
                <h3 className="text-2xl font-bold">{s.value}</h3>
                <span className={`flex items-center text-xs ${s.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {s.isUp ? <TrendingUp size={14} className="mr-1"/> : <TrendingDown size={14} className="mr-1"/>}
                  {s.trend}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Table Section */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <div className="flex gap-2">
              {['All', 'Completed', 'Pending', 'Failed'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 text-sm rounded-full border ${filter === f ? 'bg-emerald-600 border-emerald-500' : 'border-slate-700'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="h-48 flex items-center justify-center text-slate-500">Processing...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-sm">
                    <th className="pb-4">User</th>
                    <th className="pb-4">Action</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredActivities.map((a) => (
                    <tr key={a.id} className="text-sm">
                      <td className="py-4 font-medium">{a.user}</td>
                      <td className="py-4 text-slate-400">{a.action}</td>
                      <td className="py-4">{a.amount}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          a.status === 'Completed' ? 'bg-emerald-950 text-emerald-400' :
                          a.status === 'Pending' ? 'bg-amber-950 text-amber-400' :
                          'bg-rose-950 text-rose-400'
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => deleteActivity(a.id)}
                          className="text-slate-500 hover:text-rose-500 transition"
                        >
                          <XCircle size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredActivities.length === 0 && (
                <div className="text-center py-10 text-slate-500">No activities found matching your criteria.</div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}