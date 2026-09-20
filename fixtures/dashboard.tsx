import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Package, 
  Bell, 
  Search, 
  Settings, 
  Menu, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  MoreHorizontal,
  LogOut,
  User,
  Zap
} from 'lucide-react';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const stats = [
    { label: 'Total Revenue', value: '$54,230', change: '+12.5%', icon: DollarSign, positive: true },
    { label: 'Active Users', value: '2,845', change: '+3.2%', icon: Users, positive: true },
    { label: 'Pending Orders', value: '142', change: '-4.1%', icon: Package, positive: false },
    { label: 'Conversion Rate', value: '3.8%', change: '+0.8%', icon: Zap, positive: true },
  ];

  const activities = [
    { id: 1, user: 'Sarah Jenkins', action: 'Upgraded to Pro Plan', time: '2 mins ago', status: 'Success' },
    { id: 2, user: 'Marcus Thorne', action: 'Cancelled subscription', time: '45 mins ago', status: 'Warning' },
    { id: 3, user: 'Elena Rodriguez', action: 'Added new payment method', time: '2 hours ago', status: 'Success' },
    { id: 4, user: 'David Kim', action: 'Invited team member', time: '5 hours ago', status: 'Success' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col hidden md:flex`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5" />
          </div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight">Nexus</span>}
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {[
            { icon: LayoutDashboard, label: 'Dashboard' },
            { icon: Users, label: 'Customers' },
            { icon: Package, label: 'Inventory' },
            { icon: CreditCard, label: 'Billing' },
            { icon: Settings, label: 'Settings' },
          ].map((item, i) => (
            <button key={i} className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
              <item.icon className="w-5 h-5" />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-4 w-full p-3 rounded-lg text-slate-400 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-slate-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input type="text" placeholder="Search..." className="bg-slate-900 border border-slate-800 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64" />
            </div>
            <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
              JD
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <stat.icon className="w-6 h-6 text-indigo-500" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded ${stat.positive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Recent Activity */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h2 className="font-bold text-lg">Recent Activity</h2>
            <button className="text-indigo-500 text-sm hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-slate-500 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">User</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                  <th className="px-6 py-4 font-medium">Time</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {activities.map((act) => (
                  <tr key={act.id} className="hover:bg-slate-800/50">
                    <td className="px-6 py-4 font-medium">{act.user}</td>
                    <td className="px-6 py-4 text-slate-400">{act.action}</td>
                    <td className="px-6 py-4 text-slate-500">{act.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${act.status === 'Success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                        {act.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-500 hover:text-white">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}