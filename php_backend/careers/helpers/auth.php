<?php
/**
 * Auth Helper – Session Guards
 */

require_once __DIR__ . '/../config/config.php';

function isLoggedIn(): bool
{
    return !empty($_SESSION['user_id']);
}

function isAdmin(): bool
{
    return !empty($_SESSION['admin_id']);
}

function requireLogin(string $redirect = 'login'): void
{
    if (!isLoggedIn()) {
        setFlash('warning', 'Please log in to continue.');
        redirect($redirect);
    }

    // Session timeout check
    if (isset($_SESSION['last_activity']) &&
    (time() - $_SESSION['last_activity']) > SESSION_TIMEOUT) {
        session_unset();
        session_destroy();
        setFlash('warning', 'Your session has expired. Please log in again.');
        redirect($redirect);
    }
    $_SESSION['last_activity'] = time();
}

function requireAdmin(string $redirect = 'admin/login'): void
{
    if (!isAdmin()) {
        setFlash('warning', 'Admin access required.');
        redirect($redirect);
    }

    if (isset($_SESSION['admin_last_activity']) &&
    (time() - $_SESSION['admin_last_activity']) > SESSION_TIMEOUT) {
        session_unset();
        session_destroy();
        setFlash('warning', 'Admin session expired. Please log in again.');
        redirect($redirect);
    }
    $_SESSION['admin_last_activity'] = time();
}

function loginUser(array $user): void
{
    session_regenerate_id(true);
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['full_name'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['last_activity'] = time();
}

function loginAdmin(array $admin): void
{
    session_regenerate_id(true);
    $_SESSION['admin_id'] = $admin['id'];
    $_SESSION['admin_name'] = $admin['full_name'];
    $_SESSION['admin_role'] = $admin['role'];
    $_SESSION['admin_last_activity'] = time();
}

function logoutUser(): void
{
    session_unset();
    session_destroy();
    session_start();
    session_regenerate_id(true);
}
