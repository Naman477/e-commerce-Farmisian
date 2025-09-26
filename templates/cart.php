<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/GSAM.php';

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

// Get cart items
$cart = $state->get('cart', []);

// Calculate totals
$subtotal = 0;
$itemCount = 0;
foreach ($cart as $item) {
    $subtotal += $item['product']['price'] * $item['quantity'];
    $itemCount += $item['quantity'];
}

$shipping = $subtotal > 0 ? 50 : 0;
$tax = $subtotal * 0.18; // 18% tax
$total = $subtotal + $shipping + $tax;

// Include the template
include __DIR__ . '/header.php';
?>

<!-- Cart Page Content -->
<section class="cart-page py-5">
    <div class="container">
        <h1 class="mb-4"><?php echo $translations['cart']; ?></h1>
        
        <?php if (empty($cart)): ?>
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-5x text-muted mb-4"></i>
                <h3><?php echo $translations['empty_cart']; ?></h3>
                <p class="mb-4">Your cart is currently empty. Start shopping now!</p>
                <a href="index.php" class="btn btn-primary btn-lg">
                    <i class="fas fa-shopping-bag"></i> <?php echo $translations['continue_shopping']; ?>
                </a>
            </div>
        <?php else: ?>
            <div class="row">
                <!-- Cart Items -->
                <div class="col-lg-8">
                    <div class="cart-items">
                        <?php foreach ($cart as $productId => $item): ?>
                            <?php 
                            $product = $item['product'];
                            $quantity = $item['quantity'];
                            $itemTotal = $product['price'] * $quantity;
                            ?>
                            <div class="cart-item card mb-3 animate__animated animate__fadeIn">
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col-md-2">
                                            <img src="../assets/images/uploads/<?php echo htmlspecialchars($product['image_url'] ?? 'default.jpg'); ?>" 
                                                 alt="<?php echo htmlspecialchars($product['name']); ?>" 
                                                 class="img-fluid rounded">
                                        </div>
                                        <div class="col-md-4">
                                            <h5><?php echo htmlspecialchars($product['name']); ?></h5>
                                            <p class="text-muted mb-1"><?php echo htmlspecialchars($product['description'] ?? ''); ?></p>
                                            <p class="mb-0">₹<?php echo number_format($product['price'], 2); ?></p>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="input-group">
                                                <button class="btn btn-outline-secondary" type="button" 
                                                        onclick="updateQuantity('<?php echo $productId; ?>', <?php echo $quantity - 1; ?>)">
                                                    <i class="fas fa-minus"></i>
                                                </button>
                                                <input type="number" class="form-control text-center" 
                                                       value="<?php echo $quantity; ?>" 
                                                       min="1" 
                                                       onchange="updateQuantity('<?php echo $productId; ?>', this.value)">
                                                <button class="btn btn-outline-secondary" type="button" 
                                                        onclick="updateQuantity('<?php echo $productId; ?>', <?php echo $quantity + 1; ?>)">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-md-2 text-end">
                                            <h5 class="mb-0">₹<?php echo number_format($itemTotal, 2); ?></h5>
                                        </div>
                                        <div class="col-md-1 text-end">
                                            <button class="btn btn-link text-danger" 
                                                    onclick="removeFromCart('<?php echo $productId; ?>')">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                    
                    <div class="mt-3">
                        <a href="index.php" class="btn btn-outline-primary">
                            <i class="fas fa-arrow-left"></i> <?php echo $translations['continue_shopping']; ?>
                        </a>
                    </div>
                </div>
                
                <!-- Order Summary -->
                <div class="col-lg-4">
                    <div class="card sticky-top animate__animated animate__fadeIn">
                        <div class="card-header">
                            <h4 class="mb-0"><?php echo $translations['order_summary']; ?></h4>
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between">
                                    <span><?php echo $translations['subtotal']; ?> (<?php echo $itemCount; ?> items)</span>
                                    <strong>₹<?php echo number_format($subtotal, 2); ?></strong>
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span><?php echo $translations['shipping']; ?></span>
                                    <strong><?php echo $shipping > 0 ? '₹' . number_format($shipping, 2) : 'FREE'; ?></strong>
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span><?php echo $translations['tax']; ?> (18%)</span>
                                    <strong>₹<?php echo number_format($tax, 2); ?></strong>
                                </li>
                                <li class="list-group-item list-group-item-dark d-flex justify-content-between">
                                    <span><?php echo $translations['total']; ?></span>
                                    <strong>₹<?php echo number_format($total, 2); ?></strong>
                                </li>
                            </ul>
                            
                            <div class="d-grid gap-2 mt-3">
                                <button class="btn btn-success btn-lg" onclick="proceedToCheckout()">
                                    <i class="fas fa-lock"></i> <?php echo $translations['checkout']; ?>
                                </button>
                                <button class="btn btn-outline-primary" onclick="saveForLater()">
                                    <i class="fas fa-heart"></i> <?php echo $translations['save_for_later']; ?>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>
</section>

<script>
// Update cart quantity
function updateQuantity(productId, quantity) {
    if (quantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    // In a real implementation, this would make an AJAX call to update the cart
    state().updateCartQuantity(productId, parseInt(quantity));
    
    // Show notification
    state().addNotification('Cart updated successfully', 'success');
    
    // Reload the page to reflect changes
    location.reload();
}

// Remove item from cart
function removeFromCart(productId) {
    // In a real implementation, this would make an AJAX call to remove the item
    state().removeFromCart(productId);
    
    // Show notification
    state().addNotification('Item removed from cart', 'info');
    
    // Reload the page to reflect changes
    location.reload();
}

// Proceed to checkout
function proceedToCheckout() {
    // In a real implementation, this would redirect to the checkout page
    state().setLoading(true);
    setTimeout(() => {
        state().setLoading(false);
        state().addNotification('Redirecting to checkout...', 'info');
        window.location.href = 'checkout.php';
    }, 1000);
}

// Save for later
function saveForLater() {
    state().addNotification('Items saved for later', 'success');
}
</script>

<?php include __DIR__ . '/footer.php'; ?>