import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-3xl p-7 border border-brand-100 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between h-full relative group">
      <Quote className="w-10 h-10 text-brand-100 absolute top-6 right-6 pointer-events-none group-hover:text-brand-200 transition duration-300" />
      <div>
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Content */}
        <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
          "{testimonial.content}"
        </p>
      </div>

      {/* Author Profile */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
        <img
          src={testimonial.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
          alt={testimonial.name}
          className="w-11 h-11 rounded-full object-cover border border-brand-200"
          loading="lazy"
        />
        <div>
          <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
          <p className="text-xs text-brand-600 font-medium">{testimonial.role} • {testimonial.company}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
