const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const mainCharacter = sequelize.define('mainCharacters', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    positionX: Sequelize.INTEGER,
    positionY: Sequelize.INTEGER,
    name: Sequelize.STRING,
    reference: Sequelize.STRING
});


module.exports = mainCharacter;