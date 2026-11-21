const express = require('express');
const router = express.Router();
const { 
  getPlatformStats, 
  getUsers, 
  updateUserRole, 
  deleteUser, 
  getAllProducts, 
  deleteProduct 
} = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.use(protect);
router.use(isAdmin);

router.get('/stats', getPlatformStats);
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);
router.get('/products', getAllProducts);
router.delete('/products/:id', deleteProduct);

module.exports = router;
