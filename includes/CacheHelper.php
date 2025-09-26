<?php
/**
 * Cache Helper for Farmisian E-commerce Website
 * Provides file-based caching mechanisms
 */

class CacheHelper {
    private static $instance = null;
    private $cacheDir;
    private $defaultTtl = 300; // 5 minutes default
    
    private function __construct() {
        $this->cacheDir = __DIR__ . '/../cache/';
        
        // Create cache directory if it doesn't exist
        if (!is_dir($this->cacheDir)) {
            mkdir($this->cacheDir, 0755, true);
        }
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new CacheHelper();
        }
        return self::$instance;
    }
    
    // Generate cache key from data
    private function generateKey($key) {
        return md5($key);
    }
    
    // Get cached data
    public function get($key) {
        if (!CACHE_ENABLED) {
            return null;
        }
        
        $cacheKey = $this->generateKey($key);
        $cacheFile = $this->cacheDir . $cacheKey . '.cache';
        
        // Check if cache file exists and is not expired
        if (file_exists($cacheFile)) {
            $cacheData = unserialize(file_get_contents($cacheFile));
            
            // Check if cache is still valid
            if (time() < $cacheData['expires']) {
                return $cacheData['data'];
            } else {
                // Delete expired cache
                unlink($cacheFile);
            }
        }
        
        return null;
    }
    
    // Set cached data
    public function set($key, $data, $ttl = null) {
        if (!CACHE_ENABLED) {
            return false;
        }
        
        $ttl = $ttl ?: $this->defaultTtl;
        $cacheKey = $this->generateKey($key);
        $cacheFile = $this->cacheDir . $cacheKey . '.cache';
        
        $cacheData = [
            'data' => $data,
            'expires' => time() + $ttl
        ];
        
        return file_put_contents($cacheFile, serialize($cacheData)) !== false;
    }
    
    // Delete cached data
    public function delete($key) {
        $cacheKey = $this->generateKey($key);
        $cacheFile = $this->cacheDir . $cacheKey . '.cache';
        
        if (file_exists($cacheFile)) {
            return unlink($cacheFile);
        }
        
        return false;
    }
    
    // Clear all cache
    public function clear() {
        $files = glob($this->cacheDir . '*.cache');
        foreach ($files as $file) {
            unlink($file);
        }
        return true;
    }
    
    // Get cache statistics
    public function getStats() {
        $files = glob($this->cacheDir . '*.cache');
        $totalSize = 0;
        
        foreach ($files as $file) {
            $totalSize += filesize($file);
        }
        
        return [
            'count' => count($files),
            'size' => $totalSize,
            'directory' => $this->cacheDir
        ];
    }
}

// Helper function
function cache() {
    return CacheHelper::getInstance();
}
?>