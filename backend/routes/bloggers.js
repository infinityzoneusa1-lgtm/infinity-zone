const express = require('express');
const BloggerApplication = require('../models/BloggerApplication');
const { auth, adminAuth } = require('../middleware/auth');
const { bloggerValidations } = require('../middleware/validation');

const router = express.Router();

// @desc    Submit blogger application
// @route   POST /api/bloggers
// @access  Public
router.post('/', async (req, res) => {
  try {
    const application = await BloggerApplication.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Blogger application submitted successfully',
      data: { application }
    });
  } catch (error) {
    console.error('Blogger application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting application'
    });
  }
});

// @desc    Get all blogger applications
// @route   GET /api/bloggers
// @access  Public (for admin dashboard)
router.get('/', async (req, res) => {
  try {
    const applications = await BloggerApplication.find()
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Error fetching blogger applications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching applications'
    });
  }
});

// @desc    Delete blogger application
// @route   DELETE /api/bloggers/:id
// @access  Public (for admin)
router.delete('/:id', async (req, res) => {
  try {
    const application = await BloggerApplication.findByIdAndDelete(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Blogger application not found'
      });
    }

    res.json({
      success: true,
      message: 'Blogger application deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blogger application:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting application'
    });
  }
});

module.exports = router;
