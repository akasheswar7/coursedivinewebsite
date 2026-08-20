const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create testimonial (Admin)
// @route   POST /api/testimonials
// @access  Private/Admin
const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestimonials,
  createTestimonial
};
