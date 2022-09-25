const mysql = require('mysql')
const config = require('../config')
const { promisify } = require('util')

const database = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  ssl: { rejectUnauthorized: false }
})

database.getConnection((err, connection) => {
    if (err) {
      throw new Error(err);
    }
  
    if (connection) {
      connection.release();
      console.log('Db is connected')
    }
  });

module.exports = promisify(database.query).bind(database);