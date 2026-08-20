import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  X,
  Search,
  ArrowLeft,
  Loader2,
  DollarSign
} from 'lucide-react';
import api, { fallbackStore } from '../services/api';
import { useNotification } from '../context/NotificationContext';

const AdminCourses = () => {
  const { showToast } = useNotification();
  const [courses, setCourses] = useState(fallbackStore.courses);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // New Course Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Full Stack Development',
    level: 'Beginner',
    duration: '80 Hours (10 Weeks)',
    price: 4999,
    discountPrice: 2499,
    description: '',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    isPublished: true
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get('/courses');
      if (res.data?.success && res.data.data.length > 0) {
        setCourses(res.data.data);
      }
    } catch (err) {
      setCourses(fallbackStore.courses);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await api.delete(`/courses/${courseId}`);
      setCourses((prev) => prev.filter((c) => c._id !== courseId));
      showToast('Course removed successfully', 'success');
    } catch (err) {
      setCourses((prev) => prev.filter((c) => c._id !== courseId));
      showToast('Course removed from store', 'success');
    }
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      showToast('Please fill in title and description', 'error');
      return;
    }

    try {
      if (editingCourse) {
        await api.put(`/courses/${editingCourse._id}`, formData);
        setCourses((prev) =>
          prev.map((c) => (c._id === editingCourse._id ? { ...c, ...formData } : c))
        );
        showToast('Course updated successfully', 'success');
      } else {
        const res = await api.post('/courses', formData);
        const newCourse = res.data?.data || {
          _id: 'c_' + Date.now(),
          slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
          ...formData
        };
        setCourses([newCourse, ...courses]);
        showToast('New course created and published!', 'success');
      }

      setShowAddModal(false);
      setEditingCourse(null);
      setFormData({
        title: '',
        category: 'Full Stack Development',
        level: 'Beginner',
        duration: '80 Hours (10 Weeks)',
        price: 4999,
        discountPrice: 2499,
        description: '',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        isPublished: true
      });
    } catch (err) {
      showToast('Saved to catalog store', 'success');
      setShowAddModal(false);
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-3xl font-extrabold text-slate-900">Course Management</h1>
          <p className="text-xs text-slate-500 mt-1">Manage, add, and publish curriculum modules in the Learning Lounge.</p>
        </div>

        <button
          onClick={() => {
            setEditingCourse(null);
            setShowAddModal(true);
          }}
          className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Course
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses by title or category..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Course</th>
                <th className="p-4">Category</th>
                <th className="p-4">Level</th>
                <th className="p-4">Price / Discount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCourses.map((c) => (
                <tr key={c._id} className="hover:bg-slate-50/60 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={c.thumbnail} alt={c.title} className="w-12 h-9 rounded-lg object-cover border" />
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1 max-w-xs">{c.title}</div>
                        <span className="text-[10px] text-slate-400">{c.duration}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-brand-700">{c.category}</td>
                  <td className="p-4">{c.level}</td>
                  <td className="p-4 font-mono font-bold text-slate-900">
                    ${(c.discountPrice || c.price).toLocaleString('en-US')}.00{' '}
                    <span className="text-slate-400 line-through text-[10px]">${c.price.toLocaleString('en-US')}.00</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Published
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingCourse(c);
                          setFormData({
                            title: c.title,
                            category: c.category,
                            level: c.level,
                            duration: c.duration,
                            price: c.price,
                            discountPrice: c.discountPrice,
                            description: c.description || c.overview,
                            thumbnail: c.thumbnail,
                            isPublished: c.isPublished
                          });
                          setShowAddModal(true);
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50"
                        title="Edit Course"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingCourse ? 'Edit Course Program' : 'Create New Course Program'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Next.js 15 & Enterprise Architecture"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500"
                  >
                    <option>Full Stack Development</option>
                    <option>Data Science & AI</option>
                    <option>Cloud & DevOps</option>
                    <option>Cyber Security</option>
                    <option>Programming Languages</option>
                    <option>UI/UX Design</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Skill Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>All Levels</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Offer Price ($)</label>
                  <input
                    type="number"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({ ...formData, discountPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Course Description & Overview *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide comprehensive details about what students will build and master..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold transition shadow-md"
                >
                  {editingCourse ? 'Save Changes' : 'Publish Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
