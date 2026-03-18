"""
This script reads from the ACTUAL .env file so we test exactly what the backend does.
"""
import os
import sys
from pathlib import Path

# Load .env manually just like pydantic-settings does
env_file = Path(r"C:\Users\user\Desktop\-caldim-website\Recruitment_Intelligence_and_Management_System-main\backend\.env")
env_vars = {}
with open(env_file, 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            key, _, val = line.partition('=')
            env_vars[key.strip()] = val.strip()

SMTP_HOST = env_vars.get('SMTP_HOST', '')
SMTP_PORT = int(env_vars.get('SMTP_PORT', 587))
SMTP_USER = env_vars.get('SMTP_USER', '')
SMTP_PASSWORD = env_vars.get('SMTP_PASSWORD', '')
SMTP_FROM = env_vars.get('SMTP_FROM', '')
TEST_EMAIL = "suryamsam8428@gmail.com"

print(f"SMTP_HOST: '{SMTP_HOST}'")
print(f"SMTP_PORT: {SMTP_PORT}")
print(f"SMTP_USER: '{SMTP_USER}'")
print(f"SMTP_PASSWORD: '{SMTP_PASSWORD}' (length: {len(SMTP_PASSWORD)})")
print(f"SMTP_FROM: '{SMTP_FROM}'")
print()

if not all([SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM]):
    print("ERROR: One or more SMTP settings are EMPTY!")
    print("=> The backend will fall back to MOCK mode (printing OTP in console, NOT sending email)")
    sys.exit(1)

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

try:
    print(f"Connecting to {SMTP_HOST}:{SMTP_PORT}...")
    server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15)
    print("Connected. Starting TLS...")
    server.starttls()
    print("TLS ok. Logging in...")
    server.login(SMTP_USER, SMTP_PASSWORD)
    print("Login successful!")
    
    # Send a real OTP simulation email
    otp = "842619"
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Verify your account for the Recruitment System"
    msg["From"] = SMTP_FROM
    msg["To"] = TEST_EMAIL
    html = f"""
    <html>
      <body>
        <h2>Account Verification - CALDIM CAREERS</h2>
        <p>Your OTP verification code is:</p>
        <h3 style="background:#f4f4f4; padding:10px 20px; display:inline-block; letter-spacing: 8px; font-size:28px; font-family:monospace;">{otp}</h3>
        <p>This code will expire in 30 minutes.</p>
        <p><small>This is a test email to verify your email configuration is working correctly.</small></p>
      </body>
    </html>
    """
    msg.attach(MIMEText(html, "html"))
    server.sendmail(SMTP_FROM, TEST_EMAIL, msg.as_string())
    server.quit()
    print()
    print(f"SUCCESS! OTP email sent to {TEST_EMAIL}")
    print(f"Test OTP was: {otp}")
    print("Check inbox AND spam folder.")

except smtplib.SMTPAuthenticationError as e:
    print(f"\nFAILED - Authentication Error: {e}")
    print()
    print("The Gmail App Password is WRONG or EXPIRED.")
    print("Fix: Generate a new App Password at https://myaccount.google.com/apppasswords")
    print("Then update SMTP_PASSWORD in backend/.env")
    
except Exception as e:
    print(f"\nFAILED - {type(e).__name__}: {e}")
