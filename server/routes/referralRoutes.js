const express = require('express');
const router = express.Router();
const {
  getMyReferralStats,
  validateReferralCode
} = require('../controllers/referralController');
const { protect } = require('../middleware/auth');

router.get('/my-stats', protect, getMyReferralStats);
router.get('/validate/:code', validateReferralCode);

module.exports = router;
