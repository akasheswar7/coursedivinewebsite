import React, { useState } from 'react';
import { Gift, Copy, Check, Sparkles, Users, TrendingUp, ArrowRight, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const ReferAndEarn = () => {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useNotification();
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(5);

  const referralCode = user?.referralCode || 'CDDIVINE500';
  const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Referral code copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const estimatedEarnings = referralCount * 500;

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-navy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="px-3.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider border border-brand-400/30">
            Course Divine Affiliate & Student Rewards
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Refer Friends & Earn ₹500 Per Enrollment
          </h1>
          <p className="text-sm sm:text-base text-brand-100/80 mt-3 leading-relaxed">
            Invite your peers to upskill with Course Divine. When they enroll in any course, they get 10% off and you receive ₹500 directly into your bank account or dashboard wallet.
          </p>
        </div>
      </section>

      {/* Referral Code Box */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-brand-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Your Unique Referral Code</h3>
                <p className="text-xs text-slate-500">Share with friends, WhatsApp groups, and campus channels.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl flex items-center justify-between font-mono font-bold text-base text-brand-700">
              <span>{referralCode}</span>
              <button
                onClick={() => handleCopy(referralCode)}
                className="text-xs font-sans text-brand-600 hover:text-brand-800 flex items-center gap-1 font-semibold"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy Code'}
              </button>
            </div>
            <button
              onClick={() => handleCopy(referralLink)}
              className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 shrink-0"
            >
              <Share2 className="w-4 h-4" /> Copy Invite Link
            </button>
          </div>

          {!isAuthenticated && (
            <p className="text-xs text-center text-slate-400">
              <a href="/login" className="text-brand-600 font-bold hover:underline">Log in</a> to track your live referral signups and bank payout requests.
            </p>
          )}
        </div>
      </section>

      {/* Interactive Earnings Calculator */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-50/70 rounded-3xl p-8 border border-brand-100 shadow-sm space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-extrabold text-slate-900">Calculate Your Potential Rewards</h3>
            <p className="text-xs text-slate-500 mt-1">Slide to see how much you can earn every month.</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-bold text-slate-700">
              <span>Friends Enrolled: {referralCount}</span>
              <span className="text-brand-600">₹500 / referral</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={referralCount}
              onChange={(e) => setReferralCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-brand-200 text-center">
            <span className="text-xs text-slate-400 font-semibold uppercase">Estimated Monthly Payout</span>
            <div className="text-4xl font-black text-brand-600 mt-1">
              ₹{estimatedEarnings.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Directly credited to your UPI or Bank Account</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReferAndEarn;
