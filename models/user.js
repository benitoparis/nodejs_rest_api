const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const user = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    age: Sequelize.INTEGER,
    city: Sequelize.STRING,
    password: Sequelize.STRING
});


module.exports = user;