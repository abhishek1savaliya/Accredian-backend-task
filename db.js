const mySql = require('mysql');

const db = mySql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12668673',
  password: 'BLbXbBwwke',
  database: 'sql12668673',
  waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});


db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = db;
