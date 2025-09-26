<!-- Hero Section with Slideshow -->
<section class="hero-section">
    <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" class="active"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <div class="hero-slide" style="background-image: url('../assets/images/hero1.jpg');">
                    <div class="container">
                        <div class="hero-content animate__animated animate__fadeInLeft">
                            <h1 class="hero-title"><?php echo $translations['farm_to_table']; ?></h1>
                            <p class="hero-subtitle"><?php echo $translations['fresh_produce']; ?></p>
                            <a href="products.php" class="btn btn-primary btn-lg hero-btn animate__animated animate__pulse animate__infinite">
                                <?php echo $translations['shop_now']; ?>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="hero-slide" style="background-image: url('../assets/images/hero2.jpg');">
                    <div class="container">
                        <div class="hero-content animate__animated animate__fadeInRight">
                            <h1 class="hero-title"><?php echo $translations['sustainable_farming']; ?></h1>
                            <p class="hero-subtitle"><?php echo $translations['direct_from_farmers']; ?></p>
                            <a href="about.php" class="btn btn-success btn-lg hero-btn">
                                <?php echo $translations['learn_more']; ?>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="hero-slide" style="background-image: url('../assets/images/hero3.jpg');">
                    <div class="container">
                        <div class="hero-content animate__animated animate__fadeInUp">
                            <h1 class="hero-title"><?php echo $translations['quality_guaranteed']; ?></h1>
                            <p class="hero-subtitle"><?php echo $translations['welcome_message']; ?></p>
                            <a href="contact.php" class="btn btn-warning btn-lg hero-btn">
                                <?php echo $translations['contact_us']; ?>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
        </button>
    </div>
</section>

<!-- Features Section -->
<section class="features-section py-5 bg-light">
    <div class="container">
        <div class="row text-center">
            <div class="col-md-3 mb-4">
                <div class="feature-card animate__animated animate__fadeInUp">
                    <div class="feature-icon">
                        <i class="fas fa-leaf fa-3x text-success"></i>
                    </div>
                    <h3><?php echo $translations['fresh_produce']; ?></h3>
                    <p>Freshly harvested produce delivered to your doorstep</p>
                </div>
            </div>
            <div class="col-md-3 mb-4">
                <div class="feature-card animate__animated animate__fadeInUp" style="animation-delay: 0.2s;">
                    <div class="feature-icon">
                        <i class="fas fa-truck fa-3x text-primary"></i>
                    </div>
                    <h3>Fast Delivery</h3>
                    <p>Quick and reliable delivery within 24 hours</p>
                </div>
            </div>
            <div class="col-md-3 mb-4">
                <div class="feature-card animate__animated animate__fadeInUp" style="animation-delay: 0.4s;">
                    <div class="feature-icon">
                        <i class="fas fa-shield-alt fa-3x text-warning"></i>
                    </div>
                    <h3>Quality Guaranteed</h3>
                    <p>All products are inspected for quality assurance</p>
                </div>
            </div>
            <div class="col-md-3 mb-4">
                <div class="feature-card animate__animated animate__fadeInUp" style="animation-delay: 0.6s;">
                    <div class="feature-icon">
                        <i class="fas fa-rupee-sign fa-3x text-danger"></i>
                    </div>
                    <h3>Best Prices</h3>
                    <p>Direct from farmers for the best prices</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Featured Products Section -->
