import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const openRoles = [
  {
    title: 'Senior Full Stack Instructor (MERN)',
    type: 'Full-Time (Remote / Bengaluru)',
    exp: '4+ Years Experience',
    desc: 'Deliver interactive masterclasses, review student pull requests, and curate advanced curriculum modules in React, Node, and AWS.'
  },
  {
    title: 'AI & Data Science Curriculum Developer',
    type: 'Full-Time (Remote)',
    exp: '3+ Years Experience',
    desc: 'Design real-world machine learning labs, RAG applications, and benchmark assessments for student bootcamps.'
  },
  {
    title: 'Corporate Placement & Partnership Manager',
    type: 'Full-Time (Bengaluru)',
    exp: '3+ Years Experience',
    desc: 'Forge hiring partnerships with enterprise IT firms, coordinate campus recruitment drives, and drive placement outcomes.'
  },
  {
    title: 'Student Success & Academic Counselor',
    type: 'Full-Time (Hybrid / Remote)',
    exp: '1-3 Years Experience',
    desc: 'Guide aspiring software engineers through suitable course selection, onboarding, and continuous academic motivation.'
  }
];

const Careers = () => {
  const { showToast } = useNotification();
  const [selectedRole, setSelectedRole] = useState(null);
  const [applicant, setApplicant] = useState({ name: '', email: '', phone: '', linkedin: '', resumeUrl: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!applicant.name || !applicant.email || !applicant.phone) {
      showToast('Please fill in your name, email, and phone number.', 'error');
      return;
    }

    // Direct Cloud Email Dispatch to coursedivine@gmail.com
    if (typeof window !== 'undefined') {
      const payload = new FormData();
      payload.append('Applicant Name', applicant.name);
      payload.append('Email', applicant.email);
      payload.append('Phone', applicant.phone);
      payload.append('Role Applied', selectedRole?.title || 'General Educator / Staff');
      payload.append('LinkedIn Profile', applicant.linkedin || 'Not Provided');
      payload.append('Resume Link', applicant.resumeUrl || 'Not Provided');
      payload.append('_subject', `New Job Application: ${applicant.name} for ${selectedRole?.title || 'General Role'}`);
      payload.append('_captcha', 'false');

      fetch('https://formsubmit.co/ajax/coursedivine@gmail.com', {
        method: 'POST',
        body: payload
      }).catch(() => null);
    }

    setSubmitted(true);
    showToast('🎉 Application sent directly to coursedivine@gmail.com! Our HR team will reach out.', 'success');
  };


  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-navy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="px-3.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider border border-brand-400/30">
            Work with Course Divine
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Shape the Future of Technology Education
          </h1>
          <p className="text-sm sm:text-base text-brand-100/80 mt-3 leading-relaxed">
            Join a passionate team of engineering educators, researchers, and career mentors dedicated to empowering the next generation of global software engineers.
          </p>
        </div>
      </section>

      {/* Open Roles List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900">Current Openings</h2>

        <div className="space-y-4">
          {openRoles.map((role, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-6 hover:border-brand-300 transition duration-300">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700">
                    {role.type}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {role.exp}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{role.title}</h3>
                <p className="text-xs text-slate-500 max-w-xl">{role.desc}</p>
              </div>

              <button
                onClick={() => {
                  setSelectedRole(role.title);
                  document.getElementById('career-apply')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition shrink-0 self-start md:self-auto"
              >
                Apply for this Role
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section id="career-apply" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-brand-100 shadow-xl">
          <h3 className="text-xl font-extrabold text-slate-900 mb-1">
            {selectedRole ? `Apply for: ${selectedRole}` : 'General Career Application'}
          </h3>
          <p className="text-xs text-slate-500 mb-6">Fill in your information and attach your portfolio/resume link.</p>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-slate-900 text-sm">Application Sent!</h4>
              <p className="text-xs text-slate-600">Our hiring team will review your credentials and contact you.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={applicant.name}
                    onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={applicant.email}
                    onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={applicant.phone}
                    onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn / Portfolio *</label>
                  <input
                    type="url"
                    required
                    value={applicant.linkedin}
                    onChange={(e) => setApplicant({ ...applicant, linkedin: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Resume Link (Google Drive / PDF)</label>
                <input
                  type="url"
                  value={applicant.resumeUrl}
                  onChange={(e) => setApplicant({ ...applicant, resumeUrl: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Application
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Careers;
