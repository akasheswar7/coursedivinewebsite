const express = require('express');
const router = express.Router();
const {
  getPlacements,
  addPlacement,
  deletePlacement
} = require('../controllers/placementController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.route('/')
  .get(getPlacements)
  .post(protect, admin, addPlacement);

router.route('/:id')
  .delete(protect, admin, deletePlacement);

module.exports = router;
