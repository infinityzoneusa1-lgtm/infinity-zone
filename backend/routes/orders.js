const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth, adminAuth } = require('../middleware/auth');
const { orderValidations } = require('../middleware/validation');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

const router = express.Router();

// Admin authentication middleware specifically for admin operations
const authenticateAdmin = async (req, res, next) => {
  try {
    console.log('🔐 Admin auth middleware called');
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

// @desc    Create order (public - for guest checkout)
// @route   POST /api/orders/create
// @access  Public
router.post('/create', async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      shipping,
      tax,
      total,
      paymentIntentId,
      paymentStatus = 'completed'
    } = req.body;

    // Validate required fields
    if (!customer || !items || !total) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order information'
      });
    }

    // Create guest customer and product ObjectIds properly
    const { ObjectId } = mongoose.Types;
    const guestCustomerId = new ObjectId();

    // Transform items to match Order schema
    const orderItems = items.map(item => ({
      product: new ObjectId(), // Create new ObjectId for each product
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      selectedCapacity: item.selectedCapacity,
      selectedColor: item.selectedColor,
      subtotal: item.price * item.quantity
    }));

    const orderData = {
      orderNumber: `IZ-${Date.now()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      customer: guestCustomerId,
      items: orderItems,
      pricing: {
        subtotal: subtotal || 0,
        shipping: shipping || 0,
        tax: tax || 0,
        total
      },
      shippingAddress: {
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        zipCode: customer.zipcode,
        country: customer.country
      },
      payment: {
        method: 'stripe',
        status: paymentStatus,
        stripePaymentIntentId: paymentIntentId,
        paidAt: paymentStatus === 'completed' ? new Date() : null
      },
      status: 'confirmed'
    };

    const order = await Order.create(orderData);
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { 
        order,
        orderNumber: order.orderNumber 
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating order',
      error: error.message
    });
  }
});

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

// @desc    Get all orders (admin only)
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(100); // Limit to recent 100 orders

    res.json({
      success: true,
      data: orders,
      count: orders.length
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// @desc    Update order status (admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
router.put('/:id/status', authenticateAdmin, async (req, res) => {
  try {
    console.log('📝 Update order status route called');
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
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status'
    });
  }
});

// @desc    Delete order (admin only)
// @route   DELETE /api/orders/:id
// @access  Private/Admin
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    console.log('🗑️ Delete order route called');
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
