import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getCategories } from '../features/productSlice';
import { AppDispatch, RootState } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaLeaf, FaTruck, FaShieldAlt, FaRupeeSign, FaStar, FaQuoteLeft, FaPaperPlane, FaEye, FaShoppingCart, FaTag, FaPercent } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import OfferSlider from '../components/OfferSlider';
import './Home.css';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, categories, isLoading } = useSelector((state: RootState) => state.products);
  
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);
  
  // Filter to show only first 8 products
  const featuredProducts = products.slice(0, 8);
  
  // Hero slides data with better images
  const heroSlides = [
    {
      id: 1,
      title: 'Farm to Table',
      subtitle: 'Fresh organic produce delivered to your doorstep',
      image: '/images/farm12.jpg',
      ctaText: 'Shop Now',
      ctaLink: '/products'
    },
    {
      id: 2,
      title: 'Sustainable Farming',
      subtitle: 'Direct from local farmers',
      image: '/images/farm25.jpg',
      ctaText: 'Learn More',
      ctaLink: '/about'
    },
    {
      id: 3,
      title: 'Quality Guaranteed',
      subtitle: 'Fresh, organic produce you can trust',
      image: '/images/farm39.jpg',
      ctaText: 'Contact Us',
      ctaLink: '/contact'
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      text: "The freshness of the produce is unmatched. I've been ordering from Farmisian for months and my family loves it!",
      author: "Rajesh Kumar",
      role: "Regular Customer",
      avatar: "/images/customer1.jpg"
    },
    {
      id: 2,
      text: "The direct-from-farm concept is brilliant. I can taste the difference in quality and support local farmers at the same time.",
      author: "Priya Sharma",
      role: "Health Enthusiast",
      avatar: "/images/customer2.jpg"
    },
    {
      id: 3,
      text: "Fast delivery and excellent customer service. The vegetables stay fresh for days. Highly recommended!",
      author: "Amit Patel",
      role: "New Customer",
      avatar: "/images/customer3.jpg"
    }
  ];
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would send to a backend
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };
  
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          effect="fade"
          loop={true}
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div 
                className="hero-slide" 
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="container">
                  <motion.div 
                    className="hero-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h1 className="hero-title">{slide.title}</h1>
                    <p className="hero-subtitle">{slide.subtitle}</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link to={slide.ctaLink} className="btn btn-primary hero-btn">
                        {slide.ctaText}
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      
      {/* Special Offers Section */}
      <OfferSlider />
      
      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Why Choose Farmisian?
            </motion.h2>
            <p className="section-subtitle">Experience the difference of farm-fresh produce</p>
          </div>
          
          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <motion.div 
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className="feature-icon">
                  <FaLeaf className="text-success" />
                </div>
                <h3>Fresh Produce</h3>
                <p>Freshly harvested produce delivered to your doorstep</p>
              </motion.div>
            </div>
            <div className="col-md-3 mb-4">
              <motion.div 
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className="feature-icon">
                  <FaTruck className="text-primary" />
                </div>
                <h3>Fast Delivery</h3>
                <p>Quick and reliable delivery within 24 hours</p>
              </motion.div>
            </div>
            <div className="col-md-3 mb-4">
              <motion.div 
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className="feature-icon">
                  <FaShieldAlt className="text-warning" />
                </div>
                <h3>Quality Guaranteed</h3>
                <p>All products are inspected for quality assurance</p>
              </motion.div>
            </div>
            <div className="col-md-3 mb-4">
              <motion.div 
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className="feature-icon">
                  <FaRupeeSign className="text-danger" />
                </div>
                <h3>Best Prices</h3>
                <p>Direct from farmers for the best prices</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="products-section py-5 bg-light">
        <div className="container">
          <div className="section-header text-center mb-5">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Featured Products
            </motion.h2>
            <p className="section-subtitle">Discover our most popular products</p>
          </div>
          
          {isLoading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {featuredProducts.map((product, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product._id}>
                  <motion.div
                    className="product-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="product-image">
                      <LazyLoadImage
                        src={product.imageUrl || '/images/default-product.jpg'}
                        alt={product.name}
                        effect="blur"
                        placeholderSrc="/images/default-product.jpg"
                        width="100%"
                        height="100%"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="product-actions">
                        <motion.button 
                          className="btn btn-light wishlist-btn"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaStar />
                        </motion.button>
                        <motion.button 
                          className="btn btn-primary quick-view-btn"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaEye />
                        </motion.button>
                      </div>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="product-badge discount-badge">
                          <FaPercent /> {Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </div>
                      )}
                      <div className="product-badge new-badge">
                        <FaTag /> New
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <div className="product-meta">
                        <div className="product-price-container">
                          <span className="product-price">₹{product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
                          )}
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
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link 
                          to={`/product/${product._id}`} 
                          className="btn btn-success w-100 add-to-cart-btn"
                        >
                          <FaShoppingCart /> View Details
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/products" className="btn btn-outline-primary btn-lg">
                View All Products
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              What Our Customers Say
            </motion.h2>
            <p className="section-subtitle">Real reviews from our satisfied customers</p>
          </div>
          
          <div className="testimonials-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="testimonial-card"
              >
                <div className="testimonial-content">
                  <FaQuoteLeft className="quote-icon" />
                  <p>{testimonials[activeTestimonial].text}</p>
                </div>
                <div className="testimonial-author">
                  <LazyLoadImage
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].author}
                    effect="blur"
                    placeholderSrc="/images/default-avatar.jpg"
                    className="author-avatar"
                    width="60px"
                    height="60px"
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                  />
                  <div className="author-info">
                    <h5>{testimonials[activeTestimonial].author}</h5>
                    <p>{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="testimonial-indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="newsletter-section py-5">
        <div className="container">
          <div className="row items-center">
            <div className="col-md-6 mb-4 md:mb-0">
              <h3 className="text-2xl font-bold">Subscribe to Our Newsletter</h3>
              <p className="mt-2">Get the latest updates on new products and upcoming sales</p>
            </div>
            <div className="col-md-6">
              <form className="newsletter-form flex" onSubmit={handleSubscribe}>
                <div className="input-group flex">
                  <input 
                    type="email" 
                    className="form-control flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
                    placeholder="Enter your email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <motion.button 
                    className="btn btn-primary bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-r-lg transition duration-300 flex items-center"
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPaperPlane className="mr-2" /> Subscribe
                  </motion.button>
                </div>
              </form>
              <AnimatePresence>
                {isSubscribed && (
                  <motion.p 
                    className="subscription-success mt-2 text-green-600"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Thank you for subscribing!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;