// GSAM (Global State Management) JavaScript Implementation
// Connects with PHP GSAM system

// Global state object (mirroring PHP GSAM)
let appState = window.appState || {
    user: null,
    cart: {},
    language: 'en',
    theme: 'light',
    notifications: [],
    loading: false
};

// GSAM Class
class GSAM {
    constructor() {
        this.listeners = {};
        this.batchUpdates = {};
        this.isBatching = false;
        this.debounceTimers = {};
        this.init();
    }
    
    // Initialize GSAM
    init() {
        // Load state from localStorage if available
        const savedState = localStorage.getItem('farmisian_state');
        if (savedState) {
            try {
                const parsedState = JSON.parse(savedState);
                this.setState({...appState, ...parsedState});
            } catch (e) {
                console.warn('Failed to parse saved state:', e);
            }
        }
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    // Get state value
    get(key, defaultValue = null) {
        return typeof appState[key] !== 'undefined' ? appState[key] : defaultValue;
    }
    
    // Set state value
    set(key, value) {
        if (this.isBatching) {
            this.batchUpdates[key] = value;
            return this;
        }
        
        const oldValue = appState[key];
        appState[key] = value;
        
        // Notify listeners
        this.notifyListeners(key, oldValue, value);
        
        // Save to localStorage with debouncing
        this.debouncedSaveState();
        
        return this;
    }
    
    // Batch update multiple state values for performance
    batchUpdate(data) {
        this.isBatching = true;
        // Collect updates
        Object.assign(this.batchUpdates, data);
        return this;
    }
    
    // Commit batch updates
    commitBatch() {
        if (!this.isBatching) {
            return this;
        }
        
        const notifications = [];
        // Apply all batched updates
        Object.keys(this.batchUpdates).forEach(key => {
            const oldValue = appState[key];
            const newValue = this.batchUpdates[key];
            appState[key] = newValue;
            notifications.push({key, oldValue, newValue});
        });
        
        // Notify listeners for all changes
        notifications.forEach(notification => {
            this.notifyListeners(
                notification.key, 
                notification.oldValue, 
                notification.newValue
            );
        });
        
        // Save state
        this.saveState();
        
        // Reset batch state
        this.batchUpdates = {};
        this.isBatching = false;
        
        return this;
    }
    
    // Update state with an object
    update(data) {
        Object.keys(data).forEach(key => {
            this.set(key, data[key]);
        });
        return this;
    }
    
    // Get entire state
    getState() {
        return {...appState};
    }
    
    // Set entire state
    setState(newState) {
        appState = {...newState};
        this.notifyAllListeners();
        this.saveState();
        return this;
    }
    
    // Subscribe to state changes
    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);
        return this;
    }
    
    // Unsubscribe from state changes
    unsubscribe(key, callback) {
        if (this.listeners[key]) {
            const index = this.listeners[key].indexOf(callback);
            if (index > -1) {
                this.listeners[key].splice(index, 1);
            }
        }
        return this;
    }
    
    // Notify listeners of a specific key change
    notifyListeners(key, oldValue, newValue) {
        if (this.listeners[key]) {
            this.listeners[key].forEach(callback => {
                try {
                    callback(key, oldValue, newValue);
                } catch (e) {
                    console.error('Error in GSAM listener:', e);
                }
            });
        }
    }
    
    // Notify all listeners of any state change
    notifyAllListeners() {
        Object.keys(this.listeners).forEach(key => {
            if (typeof appState[key] !== 'undefined') {
                this.notifyListeners(key, undefined, appState[key]);
            }
        });
    }
    
    // Save state to localStorage with debouncing
    debouncedSaveState() {
        // Clear existing timer
        if (this.debounceTimers.saveState) {
            clearTimeout(this.debounceTimers.saveState);
        }
        
        // Set new timer
        this.debounceTimers.saveState = setTimeout(() => {
            this.saveState();
        }, 100); // Debounce for 100ms
    }
    
    // Save state to localStorage
    saveState() {
        try {
            localStorage.setItem('farmisian_state', JSON.stringify(appState));
        } catch (e) {
            console.warn('Failed to save state to localStorage:', e);
        }
    }
    
    // Set up event listeners
    setupEventListeners() {
        // Listen for storage changes (for cross-tab synchronization)
        window.addEventListener('storage', (event) => {
            if (event.key === 'farmisian_state') {
                try {
                    const newState = JSON.parse(event.newValue);
                    this.setState(newState);
                } catch (e) {
                    console.warn('Failed to parse state from storage event:', e);
                }
            }
        });
    }
    
    // Cart management
    addToCart(product, quantity = 1) {
        const cart = this.get('cart', {});
        const productId = product.id || product._id;
        
        if (cart[productId]) {
            cart[productId].quantity += quantity;
        } else {
            cart[productId] = {
                product: product,
                quantity: quantity
            };
        }
        
        this.set('cart', cart);
        this.addNotification('Product added to cart', 'success');
        return this;
    }
    
    removeFromCart(productId) {
        const cart = this.get('cart', {});
        if (cart[productId]) {
            delete cart[productId];
            this.set('cart', cart);
            this.addNotification('Product removed from cart', 'info');
        }
        return this;
    }
    
    updateCartQuantity(productId, quantity) {
        const cart = this.get('cart', {});
        if (cart[productId]) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                cart[productId].quantity = quantity;
                this.set('cart', cart);
            }
        }
        return this;
    }
    
    getCartTotal() {
        const cart = this.get('cart', {});
        let total = 0;
        
        Object.values(cart).forEach(item => {
            total += (item.product.price || 0) * item.quantity;
        });
        
        return total;
    }
    
    getCartCount() {
        const cart = this.get('cart', {});
        let count = 0;
        
        Object.values(cart).forEach(item => {
            count += item.quantity;
        });
        
        return count;
    }
    
    // User management
    setUser(user) {
        this.set('user', user);
        return this;
    }
    
    getUser() {
        return this.get('user');
    }
    
    isLoggedIn() {
        return !!this.get('user');
    }
    
    logout() {
        this.set('user', null);
        this.set('cart', {});
        this.addNotification('You have been logged out', 'info');
        return this;
    }
    
    // Notification management
    addNotification(message, type = 'info', duration = 5000) {
        const notifications = this.get('notifications', []);
        const notification = {
            id: Date.now() + Math.random(),
            message: message,
            type: type,
            duration: duration,
            timestamp: Date.now()
        };
        notifications.push(notification);
        this.set('notifications', notifications);
        return this;
    }
    
    removeNotification(id) {
        const notifications = this.get('notifications', []);
        const filteredNotifications = notifications.filter(notification => notification.id !== id);
        this.set('notifications', filteredNotifications);
        return this;
    }
    
    // Language management
    setLanguage(language) {
        const supportedLanguages = ['en', 'hi', 'mr'];
        if (supportedLanguages.includes(language)) {
            this.set('language', language);
            this.addNotification(`Language changed to ${language.toUpperCase()}`, 'info');
        }
        return this;
    }
    
    getLanguage() {
        return this.get('language', 'en');
    }
    
    // Theme management
    setTheme(theme) {
        if (['light', 'dark'].includes(theme)) {
            this.set('theme', theme);
            document.body.className = document.body.className.replace(/(light|dark)-theme/g, '');
            document.body.classList.add(`${theme}-theme`);
        }
        return this;
    }
    
    getTheme() {
        return this.get('theme', 'light');
    }
    
    // Loading state
    setLoading(loading) {
        this.set('loading', loading);
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = loading ? 'flex' : 'none';
        }
        return this;
    }
    
    isLoading() {
        return this.get('loading', false);
    }
    
    // Lazy load a module or resource
    async lazyLoad(moduleName, loaderFunction) {
        try {
            this.setLoading(true);
            const module = await loaderFunction();
            this.set(moduleName, module);
            this.setLoading(false);
            return module;
        } catch (error) {
            this.setLoading(false);
            this.addNotification(`Failed to load ${moduleName}`, 'error');
            throw error;
        }
    }
}

