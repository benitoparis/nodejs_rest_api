const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const secretPassageDestination = sequelize.define('secretPassageDestination', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    positionX: Sequelize.INTEGER,
    positionY: Sequelize.INTEGER,
    heroDirection: Sequelize.INTEGER
});


module.exports = secretPassageDestination;