const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const message = sequelize.define('messages', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    msg: Sequelize.STRING,
});


module.exports = message;