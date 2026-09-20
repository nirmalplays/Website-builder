import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Trash2, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  CheckCircle, 
  Clock, 
  XCircle,
  Filter
} from 'lucide-react';

type Member = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Designer' | 'Developer' | 'Manager';
  status: 'Active' | 'Away' | 'Offline';
  avatar: string;
};

const INITIAL_DATA: Member[] = [
  { id: '1', name: 'Sarah Jenkins', email: 'sarah.j@company.com', role: 'Admin', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: '2', name: 'Marcus Chen', email: 'm.chen@company.com', role: 'Developer', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { id: '3', name: 'Elena Rodriguez', email: 'elena.r@company.com', role: 'Designer', status: 'Away', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
  { id: '4', name: 'David Kim', email: 'dkim@company.com', role: 'Manager', status: 'Offline', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
  { id: '5', name: 'James Wilson', email: 'j.wilson@company.com', role: 'Developer', status: 'Active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
];

export default function App() {
  const [members, setMembers] = useState<Member[]>(() => {
    try {
      const saved = localStorage.getItem('team_members');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch { return INITIAL_DATA; }
  });

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Developer' as const });
  const itemsPerPage = 3;

  useEffect(() => {
    localStorage.setItem('team_members', JSON.stringify(members));
  }, [members]);

  const filteredMembers = useMemo(() => 
    members.filter(m => m.name.toLowerCase().includes(search.toLowerCase())),
    [members, search]
  );

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    const newMember: Member = {
      id: Date.now().toString(),
      ...formData,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
    };
    
    setMembers([newMember, ...members]);
    setFormData({ name: '', email: '', role: 'Developer' });
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Team Members</h1>
            <p className="text-slate-500">Manage your organization's personnel</p>
          </div>
          <button 
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-sm"
          >
            <Plus size={18} /> Add New Member
          </button>
        </header>

        {isFormOpen && (
          <form onSubmit={handleAddMember} className="bg-white p-6 rounded-xl border border-slate-200 mb-8 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Add New Team Member</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none" required />
              <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none" required />
              <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as any})} className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Admin</option><option>Developer</option><option>Designer</option><option>Manager</option>
              </select>
            </div>
            <div className="mt-4 flex gap-2">
              <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">Save</button>
              <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2 rounded-lg border hover:bg-slate-50">Cancel</button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name..." 
                value={search}
                onChange={(e) => {setSearch(e.target.value); setCurrentPage(1)}}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedMembers.map(member => (
                  <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={member.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-slate-900">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{member.role}</td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        member.status === 'Active' ? 'bg-green-50 text-green-700' : 
                        member.status === 'Away' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {member.status === 'Active' && <CheckCircle size={12} />}
                        {member.status === 'Away' && <Clock size={12} />}
                        {member.status === 'Offline' && <XCircle size={12} />}
                        {member.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(member.id)} className="text-slate-400 hover:text-red-600 p-2 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedMembers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">No team members found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="flex items-center gap-1 text-slate-600 disabled:opacity-30"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <span className="text-sm text-slate-500">Page {currentPage} of {totalPages}</span>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="flex items-center gap-1 text-slate-600 disabled:opacity-30"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}