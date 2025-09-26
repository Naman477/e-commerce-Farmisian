<?php
/**
 * Global State Management (GSAM) System
 * Provides a centralized state management solution for the application
 */

class GSAM {
    private static $instance = null;
    private $state = [];
    private $listeners = [];
    private $batchUpdates = [];
    private $isBatching = false;
    
    private function __construct() {
        // Initialize default state
        $this->state = [
            'user' => null,
            'cart' => [],
            'language' => DEFAULT_LANGUAGE,
            'theme' => 'light',
            'notifications' => [],
            'loading' => false
        ];
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new GSAM();
        }
        return self::$instance;
    }
    
    // Get state value
    public function get($key, $default = null) {
        return isset($this->state[$key]) ? $this->state[$key] : $default;
    }
    
    // Set state value
    public function set($key, $value) {
        if ($this->isBatching) {
            $this->batchUpdates[$key] = $value;
            return $this;
        }
        
        $oldValue = isset($this->state[$key]) ? $this->state[$key] : null;
        $this->state[$key] = $value;
        
        // Notify listeners
        $this->notifyListeners($key, $oldValue, $value);
        
        return $this;
    }
    
    // Batch update multiple state values for performance
    public function batchUpdate($data) {
        $this->isBatching = true;
        $oldValues = [];
        
        // Collect old values
        foreach ($data as $key => $value) {
            $oldValues[$key] = isset($this->state[$key]) ? $this->state[$key] : null;
            $this->batchUpdates[$key] = $value;
        }
        
        return $this;
    }
    
    // Commit batch updates
    public function commitBatch() {
        if (!$this->isBatching) {
            return $this;
        }
        
        $notifications = [];
        // Apply all batched updates
        foreach ($this->batchUpdates as $key => $value) {
            $oldValue = isset($this->state[$key]) ? $this->state[$key] : null;
            $this->state[$key] = $value;
            $notifications[] = ['key' => $key, 'oldValue' => $oldValue, 'newValue' => $value];
        }
        
        // Notify listeners for all changes
        foreach ($notifications as $notification) {
            $this->notifyListeners($notification['key'], $notification['oldValue'], $notification['newValue']);
        }
        
        // Reset batch state
        $this->batchUpdates = [];
        $this->isBatching = false;
        
        return $this;
    }
    
    // Update state with an array
    public function update($data) {
        foreach ($data as $key => $value) {
            $this->set($key, $value);
        }
        return $this;
    }
    
    // Get entire state
    public function getState() {
        return $this->state;
    }
    
    // Subscribe to state changes
    public function subscribe($key, $callback) {
        if (!isset($this->listeners[$key])) {
            $this->listeners[$key] = [];
        }
        $this->listeners[$key][] = $callback;
        return $this;
    }
    
    // Unsubscribe from state changes
    public function unsubscribe($key, $callback) {
        if (isset($this->listeners[$key])) {
            $index = array_search($callback, $this->listeners[$key]);
            if ($index !== false) {
                unset($this->listeners[$key][$index]);
            }
        }
        return $this;
    }
    
    // Notify listeners of state changes
    private function notifyListeners($key, $oldValue, $newValue) {
        if (isset($this->listeners[$key])) {
            foreach ($this->listeners[$key] as $callback) {
                // Use try-catch to prevent one failing listener from breaking others
                try {
                    call_user_func($callback, $key, $oldValue, $newValue);
                } catch (Exception $e) {
                    error_log("GSAM Listener Error: " . $e->getMessage());
                }
            }
        }
    }
    
    // Cart management
    public function addToCart($product, $quantity = 1) {
        $cart = $this->get('cart', []);
        $productId = $product['_id'];
        
        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] += $quantity;
        } else {
            $cart[$productId] = [
                'product' => $product,
                'quantity' => $quantity
            ];
        }
        
        $this->set('cart', $cart);
        $this->addNotification('Product added to cart', 'success');
        return $this;
    }
    
    public function removeFromCart($productId) {
        $cart = $this->get('cart', []);
        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            $this->set('cart', $cart);
            $this->addNotification('Product removed from cart', 'info');
        }
        return $this;
    }
    
    public function updateCartQuantity($productId, $quantity) {
        $cart = $this->get('cart', []);
        if (isset($cart[$productId])) {
            if ($quantity <= 0) {
                $this->removeFromCart($productId);
            } else {
                $cart[$productId]['quantity'] = $quantity;
                $this->set('cart', $cart);
            }
        }
        return $this;
    }
    
    public function getCartTotal() {
        $cart = $this->get('cart', []);
        $total = 0;
        
        foreach ($cart as $item) {
            $total += $item['product']['price'] * $item['quantity'];
        }
        
        return $total;
    }
    
    public function getCartCount() {
        $cart = $this->get('cart', []);
        $count = 0;
        
        foreach ($cart as $item) {
            $count += $item['quantity'];
        }
        
        return $count;
    }
    
    // User management
    public function setUser($user) {
        $this->set('user', $user);
        return $this;
    }
    
    public function getUser() {
        return $this->get('user');
    }
    
    public function isLoggedIn() {
        return $this->get('user') !== null;
    }
    
    public function logout() {
        $this->set('user', null);
        $this->set('cart', []);
        $this->addNotification('You have been logged out', 'info');
        return $this;
    }
    
    // Notification management
    public function addNotification($message, $type = 'info', $duration = 5000) {
        $notifications = $this->get('notifications', []);
        $notification = [
            'id' => uniqid(),
            'message' => $message,
            'type' => $type,
            'duration' => $duration,
            'timestamp' => time()
        ];
        $notifications[] = $notification;
        $this->set('notifications', $notifications);
        return $this;
    }
    
    public function removeNotification($id) {
        $notifications = $this->get('notifications', []);
        $notifications = array_filter($notifications, function($notification) use ($id) {
            return $notification['id'] !== $id;
        });
        $this->set('notifications', array_values($notifications));
        return $this;
    }
    
    // Language management
    public function setLanguage($language) {
        if (in_array($language, SUPPORTED_LANGUAGES)) {
            $this->set('language', $language);
            $this->addNotification('Language changed to ' . strtoupper($language), 'info');
        }
        return $this;
    }
    
    public function getLanguage() {
        return $this->get('language', DEFAULT_LANGUAGE);
    }
    
    // Theme management
    public function setTheme($theme) {
        if (in_array($theme, ['light', 'dark'])) {
            $this->set('theme', $theme);
        }
        return $this;
    }
    
    public function getTheme() {
        return $this->get('theme', 'light');
    }
    
    // Loading state
    public function setLoading($loading) {
        $this->set('loading', $loading);
        return $this;
    }
    
    public function isLoading() {
        return $this->get('loading', false);
    }
}

// Helper function to get the global state manager
function state() {
    return GSAM::getInstance();
}
?>