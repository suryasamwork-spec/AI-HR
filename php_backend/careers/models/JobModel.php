<?php
/**
 * JobModel – Job Listing & Management
 */

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/config.php';

class JobModel
{
    private PDO $db;

    public function __construct()
    {
        $this->db = getDB();
    }

    /** Get paginated, filtered job listings */
    public function getAll(array $filters = [], int $page = 1): array
    {
        [$where, $params] = $this->buildWhere($filters);

        $offset = ($page - 1) * JOBS_PER_PAGE;

        $sql = "SELECT j.*, d.name AS department_name
                FROM jobs j
                JOIN departments d ON j.department_id = d.id
                $where
                ORDER BY j.is_featured DESC, j.created_at DESC
                LIMIT :limit OFFSET :offset";

        $stmt = $this->db->prepare($sql);
        foreach ($params as $k => $v) {
            $stmt->bindValue($k, $v);
        }
        $stmt->bindValue(':limit', JOBS_PER_PAGE, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    /** Total count for pagination */
    public function getCount(array $filters = []): int
    {
        [$where, $params] = $this->buildWhere($filters);
        $stmt = $this->db->prepare("SELECT COUNT(*) FROM jobs j JOIN departments d ON j.department_id = d.id $where");
        $stmt->execute($params);
        return (int)$stmt->fetchColumn();
    }

    /** Featured jobs for home page */
    public function getFeatured(int $limit = 6): array
    {
        $stmt = $this->db->prepare(
            "SELECT j.*, d.name AS department_name
             FROM jobs j JOIN departments d ON j.department_id = d.id
             WHERE j.is_featured = 1 AND j.is_active = 1
               AND (j.deadline IS NULL OR j.deadline >= CURDATE())
             ORDER BY j.created_at DESC LIMIT :limit"
        );
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    /** Internship listings */
    public function getInternships(int $limit = 4): array
    {
        $stmt = $this->db->prepare(
            "SELECT j.*, d.name AS department_name
             FROM jobs j JOIN departments d ON j.department_id = d.id
             WHERE j.job_type = 'internship' AND j.is_active = 1
             ORDER BY j.created_at DESC LIMIT :limit"
        );
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function getById(int $id): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT j.*, d.name AS department_name
             FROM jobs j JOIN departments d ON j.department_id = d.id
             WHERE j.id = :id LIMIT 1"
        );
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function getBySlug(string $slug): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT j.*, d.name AS department_name
             FROM jobs j JOIN departments d ON j.department_id = d.id
             WHERE j.slug = :slug AND j.is_active = 1 LIMIT 1"
        );
        $stmt->execute([':slug' => $slug]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            "INSERT INTO jobs
              (department_id, title, slug, location, job_type, experience_min, experience_max,
               salary_range, description, requirements, responsibilities, skills_required,
               openings, is_featured, is_active, deadline, created_by)
             VALUES
              (:department_id, :title, :slug, :location, :job_type, :exp_min, :exp_max,
               :salary, :description, :requirements, :responsibilities, :skills,
               :openings, :is_featured, :is_active, :deadline, :created_by)"
        );
        $stmt->execute($this->mapData($data));
        return (int)$this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool
    {
        $stmt = $this->db->prepare(
            "UPDATE jobs SET
               department_id=:department_id, title=:title, slug=:slug,
               location=:location, job_type=:job_type,
               experience_min=:exp_min, experience_max=:exp_max,
               salary_range=:salary, description=:description,
               requirements=:requirements, responsibilities=:responsibilities,
               skills_required=:skills, openings=:openings,
               is_featured=:is_featured, is_active=:is_active, deadline=:deadline
             WHERE id=:id"
        );
        $params = $this->mapData($data);
        $params[':id'] = $id;
        unset($params[':created_by']);
        return $stmt->execute($params);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare('UPDATE jobs SET is_active = 0 WHERE id = :id');
        return $stmt->execute([':id' => $id]);
    }

    public function getDistinctLocations(): array
    {
        $stmt = $this->db->query(
            'SELECT DISTINCT location FROM jobs WHERE is_active = 1 ORDER BY location'
        );
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    public function getStats(): array
    {
        return [
            'total' => (int)$this->db->query('SELECT COUNT(*) FROM jobs')->fetchColumn(),
            'active_jobs' => (int)$this->db->query('SELECT COUNT(*) FROM jobs WHERE is_active = 1')->fetchColumn(),
            'new' => (int)$this->db->query("SELECT COUNT(*) FROM jobs WHERE is_active = 1 AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)")->fetchColumn(),
        ];
    }

    // ──────────────────────────────────────────────────────────────
    private function buildWhere(array $filters): array
    {
        $conditions = ['j.is_active = 1', '(j.deadline IS NULL OR j.deadline >= CURDATE())'];
        $params = [];

        if (!empty($filters['keyword'])) {
            $conditions[] = 'MATCH(j.title, j.description, j.skills_required) AGAINST(:keyword IN BOOLEAN MODE)';
            $params[':keyword'] = $filters['keyword'] . '*';
        }
        if (!empty($filters['department'])) {
            $conditions[] = 'j.department_id = :dept';
            $params[':dept'] = (int)$filters['department'];
        }
        if (!empty($filters['location'])) {
            $conditions[] = 'j.location LIKE :location';
            $params[':location'] = '%' . $filters['location'] . '%';
        }
        if (!empty($filters['job_type'])) {
            $conditions[] = 'j.job_type = :job_type';
            $params[':job_type'] = $filters['job_type'];
        }
        if (isset($filters['experience']) && $filters['experience'] !== '') {
            if (strpos($filters['experience'], '-') !== false) {
                [$min, $max] = explode('-', $filters['experience']);
                $conditions[] = 'j.experience_min >= :exp_min';
                $conditions[] = 'j.experience_min <= :exp_max';
                $params[':exp_min'] = (int)$min;
                $params[':exp_max'] = (int)$max;
            } elseif (strpos($filters['experience'], '+') !== false) {
                $conditions[] = 'j.experience_min >= :exp_min';
                $params[':exp_min'] = (int)str_replace('+', '', $filters['experience']);
            } else {
                $conditions[] = 'j.experience_min = :exp';
                $params[':exp'] = (int)$filters['experience'];
            }
        }

        $where = $conditions ? 'WHERE ' . implode(' AND ', $conditions) : '';
        return [$where, $params];
    }

    private function mapData(array $d): array
    {
        return [
            ':department_id' => $d['department_id'],
            ':title' => $d['title'],
            ':slug' => slugify($d['title']) . '-' . time(),
            ':location' => $d['location'],
            ':job_type' => $d['job_type'],
            ':exp_min' => $d['experience_min'] ?? 0,
            ':exp_max' => $d['experience_max'] ?? 0,
            ':salary' => $d['salary_range'] ?? null,
            ':description' => $d['description'],
            ':requirements' => $d['requirements'],
            ':responsibilities' => $d['responsibilities'] ?? null,
            ':skills' => $d['skills_required'] ?? null,
            ':openings' => $d['openings'] ?? 1,
            ':is_featured' => isset($d['is_featured']) ? 1 : 0,
            ':is_active' => isset($d['is_active']) ? 1 : 0,
            ':deadline' => $d['deadline'] ?: null,
            ':created_by' => $d['created_by'] ?? null,
        ];
    }
}
