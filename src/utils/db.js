const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

let DB = "database_test";

if (process.env.NODE_ENV === "development") {
	DB = "database_dev";
} else if (process.env.NODE_ENV === "production") {
	DB = "database";
}

const sequelize = new Sequelize(
	DB,
	process.env.DB_USER,
	process.env.PASSWD,
	{
		dialect: "postgres",
		host: process.env.DB_HOST,
		logging: false
	}
);

module.exports = sequelize;
