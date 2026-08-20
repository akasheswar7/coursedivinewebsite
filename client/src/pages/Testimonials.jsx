import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Quote,
  CheckCircle2,
  Sparkles,
  Award,
  ArrowRight,
  Search,
  Filter,
  MessageSquareQuote,
  HeartHandshake,
  GraduationCap,
  Building2,
  ThumbsUp
} from 'lucide-react';

// Student Photos
import t1Photo from '../assets/testimonials/t1_shashikant.png';
import t2Photo from '../assets/testimonials/t2_rohit.png';
import t3Photo from '../assets/testimonials/t3_prasanth.png';
import t4Photo from '../assets/testimonials/t4_rakesh.png';
import t5Photo from '../assets/testimonials/t5_veerendra.png';
import t6Photo from '../assets/testimonials/t6_srilatha.png';
import t7Photo from '../assets/testimonials/t7_saugata.png';
import t8Photo from '../assets/testimonials/t8_umashankar.png';
import t9Photo from '../assets/testimonials/t9_saikona.png';
import t10Photo from '../assets/testimonials/t10_gidla.png';
import t11Photo from '../assets/testimonials/t11_aarif.png';
import t12Photo from '../assets/testimonials/t12_lalitha.png';
import t13Photo from '../assets/testimonials/t13_maniyadav.png';

const testimonialsData = [
  {
    id: 't1',
    name: 'Shashikant Kalaburgi',
    course: 'SAP PM Certified Course',
    category: 'SAP ERP',
    rating: 5,
    photo: t1Photo,
    date: 'Verified Student',
    highlight: 'Practical, well-structured and easy to understand.',
    review: 'Completed my SAP PM course at Course Divine. The training was practical, well-structured, and easy to understand. Thank you, Course Divine, for the valuable learning experience.'
  },
  {
    id: 't2',
    name: 'Rohit',
    course: 'Technical Development Track',
    category: 'Software & Tech',
    rating: 5,
    photo: t2Photo,
    date: 'Verified Student',
    highlight: 'Top-notch training and smooth learning guidance.',
    review: 'The training provided by Course Divine Technology is top-notch. The content is comprehensive, and the guidance throughout the modules made learning smooth and effective. Highly recommended for anyone looking to build solid technical skills.'
  },
  {
    id: 't3',
    name: 'Prasanth Kalyan Mutha',
    course: 'ANSYS Major Project & Simulation',
    category: 'Engineering & CAD',
    rating: 5,
    photo: t3Photo,
    date: 'Verified Student',
    highlight: 'Thoroughly impressed by tutor expertise and guidance.',
    review: "My name is Prasanth, and I took my major project in ANSYS with CourseDivine. I was thoroughly impressed by the tutor's expertise and guidance. I highly recommend CourseDivine's services to everyone!"
  },
  {
    id: 't4',
    name: 'Rakesh Nipane',
    course: 'SAP Data Migration Course',
    category: 'SAP ERP',
    rating: 5,
    photo: t4Photo,
    date: 'Verified Student',
    highlight: 'Experienced faculty, notes & live SAP system access provided.',
    review: 'I Have joined SAP Data Migration Course, on 1st Jun and writing a review after completion of cource, faculty was very experienced in his domain, doughts where solved and notes and SAP system access was provided. and Cource Divine staff also very responsive. overall good experience.'
  },
  {
    id: 't5',
    name: 'Veerendra D',
    course: 'SAP PP Certified Course',
    category: 'SAP ERP',
    rating: 5,
    photo: t5Photo,
    date: 'Verified Student',
    highlight: 'Practical examples and clear doubt resolution.',
    review: 'Hi this is veerendra. The training sessions are clear and easy to understand. Trainer explains SAP PP concepts with practical examples and clears doubts well.'
  },
  {
    id: 't6',
    name: 'Srilatha Srikantam',
    course: 'SolidWorks 3D CAD 30-Day Training',
    category: 'Engineering & CAD',
    rating: 5,
    photo: t6Photo,
    date: 'Verified Student',
    highlight: '30-day course was very useful with practical teaching.',
    review: 'I had a great experience learning SolidWorks at this Institution, the 30-day course was very useful, and the teaching was clear and practical, I am thankful to them for guiding me well and I will definitely recommend this institution to others.'
  },
  {
    id: 't7',
    name: 'Saugata Dutta',
    course: 'Data Science & AI Masterclass',
    category: 'Data Science & AI',
    rating: 5,
    photo: t7Photo,
    date: 'Verified Student',
    highlight: '1-to-1 daily mentor sessions, worth every penny.',
    review: 'This institute has given me top notch education. I was persuing my journey in data science and AI and they have provided one to one sessions on everyday basis. You can trust this organisation it will be worth your money.'
  },
  {
    id: 't8',
    name: 'Uma Shankar',
    course: 'Core Upskilling Track',
    category: 'Software & Tech',
    rating: 5,
    photo: t8Photo,
    date: 'Verified Student',
    highlight: 'Good teaching and friendly, supportive tutors.',
    review: 'Good teaching and friendly tutors.'
  },
  {
    id: 't9',
    name: 'Sai Kona',
    course: 'SAP MM Certified Course',
    category: 'SAP ERP',
    rating: 5,
    photo: t9Photo,
    date: 'Verified Student',
    highlight: 'Helpful for beginners with real-world examples.',
    review: 'Hi this is sai the training sessions are clear and easy to understand. Trainer explains SAP MM concepts with practical examples and clears doubts well. The course structure is good and helpful for beginners.'
  },
  {
    id: 't10',
    name: 'Gidla Resheph',
    course: 'Career Upskilling Program',
    category: 'Software & Tech',
    rating: 5,
    photo: t10Photo,
    date: 'Verified Student',
    highlight: 'Great platform conducted by industry experienced trainers.',
    review: 'Course Divine is a Great platform to learn Courses for career upskilling conducted by Industry Experienced Trainers.'
  },
  {
    id: 't11',
    name: 'Aarif Md',
    course: 'Java Full Stack Development',
    category: 'Software & Tech',
    rating: 5,
    photo: t11Photo,
    date: 'Verified Student',
    highlight: 'Highly informative, engaging, and practical learning.',
    review: 'I would like to express my sincere appreciation for the Java Full Stack course provided by your institute. The training was well-structured, practical, and highly informative. The instructors explained every concept clearly and supported us throughout the learning process. Thank you to the entire team for delivering such a valuable and engaging learning experience.'
  },
  {
    id: 't12',
    name: 'Lalitha Tumpala',
    course: 'Skill Upgrade Masterclass',
    category: 'Software & Tech',
    rating: 5,
    photo: t12Photo,
    date: 'Verified Student',
    highlight: 'Real-time examples and continuous mentor support.',
    review: 'This is Lalitha. I am really happy to share my feedback about Course Divine. The training sessions were very clear, well-structured, and easy to understand. The faculty explained every concept with real-time examples, which helped me learn faster. Support from the team was excellent and they guided me whenever I had doubts. Overall, Course Divine is the best place to learn and upgrade skills. Thank you for providing such quality training!'
  },
  {
    id: 't13',
    name: 'Mani Yadav',
    course: 'Comprehensive Upskilling Track',
    category: 'Software & Tech',
    rating: 5,
    photo: t13Photo,
    date: 'Verified Student',
    highlight: 'Ground level teaching to cracking top job outputs.',
    review: 'From ground level teaching to high level cracking outputs will get from course divine I recommend, who need to learn and upskill i will choose you to go with course divine.'
  }
];

