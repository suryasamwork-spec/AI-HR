import sqlite3

db_path = 'sql_app.db'
conn = sqlite3.connect(db_path)
cur = conn.cursor()
try:
    # Try to insert a dummy row with the status
    cur.execute("INSERT INTO applications (job_id, candidate_name, candidate_email, status, applied_at, updated_at) VALUES (1, 'Test', 'test_tmp@example.com', 'ai_interview_completed', '2026-03-20', '2026-03-20')")
    print("Insert Success")
    conn.commit()
except sqlite3.IntegrityError as e:
    print(f"Insert Failed: {e}")
except Exception as e:
    print(f"Error: {e}")
finally:
    cur.execute("DELETE FROM applications WHERE candidate_email='test_tmp@example.com'")
    conn.commit()
    conn.close()
