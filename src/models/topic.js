const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Topic = sequelize.define("main_topic", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false
	},
	pregnancy_month: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = Topic;
