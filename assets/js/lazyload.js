// Lazy Loading Utility for Farmisian E-commerce Website

// Lazy load images
class LazyLoader {
    constructor() {
        this.imageObserver = null;
        this.init();
    }
    
    init() {
        // Create intersection observer for images
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px', // Load 50px before entering viewport
                threshold: 0.01
            });
        }
    }
    
    // Load a single image
    loadImage(img) {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;
        
        if (src) {
            // Create a new image to preload
            const newImage = new Image();
            
            newImage.onload = () => {
                img.src = src;
                if (srcset) {
                    img.srcset = srcset;
                }
                img.classList.remove('lazy');
                img.classList.add('lazy-loaded');
            };
            
            newImage.onerror = () => {
                // Fallback to placeholder if image fails to load
                img.src = '../assets/images/placeholder.jpg';
                img.classList.remove('lazy');
                img.classList.add('lazy-error');
            };
            
            newImage.src = src;
        }
    }
    
    // Observe images for lazy loading
    observeImages() {
        if (this.imageObserver) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => this.imageObserver.observe(img));
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            this.loadAllImages();
        }
    }
    
    // Load all images immediately (fallback)
    loadAllImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => this.loadImage(img));
    }
    
    // Lazy load components/modules
    async loadModule(moduleName, loaderFunction) {
        try {
            // Show loading state if GSAM is available
            if (typeof gsam !== 'undefined') {
                gsam.setLoading(true);
            }
            
            const module = await loaderFunction();
            
            // Hide loading state
            if (typeof gsam !== 'undefined') {
                gsam.setLoading(false);
            }
            
            return module;
        } catch (error) {
            // Hide loading state
            if (typeof gsam !== 'undefined') {
                gsam.setLoading(false);
            }
            
            console.error(`Failed to load module ${moduleName}:`, error);
            
            // Show error notification if GSAM is available
            if (typeof gsam !== 'undefined') {
                gsam.addNotification(`Failed to load ${moduleName}`, 'error');
            }
            
            throw error;
        }
    }
}

// Create singleton instance
const lazyLoader = new LazyLoader();

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    lazyLoader.observeImages();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LazyLoader, lazyLoader };
}

// Make available globally
window.LazyLoader = LazyLoader;
window.lazyLoader = lazyLoader;