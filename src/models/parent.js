const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Parent = sequelize.define("parent", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	age: {
		type: Sequelize.INTEGER
	},
	pregnancy_month: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = Parent;
