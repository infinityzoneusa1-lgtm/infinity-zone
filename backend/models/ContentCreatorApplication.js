const mongoose = require('mongoose');

const contentCreatorApplicationSchema = new mongoose.Schema({
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
    required: [true, 'Please provide phone/WhatsApp number'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Please provide country'],
    trim: true
  },
  contentFile: {
    filename: {
      type: String,
      required: [true, 'Content file is required']
    },
    originalName: String,
    url: String,
    size: Number,
    mimeType: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  contentType: {
    type: String,
    enum: ['video', 'image', 'audio', 'document', 'other'],
    required: true
  },
  contentCategory: {
    type: String,
    enum: ['beauty', 'lifestyle', 'fashion', 'health', 'tech', 'food', 'travel', 'other'],
    required: true
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  socialMedia: {
    instagram: String,
    tiktok: String,
    youtube: String,
    facebook: String,
    twitter: String
  },
  audience: {
    size: {
      type: String,
      enum: ['1k-10k', '10k-50k', '50k-100k', '100k-500k', '500k-1m', '1m+']
    },
    demographics: {
      primaryAge: {
        type: String,
        enum: ['13-17', '18-24', '25-34', '35-44', '45-54', '55+']
      },
      primaryGender: {
        type: String,
        enum: ['male', 'female', 'mixed']
      },
      primaryLocation: String
    }
  },
  experience: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'professional'],
    default: 'beginner'
  },
  portfolioUrls: [String],
  previousWork: [{
    title: String,
    url: String,
    platform: String,
    engagement: Number,
    createdAt: Date
  }],
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
  exclusivityAgreement: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'under-review', 'approved', 'rejected', 'payment-pending', 'completed'],
    default: 'pending'
  },
  review: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    feedback: String,
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: Date
  },
  payment: {
    amount: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'paid', 'rejected'],
      default: 'pending'
    },
    paidAt: Date,
    transactionId: String,
    paymentMethod: String
  },
  approvedAt: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes
contentCreatorApplicationSchema.index({ email: 1 });
contentCreatorApplicationSchema.index({ status: 1 });
contentCreatorApplicationSchema.index({ contentCategory: 1 });
contentCreatorApplicationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ContentCreatorApplication', contentCreatorApplicationSchema);
