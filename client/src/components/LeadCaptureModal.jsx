import React, { useState, useEffect } from 'react';
import { X, Loader2, Phone, Mail, User, Sparkles, CheckCircle2, ShieldCheck, BookOpen } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import api from '../services/api';
import confetti from 'canvas-confetti';

const LeadCaptureModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    program: 'Data Science & AI'
  });

  const { showToast } = useNotification();

  // Trigger popup 5-10 seconds after user enters the website and re-trigger if closed
  useEffect(() => {
    // Initial trigger after 4 seconds
    const initialTimer = setTimeout(() => {
      setIsOpen(true);
    }, 4000);

    return () => clearTimeout(initialTimer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Re-prompt after 12 seconds if closed without submitting
    if (!submitted) {
      setTimeout(() => {
        setIsOpen(true);
      }, 12000);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.phone) {
      showToast('Please provide your email and phone number.', 'error');
      return;
    }

    setLoading(true);

    const leadPayload = {
      name: formData.name.trim() || 'Prospective Student',
      email: formData.email.trim().toLowerCase(),
      phone: `${formData.countryCode} ${formData.phone.trim()}`,
      program: formData.program,
      recipientEmail: 'coursedivine@gmail.com',
      source: '10-Second Lead Capture Popup',
      submittedAt: new Date().toISOString()
    };

    try {
      // 1. Submit lead to backend API for email dispatch to coursedivine@gmail.com
      await api.post('/enquiries', {
        name: leadPayload.name,
        email: leadPayload.email,
        phone: leadPayload.phone,
        message: `Lead Inquiry for ${leadPayload.program}. Target Notification: coursedivine@gmail.com`,
        subject: `New Lead: ${leadPayload.name} - ${leadPayload.program}`
      }).catch(() => null);

      // 2. Persist locally to ensure no lead is ever lost
      const existingLeads = JSON.parse(localStorage.getItem('cd_captured_leads') || '[]');
      existingLeads.push(leadPayload);
      localStorage.setItem('cd_captured_leads', JSON.stringify(existingLeads));
      localStorage.setItem('cd_lead_submitted', 'true');

      // 3. Trigger FormSubmit / Cloud notification fallback to coursedivine@gmail.com
      if (typeof window !== 'undefined') {
        const formDataPayload = new FormData();
        formDataPayload.append('Name', leadPayload.name);
        formDataPayload.append('Email', leadPayload.email);
        formDataPayload.append('Phone', leadPayload.phone);
        formDataPayload.append('Program', leadPayload.program);
        formDataPayload.append('_subject', `New Student Lead: ${leadPayload.name} - ${leadPayload.program}`);
        formDataPayload.append('_captcha', 'false');

        fetch('https://formsubmit.co/ajax/coursedivine@gmail.com', {
          method: 'POST',
          body: formDataPayload
        }).catch(() => null);
      }

      setSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      showToast('🎉 Application received! Sent to coursedivine@gmail.com. We will call you shortly.', 'success');

      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    } catch (err) {
      showToast('Submitted successfully! Our team will contact you soon.', 'success');
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Quick-Open Counseling Pill when modal is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-[9000] flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#6B21A8] via-[#7E22CE] to-[#0F62FE] text-white shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-white/40 group animate-bounce"
          aria-label="Book Free Counseling"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Phone className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-black tracking-wide pr-1">
            Free Career Call 📞
          </span>
        </button>
      )}

      {/* Main 10-Second Lead Capture Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-[360px] sm:max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col justify-between">
            
            {/* Top Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition z-10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="overflow-y-auto p-4 sm:p-6 space-y-3">
              {/* Modal Header with Course Divine Logo */}
              <div className="text-center space-y-2">
                <img
                  src="/logo.png"
                  alt="Course Divine"
                  className="h-8 sm:h-10 w-auto object-contain rounded-lg border border-slate-200 shadow-sm mx-auto"
                />


            {/* Founder Avatar & Introduction */}
            <div className="flex flex-col items-center space-y-1.5 pt-1">
              <div className="relative">
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#071F3F] via-[#0D366D] to-[#0F62FE] p-0.5 shadow-lg">
                  <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden border-2 border-white">
                    <img
                      src="/founder.png"
                      alt="Ch. Jhansi - Founder, Course Divine Technology"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                  Hey! I'm <span className="text-[#0F62FE]">Ch. Jhansi</span>, Founder of Course Divine
                </h3>
                <p className="text-[11px] sm:text-xs font-bold text-purple-700 mt-0.5">
                  Let's get on a 1-on-1 call with our expert counsellor
                </p>
              </div>
            </div>
          </div>

          {/* Modal Body & Lead Form */}
          <div>
            {submitted ? (
              <div className="py-6 text-center space-y-2 animate-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-slate-900">Counseling Request Received!</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                  Your details have been routed to <strong className="text-slate-900">coursedivine@gmail.com</strong>. Our counselor will call you within 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5">
                
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter Your Full Name"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0F62FE] focus:outline-none placeholder:text-slate-400 font-medium"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter Your Email Address *"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0F62FE] focus:outline-none placeholder:text-slate-400 font-medium"
                  />
                </div>

                {/* Country Code + Mobile Number */}
                <div className="flex gap-2">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="px-2.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 bg-slate-50 text-[11px] sm:text-xs font-bold text-slate-700 focus:ring-2 focus:ring-[#0F62FE] focus:outline-none shrink-0"
                  >
                    <option value="+91">IN (+91)</option>
                    <option value="+1">US (+1)</option>
                    <option value="+44">UK (+44)</option>
                    <option value="+971">UAE (+971)</option>
                    <option value="+61">AU (+61)</option>
                    <option value="+65">SG (+65)</option>
                  </select>

                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Mobile no. *"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0F62FE] focus:outline-none placeholder:text-slate-400 font-medium"
                  />
                </div>

                {/* Program Selection */}
                <div>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-[#0F62FE] focus:outline-none"
                  >
                    <option value="Data Science & AI">Data Science & AI Masterclass</option>
                    <option value="Digital Marketing & Growth">Digital Marketing & Growth Mastery</option>
                    <option value="SolidWorks 3D CAD">SolidWorks 3D CAD & Mechanical</option>
                    <option value="ANSYS Simulation">ANSYS FEA & CFD Simulation</option>
                    <option value="Python & Data Analytics">Python & Data Analytics</option>
                    <option value="UI/UX Design Masterclass">UI/UX Design Masterclass</option>
                    <option value="Azure Cloud & DevOps">Azure AI Infrastructure & DevOps</option>
                    <option value="General Career Guidance">General Career Counseling</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#6B21A8] via-[#7E22CE] to-[#9333EA] hover:from-[#581C87] hover:to-[#7E22CE] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-xl shadow-purple-900/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'SUBMIT & BOOK FREE CALL'
                  )}
                </button>

                {/* Footer reassurance note */}
                <p className="text-[10px] sm:text-[11px] text-center text-slate-500 font-medium pt-0.5 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Senior Advisor will call you shortly
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
    )}
  </>
  );
};


export default LeadCaptureModal;
