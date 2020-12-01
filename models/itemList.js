const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const itemList = sequelize.define('itemList', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: Sequelize.STRING,
});


module.exports = itemList;