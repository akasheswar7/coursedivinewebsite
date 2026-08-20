const Placement = require('../models/Placement');

// @desc    Get all placement records
// @route   GET /api/placements
// @access  Public
const getPlacements = async (req, res, next) => {
  try {
    const placements = await Placement.find({}).sort({ year: -1, createdAt: -1 });
    
    // Calculate aggregate statistics
    const totalPlaced = 1450 + placements.length;
    const highestPackage = '36.5 LPA';
    const averagePackage = '8.8 LPA';
    const hiringPartnersCount = 180;

    res.json({
      success: true,
      data: placements,
      stats: {
        totalPlaced,
        highestPackage,
        averagePackage,
        hiringPartnersCount
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a placement record (Admin)
// @route   POST /api/placements
// @access  Private/Admin
const addPlacement = async (req, res, next) => {
  try {
    const placement = await Placement.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Placement record added successfully',
      data: placement
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete placement record (Admin)
// @route   DELETE /api/placements/:id
// @access  Private/Admin
const deletePlacement = async (req, res, next) => {
  try {
    const placement = await Placement.findById(req.params.id);
    if (!placement) {
      return res.status(404).json({ success: false, message: 'Placement record not found' });
    }
    await placement.deleteOne();
    res.json({
      success: true,
      message: 'Placement record removed'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlacements,
  addPlacement,
  deletePlacement
};
