import React from 'react';
import { X, Play, Award, CheckCircle2, Star } from 'lucide-react';

const VideoModal = ({ isOpen, onClose, testimonial }) => {
  if (!isOpen || !testimonial) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 text-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              className="w-10 h-10 rounded-xl object-cover border border-brand-500"
            />
            <div>
              <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                {testimonial.name}
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </h4>
              <p className="text-xs text-slate-400">
                {testimonial.role} at <strong className="text-white">{testimonial.company}</strong> ({testimonial.hike})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          {testimonial.videoUrl ? (
            <iframe
              src={testimonial.videoUrl}
              title={`Student Testimonial - ${testimonial.name}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            /* High-fidelity Fallback Player Preview */
            <div className="relative w-full h-full">
              <img
                src={testimonial.thumbnail || testimonial.photo}
                alt={testimonial.name}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-base sm:text-lg font-medium text-white italic leading-snug">
                  "{testimonial.message}"
                </blockquote>
                <div className="text-xs text-brand-300 font-bold">
                  Course Taken: {testimonial.course} • Batch: {testimonial.batch || '2026 Live Track'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Details Bar */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-400">
            Verified Alumni Placement • Credential ID: <span className="font-mono text-white font-bold">CD-VERIFIED-{testimonial.id || '2026'}</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold transition self-end sm:self-auto"
          >
            Close Video
          </button>
        </div>

      </div>
    </div>
  );
};

export default VideoModal;
