<?php
/**
 * ExportController – CSV Export of Applications
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../helpers/auth.php';
require_once __DIR__ . '/../models/ApplicationModel.php';

class ExportController
{
    public function exportApplications(): void
    {
        requireAdmin();

        $filters = [
            'job_id' => intval($_GET['job_id'] ?? 0) ?: null,
            'status' => trim($_GET['status'] ?? ''),
            'department' => intval($_GET['department'] ?? 0) ?: null,
            'from_date' => trim($_GET['from_date'] ?? ''),
            'to_date' => trim($_GET['to_date'] ?? ''),
        ];

        $model = new ApplicationModel();
        $rows = $model->getAllForExport($filters);

        $filename = 'caldim_applications_' . date('Ymd_His') . '.csv';

        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        header('Pragma: no-cache');
        header('Expires: 0');

        $output = fopen('php://output', 'w');

        // BOM for Excel UTF-8 compatibility
        fwrite($output, "\xEF\xBB\xBF");

        // Header row
        fputcsv($output, [
            'ID', 'Candidate Name', 'Email', 'Phone',
            'Job Title', 'Department', 'Location',
            'Status', 'Applied Date', 'Resume File',
        ]);

        foreach ($rows as $row) {
            fputcsv($output, [
                $row['id'],
                $row['full_name'],
                $row['email'],
                $row['phone'] ?? '',
                $row['job_title'],
                $row['department'],
                $row['location'],
                ucfirst($row['status']),
                date('d-M-Y H:i', strtotime($row['applied_at'])),
                $row['resume_name'],
            ]);
        }

        fclose($output);
        exit;
    }
}
