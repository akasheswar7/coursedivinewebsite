const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'Full Stack Developer'
    },
    company: {
      type: String,
      default: 'Top Tech MNC'
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    rating: {
      type: Number,
      default: 5
    },
    content: {
      type: String,
      required: true
    },
    courseTaken: {
      type: String,
      default: 'Full Stack Development Track'
    },
    isFeatured: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
