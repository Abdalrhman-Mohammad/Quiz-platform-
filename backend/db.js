const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({path: '.env'});

// Create a connection pool
const connection = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

module.exports = connection;
