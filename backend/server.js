const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Disable Mongoose buffering to avoid the 10s hang
mongoose.set('bufferCommands', false);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Robust CORS with dynamic origin support
// Cookie Logger Middleware (Development only)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Cookies:`, req.cookies);
  next();
});

// Broad CORS for development
app.use(cors({
  origin: true, // Reflect request origin
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/admin', adminRoutes);

// Database connection
const connectDB = async () => {
  try {
    const options = {
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 45000,
    };
    
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    console.log('--- DEVELOPMENT MODE: Running with Mock Fallbacks ---');
    // Still don't exit to allow Mock Mode development
  }
};

mongoose.connection.on('error', err => {
  console.error('Mongoose global connection error:', err);
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
