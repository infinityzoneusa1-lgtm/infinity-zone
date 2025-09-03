const express = require('express');
const InternshipApplication = require('../models/InternshipApplication');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Submit internship application
// @route   POST /api/internships
// @access  Public
router.post('/', async (req, res) => {
  try {
    const application = await InternshipApplication.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Internship application submitted successfully',
      data: { application }
    });
  } catch (error) {
    console.error('Internship application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting application'
    });
  }
});

// @desc    Get all internship applications
// @route   GET /api/internships
// @access  Public (for admin dashboard)
router.get('/', async (req, res) => {
  try {
    const applications = await InternshipApplication.find()
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Error fetching internship applications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching applications'
    });
  }
});

// @desc    Delete internship application
// @route   DELETE /api/internships/:id
// @access  Public (for admin)
router.delete('/:id', async (req, res) => {
  try {
    const application = await InternshipApplication.findByIdAndDelete(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Internship application not found'
      });
    }

    res.json({
      success: true,
      message: 'Internship application deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting internship application:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting application'
    });
  }
});

module.exports = router;
