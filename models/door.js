const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const door = sequelize.define('doors', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: Sequelize.STRING,
    positionX: Sequelize.INTEGER,
    positionY: Sequelize.INTEGER,
    width: Sequelize.INTEGER,
    height: Sequelize.INTEGER,
});


module.exports = door;