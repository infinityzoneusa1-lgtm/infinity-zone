const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth, adminAuth } = require('../middleware/auth');
const { orderValidations } = require('../middleware/validation');

const router = express.Router();

// @desc    Create order
// @route   POST /api/orders
// @access  Private
router.post('/', [auth, orderValidations.create], async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      customer: req.user.id
    };

    const order = await Order.create(orderData);
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    });
  }
});

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.product', 'title images')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.json([]);
  }
});

module.exports = router;
