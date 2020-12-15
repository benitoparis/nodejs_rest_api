const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const secretPassage = sequelize.define('secretPassages', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    reference: Sequelize.STRING,
    description: Sequelize.STRING,
    positionX: Sequelize.INTEGER,
    positionY: Sequelize.INTEGER,
    width: Sequelize.INTEGER,
    height: Sequelize.INTEGER,
});


module.exports = secretPassage;