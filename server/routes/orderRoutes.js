const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

module.exports = router;
