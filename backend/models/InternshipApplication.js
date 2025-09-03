const mongoose = require('mongoose');

const internshipApplicationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide email address'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true
  },
  postalCode: {
    type: String,
    required: [true, 'Please provide postal code'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Please provide country'],
    trim: true
  },
  applyingFor: {
    type: String,
    required: [true, 'Please specify the position you are applying for'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Please provide address'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'Please provide state/province'],
    trim: true
  },
  agreeToTerms: {
    type: Boolean,
    required: [true, 'You must agree to terms and conditions'],
    validate: {
      validator: function(v) {
        return v === true;
      },
      message: 'You must agree to terms and conditions'
    }
  },
  resume: {
    filename: {
      type: String
    },
    originalName: {
      type: String
    },
    url: {
      type: String
    },
    size: {
      type: Number
    },
    mimeType: {
      type: String
    }
  }
}, {
  timestamps: true
});

// Add text index for search functionality
internshipApplicationSchema.index({
  firstName: 'text',
  lastName: 'text',
  email: 'text',
  applyingFor: 'text'
});

module.exports = mongoose.model('InternshipApplication', internshipApplicationSchema);
