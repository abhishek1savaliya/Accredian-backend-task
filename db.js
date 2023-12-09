const mySql = require('mysql2');

const pool = mySql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12668673',
  password: 'BLbXbBwwke',
  database: 'sql12668673',
  waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

pool.promise()
  .query("SHOW TABLES LIKE 'user'")
  .then(([rows, fields]) => {
    if (rows.length === 0) {
      return pool.promise().query(`
        CREATE TABLE user (
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL
        )
      `);
    }
  })
  .catch((err) => {
    console.error('Error checking or creating user table:', err);
  })

module.exports = pool.promise();
