import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Mail, Lock, LogIn, Sparkles, Loader2, AlertCircle, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import GoogleAuthModal from '../components/GoogleAuthModal';
import logoImg from '../assets/logo.png';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showGoogleModal, setShowGoogleModal] = useState(false);

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

    const cleanEmail = email.trim().toLowerCase();
    const res = await login(cleanEmail, password);
    setLoading(false);

    if (res.success) {
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      if (res.user.role === 'admin' || cleanEmail.includes('admin')) {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setErrorMsg(res.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 sm:p-10 border border-slate-200 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block mb-3">
            <img
              src={logoImg}
              alt="Course Divine"
              className="h-12 w-auto object-contain rounded-xl shadow-md mx-auto"
            />
          </Link>

          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Account Login</h2>
          <p className="text-xs text-slate-500">Sign in to access your student dashboard, courses, and certificates.</p>
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

