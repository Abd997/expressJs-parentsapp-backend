const { Sequelize } = require("sequelize");
require("dotenv").config();

let DB = "database_test";
let DB_USER = "postgres";
let DB_PASSWORD = "password";
// let DB_HOST = "172.17.0.2";

if (process.env.NODE_ENV === "development") {
	DB = "db_dev";
	DB_USER = process.env.DB_USER;
	DB_PASSWORD = process.env.DB_PASSWORD;
	// DB_HOST = process.env.DB_HOST;
} else if (process.env.NODE_ENV === "production") {
	DB = "database_prod";
	DB_USER = process.env.DB_USER;
	DB_PASSWORD = process.env.DB_PASSWORD;
	// DB_HOST = process.env.DB_HOST;
}

const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
	dialect: "postgres",
	// host: DB_HOST,
	logging: false
});

module.exports = sequelize;
