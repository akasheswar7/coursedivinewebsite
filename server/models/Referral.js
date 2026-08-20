const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema(
  {
    referrer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    referredUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    referralCodeUsed: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['registered', 'purchased', 'reward_paid'],
      default: 'registered'
    },
    rewardAmount: {
      type: Number,
      default: 500
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Referral', referralSchema);
