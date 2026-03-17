<?php
/**
 * File Upload Helper – Resume Validation & Storage
 */

require_once __DIR__ . '/../config/config.php';

/**
 * Handle resume upload.
 * Returns ['path' => ..., 'name' => ...] on success, throws RuntimeException on failure.
 */
function uploadResume(array $file, int $userId): array
{
    if (!isset($file['error']) || $file['error'] !== UPLOAD_ERR_OK) {
        $errors = [
            UPLOAD_ERR_INI_SIZE => 'File exceeds server upload limit.',
            UPLOAD_ERR_FORM_SIZE => 'File exceeds form upload limit.',
            UPLOAD_ERR_NO_FILE => 'No file was uploaded.',
            UPLOAD_ERR_PARTIAL => 'File upload was not completed.',
        ];
        throw new RuntimeException($errors[$file['error']] ?? 'File upload failed.');
    }

    // Size check
    if ($file['size'] > MAX_FILE_SIZE) {
        throw new RuntimeException('Resume must be smaller than 5 MB.');
    }

    // Extension check
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, ALLOWED_EXTENSIONS, true)) {
        throw new RuntimeException('Only PDF, DOC, and DOCX files are allowed.');
    }

    // MIME check (finfo)
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mimeType = $finfo->file($file['tmp_name']);
    if (!in_array($mimeType, ALLOWED_MIMES, true)) {
        throw new RuntimeException('Invalid file type detected. Upload aborted.');
    }

    // Ensure upload directory exists
    if (!is_dir(UPLOAD_DIR) && !mkdir(UPLOAD_DIR, 0755, true)) {
        throw new RuntimeException('Upload directory could not be created.');
    }

    // Generate safe filename
    $safeOriginal = preg_replace('/[^a-zA-Z0-9._-]/', '_', basename($file['name']));
    $newFilename = $userId . '_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
    $destination = UPLOAD_DIR . $newFilename;

    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        throw new RuntimeException('Could not save the uploaded file. Please try again.');
    }

    return [
        'path' => 'uploads/resumes/' . $newFilename,
        'name' => $safeOriginal,
    ];
}

/**
 * Delete a resume file from disk.
 */
function deleteResume(string $relativePath): bool
{
    $fullPath = __DIR__ . '/../' . $relativePath;
    if (file_exists($fullPath) && is_file($fullPath)) {
        return unlink($fullPath);
    }
    return false;
}
