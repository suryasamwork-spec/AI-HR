import sqlite3
import os
from pathlib import Path

# Fix the path to point to the actual DB being used by the backend
BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "app" / "sql_app.db"

def fix_db():
    print(f"Applying fix to database -> {DB_PATH}")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # 1. Add user_id to applications
    try:
        cursor.execute("PRAGMA table_info(applications)")
        columns = [row[1] for row in cursor.fetchall()]
        
        if 'user_id' not in columns:
            cursor.execute("ALTER TABLE applications ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE CASCADE")
            print("SUCCESS Added user_id column to applications table!")
        else:
            print("INFO applications.user_id already exists.")
    except Exception as e:
        print(f"Error adding user_id: {e}")

    # 2. Add candidate_profiles table
    try:
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS candidate_profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
            date_of_birth DATETIME,
            gender VARCHAR(20),
            citizenship VARCHAR(100),
            marital_status VARCHAR(50),
            blood_group VARCHAR(10),
            passport_number VARCHAR(50),
            passport_expiry DATETIME,
            address_house_no VARCHAR(255),
            address_street VARCHAR(255),
            address_city VARCHAR(255),
            address_state VARCHAR(255),
            address_country VARCHAR(255),
            address_pin VARCHAR(20),
            education_10th TEXT,
            education_12th TEXT,
            education_grad TEXT,
            education_post_grad TEXT,
            total_experience_years FLOAT,
            current_employer VARCHAR(255),
            current_designation VARCHAR(255),
            current_joining_date DATETIME,
            current_ctc VARCHAR(50),
            notice_period VARCHAR(50),
            previous_experience TEXT,
            primary_skills TEXT,
            secondary_skills TEXT,
            technical_proficiency TEXT,
            interview_history TEXT,
            preferred_locations TEXT,
            languages TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        """)
        print("SUCCESS Created candidate_profiles table!")
    except Exception as e:
        print(f"Error creating candidate_profiles: {e}")

    conn.commit()
    conn.close()
    print("Database patched successfully.")

if __name__ == "__main__":
    fix_db()
