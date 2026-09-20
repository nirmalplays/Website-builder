import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  User,
  Shield,
  Clock
} from 'lucide-react';

type Member = {
  id: string;
  name: string;
  role: string;
  email: string;
  status: 'Active' | 'Inactive' | 'Pending';
};

const INITIAL_DATA: Member[] = [
  { id: '1', name: 'Sarah Jenkins', role: 'Product Designer', email: 'sarah@company.com', status: 'Active' },
  { id: '2', name: 'Marcus Chen', role: 'Frontend Engineer', email: 'marcus@company.com', status: 'Active' },
  { id: '3', name: 'Elena Rodriguez', role: 'UX Researcher', email: 'elena@company.com', status: 'Pending' },
  { id: '4', name: 'David Kim', role: 'Backend Dev', email: 'dkim@company.com', status: 'Inactive' },
  { id: '5', name: 'Amara Okafor', role: 'Product Manager', email: 'amara@company.com', status: 'Active' },
  { id: '6', name: 'James Wilson', role: 'QA Engineer', email: 'james@company.com', status: 'Active' },
  { id: '7', name: 'Sophie Taylor', role: 'Designer', email: 'sophie@company.com', status: 'Pending' },
];

export default function App() {
  const [members, setMembers] = useState<Member[]>(() => {
    try { return JSON.parse(localStorage.getItem('team_data') || 'null') || INITIAL_DATA; }
    catch { return INITIAL_DATA; }
  });
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', email: '' });
  const itemsPerPage = 5;

  useEffect(() => {
    localStorage.setItem('team_data', JSON.stringify(members));
  }, [members]);

  const filteredMembers = useMemo(() => 
    members.filter(m => 
      m.name.toLowerCase().includes(search.toLowerCase()) || 
      m.role.toLowerCase().includes(search.toLowerCase())
    ), [members, search]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage) || 1;
  const paginatedData = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const newMember: Member = {
        id: Date.now().toString(),
        ...formData,
        status: 'Active'
      };
      setMembers([...members, newMember]);
      setFormData({ name: '', role: '', email: '' });
      setShowForm(false);
      setIsLoading(false);
    }, 800);
  };

  const deleteMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const toggleStatus = (id: string) => {
    setMembers(members.map(m => 
      m.id === id ? { ...m, status: m.status === 'Active' ? 'Inactive' : 'Active' } : m
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Team Members</h1>
            <p className="text-gray-500">Manage your team structure and access rights.</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} /> Add Member
          </button>
        </header>

        {showForm && (
          <form onSubmit={handleAddMember} className="bg-white p-6 rounded-xl border border-gray-200 mb-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input required placeholder="Full Name" className="border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input required placeholder="Role" className="border p-2 rounded" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
              <input type="email" required placeholder="Email" className="border p-2 rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="mt-4 flex gap-2">
              <button disabled={isLoading} type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                {isLoading ? 'Saving...' : 'Confirm Save'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="text-gray-600 px-4 py-2">Cancel</button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center gap-4">
            <Search className="text-gray-400" size={20} />
            <input 
              placeholder="Search members..." 
              className="flex-1 outline-none" 
              value={search} 
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.map(member => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.email}</div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{member.role}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => toggleStatus(member.id)}
                        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                          member.status === 'Active' ? 'bg-green-100 text-green-700' : 
                          member.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {member.status === 'Active' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                        {member.status}
                      </button>
                    </td>
                    <td className="p-4">
                      <button onClick={() => deleteMember(member.id)} className="text-gray-400 hover:text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 flex justify-between items-center border-t border-gray-100">
            <span className="text-sm text-gray-500">Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft size={18}/>
              </button>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight size={18}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}