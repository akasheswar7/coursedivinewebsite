const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const Certificate = require('../models/Certificate');

// @desc    Get logged-in user enrollments
// @route   GET /api/enrollments/my-courses
// @access  Private
const getMyEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate('course')
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      data: enrollments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single enrollment detail by course ID
// @route   GET /api/enrollments/course/:courseId
// @access  Private
const getEnrollmentByCourse = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: req.params.courseId
    }).populate('course');

    if (!enrollment) {
      return res.json({
        success: true,
        isEnrolled: false,
        data: null
      });
    }

    res.json({
      success: true,
      isEnrolled: true,
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update course progress & complete topic
// @route   PUT /api/enrollments/:id/progress
// @access  Private
const updateProgress = async (req, res, next) => {
  try {
    const { topicId, progressPercent } = req.body;
    const enrollment = await Enrollment.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('course');

    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }

    if (topicId && !enrollment.completedTopics.includes(topicId)) {
      enrollment.completedTopics.push(topicId);
    }

    if (progressPercent !== undefined) {
      enrollment.progressPercent = Math.min(100, Math.max(0, Number(progressPercent)));
    }

    // Auto issue certificate if 100% completed
    if (enrollment.progressPercent >= 100 && !enrollment.certificateIssued) {
      enrollment.certificateIssued = true;
      enrollment.status = 'completed';

      const certId = 'CD-CERT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      enrollment.certificateId = certId;

      await Certificate.create({
        certificateId: certId,
        user: req.user._id,
        studentName: req.user.name,
        course: enrollment.course._id,
        courseTitle: enrollment.course.title,
        grade: 'Distinction (A+)'
      });
    }

    await enrollment.save();

    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyEnrollments,
  getEnrollmentByCourse,
  updateProgress
};