const categories = ['All', 'SAP ERP', 'Engineering & CAD', 'Data Science & AI', 'Software & Tech'];

const Testimonials = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTestimonials = testimonialsData.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.review.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFD] pb-24 font-sans text-slate-800 selection:bg-brand-500 selection:text-white">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#061833] via-[#0C2A52] to-[#071F3F] text-white py-16 sm:py-20 relative overflow-hidden shadow-xl border-b border-[#0E3466]">
        <div className="absolute inset-0 bg-[radial-gradient(#0F62FE_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-black tracking-widest uppercase">
            <MessageSquareQuote className="w-3.5 h-3.5 text-amber-400" />
            Verified Alumni Stories
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto">
            What Our Students Say About Course Divine
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Real feedback from graduates across SAP ERP, Mechanical CAD, Full Stack Development, Data Science, and Engineering careers.
          </p>

          {/* Social Proof Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-bold text-slate-200">
            <div className="flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.95 / 5.0 Average Rating</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>12,500+ Students Trained</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Verified Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filters and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0F62FE] text-white shadow-md shadow-blue-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student, course, skill..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </section>

      {/* 3. Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
            >
              <div className="space-y-4">
                {/* Top: Student Header */}
                <div className="flex items-center gap-3.5">
                  <div className="relative shrink-0">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#0F62FE] shadow-md group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-[#0F62FE] transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-brand-600 line-clamp-1">
                      {t.course}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-[10px] text-slate-400 font-bold ml-1">5.0</span>
                    </div>
                  </div>
                </div>

                {/* Category Pill */}
                <div className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-extrabold uppercase tracking-wide">
                  {t.category}
                </div>

                {/* Review Text */}
                <div className="relative">
                  <Quote className="w-6 h-6 text-brand-100 absolute -top-2 -left-1 -z-0 opacity-80" />
                  <p className="text-xs text-slate-700 leading-relaxed relative z-10 pt-1">
                    "{t.review}"
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified Student
                </span>
                <span className="text-slate-400 font-medium">Course Divine Alum</span>
              </div>
            </div>
          ))}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <MessageSquareQuote className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No testimonials found</h3>
            <p className="text-xs text-slate-500">Try changing your search keywords or category filters.</p>
          </div>
        )}
      </section>

      {/* 4. Bottom CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-gradient-to-r from-[#0F62FE] via-[#0052CC] to-[#071F3F] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready to Start Your Success Story?
            </h2>
            <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
              Join thousands of successful students who transformed their technical careers with Course Divine's certified masterclasses and guaranteed internships.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/courses"
              className="px-8 py-3.5 rounded-xl bg-white text-[#0F62FE] hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow-xl transition-all duration-200 flex items-center gap-2 transform hover:scale-105"
            >
              Explore All Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs sm:text-sm border border-white/30 backdrop-blur-sm transition-all duration-200"
            >
              Speak with a Counselor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
