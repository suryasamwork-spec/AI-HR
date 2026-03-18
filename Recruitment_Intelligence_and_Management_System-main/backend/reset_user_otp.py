"""
Reset user verification status so they can register again and get a fresh OTP.
"""
import sqlite3
import sys

DB_PATH = r"C:\Users\user\Desktop\-caldim-website\Recruitment_Intelligence_and_Management_System-main\backend\app\sql_app.db"

email = sys.argv[1] if len(sys.argv) > 1 else "suryamsam8428@gmail.com"

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Check current state
cursor.execute("SELECT id, email, is_verified, otp_expiry FROM users WHERE LOWER(email) = LOWER(?)", (email,))
row = cursor.fetchone()

if not row:
    print(f"No user found with email: {email}")
    conn.close()
    sys.exit(1)

print(f"Found user: ID={row[0]}, email={row[1]}, verified={bool(row[2])}, otp_expiry={row[3]}")

# Clear OTP so re-registration is triggered cleanly
cursor.execute("""
    UPDATE users 
    SET otp_code = NULL, otp_expiry = NULL
    WHERE LOWER(email) = LOWER(?)
""", (email,))
conn.commit()

print()
print("OTP cleared! Now the user can re-register to get a fresh OTP.")
print(f"Go to the registration page and register again with: {email}")
print("The backend will send a new OTP email.")
print()
print("ALSO: After registering, try using OTP '000000' (dev bypass) if email doesn't arrive.")

conn.close()
