import React from 'react';

const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Legal & Compliance
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Terms and Conditions</h1>
        <p className="text-xs text-slate-400 mt-1">Last Updated: February 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">1. Course Access & Intellectual Property</h3>
          <p>
            Enrolling in Course Divine programs grants a single personal, non-transferable lifetime license to stream lecture content, download project assets, and participate in mentor support forums. Sharing account credentials is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">2. Certification Criteria</h3>
          <p>
            Certificates of Completion and Distinction are awarded only upon 100% video milestone completion and successful submission of required capstone project codebases.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">3. 7-Day Money-Back Guarantee</h3>
          <p>
            If you are not fully satisfied with your course experience, you may request a 100% refund within 7 days of purchase, provided less than 25% of the curriculum has been completed.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;
