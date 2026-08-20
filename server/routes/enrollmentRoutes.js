const express = require('express');
const router = express.Router();
const {
  getMyEnrollments,
  getEnrollmentByCourse,
  updateProgress
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');

router.get('/my-courses', protect, getMyEnrollments);
router.get('/course/:courseId', protect, getEnrollmentByCourse);
router.put('/:id/progress', protect, updateProgress);

module.exports = router;
