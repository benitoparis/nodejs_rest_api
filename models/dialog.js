const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const dialog = sequelize.define('dialogs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: Sequelize.STRING,
});


module.exports = dialog;