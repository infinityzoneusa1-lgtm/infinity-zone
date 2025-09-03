const express = require('express');
const ProfessionalContact = require('../models/ProfessionalContact');
const { auth, adminAuth } = require('../middleware/auth');
const { professionalContactValidations } = require('../middleware/validation');

const router = express.Router();

// @desc    Submit professional contact form
// @route   POST /api/professionals
// @access  Public
router.post('/', async (req, res) => {
  try {
    const contact = await ProfessionalContact.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: { contact }
    });
  } catch (error) {
    console.error('Professional contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting contact form'
    });
  }
});

// @desc    Get all professional contacts
// @route   GET /api/professionals
// @access  Public (for admin dashboard)
router.get('/', async (req, res) => {
  try {
    const contacts = await ProfessionalContact.find()
      .sort({ createdAt: -1 });

    res.json(contacts);
  } catch (error) {
    console.error('Error fetching professional contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contacts'
    });
  }
});

// @desc    Delete professional contact
// @route   DELETE /api/professionals/:id
// @access  Public (for admin)
router.delete('/:id', async (req, res) => {
  try {
    const contact = await ProfessionalContact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Professional contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Professional contact deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting professional contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting contact'
    });
  }
});

module.exports = router;
