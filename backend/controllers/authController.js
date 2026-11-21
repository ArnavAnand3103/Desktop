const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// In-memory store for development fallback
const mockUsers = [
  { _id: "admin123", name: "System Admin", email: "admin@store.com", password: "password123", role: "admin", sellerStatus: "none" },
  { _id: "user123", name: "Standard User", email: "user@store.com", password: "password123", role: "user", sellerStatus: "none" },
  { _id: "seller123", name: "Premium Seller", email: "seller@store.com", password: "password123", role: "seller", sellerStatus: "approved" },
  { _id: "avanish123", name: "Avanish Anand", email: "avanish.anand@gmail.com", password: "123456", role: "user", sellerStatus: "none" }
];

// Generate JWT Helper
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', 
    sameSite: 'lax', // Lax is better for cross-port localhost dev
    maxAge: 30 * 24 * 60 * 60 * 1000 
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if database is connected
    const isMockMode = mongoose.connection.readyState !== 1;

    if (isMockMode) {
      console.log('Using Mock Auth Fallback (Development Mode)');
      const userExists = mockUsers.find(u => u.email === email);
      if (userExists) return res.status(400).json({ message: 'User already exists (Mock Mode)' });
      
      const user = { _id: Date.now().toString(), name, email, password, role: role || 'user' };
      mockUsers.push(user);
      generateToken(res, user._id);
      return res.status(201).json(user);
    }

    // Real DB logic
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user'
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isMockMode = mongoose.connection.readyState !== 1;

    if (isMockMode) {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (user) {
        generateToken(res, user._id);
        return res.json(user);
      }
      return res.status(401).json({ message: 'Invalid email or password (Mock Mode)' });
    }

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      generateToken(res, user._id);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
exports.logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};
