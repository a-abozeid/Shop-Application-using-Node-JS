const Sequelize = require("sequelize");

const sequelize = require("../utils/database.js");

const cartItem = sequelize.define("cartItem", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity:{
        type: Sequelize.INTEGER,
    }
});

module.exports = cartItem;