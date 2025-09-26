// Animations JavaScript file for Farmisian E-commerce Website
// Using GSAP for advanced animations

// Check if GSAP is loaded
if (typeof gsap !== 'undefined') {
    // Register ScrollTrigger plugin
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Document Ready Function
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize all animations
        initializeGSAPAnimations();
    });
}

// Initialize GSAP animations
function initializeGSAPAnimations() {
    // Animate hero section
    animateHeroSection();
    
    // Animate features section
    animateFeaturesSection();
    
    // Animate products section
    animateProductsSection();
    
    // Animate testimonials section
    animateTestimonialsSection();
    
    // Set up scroll-triggered animations
    setupScrollAnimations();
    
    // Set up hover animations
    setupHoverAnimations();
}

// Animate hero section
function animateHeroSection() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.from(heroContent, {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out"
        });
    }
    
    // Animate hero buttons with stagger
    const heroButtons = document.querySelectorAll('.hero-btn');
    if (heroButtons.length > 0) {
        gsap.from(heroButtons, {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.7)",
            delay: 0.5
        });
    }
}

// Animate features section
function animateFeaturesSection() {
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        gsap.from(featureCards, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".features-section",
                start: "top 80%"
            }
        });
    }
}

// Animate products section
function animateProductsSection() {
    const productItems = document.querySelectorAll('.product-item');
    if (productItems.length > 0) {
        productItems.forEach((item, index) => {
            gsap.from(item, {
                duration: 0.6,
                y: 30,
                opacity: 0,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%"
                }
            });
        });
    }
}

// Animate testimonials section
function animateTestimonialsSection() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 0) {
        gsap.from(testimonialCards, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".testimonials-section",
                start: "top 80%"
            }
        });
    }
}

// Set up scroll-triggered animations with performance optimizations
function setupScrollAnimations() {
    // Section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        gsap.from(header, {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: header,
                start: "top 90%",
                once: true // Only animate once
            }
        });
    });
    
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(element => {
        gsap.from(element, {
            duration: 1,
            opacity: 0,
            y: 20,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                once: true // Only animate once
            }
        });
    });
    
    // Scale in elements on scroll
    const scaleElements = document.querySelectorAll('.scale-in');
    scaleElements.forEach(element => {
        gsap.from(element, {
            duration: 0.8,
            opacity: 0,
            scale: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                once: true // Only animate once
            }
        });
    });
}

// Set up hover animations with better performance
function setupHoverAnimations() {
    // Product cards hover effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        // Use regular CSS transitions for better performance on hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)';
        });
    });
    
    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Trigger scroll animations (fallback for when GSAP is not available)
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

// Animate counter numbers
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Parallax effect for background elements with performance improvements
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    
    function updateParallax() {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollPosition * speed);
            element.style.backgroundPosition = `center ${yPos}px`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Initialize parallax if elements exist
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.parallax')) {
        initParallax();
    }
});