// Create GSAM instance
const gsam = new GSAM();

// Helper function to get the global state manager
function state() {
    return gsam;
}

// Initialize the application
function initializeApp() {
    // Set theme
    gsam.setTheme(gsam.getTheme());
    
    // Update cart count in UI
    updateCartCountUI();
    
    // Set up cart listeners
    gsam.subscribe('cart', updateCartCountUI);
    
    // Set up theme listeners
    gsam.subscribe('theme', function(key, oldValue, newValue) {
        document.body.className = document.body.className.replace(/(light|dark)-theme/g, '');
        document.body.classList.add(`${newValue}-theme`);
    });
    
    // Set up notification listeners
    gsam.subscribe('notifications', function(key, oldValue, newValue) {
        if (Array.isArray(newValue) && newValue.length > 0) {
            const latestNotification = newValue[newValue.length - 1];
            showNotification(latestNotification.message, latestNotification.type, latestNotification.duration);
        }
    });
    
    // Initialize theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = `<i class="fas fa-${gsam.getTheme() === 'light' ? 'moon' : 'sun'}"></i>`;
    }
}

// Update cart count in UI
function updateCartCountUI() {
    const cartCount = gsam.getCartCount();
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'inline' : 'none';
    }
}

// Show notification (this would typically be in main.js but included here for completeness)
function showNotification(message, type = 'info', duration = 3000) {
    // This is a simplified version - in a real app, you'd want to use the main.js notification system
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// Make GSAM available globally
window.GSAM = GSAM;
window.state = state;
window.gsam = gsam;

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GSAM, state, gsam };
}