const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const stage = sequelize.define('stages', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    level: Sequelize.INTEGER,
    name: Sequelize.STRING,
    description: Sequelize.STRING,
});


module.exports = stage;