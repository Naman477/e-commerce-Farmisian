<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/Database.php';
require_once __DIR__ . '/../includes/GSAM.php';

// Initialize database
$db = new Database();

// Initialize global state manager
$state = GSAM::getInstance();

// Set up language
$lang = isset($_GET['lang']) ? $_GET['lang'] : $state->getLanguage();
if (in_array($lang, SUPPORTED_LANGUAGES)) {
    $state->setLanguage($lang);
}

// Load language file
$langFile = __DIR__ . '/../languages/' . $lang . '.php';
if (file_exists($langFile)) {
    include $langFile;
} else {
    include __DIR__ . '/../languages/' . DEFAULT_LANGUAGE . '.php';
}

// Get category from URL parameter
$category = isset($_GET['category']) ? $_GET['category'] : '';

// Get products from database
if (!empty($category)) {
    $products = $db->find('products', ['category' => $category]);
} else {
    $products = $db->find('products');
}

// Include the template
include __DIR__ . '/header.php';
?>

<!-- Products Page Content -->
<section class="products-page py-5">
    <div class="container">
        <div class="row">
            <!-- Sidebar Filters -->
            <div class="col-lg-3 mb-4">
                <div class="sidebar-filter">
                    <h4 class="mb-4">Filters</h4>
                    
                    <!-- Category Filter -->
                    <div class="filter-group mb-4">
                        <h5>Categories</h5>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="category1" checked>
                            <label class="form-check-label" for="category1">All Categories</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="category2">
                            <label class="form-check-label" for="category2">Fruits</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="category3">
                            <label class="form-check-label" for="category3">Vegetables</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="category4">
                            <label class="form-check-label" for="category4">Dairy</label>
                        </div>
                    </div>
                    
                    <!-- Price Filter -->
                    <div class="filter-group mb-4">
                        <h5>Price Range</h5>
                        <div class="price-range">
                            <input type="range" class="form-range" min="0" max="100" step="1" value="50">
                            <div class="price-values d-flex justify-content-between">
                                <span>₹0</span>
                                <span>₹100</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Rating Filter -->
                    <div class="filter-group">
                        <h5>Rating</h5>
                        <div class="rating-filter">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="rating5">
                                <label class="form-check-label" for="rating5">
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <span class="ms-1">5 Stars</span>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="rating4">
                                <label class="form-check-label" for="rating4">
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-secondary"></i>
                                    <span class="ms-1">4 Stars & Up</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Main Content -->
            <div class="col-lg-9">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>
                        <?php 
                        if (!empty($category)) {
                            echo htmlspecialchars(ucfirst($category));
                        } else {
                            echo "All Products";
                        }
                        ?>
                    </h2>
                    <div class="d-flex align-items-center">
                        <span class="me-2">Sort by:</span>
                        <select class="form-select form-select-sm">
                            <option>Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Customer Rating</option>
                            <option>Newest Arrivals</option>
                        </select>
                    </div>
                </div>
                
                <div class="row" id="productsContainer">
                    <?php if (!empty($products)): ?>
                        <?php foreach ($products as $product): ?>
                            <div class="col-lg-4 col-md-6 mb-4 product-item">
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
                                                <?php 
                                                $rating = $product['rating'] ?? 4.5;
                                                for ($i = 1; $i <= 5; $i++): ?>
                                                    <i class="fas fa-star <?php echo $i <= $rating ? 'text-warning' : 'text-secondary'; ?>"></i>
                                                <?php endfor; ?>
                                                <span class="rating-count">(<?php echo $product['reviews'] ?? 0; ?>)</span>
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
                            <div class="alert alert-info">
                                <i class="fas fa-info-circle"></i> No products available in this category.
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
                
                <!-- Pagination -->
                <nav aria-label="Product pagination">
                    <ul class="pagination justify-content-center">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1">Previous</a>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</section>

<?php include __DIR__ . '/footer.php'; ?>