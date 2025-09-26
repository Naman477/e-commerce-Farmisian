<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/GSAM.php';

// Initialize global state manager
$state = GSAM::getInstance();

// Redirect if already logged in
if ($state->isLoggedIn()) {
    header("Location: index.php");
    exit();
}

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

// Include the template
include __DIR__ . '/header.php';
?>

<!-- Login Page Content -->
<section class="login-page py-5">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5">
                <div class="card animate__animated animate__fadeInUp">
                    <div class="card-header text-center">
                        <h3 class="mb-0"><?php echo $translations['login']; ?></h3>
                    </div>
                    <div class="card-body">
                        <form id="loginForm">
                            <div class="mb-3">
                                <label for="email" class="form-label"><?php echo $translations['email']; ?></label>
                                <input type="email" class="form-control" id="email" name="email" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label"><?php echo $translations['password']; ?></label>
                                <input type="password" class="form-control" id="password" name="password" required>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="remember">
                                <label class="form-check-label" for="remember">Remember me</label>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary btn-lg">
                                    <?php echo $translations['sign_in']; ?>
                                </button>
                            </div>
                        </form>
                        
                        <div class="text-center mt-3">
                            <a href="#"><?php echo $translations['forgot_password']; ?></a>
                        </div>
                        
                        <hr>
                        
                        <div class="text-center">
                            <?php echo $translations['no_account']; ?> 
                            <a href="signup.php"><?php echo $translations['sign_up']; ?></a>
                        </div>
                        
                        <!-- Social Login -->
                        <div class="text-center mt-4">
                            <p class="mb-2">Or login with</p>
                            <div class="d-flex justify-content-center gap-2">
                                <button class="btn btn-outline-primary">
                                    <i class="fab fa-facebook-f"></i>
                                </button>
                                <button class="btn btn-outline-danger">
                                    <i class="fab fa-google"></i>
                                </button>
                                <button class="btn btn-outline-info">
                                    <i class="fab fa-twitter"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Show loading state
    state().setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        // Hide loading state
        state().setLoading(false);
        
        // Simulate successful login
        state().setUser({
            id: 1,
            name: 'John Doe',
            email: email
        });
        
        // Show success notification
        state().addNotification('Login successful! Welcome back.', 'success');
        
        // Redirect to homepage after delay
        setTimeout(() => {
            window.location.href = 'index.php';
        }, 1500);
    }, 1500);
});
</script>

<?php include __DIR__ . '/footer.php'; ?>