const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const mapSheet = sequelize.define('mapSheets', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    collisionArray: Sequelize.STRING,
    reference: Sequelize.STRING
});

module.exports = mapSheet;