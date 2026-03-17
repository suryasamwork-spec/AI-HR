<?php
/**
 * ApplicationController – Apply + Candidate Dashboard + Admin Management
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../helpers/auth.php';
require_once __DIR__ . '/../helpers/upload.php';
require_once __DIR__ . '/../helpers/mailer.php';
require_once __DIR__ . '/../models/ApplicationModel.php';
require_once __DIR__ . '/../models/JobModel.php';
require_once __DIR__ . '/../models/UserModel.php';
require_once __DIR__ . '/../models/DepartmentModel.php';

class ApplicationController
{
    private ApplicationModel $appModel;
    private JobModel $jobModel;
    private UserModel $userModel;
    private DepartmentModel $deptModel;

    public function __construct()
    {
        $this->appModel = new ApplicationModel();
        $this->jobModel = new JobModel();
        $this->userModel = new UserModel();
        $this->deptModel = new DepartmentModel();
    }

    // ── Candidate: Apply Form ────────────────────────────────────
    public function applyForm(int $jobId): void
    {
        requireLogin();

        $job = $this->jobModel->getById($jobId);
        if (!$job || !$job['is_active']) {
            setFlash('error', 'This job posting is no longer available.');
            redirect('jobs');
        }

        if ($this->appModel->hasApplied($jobId, $_SESSION['user_id'])) {
            setFlash('info', 'You have already applied for this position.');
            redirect('my-applications');
        }

        $csrf = generateCsrf();
        $flash = getFlash();
        require __DIR__ . '/../../frontend/views/apply.php';
    }

    // ── Candidate: Submit Application ────────────────────────────
    public function applyPost(int $jobId): void
    {
        requireLogin();
        verifyCsrf();

        $job = $this->jobModel->getById($jobId);
        if (!$job || !$job['is_active']) {
            setFlash('error', 'This job is no longer available.');
            redirect('jobs');
        }

        $userId = $_SESSION['user_id'];

        if ($this->appModel->hasApplied($jobId, $userId)) {
            setFlash('warning', 'You have already applied for this position.');
            redirect('my-applications');
        }

        // Upload resume
        try {
            $upload = uploadResume($_FILES['resume'], $userId);
        }
        catch (RuntimeException $e) {
            setFlash('error', $e->getMessage());
            redirect('apply/' . $jobId);
        }

        $this->appModel->apply([
            'job_id' => $jobId,
            'user_id' => $userId,
            'cover_letter' => trim($_POST['cover_letter'] ?? ''),
            'resume_path' => $upload['path'],
            'resume_name' => $upload['name'],
            'current_ctc' => trim($_POST['current_ctc'] ?? ''),
            'expected_ctc' => trim($_POST['expected_ctc'] ?? ''),
            'notice_period' => trim($_POST['notice_period'] ?? ''),
            'total_experience' => trim($_POST['total_experience'] ?? ''),
            'portfolio_link' => trim($_POST['portfolio_link'] ?? ''),
            'current_location' => trim($_POST['current_location'] ?? ''),
        ]);

        // Send confirmation email
        $user = $this->userModel->getById($userId);
        sendConfirmationEmail($user['email'], $user['full_name'], $job['title']);

        setFlash('success', '🎉 Your application has been submitted! We\'ll be in touch.');
        redirect('my-applications');
    }

    // ── Candidate: My Applications Dashboard ─────────────────────
    public function myApplications(): void
    {
        requireLogin();
        $applications = $this->appModel->getByUser($_SESSION['user_id']);
        $flash = getFlash();
        require __DIR__ . '/../../frontend/views/candidate/dashboard.php';
    }

    // ── Admin: All Applications ───────────────────────────────────
    public function adminList(): void
    {
        requireAdmin();

        $filters = [
            'job_id' => intval($_GET['job_id'] ?? 0) ?: null,
            'status' => trim($_GET['status'] ?? ''),
            'department' => intval($_GET['department'] ?? 0) ?: null,
            'search' => trim($_GET['search'] ?? ''),
            'from_date' => trim($_GET['from_date'] ?? ''),
            'to_date' => trim($_GET['to_date'] ?? ''),
        ];

        $page = max(1, intval($_GET['page'] ?? 1));
        $applications = $this->appModel->getAll($filters, $page);
        $total = $this->appModel->getCount($filters);
        $pages = ceil($total / APPS_PER_PAGE);
        $departments = $this->deptModel->getAll();
        $jobs = $this->jobModel->getAll([], 1);
        $flash = getFlash();
        require __DIR__ . '/../../frontend/views/admin/applications/list.php';
    }

    // ── Admin: Application Detail ─────────────────────────────────
    public function adminDetail(int $id): void
    {
        requireAdmin();
        $application = $this->appModel->getById($id);
        if (!$application) {
            setFlash('error', 'Application not found.');
            redirect('admin/applications');
        }
        $csrf = generateCsrf();
        $flash = getFlash();
        require __DIR__ . '/../../frontend/views/admin/applications/detail.php';
    }

    // ── Admin: Update Status (AJAX or Form) ───────────────────────
    public function updateStatus(): void
    {
        requireAdmin();

        $id = intval($_POST['application_id'] ?? 0);
        $status = trim($_POST['status'] ?? '');
        $notes = trim($_POST['notes'] ?? '');

        $allowed = ['applied', 'shortlisted', 'interview', 'offered', 'rejected', 'hired'];
        if (!in_array($status, $allowed, true)) {
            $this->jsonResponse(['success' => false, 'message' => 'Invalid status.']);
        }

        $ok = $this->appModel->updateStatus($id, $status, $notes ?: null);

        if ($ok) {
            // Notify candidate by email
            $app = $this->appModel->getById($id);
            if ($app) {
                $user = $this->userModel->getById($app['user_id']);
                if ($user) {
                    sendStatusUpdateEmail($user['email'], $user['full_name'], $app['job_title'], $status);
                }
            }
        }

        if (!empty($_SERVER['HTTP_X_REQUESTED_WITH'])) {
            $this->jsonResponse(['success' => $ok]);
        }

        setFlash($ok ? 'success' : 'error', $ok ? 'Status updated.' : 'Update failed.');
        redirect('admin/applications/' . $id);
    }

    // ── Admin: Download Resume ─────────────────────────────────────
    public function downloadResume(int $appId): void
    {
        requireAdmin();
        $app = $this->appModel->getById($appId);
        if (!$app) {
            redirect('admin/applications');
        }

        $fullPath = __DIR__ . '/../' . $app['resume_path'];
        if (!file_exists($fullPath)) {
            setFlash('error', 'Resume file not found.');
            redirect('admin/applications/' . $appId);
        }

        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . e($app['resume_name']) . '"');
        header('Content-Length: ' . filesize($fullPath));
        readfile($fullPath);
        exit;
    }

    private function jsonResponse(array $data): void
    {
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
}
