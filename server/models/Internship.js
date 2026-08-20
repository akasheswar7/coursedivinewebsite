const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    college: {
      type: String,
      required: [true, 'College / University name is required'],
      trim: true
    },
    qualification: {
      type: String,
      default: 'B.Tech / B.E / BCA / MCA'
    },
    graduationYear: {
      type: String,
      default: '2025'
    },
    domain: {
      type: String,
      required: [true, 'Internship domain track is required'],
      enum: [
        'Full Stack Web Development',
        'Data Science & Artificial Intelligence',
        'Cloud Computing & DevOps',
        'Cyber Security & Ethical Hacking',
        'UI/UX Design & Product Development',
        'Mobile App Development (React Native)'
      ]
    },
    duration: {
      type: String,
      enum: ['1 Month', '2 Months', '3 Months', '6 Months'],
      default: '3 Months'
    },
    resumeUrl: {
      type: String,
      default: ''
    },
    githubUrl: {
      type: String,
      default: ''
    },
    linkedinUrl: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['Pending', 'Under Review', 'Accepted', 'Rejected', 'Completed'],
      default: 'Under Review'
    },
    notes: {
      type: String,
      default: ''
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Internship', internshipSchema);
