const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String }
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderItems: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    finalAmount: {
      type: Number,
      required: true
    },
    couponCode: {
      type: String,
      default: ''
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      default: 'Razorpay'
    },
    razorpayOrderId: {
      type: String,
      sparse: true
    },
    razorpayPaymentId: {
      type: String,
      sparse: true
    },
    razorpaySignature: {
      type: String
    },
    billingDetails: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String }
    },
    paidAt: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
