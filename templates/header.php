<!DOCTYPE html>
<html lang="<?php echo $state->getLanguage(); ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo SITE_DESCRIPTION; ?>">
    <meta name="keywords" content="<?php echo SITE_KEYWORDS; ?>">
    <meta name="author" content="Farmisian">
    <title><?php echo $translations['site_title']; ?> | Farmisian</title>
    
    <!-- SEO Meta Tags -->
    <link rel="canonical" href="<?php echo SITE_URL; ?>">
    <meta property="og:title" content="<?php echo $translations['site_title']; ?> | Farmisian">
    <meta property="og:description" content="<?php echo SITE_DESCRIPTION; ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo SITE_URL; ?>">
    <meta property="og:site_name" content="Farmisian">
    <meta property="og:image" content="<?php echo SITE_URL; ?>/assets/images/logo2.png">
    <meta property="og:image:alt" content="Farmisian Logo">
    <meta property="og:locale" content="<?php echo $state->getLanguage(); ?>_IN">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="<?php echo $translations['site_title']; ?> | Farmisian">
    <meta name="twitter:description" content="<?php echo SITE_DESCRIPTION; ?>">
    <meta name="twitter:image" content="<?php echo SITE_URL; ?>/assets/images/logo2.png">
    <meta name="twitter:site" content="@farmisian">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Farmisian",
        "url": "<?php echo SITE_URL; ?>",
        "logo": "<?php echo SITE_URL; ?>/assets/images/logo2.png",
        "sameAs": [
            "https://www.facebook.com/farmisian",
            "https://twitter.com/farmisian",
            "https://www.instagram.com/farmisian"
        ]
    }
    </script>
    
    <!-- Preload critical resources -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" as="style">
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" as="style">
    
    <!-- Fonts and Icons -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- CSS Libraries -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    
    <!-- Custom Styles -->
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/animations.css">
    <link rel="stylesheet" href="../assets/css/optimized.css">
    
    <!-- Theme Styles -->
    <link rel="stylesheet" href="../assets/css/<?php echo $state->getTheme(); ?>-theme.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="../assets/images/favicon.png">
    <link rel="apple-touch-icon" href="../assets/images/apple-touch-icon.png">
    
    <!-- Mobile Meta Tags -->
    <meta name="theme-color" content="#28a745">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Farmisian">
