const mongoose = require('mongoose');

const vendorApplicationSchema = new mongoose.Schema({
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
  address: {
    type: String,
    required: [true, 'Please provide address'],
    maxlength: [200, 'Address cannot be more than 200 characters']
  },
  city: {
    type: String,
    required: [true, 'Please provide city'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'Please provide state'],
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
  businessInfo: {
    businessName: String,
    businessType: {
      type: String,
      enum: ['individual', 'partnership', 'corporation', 'llc', 'other']
    },
    taxId: String,
    website: String,
    description: String
  },
  bankDetails: {
    accountHolderName: String,
    bankName: String,
    accountNumber: String,
    routingNumber: String,
    swiftCode: String
  },
  documents: [{
    type: {
      type: String,
      enum: ['id', 'business-license', 'tax-certificate', 'bank-statement', 'other']
    },
    url: String,
    filename: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
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
    percentage: {
      type: Number,
      min: [0, 'Commission cannot be negative'],
      max: [50, 'Commission cannot be more than 50%'],
      default: 15
    },
    type: {
      type: String,
      enum: ['percentage', 'fixed'],
      default: 'percentage'
    }
  }
}, {
  timestamps: true
});

// Indexes
vendorApplicationSchema.index({ email: 1 });
vendorApplicationSchema.index({ status: 1 });
vendorApplicationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('VendorApplication', vendorApplicationSchema);
