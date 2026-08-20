import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, CheckCircle2, ArrowRight, Code, Terminal, Brain, Cloud, Shield } from 'lucide-react';

const OurProgramme = () => {
  const pathways = [
    {
      title: 'Full-Stack Software Engineering Roadmap',
      desc: 'Master the complete web ecosystem from frontend reactivity to high-scale backend microservices and database clustering.',
      steps: ['Modern JavaScript & TypeScript', 'React 18 & State Architecture', 'Node.js, Express & Microservices', 'MongoDB & SQL Optimization', 'Docker, CI/CD & AWS Deployment']
    },
    {
      title: 'Applied AI & Machine Learning Specialization',
      desc: 'Build intelligent applications using statistical modeling, neural networks, computer vision, and Generative AI pipelines.',
      steps: ['Python, NumPy & Pandas', 'Feature Engineering & Supervised ML', 'Deep Learning with PyTorch', 'LangChain, Vector DBs & RAG', 'Production Model Serving']
    },
    {
      title: 'Cloud DevOps & Site Reliability Track',
      desc: 'Automate modern infrastructure, orchestrate Kubernetes clusters, and build zero-downtime continuous deployment pipelines.',
      steps: ['Linux & Shell Automation', 'AWS Solutions Architecture', 'Terraform Infrastructure as Code', 'Kubernetes Orchestration', 'Prometheus & SRE Best Practices']
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-navy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="px-3.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider border border-brand-400/30">
            Structured Career Pathways
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Our Learning Programmes & Pedagogies
          </h1>
          <p className="text-sm sm:text-base text-brand-100/80 mt-3 leading-relaxed">
            Engineered to take learners from zero background to senior-level architectural intuition. Every pathway combines live instruction, code reviews, and enterprise capstone projects.
          </p>
        </div>
      </section>

      {/* Pathways List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {pathways.map((path, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                  Track 0{idx + 1}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{path.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">{path.desc}</p>
              </div>
              <Link
                to="/courses"
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition flex items-center gap-1.5 self-start sm:self-auto shrink-0"
              >
                Explore Courses <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4 border-t border-slate-100">
              {path.steps.map((step, sIdx) => (
                <div key={sIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-brand-100 text-brand-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                    {sIdx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default OurProgramme;
