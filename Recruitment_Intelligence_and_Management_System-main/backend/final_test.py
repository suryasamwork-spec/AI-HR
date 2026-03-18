"""
Final verification: Load config exactly as the backend does and send a real OTP email.
Run this from the backend/ directory.
"""
import sys
import os

# Add backend to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.core.config import get_settings, ENV_FILE

settings = get_settings()

print("=" * 60)
print("SMTP CONFIG CHECK")
print("=" * 60)
print(f"ENV file  : {ENV_FILE}")
print(f"ENV exists: {ENV_FILE.exists()}")
print(f"SMTP host : {settings.smtp_host}")
print(f"SMTP user : {settings.smtp_user}")
print(f"SMTP pass : {'SET (' + str(len(settings.smtp_password)) + ' chars)' if settings.smtp_password else 'EMPTY!'}")
print()

if not all([settings.smtp_host, settings.smtp_user, settings.smtp_password]):
    print("PROBLEM: SMTP settings are empty. Emails won't send.")
    sys.exit(1)

# Send actual OTP email
import smtplib, secrets, string
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

test_email = sys.argv[1] if len(sys.argv) > 1 else "suryamsam8428@gmail.com"
otp = ''.join(secrets.choice(string.digits) for _ in range(6))

print(f"Sending OTP to: {test_email}")
print(f"Test OTP      : {otp}")
print()

try:
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Verify your account for the Recruitment System"
    msg["From"] = settings.smtp_from
    msg["To"] = test_email
    html = f"""
    <html><body>
      <h2>Account Verification</h2>
      <p>Thank you for registering! Please use the following One-Time Password to verify your account.</p>
      <h3 style="background:#f4f4f4; padding:10px; display:inline-block; letter-spacing: 5px;">{otp}</h3>
      <p>This code will expire in 30 minutes.</p>
    </body></html>
    """
    msg.attach(MIMEText(html, "html"))
    
    server = smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15)
    server.starttls()
    server.login(settings.smtp_user, settings.smtp_password)
    server.sendmail(settings.smtp_from, test_email, msg.as_string())
    server.quit()
    print("SUCCESS! OTP email sent.")
    print("Check inbox and SPAM folder for the email.")
except Exception as e:
    print(f"FAILED: {type(e).__name__}: {e}")
