const express = require('express');
const VendorApplication = require('../models/VendorApplication');
const { auth, adminAuth } = require('../middleware/auth');
const { vendorValidations } = require('../middleware/validation');

const router = express.Router();

// @desc    Submit vendor application
// @route   POST /api/vendors
// @access  Public
router.post('/', async (req, res) => {
  try {
    const application = await VendorApplication.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Vendor application submitted successfully',
      data: { application }
    });
  } catch (error) {
    console.error('Vendor application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting application'
    });
  }
});

// @desc    Get all vendor applications
// @route   GET /api/vendors
// @access  Public (for admin dashboard)
router.get('/', async (req, res) => {
  try {
    const applications = await VendorApplication.find()
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Error fetching vendor applications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching applications'
    });
  }
});

// @desc    Delete vendor application
// @route   DELETE /api/vendors/:id
// @access  Public (for admin)
router.delete('/:id', async (req, res) => {
  try {
    const application = await VendorApplication.findByIdAndDelete(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Vendor application not found'
      });
    }

    res.json({
      success: true,
      message: 'Vendor application deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting vendor application:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting application'
    });
  }
});

module.exports = router;
