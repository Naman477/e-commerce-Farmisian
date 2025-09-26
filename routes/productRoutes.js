const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getProductsByCategory
} = require('../controllers/productController');

// Public routes
router.route('/').get(getProducts);
router.route('/categories').get(getCategories);
router.route('/:id').get(getProductById);
router.route('/category/:categoryName').get(getProductsByCategory);

// Admin routes
router.route('/').post(protect, admin, createProduct);
router.route('/:id').put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;