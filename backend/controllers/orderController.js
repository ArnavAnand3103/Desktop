const Order = require('../models/Order');
const Cart = require('../models/Cart');
const mongoose = require('mongoose');

// In-memory store for orders fallback (userId -> orders[])
const mockOrders = {};

// @desc    Create new order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { products, shippingAddress, totalPrice, paymentStatus } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products in order' });
    }

    const isMockMode = mongoose.connection.readyState !== 1;

    if (isMockMode) {
      console.log('Using Mock Order Creation (Development Mode)');
      const order = { 
        _id: "ORD" + Date.now().toString(), 
        products, 
        totalPrice, 
        shippingAddress,
        paymentStatus: paymentStatus || 'pending',
        orderStatus: 'placed',
        createdAt: new Date().toISOString()
      };
      
      if (!mockOrders[req.user._id]) mockOrders[req.user._id] = [];
      mockOrders[req.user._id].push(order);

      // In mock mode we can also optionally clear their mockCart, but for now we just record the order
      return res.status(201).json({ 
        message: 'Order placed successfully (Mock Mode)', 
        order 
      });
    }

    // Real DB logic
    const order = new Order({
      userId: req.user._id,
      products,
      shippingAddress,
      totalPrice,
      paymentStatus: paymentStatus || 'pending',
      orderStatus: 'placed'
    });

    const createdOrder = await order.save();

    // Clear user's cart after successful order
    await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
exports.getMyOrders = async (req, res) => {
  try {
    const isMockMode = mongoose.connection.readyState !== 1;
    if (isMockMode) {
      const orders = mockOrders[req.user._id] || [];
      // Sort desc by createdAt
      const sorted = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.json(sorted);
    }

    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
