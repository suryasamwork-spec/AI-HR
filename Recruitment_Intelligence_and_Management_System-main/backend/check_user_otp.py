"""
Read the OTP directly from the database for a given email.
This is for development/debugging purposes only.
"""
import sqlite3
import sys
from pathlib import Path

DB_PATH = r"C:\Users\user\Desktop\-caldim-website\Recruitment_Intelligence_and_Management_System-main\backend\app\sql_app.db"

email = sys.argv[1] if len(sys.argv) > 1 else "suryamsam8428@gmail.com"

print(f"\nChecking user in database: {email}")
print("-" * 50)

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

cursor.execute("""
    SELECT id, email, full_name, role, is_verified, is_active, 
           otp_code, otp_expiry, created_at
    FROM users 
    WHERE LOWER(email) = LOWER(?)
""", (email,))

row = cursor.fetchone()

if not row:
    print(f"No user found with email: {email}")
    print("\nAll users in database:")
    cursor.execute("SELECT id, email, full_name, role, is_verified, otp_expiry FROM users")
    for u in cursor.fetchall():
        print(f"  ID={u[0]}, email={u[1]}, name={u[2]}, role={u[3]}, verified={bool(u[4])}, otp_expiry={u[5]}")
else:
    print(f"ID:          {row[0]}")
    print(f"Email:       {row[1]}")
    print(f"Name:        {row[2]}")
    print(f"Role:        {row[3]}")
    print(f"Verified:    {bool(row[4])}")
    print(f"Active:      {bool(row[5])}")
    print(f"OTP hash:    {'SET' if row[6] else 'NOT SET (already used or expired)'}")
    print(f"OTP expiry:  {row[7]}")
    print(f"Created at:  {row[8]}")
    
    if not row[4]:  # not verified
        print()
        print("=> The account is NOT verified yet.")
        print("=> In development mode, you can use OTP: 000000 to bypass verification.")
        print("   (This works because ENV=development is set in .env)")
    else:
        print()
        print("=> Account is already VERIFIED. You can login directly.")

conn.close()
