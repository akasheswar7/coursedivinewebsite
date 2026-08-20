const Razorpay = require('razorpay');

let razorpayInstance = null;

try {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_CourseDivineKey123',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_CourseDivineSecretKey456'
  });
} catch (err) {
  console.warn('Razorpay init notice:', err.message);
}

module.exports = razorpayInstance;
