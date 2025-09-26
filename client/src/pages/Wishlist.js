import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { removeFromWishlist, addToCart } from '../features/cartSlice';
import { FaHeart, FaShoppingCart, FaTrash, FaExpand } from 'react-icons/fa';
import Lightbox from '../components/Lightbox';
import './Wishlist.css';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.cart);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  const openLightbox = (images, index) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (index) => {
    setLightboxIndex(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="wishlist-page"
    >
      <div className="container">
        <h1 className="page-title">My Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <div className="heart-icon">
              <FaHeart />
            </div>
            <h2>Your wishlist is empty</h2>
            <p>Start adding products to your wishlist to save them for later</p>
            <a href="/products" className="btn btn-primary">Continue Shopping</a>
          </div>
        ) : (
          <div className="wishlist-content">
            <div className="wishlist-grid">
              {wishlistItems.map((product) => {
                // Create an array of images for the lightbox
                const productImages = [
                  product.imageUrl,
                  '/images/product2.jpg',
                  '/images/product3.jpg',
                  '/images/product4.jpg'
                ];
                
                return (
                  <motion.div
                    key={product._id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="wishlist-item"
                  >
                    <div className="wishlist-item-image">
                      <LazyLoadImage
                        src={product.imageUrl}
                        alt={product.name}
                        effect="blur"
                        placeholderSrc="/images/default-product.jpg"
                        width="100%"
                        height="100%"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="wishlist-item-overlay">
                        <button 
                          onClick={() => openLightbox(productImages, 0)} 
                          aria-label="Expand image"
                        >
                          <FaExpand />
                        </button>
                      </div>
                    </div>
                    <div className="wishlist-item-details">
                      <h3>{product.name}</h3>
                      <p className="wishlist-item-price">${product.price.toFixed(2)}</p>
                      <div className="wishlist-item-actions">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="btn btn-primary"
                        >
                          <FaShoppingCart className="btn-icon" /> Add to Cart
                        </button>
                        <button 
                          onClick={() => handleRemoveFromWishlist(product._id)}
                          className="btn btn-danger"
                        >
                          <FaTrash className="btn-icon" /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </motion.div>
  );
};

export default Wishlist;