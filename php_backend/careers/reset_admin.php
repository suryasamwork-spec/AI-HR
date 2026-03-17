<?php
require_once __DIR__ . '/config/db.php';

try {
    $db = getDB();
    
    // Check if admin already exists
    $stmt = $db->prepare("SELECT id FROM admin_users WHERE username = 'admin' LIMIT 1");
    $stmt->execute();
    $exists = $stmt->fetch();

    $password = 'Admin@1234';
    $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

    if ($exists) {
        // Update existing
        $stmt = $db->prepare("UPDATE admin_users SET password_hash = :hash, is_active = 1 WHERE username = 'admin'");
        $stmt->execute([':hash' => $hash]);
        echo "Admin password has been reset to: " . $password . "\n";
    } else {
        // Create new
        $stmt = $db->prepare("INSERT INTO admin_users (full_name, username, email, password_hash, role, is_active) 
                              VALUES ('Super Admin', 'admin', 'admin@caldimengineering.com', :hash, 'superadmin', 1)");
        $stmt->execute([':hash' => $hash]);
        echo "Admin user created with password: " . $password . "\n";
    }

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
