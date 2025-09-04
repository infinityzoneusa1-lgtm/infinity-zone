# Infinity Zone Backend - Render Deployment

## Overview
This is the backend API for Infinity Zone E-commerce Platform, ready for deployment on Render.

## Features
- 🚀 Express.js REST API
- 🛡️ Secure Authentication (JWT)
- 💳 Stripe Payment Integration
- 📧 Email Notifications
- 🖼️ Image Upload (Cloudinary)
- 🔒 Rate Limiting & Security
- 📊 MongoDB Atlas Database

## Deployment Instructions

### 1. Prerequisites
- MongoDB Atlas account with connection string
- Stripe account with API keys
- Cloudinary account for image uploads
- Email service (Gmail/SMTP) for notifications

### 2. Environment Variables
Set these environment variables in your Render dashboard:

```bash
# Required
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
FRONTEND_URL=https://your-frontend-domain.vercel.app

# Stripe Payment
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Image Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin Credentials
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=secure_admin_password
```

### 3. Deploy on Render

#### Option A: Auto Deploy (Recommended)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Select your repository and backend folder
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add all environment variables
7. Deploy!

#### Option B: Manual Deploy
1. Create a new Web Service on Render
2. Upload this backend folder
3. Configure environment variables
4. Deploy

### 4. Database Setup
After deployment, seed your database:
```bash
# This will run automatically on first deployment
npm run seed-atlas
```

### 5. Health Check
Your API will be available at:
```
https://your-app-name.onrender.com/api/health
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/admin/auth/login` - Admin login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status

### Applications
- `POST /api/vendors` - Vendor application
- `POST /api/bloggers` - Blogger application
- `POST /api/content-creators` - Content creator application
- `POST /api/internships` - Internship application
- `POST /api/professionals` - Professional contact

### Contact
- `POST /api/contact` - Contact form submission

### Payment
- `POST /api/stripe/create-payment-intent` - Create payment
- `POST /api/stripe/webhook` - Stripe webhook handler

## Production Optimizations
- ✅ Compression enabled
- ✅ Rate limiting configured
- ✅ Security headers (Helmet)
- ✅ CORS configured
- ✅ Error handling
- ✅ Request logging
- ✅ Database connection pooling

## Support
For deployment issues, check:
1. Environment variables are set correctly
2. MongoDB Atlas IP whitelist (set to 0.0.0.0/0 for cloud deployments)
3. Render logs for detailed error messages

## Important Notes
- This backend is optimized for production deployment
- MongoDB Atlas connection is configured with proper timeouts
- All sensitive data should be in environment variables
- Image uploads are handled by Cloudinary
- Email notifications are configured for Gmail SMTP

## Free Tier Limitations
Render free tier includes:
- 750 hours/month (enough for continuous deployment)
- Automatic sleep after 15 minutes of inactivity
- Cold start delay when waking up
- 512MB RAM, 0.1 CPU

For production use, consider upgrading to paid plans for better performance.
