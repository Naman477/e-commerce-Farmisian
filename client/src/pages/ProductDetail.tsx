import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductById } from '../hooks/useProducts';
import { useAddToCart } from '../hooks/useCart';
import { useProductReviews, useAddReview } from '../hooks/useReviews';
import { useProfile } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Lightbox from '../components/Lightbox';
import { FaShoppingCart, FaHeart, FaStar, FaShareAlt, FaFacebookF, FaTwitter, FaPinterest, FaLinkedinIn, FaPlus, FaMinus, FaTruck, FaShieldAlt, FaLeaf } from 'react-icons/fa';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError, error } = useProductById(id || '');
  const { data: reviews = [] } = useProductReviews(id || '');
  const { data: user } = useProfile();
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addReview } = useAddReview();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Sample images for product gallery
  const productImages = [
    product?.imageUrl || '/images/default-product.jpg',
    '/images/product2.jpg',
    '/images/product3.jpg',
    '/images/product4.jpg'
  ];
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({ productId: product._id, quantity });
    }
  };
  
  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // In a real app, this would call an API to add/remove from wishlist
  };
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };
  
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id && user) {
      addReview({
        productId: id,
        review: {
          userId: user.id,
          productId: id,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
        }
      });
      setReviewForm({ rating: 5, comment: '' });
    }
  };
  
  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };
  
  const navigateLightbox = (index: number) => {
    setSelectedImage(index);
  };
  
  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="container py-5 text-center">
        <h2>Error loading product</h2>
        <p>{error?.message || 'An error occurred while fetching the product'}</p>
        <Link to="/products" className="btn btn-primary mt-3">Back to Products</Link>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn btn-primary mt-3">Back to Products</Link>
      </div>
    );
  }
  
  return (
    <div className="product-detail-page">
      <div className="container">
        <motion.div
          className="row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Product Images */}
          <div className="col-lg-6 mb-4">
            <div className="product-gallery">
              <div 
                className="main-image"
                onClick={() => openLightbox(selectedImage)}
              >
                <LazyLoadImage
                  src={productImages[selectedImage]}
                  alt={product.name}
                  effect="blur"
                  placeholderSrc="/images/default-product.jpg"
                  width="100%"
                  height="400px"
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                />
                <div className="zoom-indicator">
                  <FaPlus />
                </div>
              </div>
              <div className="thumbnail-images">
                {productImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <LazyLoadImage
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      effect="blur"
                      placeholderSrc="/images/default-product.jpg"
                      width="100%"
                      height="100%"
                      style={{ objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="col-lg-6">
            <div className="product-info">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/products">Products</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {product.name}
                  </li>
                </ol>
              </nav>
              
              <h1 className="product-title">{product.name}</h1>
              <div className="product-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < Math.floor(product.rating) ? 'text-warning' : 'text-muted'} 
                  />
                ))}
                <span className="rating-count">({product.reviews} reviews)</span>
              </div>
              
              <div className="product-price">
                <span className="current-price">₹{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              
              <p className="product-description">
                {product.description}
              </p>
              
              <div className="product-meta">
                <div className="meta-item">
                  <span className="meta-label">Category:</span>
                  <span className="meta-value">{product.category}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Availability:</span>
                  <span className="meta-value in-stock">In Stock</span>
                </div>
              </div>
              
              {/* Product Highlights */}
              <div className="product-highlights">
                <div className="highlight-item">
                  <FaLeaf className="highlight-icon text-success" />
                  <span>100% Organic</span>
                </div>
                <div className="highlight-item">
                  <FaTruck className="highlight-icon text-primary" />
                  <span>Free Delivery</span>
                </div>
                <div className="highlight-item">
                  <FaShieldAlt className="highlight-icon text-warning" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
              
              <div className="product-actions">
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= 10}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                
                <div className="action-buttons">
                  <motion.button 
                    className="btn btn-success btn-lg add-to-cart-btn"
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaShoppingCart /> Add to Cart
                  </motion.button>
                  
                  <motion.button 
                    className={`btn btn-outline-primary btn-lg wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={handleAddToWishlist}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaHeart /> {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                  </motion.button>
                </div>
              </div>
              
              <div className="product-share">
                <span>Share:</span>
                <div className="share-icons">
                  <motion.a 
                    href="#" 
                    className="share-icon"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaFacebookF />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="share-icon"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTwitter />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="share-icon"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaPinterest />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="share-icon"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaLinkedinIn />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="share-icon"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaShareAlt />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Product Tabs */}
        <div className="product-tabs mt-5">
          <ul className="nav nav-tabs" id="productTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button 
                className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button 
                className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({reviews.length})
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button 
                className={`nav-link ${activeTab === 'shipping' ? 'active' : ''}`}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping & Returns
              </button>
            </li>
          </ul>
          
          <div className="tab-content" id="productTabContent">
            {activeTab === 'description' && (
              <motion.div 
                className="tab-pane fade show active"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3>Product Description</h3>
                <p>{product.description}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <ul className="product-features">
                  <li>100% Organic and Fresh</li>
                  <li>Sourced directly from local farmers</li>
                  <li>Packed with care to maintain freshness</li>
                  <li>Delivered within 24 hours of harvest</li>
                  <li>Rich in vitamins and minerals</li>
                  <li>No preservatives or artificial additives</li>
                </ul>
              </motion.div>
            )}
            
            {activeTab === 'reviews' && (
              <motion.div 
                className="tab-pane fade show active"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3>Customer Reviews</h3>
                <div className="reviews-summary">
                  <div className="average-rating">
                    <span className="rating-value">{product.rating}</span>
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < Math.floor(product.rating) ? 'text-warning' : 'text-muted'} 
                        />
                      ))}
                    </div>
                    <span className="review-count">Based on {product.reviews} reviews</span>
                  </div>
                  
                  {/* Review Form */}
                  {user ? (
                    <div className="review-form mb-4">
                      <h4>Write a Review</h4>
                      <form onSubmit={handleReviewSubmit}>
                        <div className="mb-3">
                          <label className="form-label">Rating</label>
                          <div className="rating-input">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar 
                                key={star}
                                className={star <= reviewForm.rating ? 'text-warning' : 'text-muted'}
                                onClick={() => setReviewForm({...reviewForm, rating: star})}
                                style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Comment</label>
                          <textarea 
                            className="form-control"
                            rows={4}
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                            required
                          ></textarea>
                        </div>
                        <motion.button 
                          type="submit" 
                          className="btn btn-primary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Submit Review
                        </motion.button>
                      </form>
                    </div>
                  ) : (
                    <div className="alert alert-info">
                      Please <Link to="/login">login</Link> to write a review.
                    </div>
                  )}
                  
                  {/* Reviews List */}
                  <div className="reviews-list">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div className="review-item" key={review.id}>
                          <div className="review-header">
                            <h5>{review.user?.name || 'Anonymous'}</h5>
                            <div className="review-rating">
                              {[...Array(5)].map((_, i) => (
                                <FaStar 
                                  key={i} 
                                  className={i < review.rating ? 'text-warning' : 'text-muted'} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="review-date">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                          <p className="review-text">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'shipping' && (
              <motion.div 
                className="tab-pane fade show active"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3>Shipping & Returns</h3>
                <div className="shipping-info">
                  <div className="shipping-card">
                    <h4><FaTruck className="me-2" /> Delivery Information</h4>
                    <ul>
                      <li>Free delivery on orders over ₹500</li>
                      <li>Standard delivery: 1-2 business days</li>
                      <li>Express delivery: Same day (available in select areas)</li>
                      <li>Delivery hours: 7:00 AM - 9:00 PM</li>
                      <li>Fresh produce delivered in eco-friendly packaging</li>
                    </ul>
                  </div>
                  
                  <div className="shipping-card">
                    <h4><FaShieldAlt className="me-2" /> Return Policy</h4>
                    <ul>
                      <li>30-day return period for unopened products</li>
                      <li>Fresh produce must be returned within 24 hours</li>
                      <li>Full refund for damaged or spoiled items</li>
                      <li>Contact customer service for return authorization</li>
                      <li>Return shipping is free for defective items</li>
                    </ul>
                  </div>
                  
                  <div className="shipping-card">
                    <h4><FaLeaf className="me-2" /> Quality Guarantee</h4>
                    <ul>
                      <li>All products are inspected before delivery</li>
                      <li>Freshness guaranteed or your money back</li>
                      <li>Direct from farm to ensure quality</li>
                      <li>Organic certification verified</li>
                    </ul>
                  </div>
                  
                  <div className="contact-info">
                    <h4>Contact Information</h4>
                    <p>If you have any questions about shipping or returns, please contact our customer service:</p>
                    <p><strong>Email:</strong> support@farmisian.com</p>
                    <p><strong>Phone:</strong> +91 98765 43210</p>
                    <p><strong>Hours:</strong> Monday-Sunday 8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {isLightboxOpen && (
        <Lightbox
          images={productImages}
          currentIndex={selectedImage}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </div>
  );
};

export default ProductDetail;