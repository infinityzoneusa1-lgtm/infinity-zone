const express = require('express');
const ContentCreatorApplication = require('../models/ContentCreatorApplication');
const { auth, adminAuth } = require('../middleware/auth');
const { contentCreatorValidations } = require('../middleware/validation');
const { uploadConfigs } = require('../middleware/upload');

const router = express.Router();

// @desc    Submit content creator application
// @route   POST /api/content-creators
// @access  Public
router.post('/', async (req, res) => {
  try {
    const application = await ContentCreatorApplication.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Content creator application submitted successfully',
      data: { application }
    });
  } catch (error) {
    console.error('Content creator application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting application'
    });
  }
});

// @desc    Get all content creator applications
// @route   GET /api/content-creators
// @access  Public (for admin dashboard)
router.get('/', async (req, res) => {
  try {
    const applications = await ContentCreatorApplication.find()
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Error fetching content creator applications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching applications'
    });
  }
});

// @desc    Delete content creator application
// @route   DELETE /api/content-creators/:id
// @access  Public (for admin)
router.delete('/:id', async (req, res) => {
  try {
    const application = await ContentCreatorApplication.findByIdAndDelete(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Content creator application not found'
      });
    }

    res.json({
      success: true,
      message: 'Content creator application deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting content creator application:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting application'
    });
  }
});

module.exports = router;
