const dbConfig = require("../config/dbConfig");

module.exports = {
	user: "postgres",
	password: "password",
	host: dbConfig.host
};
