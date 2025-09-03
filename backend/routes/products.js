const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { auth, adminAuth, vendorAuth, optionalAuth } = require('../middleware/auth');
const { productValidations, paginationValidation } = require('../middleware/validation');
const { uploadConfigs } = require('../middleware/upload');

const router = express.Router();

// @desc    Get all products
// @route   GET /api/products
// @access  Public
router.get('/', [paginationValidation, optionalAuth], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build query - for admin, get all products regardless of status
    let query = {};
    if (!req.query.admin) {
      query.status = 'active';
    }
    
    // Search
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }
    
    // Category filter
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
    }
    
    // Brand filter
    if (req.query.brand) {
      query.brand = req.query.brand;
    }
    
    // Features filter
    if (req.query.featured === 'true') {
      query.isFeature = true;
    }
    
    if (req.query.bestseller === 'true') {
      query.isBestseller = true;
    }
    
    if (req.query.new === 'true') {
      query.isNewProduct = true;
    }

    // Sort options
    let sort = {};
    switch (req.query.sortBy) {
      case 'price-low':
        sort.price = 1;
        break;
      case 'price-high':
        sort.price = -1;
        break;
      case 'rating':
        sort['ratings.average'] = -1;
        break;
      case 'newest':
        sort.createdAt = -1;
        break;
      default:
        sort.createdAt = -1;
    }

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .select('-reviews')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    // For admin panel, return simple array format
    if (req.query.admin) {
      return res.json(products);
    }

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products'
    });
  }
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching product with ID:', req.params.id);
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug');
      // Removed .populate('reviews') and .populate('vendor') since these models don't exist yet

    if (!product) {
      console.log('Product not found in database');
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    console.log('Product found:', product.title);
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product'
    });
  }
});

// @desc    Create product
// @route   POST /api/products
// @access  Private (Admin/Vendor) - simplified for admin panel
router.post('/', async (req, res) => {
  try {
    const productData = { ...req.body };
    
    // Generate SKU if not provided
    const sku = productData.sku || `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    
    // Find or create category
    let categoryId = productData.category;
    if (typeof productData.category === 'string' && !mongoose.Types.ObjectId.isValid(productData.category)) {
      // Try to find existing category by name
      let category = await Category.findOne({ name: productData.category });
      if (!category) {
        // Create new category
        category = await Category.create({
          name: productData.category,
          slug: productData.category.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-')
        });
      }
      categoryId = category._id;
    }
    
    // Prepare images array
    let images = [];
    if (productData.image) {
      images = [{
        url: productData.image,
        alt: productData.name || 'Product image',
        isPrimary: true
      }];
    }
    
    // Create product with correct field mapping
    const product = await Product.create({
      title: productData.name, // Map name -> title
      description: productData.description,
      price: productData.price,
      category: categoryId,
      sku: sku,
      images: images,
      inventory: {
        stock: productData.stock || 0,
        trackInventory: true
      },
      status: productData.status || 'active'
    });

    // Populate category for response
    await product.populate('category', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating product',
      error: error.message
    });
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin/Vendor-own) - temporarily simplified for admin panel
router.put('/:id', async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Prepare update data
    const updateData = { ...req.body };
    
    // Handle category - convert name to ObjectId if needed
    if (updateData.category && typeof updateData.category === 'string' && !mongoose.Types.ObjectId.isValid(updateData.category)) {
      // Try to find existing category by name
      let category = await Category.findOne({ name: updateData.category });
      if (!category) {
        // Create new category if it doesn't exist
        category = await Category.create({
          name: updateData.category,
          slug: updateData.category.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-')
        });
      }
      updateData.category = category._id;
    }
    
    // Handle inventory update
    if (updateData.inventory) {
      updateData['inventory.stock'] = updateData.inventory.stock;
      delete updateData.inventory;
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category', 'name slug');

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating product',
      error: error.message
    });
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin/Vendor-own) - simplified for admin panel
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product'
    });
  }
});

module.exports = router;
