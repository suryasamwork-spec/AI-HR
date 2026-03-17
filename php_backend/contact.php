<?php
ob_start(); // Buffer output to prevent accidental warnings from breaking JSON
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once 'db.php';

// Get JSON input
$input = file_get_contents("php://input");
$data = json_decode($input, true);

$firstName = $data['firstName'] ?? '';
$lastName = $data['lastName'] ?? '';
$email = $data['email'] ?? '';
$contactNumber = $data['contactNumber'] ?? '';
$projectInfo = $data['projectInfo'] ?? '';

if (empty($firstName) || empty($lastName) || empty($email) || empty($contactNumber) || empty($projectInfo)) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

// 1. Save to Database
$stmt = $conn->prepare("INSERT INTO enquiries (first_name, last_name, email, contact_number, project_info) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) {
    die(json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]));
}
$stmt->bind_param("sssss", $firstName, $lastName, $email, $contactNumber, $projectInfo);
if (!$stmt->execute()) {
    die(json_encode(["success" => false, "message" => "Execute failed: " . $stmt->error]));
}

// 2. Send Emails (Notification to CALDIM)
$to = "support@caldimengg.in";
$from_admin = "h23nic1babu18@gmail.com"; // Use a regular Gmail to bypass local routing
$from_client = "support@caldimengg.in";
$subject = "🔥 NEW ENQUIRY: $firstName $lastName";

// Use \n instead of \r\n as some Linux servers (BigRock) prefer it
$headers_admin = "MIME-Version: 1.0\n";
$headers_admin .= "Content-Type: text/html; charset=UTF-8\n";
$headers_admin .= "From: CALDIM Website <$from_admin>\n";
$headers_admin .= "Reply-To: $email\n";
$headers_admin .= "X-Priority: 1 (Highest)\n";

$message_admin = "
    <div style='font-family: sans-serif; padding: 20px; border: 2px solid #1d4ed8;'>
        <h2 style='color: #1d4ed8;'>New Lead Captured</h2>
        <p><strong>Name:</strong> $firstName $lastName</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Contact:</strong> $contactNumber</p>
        <p style='background: #f3f4f6; padding: 15px;'><strong>Project Info:</strong><br/> " . nl2br(htmlspecialchars($projectInfo)) . "</p>
    </div>
";

// 3. Auto-reply to Client
$headers_client = "MIME-Version: 1.0\n";
$headers_client .= "Content-Type: text/html; charset=UTF-8\n";
$headers_client .= "From: CALDIM Engineering <$from_client>\n";

$message_client = "
    <div style='font-family: sans-serif; padding: 20px;'>
        <h2 style='color: #1d4ed8;'>Thank You, $firstName!</h2>
        <p>We have received your enquiry and our team will get back to you within 24–48 hours.</p>
        <hr/>
        <p><small>This is an automated response from caldimengg.in</small></p>
    </div>
";

// Use mail() function and store status
$mail_admin = @mail($to, $subject, $message_admin, $headers_admin, "-f$from_admin");
$mail_client = @mail($email, "Enquiry Received — CALDIM Engineering", $message_client, $headers_client, "-f$from_client");
@mail($from_admin, $subject, $message_admin, $headers_admin, "-f$from_admin"); // Send copy to Gmail too

@ob_clean();
echo json_encode([
    "success" => true,
    "message" => "Enquiry received successfully.",
    "mail_status" => ($mail_admin || $mail_client) ? "triggered" : "deferred"
]);
?>