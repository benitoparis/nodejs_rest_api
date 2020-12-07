const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const doorList = sequelize.define('doorLists', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: Sequelize.STRING,
});


module.exports = doorList;