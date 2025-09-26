const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

const router = express.Router();

// Admin authentication middleware
const authenticateAdmin = async (req, res, next) => {
  try {
    console.log('🔐 Admin orders auth middleware called');
    console.log('Authorization header:', req.header('Authorization'));
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('❌ No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-for-admin';
    console.log('🔑 JWT_SECRET:', JWT_SECRET.substring(0, 10) + '...');
    
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('✅ Token decoded:', { id: decoded.id, role: decoded.role });
    
    const admin = await AdminUser.findById(decoded.id);
    console.log('👤 Admin found:', admin ? { id: admin._id, role: admin.role, isActive: admin.isActive } : 'Not found');
    
    if (!admin || !admin.isActive) {
      console.log('❌ Invalid token or inactive user');
      return res.status(401).json({ message: 'Invalid token or inactive user' });
    }

    req.admin = admin;
    console.log('✅ Admin authenticated successfully');
    next();
  } catch (error) {
    console.log('❌ Auth error:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// @desc    Get all orders (admin only)
// @route   GET /api/admin/orders
// @access  Private/Admin
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    console.log('📋 Admin get orders called');
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(100);

    console.log('✅ Orders fetched:', orders.length);
    res.json({
      success: true,
      data: orders,
      count: orders.length
    });
  } catch (error) {
    console.error('❌ Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// @desc    Update order status (admin only)
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
router.put('/:id/status', authenticateAdmin, async (req, res) => {
  try {
    console.log('📝 Admin update order status called');
    console.log('Admin user:', req.admin ? { id: req.admin._id, role: req.admin.role } : 'No admin');
    
    const { status } = req.body;
    const { id } = req.params;

    console.log('Request data:', { orderId: id, newStatus: status });

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      console.log('❌ Invalid status:', status);
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!order) {
      console.log('❌ Order not found:', id);
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    console.log('✅ Order status updated successfully:', { orderId: id, newStatus: status });
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('❌ Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status'
    });
  }
});

// @desc    Delete order (admin only)
// @route   DELETE /api/admin/orders/:id
// @access  Private/Admin
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    console.log('🗑️ Admin delete order called');
    console.log('Admin user:', req.admin ? { id: req.admin._id, role: req.admin.role } : 'No admin');
    
    const { id } = req.params;
    console.log('Order ID to delete:', id);

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      console.log('❌ Order not found:', id);
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    console.log('✅ Order deleted successfully:', id);
    res.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete order'
    });
  }
});

module.exports = router;
