const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// @desc    Get top-level platform statistics
// @route   GET /api/admin/stats
exports.getPlatformStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSellers = await User.countDocuments({ role: 'seller' });
    const totalProducts = await Product.countDocuments();
    const orders = await Order.find({});
    
    // Calculate total revenue
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

    // Get recently added products
    const recentProducts = await Product.find({}).sort({ createdAt: -1 }).limit(5).populate('sellerId', 'name email');
    
    // Get pending sellers
    const pendingSellers = await User.find({ sellerStatus: 'pending' });

    res.json({
      totalUsers,
      totalSellers,
      totalProducts,
      totalRevenue,
      recentProducts,
      pendingSellersCount: pendingSellers.length,
      pendingSellers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
exports.getUsers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) {
       filter.role = req.query.role;
    }
    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user role & seller status
// @route   PUT /api/admin/users/:id/role
exports.updateUserRole = async (req, res) => {
  try {
    const { role, sellerStatus } = req.body;
    const user = await User.findById(req.params.id).select('-password');
    
    if (user) {
      user.role = role || user.role;
      user.sellerStatus = sellerStatus !== undefined ? sellerStatus : user.sellerStatus;
      
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.role === 'admin') {
        return res.status(400).json({ message: 'Cannot delete an admin user' });
      }
      await user.deleteOne();
      // Optional: Cascade delete products
      await Product.deleteMany({ sellerId: user._id });
      res.json({ message: 'User removed completely' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/admin/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('sellerId', 'name email').sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
