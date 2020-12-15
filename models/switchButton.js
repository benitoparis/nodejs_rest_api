const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const switchButton = sequelize.define('switchButtons', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: Sequelize.STRING,
    reference: Sequelize.STRING,
    cropX: Sequelize.INTEGER,
    cropY: Sequelize.INTEGER,
    positionX: Sequelize.INTEGER,
    positionY: Sequelize.INTEGER,
    width: Sequelize.INTEGER,
    height: Sequelize.INTEGER
});


module.exports = switchButton;