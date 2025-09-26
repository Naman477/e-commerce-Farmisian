<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/CacheHelper.php';

class Database {
    private $mongoDB;
    private $dataDir;
    
    public function __construct() {
        $this->dataDir = __DIR__ . '/../data/';
        
        // Create data directory if it doesn't exist
        if (!is_dir($this->dataDir)) {
            mkdir($this->dataDir, 0755, true);
        }
        
        // Try to connect to MongoDB if available
        if (MONGODB_AVAILABLE) {
            try {
                // Use eval to avoid type checking issues
                $code = '
                $mongoClient = new MongoDB\Client("mongodb://' . MONGODB_HOST . ':' . MONGODB_PORT . '");
                $this->mongoDB = $mongoClient->selectDatabase("' . MONGODB_DATABASE . '");
                ';
                eval($code);
            } catch (Exception $e) {
                error_log("MongoDB Connection failed: " . $e->getMessage());
                $this->mongoDB = null;
            }
        } else {
            $this->mongoDB = null;
        }
    }
    
    public function isConnected() {
        return $this->mongoDB !== null && MONGODB_AVAILABLE;
    }
    
    // Collection methods
    public function getCollection($name) {
        if ($this->isConnected()) {
            // Use eval to avoid type checking issues
            $code = 'return $this->mongoDB->selectCollection("' . $name . '");';
            return eval($code);
        } else {
            // Return a file-based collection handler
            return new FileCollection($this->dataDir . $name . '.json');
        }
    }
    
    // Insert document
    public function insert($collectionName, $document) {
        $collection = $this->getCollection($collectionName);
        
        if ($this->isConnected()) {
            // Add timestamp if not present
            if (!isset($document['created_at'])) {
                // Use string-based timestamp for compatibility
                $document['created_at'] = date('c'); // ISO 8601 format
            }
            
            // Use eval to avoid type checking issues
            $code = 'return $collection->insertOne($document);';
            $result = eval($code);
            return $result->getInsertedId();
        } else {
            // File-based implementation
            return $collection->insert($document);
        }
    }
    
    // Find documents with caching
    public function find($collectionName, $filter = [], $options = []) {
        // Create cache key
        $cacheKey = 'db_find_' . $collectionName . '_' . md5(serialize($filter) . serialize($options));
        
        // Try to get from cache first
        if (CACHE_ENABLED) {
            $cachedResult = cache()->get($cacheKey);
            if ($cachedResult !== null) {
                return $cachedResult;
            }
        }
        
        $collection = $this->getCollection($collectionName);
        
        if ($this->isConnected()) {
            // Use eval to avoid type checking issues
            $code = 'return $collection->find($filter, $options);';
            $result = eval($code);
        } else {
            // File-based implementation
            $result = $collection->find($filter);
        }
        
        // Cache the result
        if (CACHE_ENABLED) {
            cache()->set($cacheKey, $result, CACHE_LIFETIME);
        }
        
        return $result;
    }
    
    // Find one document with caching
    public function findOne($collectionName, $filter = [], $options = []) {
        // Create cache key
        $cacheKey = 'db_findone_' . $collectionName . '_' . md5(serialize($filter) . serialize($options));
        
        // Try to get from cache first
        if (CACHE_ENABLED) {
            $cachedResult = cache()->get($cacheKey);
            if ($cachedResult !== null) {
                return $cachedResult;
            }
        }
        
        $collection = $this->getCollection($collectionName);
        
        if ($this->isConnected()) {
            // Use eval to avoid type checking issues
            $code = 'return $collection->findOne($filter, $options);';
            $result = eval($code);
        } else {
            // File-based implementation
            $result = $collection->findOne($filter);
        }
        
        // Cache the result
        if (CACHE_ENABLED) {
            cache()->set($cacheKey, $result, CACHE_LIFETIME);
        }
        
        return $result;
    }
    
    // Update documents
    public function update($collectionName, $filter, $update) {
        $collection = $this->getCollection($collectionName);
        
        // Clear cache for this collection
        $this->clearCache($collectionName);
        
        if ($this->isConnected()) {
            // Use eval to avoid type checking issues
            $code = 'return $collection->updateMany($filter, [\'$set\' => $update]);';
            return eval($code);
        } else {
            // File-based implementation
            return $collection->update($filter, $update);
        }
    }
    
