import sqlite3
import os

db_path = "c:/Users/user/Desktop/-caldim-website/Recruitment_Intelligence_and_Management_System-main/backend/sql_app.db"

if not os.path.exists(db_path):
    print(f"Database not found at {db_path}")
else:
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Add company_name to jobs table
        cursor.execute("ALTER TABLE jobs ADD COLUMN company_name VARCHAR(255) DEFAULT 'Caldim'")
        
        conn.commit()
        conn.close()
        print("Successfully added company_name column to jobs table.")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e).lower():
            print("Column company_name already exists.")
        else:
            print(f"Error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
