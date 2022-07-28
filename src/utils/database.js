const { Client } = require("pg");
const dbConfig = require("../../config/dbConfig");
require("dotenv").config();

if (process.env.NODE_ENV === "production") {
	var connectedClient = new Client({
		...dbConfig,
		database: "db_prod"
	});
} else if (process.env.NODE_ENV === "development") {
	var connectedClient = new Client({
		...dbConfig,
		database: "db_dev"
	});
} else if (process.env.NODE_ENV === "test") {
	var connectedClient = new Client({
		host: dbConfig.host,
		database: "db_dev"
	});
}

async function connectDB() {
	await connectedClient.connect();
}

async function disconnectDB() {
	await connectedClient.end();
}

module.exports = {
	connectedClient,
	connectDB,
	disconnectDB
};
