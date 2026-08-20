import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Clock,
  Check,
  ShoppingCart,
  GraduationCap,
  Code,
  Brain,
  Cloud,
  Shield,
  Cpu,
  Database,
  Layers,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import EnrollmentModal from './EnrollmentModal';

const CourseCard = ({ course }) => {
  const { addToCart, isInCart } = useCart();
  const { showToast } = useNotification();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart(course._id)) {
      navigate('/cart');
    } else {
      addToCart(course);
      showToast(`Added "${course.title}" to cart!`, 'success');
    }
  };

  const getCategoryTheme = (category = '') => {
    const cat = category.toLowerCase();
    if (cat.includes('cloud') || cat.includes('devops') || cat.includes('azure') || cat.includes('aws')) {
      return {
        bg: 'from-sky-700 via-blue-800 to-indigo-950',
        accent: 'bg-sky-400/20 text-sky-200 border-sky-400/30',
        icon: Cloud
      };
    }
    if (cat.includes('data') || cat.includes('ai') || cat.includes('machine') || cat.includes('python')) {
      return {
        bg: 'from-indigo-800 via-purple-900 to-slate-950',
        accent: 'bg-purple-400/20 text-purple-200 border-purple-400/30',
        icon: Brain
      };
    }
    if (cat.includes('security') || cat.includes('privacy') || cat.includes('anti-terrorist')) {
      return {
        bg: 'from-slate-800 via-zinc-900 to-black',
        accent: 'bg-emerald-400/20 text-emerald-200 border-emerald-400/30',
        icon: Shield
      };
    }
    if (cat.includes('vlsi') || cat.includes('embedded') || cat.includes('iot') || cat.includes('plc') || cat.includes('industry')) {
      return {
        bg: 'from-cyan-800 via-teal-900 to-slate-950',
        accent: 'bg-teal-400/20 text-teal-200 border-teal-400/30',
        icon: Cpu
      };
    }
    if (cat.includes('sap') || cat.includes('oracle') || cat.includes('erp')) {
      return {
        bg: 'from-blue-900 via-indigo-950 to-slate-950',
        accent: 'bg-blue-400/20 text-blue-200 border-blue-400/30',
        icon: Database
      };
    }
    if (cat.includes('civil') || cat.includes('cad') || cat.includes('bim') || cat.includes('etabs') || cat.includes('catia') || cat.includes('tekla')) {
      return {
        bg: 'from-amber-800 via-orange-950 to-slate-950',
        accent: 'bg-amber-400/20 text-amber-200 border-amber-400/30',
        icon: Layers
      };
    }
    return {
      bg: 'from-[#071F3F] via-blue-950 to-slate-950',
      accent: 'bg-brand-400/20 text-brand-200 border-brand-400/30',
      icon: Code
    };
  };

  const theme = getCategoryTheme(course.category);
  const IconComponent = theme.icon;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col h-full overflow-hidden text-center justify-between p-4">
      
      {/* Course Thumbnail Image or Branded Vector Fallback */}
      <Link
        to={`/courses/${course.slug}`}
        className="relative block aspect-square max-h-56 overflow-hidden rounded-xl bg-slate-100 mb-3 select-none"
      >
        {!imgError && course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${theme.bg} p-5 flex flex-col justify-between items-center text-white relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
            {/* Background watermark icon */}
            <IconComponent className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 pointer-events-none" />
            
            {/* Top Logo pill */}
            <div className="w-full flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/90 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                <GraduationCap className="w-3.5 h-3.5 text-brand-300" />
                <span>Course Divine</span>
              </div>
            </div>

            {/* Center Icon & Title Abbreviation */}
            <div className="flex flex-col items-center justify-center my-auto z-10 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-white/20">
                <IconComponent className="w-6 h-6 text-brand-200" />
              </div>
              <div className="text-xs font-black uppercase tracking-wider text-white line-clamp-2 px-2 text-center drop-shadow-md">
                {course.title.replace('Certified Course', '').replace('Training', '').trim()}
              </div>
            </div>

            {/* Bottom Category Badge */}
            <div className={`z-10 text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md border ${theme.accent}`}>
              {course.category}
            </div>
          </div>
        )}

        {/* Black "Sale!" Badge from screenshot */}
        <div className="absolute top-2 right-2 bg-[#222222] text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm z-20">
          Sale!
        </div>
      </Link>

      {/* Course Title */}
      <div className="space-y-2 mb-3">
        <Link to={`/courses/${course.slug}`}>
          <h3 className="text-sm sm:text-base font-bold text-slate-800 hover:text-brand-600 transition-colors uppercase leading-snug line-clamp-2 min-h-[2.5rem]">
            {course.title}
          </h3>
        </Link>

        {/* Pricing with Strike-through in US Dollars ($) */}
        <div className="text-sm font-bold text-slate-900 flex items-center justify-center gap-2">
          {Number(course.price || 0) > Number(course.discountPrice || course.price || 0) && (
            <span className="text-xs text-slate-400 line-through font-normal">
              ${Number(course.price || 0).toLocaleString('en-US')}.00
            </span>
          )}
          <span className="text-slate-900 font-extrabold text-sm sm:text-base text-brand-600">
            ${Number(course.discountPrice || course.price || 499).toLocaleString('en-US')}.00
          </span>
        </div>
      </div>

      {/* Action Buttons: Add to Cart & Quick Enroll */}
      <div className="pt-2 flex items-center gap-2">
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-2.5 px-3 rounded-xl text-white font-bold text-xs shadow-md transition-all duration-200 ${
            isInCart(course._id)
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-[#FF5555] hover:bg-[#E64444]'
          }`}
        >
          {isInCart(course._id) ? 'In Cart' : 'Add to Cart'}
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isInCart(course._id)) {
              addToCart(course);
            }
            navigate('/checkout');
          }}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#0F62FE] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all duration-200"
        >
          Enroll Now
        </button>
      </div>

    </div>
  );
};

export default CourseCard;

