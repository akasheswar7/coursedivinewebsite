const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseBySlug,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addCourseReview
} = require('../controllers/courseController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.route('/')
  .get(getCourses)
  .post(protect, admin, createCourse);

router.get('/slug/:slug', getCourseBySlug);

router.route('/:id')
  .get(getCourseById)
  .put(protect, admin, updateCourse)
  .delete(protect, admin, deleteCourse);

router.post('/:id/reviews', protect, addCourseReview);

module.exports = router;
