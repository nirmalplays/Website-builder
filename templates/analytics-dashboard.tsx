import React, { useState } from 'react';
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Clock, 
  MoreHorizontal,
  LogOut,
  Zap
} from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('Dashboard');

  const stats = [
    { title: 'Total Revenue', value: '$48,292', trend: '+12.5%', isUp: true, icon: DollarSign },
    { title: 'Active Sessions', value: '1,284', trend: '+8.2%', isUp: true, icon: Zap },
    { title: 'Units Sold', value: '8,940', trend: '-2.4%', isUp: false, icon: Package },
    { title: 'Avg. Response Time', value: '1.2s', trend: '-0.4s', isUp: true, icon: Clock },
  ];

  const activities = [
    { id: 1, user: 'Sarah Jenkins', action: 'Purchased Premium Plan', status: 'Completed', date: '2 mins ago' },
    { id: 2, user: 'Marcus Thorne', action: 'Requested API Access', status: 'Pending', date: '15 mins ago' },
    { id: 3, user: 'Elena Rodriguez', action: 'Updated Billing Info', status: 'Completed', date: '1 hour ago' },
    { id: 4, user: 'David Kim', action: 'Failed Login Attempt', status: 'Failed', date: '3 hours ago' },
    { id: 5, user: 'Alex Rivera', action: 'Created New Workspace', status: 'Completed', date: '5 hours ago' },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-2 text-indigo-500">
          <BarChart3 size={28} />
          <span className="font-bold text-xl text-white">NexusAnalytics</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {['Dashboard', 'Analytics', 'Team', 'Settings'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeNav === item ? 'bg-indigo-600 text-white' : 'hover:bg-slate-900 text-slate-400'
              }`}
            >
              {item === 'Dashboard' && <Home size={20} />}
              {item === 'Analytics' && <BarChart3 size={20} />}
              {item === 'Team' && <Users size={20} />}
              {item === 'Settings' && <Settings size={20} />}
              {item}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Overview</h1>
            <p className="text-slate-400">Welcome back, your system is running smoothly.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search metrics..." 
                className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <button className="p-2 bg-slate-900 rounded-lg border border-slate-800 hover:text-indigo-500">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <div className="flex justify-between mb-4">
                <div className="p-2 bg-slate-800 rounded-lg text-indigo-400">
                  <stat.icon size={20} />
                </div>
                <span className={`text-xs font-medium flex items-center gap-1 ${stat.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </section>

        {/* Activity Table */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <button className="text-slate-400 hover:text-indigo-500">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-slate-400 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Action</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {activities.map((act) => (
                <tr key={act.id} className="hover:bg-slate-800/50 transition-colors text-sm">
                  <td className="px-6 py-4 font-medium text-white">{act.user}</td>
                  <td className="px-6 py-4 text-slate-300">{act.action}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      act.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                      act.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-rose-500/10 text-rose-500'
                    }`}>
                      {act.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{act.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}