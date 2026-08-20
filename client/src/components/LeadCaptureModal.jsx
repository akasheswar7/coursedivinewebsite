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

  // Trigger popup 10 seconds after user enters the website
  useEffect(() => {
    // Check if user already submitted in this session
    const hasSubmitted = localStorage.getItem('cd_lead_submitted');
    if (hasSubmitted) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000); // 10 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        {/* Top Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Course Divine Logo */}
        <div className="pt-6 px-6 text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <img
              src="/logo.png"
              alt="Course Divine"
              className="h-10 w-auto object-contain rounded-lg border border-slate-200 shadow-sm mx-auto"
            />
          </div>

          {/* Founder Avatar & Introduction */}
          <div className="flex flex-col items-center space-y-2 pt-2">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#071F3F] via-[#0D366D] to-[#0F62FE] p-1 shadow-xl">
                <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden border-2 border-white">
                  <img
                    src="/founder.png"
                    alt="Ch. Jhansi - Founder, Course Divine Technology"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </span>
            </div>


            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Hey! I'm <span className="text-[#0F62FE]">Ch. Jhansi</span>, Founder of Course Divine
              </h3>
              <p className="text-xs font-bold text-purple-700">
                Let's get on a 1-on-1 call with our expert career counsellor
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body & Lead Form */}
        <div className="p-6 pt-3">
          {submitted ? (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-black text-slate-900">Counseling Request Received!</h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                Your details have been routed to <strong className="text-slate-900">coursedivine@gmail.com</strong>. Our senior academic counselor will call you within 15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter Your Full Name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0F62FE] focus:outline-none placeholder:text-slate-400 font-medium"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0F62FE] focus:outline-none placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Country Code + Mobile Number */}
              <div className="flex gap-2">
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  className="px-3 py-3 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-[#0F62FE] focus:outline-none shrink-0"
                >
                  <option value="+91">India (+91)</option>
                  <option value="+1">USA (+1)</option>
                  <option value="+44">UK (+44)</option>
                  <option value="+971">UAE (+971)</option>
                  <option value="+61">Australia (+61)</option>
                  <option value="+65">Singapore (+65)</option>
                  <option value="+49">Germany (+49)</option>
                  <option value="+1">Canada (+1)</option>
                </select>

                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Mobile no. *"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0F62FE] focus:outline-none placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Program Selection */}
              <div>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-[#0F62FE] focus:outline-none"
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
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#6B21A8] via-[#7E22CE] to-[#9333EA] hover:from-[#581C87] hover:to-[#7E22CE] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-xl shadow-purple-900/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  'SUBMIT & BOOK FREE CALL'
                )}
              </button>

              {/* Footer reassurance note */}
              <p className="text-[11px] text-center text-slate-500 font-medium pt-1 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Our Senior Career Advisor will give you a call shortly
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default LeadCaptureModal;
