const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("../model/User");

class Attributes extends Sequelize.Model { }

Attributes.init({
    height: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    hair_colour: {
        type: Sequelize.STRING,
        allowNull: false
    },
    weight: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},
{
    sequelize,
    modelName: "attributes",
    freezeTableName: true
});

Attributes.belongsTo(User);

module.exports = Attributes;
