const Internship = require('../models/Internship');

// @desc    Submit Internship Application
// @route   POST /api/internships/apply
// @access  Public (Optional User)
const applyInternship = async (req, res, next) => {
  try {
    const { name, email, phone, college, qualification, graduationYear, domain, duration, resumeUrl, githubUrl, linkedinUrl } = req.body;

    if (!name || !email || !phone || !college || !domain) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required application details'
      });
    }

    const application = await Internship.create({
      name,
      email: email.toLowerCase(),
      phone,
      college,
      qualification: qualification || 'B.Tech / B.E / BCA / MCA',
      graduationYear: graduationYear || '2025',
      domain,
      duration: duration || '3 Months',
      resumeUrl: resumeUrl || '',
      githubUrl: githubUrl || '',
      linkedinUrl: linkedinUrl || '',
      user: req.user ? req.user._id : null
    });

    res.status(201).json({
      success: true,
      message: 'Internship application submitted successfully! Our talent team will review your profile.',
      data: application
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's internship applications
// @route   GET /api/internships/my-applications
// @access  Private
const getMyInternships = async (req, res, next) => {
  try {
    const applications = await Internship.find({
      $or: [{ user: req.user._id }, { email: req.user.email }]
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all internship applications (Admin)
// @route   GET /api/internships
// @access  Private/Admin
const getAllInternships = async (req, res, next) => {
  try {
    const applications = await Internship.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update internship application status (Admin)
// @route   PUT /api/internships/:id/status
// @access  Private/Admin
const updateInternshipStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const application = await Internship.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (status) application.status = status;
    if (notes) application.notes = notes;

    await application.save();

    res.json({
      success: true,
      message: 'Internship status updated',
      data: application
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  applyInternship,
  getMyInternships,
  getAllInternships,
  updateInternshipStatus
};
