const Order = require('../models/Order');
const Enrollment = require('../models/Enrollment');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { orderItems, totalAmount, discountAmount, finalAmount, couponCode, billingDetails } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items specified' });
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalAmount,
      discountAmount: discountAmount || 0,
      finalAmount,
      couponCode: couponCode || '',
      billingDetails: billingDetails || {
        name: req.user.name,
        email: req.user.email
      }
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('orderItems.course', 'title slug thumbnail price');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Ensure only the owner or an admin can access
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('orderItems.course', 'title slug thumbnail');

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .populate('orderItems.course', 'title');

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders
};
