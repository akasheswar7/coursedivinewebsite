import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, ArrowLeft, Shield, User, Trash2 } from 'lucide-react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';

const AdminUsers = () => {
  const { showToast } = useNotification();
  const [users, setUsers] = useState([
    {
      _id: 'u1',
      name: 'Rohan Sharma',
      email: 'student@coursedivine.com',
      phone: '+91 9811223344',
      role: 'user',
      referralCode: 'CDROHAN',
      createdAt: '2026-01-10T10:00:00.000Z'
    },
    {
      _id: 'u2',
      name: 'Pooja Verma',
      email: 'pooja.verma@gmail.com',
      phone: '+91 9876543211',
      role: 'user',
      referralCode: 'CDPOOJA',
      createdAt: '2026-01-14T10:00:00.000Z'
    },
    {
      _id: 'u3',
      name: 'Course Divine Admin',
      email: 'admin@coursedivine.com',
      phone: '+91 9876543210',
      role: 'admin',
      referralCode: 'CDADMIN',
      createdAt: '2026-01-01T10:00:00.000Z'
    }
  ]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/admin/users')
      .then((res) => {
        if (res.data?.success && res.data.data.length > 0) {
          setUsers(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleToggleRole = (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
    );
    showToast(`User role updated to ${newRole}`, 'success');
  };

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        to="/admin"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Operations Hub
      </Link>

      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">User & Student Directory</h1>
        <p className="text-xs text-slate-500 mt-1">Manage registered students and administrator privileges.</p>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name or email..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Role</th>
                <th className="p-4">Referral Code</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <tr key={u._id} className="hover:bg-slate-50/60 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{u.name}</div>
                    <div className="text-slate-400 text-[11px]">{u.email}</div>
                  </td>
                  <td className="p-4">{u.phone || 'N/A'}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      u.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-brand-100 text-brand-700'
                    }`}>
                      {u.role === 'admin' ? 'Admin' : 'Student'}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-semibold text-brand-700">{u.referralCode || 'None'}</td>
                  <td className="p-4 text-slate-400">
                    {new Date(u.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleToggleRole(u._id, u.role)}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-600 font-bold text-[11px] transition"
                    >
                      Toggle Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
