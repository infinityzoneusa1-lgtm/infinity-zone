const { body, param, query, validationResult } = require('express-validator');

// Helper function to handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Common validation rules
const commonValidations = {
  email: body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
    
  password: body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
    
  name: (field) => body(field)
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage(`${field} must be between 2 and 50 characters`),
    
  phone: body('phone')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
    
  objectId: (field) => param(field)
    .isMongoId()
    .withMessage(`Invalid ${field}`)
};

// User validation rules
const userValidations = {
  register: [
    commonValidations.name('fullName'),
    commonValidations.email,
    commonValidations.password,
    handleValidationErrors
  ],
  
  login: [
    commonValidations.email,
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors
  ],
  
  updateProfile: [
    commonValidations.name('fullName').optional(),
    commonValidations.email.optional(),
    commonValidations.phone.optional(),
    handleValidationErrors
  ]
};

// Product validation rules
const productValidations = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Title must be between 3 and 200 characters'),
    body('description')
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage('Description must be between 10 and 2000 characters'),
    body('price')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('category')
      .isMongoId()
      .withMessage('Invalid category ID'),
    body('sku')
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('SKU must be between 3 and 50 characters'),
    handleValidationErrors
  ],
  
  update: [
    body('title')
      .optional()
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Title must be between 3 and 200 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage('Description must be between 10 and 2000 characters'),
    body('price')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    handleValidationErrors
  ],
  
  getById: [
    commonValidations.objectId('id'),
    handleValidationErrors
  ]
};

// Order validation rules
const orderValidations = {
  create: [
    body('items')
      .isArray({ min: 1 })
      .withMessage('Order must have at least one item'),
    body('items.*.product')
      .isMongoId()
      .withMessage('Invalid product ID'),
    body('items.*.quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be at least 1'),
    body('shippingAddress.fullName')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Full name is required'),
    body('shippingAddress.email')
      .isEmail()
      .withMessage('Valid email is required'),
    body('shippingAddress.phone')
      .isMobilePhone()
      .withMessage('Valid phone number is required'),
    handleValidationErrors
  ]
};

// Vendor application validation rules
const vendorValidations = {
  apply: [
    commonValidations.name('firstName'),
    commonValidations.name('lastName'),
    commonValidations.email,
    commonValidations.phone,
    body('address')
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage('Address must be between 5 and 200 characters'),
    body('city')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('City is required'),
    body('country')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Country is required'),
    handleValidationErrors
  ]
};

// Blogger application validation rules
const bloggerValidations = {
  apply: [
    commonValidations.name('firstName'),
    commonValidations.name('lastName'),
    commonValidations.email,
    commonValidations.phone,
    body('country')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Country is required'),
    body('blogCategory')
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage('Blog category is required'),
    body('website')
      .isURL()
      .withMessage('Valid website URL is required'),
    body('agreeToTerms')
      .isBoolean()
      .custom(value => value === true)
      .withMessage('You must agree to terms and conditions'),
    handleValidationErrors
  ]
};

// Content creator application validation rules
const contentCreatorValidations = {
  apply: [
    commonValidations.name('firstName'),
    commonValidations.name('lastName'),
    commonValidations.email,
    body('phone')
      .trim()
      .isLength({ min: 5, max: 20 })
      .withMessage('Phone/WhatsApp number is required'),
    body('country')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Country is required'),
    body('agreeToTerms')
      .isBoolean()
      .custom(value => value === true)
      .withMessage('You must agree to terms and conditions'),
    handleValidationErrors
  ]
};

// Contact validation rules
const contactValidations = {
  create: [
    commonValidations.name('firstName'),
    commonValidations.name('lastName'),
    commonValidations.email,
    body('subject')
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage('Subject must be between 5 and 200 characters'),
    body('message')
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage('Message must be between 10 and 2000 characters'),
    handleValidationErrors
  ]
};

// Professional contact validation rules
const professionalContactValidations = {
  create: [
    body('professionalId')
      .isIn(['blessing-essien', 'fatoumata-dibba'])
      .withMessage('Invalid professional ID'),
    commonValidations.name('firstName'),
    commonValidations.name('lastName'),
    commonValidations.email,
    commonValidations.phone,
    body('message')
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage('Message must be between 10 and 2000 characters'),
    body('agreeToTerms')
      .isBoolean()
      .custom(value => value === true)
      .withMessage('You must agree to terms and conditions'),
    handleValidationErrors
  ]
};

// Pagination validation
const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors
];

module.exports = {
  userValidations,
  productValidations,
  orderValidations,
  vendorValidations,
  bloggerValidations,
  contentCreatorValidations,
  contactValidations,
  professionalContactValidations,
  paginationValidation,
  handleValidationErrors
};
