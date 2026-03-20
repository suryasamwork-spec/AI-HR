import sqlite3
import os

db_path = r'c:\Users\user\Desktop\-caldim-website\Recruitment_Intelligence_and_Management_System-main\sql_app.db'

def migrate():
    if not os.path.exists(db_path):
        print(f"Database not found at {db_path}")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        cursor.execute("PRAGMA foreign_keys=OFF")
        cursor.execute("BEGIN TRANSACTION")
        
        # 1. Update applications table to include user_id
        cursor.execute("PRAGMA table_info(applications)")
        columns = [row[1] for row in cursor.fetchall()]
        
        if 'user_id' not in columns:
            cursor.execute("ALTER TABLE applications ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE CASCADE")
            print("Added user_id column to applications.")

        # 2. Check if candidate_profiles table exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='candidate_profiles'")
        table_exists = cursor.fetchone()
        
        if not table_exists:
            cursor.execute("""
            CREATE TABLE candidate_profiles (
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
            print("Created candidate_profiles table.")
        else:
            print("candidate_profiles table already exists. Skipping creation.")
        
        # 3. Add indexes
        cursor.execute("CREATE INDEX IF NOT EXISTS ix_candidate_profiles_user_id ON candidate_profiles (user_id)")
        
        conn.commit()
        print("Migration process finished.")
    except Exception as e:
        conn.rollback()
        print(f"Migration failed: {e}")
    finally:
        cursor.execute("PRAGMA foreign_keys=ON")
        conn.close()

if __name__ == "__main__":
    migrate()
