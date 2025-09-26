const express = require('express');
const Contact = require('../models/Contact');
const { auth, adminAuth } = require('../middleware/auth');
const { contactValidations } = require('../middleware/validation');
const { uploadConfigs, handleMulterError } = require('../middleware/upload');

const router = express.Router();

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
router.post('/', uploadConfigs.attachments, async (req, res) => {
  try {
    // Prepare contact data
    const contactData = { ...req.body };
    
    // Add attachments info if uploaded
    if (req.files && req.files.length > 0) {
      contactData.attachments = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        url: file.path,
        size: file.size,
        mimeType: file.mimetype
      }));
    }
    
    const contact = await Contact.create(contactData);
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: { contact }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting contact form'
    });
  }
});

// Apply multer error handling
router.use(handleMulterError);

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Public (for admin dashboard)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 });

    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contacts'
    });
  }
});

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Public (for admin)
router.put('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: { contact }
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating contact'
    });
  }
});

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Public (for admin)
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting contact'
    });
  }
});

module.exports = router;