</head>
<body class="<?php echo $state->getTheme(); ?>-theme">
    <!-- Notifications Container -->
    <div id="notifications-container" class="notifications-container"></div>
    
    <!-- Loading Overlay -->
    <div id="loading-overlay" class="loading-overlay" style="display: none;">
        <div class="spinner"></div>
    </div>
    
    <!-- Skip to content link for accessibility -->
    <a class="skip-link sr-only" href="#main-content">Skip to main content</a>
    
    <!-- Header -->
    <header class="site-header animate__animated animate__fadeInDown" role="banner">
        <nav class="navbar navbar-expand-lg navbar-light bg-light" role="navigation">
            <div class="container">
                <!-- Logo -->
                <a class="navbar-brand d-flex align-items-center" href="index.php" aria-label="Farmisian Home">
                    <img src="../assets/images/logo2.png" alt="Farmisian Logo" class="logo-img">
                    <span class="brand-text"><?php echo SITE_NAME; ?></span>
                </a>
                
                <!-- Mobile Toggle -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" 
                        aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <!-- Navigation Content -->
                <div class="collapse navbar-collapse" id="navbarContent">
                    <!-- Main Navigation -->
                    <ul class="navbar-nav me-auto" role="menubar">
                        <li class="nav-item" role="none">
                            <a class="nav-link" href="index.php" role="menuitem"><?php echo $translations['home']; ?></a>
                        </li>
                        <li class="nav-item dropdown" role="none">
                            <a class="nav-link dropdown-toggle" href="#" id="productsDropdown" role="menuitem" 
                               data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <?php echo $translations['products']; ?>
                            </a>
                            <ul class="dropdown-menu" role="menu" aria-labelledby="productsDropdown">
                                <li><a class="dropdown-item" href="products.php?category=groceries" role="menuitem"><?php echo $translations['daily_groceries']; ?></a></li>
                                <li><a class="dropdown-item" href="products.php?category=grain" role="menuitem"><?php echo $translations['grain']; ?></a></li>
                                <li><a class="dropdown-item" href="products.php?category=pulses" role="menuitem"><?php echo $translations['pulses']; ?></a></li>
                                <li><a class="dropdown-item" href="products.php?category=alcohol" role="menuitem"><?php echo $translations['alcohol']; ?></a></li>
                            </ul>
                        </li>
                        <li class="nav-item" role="none">
                            <a class="nav-link" href="about.php" role="menuitem"><?php echo $translations['about_us']; ?></a>
                        </li>
                        <li class="nav-item" role="none">
                            <a class="nav-link" href="contact.php" role="menuitem"><?php echo $translations['contact_us']; ?></a>
                        </li>
                    </ul>
                    
                    <!-- Right Side Navigation -->
                    <ul class="navbar-nav" role="menubar">
                        <!-- Search -->
                        <li class="nav-item me-2" role="none">
                            <form class="d-flex search-form" role="search">
                                <div class="input-group">
                                    <input type="text" class="form-control search-input" 
                                           placeholder="<?php echo $translations['search_placeholder']; ?>" 
                                           aria-label="Search">
                                    <button class="btn btn-outline-secondary search-btn" type="button" aria-label="Search">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </li>
                        
                        <!-- Language Selector -->
                        <li class="nav-item dropdown me-2" role="none">
                            <a class="nav-link dropdown-toggle" href="#" id="languageDropdown" role="menuitem" 
                               data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-globe"></i> <?php echo strtoupper($state->getLanguage()); ?>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" role="menu" aria-labelledby="languageDropdown">
                                <li><a class="dropdown-item" href="?lang=en" role="menuitem" hreflang="en">English</a></li>
                                <li><a class="dropdown-item" href="?lang=hi" role="menuitem" hreflang="hi">हिंदी</a></li>
                                <li><a class="dropdown-item" href="?lang=mr" role="menuitem" hreflang="mr">मराठी</a></li>
                            </ul>
                        </li>
                        
                        <!-- Theme Toggle -->
                        <li class="nav-item me-2" role="none">
                            <button class="btn btn-outline-secondary theme-toggle" id="themeToggle" 
                                    aria-label="Toggle theme">
                                <i class="fas fa-<?php echo $state->getTheme() === 'light' ? 'moon' : 'sun'; ?>"></i>
                            </button>
                        </li>
                        
                        <!-- Cart -->
                        <li class="nav-item me-2" role="none">
                            <a class="nav-link position-relative" href="cart.php" role="menuitem" aria-label="Shopping Cart">
                                <i class="fas fa-shopping-cart"></i>
                                <span class="cart-count-badge badge bg-danger" id="cartCount"><?php echo $state->getCartCount(); ?></span>
                            </a>
                        </li>
                        
                        <!-- User Account -->
                        <?php if ($state->isLoggedIn()): ?>
                        <li class="nav-item dropdown" role="none">
                            <a class="nav-link dropdown-toggle" href="#" id="accountDropdown" role="menuitem" 
                               data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="User Account">
                                <i class="fas fa-user"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" role="menu" aria-labelledby="accountDropdown">
                                <li><a class="dropdown-item" href="account.php" role="menuitem"><?php echo $translations['account']; ?></a></li>
                                <li><a class="dropdown-item" href="logout.php" role="menuitem"><?php echo $translations['logout']; ?></a></li>
                            </ul>
                        </li>
                        <?php else: ?>
                        <li class="nav-item" role="none">
                            <a class="btn btn-primary" href="login.php" role="menuitem">
                                <i class="fas fa-sign-in-alt"></i> <?php echo $translations['login']; ?>
                            </a>
                        </li>
                        <?php endif; ?>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    
    <!-- Main Content -->
    <main class="main-content" id="main-content" role="main">