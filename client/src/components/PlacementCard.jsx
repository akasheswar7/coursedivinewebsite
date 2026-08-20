import React from 'react';
import { Building2, Award, Quote } from 'lucide-react';

const PlacementCard = ({ placement }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-brand-300 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Header: Student & Package */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={placement.studentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={placement.studentName}
              className="w-12 h-12 rounded-full object-cover border-2 border-brand-200 shadow-sm"
              loading="lazy"
            />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{placement.studentName}</h4>
              <p className="text-xs text-slate-500">{placement.courseTaken}</p>
            </div>
          </div>
          <div className="bg-emerald-50 text-emerald-700 font-extrabold text-xs px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
            {placement.salaryPackage}
          </div>
        </div>

        {/* Company & Role Badge */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-50/50 border border-brand-100 mb-4">
          <Building2 className="w-4 h-4 text-brand-600 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-slate-800">{placement.companyName}</span>
            <span className="text-slate-400 mx-1.5">•</span>
            <span className="text-brand-700 font-medium">{placement.jobRole}</span>
          </div>
        </div>

        {/* Testimonial */}
        <p className="text-xs text-slate-600 italic leading-relaxed relative pl-4 border-l-2 border-brand-300">
          "{placement.testimonial}"
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1 text-brand-600 font-semibold">
          <Award className="w-3.5 h-3.5" /> Verified Placement
        </span>
        <span>Batch {placement.year || 2025}</span>
      </div>
    </div>
  );
};

export default PlacementCard;
