require('dotenv').config();
const mysql = require('mysql2');

// Create connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'caldim_db'
});

// Connect
connection.connect((err) => {
  if (err) {









































































    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

module.exports = connection;