const express = require('express');
const router = express.Router();
const {
  applyInternship,
  getMyInternships,
  getAllInternships,
  updateInternshipStatus
} = require('../controllers/internshipController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

// Optional auth for public internship application
const optionalAuth = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    return protect(req, res, next);
  }
  next();
};

router.post('/apply', optionalAuth, applyInternship);
router.get('/my-applications', protect, getMyInternships);
router.get('/', protect, admin, getAllInternships);
router.put('/:id/status', protect, admin, updateInternshipStatus);

module.exports = router;
