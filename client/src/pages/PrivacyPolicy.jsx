import React from 'react';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Legal & Compliance
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Privacy Policy</h1>
        <p className="text-xs text-slate-400 mt-1">Last Updated: February 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">1. Information We Collect</h3>
          <p>
            Course Divine collects personal information such as your name, email address, phone number, university details, and billing information exclusively to provide training masterclasses, issue verified certificates, and coordinate placement support.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">2. Data Security & Encryption</h3>
          <p>
            We implement 256-bit SSL encryption, token-based authentication (JWT), and secure payment gateway tokenization. We do not store raw credit/debit card numbers on our servers.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">3. Third-Party Sharing</h3>
          <p>
            Your details are never sold to advertisers. Student resumes are shared strictly with authorized recruitment partners only with your explicit consent during placement drives.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
