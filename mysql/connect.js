const mysql = require('mysql');
require('dotenv').config();
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'users'
});
connection.connect(function (err) {
    if (err) console.log('connect fail')
    console.log('success');
})

module.exports = connection
