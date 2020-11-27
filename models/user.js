const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const user = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: Sequelize.STRING,
    nickname: Sequelize.STRING,
    ageRange: Sequelize.STRING,
    password: Sequelize.STRING
});


module.exports = user;