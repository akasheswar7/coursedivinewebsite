import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, User, Sparkles, BookOpen } from 'lucide-react';
import api, { fallbackStore } from '../services/api';
import { useNotification } from '../context/NotificationContext';
import BlogCard from '../components/BlogCard';

const BlogDetails = () => {
  const { slug } = useParams();
  const { showToast } = useNotification();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/blogs/slug/${slug}`);
      if (res.data?.success && res.data.data) {
        setBlog(res.data.data);
        setRelatedBlogs(res.data.relatedBlogs || []);
      } else {
        const found = fallbackStore.blogs.find((b) => b.slug === slug) || fallbackStore.blogs[0];
        setBlog(found);
        setRelatedBlogs(fallbackStore.blogs.filter((b) => b._id !== found._id));
      }
    } catch (err) {
      const found = fallbackStore.blogs.find((b) => b.slug === slug) || fallbackStore.blogs[0];
      setBlog(found);
      setRelatedBlogs(fallbackStore.blogs.filter((b) => b._id !== found._id));
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'info');
    }
  };

  if (loading || !blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-semibold text-slate-500">Loading article...</p>
      </div>
    );
  }

  const formattedDate = new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to All Articles
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <span className="px-3 py-1 rounded-md text-xs font-bold bg-brand-50 text-brand-700">
          {blog.category}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-slate-100 pb-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <img
              src={blog.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
              alt={blog.author?.name}
              className="w-10 h-10 rounded-full object-cover border border-brand-200"
            />
            <div>
              <p className="font-bold text-slate-900">{blog.author?.name || 'Course Divine Editorial Team'}</p>
              <p className="text-[11px] text-slate-400">{blog.author?.role || 'Tech Mentor'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-600" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-600" />
              {blog.readTime || '5 min read'}
            </span>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-600 hover:text-brand-600 transition"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="rounded-3xl overflow-hidden aspect-[16/9] shadow-xl bg-slate-100">
        <img
          src={blog.coverImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line text-slate-700 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm">
        {blog.content}
      </article>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <div className="pt-10 space-y-6">
          <h3 className="text-2xl font-extrabold text-slate-900">Recommended Reading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedBlogs.map((b) => (
              <BlogCard key={b._id} blog={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
