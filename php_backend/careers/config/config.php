<?php
/**
 * Caldim Engineering Careers Portal
 * Global Application Configuration
 */

// ── App Identity ──────────────────────────────────────────────
define('APP_NAME', 'Caldim Engineering Careers');
define('APP_TAGLINE', 'Build Your Career with Us');
define('COMPANY', 'Caldim Engineering');
// Dynamically determine the base URL so it works with any Localhost port or XAMPP
$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
// Automatically detect if we are using php -S built-in server vs XAMPP
$basePath = (php_sapi_name() === 'cli-server') ? '' : '/careers'; 

define('BASE_URL', $protocol . $host . $basePath); // Change in production

// ── File Upload ────────────────────────────────────────────────
define('UPLOAD_DIR', __DIR__ . '/../uploads/resumes/');
define('ALLOWED_EXTENSIONS', ['pdf', 'doc', 'docx']);
define('ALLOWED_MIMES', ['application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5 MB

// ── Pagination ─────────────────────────────────────────────────
define('JOBS_PER_PAGE', 9);
define('APPS_PER_PAGE', 20);

// ── Session ────────────────────────────────────────────────────
define('SESSION_NAME', 'caldim_sess');
define('SESSION_TIMEOUT', 3600); // 1 hour

// ── SMTP (PHPMailer / Gmail example) ──────────────────────────
define('MAIL_HOST', 'smtp.gmail.com');
define('MAIL_PORT', 587);
define('MAIL_USERNAME', 'noreply@caldimengineering.com'); // Change
define('MAIL_PASSWORD', 'your_app_password_here'); // Change
define('MAIL_FROM', 'noreply@caldimengineering.com');
define('MAIL_FROM_NAME', COMPANY);
define('MAIL_ENABLED', false); // Set to true after configuring SMTP

// ── CSRF ───────────────────────────────────────────────────────
define('CSRF_TOKEN_NAME', 'csrf_token');

// ── Status Labels & Badge Classes ─────────────────────────────
define('STATUS_LABELS', [
    'applied' => ['label' => 'Applied', 'badge' => 'bg-primary'],
    'shortlisted' => ['label' => 'Shortlisted', 'badge' => 'bg-warning text-dark'],
    'interview' => ['label' => 'Interview', 'badge' => 'bg-info text-dark'],
    'offered' => ['label' => 'Offered', 'badge' => 'bg-success'],
    'hired' => ['label' => 'Hired', 'badge' => 'bg-success'],
    'rejected' => ['label' => 'Rejected', 'badge' => 'bg-danger'],
]);

// ── Start Session ──────────────────────────────────────────────
if (session_status() === PHP_SESSION_NONE) {
    session_name(SESSION_NAME);
    session_start();
}

// ── Helper: Redirect ───────────────────────────────────────────
function redirect(string $path): void
{
    header('Location: ' . BASE_URL . '/' . ltrim($path, '/'));
    exit;
}

// ── Helper: Flash Messages ─────────────────────────────────────
function setFlash(string $type, string $message): void
{
    $_SESSION['flash'] = ['type' => $type, 'message' => $message];
}

function getFlash(): ?array
{
    if (isset($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash;
    }
    return null;
}

// ── CSRF Helpers ───────────────────────────────────────────────
function generateCsrf(): string
{
    if (empty($_SESSION[CSRF_TOKEN_NAME])) {
        $_SESSION[CSRF_TOKEN_NAME] = bin2hex(random_bytes(32));
    }
    return $_SESSION[CSRF_TOKEN_NAME];
}

function verifyCsrf(): void
{
    $token = $_POST[CSRF_TOKEN_NAME] ?? '';
    if (!hash_equals($_SESSION[CSRF_TOKEN_NAME] ?? '', $token)) {
        http_response_code(403);
        die('Invalid CSRF token. Please go back and try again.');
    }
}

// ── Helper: Sanitize Output ───────────────────────────────────
function e(string $str): string
{
    return htmlspecialchars($str, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

// ── Helper: Slugify ───────────────────────────────────────────
function slugify(string $text): string
{
    $text = mb_strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
    $text = preg_replace('/[\s-]+/', '-', $text);
    return trim($text, '-');
}

// ── Helper: Time Ago ─────────────────────────────────────────
function timeAgo(string $datetime): string
{
    $now = new DateTime();
    $past = new DateTime($datetime);
    $diff = $now->diff($past);

    if ($diff->days === 0)
        return 'Today';
    if ($diff->days === 1)
        return '1 day ago';
    if ($diff->days < 7)
        return $diff->days . ' days ago';
    if ($diff->days < 30)
        return floor($diff->days / 7) . ' weeks ago';
    if ($diff->days < 365)
        return floor($diff->days / 30) . ' months ago';
    return floor($diff->days / 365) . ' years ago';
}
