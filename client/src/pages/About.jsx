import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ShieldCheck,
  Target,
  Eye,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  Briefcase,
  Globe2,
  BookOpen,
  Compass,
  Trophy,
  Quote,
  UserCheck
} from 'lucide-react';

const About = () => {
  const milestones = [
    {
      id: 1,
      num: '01',
      title: '300+ Industry Expert MoUs',
      desc: 'Signed Memorandums of Understanding (MoUs) with 300+ industry experts as trainers and mentors across various technical and emerging domains.',
      badge: 'Expert Network',
      icon: Users,
      color: 'from-blue-600 to-indigo-600',
      tagBg: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 2,
      num: '02',
      title: '1,000+ Certified Learners',
      desc: 'Successfully delivered comprehensive training and certification programs to 1,000+ students, enhancing their technical capabilities and professional employability.',
      badge: 'Training Excellence',
      icon: GraduationCap,
      color: 'from-emerald-600 to-teal-600',
      tagBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 3,
      num: '03',
      title: 'Collaboration with E-Cell, IIT Tirupati',
      desc: 'Established a strategic collaboration with E-Cell, IIT Tirupati to promote innovation, student entrepreneurship, and hands-on skill development initiatives.',
      badge: 'Institutional Partner',
      icon: Building2,
      color: 'from-[#071F3F] to-[#0F62FE]',
      tagBg: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      id: 4,
      num: '04',
      title: 'E-Internship Opportunities Across AP & Telangana',
      desc: 'Provided verified E-Internship opportunities to students from various government and private universities across Andhra Pradesh and Telangana, enabling industry-oriented learning experiences.',
      badge: 'Statewide Impact',
      icon: Briefcase,
      color: 'from-amber-500 to-orange-600',
      tagBg: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 5,
      num: '05',
      title: '500+ Corporate Placements',
      desc: 'Successfully facilitated the placement of 500+ students in leading MNCs, high-growth technology companies, and reputed organizations in India and abroad.',
      badge: 'Career Success',
      icon: Trophy,
      color: 'from-purple-600 to-pink-600',
      tagBg: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  const globalUniversities = [
    'Technical University of Munich (TUM)',
    'RWTH Aachen University',
    'Columbia University',
    'Cornell University',
    'University of Cambridge',
    'Harvard University',
    'University of Waterloo',
    'University of Toronto',
    'University of Sydney'
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#061833] via-[#0C2A52] to-[#061833] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#0F62FE_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/20 text-sky-300 text-xs font-black uppercase tracking-widest border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" /> About Course Divine Technology Pvt. Ltd.
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Bridging Education & Employability Through Technology
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            Course Divine Technology Pvt. Ltd. is an industry-driven e-learning and career-enablement ecosystem dedicated to transforming student aspirations into high-impact global careers.
          </p>
        </div>
      </section>

      {/* Founder Story & Background */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-xl relative overflow-hidden space-y-10">
          
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">
            
            {/* Founder Visual & Profile Card */}
            <div className="w-full lg:w-96 shrink-0 space-y-4">
              <div className="relative group">
                <div className="w-full aspect-[4/5] rounded-3xl bg-gradient-to-br from-[#071F3F] via-[#0D366D] to-[#0F62FE] p-1.5 shadow-2xl overflow-hidden flex flex-col items-center justify-center text-center relative">
                  
                  {/* Official Founder Photo & Badge */}
                  <div className="w-full h-full rounded-[22px] overflow-hidden relative flex flex-col justify-end bg-slate-900">
                    <img
                      src="/founder.png"
                      alt="Ch. Jhansi - Founder, Course Divine Technology"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />

                    {/* Bottom Info Gradient Strip */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-5 text-white space-y-2 pt-16">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-xl font-black text-white">Ch. Jhansi</h3>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                        </div>
                        <p className="text-xs text-sky-300 font-bold uppercase tracking-wider">Founder & Director</p>
                        <p className="text-[11px] text-slate-300">Course Divine Technology Pvt. Ltd.</p>
                      </div>

                      <div className="pt-1.5 border-t border-white/15">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                          🎓 M.A. Psychology (Arunodaya University)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">

                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#0F62FE]" /> Core Specialization:
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Career Counseling, Student Mentoring, Global University Guidance, and Technical Skill Development.
                </p>
              </div>
            </div>

            {/* Founder Biography & Vision Story */}
            <div className="flex-1 space-y-6">
              <div>
                <span className="text-xs font-black tracking-widest text-[#0F62FE] uppercase">
                  ⭐ Leadership & Vision
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
                  Founder Story & Background
                </h2>
                <h4 className="text-base sm:text-lg font-bold text-slate-700 mt-1">
                  Ch. Jhansi — Founder, Course Divine Technology Pvt. Ltd.
                </h4>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                <p>
                  <strong>Ch. Jhansi</strong>, the Founder of Course Divine Technology Pvt. Ltd., is a passionate education professional, career mentor, and aspiring entrepreneur dedicated to transforming the learning journey of students through technology-driven education.
                </p>
                <p>
                  She holds a <strong>Master’s Degree in Psychology</strong> from <em>Arunodaya University, Arunachal Pradesh</em>, and brings extensive experience in <strong>career counseling, student mentoring, and educational guidance</strong>. Throughout her professional journey, she has guided numerous students in making informed academic and career decisions, helping them secure admissions to prestigious universities across the globe.
                </p>
                
                {/* Global Admissions Highlight Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-200 space-y-3">
                  <div className="text-xs font-extrabold text-blue-900 flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-[#0F62FE]" /> Global Higher Education Mentorship Portfolio:
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Her counseling expertise has supported students in pursuing higher education at internationally renowned institutions worldwide:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {globalUniversities.map((uni, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-900 font-bold text-[11px] shadow-sm"
                      >
                        🏛️ {uni}
                      </span>
                    ))}
                  </div>
                </div>

                <p>
                  Driven by a vision to empower learners and bridge the gap between education and employability, she founded <strong>Course Divine Technology Pvt. Ltd.</strong> with the mission of creating a comprehensive e-learning ecosystem that delivers industry-relevant training, skill development, internships, certifications, and placement support.
                </p>
                <p>
                  Recognizing the growing need for practical, career-oriented education, she envisioned a platform that not only equips students with in-demand skills but also connects them with industry experts and global career opportunities. Under her leadership, Course Divine continues to expand its impact by offering innovative learning solutions designed to enhance employability and prepare students for success in both national and international job markets.
                </p>
                <p className="text-slate-800 font-semibold italic border-l-4 border-[#0F62FE] pl-4 py-1">
                  "Her long-term vision is to make Course Divine a leading global learning platform that empowers millions of students through quality education, industry collaboration, and career-focused training programs."
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Key Milestones Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black tracking-widest text-[#0F62FE] uppercase">
            🏆 Proven Impact & Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Key Milestones of Course Divine Technology Pvt. Ltd.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Transforming technical education across universities, industry ecosystems, and global hiring networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {milestones.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-[#0F62FE] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${m.tagBg}`}>
                      {m.badge}
                    </span>
                    <span className="text-2xl font-black text-slate-200 group-hover:text-[#0F62FE] transition font-mono">
                      {m.num}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#071F3F] to-[#0F62FE] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#0F62FE] transition">
                    {m.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Verified Milestone</span>
                </div>
              </div>
            );
          })}

          {/* Strategic IIT Collaboration Spotlight Card */}
          <div className="bg-gradient-to-br from-[#071F3F] via-[#0C2A52] to-[#071F3F] text-white rounded-3xl p-6 sm:p-8 border border-[#0D366D] shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-black uppercase tracking-wider border border-blue-400/30">
                Institutional Tie-Up
              </span>
              <h3 className="text-xl font-black text-white">
                Partnered with E-Cell, IIT Tirupati
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Active collaboration focused on student entrepreneurship, technological innovation bootcamps, and career incubation for engineering students.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                to="/courses"
                className="w-full py-3 rounded-xl bg-[#0F62FE] hover:bg-blue-600 text-white font-extrabold text-xs transition shadow-lg flex items-center justify-center gap-2"
              >
                Join Certified Programs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To democratize world-class, practical technology and engineering education. We empower every learner, regardless of their background, with high-caliber industry training, production project experience, verified internships, and placement assistance.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To make Course Divine a leading global learning platform that empowers millions of students through quality education, academic guidance, industry collaboration, and career-focused training programs.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-black text-sky-400 uppercase tracking-widest">Our Guiding Pillars</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">The Course Divine Standard</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 shadow-sm space-y-2">
              <h4 className="font-bold text-white text-base">100% Practical Rigor</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                No rote learning. Students build production-ready projects, submit GitHub pull requests, and solve real-world industry engineering challenges.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 shadow-sm space-y-2">
              <h4 className="font-bold text-white text-base">300+ Industry Mentors</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct instruction and code reviews conducted by active staff engineers and domain leaders from top tech enterprises.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 shadow-sm space-y-2">
              <h4 className="font-bold text-white text-base">Outcome-Obsessed</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated placement cells, resume refinement workshops, and direct referral drives with 500+ successful student placements.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;

