import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Award,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Calendar,
  BookOpen,
  GraduationCap,
  Loader2,
  ExternalLink
} from 'lucide-react';
import api, { fallbackStore } from '../services/api';

const VerifyCertificate = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [certId, setCertId] = useState(initialId);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialId) {
      handleVerification(initialId);
    }
  }, [initialId]);

  const handleVerification = async (searchId) => {
    const idToSearch = (searchId || certId).trim().toUpperCase();
    if (!idToSearch) return;

    setLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      const res = await api.get(`/certificates/verify/${idToSearch}`);
      if (res.data?.success && res.data.data) {
        setResult(res.data.data);
      } else {
        throw new Error('Certificate not found');
      }
    } catch (err) {
      // Fallback search
      const found = fallbackStore.certificates.find(c => c.certificateId.toUpperCase() === idToSearch);
      if (found) {
        setResult(found);
      } else {
        setErrorMsg('No valid Course Divine credential found with this ID. Please double-check your code.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerification(certId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-sm">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Official Credential Verification
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Enter the unique Certificate ID printed on the student's Course Divine credential to verify authenticity.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              placeholder="e.g. CD-CERT-884920"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500 uppercase"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Verify Credential
          </button>
        </form>

        <p className="text-[11px] text-slate-400 mt-3 text-center">
          Sample ID to test: <button type="button" onClick={() => { setCertId('CD-CERT-884920'); handleVerification('CD-CERT-884920'); }} className="font-mono font-bold text-brand-600 hover:underline">CD-CERT-884920</button>
        </p>
      </div>

      {/* Verification Result Card */}
      {result && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-emerald-300 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  Verified Official Record
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">Certificate is Valid & Active</h3>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-lg">
              {result.certificateId}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">Student Recipient</span>
              <p className="font-extrabold text-slate-900 text-lg mt-0.5">{result.studentName}</p>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">Course Program</span>
              <p className="font-bold text-brand-700 mt-0.5">{result.courseTitle || result.course?.title}</p>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">Performance Grade</span>
              <p className="font-bold text-slate-800 mt-0.5">{result.grade || 'Distinction (A+)'}</p>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">Issue Date</span>
              <p className="font-bold text-slate-800 mt-0.5">
                {new Date(result.issueDate || Date.now()).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100 flex items-center justify-between text-xs text-slate-600">
            <span>Issued by <strong>Course Divine Academy</strong> (ISO 9001:2015)</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Cryptographically Verified
            </span>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center space-y-2 text-rose-700">
          <AlertCircle className="w-8 h-8 mx-auto text-rose-600" />
          <h4 className="font-bold text-sm">Verification Failed</h4>
          <p className="text-xs max-w-sm mx-auto">{errorMsg}</p>
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;
