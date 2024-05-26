const Sequelize = require("sequelize");

const sequelize = require("../utils/database.js");

const user = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userName: Sequelize.STRING,
    email:Sequelize.STRING,
});

module.exports = user;