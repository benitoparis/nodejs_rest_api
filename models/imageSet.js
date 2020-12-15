const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const imageSet = sequelize.define('imagesSet', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: Sequelize.STRING,
    reference: Sequelize.STRING,
    filePath: Sequelize.STRING,
});


module.exports = imageSet;