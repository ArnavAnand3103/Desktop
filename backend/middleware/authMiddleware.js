const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');

const protect = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const isMockMode = mongoose.connection.readyState !== 1;
      
      if (isMockMode || (decoded.userId && decoded.userId.length < 20)) {
        // Mock mode or non-ObjectId ID
        req.user = { _id: decoded.userId, name: 'Mock User', role: 'user' };
        return next();
      }

      req.user = await User.findById(decoded.userId).select('-password');
      
      if (!req.user) {
         // Fallback if DB is up but user is mock
         req.user = { _id: decoded.userId, name: 'Mock User', role: 'user' };
      }
      
      next();
    } catch (error) {
      console.error('Auth Middleware Error:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const isSeller = (req, res, next) => {
  if (req.user && (req.user.role === 'seller' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as seller' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

module.exports = { protect, isSeller, isAdmin };
