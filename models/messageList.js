const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const messageList = sequelize.define('messagesLists', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: Sequelize.STRING,
});


module.exports = messageList;