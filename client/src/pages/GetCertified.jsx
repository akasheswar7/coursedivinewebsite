import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, CheckCircle2, QrCode, Search, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

const GetCertified = () => {
  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-navy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="px-3.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider border border-brand-400/30">
            Globally Recognized Credentials
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Course Divine Professional Certification
          </h1>
          <p className="text-sm sm:text-base text-brand-100/80 mt-3 leading-relaxed">
            Validate your software engineering and data science capabilities with our cryptographically verifiable, industry-standard credentials recognized by recruiters worldwide.
          </p>
          <div className="mt-6">
            <Link
              to="/verify-certificate"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm shadow-lg transition"
            >
              <Search className="w-4 h-4" /> Verify an Existing Certificate
            </Link>
          </div>
        </div>
      </section>

      {/* Certification Process Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            How to Earn Your Certificate
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Follow our rigorous 4-step pathway to graduation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 font-extrabold text-lg flex items-center justify-center mx-auto">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Enroll & Complete Lessons</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Complete 100% of video masterclasses and complete hands-on coding exercises.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 font-extrabold text-lg flex items-center justify-center mx-auto">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Build Capstone Projects</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Develop end-to-end production applications adhering to clean architecture standards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 font-extrabold text-lg flex items-center justify-center mx-auto">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Mentor Code Review</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Submit your GitHub repository for line-by-line review by staff software engineers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 font-extrabold text-lg flex items-center justify-center mx-auto">
              4
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Certificate Issuance</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Receive your verifiable digital credential, shareable on LinkedIn and portfolios.
            </p>
          </div>
        </div>
      </section>

      {/* Certificate Specimen Card Preview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-4 border-brand-200 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white flex items-center justify-center mx-auto shadow-md shadow-brand-600/30">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-600">
                COURSE DIVINE CERTIFICATE OF EXCELLENCE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-serif">
                Full Stack Web Development (MERN Mastery)
              </h3>
            </div>

            <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
              This is to officially certify that <strong>Rohan Sharma</strong> has successfully demonstrated competency in React 18, Node.js, Express, MongoDB and Cloud Deployment with <strong>Distinction (A+)</strong>.
            </p>

            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Certificate ID: <strong className="font-mono text-slate-900">CD-CERT-884920</strong></span>
              </div>
              <Link
                to="/verify-certificate?id=CD-CERT-884920"
                className="text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1"
              >
                Test Live Verification <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetCertified;
