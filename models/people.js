const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const people = sequelize.define('people', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: Sequelize.STRING,
    positionX: Sequelize.INTEGER,
    positionY: Sequelize.INTEGER,
    name: Sequelize.STRING,
    reference: Sequelize.STRING
});


module.exports = people;