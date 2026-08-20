import React from 'react';
import { Linkedin, Twitter, Github, Award } from 'lucide-react';

const teamMembers = [
  {
    name: 'Vikramaditya Sengupta',
    role: 'Staff Software Architect & Lead Instructor',
    company: 'Ex-Amazon, 12+ Yrs Exp',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Pioneered distributed systems handling 1M+ req/sec. Mentored over 10,000 students globally into top-tier tech roles.'
  },
  {
    name: 'Dr. Ananya Mukherjee',
    role: 'Head of AI & Data Science Curriculum',
    company: 'Ph.D. Computer Science, 9+ Yrs Exp',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Specialist in Large Language Models, Transformer architectures, and industrial computer vision algorithms.'
  },
  {
    name: 'Aditya Verma',
    role: 'Principal Cloud & DevOps Architect',
    company: 'AWS Ambassador, 10+ Yrs Exp',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Architected multi-region Kubernetes clusters and automated GitOps continuous deployment infrastructure.'
  },
  {
    name: 'Pooja Iyer',
    role: 'Lead Product Designer & UX Mentor',
    company: 'Ex-Swiggy, 8+ Yrs Exp',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Passionate about crafting human-centered UI/UX design systems and preparing designers for high-impact product teams.'
  }
];

const OurTeam = () => {
  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-navy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="px-3.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider border border-brand-400/30">
            World-Class Faculty
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Meet the Mentors Behind Course Divine
          </h1>
          <p className="text-sm sm:text-base text-brand-100/80 mt-3 leading-relaxed">
            Our faculty consists of active senior architects, engineering directors, and AI researchers from top tech enterprises who teach what actually works in production.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{member.name}</h3>
                <p className="text-xs font-semibold text-brand-600 mt-0.5">{member.role}</p>
                <p className="text-[11px] font-bold text-slate-400 mt-0.5">{member.company}</p>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">{member.bio}</p>
              </div>

              <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-100">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-brand-50 text-slate-500 hover:text-brand-600 flex items-center justify-center transition">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-brand-50 text-slate-500 hover:text-brand-600 flex items-center justify-center transition">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-brand-50 text-slate-500 hover:text-brand-600 flex items-center justify-center transition">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
