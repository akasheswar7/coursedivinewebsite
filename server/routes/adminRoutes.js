const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.use(protect, admin);

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.route('/users/:id')
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
