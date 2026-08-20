const User = require('../models/User');
const Course = require('../models/Course');
const Order = require('../models/Order');
const Internship = require('../models/Internship');
const Enquiry = require('../models/Enquiry');
const Certificate = require('../models/Certificate');

// @desc    Get Admin Overview Analytics & Metrics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalCourses = await Course.countDocuments();
    const totalOrders = await Order.countDocuments();
    const paidOrders = await Order.find({ paymentStatus: 'paid' });
    
    const totalRevenue = paidOrders.reduce((sum, order) => sum + (order.finalAmount || 0), 0);
    const pendingOrdersCount = await Order.countDocuments({ paymentStatus: 'pending' });
    const totalInternships = await Internship.countDocuments();
    const pendingInternships = await Internship.countDocuments({ status: { $in: ['Pending', 'Under Review'] } });
    const totalEnquiries = await Enquiry.countDocuments();
    const newEnquiries = await Enquiry.countDocuments({ status: 'New' });
    const totalCertificates = await Certificate.countDocuments();

    // Recent 5 Orders
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .populate('user', 'name email');

    // Recent 5 Enquiries
    const recentEnquiries = await Enquiry.find({})
      .sort({ createdAt: -1 })
      .limit(6);

    // Recent 5 Internships
    const recentInternships = await Internship.find({})
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalCourses,
        totalOrders,
        totalRevenue,
        paidOrdersCount: paidOrders.length,
        pendingOrdersCount,
        totalInternships,
        pendingInternships,
        totalEnquiries,
        newEnquiries,
        totalCertificates,
        recentOrders,
        recentEnquiries,
        recentInternships
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users with search and pagination (Admin)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res, next) => {
  try {
    const { search, role, page = 1, limit = 15 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    if (role && role !== 'All') {
      query.role = role;
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 15;
    const skip = (pageNum - 1) * limitNum;

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      data: users,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role / status
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = async (req, res, next) => {
  try {
    const { role, isVerified } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (role) user.role = role;
    if (isVerified !== undefined) user.isVerified = isVerified;

    await user.save();

    res.json({
      success: true,
      message: 'User updated successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (user.role === 'admin' && user.email === 'admin@coursedivine.com') {
      return res.status(400).json({ success: false, message: 'Cannot delete primary root administrator account' });
    }
    await user.deleteOne();
    res.json({
      success: true,
      message: 'User removed successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminStats,
  getAllUsers,
  updateUser,
  deleteUser
};
