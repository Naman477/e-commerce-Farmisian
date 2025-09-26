<?php
if (class_exists('MongoDB\Client')) {
    echo "MongoDB extension is available";
} else {
    echo "MongoDB extension is not available";
}
?>