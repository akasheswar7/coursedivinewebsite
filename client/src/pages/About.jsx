import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Target, Eye, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-navy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="px-3.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider border border-brand-400/30">
            About Course Divine
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Pioneering Industry-Driven Tech Education
          </h1>
          <p className="text-sm sm:text-base text-brand-100/80 mt-3 leading-relaxed">
            Course Divine was established with a singular mission: to eliminate the gap between university computer science degrees and the rigorous real-world demands of modern software engineering.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To democratize world-class, practical software engineering and AI education. We empower every learner, regardless of their background, with high-caliber coding mastery, production project experience, and verified career outcomes.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To become the global benchmark for practical technology training, recognized universally by employers for producing engineers with immediate day-one deployment capability and problem-solving grit.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-50/60 rounded-3xl p-8 sm:p-12 border border-brand-100">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Our Guiding Pillars</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <h4 className="font-bold text-slate-900 text-base">100% Practical Rigor</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                No rote memorization. Students build real applications with Git commits, code reviews, and cloud deployment pipelines.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <h4 className="font-bold text-slate-900 text-base">Practitioner Mentorship</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                All instructors are active staff and principal software engineers with proven industry track records.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <h4 className="font-bold text-slate-900 text-base">Outcome-Obsessed</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dedicated placement cells, resume building workshops, and direct connections with 180+ hiring partners.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
