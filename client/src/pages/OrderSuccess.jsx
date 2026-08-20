import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Download, Award, BookOpen, LayoutDashboard, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '../services/api';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    api.get(`/orders/${orderId}`)
      .then((res) => {
        if (res.data?.success) {
          setOrder(res.data.data);
        }
      })
      .catch(() => {});
  }, [orderId]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          Payment Verified & Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Welcome to Course Divine!
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Your payment was processed successfully and your course enrollments have been activated immediately on your Student Dashboard.
        </p>
      </div>

      {/* Invoice Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-left space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-100 gap-2">
          <div>
            <p className="text-[11px] text-slate-400 font-semibold uppercase">Order Reference</p>
            <p className="font-mono font-bold text-slate-900 text-sm">{orderId}</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-[11px] text-slate-400 font-semibold uppercase">Transaction Date</p>
            <p className="text-xs font-bold text-slate-700">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100 flex items-center justify-between text-xs text-brand-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-600" />
            <span className="font-semibold">Official Course Divine Tax Invoice</span>
          </div>
          <button
            onClick={() => window.print()}
            className="text-brand-600 hover:text-brand-800 font-bold flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" /> Print Receipt
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Link
            to="/dashboard"
            className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" /> Go to My Dashboard
          </Link>
          <Link
            to="/courses"
            className="w-full py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> Browse More Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
