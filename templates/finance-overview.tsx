import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  ShoppingCart, 
  Zap, 
  Shield, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  Bell,
  Home,
  PieChart,
  Calendar,
  Settings,
  LogOut
} from 'lucide-react';

const transactions = [
  { id: 1, title: 'Apple Store', category: 'Electronics', date: 'Oct 24, 2023', amount: -1299.00, type: 'expense' },
  { id: 2, title: 'Salary Deposit', category: 'Income', date: 'Oct 22, 2023', amount: 5400.00, type: 'income' },
  { id: 3, title: 'Whole Foods Market', category: 'Groceries', date: 'Oct 20, 2023', amount: -184.20, type: 'expense' },
  { id: 4, title: 'Netflix Subscription', category: 'Entertainment', date: 'Oct 18, 2023', amount: -19.99, type: 'expense' },
  { id: 5, title: 'City Gas Station', category: 'Transport', date: 'Oct 15, 2023', amount: -65.50, type: 'expense' },
];

const categories = [
  { name: 'Housing', percent: 45, color: 'bg-emerald-500' },
  { name: 'Groceries', percent: 25, color: 'bg-emerald-400' },
  { name: 'Entertainment', percent: 15, color: 'bg-emerald-300' },
  { name: 'Transport', percent: 15, color: 'bg-emerald-200' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Sidebar */}
      <nav className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <DollarSign className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">FinTrack</span>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-emerald-600 font-medium cursor-pointer"><Home size={20} /> Dashboard</li>
            <li className="flex items-center gap-3 text-slate-500 hover:text-emerald-600 cursor-pointer"><Calendar size={20} /> Transactions</li>
            <li className="flex items-center gap-3 text-slate-500 hover:text-emerald-600 cursor-pointer"><CreditCard size={20} /> Cards</li>
          </ul>
        </div>
        <div className="border-t pt-6 space-y-4">
          <div className="flex items-center gap-3 text-slate-500 cursor-pointer"><Settings size={20} /> Settings</div>
          <div className="flex items-center gap-3 text-red-500 cursor-pointer"><LogOut size={20} /> Logout</div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Alex</h1>
            <p className="text-slate-500">Here's your financial overview for October.</p>
          </div>
          <button className="p-2 bg-white border rounded-full text-slate-600 hover:bg-slate-50">
            <Bell size={20} />
          </button>
        </header>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500 mb-1">Total Balance</p>
            <h2 className="text-3xl font-bold">$24,560.84</h2>
            <div className="flex items-center gap-1 text-emerald-600 text-sm mt-2 font-medium">
              <TrendingUp size={16} /> +2.4% from last month
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500 mb-1">Monthly Spending</p>
            <h2 className="text-3xl font-bold">$3,240.50</h2>
            <div className="flex items-center gap-1 text-red-500 text-sm mt-2 font-medium">
              <TrendingDown size={16} /> -1.2% from last month
            </div>
          </div>
          <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-lg shadow-emerald-200">
            <p className="text-emerald-50 mb-1">Savings Goal</p>
            <h2 className="text-3xl font-bold">$12,000</h2>
            <div className="w-full bg-emerald-800 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-white h-full w-[75%]"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Recent Transactions</h3>
            <div className="space-y-4">
              {transactions.map(t => (
                <div key={t.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${t.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                      {t.type === 'income' ? <ArrowUpRight size={20} /> : <ShoppingCart size={20} />}
                    </div>
                    <div>
                      <p className="font-semibold">{t.title}</p>
                      <p className="text-xs text-slate-500">{t.category} • {t.date}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {t.type === 'income' ? '+' : ''}{t.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-8">
            {/* Payment Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl text-white shadow-xl">
              <div className="flex justify-between items-start mb-12">
                <Zap className="text-emerald-400" />
                <Shield className="text-slate-500" />
              </div>
              <p className="text-xl tracking-widest font-mono mb-6">4829 •••• •••• 9201</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase text-slate-400">Card Holder</p>
                  <p className="font-medium">ALEX RIVERA</p>
                </div>
                <p className="font-bold text-lg">VISA</p>
              </div>
            </div>

            {/* Spending Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-lg mb-6">Spending Categories</h3>
              <div className="space-y-4">
                {categories.map(c => (
                  <div key={c.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{c.name}</span>
                      <span className="font-semibold">{c.percent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`${c.color} h-full`} style={{ width: `${c.percent}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}