<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once 'db.php';

// Handle health check (health)
if ($_GET['action'] == 'health') {
    echo json_encode(["status" => "ok", "timestamp" => date('c')]);
    exit;
}

// Get JSON input
$input = file_get_contents("php://input");
$data = json_decode($input, true);
$action = $_GET['action'] ?? '';

// ACTION: send-otp
if ($action == 'send-otp') {
    $email = $data['email'] ?? '';
    $firstName = $data['firstName'] ?? '';

    if (empty($email)) {
        echo json_encode(["success" => false, "message" => "Business email is required."]);
        exit;
    }

    $otp = rand(100000, 999999);
    $expires = date('Y-m-d H:i:s', strtotime('+10 minutes'));

    // Save to OTP table
    $stmt = $conn->prepare("INSERT INTO otp_verification (email, otp, expires_at) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $otp, $expires);
    $stmt->execute();

    // Send the email
    $from = "support@caldimengg.in";
    $headers = "MIME-Version: 1.0\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\n";
    $headers .= "From: CALDIM Demo Access <$from>\n";

    $message = "
        <div style='font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #002B54; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);'>
            <div style='padding: 40px; text-align: center; color: white;'>
                <h2>Verification Code</h2>
                <div style='margin: 30px 0; padding: 20px; background: white; border-radius: 12px; font-size: 32px; font-weight: 800; color: #002B54;'>$otp</div>
                <p>Hello $firstName, use this code to unlock the full technical walkthrough.</p>
                <p>Expires in 10 minutes</p>
            </div>
        </div>
    ";

    @mail($to, "$otp is your CALDIM code", $message, $headers, "-f$from");
    echo json_encode(["success" => true, "message" => "OTP sent to your email."]);
    exit;
}

// ACTION: verify-otp-only
if ($action == 'verify-otp-only') {
    $email = $data['email'] ?? '';
    $otp = $data['otp'] ?? '';

    $stmt = $conn->prepare("SELECT id FROM otp_verification WHERE email=? AND otp=? AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1");
    $stmt->bind_param("ss", $email, $otp);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["success" => true, "message" => "OTP verified."]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid or expired OTP."]);
    }
    exit;
}

// ACTION: verify-otp-and-lead
if ($action == 'verify-otp-and-lead') {
    $email = $data['email'] ?? '';
    $otp = $data['otp'] ?? '';
    $firstName = $data['firstName'] ?? '';
    $lastName = $data['lastName'] ?? '';
    $organization = $data['organization'] ?? '';
    $projectTitle = $data['projectTitle'] ?? '';

    // Final verification check
    $stmt = $conn->prepare("SELECT id FROM otp_verification WHERE email=? AND otp=? AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1");
    $stmt->bind_param("ss", $email, $otp);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Successful verification! Send lead emails.
        $to = "support@caldimengg.in";
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "From: CALDIM Website <$to>\r\n";

        $message_admin = "
            <div style='font-family: Arial, sans-serif; background: #f4f7fa; padding: 40px;'>
                 <h2 style='color: #002B54;'>New Demo Watch Lead</h2>
                 <p><strong>Project:</strong> $projectTitle</p>
                 <p><strong>Contact:</strong> $firstName $lastName</p>
                 <p><strong>Email:</strong> $email</p>
                 <p><strong>Organization:</strong> $organization</p>
            </div>
        ";

        mail($to, "🚀 Demo Watch Lead: $organization", $message_admin, $headers);
        echo json_encode(["success" => true, "message" => "Verification successful."]);
    } else {
        echo json_encode(["success" => false, "message" => "Verification failed."]);
    }
    exit;
}
?>