<section class="products-section py-5">
    <div class="container">
        <div class="section-header text-center mb-5">
            <h2 class="section-title animate__animated animate__fadeIn"><?php echo $translations['featured_products']; ?></h2>
            <p class="section-subtitle">Discover our most popular products</p>
        </div>
        
        <div class="row" id="productsContainer">
            <?php if (!empty($products)): ?>
                <?php foreach ($products as $product): ?>
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-4 product-item">
                        <div class="product-card animate__animated animate__fadeInUp">
                            <div class="product-image">
                                <img src="../assets/images/uploads/<?php echo htmlspecialchars($product['image_url'] ?? 'default.jpg'); ?>" 
                                     alt="<?php echo htmlspecialchars($product['name']); ?>" 
                                     class="card-img-top">
                                <div class="product-actions">
                                    <button class="btn btn-light wishlist-btn" data-product-id="<?php echo $product['_id']; ?>">
                                        <i class="far fa-heart"></i>
                                    </button>
                                    <button class="btn btn-primary quick-view-btn" data-product-id="<?php echo $product['_id']; ?>">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title"><?php echo htmlspecialchars($product['name']); ?></h5>
                                <p class="card-text"><?php echo htmlspecialchars($product['description'] ?? ''); ?></p>
                                <div class="product-meta">
                                    <span class="product-price">₹<?php echo number_format($product['price'], 2); ?></span>
                                    <div class="product-rating">
                                        <i class="fas fa-star text-warning"></i>
                                        <i class="fas fa-star text-warning"></i>
                                        <i class="fas fa-star text-warning"></i>
                                        <i class="fas fa-star text-warning"></i>
                                        <i class="fas fa-star-half-alt text-warning"></i>
                                        <span class="rating-count">(128)</span>
                                    </div>
                                </div>
                                <form method="post" action="add_to_cart.php" class="add-to-cart-form">
                                    <input type="hidden" name="product_id" value="<?php echo $product['_id']; ?>">
                                    <button type="submit" class="btn btn-success w-100 add-to-cart-btn">
                                        <i class="fas fa-shopping-cart"></i> <?php echo $translations['add_to_cart']; ?>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <div class="col-12 text-center">
                    <p>No products available at the moment.</p>
                </div>
            <?php endif; ?>
        </div>
        
        <div class="text-center mt-4">
            <a href="products.php" class="btn btn-outline-primary btn-lg">
                <?php echo $translations['view_all_products']; ?>
            </a>
        </div>
    </div>
</section>

<!-- Testimonials Section -->
<section class="testimonials-section py-5 bg-light">
    <div class="container">
        <div class="section-header text-center mb-5">
            <h2 class="section-title">What Our Customers Say</h2>
            <p class="section-subtitle">Real reviews from our satisfied customers</p>
        </div>
        
        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="testimonial-card animate__animated animate__fadeIn">
                    <div class="testimonial-content">
                        <p>"The freshness of the produce is unmatched. I've been ordering from Farmisian for months and my family loves it!"</p>
                    </div>
                    <div class="testimonial-author">
                        <img src="../assets/images/customer1.jpg" alt="Customer" class="author-avatar">
                        <div class="author-info">
                            <h5>Rajesh Kumar</h5>
                            <p>Regular Customer</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="testimonial-card animate__animated animate__fadeIn" style="animation-delay: 0.2s;">
                    <div class="testimonial-content">
                        <p>"The direct-from-farm concept is brilliant. I can taste the difference in quality and support local farmers at the same time."</p>
                    </div>
                    <div class="testimonial-author">
                        <img src="../assets/images/customer2.jpg" alt="Customer" class="author-avatar">
                        <div class="author-info">
                            <h5>Priya Sharma</h5>
                            <p>Health Enthusiast</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="testimonial-card animate__animated animate__fadeIn" style="animation-delay: 0.4s;">
                    <div class="testimonial-content">
                        <p>"Fast delivery and excellent customer service. The vegetables stay fresh for days. Highly recommended!"</p>
                    </div>
                    <div class="testimonial-author">
                        <img src="../assets/images/customer3.jpg" alt="Customer" class="author-avatar">
                        <div class="author-info">
                            <h5>Amit Patel</h5>
                            <p>New Customer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Newsletter Section -->
<section class="newsletter-section py-5">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-md-6 mb-4 mb-md-0">
                <h3>Subscribe to Our Newsletter</h3>
                <p>Get the latest updates on new products and upcoming sales</p>
            </div>
            <div class="col-md-6">
                <form class="newsletter-form">
                    <div class="input-group">
                        <input type="email" class="form-control" placeholder="Enter your email" required>
                        <button class="btn btn-primary" type="submit">Subscribe</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>