import sqlite3
import os

db_path = "c:/Users/user/Desktop/-caldim-website/Recruitment_Intelligence_and_Management_System-main/sql_app.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

def check_schema(table_name):
    print(f"--- Schema for {table_name} ---")
    cursor.execute(f"PRAGMA table_info({table_name});")
    for row in cursor.fetchall():
        print(row)

check_schema("users")
check_schema("applications")
check_schema("jobs")

conn.close()
