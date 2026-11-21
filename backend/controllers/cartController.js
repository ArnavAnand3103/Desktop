const Cart = require('../models/Cart');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// In-memory store for cart fallback (userId -> items)
const mockCarts = {};

// @desc    Get user cart
// @route   GET /api/cart
exports.getCart = async (req, res) => {
  try {
    const isMockMode = mongoose.connection.readyState !== 1;

    if (isMockMode) {
      console.log('Using Mock Cart Fallback (Development Mode)');
      const items = mockCarts[req.user._id] || [];
      
      // Enhance mock items to match the expected frontend structure (populated productId)
      const populatedItems = items.map(item => ({
        ...item,
        productId: {
          _id: item.productId,
          title: "Mock Product",
          price: 99.99,
          images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"],
          category: "General",
          stock: 10
        }
      }));
      
      return res.json({ items: populatedItems });
    }

    let cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    console.log('Add to Cart Request:', { 
      productId, 
      quantity, 
      userId: req.user?._id,
      body: req.body 
    });

    if (!productId || productId === 'undefined' || productId === '[object Object]') {
      return res.status(400).json({ message: 'Valid Product ID is required' });
    }

    const qty = parseInt(quantity) || 1;

    const isMockMode = mongoose.connection.readyState !== 1;

    if (isMockMode) {
      if (!mockCarts[req.user._id]) mockCarts[req.user._id] = [];
      const cartItems = mockCarts[req.user._id];
      const itemIndex = cartItems.findIndex(i => i.productId === productId);

      if (itemIndex > -1) {
        cartItems[itemIndex].quantity += qty;
      } else {
        cartItems.push({ productId, quantity: qty });
      }
      
      // Return enhanced mock items
      const populatedItems = cartItems.map(item => ({
        ...item,
        productId: {
          _id: item.productId,
          title: "Mock Product",
          price: 99.99,
          images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"],
          category: "General",
          stock: 10
        }
      }));
      return res.status(201).json({ items: populatedItems });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user._id,
        items: [{ productId, quantity: qty }]
      });
    } else {
      // Use .equals() for reliable comparison whether productId is an ObjectId or populated object
      const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += qty;
      } else {
        cart.items.push({ productId, quantity: qty });
      }
      await cart.save();
    }
    
    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const isMockMode = mongoose.connection.readyState !== 1;

    if (isMockMode) {
      if (mockCarts[req.user._id]) {
        mockCarts[req.user._id] = mockCarts[req.user._id].filter(item => item.productId !== req.params.productId);
      }
      const items = mockCarts[req.user._id] || [];
      const populatedItems = items.map(item => ({
        productId: { _id: item.productId, title: "Mock Product", price: 99.99, images: [] },
        quantity: item.quantity
      }));
      return res.json({ items: populatedItems });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => !item.productId.equals(req.params.productId));
    await cart.save();

    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const isMockMode = mongoose.connection.readyState !== 1;

    if (isMockMode) {
      if (mockCarts[req.user._id]) {
        const item = mockCarts[req.user._id].find(i => i.productId === req.params.productId);
        if (item) {
          if (quantity <= 0) {
            mockCarts[req.user._id] = mockCarts[req.user._id].filter(i => i.productId !== req.params.productId);
          } else {
            item.quantity = quantity;
          }
        }
      }
      const items = mockCarts[req.user._id] || [];
      const populatedItems = items.map(item => ({
        productId: { _id: item.productId, title: "Mock Product", price: 99.99, images: [] },
        quantity: item.quantity
      }));
      return res.json({ items: populatedItems });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(item => item.productId.equals(req.params.productId));
    if (!item) return res.status(404).json({ message: 'Item not in cart' });

    if (quantity <= 0) {
      cart.items = cart.items.filter(i => !i.productId.equals(req.params.productId));
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
