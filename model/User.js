const Sequelize = require("sequelize");
const sequelize = require("../config/database");

class User extends Sequelize.Model { }

User.init({
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    DOB: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "user",
    freezeTableName: true
});

module.exports = User;
