import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { selectCartItems, removeFromCart, updateCartQuantity } from '../features/cartSlice';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector(selectCartItems);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ productId, quantity }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="cart-page"
    >
      <div className="container">
        <h1 className="page-title">Your Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <a href="/products" className="btn btn-primary">Continue Shopping</a>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {items.map(item => (
                <motion.div
                  key={item.product._id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="cart-item"
                >
                  <div className="cart-item-image">
                    <img src={item.product.imageUrl} alt={item.product.name} />
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.product.name}</h3>
                    <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
                    <div className="cart-item-quantity">
                      <button 
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <button 
                      onClick={() => handleRemoveFromCart(item.product._id)}
                      className="btn btn-danger"
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-box">
                <h3>Order Summary</h3>
                <div className="summary-item">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-item">
                  <span>Tax</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>${(total * 1.08).toFixed(2)}</span>
                </div>
                <button className="btn btn-primary btn-block">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;