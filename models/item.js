const { STRING } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const item = sequelize.define('items', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    cropX: Sequelize.INTEGER,
    cropY: Sequelize.INTEGER,
    positionX: Sequelize.INTEGER,
    positionY: Sequelize.INTEGER,
    width: Sequelize.INTEGER,
    height: Sequelize.INTEGER,
    reference: Sequelize.STRING,
    description: Sequelize.STRING
});


module.exports = item;