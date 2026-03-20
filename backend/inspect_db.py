import sqlite3
import os

db_path = 'sql_app.db'
if not os.path.exists(db_path):
    print(f"Error: {db_path} not found")
else:
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name='applications'")
    schema = cur.fetchone()
    if schema:
        print(schema[0])
    else:
        print("Table 'applications' not found")
    conn.close()
