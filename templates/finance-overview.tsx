import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, ArrowUpRight, ArrowDown, DollarSign, 
  CreditCard, PieChart, TrendingUp, Search, X, CheckCircle 
} from 'lucide-react';

type Transaction = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
};

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Salary'];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', description: 'Whole Foods Market', amount: -124.50, category: 'Food', date: '2023-10-24' },
  { id: '2', description: 'Monthly Salary', amount: 4500.00, category: 'Salary', date: '2023-10-23' },
  { id: '3', description: 'Uber Trip', amount: -22.15, category: 'Transport', date: '2023-10-22' },
  { id: '4', description: 'Netflix Subscription', amount: -15.99, category: 'Entertainment', date: '2023-10-21' },
];

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('fin-app-data');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch { return INITIAL_TRANSACTIONS; }
  });

  const [filter, setFilter] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ description: '', amount: '', category: 'Food' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('fin-app-data', JSON.stringify(transactions));
  }, [transactions]);

  const totalBalance = transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const filteredTransactions = transactions.filter(t => 
    t.description.toLowerCase().includes(filter.toLowerCase()) || 
    t.category.toLowerCase().includes(filter.toLowerCase())
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;
    
    setLoading(true);
    setTimeout(() => {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        description: formData.description,
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: new Date().toISOString().split('T')[0],
      };
      setTransactions([newTransaction, ...transactions]);
      setFormData({ description: '', amount: '', category: 'Food' });
      setIsAdding(false);
      setLoading(false);
    }, 800);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">FinTrack</h1>
            <p className="text-slate-500">Your personal finance overview</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus size={20} /> Add Transaction
          </button>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500">Total Balance</p>
            <h2 className="text-3xl font-bold mt-1">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500">Monthly Income</p>
            <h2 className="text-3xl font-bold mt-1 text-emerald-600">+${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500">Total Expenses</p>
            <h2 className="text-3xl font-bold mt-1 text-rose-600">-${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
          </div>
        </div>

        {/* Card and Filter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-indigo-900 text-white p-8 rounded-3xl h-48 flex flex-col justify-between shadow-xl">
              <div className="flex justify-between">
                <CreditCard />
                <span className="font-bold tracking-widest">VISA</span>
              </div>
              <div>
                <p className="text-sm opacity-70">Current Balance</p>
                <p className="text-2xl font-mono">**** **** **** 4829</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Recent Transactions</h3>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-9 pr-4 py-2 border rounded-full text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredTransactions.length === 0 ? (
                <p className="text-center py-8 text-slate-400">No transactions found.</p>
              ) : (
                filteredTransactions.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${t.amount > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {t.amount > 0 ? <TrendingUp size={20} /> : <ArrowDown size={20} />}
                      </div>
                      <div>
                        <p className="font-medium">{t.description}</p>
                        <p className="text-xs text-slate-500">{t.category} • {t.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`font-bold ${t.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)}
                      </span>
                      <button onClick={() => deleteTransaction(t.id)} className="text-slate-400 hover:text-rose-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Add Transaction */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">New Transaction</h2>
              <button type="button" onClick={() => setIsAdding(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-slate-600">Description</label>
                <input 
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-slate-600">Amount (e.g. -50 or 100)</label>
                  <input 
                    required type="number" step="0.01"
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-slate-600">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <button 
                disabled={loading || !formData.description || !formData.amount}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Save Transaction'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}