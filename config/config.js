const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10, 
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'test' 
});

pool.on('error', (err) => {
  console.error('MySQL Pool Error:', err);
});

module.exports = pool;
