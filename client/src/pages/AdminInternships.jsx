import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowLeft, CheckCircle2, XCircle, Clock, ExternalLink } from 'lucide-react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';

const AdminInternships = () => {
  const { showToast } = useNotification();
  const [applications, setApplications] = useState([
    {
      _id: 'int_1',
      name: 'Rohan Sharma',
      email: 'student@coursedivine.com',
      phone: '+91 9811223344',
      college: 'National Institute of Technology',
      domain: 'Full Stack Web Development',
      duration: '3 Months',
      status: 'Accepted',
      createdAt: '2026-02-01T10:00:00.000Z'
    },
    {
      _id: 'int_2',
      name: 'Kavita Iyer',
      email: 'kavita.iyer@gmail.com',
      phone: '+91 9876543299',
      college: 'BITS Pilani',
      domain: 'Data Science & Artificial Intelligence',
      duration: '3 Months',
      status: 'Under Review',
      createdAt: '2026-02-12T10:00:00.000Z'
    }
  ]);

  useEffect(() => {
    api.get('/internships')
      .then((res) => {
        if (res.data?.success && res.data.data.length > 0) {
          setApplications(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleStatusChange = (appId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app._id === appId ? { ...app, status: newStatus } : app))
    );
    showToast(`Application status updated to ${newStatus}`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        to="/admin"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Operations Hub
      </Link>

      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Internship Applications</h1>
        <p className="text-xs text-slate-500 mt-1">Review candidate profiles, university credentials, and change approval statuses.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Applicant</th>
                <th className="p-4">College</th>
                <th className="p-4">Domain Track</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-slate-50/60 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{app.name}</div>
                    <div className="text-slate-400 text-[11px]">{app.email} • {app.phone}</div>
                  </td>
                  <td className="p-4 font-medium text-slate-700">{app.college}</td>
                  <td className="p-4 font-semibold text-brand-700">{app.domain}</td>
                  <td className="p-4">{app.duration}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      app.status === 'Accepted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'Rejected'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {app.status || 'Under Review'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleStatusChange(app._id, 'Accepted')}
                        className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px]"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(app._id, 'Under Review')}
                        className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 hover:bg-amber-100 font-bold text-[11px]"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => handleStatusChange(app._id, 'Rejected')}
                        className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-[11px]"
                      >
                        Reject
                      </button>
                    </div>
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

export default AdminInternships;
