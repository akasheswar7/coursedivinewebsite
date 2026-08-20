import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowLeft, Check, Phone, Mail } from 'lucide-react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';

const AdminEnquiries = () => {
  const { showToast } = useNotification();
  const [enquiries, setEnquiries] = useState([
    {
      _id: 'enq_1',
      name: 'Aditya Rao',
      email: 'aditya.rao@gmail.com',
      phone: '+91 9988776655',
      subject: 'Next Batch Start Date',
      courseInterest: 'Full Stack Web Development',
      message: 'Hello, I want to know if the upcoming MERN batch has weekend live classes.',
      status: 'New',
      createdAt: '2026-02-14T10:00:00.000Z'
    },
    {
      _id: 'enq_2',
      name: 'Megha Nair',
      email: 'megha.nair@outlook.com',
      phone: '+91 9876501234',
      subject: 'EMI Payment Inquiry',
      courseInterest: 'Data Science & AI',
      message: 'Does Course Divine provide 0-cost EMI options on HDFC credit cards?',
      status: 'Responded',
      createdAt: '2026-02-10T10:00:00.000Z'
    }
  ]);

  useEffect(() => {
    api.get('/enquiries')
      .then((res) => {
        if (res.data?.success && res.data.data.length > 0) {
          setEnquiries(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleToggleStatus = (enqId, current) => {
    const updated = current === 'New' ? 'Responded' : 'New';
    setEnquiries((prev) =>
      prev.map((e) => (e._id === enqId ? { ...e, status: updated } : e))
    );
    showToast(`Enquiry marked as ${updated}`, 'success');
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
        <h1 className="text-3xl font-extrabold text-slate-900">Student & Lead Inquiries</h1>
        <p className="text-xs text-slate-500 mt-1">Review inquiries submitted via the Contact page.</p>
      </div>

      <div className="space-y-4">
        {enquiries.map((enq) => (
          <div key={enq._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  enq.status === 'New' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {enq.status || 'New'}
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-1">{enq.name}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                  <span>{enq.email}</span>
                  <span>•</span>
                  <span>{enq.phone}</span>
                  <span>•</span>
                  <span className="font-semibold text-brand-700">{enq.courseInterest}</span>
                </div>
              </div>

              <button
                onClick={() => handleToggleStatus(enq._id, enq.status)}
                className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-600 font-bold text-xs transition"
              >
                Mark {enq.status === 'New' ? 'Responded' : 'New'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 text-xs text-slate-700 leading-relaxed">
              "{enq.message}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEnquiries;
