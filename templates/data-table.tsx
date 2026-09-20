import React, { useState } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Shield, 
  Mail, 
  Filter,
  Plus
} from 'lucide-react';

const TEAM_MEMBERS = [
  { id: 1, name: "Elena Rodriguez", role: "Product Designer", status: "Active", email: "elena@nexus.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { id: 2, name: "Marcus Chen", role: "Senior Engineer", status: "Active", email: "marcus@nexus.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 3, name: "Sarah Jenkins", role: "Marketing Lead", status: "Away", email: "sarah@nexus.com", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" },
  { id: 4, name: "David Kim", role: "Data Analyst", status: "Active", email: "david@nexus.com", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
  { id: 5, name: "Amara Okafor", role: "Operations Mgr", status: "Offline", email: "amara@nexus.com", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" },
  { id: 6, name: "Thomas Wright", role: "Frontend Dev", status: "Active", email: "thomas@nexus.com", avatar: "https://images.unsplash.com/photo-1519345182560-3f2d17c4d2d0?w=100&h=100&fit=crop" },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMembers = TEAM_MEMBERS.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team Directory</h1>
            <p className="text-slate-500">Manage your organization's members and access levels.</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium">
            <Plus size={18} /> Add Member
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search members..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 border border-slate-200 px-4 py-2 rounded-lg font-medium transition">
            <Filter size={18} /> Filters
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-sm text-slate-500">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{member.role}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        member.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 
                        member.status === 'Away' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-indigo-600 transition p-1">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-white">
            <p className="text-sm text-slate-500">Showing <strong>{filteredMembers.length}</strong> results</p>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronLeft size={18} />
              </button>
              <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-400 text-sm py-8">
          <p>© 2024 Nexus Operations Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}