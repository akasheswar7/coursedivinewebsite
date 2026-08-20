import React, { useState, useEffect } from 'react';
import {
  Award,
  TrendingUp,
  Building2,
  Users,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import api, { fallbackStore } from '../services/api';
import PlacementCard from '../components/PlacementCard';

const Placements = () => {
  const [placements, setPlacements] = useState(fallbackStore.placements);
  const [search, setSearch] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('All');

  useEffect(() => {
    api.get('/placements')
      .then((res) => {
        if (res.data?.success && res.data.data.length > 0) {
          setPlacements(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const companiesList = ['All', 'Microsoft', 'Amazon', 'Deloitte', 'Swiggy', 'Oracle', 'PwC India'];

  const filteredPlacements = placements.filter((p) => {
    const matchesSearch =
      p.studentName.toLowerCase().includes(search.toLowerCase()) ||
      p.companyName.toLowerCase().includes(search.toLowerCase()) ||
      p.jobRole.toLowerCase().includes(search.toLowerCase());

    const matchesCompany =
      selectedCompany === 'All' ||
      p.companyName.toLowerCase() === selectedCompany.toLowerCase();

    return matchesSearch && matchesCompany;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-navy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="px-3.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider border border-brand-400/30">
            Course Divine Placement Cell
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Proven Career Transformations
          </h1>
          <p className="text-sm sm:text-base text-brand-100/80 mt-3 leading-relaxed">
            Our comprehensive technical curriculum, 1-on-1 resume reviews, and rigorous mock interview simulations have helped over 1,450+ learners crack tier-1 technology organizations.
          </p>
        </div>
      </section>

      {/* Placement Statistics Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-brand-100 shadow-sm text-center">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">1,450+</div>
            <p className="text-xs font-bold text-slate-500 mt-1">Students Placed</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-100 shadow-sm text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">36.5 LPA</div>
            <p className="text-xs font-bold text-slate-500 mt-1">Highest Package Offered</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-100 shadow-sm text-center">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">8.8 LPA</div>
            <p className="text-xs font-bold text-slate-500 mt-1">Average Starting Package</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-100 shadow-sm text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">180+</div>
            <p className="text-xs font-bold text-slate-500 mt-1">Corporate Hiring Partners</p>
          </div>
        </div>
      </section>

      {/* Filter & Search Placement Records */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student, role, or company..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {companiesList.map((comp) => (
              <button
                key={comp}
                onClick={() => setSelectedCompany(comp)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                  selectedCompany === comp
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {comp}
              </button>
            ))}
          </div>
        </div>

        {/* Placements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlacements.map((placement) => (
            <PlacementCard key={placement._id} placement={placement} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Placements;
