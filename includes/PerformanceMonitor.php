<?php
/**
 * Performance Monitor for Farmisian E-commerce Website
 * Tracks and logs performance metrics
 */

class PerformanceMonitor {
    private static $instance = null;
    private $metrics = [];
    private $startTime;
    
    private function __construct() {
        $this->startTime = microtime(true);
        $this->metrics = [
            'page_load_time' => 0,
            'database_queries' => 0,
            'database_time' => 0,
            'cache_hits' => 0,
            'cache_misses' => 0,
            'memory_usage' => 0
        ];
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new PerformanceMonitor();
        }
        return self::$instance;
    }
    
    // Start timing an operation
    public function startTimer($operation) {
        $this->metrics[$operation . '_start'] = microtime(true);
    }
    
    // End timing an operation
    public function endTimer($operation) {
        if (isset($this->metrics[$operation . '_start'])) {
            $elapsed = microtime(true) - $this->metrics[$operation . '_start'];
            $this->metrics[$operation . '_time'] = isset($this->metrics[$operation . '_time']) 
                ? $this->metrics[$operation . '_time'] + $elapsed 
                : $elapsed;
            unset($this->metrics[$operation . '_start']);
        }
    }
    
    // Increment a counter
    public function incrementCounter($metric, $amount = 1) {
        $this->metrics[$metric] = isset($this->metrics[$metric]) 
            ? $this->metrics[$metric] + $amount 
            : $amount;
    }
    
    // Set a specific metric value
    public function setMetric($metric, $value) {
        $this->metrics[$metric] = $value;
    }
    
    // Get a specific metric
    public function getMetric($metric) {
        return isset($this->metrics[$metric]) ? $this->metrics[$metric] : null;
    }
    
    // Get all metrics
    public function getMetrics() {
        // Calculate page load time
        $this->metrics['page_load_time'] = microtime(true) - $this->startTime;
        
        // Calculate memory usage
        $this->metrics['memory_usage'] = memory_get_peak_usage(true);
        
        return $this->metrics;
    }
    
    // Log metrics
    public function logMetrics() {
        $metrics = $this->getMetrics();
        error_log("Performance Metrics: " . json_encode($metrics));
    }
    
    // Get performance report
    public function getReport() {
        $metrics = $this->getMetrics();
        $report = "Performance Report:\n";
        $report .= "==================\n";
        
        foreach ($metrics as $key => $value) {
            if (is_numeric($value)) {
                if (strpos($key, 'time') !== false) {
                    $report .= sprintf("%-20s: %.4f seconds\n", $key, $value);
                } elseif (strpos($key, 'memory') !== false) {
                    $report .= sprintf("%-20s: %.2f MB\n", $key, $value / (1024 * 1024));
                } else {
                    $report .= sprintf("%-20s: %d\n", $key, $value);
                }
            }
        }
        
        return $report;
    }
}

// Helper function
function perf() {
    return PerformanceMonitor::getInstance();
}
?>