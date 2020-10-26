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
    psw: Sequelize.STRING,
});


module.exports = user;