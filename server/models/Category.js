const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'BookOpen'
    },
    image: {
      type: String,
      default: ''
    },
    courseCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
