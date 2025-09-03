const mongoose = require('mongoose');

const professionalContactSchema = new mongoose.Schema({
  professionalId: {
    type: String,
    required: true,
    enum: ['blessing-essien', 'fatoumata-dibba']
  },
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    maxlength: [2000, 'Message cannot be more than 2000 characters']
  },
  serviceType: {
    type: String,
    enum: ['consultation', 'training', 'collaboration', 'inquiry', 'other']
  },
  preferredContactMethod: {
    type: String,
    enum: ['email', 'phone', 'whatsapp'],
    default: 'email'
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  agreeToTerms: {
    type: Boolean,
    required: [true, 'You must agree to terms and conditions'],
    validate: {
      validator: function(value) {
        return value === true;
      },
      message: 'You must agree to terms and conditions'
    }
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded', 'in-progress', 'completed', 'archived'],
    default: 'new'
  },
  response: {
    message: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  },
  notes: String,
  followUp: {
    required: {
      type: Boolean,
      default: false
    },
    date: Date,
    note: String
  },
  source: {
    type: String,
    enum: ['website', 'social-media', 'referral', 'direct'],
    default: 'website'
  }
}, {
  timestamps: true
});

// Indexes
professionalContactSchema.index({ email: 1 });
professionalContactSchema.index({ professionalId: 1 });
professionalContactSchema.index({ status: 1 });
professionalContactSchema.index({ createdAt: -1 });
professionalContactSchema.index({ urgency: 1 });

module.exports = mongoose.model('ProfessionalContact', professionalContactSchema);
