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

module.exports = pool.promise();
