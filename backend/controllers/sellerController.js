const Product = require('../models/Product');
const Order = require('../models/Order');

// @desc    Get all products for the authenticated seller
// @route   GET /api/seller/products
exports.getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user._id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new product
// @route   POST /api/seller/products
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock, images } = req.body;
    
    const product = new Product({
      sellerId: req.user._id,
      title,
      description,
      price,
      category,
      stock,
      images: images || []
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/seller/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, sellerId: req.user._id });

    if (product) {
      product.title = req.body.title || product.title;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.stock = req.body.stock || product.stock;
      product.images = req.body.images || product.images;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/seller/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, sellerId: req.user._id });
    if (product) {
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get orders received by the seller
// @route   GET /api/seller/orders
exports.getSellerOrders = async (req, res) => {
  try {
    const sellerProductIds = await Product.find({ sellerId: req.user._id }).distinct('_id');
    
    // Find all orders that contain at least one product belonging to this seller
    const orders = await Order.find({
      'products.productId': { $in: sellerProductIds }
    }).populate('products.productId').sort({ createdAt: -1 });

    // Filter the products inside each order to only show those belonging to this seller
    const filteredOrders = orders.map(order => {
      const sellerProducts = order.products.filter(p => 
        p.productId && sellerProductIds.some(id => id.equals(p.productId._id))
      );
      return { ...order.toObject(), products: sellerProducts };
    });

    res.json(filteredOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get dashboard statistics for the authenticated seller
// @route   GET /api/seller/stats
exports.getSellerStats = async (req, res) => {
  try {
    const sellerId = req.user._id;
    
    // Get all products owned by this seller
    const products = await Product.find({ sellerId });
    const productCount = products.length;
    const productIds = products.map(p => p._id);

    // Get all orders that include this seller's products
    // We need to look inside the products array within each order
    const orders = await Order.find({
      'products.productId': { $in: productIds }
    });

    let totalRevenue = 0;
    let salesCount = 0;

    orders.forEach(order => {
      order.products.forEach(item => {
        // Only count the items that belong to this seller
        if (productIds.some(id => id.equals(item.productId))) {
          totalRevenue += (item.price * item.quantity);
          salesCount += item.quantity;
        }
      });
    });

    res.json({
      productCount,
      totalRevenue,
      salesCount,
      orderCount: orders.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
