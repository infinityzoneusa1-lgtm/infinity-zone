const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Category = require('../models/Category');
const Product = require('../models/Product');
const AdminUser = require('../models/AdminUser');

const seedData = {
  categories: [
    {
      name: 'Beauty Products',
      description: 'Premium beauty and cosmetic products',
      slug: 'beauty-products'
    },
    {
      name: 'Skincare',
      description: 'Professional skincare solutions',
      slug: 'skincare'
    },
    {
      name: 'Makeup',
      description: 'High-quality makeup and tools',
      slug: 'makeup'
    },
    {
      name: 'Services',
      description: 'Professional beauty services',
      slug: 'services'
    },
    {
      name: 'Home & Storage',
      description: 'Home organization and storage solutions',
      slug: 'home-storage'
    }
  ],
  
  products: [
    {
      title: 'Luxury Colostrum Skincare Set',
      description: 'Premium colostrum skincare collection with luxury packaging for ultimate skin care. Contains anti-aging properties and natural ingredients.',
      shortDescription: 'Premium colostrum skincare with luxury packaging',
      price: 120,
      originalPrice: 160,
      discount: 25,
      sku: 'SKU-COLOSTRUM-001',
      images: [{
        url: '/colostrum-skincare-product-luxury-packaging.png',
        alt: 'Colostrum Skincare Luxury Package',
        isPrimary: true
      }],
      inventory: {
        stock: 50,
        lowStockThreshold: 10,
        trackInventory: true
      },
      features: ['Anti-aging properties', 'Natural ingredients', 'Luxury packaging', 'Professional grade'],
      tags: ['skincare', 'luxury', 'anti-aging', 'colostrum'],
      isFeature: true,
      isNewProduct: true,
      status: 'active'
    },
    {
      title: 'Professional Makeup Brush Set',
      description: 'Professional grade makeup brush set with premium synthetic bristles. Perfect for professional makeup artists and beauty enthusiasts.',
      shortDescription: 'Professional makeup brushes with synthetic bristles',
      price: 80,
      originalPrice: 100,
      discount: 20,
      sku: 'SKU-MAKEUP-BRUSH-001',
      images: [{
        url: '/luxury-makeup-products-eyeshadow-palettes-and-brus.png',
        alt: 'Professional Makeup Brush Set',
        isPrimary: true
      }],
      inventory: {
        stock: 75,
        lowStockThreshold: 15,
        trackInventory: true
      },
      variants: [
        {
          type: 'color',
          name: 'Handle Color',
          value: 'Rose Gold',
          price: 80
        },
        {
          type: 'color',
          name: 'Handle Color',
          value: 'Silver',
          price: 75
        }
      ],
      features: ['Professional grade', 'Synthetic bristles', '12 piece set', 'Travel case included'],
      tags: ['makeup', 'brushes', 'professional', 'tools'],
      isBestseller: true,
      status: 'active'
    },
    {
      title: 'Beauty Consultation Service',
      description: 'One-on-one beauty consultation with certified professional consultants. Get personalized beauty advice and recommendations.',
      shortDescription: 'Professional beauty consultation session',
      price: 150,
      originalPrice: 200,
      discount: 25,
      sku: 'SKU-CONSULTATION-001',
      images: [{
        url: '/beauty-consultation-professional.png',
        alt: 'Beauty Consultation Professional',
        isPrimary: true
      }],
      inventory: {
        stock: 20,
        lowStockThreshold: 5,
        trackInventory: true
      },
      specifications: [
        { name: 'Duration', value: '2 Hours' },
        { name: 'Format', value: 'One-on-One' },
        { name: 'Certification', value: 'Professional Certified' }
      ],
      features: ['Certified professionals', 'Personalized advice', '2-hour session', 'Follow-up recommendations'],
      tags: ['consultation', 'service', 'professional', 'beauty'],
      isFeature: true,
      status: 'active'
    }
  ]
};

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('✅ Connected to MongoDB Atlas');
    console.log('📊 Database:', mongoose.connection.name);
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await Product.deleteMany({});
    await Category.deleteMany({});
    
    // Seed categories
    console.log('📁 Seeding categories...');
    const categories = await Category.insertMany(seedData.categories);
    console.log(`✅ Created ${categories.length} categories`);
    
    // Seed products with category references
    console.log('📦 Seeding products...');
    const productsWithCategories = seedData.products.map(product => ({
      ...product,
      category: categories.find(cat => 
        (product.title.includes('Skincare') && cat.name === 'Skincare') ||
        (product.title.includes('Makeup') && cat.name === 'Makeup') ||
        (product.title.includes('Consultation') && cat.name === 'Services') ||
        cat.name === 'Beauty Products'
      )._id
    }));
    
    const products = await Product.insertMany(productsWithCategories);
    console.log(`✅ Created ${products.length} products`);
    
    // Create default admin user
    console.log('👤 Creating default admin user...');
    await AdminUser.createDefaultSuperAdmin();
    console.log('✅ Default admin user created');
    
    console.log('🎉 Database seeded successfully!');
    console.log('📊 Summary:');
    console.log(`   • Categories: ${categories.length}`);
    console.log(`   • Products: ${products.length}`);
    console.log('   • Admin user: 1');
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
