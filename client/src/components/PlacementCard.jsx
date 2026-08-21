import React from 'react';
import { Building2, Award, BookOpen, CheckCircle2 } from 'lucide-react';

const PlacementCard = ({ placement }) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-[#0F62FE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden">
      
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F62FE] to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="space-y-4">
        {/* Header: Student & Company Logo */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <img
                src={placement.studentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={placement.studentName}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                }}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 group-hover:border-[#0F62FE] shadow-md transition-colors"
                loading="lazy"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">
                ✓
              </span>
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-[#0F62FE] transition-colors">
                {placement.studentName}
              </h4>
              <p className="text-xs text-slate-600 font-bold mt-0.5">
                {placement.jobRole || placement.designation}
              </p>
            </div>
          </div>

          {/* Company Logo / Badge */}
          {placement.companyLogo ? (
            <div className="h-10 max-w-[100px] p-1.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
              <img
                src={placement.companyLogo}
                alt={placement.companyName}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="bg-blue-50 text-[#0F62FE] font-black text-xs px-3 py-1 rounded-xl border border-blue-100 shrink-0">
              {placement.companyName}
            </div>
          )}
        </div>

        {/* Company & Designation Info Banner */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            <Building2 className="w-4 h-4 text-[#0F62FE] shrink-0" />
            <span className="font-extrabold text-slate-900">{placement.companyName}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold pl-6">
            <span>Designation:</span>
            <span className="text-[#0F62FE] font-bold">{placement.jobRole || placement.designation}</span>
          </div>
        </div>

        {/* Course Taken */}
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="font-medium text-slate-500">Course:</span>
          <span className="font-bold text-slate-900">{placement.courseTaken || placement.course}</span>
        </div>

        {/* Testimonial if provided */}
        {placement.testimonial && (
          <p className="text-xs text-slate-600 italic leading-relaxed pl-3 border-l-2 border-[#0F62FE]/40">
            "{placement.testimonial}"
          </p>
        )}
      </div>

      {/* Footer Verified Placement Badge */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 text-emerald-600 font-black text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Course Divine Placed
        </span>
        {placement.salaryPackage ? (
          <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-extrabold text-[11px] border border-emerald-200">
            {placement.salaryPackage}
          </span>
        ) : (
          <span className="text-slate-400 font-bold text-[11px]">Batch {placement.year || 2026}</span>
        )}
      </div>
    </div>
  );
};

export default PlacementCard;

