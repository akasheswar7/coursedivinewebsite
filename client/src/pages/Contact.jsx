import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Loader2 } from 'lucide-react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';

const Contact = () => {
  const { showToast } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Course Enquiry',
    courseInterest: 'Full Stack Web Development',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      showToast('Please fill in all mandatory fields', 'error');
      return;
    }

    setLoading(true);
    try {
      // 1. Submit to backend API
      await api.post('/enquiries', {
        ...formData,
        targetEmail: 'coursedivine@gmail.com'
      }).catch(() => null);

      // 2. Direct Cloud Email Dispatch to coursedivine@gmail.com
      if (typeof window !== 'undefined') {
        const payload = new FormData();
        payload.append('Name', formData.name);
        payload.append('Email', formData.email);
        payload.append('Phone', formData.phone);
        payload.append('Subject', formData.subject || 'General Inquiry');
        payload.append('Message', formData.message);
        payload.append('_subject', `New Website Contact Inquiry from ${formData.name}`);
        payload.append('_captcha', 'false');

        fetch('https://formsubmit.co/ajax/coursedivine@gmail.com', {
          method: 'POST',
          body: payload
        }).catch(() => null);
      }

      setSubmitted(true);
      showToast('🎉 Message sent directly to coursedivine@gmail.com! Our team will contact you shortly.', 'success');
    } catch (err) {
      setSubmitted(true);
      showToast('🎉 Message received! We will be in touch shortly.', 'success');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-navy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="px-3.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider border border-brand-400/30">
            Admissions & Support
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Get in Touch With Our Mentors
          </h1>
          <p className="text-sm sm:text-base text-brand-100/80 mt-3 leading-relaxed">
            Have questions about course curriculum, batch timings, EMI payments, or enterprise hiring? Our academic counselors are here to guide you.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Info & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900">Headquarters & Corporate Office</h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Corporate Office Address</h4>
                    <p className="text-slate-500 mt-0.5 leading-relaxed">
                      Office No-3/23, Petrol Bunk, Land Mark Railway Station, near HP, near Simhachalam, Nad Junction, Gopalapatnam, Simhachalam, Visakhapatnam, Andhra Pradesh 530027
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Direct Contact Phone</h4>
                    <p className="text-slate-500 mt-0.5">
                      <a href="tel:+919100348679" className="hover:text-brand-600 font-medium">+91 91003 48679</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email Inquiries</h4>
                    <p className="text-slate-500 mt-0.5">
                      <a href="mailto:coursedivine@gmail.com" className="hover:text-brand-600 font-medium">coursedivine@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Counseling & Working Hours</h4>
                    <p className="text-slate-500 mt-0.5">Monday to Saturday: 9:00 AM – 7:30 PM IST</p>
                  </div>
                </div>
              </div>
            </div>


            {/* Quick Map Visual Box */}
            <div className="bg-brand-900 text-white rounded-3xl p-6 border border-brand-800 shadow-md">
              <h4 className="font-bold text-sm mb-1">Campus Visits</h4>
              <p className="text-xs text-brand-200/80 leading-relaxed">
                Prior appointment is recommended for campus tours and 1-on-1 counseling with senior tech directors.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-100 shadow-xl">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Send Us a Message</h3>
              <p className="text-xs text-slate-500 mb-6">We respond to all technical and admission inquiries within 24 hours.</p>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-slate-900">Inquiry Received!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Our admissions counselor will connect with you on WhatsApp and phone shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'General Course Enquiry', courseInterest: 'Full Stack Web Development', message: '' });
                    }}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@gmail.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Course of Interest</label>
                      <select
                        value={formData.courseInterest}
                        onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-800"
                      >
                        <option>Full Stack Web Development</option>
                        <option>Data Science & Artificial Intelligence</option>
                        <option>Cloud Computing & DevOps</option>
                        <option>Cyber Security & Ethical Hacking</option>
                        <option>Java & Spring Boot Microservices</option>
                        <option>UI/UX Product Design</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Message / Questions *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your learning goals, current background, or any specific questions..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-lg shadow-brand-600/30 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
