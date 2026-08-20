const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required']
    },
    content: {
      type: String,
      required: [true, 'Blog content is required']
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
    },
    category: {
      type: String,
      required: true,
      default: 'Career Guide'
    },
    tags: [{ type: String }],
    author: {
      name: { type: String, default: 'Course Divine Editorial Team' },
      avatar: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' },
      role: { type: String, default: 'Tech & Career Mentor' }
    },
    readTime: {
      type: String,
      default: '5 min read'
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    views: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

blogPostSchema.index({ title: 'text', content: 'text', category: 'text' });

module.exports = mongoose.model('BlogPost', blogPostSchema);
