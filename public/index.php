<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/Database.php';
require_once __DIR__ . '/../includes/GSAM.php';
require_once __DIR__ . '/../includes/PerformanceMonitor.php';

// Start performance monitoring
perf()->startTimer('page_load');

// Initialize database
$db = new Database();

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

// Start timing database query
perf()->startTimer('database_query');

// Get products for homepage
$productsCollection = $db->getCollection('products');
$products = $db->find('products', [], ['limit' => 12]);

// End timing database query
perf()->endTimer('database_query');
perf()->incrementCounter('database_queries');

// Include the template
include __DIR__ . '/../templates/header.php';
include __DIR__ . '/../templates/homepage.php';
include __DIR__ . '/../templates/footer.php';

// Log performance metrics
perf()->logMetrics();
?>