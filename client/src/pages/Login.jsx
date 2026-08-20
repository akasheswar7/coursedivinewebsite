import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Mail, Lock, LogIn, Sparkles, Loader2, AlertCircle, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter email and password');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setErrorMsg(res.message || 'Invalid credentials');
    }
  };

  const handleQuickDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 sm:p-10 border border-slate-200 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold shadow-md shadow-brand-600/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold text-slate-900">
              COURSE <span className="text-brand-600">DIVINE</span>
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Student & Admin Login</h2>
          <p className="text-xs text-slate-500">Access your enrolled courses, certificates, and learning tracks.</p>
        </div>

        {/* Quick Demo Credentials */}
        <div className="p-3.5 rounded-2xl bg-brand-50/70 border border-brand-100 space-y-2">
          <p className="text-[11px] font-bold text-brand-800 uppercase tracking-wider">⚡ 1-Click Demo Accounts</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('student@coursedivine.com', 'Student@123')}
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-white border border-brand-200 text-brand-700 font-bold text-xs hover:bg-brand-50 transition text-center"
            >
              Demo Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin@coursedivine.com', 'Admin@123')}
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 transition text-center shadow-sm"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-lg shadow-brand-600/30 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
            Sign In to Course Divine
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-brand-600 font-bold hover:underline">
            Register for Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
