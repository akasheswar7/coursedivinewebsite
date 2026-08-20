const express = require('express');
const router = express.Router();
const {
  submitEnquiry,
  getAllEnquiries,
  updateEnquiryStatus
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.route('/')
  .post(submitEnquiry)
  .get(protect, admin, getAllEnquiries);

router.route('/:id/status')
  .put(protect, admin, updateEnquiryStatus);

module.exports = router;
