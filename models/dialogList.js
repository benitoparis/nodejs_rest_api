const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const dialogList = sequelize.define('dialogLists', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: Sequelize.STRING,
});


module.exports = dialogList;