// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database:'football_manager',
//     password: 'charlie2015'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('football_manager', 'root', 'charlie2015', {dialect: 'mysql', host:'localhost'});

module.exports = sequelize;