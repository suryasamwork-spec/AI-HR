<?php
/**
 * AdminModel – Admin User Authentication
 */
require_once __DIR__ . '/../config/db.php';

class AdminModel
{
    private PDO $db;

    public function __construct()
    {
        $this->db = getDB();
    }

    public function findByUsername(string $username): ?array
    {
        $stmt = $this->db->prepare(
            'SELECT * FROM admin_users WHERE username = :u AND is_active = 1 LIMIT 1'
        );
        $stmt->execute([':u' => $username]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function findByEmail(string $email): ?array
    {
        $stmt = $this->db->prepare(
            'SELECT * FROM admin_users WHERE email = :e AND is_active = 1 LIMIT 1'
        );
        $stmt->execute([':e' => $email]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function verifyPassword(string $plain, string $hash): bool
    {
        return password_verify($plain, $hash);
    }

    public function updateLastLogin(int $id): void
    {
        $stmt = $this->db->prepare('UPDATE admin_users SET last_login = NOW() WHERE id = :id');
        $stmt->execute([':id' => $id]);
    }

    public function getAll(): array
    {
        return $this->db->query('SELECT id, full_name, username, email, role, is_active, last_login FROM admin_users ORDER BY id')->fetchAll();
    }

    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO admin_users (full_name, username, email, password_hash, role)
             VALUES (:full_name, :username, :email, :password_hash, :role)'
        );
        $stmt->execute([
            ':full_name' => $data['full_name'],
            ':username' => $data['username'],
            ':email' => $data['email'],
            ':password_hash' => password_hash($data['password'], PASSWORD_BCRYPT, ['cost' => 12]),
            ':role' => $data['role'] ?? 'hr',
        ]);
        return (int)$this->db->lastInsertId();
    }
}
