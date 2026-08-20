const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      trim: true
    },
    subject: {
      type: String,
      default: 'General Course Enquiry'
    },
    courseInterest: {
      type: String,
      default: 'General'
    },
    message: {
      type: String,
      required: [true, 'Please enter your message']
    },
    status: {
      type: String,
      enum: ['New', 'In Progress', 'Responded', 'Closed'],
      default: 'New'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
