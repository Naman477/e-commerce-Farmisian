<?php
// Site configuration
define('SITE_NAME', 'Farmisian');
define('SITE_URL', 'http://localhost/farmisian_modern');
define('SITE_DESCRIPTION', 'Your trusted source for fresh, quality produce directly from local farmers');
define('SITE_KEYWORDS', 'farmisian, fresh produce, local farmers, sustainable agriculture, organic');

// MongoDB configuration
define('MONGODB_HOST', 'localhost');
define('MONGODB_PORT', 27017);
define('MONGODB_DATABASE', 'Farmisian');

// Language configuration
define('DEFAULT_LANGUAGE', 'en');
define('SUPPORTED_LANGUAGES', ['en', 'hi', 'mr']); // English, Hindi, Marathi

// Session configuration
define('SESSION_LIFETIME', 3600); // 1 hour

// Cache configuration
define('CACHE_ENABLED', true);
define('CACHE_LIFETIME', 300); // 5 minutes

// Database connection status
define('MONGODB_AVAILABLE', class_exists('MongoDB\Client'));

// Create cache directory if it doesn't exist
$cacheDir = __DIR__ . '/../cache/';
if (!is_dir($cacheDir)) {
    mkdir($cacheDir, 0755, true);
}
?>