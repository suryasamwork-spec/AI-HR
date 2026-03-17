<?php
/**
 * AdminController – Job CRUD + Dashboard
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../helpers/auth.php';
require_once __DIR__ . '/../models/JobModel.php';
require_once __DIR__ . '/../models/ApplicationModel.php';
require_once __DIR__ . '/../models/DepartmentModel.php';
require_once __DIR__ . '/../models/AdminModel.php';

class AdminController
{
    private JobModel $jobModel;
    private ApplicationModel $appModel;
    private DepartmentModel $deptModel;

    public function __construct()
    {
        $this->jobModel = new JobModel();
        $this->appModel = new ApplicationModel();
        $this->deptModel = new DepartmentModel();
    }

    // ── Dashboard ────────────────────────────────────────────────
    public function dashboard(): void
    {
        requireAdmin();
        $jobStats = $this->jobModel->getStats();
        $appStats = $this->appModel->getStats();
        $recent = $this->appModel->getRecent(8);
        $flash = getFlash();
        require __DIR__ . '/../../frontend/views/admin/dashboard.php';
    }

    // ── Job List ─────────────────────────────────────────────────
    public function jobList(): void
    {
        requireAdmin();
        $page = max(1, intval($_GET['page'] ?? 1));
        $jobs = $this->jobModel->getAll([], $page);
        $total = $this->jobModel->getCount([]);
        $pages = ceil($total / JOBS_PER_PAGE);
        $flash = getFlash();
        require __DIR__ . '/../../frontend/views/admin/jobs/list.php';
    }

    // ── Create Job Form ───────────────────────────────────────────
    public function createForm(): void
    {
        requireAdmin();
        $departments = $this->deptModel->getAll();
        $csrf = generateCsrf();
        $flash = getFlash();
        require __DIR__ . '/../../frontend/views/admin/jobs/create.php';
    }

    // ── Create Job POST ───────────────────────────────────────────
    public function createPost(): void
    {
        requireAdmin();
        verifyCsrf();

        $data = $this->sanitizeJobData($_POST);
        $data['created_by'] = $_SESSION['admin_id'];

        $errors = $this->validateJobData($data);
        if ($errors) {
            setFlash('error', implode('<br>', $errors));
            redirect('admin/jobs/create');
        }

        $id = $this->jobModel->create($data);
        setFlash('success', 'Job posting created successfully!');
        redirect('admin/jobs/' . $id . '/edit');
    }

    // ── Edit Job Form ─────────────────────────────────────────────
    public function editForm(int $id): void
    {
        requireAdmin();
        $job = $this->jobModel->getById($id);
        if (!$job) {
            setFlash('error', 'Job not found.');
            redirect('admin/jobs');
        }
        $departments = $this->deptModel->getAll();
        $csrf = generateCsrf();
        $flash = getFlash();
        require __DIR__ . '/../../frontend/views/admin/jobs/edit.php';
    }

    // ── Edit Job POST ─────────────────────────────────────────────
    public function editPost(int $id): void
    {
        requireAdmin();
        verifyCsrf();

        $data = $this->sanitizeJobData($_POST);
        $errors = $this->validateJobData($data);
        if ($errors) {
            setFlash('error', implode('<br>', $errors));
            redirect('admin/jobs/' . $id . '/edit');
        }

        $this->jobModel->update($id, $data);
        setFlash('success', 'Job updated successfully.');
        redirect('admin/jobs/' . $id . '/edit');
    }

    // ── Delete / Toggle Active ────────────────────────────────────
    public function deleteJob(int $id): void
    {
        requireAdmin();
        verifyCsrf();
        $this->jobModel->delete($id);
        setFlash('success', 'Job has been deactivated.');
        redirect('admin/jobs');
    }

    // ── Helpers ───────────────────────────────────────────────────
    private function sanitizeJobData(array $post): array
    {
        return [
            'department_id' => intval($post['department_id'] ?? 0),
            'title' => trim($post['title'] ?? ''),
            'location' => trim($post['location'] ?? ''),
            'job_type' => trim($post['job_type'] ?? 'full-time'),
            'experience_min' => max(0, intval($post['experience_min'] ?? 0)),
            'experience_max' => max(0, intval($post['experience_max'] ?? 0)),
            'salary_range' => trim($post['salary_range'] ?? ''),
            'description' => trim($post['description'] ?? ''),
            'requirements' => trim($post['requirements'] ?? ''),
            'responsibilities' => trim($post['responsibilities'] ?? ''),
            'skills_required' => trim($post['skills_required'] ?? ''),
            'openings' => max(1, intval($post['openings'] ?? 1)),
            'is_featured' => isset($post['is_featured']) ? 1 : 0,
            'is_active' => isset($post['is_active']) ? 1 : 0,
            'deadline' => $post['deadline'] ?? null,
        ];
    }

    private function validateJobData(array $d): array
    {
        $errors = [];
        if (!$d['department_id'])
            $errors[] = 'Department is required.';
        if (strlen($d['title']) < 3)
            $errors[] = 'Job title is required.';
        if (strlen($d['location']) < 2)
            $errors[] = 'Location is required.';
        if (strlen($d['description']) < 20)
            $errors[] = 'Description is too short.';
        if (strlen($d['requirements']) < 10)
            $errors[] = 'Requirements are required.';
        return $errors;
    }
}
