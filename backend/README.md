# Infinity Zone Backend API

A complete Node.js/Express.js backend with MongoDB for the Infinity Zone e-commerce platform.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **E-commerce**: Products, categories, orders, cart management
- **Stripe Integration**: Payment processing with webhooks
- **File Uploads**: Image and document upload handling
- **Form Submissions**: Contact forms, applications (vendor, blogger, content creator)
- **Professional Services**: Dedicated contact forms for professionals
- **Security**: Helmet, rate limiting, input validation
- **Database**: MongoDB with Mongoose ODM

## 📁 Project Structure

```
backend/
├── models/               # Database schemas
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   ├── Category.js
│   ├── VendorApplication.js
│   ├── BloggerApplication.js
│   ├── ContentCreatorApplication.js
│   ├── ProfessionalContact.js
│   └── Contact.js
├── routes/               # API endpoints
│   ├── auth.js
│   ├── products.js
│   ├── orders.js
│   ├── stripe.js
│   ├── users.js
│   ├── categories.js
│   ├── vendors.js
│   ├── bloggers.js
│   ├── contentCreators.js
│   ├── professionals.js
│   └── contact.js
├── middleware/           # Custom middleware
│   ├── auth.js
│   ├── errorHandler.js
│   ├── upload.js
│   └── validation.js
├── uploads/              # File upload directory
├── .env                  # Environment variables
├── server.js            # Main server file
└── package.json
```

## 🛠️ Installation & Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

Edit the `.env` file with your actual values:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/infinity-zone

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows (if installed as service)
net start MongoDB

# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 4. Run the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/password` - Update password
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin/Vendor)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

### Stripe Payment
- `POST /api/stripe/create-payment-intent` - Create payment intent
- `POST /api/stripe/webhook` - Stripe webhook handler
- `GET /api/stripe/payment-status/:id` - Get payment status

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)

### Applications
- `POST /api/vendors/apply` - Submit vendor application
- `POST /api/bloggers/apply` - Submit blogger application
- `POST /api/content-creators/apply` - Submit content creator application

### Contact Forms
- `POST /api/contact` - Submit general contact form
- `POST /api/professionals/contact` - Submit professional contact form

### Users (Admin)
- `GET /api/users` - Get all users (Admin only)

## 🔧 Usage Examples

### Register User
```javascript
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fullName: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+1234567890'
  })
});
```

### Create Product
```javascript
const formData = new FormData();
formData.append('title', 'Amazing Product');
formData.append('description', 'Product description');
formData.append('price', '99.99');
formData.append('category', 'categoryId');
formData.append('sku', 'PROD-001');
formData.append('productImages', imageFile);

const response = await fetch('http://localhost:5000/api/products', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token
  },
  body: formData
});
```

### Process Payment
```javascript
// 1. Create payment intent
const paymentResponse = await fetch('http://localhost:5000/api/stripe/create-payment-intent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 9999, // $99.99 in cents
    orderDetails: {
      customer: customerData,
      items: cartItems,
      total: 99.99
    }
  })
});

// 2. Use client_secret with Stripe Elements on frontend
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **Input Validation**: express-validator for request validation
- **Security Headers**: Helmet.js for HTTP security headers
- **CORS**: Configurable cross-origin resource sharing
- **File Upload Security**: File type and size validation

## 📊 Database Models

### User Model
- Authentication and profile information
- Role-based access (user, admin, vendor)
- Cart and wishlist functionality
- Account security features

### Product Model
- Complete product information
- Inventory management
- SEO optimization
- Rating and review system
- Variant support

### Order Model
- Order processing workflow
- Payment integration
- Shipping tracking
- Status management

## 🔌 Integrations

### Stripe Payment Processing
- Payment intent creation
- Webhook handling for payment events
- Secure payment processing
- Refund support

### File Upload System
- Multiple file type support
- Organized upload directories
- File size and type validation
- Image optimization ready

## 🧪 Testing

The API includes comprehensive error handling and validation. Test endpoints using:

- **Postman**: Import the API collection
- **curl**: Command line testing
- **Frontend Integration**: Connect with your Next.js app

## 🚀 Deployment

### Production Checklist
1. Set `NODE_ENV=production`
2. Use production MongoDB URI
3. Set strong JWT secret
4. Configure production Stripe keys
5. Set up SSL certificates
6. Configure reverse proxy (nginx)
7. Set up process manager (PM2)

### Deploy to Cloud Platforms
- **Heroku**: Easy deployment with MongoDB Atlas
- **DigitalOcean**: App Platform or Droplets
- **AWS**: EC2 or Elastic Beanstalk
- **Vercel**: Serverless functions (with limitations)

## 📈 Performance

- **Compression**: Gzip compression enabled
- **Database Indexing**: Optimized queries
- **Rate Limiting**: Prevents server overload
- **Error Handling**: Comprehensive error management
- **Logging**: Development and production logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Ready to use!** This backend provides everything needed for your Infinity Zone e-commerce platform. Connect it to your Next.js frontend and start building! 🚀
