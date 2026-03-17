<?php
/**
 * ApplicationModel – Job Application Operations
 */

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/config.php';

class ApplicationModel
{
    private PDO $db;

    public function __construct()
    {
        $this->db = getDB();
    }

    public function apply(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO applications (
                job_id, user_id, cover_letter, resume_path, resume_name,
                current_ctc, expected_ctc, notice_period, total_experience,
                portfolio_link, current_location
            )
             VALUES (
                :job_id, :user_id, :cover_letter, :resume_path, :resume_name,
                :current_ctc, :expected_ctc, :notice_period, :total_experience,
                :portfolio_link, :current_location
            )'
        );
        $stmt->execute([
            ':job_id' => $data['job_id'],
            ':user_id' => $data['user_id'],
            ':cover_letter' => $data['cover_letter'] ?? null,
            ':resume_path' => $data['resume_path'],
            ':resume_name' => $data['resume_name'],
            ':current_ctc' => $data['current_ctc'] ?? null,
            ':expected_ctc' => $data['expected_ctc'] ?? null,
            ':notice_period' => $data['notice_period'] ?? null,
            ':total_experience' => $data['total_experience'] ?? null,
            ':portfolio_link' => $data['portfolio_link'] ?? null,
            ':current_location' => $data['current_location'] ?? null,
        ]);
        return (int)$this->db->lastInsertId();
    }

    public function hasApplied(int $jobId, int $userId): bool
    {
        $stmt = $this->db->prepare(
            'SELECT id FROM applications WHERE job_id = :job_id AND user_id = :user_id LIMIT 1'
        );
        $stmt->execute([':job_id' => $jobId, ':user_id' => $userId]);
        return (bool)$stmt->fetch();
    }

    /** Candidate dashboard – my applications */
    public function getByUser(int $userId): array
    {
        $stmt = $this->db->prepare(
            "SELECT a.*, j.title AS job_title, j.location, j.job_type, d.name AS department_name
             FROM applications a
             JOIN jobs j ON a.job_id = j.id
             JOIN departments d ON j.department_id = d.id
             WHERE a.user_id = :user_id
             ORDER BY a.applied_at DESC"
        );
        $stmt->execute([':user_id' => $userId]);
        return $stmt->fetchAll();
    }

    /** Admin – all applications with optional filters */
    public function getAll(array $filters = [], int $page = 1): array
    {
        [$where, $params] = $this->buildWhere($filters);
        $offset = ($page - 1) * APPS_PER_PAGE;

        $sql = "SELECT a.*, u.full_name AS user_name, u.email AS user_email, u.phone AS user_phone, j.title AS job_title, j.location AS job_location, d.name AS department_name
                FROM applications a
                JOIN users u ON a.user_id = u.id
                JOIN jobs j ON a.job_id = j.id
                JOIN departments d ON j.department_id = d.id
                $where
                ORDER BY a.applied_at DESC
                LIMIT :limit OFFSET :offset";

        $stmt = $this->db->prepare($sql);
        foreach ($params as $k => $v) {
            $stmt->bindValue($k, $v);
        }
        $stmt->bindValue(':limit', APPS_PER_PAGE, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function getCount(array $filters = []): int
    {
        [$where, $params] = $this->buildWhere($filters);
        $stmt = $this->db->prepare(
            "SELECT COUNT(*) FROM applications a JOIN users u ON a.user_id=u.id JOIN jobs j ON a.job_id=j.id JOIN departments d ON j.department_id=d.id $where"
        );
        $stmt->execute($params);
        return (int)$stmt->fetchColumn();
    }

    public function getById(int $id): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT a.*, u.full_name AS user_name, u.email AS user_email, u.phone AS user_phone, j.title AS job_title, j.location AS job_location,
                    j.department_id, d.name AS department_name
             FROM applications a
             JOIN users u ON a.user_id = u.id
             JOIN jobs j ON a.job_id = j.id
             JOIN departments d ON j.department_id = d.id
             WHERE a.id = :id LIMIT 1"
        );
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function updateStatus(int $id, string $status, ?string $notes = null): bool
    {
        $stmt = $this->db->prepare(
            'UPDATE applications SET status = :status, admin_notes = :notes WHERE id = :id'
        );
        return $stmt->execute([':status' => $status, ':notes' => $notes, ':id' => $id]);
    }

    /** Dashboard stats */
    public function getStats(): array
    {
        $stats = [];
        $statuses = ['applied', 'shortlisted', 'interview', 'offered', 'hired', 'rejected'];
        foreach ($statuses as $s) {
            $stmt = $this->db->prepare("SELECT COUNT(*) FROM applications WHERE status = :s");
            $stmt->execute([':s' => $s]);
            $stats[$s] = (int)$stmt->fetchColumn();
        }
        $stats['total'] = (int)$this->db->query('SELECT COUNT(*) FROM applications')->fetchColumn();
        return $stats;
    }

    /** Recent 5 for admin dashboard widget */
    public function getRecent(int $limit = 5): array
    {
        $stmt = $this->db->prepare(
            "SELECT a.id, a.status, a.applied_at, u.full_name, u.email, j.title AS job_title
             FROM applications a
             JOIN users u ON a.user_id = u.id
             JOIN jobs j ON a.job_id = j.id
             ORDER BY a.applied_at DESC LIMIT :limit"
        );
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    /** Export all for CSV */
    public function getAllForExport(array $filters = []): array
    {
        [$where, $params] = $this->buildWhere($filters);
        $sql = "SELECT a.id, u.full_name, u.email, u.phone, j.title AS job_title,
                       d.name AS department, j.location, a.status, a.applied_at, a.resume_name
                FROM applications a
                JOIN users u ON a.user_id = u.id
                JOIN jobs j ON a.job_id = j.id
                JOIN departments d ON j.department_id = d.id
                $where ORDER BY a.applied_at DESC";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    // ──────────────────────────────────────────────────────────
    private function buildWhere(array $filters): array
    {
        $conditions = [];
        $params = [];

        if (!empty($filters['job_id'])) {
            $conditions[] = 'a.job_id = :job_id';
            $params[':job_id'] = (int)$filters['job_id'];
        }
        if (!empty($filters['status'])) {
            $conditions[] = 'a.status = :status';
            $params[':status'] = $filters['status'];
        }
        if (!empty($filters['department'])) {
            $conditions[] = 'j.department_id = :dept';
            $params[':dept'] = (int)$filters['department'];
        }
        if (!empty($filters['search'])) {
            $conditions[] = '(u.full_name LIKE :search OR u.email LIKE :search OR j.title LIKE :search)';
            $params[':search'] = '%' . $filters['search'] . '%';
        }
        if (!empty($filters['from_date'])) {
            $conditions[] = 'DATE(a.applied_at) >= :from_date';
            $params[':from_date'] = $filters['from_date'];
        }
        if (!empty($filters['to_date'])) {
            $conditions[] = 'DATE(a.applied_at) <= :to_date';
            $params[':to_date'] = $filters['to_date'];
        }

        $where = $conditions ? 'WHERE ' . implode(' AND ', $conditions) : '';
        return [$where, $params];
    }
}
