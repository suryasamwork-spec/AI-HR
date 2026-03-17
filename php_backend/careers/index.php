<?php
/**
 * Caldim Engineering Careers Portal
 * Front Controller / Router – Entry Point
 */

// ── Error Reporting (disable in production) ────────────────────
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ── Core Dependencies ──────────────────────────────────────────
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/db.php';
require_once __DIR__ . '/helpers/auth.php';

// ── CORS Support (For Local React Dev) ──────────────────────────
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ── Controllers ────────────────────────────────────────────────
require_once __DIR__ . '/controllers/JobController.php';
require_once __DIR__ . '/controllers/ApplicationController.php';
require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/AdminController.php';
require_once __DIR__ . '/controllers/ExportController.php';

// ── Parse URI ─────────────────────────────────────────────────
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$scriptName = dirname($_SERVER['SCRIPT_NAME']); // e.g. /careers
$uri = parse_url($requestUri, PHP_URL_PATH);

// Strip the base path (e.g. /careers/) from the URI
if ($scriptName !== '/' && str_starts_with($uri, $scriptName)) {
    $uri = substr($uri, strlen($scriptName));
}

$uri = trim($uri, '/'); // e.g. "" | "jobs" | "jobs/5" | "admin/jobs/create"

// Split into segments
$segments = $uri === '' ? [] : explode('/', $uri);

$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');

$isApi = str_starts_with($uri, 'api');
if ($isApi) {
    $uri = ltrim(substr($uri, 3), '/');
    $segments = $uri === '' ? [] : explode('/', $uri);
    header('Content-Type: application/json');
}

// ── Router ─────────────────────────────────────────────────────

// Home
if ($uri === '' || $uri === 'home') {
    if ($isApi) {
        (new JobController())->apiHome();
    } else {
        (new JobController())->ibegin();
    }
    exit;
}

// iBegin landing page
if ($uri === 'ibegin') {
    (new JobController())->ibegin();
    exit;
}

// Guided Search
if ($uri === 'guided-search') {
    (new JobController())->guidedSearch();
    exit;
}

// Restart with Caldim
if ($uri === 'restart-with-caldim') {
    (new JobController())->restartWithCaldim();
    exit;
}

// Public Job Listing
if ($uri === 'jobs') {
    if ($isApi) {
        (new JobController())->apiList();
    } else {
        (new JobController())->list();
    }
    exit;
}

// Job Detail  /jobs/{id}
if (count($segments) === 2 && $segments[0] === 'jobs' && ctype_digit($segments[1])) {
    if ($isApi) {
        (new JobController())->apiDetail((int)$segments[1]);
    } else {
        (new JobController())->detail((int)$segments[1]);
    }
    exit;
}

// ── Auth ──────────────────────────────────────────────────────

// Register
if ($uri === 'register') {
    if ($isApi) {
        (new AuthController())->apiRegister();
    } else {
        $method === 'POST' ? (new AuthController())->registerPost() : (new AuthController())->registerForm();
    }
    exit;
}

// Candidate Login / Logout
if ($uri === 'login') {
    if ($isApi) {
        (new AuthController())->apiLogin();
    } else {
        $method === 'POST' ? (new AuthController())->loginPost() : (new AuthController())->loginForm();
    }
    exit;
}

if ($uri === 'logout') {
    if ($isApi) {
        (new AuthController())->apiLogout();
    } else {
        (new AuthController())->logout();
    }
    exit;
}

if ($uri === 'me' && $isApi) {
    (new AuthController())->apiMe();
    exit;
}

// ── Candidate Dashboard + Apply ──────────────────────────────

// My Applications
if ($uri === 'my-applications') {
    (new ApplicationController())->myApplications();
    exit;
}

// Apply  /apply/{jobId}
if (count($segments) === 2 && $segments[0] === 'apply' && ctype_digit($segments[1])) {
    $method === 'POST'
        ? (new ApplicationController())->applyPost((int)$segments[1])
        : (new ApplicationController())->applyForm((int)$segments[1]);
    exit;
}

// ── Admin Routes ─────────────────────────────────────────────

// Admin Login / Logout
if ($uri === 'admin/login') {
    $method === 'POST'
        ? (new AuthController())->adminLoginPost()
        : (new AuthController())->adminLoginForm();
    exit;
}

if ($uri === 'admin/logout') {
    (new AuthController())->adminLogout();
    exit;
}

// Admin Dashboard
if ($uri === 'admin' || $uri === 'admin/dashboard') {
    (new AdminController())->dashboard();
    exit;
}

// Admin Jobs List
if ($uri === 'admin/jobs') {
    (new AdminController())->jobList();
    exit;
}

// Admin Create Job
if ($uri === 'admin/jobs/create') {
    $method === 'POST'
        ? (new AdminController())->createPost()
        : (new AdminController())->createForm();
    exit;
}

// Admin Edit Job  /admin/jobs/{id}/edit
if (
count($segments) === 4 &&
$segments[0] === 'admin' &&
$segments[1] === 'jobs' &&
ctype_digit($segments[2]) &&
$segments[3] === 'edit'
) {
    $method === 'POST'
        ? (new AdminController())->editPost((int)$segments[2])
        : (new AdminController())->editForm((int)$segments[2]);
    exit;
}

// Admin Delete Job  /admin/jobs/{id}/delete
if (
count($segments) === 4 &&
$segments[0] === 'admin' &&
$segments[1] === 'jobs' &&
ctype_digit($segments[2]) &&
$segments[3] === 'delete' &&
$method === 'POST'
) {
    (new AdminController())->deleteJob((int)$segments[2]);
    exit;
}

// Admin Applications List
if ($uri === 'admin/applications') {
    (new ApplicationController())->adminList();
    exit;
}

// Admin Application Detail  /admin/applications/{id}
if (
count($segments) === 3 &&
$segments[0] === 'admin' &&
$segments[1] === 'applications' &&
ctype_digit($segments[2])
) {
    (new ApplicationController())->adminDetail((int)$segments[2]);
    exit;
}

// Admin Update Application Status
if ($uri === 'admin/applications/update-status' && $method === 'POST') {
    (new ApplicationController())->updateStatus();
    exit;
}

// Admin Download Resume  /admin/applications/{id}/resume
if (
count($segments) === 4 &&
$segments[0] === 'admin' &&
$segments[1] === 'applications' &&
ctype_digit($segments[2]) &&
$segments[3] === 'resume'
) {
    (new ApplicationController())->downloadResume((int)$segments[2]);
    exit;
}

// Admin Export
if ($uri === 'admin/export/applications') {
    (new ExportController())->exportApplications();
    exit;
}

// ── 404 Fallback ──────────────────────────────────────────────
http_response_code(404);
if (file_exists(__DIR__ . '/../frontend/views/404.php')) {
    require __DIR__ . '/../frontend/views/404.php';
}
else {
    echo '<h1>404 – Page Not Found</h1>';
}

