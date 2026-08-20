import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

const BlogCard = ({ blog }) => {
  const formattedDate = new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 hover:border-brand-300 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col h-full overflow-hidden group">
      {/* Cover Image */}
      <Link to={`/blog/${blog.slug}`} className="aspect-[16/10] overflow-hidden bg-slate-100 relative block">
        <img
          src={blog.coverImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-brand-700 shadow-sm backdrop-blur-sm">
          {blog.category}
        </span>
      </Link>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-500" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-500" />
              {blog.readTime || '5 min read'}
            </span>
          </div>

          <Link to={`/blog/${blog.slug}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2 leading-snug">
              {blog.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {blog.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={blog.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
              alt={blog.author?.name || 'Author'}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs font-semibold text-slate-700 truncate max-w-[120px]">
              {blog.author?.name || 'Course Divine Team'}
            </span>
          </div>

          <Link
            to={`/blog/${blog.slug}`}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
          >
            Read Article <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
