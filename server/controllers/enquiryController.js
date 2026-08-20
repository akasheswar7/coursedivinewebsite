const Enquiry = require('../models/Enquiry');

// @desc    Submit Contact/Enquiry Form
// @route   POST /api/enquiries
// @access  Public
const submitEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, subject, courseInterest, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required enquiry fields'
      });
    }

    const enquiry = await Enquiry.create({
      name,
      email: email.toLowerCase(),
      phone,
      subject: subject || 'General Course Enquiry',
      courseInterest: courseInterest || 'General',
      message
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Our admissions counselor will contact you within 24 hours.',
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all enquiries (Admin)
// @route   GET /api/enquiries
// @access  Private/Admin
const getAllEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: enquiries
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status (Admin)
// @route   PUT /api/enquiries/:id/status
// @access  Private/Admin
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    enquiry.status = status;
    await enquiry.save();

    res.json({
      success: true,
      message: 'Enquiry status updated',
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitEnquiry,
  getAllEnquiries,
  updateEnquiryStatus
};
