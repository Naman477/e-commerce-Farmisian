// Main JavaScript file for Farmisian E-commerce Website

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeComponents();
    
    // Set up event listeners
    setupEventListeners();
    
    // Check for back to top button visibility
    handleScroll();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize accessibility features
    initializeAccessibility();
});

// Initialize all components
function initializeComponents() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize Bootstrap popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Initialize carousels
    var carouselElements = document.querySelectorAll('.carousel');
    carouselElements.forEach(function(element) {
        new bootstrap.Carousel(element, {
            interval: 5000,
            pause: 'hover'
        });
    });
    
    // Initialize modals
    var modalElements = document.querySelectorAll('.modal');
    modalElements.forEach(function(element) {
        new bootstrap.Modal(element);
    });
}

// Set up event listeners
function setupEventListeners() {
    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', scrollToTop);
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Search form
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
    
    // Wishlist buttons
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', handleWishlist);
    });
    
    // Quick view buttons
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', handleQuickView);
    });
    
    // Window scroll event with throttling
    window.addEventListener('scroll', throttle(handleScroll, 100));
    
    // Window resize event with throttling
    window.addEventListener('resize', throttle(handleResize, 250));
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Focus management
    setupFocusManagement();
}

// Handle scroll events
function handleScroll() {
    // Show/hide back to top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    // Trigger scroll animations
    triggerScrollAnimations();
}

// Handle window resize
function handleResize() {
    // Reinitialize components that might be affected by resize
    initializeComponents();
}

// Scroll to top of page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
        // For better accessibility, we could also use:
        // behavior: 'smooth',
        // block: 'start'
    });
}

// Toggle theme (light/dark)
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        // Save preference to localStorage
        localStorage.setItem('theme', 'light');
        // Update GSAM state
        if (typeof gsam !== 'undefined') {
            gsam.setTheme('light');
        }
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        // Save preference to localStorage
        localStorage.setItem('theme', 'dark');
        // Update GSAM state
        if (typeof gsam !== 'undefined') {
            gsam.setTheme('dark');
        }
    }
}

// Handle search form submission
function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        // Redirect to search results page
        window.location.href = `search.php?q=${encodeURIComponent(searchTerm)}`;
    }
}

// Handle add to cart
function handleAddToCart(event) {
    event.preventDefault();
    const button = event.target;
    const form = button.closest('form');
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        button.innerHTML = '<i class="fas fa-shopping-cart"></i> Added to Cart';
        
        // Show notification
        showNotification('Product added to cart successfully!', 'success');
        
        // Update cart count
        updateCartCount();
        
        // Reset button after delay
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            button.disabled = false;
        }, 2000);
    }, 1000);
}

// Handle wishlist
function handleWishlist(event) {
    const button = event.target.closest('button');
    const icon = button.querySelector('i');
    
    if (icon.classList.contains('far')) {
        // Add to wishlist
        icon.classList.remove('far');
        icon.classList.add('fas');
        button.classList.add('text-danger');
        showNotification('Product added to wishlist!', 'success');
    } else {
        // Remove from wishlist
        icon.classList.remove('fas');
        icon.classList.add('far');
        button.classList.remove('text-danger');
        showNotification('Product removed from wishlist!', 'info');
    }
}

// Handle quick view
function handleQuickView(event) {
    const productId = event.target.closest('button').dataset.productId;
    showNotification(`Quick view for product ${productId}`, 'info');
    // In a real implementation, this would open a modal with product details
}

// Update cart count
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        // Get current count (in a real app, this would come from the actual cart)
        let currentCount = parseInt(cartCountElement.textContent) || 0;
        currentCount++;
        cartCountElement.textContent = currentCount;
        
        // Add animation
        cartCountElement.classList.add('animate__animated', 'animate__bounce');
        setTimeout(() => {
            cartCountElement.classList.remove('animate__animated', 'animate__bounce');
        }, 1000);
    }
}

// Show notification
function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notifications-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type} animate__animated animate__slideInRight`;
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <div class="flex-grow-1">${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Auto remove after duration
    setTimeout(() => {
        notification.classList.add('animate__slideOutRight');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Handle form submissions with AJAX
function handleFormSubmission(form, successCallback, errorCallback) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitButton.disabled = true;
    
    // Simulate AJAX request
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Call success callback
        if (successCallback) successCallback();
    }, 1500);
}

// Validate form fields
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Keyboard navigation handler
function handleKeyboardNavigation(event) {
    // Skip to content with Tab key
    if (event.key === 'Tab') {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.classList.add('visible');
        }
    }
    
    // Escape key to close modals, dropdowns, etc.
    if (event.key === 'Escape') {
        // Close any open modals
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        });
        
        // Close any open dropdowns
        const dropdowns = document.querySelectorAll('.dropdown.show');
        dropdowns.forEach(dropdown => {
            const dropdownInstance = bootstrap.Dropdown.getInstance(dropdown);
            if (dropdownInstance) {
                dropdownInstance.hide();
            }
        });
    }
}

// Focus management
function setupFocusManagement() {
    // Make skip link visible on focus
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('focus', function() {
            this.classList.add('visible');
        });
        
        skipLink.addEventListener('blur', function() {
            this.classList.remove('visible');
        });
    }
    
    // Manage focus within modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', function() {
            // Focus on the first focusable element in the modal
            const firstFocusable = this.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        });
    });
}

// Initialize accessibility features
function initializeAccessibility() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.hasAttribute('aria-label') && button.querySelector('i') && !button.textContent.trim()) {
            // Add aria-label based on icon class
            const icon = button.querySelector('i');
            if (icon.classList.contains('fa-search')) {
                button.setAttribute('aria-label', 'Search');
            } else if (icon.classList.contains('fa-shopping-cart')) {
                button.setAttribute('aria-label', 'Shopping Cart');
            } else if (icon.classList.contains('fa-user')) {
                button.setAttribute('aria-label', 'User Account');
            } else if (icon.classList.contains('fa-heart')) {
                button.setAttribute('aria-label', 'Add to Wishlist');
            }
        }
    });
    
    // Ensure form elements have proper labels
    const formControls = document.querySelectorAll('input, select, textarea');
    formControls.forEach(control => {
        if (!control.hasAttribute('aria-label') && !control.hasAttribute('aria-labelledby')) {
            const label = document.querySelector(`label[for="${control.id}"]`);
            if (label) {
                control.setAttribute('aria-label', label.textContent);
            }
        }
    });
}

// Enhanced scroll animations with Intersection Observer
function triggerScrollAnimations() {
    // Get all elements with scroll-reveal class
    const elements = document.querySelectorAll('.scroll-reveal:not(.active)');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
    
    // Trigger fade-in-scroll animations
    const fadeElements = document.querySelectorAll('.fade-in-scroll:not(.active)');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Initialize animations with better performance
function initializeAnimations() {
    // Trigger initial animations for elements in viewport
    triggerScrollAnimations();
    
    // Set up intersection observer for better performance
    if ('IntersectionObserver' in window) {
        // Create a single observer for all elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Unobserve to prevent repeated triggers
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px 0px 50px 0px' // Load slightly before/after viewport
        });
        
        // Observe elements with scroll-reveal class
        const revealElements = document.querySelectorAll('.scroll-reveal');
        revealElements.forEach(element => {
            observer.observe(element);
        });
        
        // Observe elements with fade-in-scroll class
        const fadeElements = document.querySelectorAll('.fade-in-scroll');
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Lazy load images for better performance
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    if (src) {
                        img.src = src;
                        img.classList.remove('lazy');
                        img.classList.add('lazy-loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Call lazy load images when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);