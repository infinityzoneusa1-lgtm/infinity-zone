const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = 'uploads/';
    
    // Create different folders based on file type
    if (file.fieldname === 'avatar') {
      uploadPath += 'avatars/';
    } else if (file.fieldname === 'productImages') {
      uploadPath += 'products/';
    } else if (file.fieldname === 'categoryImage') {
      uploadPath += 'categories/';
    } else if (file.fieldname === 'contentFile') {
      uploadPath += 'content/';
    } else if (file.fieldname === 'documents') {
      uploadPath += 'documents/';
    } else if (file.fieldname === 'resume') {
      uploadPath += 'resumes/';
    } else if (file.fieldname === 'attachments') {
      uploadPath += 'attachments/';
    } else {
      uploadPath += 'misc/';
    }
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Define allowed file types based on field name
  const allowedTypes = {
    avatar: /jpeg|jpg|png|gif/,
    productImages: /jpeg|jpg|png|webp/,
    categoryImage: /jpeg|jpg|png|gif|webp/,
    contentFile: /jpeg|jpg|png|gif|mp4|mov|avi|pdf|doc|docx|txt/,
    documents: /pdf|doc|docx|jpeg|jpg|png/,
    resume: /pdf|doc|docx/,
    attachments: /pdf|doc|docx|jpeg|jpg|png|gif|txt/
  };

  const fieldAllowedTypes = allowedTypes[file.fieldname] || /jpeg|jpg|png/;
  const extname = fieldAllowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fieldAllowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error(`Invalid file type for ${file.fieldname}. Allowed types: ${fieldAllowedTypes.source}`));
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10 // Maximum 10 files
  },
  fileFilter: fileFilter
});

// Specific upload configurations
const uploadConfigs = {
  avatar: upload.single('avatar'),
  productImages: upload.array('productImages', 10),
  categoryImage: upload.single('categoryImage'),
  contentFile: upload.single('contentFile'),
  documents: upload.array('documents', 5),
  resume: upload.single('resume'),
  attachments: upload.array('attachments', 5),
  mixed: upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'documents', maxCount: 5 }
  ])
};

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 10MB.'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum allowed is 10 files.'
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected file field.'
      });
    }
  }
  
  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  next(err);
};

module.exports = {
  upload,
  uploadConfigs,
  handleMulterError
};
