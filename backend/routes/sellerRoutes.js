const express = require('express');
const router = express.Router();
const { 
  getSellerProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getSellerOrders,
  getSellerStats
} = require('../controllers/sellerController');
const { protect } = require('../middleware/authMiddleware');
const { isSeller } = require('../middleware/sellerMiddleware');

// All routes here are protected and require seller role
router.use(protect);
router.use(isSeller);

router.get('/stats', getSellerStats);

router.route('/products')
  .get(getSellerProducts)
  .post(createProduct);

router.route('/products/:id')
  .put(updateProduct)
  .delete(deleteProduct);

router.get('/orders', getSellerOrders);

module.exports = router;
