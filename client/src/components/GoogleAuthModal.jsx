import React, { useState, useEffect } from 'react';
import { X, Loader2, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const GoogleAuthModal = ({ isOpen, onClose, redirectPath = '/dashboard' }) => {
  const { loginWithGoogle } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  const [googleEmail, setGoogleEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTypingEmail, setIsTypingEmail] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const lastEmail = localStorage.getItem('cd_last_google_email');
      if (lastEmail) {
        setGoogleEmail(lastEmail);
        setIsTypingEmail(false);
      } else {
        setGoogleEmail('');
        setIsTypingEmail(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContinue = async (e) => {
    if (e) e.preventDefault();
    const cleanEmail = googleEmail.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      showToast('Please enter a valid Google email address.', 'error');
      setIsTypingEmail(true);
      return;
    }

    setIsProcessing(true);
    try {
      await new Promise((r) => setTimeout(r, 600));

      const derivedName = cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(derivedName)}&backgroundColor=071F3F&textColor=ffffff`;

      const res = await loginWithGoogle({
        email: cleanEmail,
        name: derivedName,
        avatar: avatarUrl
      });

      if (res.success) {
        localStorage.setItem('cd_last_google_email', cleanEmail);
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
        showToast(`🎉 Signed in with Google as ${cleanEmail}`, 'success');
        onClose();
        navigate(redirectPath);
      } else {
        showToast(res.message || 'Google sign in failed', 'error');
      }
    } catch (err) {
      showToast('Google authentication error. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-in zoom-in-95 duration-200">
        
        {/* Top Browser URL Bar Simulation */}
        <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span className="font-mono text-[11px] text-slate-600 truncate">
              accounts.google.com/signin/oauth/id?authuser=0&client_id=coursedivine...
            </span>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Google OAuth 2.0 Body */}
        <div className="p-8 sm:p-12 space-y-8">
          
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Sign in with Google</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Course Divine Brand & User Account */}
            <div className="space-y-6">
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <img
                  src="/logo.png"
                  alt="Course Divine"
                  className="h-10 w-auto object-contain rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  Sign in to Course Divine
                </h2>
              </div>

              {/* Active Account Display or Input Field */}
              <div className="pt-2">
                {!isTypingEmail && googleEmail ? (
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                        {googleEmail.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 line-clamp-1">{googleEmail}</div>
                        <button
                          type="button"
                          onClick={() => setIsTypingEmail(true)}
                          className="text-[11px] text-blue-600 hover:underline font-medium"
                        >
                          Switch Google Account
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContinue} className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">
                      Enter Your Google Account Email
                    </label>
                    <input
                      type="email"
                      required
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                      placeholder="your.email@gmail.com"
                      autoFocus
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </form>
                )}
              </div>

            </div>

            {/* Right Column: Google Consent Terms */}
            <div className="space-y-5 text-xs text-slate-600 leading-relaxed border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8 flex flex-col justify-between h-full">
              
              <div className="space-y-4">
                <p>
                  By continuing, Google will share your name, email address, language preference, and profile picture with <strong className="text-slate-800">Course Divine</strong>. See Course Divine’s{' '}
                  <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span> and{' '}
                  <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span>.
                </p>

                <p className="text-[11px] text-slate-400">
                  You can manage Sign in with Google anytime in your Google Account settings.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isProcessing}
                  className="px-6 py-2.5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={isProcessing}
                  className="px-8 py-2.5 rounded-full bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default GoogleAuthModal;


