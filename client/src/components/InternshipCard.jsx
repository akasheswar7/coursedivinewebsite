import React from 'react';
import { Briefcase, Clock, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

const InternshipCard = ({ track, onApply }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-400 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Track Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition duration-300">
            <Briefcase className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Live Stipend / Certificate
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-2">
          {track.title}
        </h3>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          {track.description}
        </p>

        {/* Duration & Mode */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-xl">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brand-600" />
            <span>{track.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Remote / Hybrid</span>
          </div>
        </div>

        {/* Key Competencies */}
        <div className="space-y-2 mb-6">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">What You Will Master</p>
          {track.skills.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onApply(track.title)}
        className="w-full py-3 rounded-xl bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white font-bold text-xs transition duration-200 flex items-center justify-center gap-2 group-hover:shadow-md"
      >
        Apply for Internship <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default InternshipCard;
