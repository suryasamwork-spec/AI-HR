import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Credentials from .env
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = "caldiminternship@gmail.com"
SMTP_PASSWORD = "whjh qoab wrzy dbxf"
SMTP_FROM = "caldiminternship@gmail.com"
TEST_TO = "suryamsam8428@gmail.com"

print(f"Testing SMTP connection to {SMTP_HOST}:{SMTP_PORT}...")
print(f"From: {SMTP_FROM}")
print(f"To: {TEST_TO}")
print()

try:
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Test OTP Email - Caldim Careers"
    msg["From"] = SMTP_FROM
    msg["To"] = TEST_TO

    body = """
    <html>
      <body>
        <h2>Test Email</h2>
        <p>If you received this email, the SMTP configuration is working correctly!</p>
        <h3 style="background:#f4f4f4; padding:10px; display:inline-block; letter-spacing: 5px;">123456</h3>
        <p>(This is a test OTP - ignore it)</p>
      </body>
    </html>
    """
    part = MIMEText(body, "html")
    msg.attach(part)

    print("Connecting to SMTP server...")
    server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15)
    print("Connected! Starting TLS...")
    server.starttls()
    print("TLS started! Logging in...")
    server.login(SMTP_USER, SMTP_PASSWORD)
    print("Login successful! Sending email...")
    server.sendmail(SMTP_FROM, TEST_TO, msg.as_string())
    server.quit()
    print()
    print("SUCCESS! Email sent to", TEST_TO)
    print("Check your inbox (and spam folder).")

except smtplib.SMTPAuthenticationError as e:
    print(f"\nFAILED: Authentication Error!")
    print(f"Error: {e}")
    print()
    print("SOLUTION: The Gmail App Password is invalid or expired.")
    print("Steps to fix:")
    print("  1. Go to https://myaccount.google.com/security")
    print("  2. Enable 2-Step Verification if not already enabled")
    print("  3. Go to https://myaccount.google.com/apppasswords")
    print("  4. Create a new App Password for 'Mail'")
    print("  5. Update SMTP_PASSWORD in backend/.env with the new password")

except smtplib.SMTPConnectError as e:
    print(f"\nFAILED: Cannot connect to SMTP server!")
    print(f"Error: {e}")
    print("Check your internet connection or firewall settings.")

except Exception as e:
    print(f"\nFAILED: Unexpected error!")
    print(f"Type: {type(e).__name__}")
    print(f"Error: {e}")
