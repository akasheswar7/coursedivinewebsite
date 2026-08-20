const Certificate = require('../models/Certificate');

// @desc    Verify certificate by ID
// @route   GET /api/certificates/verify/:id
// @access  Public
const verifyCertificate = async (req, res, next) => {
  try {
    const certId = req.params.id.trim().toUpperCase();
    const certificate = await Certificate.findOne({ certificateId: certId })
      .populate('course', 'title duration category level thumbnail');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        isValid: false,
        message: 'No valid certificate found with this Certificate ID. Please double check the code.'
      });
    }

    res.json({
      success: true,
      isValid: certificate.isValid,
      data: {
        certificateId: certificate.certificateId,
        studentName: certificate.studentName,
        courseTitle: certificate.courseTitle,
        issueDate: certificate.issueDate,
        grade: certificate.grade,
        isValid: certificate.isValid,
        course: certificate.course
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user certificates
// @route   GET /api/certificates/my-certificates
// @access  Private
const getMyCertificates = async (req, res, next) => {
  try {
    const certificates = await Certificate.find({ user: req.user._id })
      .populate('course', 'title thumbnail duration')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: certificates
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Issue a new certificate manually (Admin)
// @route   POST /api/certificates
// @access  Private/Admin
const issueCertificate = async (req, res, next) => {
  try {
    const { studentName, courseTitle, userId, courseId, grade } = req.body;
    const certId = 'CD-CERT-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const certificate = await Certificate.create({
      certificateId: certId,
      studentName,
      courseTitle,
      user: userId,
      course: courseId,
      grade: grade || 'Distinction (A+)'
    });

    res.status(201).json({
      success: true,
      message: 'Certificate issued successfully',
      data: certificate
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyCertificate,
  getMyCertificates,
  issueCertificate
};
