
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const player = sequelize.define('players', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    position: Sequelize.STRING,
    age: Sequelize.INTEGER,
    imgUrl: Sequelize.STRING
});

module.exports = player;