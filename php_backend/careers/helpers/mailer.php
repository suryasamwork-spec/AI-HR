<?php
/**
 * Mailer Helper – Email Notifications via PHPMailer
 * Install PHPMailer: composer require phpmailer/phpmailer
 * Or manually place PHPMailer in /vendor/phpmailer/
 *
 * If PHPMailer is not installed, emails are silently skipped.
 */

require_once __DIR__ . '/../config/config.php';

function sendMail(string $toEmail, string $toName, string $subject, string $body): bool
{
    if (!MAIL_ENABLED) {
        return false; // Email disabled in config
    }

    // Check if PHPMailer is available
    $phpmailerPath = __DIR__ . '/../vendor/autoload.php';
    if (!file_exists($phpmailerPath)) {
        error_log('PHPMailer not found. Email to ' . $toEmail . ' skipped.');
        return false;
    }

    require_once $phpmailerPath;

    $mail = new PHPMailer\PHPMailer\PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = MAIL_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = MAIL_USERNAME;
        $mail->Password = MAIL_PASSWORD;
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = MAIL_PORT;

        $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);
        $mail->addAddress($toEmail, $toName);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->AltBody = strip_tags($body);

        $mail->send();
        return true;
    }
    catch (Exception $e) {
        error_log('Mailer Error: ' . $e->getMessage());
        return false;
    }
}

function sendConfirmationEmail(string $toEmail, string $toName, string $jobTitle): bool
{
    $subject = 'Application Received – ' . $jobTitle . ' | ' . COMPANY;
    $body = getEmailTemplate([
        'title' => 'Application Received!',
        'name' => $toName,
        'content' => 'Thank you for applying for the position of <strong>' . e($jobTitle) . '</strong> at <strong>' . COMPANY . '</strong>.<br><br>
                      Your application has been received and is under review. We will contact you if your profile matches our requirements.<br><br>
                      You can track your application status by logging in to the careers portal.',
        'cta_url' => BASE_URL . '/my-applications',
        'cta_text' => 'Track My Application',
    ]);
    return sendMail($toEmail, $toName, $subject, $body);
}

function sendStatusUpdateEmail(string $toEmail, string $toName, string $jobTitle, string $status): bool
{
    $statusLabels = STATUS_LABELS;
    $label = $statusLabels[$status]['label'] ?? ucfirst($status);
    $subject = 'Application Update – ' . $jobTitle . ' | ' . COMPANY;
    $body = getEmailTemplate([
        'title' => 'Application Status Update',
        'name' => $toName,
        'content' => 'Your application for <strong>' . e($jobTitle) . '</strong> at <strong>' . COMPANY . '</strong> has been updated.<br><br>
                      <strong>New Status: ' . e($label) . '</strong><br><br>
                      Our HR team will be in touch with you shortly for next steps.',
        'cta_url' => BASE_URL . '/my-applications',
        'cta_text' => 'View Application',
    ]);
    return sendMail($toEmail, $toName, $subject, $body);
}

function getEmailTemplate(array $vars): string
{
    return '<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { font-family: Arial, sans-serif; background:#f4f6f9; margin:0; padding:0; }
  .wrapper { max-width:600px; margin:30px auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,.1); }
  .header { background: linear-gradient(135deg,#0d1b2a,#1a3450); padding:30px; text-align:center; }
  .header h1 { color:#c9a84c; margin:0; font-size:22px; letter-spacing:1px; }
  .header p { color:#aaa; margin:4px 0 0; font-size:13px; }
  .body { padding:30px; }
  .body h2 { color:#0d1b2a; }
  .body p { color:#555; line-height:1.7; }
  .cta { display:inline-block; margin:20px 0; padding:12px 28px; background:#c9a84c; color:#0d1b2a !important; text-decoration:none; border-radius:5px; font-weight:bold; }
  .footer { background:#f4f6f9; padding:16px; text-align:center; font-size:12px; color:#999; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <h1>' . COMPANY . '</h1>
    <p>Careers Portal</p>
  </div>
  <div class="body">
    <h2>' . e($vars['title']) . '</h2>
    <p>Dear ' . e($vars['name']) . ',</p>
    <p>' . $vars['content'] . '</p>
    <a href="' . e($vars['cta_url']) . '" class="cta">' . e($vars['cta_text']) . '</a>
  </div>
  <div class="footer">
    &copy; ' . date('Y') . ' ' . COMPANY . ' | All rights reserved<br>
    This is an automated email, please do not reply.
  </div>
</div>
</body>
</html>';
}
