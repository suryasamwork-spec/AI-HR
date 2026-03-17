<?php
/**
 * DepartmentModel
 */
require_once __DIR__ . '/../config/db.php';

class DepartmentModel
{
    private PDO $db;

    public function __construct()
    {
        $this->db = getDB();
    }

    public function getAll(): array
    {
        return $this->db->query('SELECT * FROM departments ORDER BY id')->fetchAll();
    }

    public function getById(int $id): ?array
    {
        $stmt = $this->db->prepare('SELECT * FROM departments WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO departments (name, description, icon) VALUES (:name, :desc, :icon)'
        );
        $stmt->execute([
            ':name' => $data['name'],
            ':desc' => $data['description'] ?? null,
            ':icon' => $data['icon'] ?? 'fas fa-briefcase',
        ]);
        return (int)$this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool
    {
        $stmt = $this->db->prepare(
            'UPDATE departments SET name=:name, description=:desc, icon=:icon WHERE id=:id'
        );
        return $stmt->execute([
            ':name' => $data['name'],
            ':desc' => $data['description'] ?? null,
            ':icon' => $data['icon'] ?? 'fas fa-briefcase',
            ':id' => $id,
        ]);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare('DELETE FROM departments WHERE id=:id');
        return $stmt->execute([':id' => $id]);
    }

    /** Departments with open job counts for home page cards */
    public function getAllWithJobCount(): array
    {
        return $this->db->query(
            "SELECT d.*, COUNT(j.id) AS job_count
             FROM departments d
             LEFT JOIN jobs j ON j.department_id = d.id AND j.is_active = 1
             GROUP BY d.id ORDER BY d.id"
        )->fetchAll();
    }
}
