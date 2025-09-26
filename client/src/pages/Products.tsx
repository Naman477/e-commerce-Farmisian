import React, { useState } from 'react';
import { useProducts, useCategories } from '../hooks/useProducts';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Products.css';

const Products: React.FC = () => {
  const { data: products = [], isLoading, isError, error } = useProducts();
  const { data: categories = [] } = useCategories();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  
  // Filter products based on search, category, and sort
  const filteredProducts = React.useMemo(() => {
    let result = [...products];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => 
        product.category === selectedCategory
      );
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return result;
  }, [products, searchTerm, selectedCategory, sortBy]);
  
  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  if (isError) {
    return (
      <div className="container py-5 text-center">
        <h2>Error loading products</h2>
        <p>{error?.message || 'An error occurred while fetching products'}</p>
      </div>
    );
  }
  
  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Our Products</h1>
          <p>Discover our wide range of fresh, quality produce</p>
        </div>
        
        {/* Filters and Search */}
        <div className="filters-section mb-4">
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="search-box">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-secondary">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            
            <div className="col-md-4 mb-3">
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="col-md-4 mb-3">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="row">
              {currentProducts.map((product, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product._id}>
                  <motion.div
                    className="product-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
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
                        <button className="btn btn-light wishlist-btn">
                          <i className="far fa-heart"></i>
                        </button>
                        <button className="btn btn-primary quick-view-btn">
                          <i className="fas fa-eye"></i>
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <div className="product-meta">
                        <span className="product-price">₹{product.price.toFixed(2)}</span>
                        <div className="product-rating">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star-half-alt text-warning"></i>
                          <span className="rating-count">({product.reviews})</span>
                        </div>
                      </div>
                      <Link 
                        to={`/product/${product._id}`} 
                        className="btn btn-success w-100 add-to-cart-btn"
                      >
                        <i className="fas fa-shopping-cart"></i> View Details
                      </Link>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-section">
                <nav aria-label="Products pagination">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        Previous
                      </button>
                    </li>
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <li 
                        key={index + 1} 
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                      >
                        <button 
                          className="page-link" 
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;