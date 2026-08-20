const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    studentName: {
      type: String,
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    courseTitle: {
      type: String,
      required: true
    },
    issueDate: {
      type: Date,
      default: Date.now
    },
    grade: {
      type: String,
      default: 'Distinction (A+)'
    },
    verificationUrl: {
      type: String
    },
    isValid: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certificate', certificateSchema);
