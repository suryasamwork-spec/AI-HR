<?php
// router.php
if (preg_match('/\.(?:png|jpg|jpeg|gif|css|js|ico|ttf|woff|woff2|eot|svg)$/', parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH))) {
    return false; // serve the requested resource as-is.
}

// Emulate the .htaccess RewriteBase behavior for local terminal testing
// .htaccess has RewriteBase /careers/, but when running via php -S localhost:8000, 
// the base URL is just /.
// To make it work seamlessly, we will pretend scriptname is /careers/index.php 
// or let the router handle it by rewriting the URI.

// Actually, in config.php we have define('BASE_URL', 'http://localhost/careers'); 
// If we run on localhost:8000, BASE_URL should ideally be updated, but for now 
// we will just include index.php and let it handle the routing.
$_SERVER['SCRIPT_NAME'] = '/index.php'; // help the built-in router logic
require_once __DIR__ . '/index.php';
