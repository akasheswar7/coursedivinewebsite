const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true
    },
    studentAvatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    courseTaken: {
      type: String,
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    companyLogo: {
      type: String,
      default: ''
    },
    jobRole: {
      type: String,
      required: true
    },
    salaryPackage: {
      type: String,
      required: true,
      default: '8.5 LPA'
    },
    year: {
      type: Number,
      default: 2025
    },
    testimonial: {
      type: String,
      default: 'The hands-on projects and interview prep at Course Divine helped me crack my dream software engineering job.'
    },
    linkedinProfile: {
      type: String,
      default: ''
    },
    isFeatured: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Placement', placementSchema);