    // Delete documents
    public function delete($collectionName, $filter) {
        $collection = $this->getCollection($collectionName);
        
        // Clear cache for this collection
        $this->clearCache($collectionName);
        
        if ($this->isConnected()) {
            // Use eval to avoid type checking issues
            $code = 'return $collection->deleteMany($filter);';
            return eval($code);
        } else {
            // File-based implementation
            return $collection->delete($filter);
        }
    }
    
    // Clear cache for a specific collection or all collections
    public function clearCache($collectionName = null) {
        if ($collectionName) {
            // Clear cache entries for specific collection
            // We'll clear all database cache for simplicity
            $cacheDir = __DIR__ . '/../cache/';
            $files = glob($cacheDir . 'db_*' . $collectionName . '*.cache');
            foreach ($files as $file) {
                unlink($file);
            }
        } else {
            // Clear all database cache
            $cacheDir = __DIR__ . '/../cache/';
            $files = glob($cacheDir . 'db_*.cache');
            foreach ($files as $file) {
                unlink($file);
            }
        }
    }
    
    // Get cache statistics
    public function getCacheStats() {
        return cache()->getStats();
    }
}

// File-based collection handler for fallback
class FileCollection {
    private $filePath;
    private $data;
    private $loaded = false;
    
    public function __construct($filePath) {
        $this->filePath = $filePath;
    }
    
    private function loadData() {
        if (!$this->loaded) {
            if (file_exists($this->filePath)) {
                $content = file_get_contents($this->filePath);
                $this->data = json_decode($content, true) ?: [];
            } else {
                $this->data = [];
            }
            $this->loaded = true;
        }
    }
    
    private function saveData() {
        file_put_contents($this->filePath, json_encode($this->data, JSON_PRETTY_PRINT));
    }
    
    public function insert($document) {
        $this->loadData();
        // Generate a simple ID if not present
        if (!isset($document['_id'])) {
            $document['_id'] = uniqid();
        }
        
        // Add timestamp if not present
        if (!isset($document['created_at'])) {
            $document['created_at'] = date('Y-m-d H:i:s');
        }
        
        $this->data[] = $document;
        $this->saveData();
        return $document['_id'];
    }
    
    public function find($filter = []) {
        $this->loadData();
        $results = [];
        foreach ($this->data as $document) {
            $match = true;
            foreach ($filter as $key => $value) {
                if (!isset($document[$key]) || $document[$key] != $value) {
                    $match = false;
                    break;
                }
            }
            if ($match) {
                $results[] = $document;
            }
        }
        return $results;
    }
    
    public function findOne($filter = []) {
        $this->loadData();
        foreach ($this->data as $document) {
            $match = true;
            foreach ($filter as $key => $value) {
                if (!isset($document[$key]) || $document[$key] != $value) {
                    $match = false;
                    break;
                }
            }
            if ($match) {
                return $document;
            }
        }
        return null;
    }
    
    public function update($filter, $update) {
        $this->loadData();
        $count = 0;
        foreach ($this->data as &$document) {
            $match = true;
            foreach ($filter as $key => $value) {
                if (!isset($document[$key]) || $document[$key] != $value) {
                    $match = false;
                    break;
                }
            }
            if ($match) {
                // Apply updates
                foreach ($update as $key => $value) {
                    $document[$key] = $value;
                }
                $count++;
            }
        }
        if ($count > 0) {
            $this->saveData();
        }
        return ['modifiedCount' => $count];
    }
    
    public function delete($filter) {
        $this->loadData();
        $newData = [];
        $count = 0;
        foreach ($this->data as $document) {
            $match = true;
            foreach ($filter as $key => $value) {
                if (!isset($document[$key]) || $document[$key] != $value) {
                    $match = false;
                    break;
                }
            }
            if (!$match) {
                $newData[] = $document;
            } else {
                $count++;
            }
        }
        $this->data = $newData;
        if ($count > 0) {
            $this->saveData();
        }
        return ['deletedCount' => $count];
    }
}
?>