const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  createTestimonial
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.route('/')
  .get(getTestimonials)
  .post(protect, admin, createTestimonial);

module.exports = router;
