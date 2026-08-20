import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, GraduationCap } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto text-3xl font-black">
          404
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          The page you are looking for might have been moved or does not exist in the Course Divine ecosystem.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Link>
          <Link
            to="/courses"
            className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" /> Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
