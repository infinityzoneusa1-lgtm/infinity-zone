const mongoose = require('mongoose');

const bloggerApplicationSchema = new mongoose.Schema({
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
  country: {
    type: String,
    required: [true, 'Please provide country'],
    trim: true
  },
  blogCategory: {
    type: String,
    required: [true, 'Please provide blog category'],
    trim: true,
    maxlength: [100, 'Blog category cannot be more than 100 characters']
  },
  website: {
    type: String,
    required: [true, 'Please provide website URL'],
    trim: true,
    maxlength: [500, 'Website URL cannot be more than 500 characters']
  },
  socialMedia: {
    instagram: String,
    facebook: String,
    twitter: String,
    youtube: String,
    tiktok: String,
    linkedin: String
  },
  blogStats: {
    monthlyPageViews: Number,
    subscribers: Number,
    averageEngagement: Number
  },
  portfolio: [{
    title: String,
    url: String,
    description: String,
    publishedAt: Date
  }],
  preferredCategories: [String],
  experience: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'beginner'
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
    enum: ['pending', 'under-review', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },
  reviewNotes: String,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date,
  approvedAt: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  commission: {
    rate: {
      type: Number,
      min: [0, 'Commission rate cannot be negative'],
      max: [50, 'Commission rate cannot be more than 50%'],
      default: 10
    },
    paymentMethod: {
      type: String,
      enum: ['paypal', 'bank-transfer', 'stripe'],
      default: 'paypal'
    }
  }
}, {
  timestamps: true
});

// Indexes
bloggerApplicationSchema.index({ email: 1 });
bloggerApplicationSchema.index({ status: 1 });
bloggerApplicationSchema.index({ createdAt: -1 });
bloggerApplicationSchema.index({ blogCategory: 1 });

module.exports = mongoose.model('BloggerApplication', bloggerApplicationSchema);
