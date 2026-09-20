import React from 'react';
import { ArrowRight, BarChart3, Bell, Calendar, ChevronDown, CreditCard, DollarSign, Home, LogOut, Mail, MoreHorizontal, Package, Search, Settings, ShoppingCart, Sparkles, TrendingDown, TrendingUp, Users } from "lucide-react";

export default function App() {
  const stats = [
    { name: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign, trend: 'up' },
    { name: 'New Customers', value: '2,350', change: '+18.7%', icon: Users, trend: 'up' },
    { name: 'Products Sold', value: '12,234', change: '+15.3%', icon: Package, trend: 'up' },
    { name: 'Pending Orders', value: '578', change: '-2.1%', icon: ShoppingCart, trend: 'down' },
  ];

  const activities = [
    { id: 'ORD-7890', type: 'Order', description: 'New order from Jane Doe', amount: '$120.00', date: '2023-10-26 14:30' },
    { id: 'INV-1234', type: 'Invoice', description: 'Invoice paid by Acme Corp', amount: '$850.50', date: '2023-10-26 11:15' },
    { id: 'CUS-5678', type: 'Customer', description: 'New customer registration', amount: null, date: '2023-10-25 09:00' },
    { id: 'PRO-9012', type: 'Product', description: 'Product stock updated: Widget X', amount: null, date: '2023-10-25 16:45' },
    { id: 'ORD-3456', type: 'Order', description: 'Order refunded for John Smith', amount: '-$50.00', date: '2023-10-24 10:00' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-6 flex flex-col border-r border-gray-800">
        <div className="flex items-center gap-2 mb-10">
          <Sparkles className="h-6 w-6 text-indigo-400" />
          <h1 className="text-2xl font-bold text-gray-50">Acme Inc.</h1>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-indigo-400 bg-gray-800">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <Package className="h-5 w-5" />
                <span>Products</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <Users className="h-5 w-5" />
                <span>Customers</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <CreditCard className="h-5 w-5" />
                <span>Payments</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-8 pt-4 border-t border-gray-800">
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-50">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 text-gray-200 rounded-lg py-2 pl-10 pr-4 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
              <Bell className="h-5 w-5 text-gray-300" />
            </button>
            <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
              <Mail className="h-5 w-5 text-gray-300" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 font-medium">JD</div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-400">{stat.name}</h3>
                <stat.icon className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-semibold text-gray-50">{stat.value}</span>
                <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="inline h-4 w-4 mr-1" /> : <TrendingDown className="inline h-4 w-4 mr-1" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-gray-500">Compared to last month</p>
            </div>
          ))}
        </div>

        {/* Recent Activity Table */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-50">Recent Activity</h3>
            <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium">
              View All
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead>
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="relative px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{activity.id}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        activity.type === 'Order' ? 'bg-indigo-900 text-indigo-300' :
                        activity.type === 'Invoice' ? 'bg-green-900 text-green-300' :
                        activity.type === 'Customer' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-gray-800 text-gray-300'
                      }`}>
                        {activity.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{activity.description}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {activity.amount ? (
                        <span className={`${activity.amount.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                          {activity.amount}
                        </span>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">{activity.date}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-200">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}