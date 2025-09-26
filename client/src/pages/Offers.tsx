import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/productSlice';
import { AppDispatch, RootState } from '../store';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaStar, FaShoppingCart, FaTag, FaPercent, FaFire } from 'react-icons/fa';
import './Offers.css';

const Offers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoading } = useSelector((state: RootState) => state.products);
  
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  
  // Filter products with discounts (originalPrice > price)
  const discountedProducts = products.filter(product => 
    product.originalPrice && product.originalPrice > product.price
  );
  
  return (
    <div className="offers-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">
              <FaFire className="fire-icon" /> Special Offers
            </h1>
            <p className="page-subtitle">
              Don't miss out on our amazing deals and discounts
            </p>
          </div>
        </div>
        
        {/* Offers Stats */}
        <div className="offers-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FaTag />
            </div>
            <div className="stat-content">
              <h3>{discountedProducts.length}</h3>
              <p>Special Offers</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaPercent />
            </div>
            <div className="stat-content">
              <h3>Up to 50%</h3>
              <p>Off Selected Items</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaFire />
            </div>
            <div className="stat-content">
              <h3>Limited Time</h3>
              <p>Hurry, While Stocks Last</p>
            </div>
          </div>
        </div>
        
        {/* Offers Grid */}
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {discountedProducts.map((product, index) => {
              const discountPercentage = product.originalPrice 
                ? Math.round((1 - product.price / product.originalPrice) * 100)
                : 0;
              
              return (
                <div className="col-lg-4 col-md-6 mb-4" key={product._id}>
                  <motion.div
                    className="offer-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="offer-image">
                      <LazyLoadImage
                        src={product.imageUrl || '/images/default-product.jpg'}
                        alt={product.name}
                        effect="blur"
                        placeholderSrc="/images/default-product.jpg"
                        width="100%"
                        height="100%"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="discount-badge">
                        <FaPercent /> {discountPercentage}%
                      </div>
                      <div className="offer-overlay">
                        <Link 
                          to={`/product/${product._id}`} 
                          className="btn btn-light view-details-btn"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <div className="offer-pricing">
                        <div className="current-price">₹{product.price.toFixed(2)}</div>
                        <div className="original-price">₹{product.originalPrice?.toFixed(2)}</div>
                      </div>
                      <div className="product-rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < Math.floor(product.rating) ? 'text-warning' : 'text-muted'} 
                          />
                        ))}
                        <span className="rating-count">({product.reviews})</span>
                      </div>
                      <Link 
                        to={`/product/${product._id}`} 
                        className="btn btn-success w-100 add-to-cart-btn"
                      >
                        <FaShoppingCart /> Add to Cart
                      </Link>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}
        
        {discountedProducts.length === 0 && !isLoading && (
          <div className="text-center py-5">
            <h3>No special offers available at the moment</h3>
            <p className="text-muted">Check back later for amazing deals!</p>
            <Link to="/products" className="btn btn-primary">
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;