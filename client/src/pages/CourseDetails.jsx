import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Play,
  ShoppingCart,
  Share2,
  ShieldCheck,
  Globe,
  Users,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import api, { fallbackStore } from '../services/api';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import CourseCard from '../components/CourseCard';

const CourseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { showToast } = useNotification();

  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [openModuleIndex, setOpenModuleIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCourseDetails();
  }, [slug]);

  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/courses/slug/${slug}`);
      if (res.data?.success && res.data.data) {
        setCourse(res.data.data);
        setRelatedCourses(res.data.relatedCourses || []);
      } else {
        // Fallback store search
        const found = fallbackStore.courses.find(c => c.slug === slug) || fallbackStore.courses[0];
        setCourse(found);
        setRelatedCourses(fallbackStore.courses.filter(c => c._id !== found._id).slice(0, 3));
      }
    } catch (err) {
      const found = fallbackStore.courses.find(c => c.slug === slug) || fallbackStore.courses[0];
      setCourse(found);
      setRelatedCourses(fallbackStore.courses.filter(c => c._id !== found._id).slice(0, 3));
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!course) return;
    if (isInCart(course._id)) {
      navigate('/cart');
    } else {
      addToCart(course);
      showToast(`Added "${course.title}" to cart!`, 'success');
    }
  };

  const handleBuyNow = () => {
    if (!course) return;
    if (!isInCart(course._id)) {
      addToCart(course);
    }
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Course link copied to clipboard!', 'info');
    }
  };

  if (loading || !course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-slate-600">Loading course curriculum...</p>
      </div>
    );
  }

  const discountPercent = course.price && course.discountPrice
    ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
    : 0;

  return (
    <div className="space-y-12 pb-20">
      {/* Course Header Banner */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-navy-950 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-400/30">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-white/10 text-white">
                  {course.level || 'All Levels'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-brand-100/80 leading-relaxed max-w-3xl">
                {course.subtitle || course.description}
              </p>

              {/* Ratings & Meta */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-brand-100/90 pt-2">
                <div className="flex items-center gap-1 font-bold text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{course.rating || 4.8}</span>
                  <span className="text-brand-300 font-normal">({course.numReviews || 120} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-brand-400" />
                  <span>{course.enrolledCount || 350}+ Students Enrolled</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-brand-400" />
                  <span>{course.language || 'English & Hindi'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-400" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sticky Enroll Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Details, Syllabus, Outcomes */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-600" /> Course Overview
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {course.overview || course.description}
              </p>

              {/* Key Highlights */}
              {course.highlights && course.highlights.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Curriculum Accordion */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Curriculum & Syllabus</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {course.curriculum?.length || 0} Comprehensive Modules • {course.totalLectures || 45} Practical Lectures
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {course.curriculum && course.curriculum.map((module, idx) => {
                  const isOpen = openModuleIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                        className="w-full px-5 py-4 bg-slate-50 hover:bg-brand-50/50 flex items-center justify-between text-left transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{module.title}</h4>
                            <span className="text-[11px] text-slate-500">{module.duration}</span>
                          </div>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </button>

                      {isOpen && (
                        <div className="p-5 bg-white space-y-3 border-t border-slate-200">
                          {module.description && (
                            <p className="text-xs text-slate-500 italic mb-2">{module.description}</p>
                          )}
                          <div className="space-y-2">
                            {module.topics && module.topics.map((topic, tIdx) => (
                              <div
                                key={tIdx}
                                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 text-xs font-medium text-slate-700"
                              >
                                <div className="flex items-center gap-2.5">
                                  <Play className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                                  <span>{topic.title}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  {topic.isFreePreview && (
                                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                                      Free Preview
                                    </span>
                                  )}
                                  <span className="text-slate-400 font-mono text-[11px]">{topic.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Learning Outcomes & Prerequisites */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-slate-900 text-base">What You Will Learn</h3>
                <div className="space-y-2">
                  {course.learningOutcomes?.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-slate-900 text-base">Prerequisites</h3>
                <div className="space-y-2">
                  {course.prerequisites?.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructor Profile */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={course.instructor?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                alt={course.instructor?.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-200 shadow-md shrink-0"
              />
              <div className="space-y-2 text-center sm:text-left">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{course.instructor?.name || 'Senior Architect'}</h3>
                  <p className="text-xs font-semibold text-brand-600">{course.instructor?.title || 'Lead Industry Mentor'}</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {course.instructor?.bio || 'Experienced engineering architect dedicated to mentoring the next generation of software engineers.'}
                </p>
              </div>
            </div>

            {/* FAQs */}
            {course.faqs && course.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {course.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full px-4 py-3 bg-slate-50 text-left font-bold text-xs text-slate-800 flex justify-between items-center"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </button>
                        {isOpen && (
                          <div className="p-4 text-xs text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Pricing Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-8 border border-brand-200 shadow-xl space-y-6">
              {/* Preview Thumbnail */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#071F3F] to-navy-950">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-brand-600 flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 fill-brand-600 ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Pricing Section in US Dollars ($) */}
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black text-slate-900">
                    ${(course.discountPrice || course.price).toLocaleString('en-US')}.00
                  </span>
                  {course.discountPrice && course.price > course.discountPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      ${course.price.toLocaleString('en-US')}.00
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="bg-rose-100 text-rose-700 font-bold text-xs px-2 py-0.5 rounded-md">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
                <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> 7-Day 100% Money-Back Guarantee
                </p>
              </div>



              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-lg shadow-brand-600/30 transition duration-200 flex items-center justify-center gap-2"
                >
                  Buy Course Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 rounded-2xl border font-bold text-xs transition duration-200 flex items-center justify-center gap-2 ${
                    isInCart(course._id)
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      : 'bg-brand-50 border-brand-200 text-brand-700 hover:bg-brand-100'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {isInCart(course._id) ? 'View in Cart' : 'Add to Cart'}
                </button>
              </div>

              {/* Perks List */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2 font-medium">
                  <Award className="w-4 h-4 text-brand-600" />
                  <span>Course Divine Verified Professional Certificate</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <BookOpen className="w-4 h-4 text-brand-600" />
                  <span>Full Lifetime Access to Source Code & Updates</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <Users className="w-4 h-4 text-brand-600" />
                  <span>Private Discord Developer Community Access</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 transition"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share this course with peers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Special Offer</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-slate-900">
              ${(course.discountPrice || course.price).toLocaleString('en-US')}.00
            </span>
            {course.discountPrice && course.price > course.discountPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${course.price.toLocaleString('en-US')}.00
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className={`p-2.5 rounded-xl border font-bold text-xs transition shrink-0 ${
              isInCart(course._id)
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
          <button
            onClick={handleBuyNow}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-md transition whitespace-nowrap"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
