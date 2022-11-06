const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
    //   host: 'localhost',
    //   port: 3001,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the employee_db.`)
);

db.connect(function (err){
    if (err) throw err;
});

module.exports = db;