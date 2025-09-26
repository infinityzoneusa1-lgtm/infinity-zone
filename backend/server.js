const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
require('express-async-errors');
require('dotenv').config();

// Import database setup
const database = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const adminOrderRoutes = require('./routes/adminOrders');
const categoryRoutes = require('./routes/categories');
const vendorRoutes = require('./routes/vendors');
const bloggerRoutes = require('./routes/bloggers');
const contentCreatorRoutes = require('./routes/contentCreators');
const professionalRoutes = require('./routes/professionals');
const contactRoutes = require('./routes/contact');
const internshipRoutes = require('./routes/internships');
const stripeRoutes = require('./routes/stripe');
const adminAuthRoutes = require('./routes/adminAuth');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Compression middleware
app.use(compression());

// CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'https://infinity-zone.vercel.app',
      'https://infinity-zone-web.vercel.app',
      'https://infinityzonemarketplace.com',
      'https://www.infinityzonemarketplace.com'
    ].filter(Boolean);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Connect to Database
database.connect().then(async (connected) => {
  if (connected) {
    console.log('🎉 Database setup completed');
    
    // Create default super admin
    try {
      const AdminUser = require('./models/AdminUser');
      await AdminUser.createDefaultSuperAdmin();
    } catch (error) {
      console.log('⚠️  Error setting up default admin:', error.message);
    }
  } else {
    console.log('⚠️  Running without database - some features may not work');
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Infinity Zone API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Infinity Zone API',
    version: '1.0.0',
    endpoints: [
      'GET /api/health - Health check',
      'GET /api/products - Get products',
      'POST /api/auth/login - User login',
      'POST /api/admin/auth/login - Admin login'
    ]
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin/orders', adminOrderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/bloggers', bloggerRoutes);
app.use('/api/content-creators', contentCreatorRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/admin/auth', adminAuthRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`🌐 Server accessible at:`);
  console.log(`   - http://localhost:${PORT}`);
  console.log(`   - http://127.0.0.1:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('Unhandled Rejection:', err.message);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
