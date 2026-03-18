"""
Test that config.py correctly loads SMTP settings from .env
Run this from ANY directory to verify the fix works.
"""
import sys
sys.path.insert(0, r"C:\Users\user\Desktop\-caldim-website\Recruitment_Intelligence_and_Management_System-main\backend")

from app.core.config import get_settings, ENV_FILE, BASE_DIR, APP_DIR

settings = get_settings()

print("=" * 60)
print("CONFIG VERIFICATION")
print("=" * 60)
print(f"BASE_DIR  : {BASE_DIR}")
print(f"APP_DIR   : {APP_DIR}")
print(f"ENV_FILE  : {ENV_FILE}")
print(f"ENV exists: {ENV_FILE.exists()}")
print()
print("SMTP Settings:")
print(f"  SMTP_HOST     : '{settings.smtp_host}'")
print(f"  SMTP_PORT     : {settings.smtp_port}")
print(f"  SMTP_USER     : '{settings.smtp_user}'")
print(f"  SMTP_PASSWORD : '{'*' * len(settings.smtp_password)}' (length: {len(settings.smtp_password)})")
print(f"  SMTP_FROM     : '{settings.smtp_from}'")
print()

all_set = all([settings.smtp_host, settings.smtp_port, settings.smtp_user, settings.smtp_password, settings.smtp_from])
if all_set:
    print("✅ SMTP is FULLY CONFIGURED - emails will be sent!")
else:
    print("❌ SMTP is NOT configured - backend will use mock mode (no real emails)")
    print("   Check that .env file exists and has all SMTP_ values set.")

print()
print(f"DB URL    : {settings.database_url}")
print(f"JWT set   : {'Yes' if settings.jwt_secret else 'NO - MISSING!'}")
print(f"ENV       : {settings.env}")
