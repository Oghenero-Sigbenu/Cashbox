const Sequelize = require("sequelize");

//Creates a Sequelize instance and sets the database config
const sequelize = new Sequelize("biodata", "root",  process.env.MYSQL_PASSWORD, {
    host: "localhost",
    dialect: "mysql"
});

module.exports = sequelize;
