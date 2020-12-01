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
    nbMovingPeople: Sequelize.STRING,
    nbStaticPeople: Sequelize.STRING,
    image_1_Path: Sequelize.STRING,
    image_2_Path: Sequelize.STRING,
    image_3_Path: Sequelize.STRING,
    mapCollisionArray:Sequelize.STRING,
});


module.exports = stage;