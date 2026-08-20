const Referral = require('../models/Referral');
const User = require('../models/User');

// @desc    Get user's referral statistics and referred list
// @route   GET /api/referrals/my-stats
// @access  Private
const getMyReferralStats = async (req, res, next) => {
  try {
    const referrals = await Referral.find({ referrer: req.user._id })
      .populate('referredUser', 'name email createdAt')
      .sort({ createdAt: -1 });

    const totalReferrals = referrals.length;
    const successfulPurchases = referrals.filter(r => r.status === 'purchased' || r.status === 'reward_paid').length;
    const totalEarnings = successfulPurchases * 500;

    res.json({
      success: true,
      data: {
        referralCode: req.user.referralCode || 'CD' + req.user._id.toString().substring(0, 6).toUpperCase(),
        totalReferrals,
        successfulPurchases,
        totalEarnings,
        rewardPerReferral: 500,
        referrals
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Validate referral code
// @route   GET /api/referrals/validate/:code
// @access  Public
const validateReferralCode = async (req, res, next) => {
  try {
    const user = await User.findOne({ referralCode: req.params.code.toUpperCase() });
    if (!user) {
      return res.status(404).json({ success: false, isValid: false, message: 'Invalid referral code' });
    }
    res.json({
      success: true,
      isValid: true,
      referrerName: user.name
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyReferralStats,
  validateReferralCode
};
