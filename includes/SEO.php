<?php
/**
 * SEO Helper Class for Farmisian E-commerce Website
 * Provides utilities for search engine optimization
 */

class SEO {
    private static $instance = null;
    private $title = '';
    private $description = '';
    private $keywords = '';
    private $canonical = '';
    private $ogTags = [];
    private $structuredData = [];
    
    private function __construct() {
        // Set default values
        $this->title = SITE_NAME;
        $this->description = SITE_DESCRIPTION;
        $this->keywords = SITE_KEYWORDS;
        $this->canonical = SITE_URL;
        
        // Set default OG tags
        $this->ogTags = [
            'og:title' => SITE_NAME,
            'og:description' => SITE_DESCRIPTION,
            'og:type' => 'website',
            'og:url' => SITE_URL,
            'og:site_name' => SITE_NAME
        ];
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new SEO();
        }
        return self::$instance;
    }
    
    // Set page title
    public function setTitle($title) {
        $this->title = $title . ' | ' . SITE_NAME;
        $this->ogTags['og:title'] = $this->title;
        return $this;
    }
    
    // Set page description
    public function setDescription($description) {
        $this->description = $description;
        $this->ogTags['og:description'] = $description;
        return $this;
    }
    
    // Set page keywords
    public function setKeywords($keywords) {
        $this->keywords = $keywords;
        return $this;
    }
    
    // Set canonical URL
    public function setCanonical($url) {
        $this->canonical = $url;
        $this->ogTags['og:url'] = $url;
        return $this;
    }
    
    // Set Open Graph tags
    public function setOgTag($property, $content) {
        $this->ogTags[$property] = $content;
        return $this;
    }
    
    // Set multiple Open Graph tags
    public function setOgTags($tags) {
        $this->ogTags = array_merge($this->ogTags, $tags);
        return $this;
    }
    
    // Add structured data (JSON-LD)
    public function addStructuredData($data) {
        $this->structuredData[] = $data;
        return $this;
    }
    
    // Generate meta tags for the header
    public function generateMetaTags() {
        $metaTags = [];
        
        // Basic meta tags
        $metaTags[] = '<meta name="description" content="' . htmlspecialchars($this->description) . '">';
        $metaTags[] = '<meta name="keywords" content="' . htmlspecialchars($this->keywords) . '">';
        $metaTags[] = '<link rel="canonical" href="' . htmlspecialchars($this->canonical) . '">';
        
        // Open Graph tags
        foreach ($this->ogTags as $property => $content) {
            $metaTags[] = '<meta property="' . $property . '" content="' . htmlspecialchars($content) . '">';
        }
        
        // Structured data
        foreach ($this->structuredData as $data) {
            $metaTags[] = '<script type="application/ld+json">' . json_encode($data) . '</script>';
        }
        
        return implode("\n", $metaTags);
    }
    
    // Generate breadcrumb structured data
    public function generateBreadcrumbData($breadcrumbs) {
        $breadcrumbData = [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => []
        ];
        
        foreach ($breadcrumbs as $index => $breadcrumb) {
            $breadcrumbData['itemListElement'][] = [
                '@type' => 'ListItem',
                'position' => $index + 1,
                'name' => $breadcrumb['name'],
                'item' => $breadcrumb['url']
            ];
        }
        
        $this->addStructuredData($breadcrumbData);
        return $this;
    }
    
    // Generate product structured data
    public function generateProductData($product) {
        $productData = [
            '@context' => 'https://schema.org',
            '@type' => 'Product',
            'name' => $product['name'],
            'description' => $product['description'],
            'image' => SITE_URL . '/assets/images/uploads/' . $product['image_url'],
            'offers' => [
                '@type' => 'Offer',
                'url' => SITE_URL . '/product/' . $product['_id'],
                'priceCurrency' => 'INR',
                'price' => $product['price'],
                'availability' => 'https://schema.org/InStock'
            ]
        ];
        
        if (isset($product['rating'])) {
            $productData['aggregateRating'] = [
                '@type' => 'AggregateRating',
                'ratingValue' => $product['rating'],
                'reviewCount' => $product['reviews'] ?? 0
            ];
        }
        
        $this->addStructuredData($productData);
        return $this;
    }
    
    // Generate organization structured data
    public function generateOrganizationData() {
        $orgData = [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => SITE_NAME,
            'url' => SITE_URL,
            'logo' => SITE_URL . '/assets/images/logo2.png',
            'sameAs' => [
                'https://www.facebook.com/farmisian',
                'https://twitter.com/farmisian',
                'https://www.instagram.com/farmisian'
            ]
        ];
        
        $this->addStructuredData($orgData);
        return $this;
    }
    
    // Get page title
    public function getTitle() {
        return $this->title;
    }
    
    // Get page description
    public function getDescription() {
        return $this->description;
    }
    
    // Get page keywords
    public function getKeywords() {
        return $this->keywords;
    }
}

// Helper function to get the SEO manager
function seo() {
    return SEO::getInstance();
}
?>