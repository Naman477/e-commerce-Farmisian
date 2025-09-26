    </main>
    
    <!-- Footer -->
    <footer class="site-footer animate__animated animate__fadeInUp">
        <div class="container">
            <div class="row">
                <!-- About Section -->
                <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    <h5 class="footer-heading"><?php echo SITE_NAME; ?></h5>
                    <p><?php echo $translations['welcome_message']; ?></p>
                    <div class="social-links">
                        <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                
                <!-- Quick Links -->
                <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
                    <h5 class="footer-heading"><?php echo $translations['products']; ?></h5>
                    <ul class="footer-links">
                        <li><a href="products.php?category=groceries"><?php echo $translations['daily_groceries']; ?></a></li>
                        <li><a href="products.php?category=grain"><?php echo $translations['grain']; ?></a></li>
                        <li><a href="products.php?category=pulses"><?php echo $translations['pulses']; ?></a></li>
                        <li><a href="products.php?category=alcohol"><?php echo $translations['alcohol']; ?></a></li>
                    </ul>
                </div>
                
                <!-- Customer Service -->
                <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
                    <h5 class="footer-heading">Customer Service</h5>
                    <ul class="footer-links">
                        <li><a href="contact.php"><?php echo $translations['contact_us']; ?></a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Shipping Policy</a></li>
                        <li><a href="#">Returns & Refunds</a></li>
                    </ul>
                </div>
                
                <!-- Download App -->
                <div class="col-lg-4 col-md-6">
                    <h5 class="footer-heading"><?php echo $translations['download_app_store']; ?></h5>
                    <p>Get the app for exclusive deals and faster checkout</p>
                    <div class="app-buttons">
                        <a href="#" class="app-button">
                            <i class="fab fa-apple"></i>
                            <div class="app-text">
                                <small>Download on the</small>
                                <strong>App Store</strong>
                            </div>
                        </a>
                        <a href="#" class="app-button">
                            <i class="fab fa-google-play"></i>
                            <div class="app-text">
                                <small>GET IT ON</small>
                                <strong>Google Play</strong>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            
            <hr>
            
            <!-- Copyright -->
            <div class="row align-items-center">
                <div class="col-md-6 text-center text-md-start">
                    <p class="mb-0">&copy; <?php echo date('Y'); ?> <?php echo $translations['copyright']; ?></p>
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <ul class="list-inline mb-0">
                        <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
                        <li class="list-inline-item"><a href="#">Terms of Service</a></li>
                        <li class="list-inline-item"><a href="#">Sitemap</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    
    <!-- Back to Top Button -->
    <button id="backToTop" class="btn btn-primary back-to-top">
        <i class="fas fa-arrow-up"></i>
    </button>
    
    <!-- JavaScript Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    
    <!-- Custom Scripts -->
    <script src="../assets/js/main.js"></script>
    <script src="../assets/js/animations.js"></script>
    <script src="../assets/js/gsam.js"></script>
    <script src="../assets/js/lazyload.js"></script>
    
    <!-- Initialize GSAM -->
    <script>
        // Pass PHP state to JavaScript
        window.appState = <?php echo json_encode($state->getState()); ?>;
        
        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
        });
    </script>
</body>
</html>