const Product = require('../models/Product');
const mongoose = require('mongoose');

// Sample products for development fallback
let sampleProducts = [
  {
    _id: "65f0a1a1a1a1a1a1a1a1a1a1",
    title: "Premium Wireless Noise-Cancelling Headphones",
    description: "Experience immersive sound with our premium noise-cancelling headphones. Features 30-hour battery life, comfortable fit, and crystal-clear audio quality.",
    price: 299.99,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"],
    stock: 50
  },
  {
    _id: "65f0a1a1a1a1a1a1a1a1a1a2",
    title: "Minimalist Leather Smartwatch",
    description: "A beautifully crafted smartwatch combining classic design with modern technology. Track fitness, receive notifications, and look stylish.",
    price: 159.00,
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"],
    stock: 30
  },
  {
     _id: "65f0a1a1a1a1a1a1a1a1a1a3",
    title: "Eco-Friendly Canvas Backpack",
    description: "Sustainable and stylish canvas backpack perfect for daily commutes and weekend adventures. Multiple compartments and water-resistant fabric.",
    price: 89.50,
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"],
    stock: 100
  }
];

// @desc    Fetch all products
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const isMockMode = mongoose.connection.readyState !== 1;
    if (isMockMode) {
      return res.json(sampleProducts);
    }
    const products = await Product.find({}).populate('sellerId', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id === 'undefined') {
       return res.status(400).json({ message: 'Valid Product ID is required' });
    }

    const isMockMode = mongoose.connection.readyState !== 1;

    if (isMockMode) {
      const product = sampleProducts.find(p => p._id === req.params.id);
      if (product) return res.json(product);
      return res.status(404).json({ message: 'Product not found (Mock Mode)' });
    }

    const product = await Product.findById(req.params.id).populate('sellerId', 'name');
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product (Seller only)
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const { title, price, description, images, category, stock } = req.body;

    const isMockMode = mongoose.connection.readyState !== 1;
    if (isMockMode) {
      console.log('Using Mock Product Creation');
      const product = {
        _id: "PROD" + Date.now().toString(),
        title, price: Number(price), description, images, category, stock: Number(stock),
        sellerId: { _id: req.user._id, name: req.user.name }
      };
      sampleProducts.unshift(product);
      return res.status(201).json(product);
    }

    const product = new Product({
      title,
      price,
      description,
      images,
      category,
      stock,
      sellerId: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product (Seller only)
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const { title, price, description, images, category, stock } = req.body;

    const isMockMode = mongoose.connection.readyState !== 1;
    if (isMockMode) {
      const idx = sampleProducts.findIndex(p => p._id === req.params.id);
      if (idx !== -1) {
        let product = sampleProducts[idx];
        const sellerMid = product.sellerId?._id || product.sellerId;
        if (sellerMid?.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
          return res.status(401).json({ message: 'Not authorized' });
        }
        product = { ...product, title: title ?? product.title, price: price ?? product.price, description: description ?? product.description, images: images ?? product.images, category: category ?? product.category, stock: stock ?? product.stock };
        sampleProducts[idx] = product;
        return res.json(product);
      }
      return res.status(404).json({ message: 'Product not found (Mock Mode)' });
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      // Check if the user is the seller of the product
      if (product.sellerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Not authorized to edit this product' });
      }

      product.title = title !== undefined ? title : product.title;
      product.price = price !== undefined ? price : product.price;
      product.description = description !== undefined ? description : product.description;
      product.images = images !== undefined ? images : product.images;
      product.category = category !== undefined ? category : product.category;
      product.stock = stock !== undefined ? stock : product.stock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product (Seller only)
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const isMockMode = mongoose.connection.readyState !== 1;
    if (isMockMode) {
      const idx = sampleProducts.findIndex(p => p._id === req.params.id);
      if (idx !== -1) {
        let product = sampleProducts[idx];
        const sellerMid = product.sellerId?._id || product.sellerId;
        if (sellerMid?.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
          return res.status(401).json({ message: 'Not authorized' });
        }
        sampleProducts.splice(idx, 1);
        return res.json({ message: 'Product removed' });
      }
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      if (product.sellerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Not authorized to delete this product' });
      }
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
