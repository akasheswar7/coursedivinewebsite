const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active'
    },
    progressPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    completedTopics: [{ type: String }],
    certificateIssued: {
      type: Boolean,
      default: false
    },
    certificateId: {
      type: String
    }
  },
  { timestamps: true }
);

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
