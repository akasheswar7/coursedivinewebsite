import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Plus, Trash2, Edit, X } from 'lucide-react';
import api, { fallbackStore } from '../services/api';
import { useNotification } from '../context/NotificationContext';

const AdminBlogs = () => {
  const { showToast } = useNotification();
  const [blogs, setBlogs] = useState(fallbackStore.blogs);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Career Guide',
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
  });

  useEffect(() => {
    api.get('/blogs')
      .then((res) => {
        if (res.data?.success && res.data.data.length > 0) {
          setBlogs(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleDelete = (blogId) => {
    setBlogs((prev) => prev.filter((b) => b._id !== blogId));
    showToast('Article deleted', 'success');
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const newBlog = {
      _id: 'b_' + Date.now(),
      slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date().toISOString(),
      readTime: '5 min read',
      author: { name: 'Course Divine Editorial', role: 'Staff Writer' },
      ...formData
    };
    setBlogs([newBlog, ...blogs]);
    setShowModal(false);
    showToast('Article published successfully!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        to="/admin"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Operations Hub
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Blog & Editorial Publisher</h1>
          <p className="text-xs text-slate-500 mt-1">Publish engineering tutorials, career roadmaps, and student guides.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Write Article
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((b) => (
          <div key={b._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md">
                {b.category}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2 line-clamp-2">{b.title}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{b.excerpt}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link to={`/blog/${b.slug}`} className="text-xs font-bold text-brand-600 hover:underline">
                View Post
              </Link>
              <button
                onClick={() => handleDelete(b._id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-3 mb-3 border-b">
              <h3 className="text-base font-bold text-slate-900">Publish New Article</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                >
                  <option>Career Guide</option>
                  <option>Development</option>
                  <option>Interview Prep</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Excerpt *</label>
                <input
                  type="text"
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Content (Markdown / Text) *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-600 text-white font-bold"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
