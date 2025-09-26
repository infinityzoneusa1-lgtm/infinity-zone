const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const AdminUser = require('../models/AdminUser');
const router = express.Router();

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-for-admin';

// Middleware to verify admin JWT
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await AdminUser.findById(decoded.id);
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: 'Invalid token or inactive user' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check super admin role
const requireSuperAdmin = (req, res, next) => {
  if (req.admin.role !== 'super_admin') {
    return res.status(403).json({ message: 'Super admin access required' });
  }
  next();
};

// @route   POST /api/admin/auth/login
// @desc    Admin login
// @access  Public
router.post('/login', [
  body('identifier', 'Username or email is required').notEmpty(),
  body('password', 'Password is required').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation errors', 
        errors: errors.array() 
      });
    }

    const { identifier, password } = req.body;

    // Find admin by username or email
    const admin = await AdminUser.findOne({
      $or: [
        { username: identifier },
        { email: identifier }
      ],
      isActive: true
    });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    await admin.updateLastLogin();

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin._id, 
        username: admin.username,
        role: admin.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      admin: admin.toJSON()
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @route   GET /api/admin/auth/me
// @desc    Get current admin user
// @access  Private (Admin)
router.get('/me', authenticateAdmin, async (req, res) => {
  try {
    res.json({
      admin: req.admin.toJSON()
    });
  } catch (error) {
    console.error('Get current admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/admin/auth/logout
// @desc    Admin logout (client-side token removal)
// @access  Private (Admin)
router.post('/logout', authenticateAdmin, async (req, res) => {
  try {
    // In a more secure implementation, you might want to blacklist the token
    res.json({ message: 'logout successful' });
  } catch (error) {
    console.error('logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
});

// @route   GET /api/admin/auth/users
// @desc    Get all admin users (Super Admin only)
// @access  Private (Super Admin)
router.get('/users', authenticateAdmin, requireSuperAdmin, async (req, res) => {
  try {
    const users = await AdminUser.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      users,
      total: users.length
    });
  } catch (error) {
    console.error('Get admin users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/admin/auth/users
// @desc    Create new admin user (Super Admin only)
// @access  Private (Super Admin)
router.post('/users', authenticateAdmin, requireSuperAdmin, [
  body('username', 'Username is required and must be 3-50 characters').isLength({ min: 3, max: 50 }),
  body('email', 'Please provide a valid email').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  body('firstName', 'First name is required').notEmpty(),
  body('lastName', 'Last name is required').notEmpty(),
  body('role', 'Role must be admin or super_admin').isIn(['admin', 'super_admin'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation errors', 
        errors: errors.array() 
      });
    }

    const { username, email, password, firstName, lastName, role } = req.body;

    // Check if user already exists
    const existingUser = await AdminUser.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'Admin user with this username or email already exists' 
      });
    }

    // Create new admin user
    const newAdmin = new AdminUser({
      username,
      email,
      password,
      firstName,
      lastName,
      role,
      createdBy: req.admin._id
    });

    await newAdmin.save();

    res.status(201).json({
      message: 'Admin user created successfully',
      admin: newAdmin.toJSON()
    });

  } catch (error) {
    console.error('Create admin user error:', error);
    res.status(500).json({ message: 'Server error while creating admin user' });
  }
});

// @route   PUT /api/admin/auth/users/:id
// @desc    Update admin user (Super Admin only)
// @access  Private (Super Admin)
router.put('/users/:id', authenticateAdmin, requireSuperAdmin, [
  body('username').optional().isLength({ min: 3, max: 50 }),
  body('email').optional().isEmail(),
  body('firstName').optional().notEmpty(),
  body('lastName').optional().notEmpty(),
  body('role').optional().isIn(['admin', 'super_admin']),
  body('isActive').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation errors', 
        errors: errors.array() 
      });
    }

    const { id } = req.params;
    const updates = req.body;

    // Remove password from updates if provided (use separate endpoint for password changes)
    delete updates.password;

    const updatedAdmin = await AdminUser.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    res.json({
      message: 'Admin user updated successfully',
      admin: updatedAdmin.toJSON()
    });

  } catch (error) {
    console.error('Update admin user error:', error);
    res.status(500).json({ message: 'Server error while updating admin user' });
  }
});

// @route   PUT /api/admin/auth/change-password
// @desc    Change admin password
// @access  Private (Admin)
router.put('/change-password', authenticateAdmin, [
  body('currentPassword', 'Current password is required').notEmpty(),
  body('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation errors', 
        errors: errors.array() 
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Verify current password
    const isCurrentPasswordValid = await req.admin.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    req.admin.password = newPassword;
    await req.admin.save();

    res.json({
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error while changing password' });
  }
});

// @route   DELETE /api/admin/auth/users/:id
// @desc    Delete admin user (Super Admin only)
// @access  Private (Super Admin)
router.delete('/users/:id', authenticateAdmin, requireSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting self
    if (id === req.admin._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const deletedAdmin = await AdminUser.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    res.json({
      message: 'Admin user deleted successfully',
      deletedAdmin: deletedAdmin.toJSON()
    });

  } catch (error) {
    console.error('Delete admin user error:', error);
    res.status(500).json({ message: 'Server error while deleting admin user' });
  }
});

module.exports = router;
