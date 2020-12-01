const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const gameConfig = sequelize.define('gameConfig', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: Sequelize.NUMBER,
    jsonConfig: Sequelize.STRING,
    
});


module.exports = gameConfig;