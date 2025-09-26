import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { FaShoppingCart, FaUser, FaHeart, FaSearch, FaBars, FaTimes, FaTag, FaBell } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../store';
import { logout } from '../features/authSlice';
import './Header.css';

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { cartItems, wishlistItems } = useSelector((state: RootState) => state.cart);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Mock notifications data
  const [notifications] = useState([
    { id: 1, message: 'New offer available!', type: 'offer', time: '2 min ago' },
    { id: 2, message: 'Your order is on the way', type: 'order', time: '1 hour ago' },
    { id: 3, message: 'New product added', type: 'product', time: '3 hours ago' }
  ]);
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a search
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
  };
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">
              <h1>Farmisian</h1>
            </Link>
          </motion.div>
          
          {/* Mobile menu toggle */}
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          
          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <motion.li className="nav-item" whileHover={{ y: -2 }}>
                <Link to="/" onClick={toggleMenu}>Home</Link>
              </motion.li>
              <motion.li className="nav-item" whileHover={{ y: -2 }}>
                <Link to="/products" onClick={toggleMenu}>Products</Link>
              </motion.li>
              <motion.li className="nav-item" whileHover={{ y: -2 }}>
                <Link to="/about" onClick={toggleMenu}>About</Link>
              </motion.li>
              <motion.li className="nav-item" whileHover={{ y: -2 }}>
                <Link to="/contact" onClick={toggleMenu}>Contact</Link>
              </motion.li>
              <motion.li className="nav-item" whileHover={{ y: -2 }}>
                <Link to="/offers" onClick={toggleMenu}>Offers</Link>
              </motion.li>
            </ul>
          </nav>
          
          {/* Header actions */}
          <div className="header-actions">
            {/* Search */}
            <div className="search-container">
              <button className="search-toggle" onClick={toggleSearch}>
                <FaSearch />
              </button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div 
                    className="search-box"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 300 }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <form onSubmit={handleSearch}>
                      <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <button type="submit" className="search-btn">
                        <FaSearch />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Notifications */}
            <div className="notifications-container">
              <button className="notifications-toggle" onClick={toggleNotifications}>
                <FaBell />
                {notifications.length > 0 && (
                  <span className="notification-count">{notifications.length}</span>
                )}
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    className="notifications-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="notifications-header">
                      <h4>Notifications</h4>
                      <button className="close-btn" onClick={toggleNotifications}>
                        <FaTimes />
                      </button>
                    </div>
                    <div className="notifications-list">
                      {notifications.map(notification => (
                        <div key={notification.id} className="notification-item">
                          <div className="notification-icon">
                            {notification.type === 'offer' && <FaTag />}
                            {notification.type === 'order' && <FaShoppingCart />}
                            {notification.type === 'product' && <FaBell />}
                          </div>
                          <div className="notification-content">
                            <p>{notification.message}</p>
                            <span className="notification-time">{notification.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="notifications-footer">
                      <Link to="/notifications">View All</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Wishlist */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to="/wishlist" className="wishlist-icon">
                <FaHeart />
                {wishlistCount > 0 && (
                  <span className="wishlist-count">{wishlistCount}</span>
                )}
              </Link>
            </motion.div>
            
            {/* Cart */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to="/cart" className="cart-icon">
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
              </Link>
            </motion.div>
            
            {/* User actions */}
            {token ? (
              <div className="user-actions">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link to="/profile" className="user-icon">
                    <FaUser />
                  </Link>
                </motion.div>
                <motion.button 
                  onClick={handleLogout} 
                  className="logout-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="auth-actions">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login" className="login-btn">Login</Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/register" className="register-btn">Register</Link>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;