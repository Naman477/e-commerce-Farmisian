const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCart,
  addToWishlist,
  removeFromWishlist
} = require('../controllers/userController');

// Public routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// Protected routes
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/cart').get(protect, getCart);
router.route('/cart/add').post(protect, addToCart);
router.route('/cart/:id').delete(protect, removeFromCart).put(protect, updateCartQuantity);
router.route('/wishlist/add').post(protect, addToWishlist);
router.route('/wishlist/:id').delete(protect, removeFromWishlist);

module.exports = router;